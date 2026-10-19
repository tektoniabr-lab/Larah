# Althea — Estética e Bem-Estar

Site em React, TypeScript e Vite, criado a partir da captura e do arquivo exportado do template Althea presentes neste projeto. Utiliza as fontes locais da referência e as imagens geradas na etapa anterior.

## Baixar pelo GitHub

Abra o repositório [tektoniabr-lab/Larah](https://github.com/tektoniabr-lab/Larah), selecione a branch `main` e use **Code → Download ZIP**. O arquivo inclui o código, as imagens, as fontes e os documentos do projeto.

Depois de extrair o ZIP, abra um terminal na pasta que contém `package.json` e execute `npm ci` e `npm run dev`. Abra no navegador o endereço exibido pelo terminal. A pasta `/workspace/Larah` mencionada abaixo é o caminho deste ambiente na nuvem; no seu computador, utilize a pasta extraída.

Os ZIPs montados para download local são ignorados pelo Git por duplicarem o conteúdo das pastas. Dependências, arquivos de build, caches e registros de formulários também não fazem parte do repositório.

## Executar

Requer Node.js 22.12 ou superior. O ambiente atual utiliza Node.js 24.

```bash
cd /workspace/Larah
npm ci --cache /tmp/althea-npm-cache --no-audit --no-fund
npm run dev
```

O servidor de desenvolvimento escuta na porta **3000**, em todas as interfaces. A API de formulários funciona no mesmo processo. O cache em `/tmp` evita depender de permissões de escrita na pasta pessoal do ambiente na nuvem.

Para compilar e executar a versão de produção:

```bash
npm run build
npm start
```

`npm start` serve o conteúdo de `dist/` e a API com Node.js. Aceita `PORT` e `HOST`. Não é necessário instalar um banco de dados ou configurar credenciais para executar esta versão.

## Conteúdo e interações

- Hero com retrato transparente, linhas topográficas, movimento suave com o ponteiro e áudio ambiente opcional no desktop.
- Manifesto com revelação das palavras durante a rolagem.
- Cinco cartões de serviços em arco no desktop e carrossel horizontal em telas menores.
- Jornada de cuidado, convite para consulta, composição de cinco painéis, depoimentos navegáveis, preços e métricas animadas.
- Dois artigos em janelas de leitura, FAQ com aberturas independentes, newsletter e rodapé.
- Menu móvel, formulários de consulta, janelas de serviço e documentos legais, navegação por teclado, Escape, restauração do foco e preferência por movimento reduzido.
- Layouts para celular, tablet e desktop. Pontos principais de mudança em **810, 1200 e 1600 px**.

Os links internos do menu levam às seções desta página. `/about`, `/services`, `/journal` e `/contact` também abrem a página na seção correspondente; `/book-a-consultation` abre o formulário. Caminhos desconhecidos exibem uma página 404. As páginas internas completas do template não foram fornecidas como referência e não são apresentadas como reproduzidas.

## Formulários e dados

| Endpoint | Comportamento |
| --- | --- |
| `GET /api/health` | Confirma que a aplicação responde. |
| `POST /api/newsletter` | Valida e normaliza o e-mail; evita inscrições duplicadas. |
| `POST /api/appointments` | Valida nome, e-mail, serviço, autorização de contato e data opcional; retorna o identificador do pedido. |

Os registros ficam em **`.data/newsletter.jsonl`** e **`.data/appointments.jsonl`**, fora do conteúdo público e ignorados pelo Git. Para usar outro local, defina `ALTHEA_DATA_DIR` antes de iniciar o processo. Em uma hospedagem com disco temporário, essa pasta precisa ficar em um volume persistente para conservar os registros entre implantações.

Esta implementação **registra solicitações localmente**. Não envia e-mails, não confirma horários em uma agenda e não cobra pagamentos. O retorno de sucesso da consulta informa que a disponibilidade precisa ser confirmada por contato. O endereço `hello@altheacare.com` e os links sociais são os dados de demonstração da referência; os links sociais apontam às plataformas, pois perfis oficiais não foram fornecidos.

O widget de divulgação do template está habilitado por fidelidade à demonstração. Para ocultá-lo, defina `VITE_SHOW_TEMPLATE_PROMO=false` antes de iniciar o Vite ou executar o build. A configuração de build pode ficar em `.env.local` (ignorado pelo Git).

## Organização

| Caminho | Conteúdo |
| --- | --- |
| `src/App.tsx` | Seções, interações, menu e formulários. |
| `src/data.ts` | Serviços, depoimentos, perguntas e artigos. |
| `src/styles.css` | Tipografia, cores, medidas, animações e responsividade. |
| `public/assets/` | Imagens geradas, máscara SVG e áudio utilizados localmente. |
| `public/fonts/` | Instrument Serif, Inter Display e Dancing Script recuperadas do arquivo de referência. |
| `server/app.mjs` | API compartilhada pelo Vite e pelo servidor de produção. |
| `tests/api.test.mjs` | Testes da validação, persistência e concorrência da API. |
| `tests/browser-smoke.py` | Verificação funcional no Chromium com Playwright. |
| `docs/01-especificacao-tecnica-althea.md` | Especificação visual com medidas e fontes de evidência. |
| `docs/02-inventario-imagens-e-prompts.md` | Inventário visual e prompts individuais. |
| `imagens-geradas/` | Conjunto original das imagens geradas e seus registros. |

## Verificar

```bash
npm test
npm run build
```

O teste de navegador utiliza Python Playwright e Chromium, já disponíveis neste ambiente. Ele envia formulários com endereços `example.com`; execute contra um servidor iniciado com diretório temporário de dados:

```bash
ALTHEA_DATA_DIR=/tmp/althea-smoke-data npm run dev
```

Em outro terminal:

```bash
python tests/browser-smoke.py
```

Para selecionar outro servidor ou executável, use `BASE_URL` e `CHROMIUM_PATH`. As capturas ficam em `test-results/`, ignorado pelo Git. O teste cobre consulta, newsletter, artigos, documentos legais, depoimentos, FAQ, menu móvel, carrossel, retorno de foco, movimento reduzido e seis larguras de tela (320 a 1920 px).

## Fidelidade e limites da referência

A reprodução conserva a paleta, as famílias tipográficas, a ordem das seções, os principais tamanhos e espaçamentos, os painéis arredondados e a composição responsiva documentados. A captura fornecida é a referência para o português visível; trechos sem tradução recuperável, artigos completos, conteúdo legal e estados dos formulários receberam conteúdo próprio.

As fotografias são **recriações geradas**, portanto rostos, iluminação e detalhes não são idênticos aos arquivos originais. O hero utiliza parallax suave em CSS; o efeito WebGL com mapa de profundidade do Framer não foi reproduzido. As linhas topográficas são SVG procedural, e os trajetos e transições foram reconstruídos em React/CSS. A máscara dos avatares utiliza o SVG original recuperado para conservar o recorte.

A validação visual foi feita com a captura e a exportação local, pois o domínio externo da referência não respondeu neste ambiente. As capturas verificam a composição; não constituem uma comparação automática de igualdade de pixels.
