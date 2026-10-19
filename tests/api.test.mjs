import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createApiHandler } from "../server/app.mjs";

let server, base, directory;
before(async () => {
  directory = await mkdtemp(join(tmpdir(), "althea-api-"));
  server = createServer(createApiHandler({ dataDir: directory }));
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(async () => {
  await new Promise((resolve) => server.close(resolve));
  await rm(directory, { recursive: true, force: true });
});

const post = (path, data, headers = {}) =>
  fetch(base + path, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(data),
  });
const records = async (file) =>
  (await readFile(join(directory, file), "utf8"))
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));

test("health check responds and API routes reject unknown methods and paths", async () => {
  const health = await fetch(base + "/api/health");
  assert.equal(health.status, 200);
  assert.deepEqual(await health.json(), { ok: true });
  assert.equal((await fetch(base + "/api/newsletter")).status, 405);
  assert.equal((await fetch(base + "/api/missing")).status, 404);
});

test("newsletter normalizes and persists an address only once under concurrent requests", async () => {
  const responses = await Promise.all(
    Array.from({ length: 8 }, () =>
      post("/api/newsletter", { email: "  Newsletter@Example.com  " }),
    ),
  );
  assert.ok(responses.every((response) => response.status === 200));
  const items = await records("newsletter.jsonl");
  assert.equal(items.length, 1);
  assert.equal(items[0].email, "newsletter@example.com");
  assert.match(items[0].id, /^[0-9a-f-]{36}$/);
  assert.ok(Date.parse(items[0].createdAt));
});

test("invalid newsletter payloads do not change the stored list", async () => {
  for (const body of [
    null,
    [],
    {},
    { email: "invalid" },
    { email: 42 },
    { email: "x".repeat(255) + "@example.com" },
  ]) {
    assert.equal((await post("/api/newsletter", body)).status, 400);
  }
  assert.equal((await records("newsletter.jsonl")).length, 1);
});

test("appointment requires valid consent and service, then returns its persisted request ID", async () => {
  const data = {
    name: "  Maria Silva  ",
    email: "Maria@Example.com",
    service: "skin",
    consent: true,
    notes: "  Primeiro contato.  ",
    date: "2099-05-20",
  };
  for (const invalid of [
    { ...data, consent: false },
    { ...data, name: "A" },
    { ...data, service: "unknown" },
    { ...data, notes: "x".repeat(1001) },
  ]) {
    assert.equal((await post("/api/appointments", invalid)).status, 400);
  }
  const response = await post("/api/appointments", data);
  assert.equal(response.status, 201);
  const receipt = await response.json();
  const items = await records("appointments.jsonl");
  assert.equal(items.length, 1);
  assert.equal(items[0].id, receipt.id);
  assert.equal(items[0].name, "Maria Silva");
  assert.equal(items[0].email, "maria@example.com");
  assert.equal(items[0].notes, "Primeiro contato.");
  assert.equal(items[0].status, "requested");
  assert.equal(items[0].consent, true);
});

test("impossible dates and past dates are rejected; a date is optional", async () => {
  const data = {
    name: "Maria Silva",
    email: "maria@example.com",
    service: "consultation",
    consent: true,
  };
  for (const date of ["2099-02-30", "2020-01-01", "next week", "2099-13-01"]) {
    assert.equal(
      (await post("/api/appointments", { ...data, date })).status,
      400,
    );
  }
  assert.equal((await post("/api/appointments", data)).status, 201);
  const items = await records("appointments.jsonl");
  assert.equal(items.length, 2);
  assert.equal(items[1].date, null);
});

test("rejects foreign origins, malformed JSON, unsupported content types and oversized bodies", async () => {
  assert.equal(
    (
      await post(
        "/api/newsletter",
        { email: "a@example.com" },
        { Origin: "https://example.org" },
      )
    ).status,
    403,
  );
  assert.equal(
    (
      await post(
        "/api/newsletter",
        { email: "a@example.com" },
        { "Content-Type": "text/plain" },
      )
    ).status,
    415,
  );
  const invalid = await fetch(base + "/api/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{",
  });
  assert.equal(invalid.status, 400);
  assert.equal(
    (
      await post("/api/newsletter", {
        email: "a@example.com",
        extra: "x".repeat(20000),
      })
    ).status,
    413,
  );
  assert.equal((await records("newsletter.jsonl")).length, 1);
});
