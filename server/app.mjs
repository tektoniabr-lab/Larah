import { createServer } from "node:http";
import { appendFile, mkdir, readFile, stat } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { randomUUID } from "node:crypto";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const serviceIds = new Set([
  "skin",
  "aesthetic",
  "wellness",
  "consultation",
  "care-plan",
]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function send(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolveBody, reject) => {
    let size = 0;
    let tooLarge = false;
    const parts = [];
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > 16384) {
        if (!tooLarge)
          reject(
            Object.assign(new Error("A mensagem é muito longa."), {
              status: 413,
            }),
          );
        tooLarge = true;
        return;
      }
      parts.push(chunk);
    });
    req.on("end", () => {
      if (tooLarge) return;
      try {
        resolveBody(JSON.parse(Buffer.concat(parts).toString("utf8")));
      } catch {
        reject(
          Object.assign(new Error("Não foi possível ler os dados enviados."), {
            status: 400,
          }),
        );
      }
    });
    req.on("error", reject);
  });
}

export function createApiHandler({
  dataDir = process.env.ALTHEA_DATA_DIR || resolve(projectRoot, ".data"),
} = {}) {
  let queue = Promise.resolve();
  const serialized = (work) => {
    const task = queue.then(work);
    queue = task.catch(() => {});
    return task;
  };
  return async (req, res, next) => {
    const pathname = new URL(req.url || "/", "http://localhost").pathname;
    if (!pathname.startsWith("/api/")) {
      if (next) next();
      else send(res, 404, { error: "Página não encontrada." });
      return;
    }
    try {
      if (pathname === "/api/health" && req.method === "GET") {
        send(res, 200, { ok: true });
        return;
      }
      if (!["/api/newsletter", "/api/appointments"].includes(pathname)) {
        send(res, 404, { error: "Endereço não encontrado." });
        return;
      }
      if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        send(res, 405, { error: "Método não permitido." });
        return;
      }
      if (
        req.headers.origin &&
        new URL(req.headers.origin).host !== req.headers.host
      ) {
        send(res, 403, { error: "Envie o formulário pelo site da Althea." });
        return;
      }
      if (!req.headers["content-type"]?.includes("application/json")) {
        send(res, 415, { error: "Formato não aceito." });
        return;
      }
      const body = await readBody(req);
      if (!body || typeof body !== "object" || Array.isArray(body)) {
        send(res, 400, { error: "Verifique os campos do formulário." });
        return;
      }
      const email =
        typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
      if (email.length > 254 || !emailPattern.test(email)) {
        send(res, 400, { error: "Informe um e-mail válido." });
        return;
      }
      if (pathname === "/api/newsletter") {
        const result = await serialized(async () => {
          await mkdir(dataDir, { recursive: true, mode: 0o700 });
          const filename = resolve(dataDir, "newsletter.jsonl");
          let existing = "";
          try {
            existing = await readFile(filename, "utf8");
          } catch (error) {
            if (error.code !== "ENOENT") throw error;
          }
          const duplicate = existing
            .split("\n")
            .filter(Boolean)
            .some((line) => JSON.parse(line).email === email);
          if (!duplicate)
            await appendFile(
              filename,
              JSON.stringify({
                id: randomUUID(),
                email,
                createdAt: new Date().toISOString(),
              }) + "\n",
              { mode: 0o600 },
            );
          return duplicate;
        });
        send(res, 200, {
          ok: true,
          message: result
            ? "Este e-mail já faz parte da nossa lista."
            : "Sua inscrição foi registrada. Obrigada por se aproximar.",
        });
        return;
      }
      const name = typeof body.name === "string" ? body.name.trim() : "";
      const notes = typeof body.notes === "string" ? body.notes.trim() : "";
      const date = typeof body.date === "string" ? body.date : "";
      if (
        name.length < 2 ||
        name.length > 120 ||
        !serviceIds.has(body.service) ||
        notes.length > 1000 ||
        body.consent !== true
      ) {
        send(res, 400, {
          error:
            "Confira seu nome, o cuidado desejado e a autorização de contato.",
        });
        return;
      }
      if (
        date &&
        (!/^\d{4}-\d{2}-\d{2}$/.test(date) ||
          !Number.isFinite(Date.parse(date)) ||
          new Date(date).toISOString().slice(0, 10) !== date ||
          Date.parse(date) < Date.now() - 86400000)
      ) {
        send(res, 400, { error: "Escolha uma data válida a partir de hoje." });
        return;
      }
      const id = randomUUID();
      await serialized(async () => {
        await mkdir(dataDir, { recursive: true, mode: 0o700 });
        await appendFile(
          resolve(dataDir, "appointments.jsonl"),
          JSON.stringify({
            id,
            name,
            email,
            service: body.service,
            date: date || null,
            notes,
            consent: true,
            createdAt: new Date().toISOString(),
            status: "requested",
          }) + "\n",
          { mode: 0o600 },
        );
      });
      send(res, 201, { ok: true, id, message: "Seu pedido foi registrado." });
    } catch (error) {
      if (!res.headersSent)
        send(res, error.status || 500, {
          error: error.status
            ? error.message
            : "Não foi possível registrar agora. Tente novamente em instantes.",
        });
    }
  };
}

export const apiHandler = createApiHandler();

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".mp3": "audio/mpeg",
};
export function startServer({
  port = Number(process.env.PORT || 3000),
  host = process.env.HOST || "0.0.0.0",
} = {}) {
  const dist = resolve(projectRoot, "dist");
  const server = createServer((req, res) => {
    apiHandler(req, res, async () => {
      try {
        if (!["GET", "HEAD"].includes(req.method)) {
          res.writeHead(405);
          res.end();
          return;
        }
        const pathname = decodeURIComponent(
          new URL(req.url || "/", "http://localhost").pathname,
        );
        let target = resolve(dist, "." + pathname);
        if (target !== dist && !target.startsWith(dist + sep)) {
          res.writeHead(403);
          res.end();
          return;
        }
        let info = await stat(target).catch(() => null);
        if (!info?.isFile()) {
          if (extname(pathname)) {
            res.writeHead(404);
            res.end("Arquivo não encontrado.");
            return;
          }
          target = resolve(dist, "index.html");
          info = await stat(target);
        }
        res.writeHead(200, {
          "Content-Type": mime[extname(target)] || "application/octet-stream",
          "Content-Length": info.size,
          "X-Content-Type-Options": "nosniff",
          "Cache-Control":
            extname(target) === ".html" ? "no-cache" : "public, max-age=3600",
        });
        if (req.method === "HEAD") res.end();
        else createReadStream(target).pipe(res);
      } catch {
        res.writeHead(500);
        res.end("Execute npm run build antes de iniciar o site.");
      }
    });
  });
  server.listen(port, host, () =>
    console.log(`Althea disponível na porta ${server.address().port}.`),
  );
  return server;
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  startServer();
