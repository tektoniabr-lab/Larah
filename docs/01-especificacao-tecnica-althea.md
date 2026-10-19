# Althea — especificação técnica de reprodução visual

**Referência:** https://althea-template.framer.website/

**Data da análise:** 19/10/2026. **Escopo verificável:** página inicial `/`, seus componentes, estados disponíveis no arquivo e assets referenciados.

**Documento complementar:** [Inventário visual e prompts de imagens](02-inventario-imagens-e-prompts.md).

## 1. Fontes, método e precisão

### 1.1 Fontes utilizadas

1. Captura original: [screencapture-althea-template-framer-website-2026-10-19-12_49_57.png](../screencapture-althea-template-framer-website-2026-10-19-12_49_57.png), **1358 × 14133 pixels**, sem redimensionamento na medição.
2. [althea-template.framer.website.zip](../althea-template.framer.website.zip): **84 entradas**, incluindo HTML, CSS embutido, módulos JavaScript, fontes, fotografias, SVG e áudio. O manifesto informa captura em **19/10/2026 às 11:43:10, horário de São Paulo** (`14:43:10 UTC`).
3. Documento de origem dentro do ZIP: `althea-template.framer.website/assets/althea-template.framer.website/index.html`. O `index.html` da raiz é um invólucro do downloader, com recursos embutidos; não confundir esse runtime com a arquitetura original.
4. `assets/_wd3/manifest.json`, `site-index.json`, `tech.json` e os módulos em `assets/framerusercontent.com/sites/nVV46fDkHk3B3c2VNhhDp/`.
5. Execução local do documento arquivado em Chromium, com respostas dos recursos interceptadas e atendidas pelos arquivos do ZIP. Viewports de teste: **1358 × 610**, **390 × 844**, **810 × 1080** e **1600 × 900**, escala do dispositivo 1. [Medições estruturais em JSON](referencias/medidas.json).

O acesso HTTP ao endereço público retornou `Tunnel connection failed: 403 Forbidden`. Portanto, não se afirma que o site público atual continua igual ao arquivo. A referência factual desta especificação é a versão arquivada e a captura fornecida.

### 1.2 Legenda obrigatória de evidência

| Marca | Significado | Como utilizar |
|---|---|---|
| **[V]** | Verificado no CSS, HTML, asset ou código arquivado | Usar o valor diretamente, respeitando sua condição de breakpoint/estado. |
| **[M]** | Medido no navegador sobre o arquivo | Valor exato naquele viewport, idioma e estado; não é uma constante universal. |
| **[C]** | Observado/transcrito da captura | Evidência do estado visual registrado; coordenadas em pixels da imagem. |
| **[E]** | Estimativa visual fundamentada | Ajustar por comparação; não apresentar como propriedade recuperada do original. |
| **[P]** | Proposta de implementação ou de validação | Orientação para reproduzir; não prova de como o original foi construído. |
| **[ND]** | Não determinado | Requer nova evidência; evitar completar por imaginação. |

Tabelas identificadas como **[M]** ou **[V]** adotam essa marca para todas as suas células. Valores fracionários estão arredondados a uma casa decimal; o JSON conserva mais precisão. Todas as medidas CSS usam `px`, salvo indicação contrária. A largura de um texto muda com idioma, fonte carregada e conteúdo.

### 1.3 Diferenças entre captura e documento

- **[C/V] Idioma:** a captura contém grande parte da interface traduzida para português, com o hero `Subtle care. Visible confidence.` e `Your Care Journey.` preservados em inglês. O HTML de origem está em inglês. Não foi possível verificar o mecanismo da tradução; não assumir uma localização nativa nem copiar inglês esperando as mesmas quebras do português.
- **[C] Estado de animação:** títulos e cartões aparecem parcialmente transparentes; há áreas vazias, números em transição e cortes horizontais. Uma captura de página inteira combina diferentes momentos/estados de elementos fixos, sticky e acionados por rolagem.
- **[V/M] Conteúdo existente fora do estado fotografado:** manifesto da fundadora, cinco cartões de serviços e texto gigante dos depoimentos existem no documento, mesmo quando quase ausentes na captura. Não apagar esses componentes para imitar uma falha de captura.
- **[M] Limitação da execução arquivada:** o retrato WebGL do hero não apareceu na renderização automatizada, embora seu asset, mapa de profundidade e parâmetros estejam presentes e a captura o mostre. Houve avisos WebGL, dois paths SVG com `d=undefined`, analytics indisponível e uma tentativa de `localStorage` negada. Parte das imagens é lazy e só carrega ao atravessar a região. A execução permite medir layout e testar interações, mas **não constitui uma validação visual integral do efeito 3D**.
- **[P] Alvo de fidelidade:** usar a captura para composição e idioma visível, e o CSS/código para estrutura, responsividade e estados completos. Para uma imagem de comparação que replique exatamente os estados atenuados, congelar um estado de animação de teste; não reduzir a opacidade permanente de todo o site.

## 2. Identidade visual e direção de reprodução

**[C]** Clínica de estética e bem-estar com linguagem editorial calma: fundo pervinca claro, luz radial azul/esbranquiçada, serifas estreitas e contrastadas, fotografias femininas muito claras, grandes áreas de respiro e superfícies brancas arredondadas. A tipografia escura sustenta o contraste; sombras são claras e difusas, quase luminosas. Não introduzir preto puro em grandes áreas, cores comerciais saturadas, fotografias de procedimentos invasivos, contornos pesados ou novas ilustrações sem referência.

**[V]** O original usa Framer/React, módulos de movimento, componentes customizados, rolagem Lenis, canvas/WebGL e números animados com `number-flow-react`. **[P]** Esses nomes não obrigam a nova implementação a usar Framer, mas os resultados visuais, a sequência e a cinemática devem ser preservados.

## 3. Sistema de cores e superfícies

### 3.1 Tokens recuperados [V]

| Token sugerido [P] | Valor original | Aplicação |
|---|---|---|
| `--page-bg` | `#D6DAEB` = `rgb(214,218,235)` | Fundo do `body` [M]. |
| `--text-primary` | `#333333` | Títulos, links e texto principal. |
| `--text-body` | `#626670` | Parágrafos e descrições de seção. |
| `--text-muted` | `#777B89` | Tags, legendas, auxiliares e consentimento. |
| `--white` | `#FFFFFF` | Cartões, pills, input e texto de CTA escuro. |
| `--button-fill` | `rgba(52,54,74,0.8)` | Botões principais. Não substituir por uma cor opaca arbitrária: o fundo influencia o resultado. |
| `--price-surface` | `rgba(255,255,255,0.2)` | Cartões de preço. |
| `--glow` | `rgba(255,255,255,0.8)` | Halo de bordas/cartões: `0 0 20px 0`. |
| `--blue-light` | `#CEDFED` | Esfera radial colorida. |
| `--trust-green` | `#05B67A` | TrustPoint e quadrados das avaliações. |
| `--rating-orange` | `#FFA600` | Cinco estrelas dentro dos cartões de depoimento. |
| `--chip-dark` | `rgba(0,0,0,0.3)` | Fundo das categorias sobre fotos do journal. |

### 3.2 Fundo e camadas [V]

O fundo tem uma base plana e duas esferas radiais fixas, centralizadas:

```css
/* Transcrição das propriedades principais; nomes de classe adaptados [P]. */
body { background: #d6daeb; }
.color-sphere {
  width: 160%; aspect-ratio: 1; border-radius: 9999px;
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(50% 50%, #cedfed 38.2953%, #fb00ff00 100%);
}
.light-sphere {
  width: 110%; aspect-ratio: 1; border-radius: 9999px;
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%); opacity: .8;
  background: radial-gradient(50% 50%,
    #fff 23.6223%, #ffffffd6 32.7896%, #ffffffb3 44.394%,
    #ffffff63 60.6612%, #ffffff30 79.9796%, #fff0 100%);
}
```

**[V]** `Fixed BG` cobre o viewport e fica em `z-index:0`; a camada superior de navegação está em `z-index:9`. **[C]** As linhas topográficas finas brancas são mais visíveis no hero, ao redor da cabeça. **[V]** Existe também uma camada procedural animada; não são uma fotografia de fundo. **[E]** Espessura aparente das linhas: cerca de 1 px no desktop. **[ND]** Frequência, seed, equação e trajetória temporal exatas não foram isoladas como um conjunto completo de parâmetros; para equivalência estrita, reutilizar o componente arquivado ou medir uma nova gravação do original.

### 3.3 Cantos, bordas e profundidade

- **[V]** Raio de referência dos cartões: `40px`; FAQ: `32px`; imagens internas do journal: `32px`; botões/tags: `999px`.
- **[V]** A exportação usa `corner-shape: superellipse(...)` com fallback condicionado por `--one-if-corner-shape-supported` / `--corner-shape-fallback`. **[P]** Preservar o CSS correspondente se for reutilizado: um simples `border-radius` é uma aproximação em navegadores com suporte ao formato de canto.
- **[V]** Camada de borda interna de preços e depoimentos em `inset:8px`, raio `32px`, `pointer-events:none`; halo branco `box-shadow:0 0 20px 0 rgba(255,255,255,.8)`.
- **[C]** Nenhuma sombra cinza/preta dura separa os bento cards do fundo. O recorte branco e o brilho fazem essa separação.

## 4. Tipografia

### 4.1 Famílias e arquivos [V]

| Uso | Família | Peso | Arquivo no ZIP |
|---|---|---|---|
| Títulos, números e citações | Instrument Serif | 400 normal | `assets/fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-2zcZj1bIkNo.woff2` |
| Texto principal e UI | Inter Display | 400 | `assets/framerusercontent.com/assets/bHYNJqzTyl2lqvmMiRRS6Y16Es.woff2` |
| Ênfase/UI | Inter Display | 500 | `assets/framerusercontent.com/assets/iwWTDc49ENF2tCHbqlNARXw6Ug.woff2` |
| Negrito | Inter Display | 700 | `assets/framerusercontent.com/assets/qITWJ2WdG0wrgQPDb8lvnYnTXDg.woff2` |
| Logotipo textual | Dancing Script | 700 | `assets/framerusercontent.com/third-party-assets/fontshare/wf/BN45BIJG3OSM3U5DQKGTXHJHBQVFPAZF/2Y2ZQSKBLUCBNEF3SD4L3PYHHWSKTGVF/Q7YMGCCX6E4CPFH3XWQ7VIDPFTCQZANM.woff2` |

**[V]** Há declarações adicionais de subconjuntos, Instrument Serif itálico, Inter e Aspekta para elementos promocionais. Nem todos os arquivos declarados no CSS foram capturados. Usar as fontes efetivamente disponíveis para o conteúdo observado; verificar glifos portugueses. Não usar uma serifa genérica como substituta de produção.

### 4.2 Escala responsiva [V/M]

Todos os títulos abaixo são peso 400. Cada célula informa `font-size / line-height`.

| Papel | ≥1600 px | 1200–1599 px | 810–1199 px | ≤809 px | Tracking |
|---|---|---|---|---|---|
| H1 do hero | 124 / 136.4 | 108 / 118.8 | 88 / 96.8 | 70 / 77 | `-.02em` |
| H2 de seção | 100 / 110 | 86 / 94.6 | 70 / 77 | 56 / 61.6 | `-.02em` |
| Newsletter, H3 | 76 / 83.6 | 66 / 72.6 | 54 / 59.4 | 44 / 48.4 | `-.01em` |
| CTA “Ready to begin” | 58 / 63.8 | 50 / 55 | 42 / 46.2 | 44 / 48.4 | `-.01em` |
| Nome do serviço | 48 / 52.8 | 48 / 52.8 | 48 / 52.8 | 48 / 52.8 | `-.01em` |
| Citação de depoimento | 32 / 38.4 | 32 / 38.4 | 32 / 38.4 | 32 / 38.4 | verificar estilo do componente; não herdar H2 |
| Título de preço | 32 / 38.4 | 32 / 38.4 | 32 / 38.4 | 32 / 38.4 | estilo do componente |
| Valor do preço | 58 / 63.8 | 50 / 55 | 54 / 59.4 | 44 / 48.4 | `-.01em` |
| Número da jornada | 200 / 160 | 200 / 160 | 158 / 126.4 | 200 / 160 | `-.01em` |
| Texto gigante dos depoimentos | 124 / 99.2 | 124 / 99.2 | 124 / 111.6 | 96 / 86.4 | verificar variante |
| Logo no cabeçalho | verificar ≥1600 | 40 / 48 | 32 / 38.4 | 32 / 38.4 | normal |

**[V]** A escala não é monotônica em todos os componentes: preços e CTA têm variantes específicas. Não substituir a tabela inteira por `clamp()` sem conferir os pontos medidos.

| Texto/UI [M, desktop 1358] | Tamanho / altura de linha | Cor |
|---|---|---|
| Links da navegação | 18 / 27 | `#333` |
| Subtítulo do hero | 18 / 27 | `#333` |
| Texto dos parágrafos de seção | 16 / 24 | `#626670` |
| Descrições compactas e FAQ | 14 / 22.4 | `#626670` ou `#777B89`, conforme componente |
| Pergunta de FAQ | 18 / 27 | `#333` |
| Rótulo de tag | 14 / 22.4 | `#777B89` |
| CTA grande do hero | 18 / 27 | branco |
| CTA padrão | 16 / 24 | branco ou `#333` na variante branca |
| Assinatura da fundadora | 15 / 18 | `#777B89` |

**[V]** Recursos OpenType nos presets de Inter Display: `"blwf" on, "cv09" on, "cv03" on, "cv04" on, "cv11" on`. Alguns títulos usam `"ss13" on`. Preservar os presets do papel específico. **[P]** Carregar fontes antes da comparação; não medir com fallback. Texto alinhado ao centro nos cabeçalhos de seção e à esquerda nos cartões, preços e FAQ.

## 5. Layout global, medidas e ritmo vertical

### 5.1 Breakpoints e containers [V/M]

- Mobile: `0–809px`; tablet: `810–1199px`; desktop: `≥1200px`.
- Há uma mudança adicional de escala tipográfica em `1600px`.
- Navegação desktop: margem horizontal `40px` e topo `40px` em 1358 px.
- Seções largas de bento/preços: padding lateral `80px` no desktop; `20px` em tablet/mobile.
- Container editorial recorrente: `max-width:1072px`, centralizado; em 1358 px resulta em `x=143`.
- Container da jornada: `1200px` no desktop observado, centralizado (`x=79`).
- Bento: `max-width:1440px`; métricas: `max-width:1080px`.
- Intervalos recorrentes: `8,16,24,32,40,48,64,80,100,104,120,160,240px`. Não arredondar 104 para 100 nem 100 para 96 sem verificar o componente.
- Final de várias seções: `padding-bottom:240px` no desktop e `120px` nas variantes menores.

### 5.2 Mapa vertical de referência [M]

**Viewport 1358 × 610, arquivo em inglês, DPR 1.** A altura total de **14133 px** coincide com a captura, mas a coincidência não garante que todos os estados/linhas do texto sejam iguais.

| Ordem | Seção (`data-framer-name`) | Y inicial | Altura | Y final aproximado |
|---|---|---:|---:|---:|
| 1 | Hero 60 vh | 0 | 366 | 366 |
| 2 | Quote | 366 | 1970 | 2336 |
| 3 | Our Services | 2336 | 2000 | 4336 |
| 4 | Why Althea | 4336 | 1160.6 | 5496.6 |
| 5 | Ready to begin | 5496.6 | 532 | 6028.6 |
| 6 | Our Approach | 6028.6 | 1081 | 7109.6 |
| 7 | Testimonial Cards | 7109.6 | 1000 | 8109.6 |
| 8 | Pricing | 8109.6 | 1522.4 | 9632 |
| 9 | Numbers | 9632 | 672.8 | 10304.8 |
| 10 | Journal Preview | 10304.8 | 1283.8 | 11588.6 |
| 11 | FAQ | 11588.6 | 1252.2 | 12840.9 |
| 12 | Footer | 12840.9 | 1292 | 14132.9 |

**[V]** O hero ocupa `60vh` no fluxo desktop, mas sua camada textual ocupa um viewport inteiro e transborda essa seção. A seção Quote contém uma região sticky/reveal. Por isso, a aparência inicial do hero não corresponde a um bloco simples de 366 px encerrado antes da citação.

**[M]** Alturas totais observadas em outros viewports: `390×844 → 16316px`, `810×1080 → 11965px`, `1600×900 → 14921px`. Não fixar a página em 14133 px nem escalar a captura inteira por uma proporção única.

## 6. Especificação por seção

### 6.1 Cabeçalho e navegação

**Estrutura [V/C]:** logotipo textual `Althea` à esquerda; links `Sobre / Serviços / Revista / Contato`; CTA branco `Agende uma consulta` à direita. No HTML: `About / Services / Journal / Contact / Book a consultation`.

**Desktop 1358 [M]:**

| Elemento | Posição e medida |
|---|---|
| Logo | início horizontal `40px`; fonte Dancing Script 700, `40/48px` |
| Grupo de links | `x=437.5`, `y=52`, `w=483`, `h=29`, gap `80px` no arquivo inglês |
| Botão branco | `x=1120.8`, `y=40`, `197.2×54`, padding `14px 28px`, raio 999 |
| Área externa da navegação | `position:fixed`, cobre o viewport para acomodar variantes/efeitos; não transformar toda a área em superfície clicável |

**[V] Hover dos links:** estrutura de underline em duas partes, altura `1px`, com conteúdo deslocável. **[P]** Usar animação de translação/recorte para reproduzir o sublinhado, preservando a espessura e o alinhamento. Não usar uma borda inferior permanentemente visível.

**Tablet/mobile [V/M]:** cabeçalho compacto com logo `32px` e controle textual `Menu`; não há ícone hambúrguer no estado fechado observado. No teste mobile de390×844, o menu aberto cobre o viewport com fundo sólido `#626670`. Logo branco em x20/y16; controle `Close` em x324.3/y25, fonte18/27. Os quatro links são brancos, Instrument Serif48/67.2, alinhados ao centro, com gap32 entre caixas; o grupo ocupa aproximadamente129.5×372.8, começando em y173.6. Há CTA branco `Book your session`,350×54, em x20/y616.4 após estabilizar a abertura, com halo branco e raio999. [Captura do menu aberto no arquivo](referencias/menu-mobile.png). A curva e a cronologia completas da transição não foram medidas frame a frame.

### 6.2 Hero: composição principal

**Textos [C]:**

- H1: `Subtle care. Visible confidence.` — uma linha em 1358 px.
- Subtítulo: `Cuidados estéticos e de bem-estar modernos, com uma abordagem suave e pessoal.`
- CTA: `Comece sua jornada`.
- Áudio: `Experience` / `with sound`, em duas linhas.

**[V/M]** H1 `108/118.8px`, tracking `-2.16px`; subtítulo `18/27px`; gap `16px` entre título e subtítulo; gap `40px` entre bloco textual e CTA. Container textual com padding lateral `20px`, centralizado. O CTA tem padding `16px 32px`, altura `59px` e raio `999px`; sua largura é determinada pelo texto (`207px` para o inglês).

**[M]** Em `1358×610`, a mesma estrutura que em `1358×900` desloca o texto verticalmente: no teste de 900 px o bloco inicia em `y=526.6`; na composição de 610 px o hero corresponde ao posicionamento próximo de `y≈333` da captura. **[E]** Usar a captura para o ajuste final do texto traduzido e da sobreposição sobre o busto; não fixar o `y` medido em viewport diferente.

**Imagem [V/C]:** I01 no inventário: mulher adulta em três quartos voltada à direita da tela, olhos fechados, cabelo castanho preso, pescoço alongado e ombros expostos em enquadramento de busto. Fundo transparente; sua base se funde com a luz. Fica **atrás do H1**, centralizada; o rosto aparece acima do texto e o colo segue por trás do subtítulo/CTA. Sem painel retangular em volta.

**Efeito 3D [V]:** asset colorido `oK4ZpG0Udo91FCmeNX5CiuStQBg.webp`, `928×1228`; depth map I02 `30nszQvXKcEgIENheS0WavYlM2Y.jpg`, `612×810`; `enable3D:true`, `fillMode:"height"`, `hasTransparency:true`, `intensity:45`, `invertDepth:false`. É um efeito de profundidade sobre imagem, não há modelo 3D de cabeça recuperado.

**Máscara da camada [V]:** container fixo com `height:90vh`, máscara `linear-gradient(#000 80%, #0000 100%)`; em variante menor aparece `height:70vh`, máscara `linear-gradient(#000 55%, #0000 100%)`. **[P]** Não aplicar essa máscara à página inteira.

**Controle de áudio [M/V]:** círculo branco `48×48`, raio 999, em desktop a `40px` da esquerda e `40px` do fundo (`y=522` em viewport de 610 px); texto a `16px` de distância, `14/19.6px`, peso 500, cor muted. Há `assets/framerusercontent.com/assets/AZqfDGzDfLb1orDcA5BMV3XkJ9Q.mp3`. **[P]** Iniciar sem som e exigir gesto para tocar; restaurar controles após navegação e oferecer estado ativo/inativo. O áudio é um recurso sonoro, não uma imagem.

### 6.3 Manifesto/Quote da fundadora

**[V]** Conteúdo existe no HTML e no componente de reveal, embora a região apareça praticamente vazia na captura. Texto original:

> "Althea is built on care that feels natural and respectful. We focus on subtle results, thoughtful treatments, and long-term well-being. We take time to listen and understand your needs before choosing what truly fits you. No pressure, no extremes — just care that helps you feel confident."

Assinatura: `Dr. Eva Laurent — Founder`.

- **[V]** Texto `Instrument Serif`, `48px`, peso 400, `line-height:130%`, alinhamento central.
- **[V]** Reveal `animationType:"blur"`, `animationDuration:0.8`, `scrollLength:800`, `additionalScroll:400`, `seed:200`, `gap:72`, `firstWordFirst:true`, `enableReveal:true`.
- **[V]** Estrutura interna: altura `calc(100vh + 1200px)` (`800 + 400`); filho sticky `top:0`, altura `100vh`, centralização vertical e recorte.
- **[M]** Seção externa desktop `padding:80px 20px`, `gap:80px`, altura de 1970 px no viewport de referência.
- **[M]** Tablet: padding `120px 20px`, gap 160; mobile: padding `120px 20px`, gap 120, bloco de altura automática em vez da longa sequência sticky desktop.
- **[ND]** Tradução portuguesa exata desse trecho não aparece na captura. Manter o texto original como evidência; qualquer tradução deve ser aprovada como conteúdo, não rotulada como transcrição.

### 6.4 Serviços: título e cartões em arco

**Cabeçalho [C]:** tag `Nossos Serviços`; H2 `Cuidado atencioso, escolhido para você.`; texto `Oferecemos uma gama cuidadosamente selecionada de tratamentos estéticos e de bem-estar, focados em resultados naturais e na saúde da pele a longo prazo.`

**[V/M]** Seção desktop de `2000px` de altura, sem padding; título em posição absoluta no início; wrapper com gap `32px`, tag `padding:6px 14px`, raio 999; título/subtítulo separados por `16px`. Em `1358×610`, tag em `y=2336`, H2 em `y=2402.4`. Parágrafo central com largura restrita; **[E]** cerca de 600 px no texto português da captura.

**Cartões [V]:** cinco links para `/services`, brancos, raio 40, padding 32, título serifa 48/52.8, descrição 14/22.4, ícone grande em linha lavanda, chamada `Click to learn more` no rodapé, borda interna inset 8/raio 32. Dimensões de layout do cartão observado em variante sem transformação: wrapper `400×520`, painel `360×480` com 20 px de margem visual. Os retângulos retornados durante rotação são caixas delimitadoras transformadas e **não** devem ser usados como dimensões originais.

| Ordem [V] | Nome original | Conteúdo resumido | Gráfico |
|---|---|---|---|
| 1 | Skin Health | Saúde, equilíbrio e resistência natural da pele | Broto de folhas com pequeno círculo acima [M, execução]. |
| 2 | Aesthetic Care | Renovação sutil, não invasiva | Contorno facial abstrato, olho e ponte do nariz em linha [M, execução]. |
| 3 | Wellness & Recovery | Relaxamento e recuperação | Broto/folhas com círculo superior; família gráfica próxima ao primeiro [M, execução]. |
| 4 | Personal Consultation | Conversa individual e plano pessoal | Espiral de traço lavanda [C/M, execução]. |
| 5 | Long-Term Care Plans | Programas de resultados duradouros | Flor/lótus linear lavanda [C/M, execução]. |

**Animação circular [V]:** `radius:2000`, `gap:13` graus, `startPosition:140` graus, `rotateChildren:true`, `scrollEnabled:true`, `scrollRange:-320` graus, `stickyHeight:4000`, `showPath:false`. O caminho de debug azul não aparece. As posições são calculadas com trigonometria; a rolagem desloca o conjunto em arco. Não substituir por cinco cartões estáticos alinhados no desktop.

**[C]** A captura estática não registra os cartões nessa região; **[M]** eles surgiram durante a rolagem local entre aproximadamente 3000 e 3800 px. Esses números de scroll são pontos de amostragem, não limites oficiais da animação.

**Responsividade [M/V]:** em tablet/mobile, usar o carrossel horizontal original, sem a área de 2000 px. Em 390 px, slides externos de `390×520`, painel `350×480` em x=20; avanço entre slides de 398 px no estado medido. Em 810 px, cartão externo `400×520`, painel `360×480` centralizado. Indicadores de paginação abaixo; cinco destinos. Controles de setas usam os SVG I17/I18 quando habilitados; não confundir com as setas de 56 px dos depoimentos.

### 6.5 Jornada de cuidado

**Cabeçalho [C]:** `Your Care Journey.`; descrição: `Um processo simples e cuidadoso, projetado para entender suas necessidades e guiá-lo em direção a resultados naturais e duradouros.`

**[M] Desktop:** gap de 100 px entre cabeçalho e conteúdo; conjunto de `1200×662`, em `x=79`, `y=4594.6` no viewport de referência. Coluna nominal da imagem `500×662`, coluna de etapas `700×662`. O retrato I03 transborda sua coluna: imagem aproximadamente `829×822`, começando cerca de 49.5 px antes e 30 px acima dela. O corte frontal tem alfa e base esmaecida.

| Etapa [C/V] | Título na captura | Conteúdo observado |
|---|---|---|
| 01 | Consulta. | Conversa calma sobre objetivos e preocupações antes de recomendar a abordagem. |
| 02 | Plano Personalizado. | Plano com base na pele, estilo de vida e preferências; resultados naturais e equilibrados. |
| 03 | Tratamento e Cuidado. | Precisão, acompanhamento e orientação para saúde da pele no longo prazo. |

**[M]** Cada linha tem 210 px; gap 16; números brancos `200/160px` com padding superior 50; textos em bloco de 340 px, gap de 8 entre título e descrição. Gap horizontal entre número e texto: 24. Segunda linha avança `60px` e terceira `120px`; essa escada é parte do desenho. **[C]** A imagem ocupa a metade esquerda e os grandes números ficam parcialmente atrás/ao lado do rosto/ombros, sem cobrir os textos de explicação.

**[M] Tablet:** números `158/126.4`; conteúdo de claims com três linhas de aproximadamente 176.4 px; portrait column nominal estreita e imagem transbordando. **[M] Mobile:** imagem antes das etapas (`350×347` no container), três blocos em coluna com gap 120 px, números de 200 px em composição sobreposta; títulos `36/39.6`. Não reduzir todo o desktop a uma miniatura.

### 6.6 Convite para consulta e prova social

**[C]** Título `Pronto para começar seu cuidado?`, texto `Cada passo em Althea começa com uma conversa. Juntos, criamos um plano que faz sentido para você — calmo, ponderado e focado no bem-estar a longo prazo.`, CTA `Agende uma consulta`.

**[M]** Container central `1072×292`; posição x143 no desktop. Esquerda com título `50/55px`, largura do título 400 px, texto 16/24 e gap 16; botão abaixo após gap 40. Direita com largura de aproximadamente 269.8 px. A diferença entre a área livre nominal da coluna esquerda e a largura do texto é deliberada.

**Prova social [V/M/C]:**

- Rótulo `Confiável por 80+ clientes` na captura / `Trusted by 80+ clients` no HTML.
- Cinco retratos I09–I13 na ordem indicada no inventário; caixas `48×48`, imagem interna `44×44` com borda aparente de 2 px.
- Avanço horizontal de 32 px entre retratos; grupo `208×48`; último círculo de texto `+81`.
- Máscara SVG I19 recorta as bordas de parte dos retratos, em vez de uma simples pilha de círculos opacos.
- Linha `Excelente, 4,9 de 5`, estrela verde e `TrustPoint`; no HTML `Excellent 4.9 out of 5`.
- Abaixo, texto de contato e quatro ícones `Instagram / Threads / Facebook / YouTube`, `24×24`, gap 32.
- **[V]** Ícones sociais vêm de módulos Phosphor. Preservar o desenho do módulo; uma letra ou emoji não é substituto equivalente.

**[M]** Em mobile as áreas se empilham; a seção cresce de 532 px no desktop para cerca de 782.1 px em 390 px, já incluindo 120 px de padding inferior.

### 6.7 Nossa abordagem: bento grid

**Cabeçalho [C]:** tag `Nossa Abordagem`, título `Juntando as peças.`, texto sobre combinar elementos essenciais do primeiro encontro ao suporte de longo prazo.

**[V] Grid desktop:** sete colunas `repeat(7,minmax(50px,1fr))`, duas linhas, gap 32, max-width 1440; largura real1198 em viewport1358. **[M]** altura 512: duas linhas de 240 +32. Painéis brancos, padding 24, raio40, overflow/recorte para a fotografia.

| Card | Área lógica [V/P para notação] | Tamanho [M] | Conteúdo [C] | Imagem |
|---|---|---|---|---|
| A | colunas1–2, linha1 | 319.4×240 | Ouvindo primeiro | Sem foto |
| B | colunas3–5, linha1 | 495.1×240 | Escolhas cuidadosas | I05, lado direito |
| C | colunas6–7, linhas1–2 | 319.4×512 | Resultados sutis | I04, rosto grande cortado à direita |
| D | colunas1–3, linha2 | 495.1×240 | Cuidados de longo prazo | I06, busto à direita |
| E | colunas4–5, linha2 | 319.4×240 | Althea / Estética e Bem-Estar | Logo textual central |

**[M]** Na posição estabilizada, A inicia em x80, B em 431.4, C em 958.6; linha2 em y inicial+272; D x80 e E x607.1. Valores iniciais antes de reveal podem incluir deslocamentos de 40 px para fora; usar coordenadas estabilizadas.

**Recortes de imagem [V]:**

- B/I05: container absoluto com largura 66%, razão 0.737628, centro em `left:71%`, `top:50%`, `translate(-50%,-50%)`.
- C/I04: container com `height:114%`, razão 1.00544, centro `left:100%`, `top:69%`; deixa só parte do rosto dentro do painel. Variante tablet: altura 176%, centro72%/52%.
- D/I06: largura 47%, razão 0.756008, centro86%/55%.
- **[C]** Fundos brancos das fotografias se fundem com a superfície. Não acrescentar moldura ou contraste retangular.

**[M/V] Tablet:** cinco colunas e três linhas de 240, gap 32, altura 784: A 2 colunas, B3; D3, E2; C passa à última linha em largura total. **[M] Mobile:** quatro cards de 350×240, gap 16; o painel apenas de marca não está presente na variante medida; ordem observada A,B,C,D. Fotografias dos bento estão ocultas na variante mobile do arquivo (classes de visibilidade), portanto não impor os recortes desktop nela.

### 6.8 Depoimentos

**[V]** Título gigante `What our clients say`, duplicado em camadas para reveal; sticky/recortado por rolagem. **[C]** A captura mostra apenas um vestígio muito claro desse título; sua aparência não deve ser confundida com uma imagem de fundo.

**[M/V]** Deck central externo400×520; cartão frontal360×480; padding 32; raio40; borda interna inset8/raio 32; texto serifa32/38.4; cinco estrelas laranja de 16×17 na parte superior; gap 28 antes do conteúdo. Assinatura Inter Display no rodapé. Cartões posteriores rotacionados em leque e reduzidos; suas caixas delimitadoras não representam a largura do componente frontal.

**[V]** Cinco depoimentos: Emma L., Sofia M., Laura P., Isabelle R. e Anna K. **[C]** O cartão frontal da captura é Emma L., com a tradução de uma consulta calma, sem pressa, explicações claras e resultados naturais. O texto original completo de cada depoimento está no apêndice de conteúdo.

**[M]** Controles circulares de 56×56, centralizados verticalmente ao deck; no desktop, posições x299 e x1003 na cena medida. **[C]** Fundo acinzentado translúcido e chevron branco. **[M] Interação testada:** clicar no próximo controle alterou a ordem do deck de Emma para Sofia na frente. Não afirmar a duração medida a partir de uma screenshot; **[V]** componentes do deck possuem uma transição spring de 0.8 s no módulo de variantes, que deve ser preservada quando esse módulo for reutilizado.

**Avaliação inferior [V/M]:** marca TrustPoint; cinco quadrados verdes `30×30` com estrelas brancas, gap 3; texto `TrustScore 4.9 245 reviews` / `TrustScore 4.9 245 avaliações` na captura, fonte 14. **[M]** Em1358×610 a seção inteira tem 1000px; no viewport900 mediu 1125px. Não fixar seu tamanho independente da altura disponível.

### 6.9 Preços

**[C]** Tag `Precificação`; título em duas linhas: `Cuidado atencioso,` / `preços transparentes.`; subtítulo sobre consulta para entender objetivos e recomendar o cuidado adequado.

**[M] Desktop:** seção com padding `240px 80px`; gap 80; cabeçalho 319.6px; quatro cards em linha, gap 24; container 1198×440; cada card281.5×440; padding 32; fundo branco20%; raio40; borda interna inset8 e halo. Títulos32/38.4; preços50/55; descrições14/22.4. O estado pré-reveal pode ter `translateY(20px)` e opacidade quase nula; a captura flagra uma progressão da esquerda para a direita.

| Ordem [V] | Nome original | Nome observado/proposto em português | Preço original |
|---|---|---|---|
| 1 | Skin Health Consultation | Consulta para a Saúde da Pele [C] | from $120 |
| 2 | Aesthetic Treatments | Tratamentos estéticos [C] | from $250 |
| 3 | Wellness & Recovery | Bem-estar e Recuperação [C] | from $180 |
| 4 | Personal Care Plan | Plano de cuidado pessoal [P; card apagado na captura] | from $350 |

**[V]** Valores em dólar; não converter para reais. Todos os cards levam a `/book-a-consultation`. **[C/V]** Nota de preço variável conforme consulta/plano e botão central abaixo; gap 24 entre nota e botão. **[M]** Grupo final 122.8px de altura, separado dos cards por 80px.

**[M] Tablet:** duas colunas373×400 em 810px, gap 24, duas linhas (824px no total). **[M] Mobile:** uma coluna 350px, alturas naturais de 334.8px no inglês, gap 24; não fixar334.8 ao mudar a quantidade de linhas em português.

### 6.10 Métricas e convite

**[V/M]** Valores finais: **9+**, **320+**, **20+**. O DOM animado de `number-flow-react` contém esses dados; os valores intermediários visíveis na captura, como `5+` e dígitos sobrepostos, são estados de contagem, não o conteúdo final.

- **[M]** Três grupos centralizados no container 1080; números 112px, line-height1em no desktop observado; legendas14/22.4, largura contida, centralizadas.
- **[C/V]** Legendas: anos de experiência; clientes apoiados com atenção pessoal; serviços selecionados e revisados.
- **[M]** Gap80 entre métricas e bloco textual inferior. Parágrafo editorial em serifa, centralizado, seguido de CTA escuro.
- **[C]** Mensagem: `Por trás de cada tratamento há tempo, atenção e trabalho cuidadoso. Esses marcos refletem uma prática focada em qualidade, confiança e cuidados de longo prazo.`
- **[M]** Mobile empilha os indicadores; seção 1135.6px no teste390; desktop 672.8px e tablet 547.6px, incluindo padding inferior.
- **[P]** No modo de comparação visual estabilizada, concluir contagem antes de capturar; para corresponder ao screenshot original, é necessário controlar explicitamente o progresso de cada dígito.

### 6.11 Journal / conteúdo editorial

**[C]** Tag `Nosso Diário`; H2 `Insights para cuidados cuidadosos.`; subtítulo sobre saúde da pele, tratamentos e bem-estar de longo prazo.

**[M]** Container central1072; título e cards separados por 80px. Dois links de artigo em linha, gap 32, alturas560. Esquerda 400px e direita 640px; padding 8; raio40; superfície branca.

| Card | Composição [V/M/C] |
|---|---|
| Esquerda, variante B | Título e descrição no topo; foto de plumas secas I07 abaixo. Foto384×357.2 no inglês; raio 32. Categoria sobre a foto, a 12px das bordas, fundo preto30%, padding 4px 10px, raio999. |
| Direita, variante C | Foto close-up I08 em cima,624×386.4; título e descrição embaixo. O rosto olha para baixo/esquerda. Imagem ocupa toda a largura útil, raio 32. |

**Títulos na captura [C]:** `Como a orientação profissional faz a diferença.` e `Hidratação além do hidratante.`. **[V]** Rotas exatas no apêndice. Não alterar o primeiro slug para remover seu ponto final sem registrar a mudança de navegação.

**[M] Tablet:** duas colunas iguais; imagens344×400 em 810px. **[M] Mobile:** uma coluna; cada imagem 334×400 no container 350 com 8px de padding; a ordem foto/texto pode usar a variante touch. Conservar o crop `cover` e medir o ponto focal no layout menor. **[V/M]** Fotos usam `object-fit:cover`, `object-position:50% 50%` nos elementos observados; não distorcer para caber no formato do card.

**[C/V]** Após os artigos: texto de convite ao journal e botão `Navegue por insights` / `Browse insights`, separados por 24px; espaço 80px após os cards e padding inferior 240px desktop/120px nas variantes menores.

### 6.12 FAQ

**[C]** Tag `Perguntas Frequentes`; título `Suas perguntas, respondidas.`; subtítulo `Tudo o que você precisa saber antes de reservar sua visita.`

**[M/V]** Grid1072 em duas colunas 524px, gap 24; colunas independentes, não linhas de altura sincronizada. Cada item branco, padding 24, raio 32; pergunta18/27; resposta14/22.4; ícone de mais à direita. Card fechado comum 75px; com pergunta em duas linhas 102px; abertos267.8 e180.6 no inglês medido. No português, alturas crescem com a quebra e devem acompanhar o conteúdo.

**Estado inicial [C/V]:** primeira pergunta da coluna esquerda e última pergunta da direita abertas; as seis demais fechadas. Ícone de mais se torna `×` no aberto. **[M]** Ao abrir outra pergunta, o total de itens abertos passou de 2 para 3: abertura independente; não impor comportamento de accordion exclusivo.

| Coluna esquerda [C] | Coluna direita [C] |
|---|---|
| Preciso de uma consulta antes de qualquer tratamento? | Os tratamentos são seguros? |
| Os resultados parecem naturais? | Como eu sei qual tratamento é o mais adequado para mim? |
| Vocês oferecem tratamentos de bem-estar além dos estéticos? | Existe alguma pressão para agendar um tratamento? |
| Como posso agendar uma consulta? | O que devo esperar na minha primeira visita? |

**[V]** Respostas completas no apêndice de conteúdo. **[M]** Transição de variantes do FAQ: spring, duração0.6s, bounce0. **[P]** Animar altura e opacidade; manter foco e área clicável estáveis. Em mobile, uma coluna e sequência das quatro perguntas da esquerda seguida das quatro da direita.

**[C/V]** Rodapé de contato abaixo: `Não encontrou o que procurava? Entre em contato e vamos resolver isso.` e `hello@altheacare.com`. Atenção aos href inconsistentes recuperados, listados na seção9.

### 6.13 Newsletter

**[C]** Título `Uma nota discreta de Althea.`; descrição de atualizações ocasionais sobre saúde da pele, cuidados e bem-estar. Placeholder `Digite seu e-mail`; botão `Assine`.

- **[M]** Título66/72.6 no desktop1358; descrição16/24; container do bloco com gap 48.
- **[M]** Formulário640×54 centralizado; gap 8. Campo externo 472px, branco, arredondado; input útil 432px com 20px de respiro horizontal. Botão160×54, padding 16px 32px, raio999, fundo principal.
- **[M]** Consentimento abaixo após 32px, fonte 14/22.4, centralizado e largura limitada; link de política escuro.
- **[C]** Texto: `Ao assinar, você concorda em receber e-mails da Althea. Você pode cancelar a inscrição a qualquer momento. Leia nossa Política de Privacidade.`
- **[M]** Mobile: campo e botão em coluna; largura 350px; input útil 310px; campo 57px e botão 54px; gap 16 entre controles no estado medido.
- **[ND]** Não foi enviado formulário nem validada inscrição real. Destino de submissão, integração, mensagens de sucesso/erro e tratamento de dados precisam de uma especificação funcional separada. **[P]** Estados de focus, loading, sucesso e erro devem existir sem mudar a composição inicial; não afirmar que esses estados visuais foram recuperados.

### 6.14 Footer

**[M]** Espaço 160px entre newsletter e conjunto inferior no desktop; gap 80 nas variantes menores. Dois painéis brancos lado a lado no container 1072, gap 32. Painel Sitemap650.7×314.4; Legal389.3×314.4; padding 48px 64px; raio40.

**[C]** O Sitemap mostra `Casa / Sobre / Serviços / Revista` na primeira coluna e `Artigo / Contato / Agende uma sessão / 404` na segunda. O uso de `Casa` está na captura; trocar por `Início` é uma decisão editorial, não cópia literal. No HTML: `Home / About / Services / Journal / Article / Contact / Book a session / 404`.

**[C]** Painel `Jurídico`: `Política de Privacidade / Termos de Uso / Política de Cookies`. Rótulos 14px muted; links18/27; gap 16 entre links e40 entre rótulo e grupo.

**[M]** Depois dos painéis: contato após 64px; redes sociais após 64px; copyright após 64px; botão/símbolo Framer30×30 e crédito do autor. Footer com padding inferior 120px desktop,80px tablet,60px mobile.

**[M] Mobile:** painéis 350px em coluna, gap 32, padding 48px 32px. Sitemap 654.4px no inglês porque os links se reorganizam; Legal 319.4px. Não manter os dois blocos minúsculos lado a lado.

### 6.15 Elementos promocionais do template

**[V/C]** A página contém um widget flutuante inferior direito com miniatura I14 de outro template, botão `Get this template`, menção `from $129` e variante `New Release`. Há também créditos e badge Framer. Esses elementos pertencem ao material de demonstração do template e **não são fotografias da clínica**.

**[P]** Para reprodução literal da referência, tratá-los como camada auxiliar configurável e preservá-los na captura comparativa. A eventual remoção para um produto final deve ser uma decisão explícita; não suprimir silenciosamente um elemento visível ao prometer reprodução idêntica.

## 7. Matriz de responsividade

| Componente | Desktop ≥1200 [V/M] | Tablet810–1199 [V/M] | Mobile≤809 [V/M] |
|---|---|---|---|
| Cabeçalho | Logo +4 links+CTA | Logo +Menu | Logo +Menu |
| Hero | Título 108px/124px, texto sobre busto | H 188px | H 170px, quebra conforme largura |
| Quote | Sequência sticky/reveal | Texto em fluxo e espaçamento120 | Texto em fluxo, larguraW−40 |
| Serviços | Cards em arco por scroll | Carrossel horizontal | Carrossel horizontal |
| Jornada | Imagem esquerda e escada de 3etapas | Duas áreas, imagem transbordante | Imagem acima e etapas verticais |
| CTA/social | Duas áreas | Duas áreas compactas | Áreas empilhadas |
| Bento | 7 colunas,2 linhas,5 cards | 5 colunas,3 linhas,5 cards | Coluna,4 cards; marca/fotos ocultas na variante |
| Depoimentos | Deck e setas laterais | Deck ajustado | Deck dentro da largura, verificar recortes |
| Preços | 4 colunas | 2 colunas | 1coluna |
| Métricas | 3 colunas | 3 colunas | Coluna |
| Journal | 400+640px | Colunas iguais | Coluna |
| FAQ | 2 colunas independentes | 2 colunas independentes | Coluna |
| Newsletter | Campo+botão na linha | Campo+botão na linha | Campo e botão empilhados |
| Footer | Sitemap+Legal na linha | Na linha, proporções menores | Painéis empilhados |
| Padding final de seção | Em geral 240px | Em geral 120px | Em geral 120px |

**[P]** Validar também em 375,768,809,810,1199,1200,1599,1600 e 1920px, além dos quatro viewports medidos. Esses testes adicionais são recomendações e não foram executados integralmente. Evitar overflow horizontal do documento; permitir overflow controlado apenas nos carrosséis e camadas decorativas.

## 8. Movimento, interação e estados

### 8.1 O que está verificado

- **[V]** Lenis presente no código de rolagem; não há duração global única comprovada para toda animação.
- **[V]** Quote com reveal por palavra e blur,0.8s, intervalo de scroll 800px.
- **[V]** Serviços circulares com parâmetros geométricos especificados na seção6.4.
- **[V/M]** Bento passa de posições deslocadas para a grade alinhada; preços e títulos têm reveal de opacidade/transformação.
- **[V]** Botões contêm cópias do rótulo para transições, motivo de repetições no `innerText`. **[P]** Só uma cópia deve ser anunciada por leitor de tela; não renderizar três frases lado a lado.
- **[V]** Variantes comuns de links/botões: spring0.6s, bounce0; não transferir automaticamente esses parâmetros para qualquer componente que possua uma definição distinta.
- **[M]** FAQ permite múltiplos abertos.
- **[M]** Controle Next dos depoimentos muda a frente do deck.
- **[V]** Números finais9+,320+,20+ são animados.

### 8.2 O que permanece sem medição temporal completa

**[ND]** Curva exata do movimento de mouse do retrato3D, frame a frame da topografia, cronologia completa da transição do menu mobile, todos os estados hover/focus e endpoints de formulário. **[P]** Reutilizar os componentes arquivados quando autorizado e adequado ou realizar uma nova inspeção com acesso ao site; se reimplementar, marcar valores de transição escolhidos como aproximações até comparar vídeo/estados equivalentes.

### 8.3 Acessibilidade sem alteração estética [P]

- Um único H1 semântico; números decorativos podem ser spans mesmo quando o Framer os exportou como H1.
- Links e botões reais para destinos e ações; FAQ com `aria-expanded` e `aria-controls`.
- Foco visível compatível com a identidade; hit area adequada em controles compactos.
- Fotografias decorativas com alt vazio quando adjacentes ao conteúdo equivalente; descrição útil quando a imagem acrescenta informação. Os alts `Althea` e `ClearPath` do arquivo são genéricos, não inventário semântico.
- `prefers-reduced-motion`: retrato estático, contagem concluída, manifesto legível, sem deslocamento em arco que oculte informação.
- Não exibir conteúdo permanentemente invisível se JavaScript ou WebGL falhar; usar o asset colorido do hero como fallback.
- Não depender do verde/laranja como única indicação de avaliação; conservar nota textual.

## 9. Rotas, links e limites de escopo

### 9.1 Rotas recuperadas [V]

| Função | URL relativa |
|---|---|
| Home/logo | `/` |
| Sobre | `/about` |
| Serviços e todos os cards de serviço | `/services` |
| Journal e CTA de artigos | `/journal` |
| Contato | `/contact` |
| Consulta, CTAs e preços | `/book-a-consultation` |
| Artigo1 | `/journal/how-professional-guidance-makes-a-difference.` |
| Artigo2 | `/journal/hydration-beyond-moisturizer` |
| Política de privacidade | `/legal/privacy-policy` |
| Termos | `/legal/terms-of-use` |
| Cookies | `/legal/cookie-policy` |
| Página de erro | `/404` |

**[ND]** Essas páginas não foram capturadas integralmente no ZIP. A existência de href não demonstra que o layout de cada destino foi analisado. Esta especificação não inventa páginas internas, checkout ou agenda.

### 9.2 Inconsistências do original [V]

O texto `hello@altheacare.com` nem sempre corresponde ao href: foram encontrados `mailto:hello@world.com` e `mailto:mailto:hello@altheaclinic.com`. **[P]** Reproduzir a aparência e registrar uma decisão funcional para corrigir os destinos; não copiar o erro silenciosamente nem declarar a correção como comportamento original. Links sociais vão para páginas genéricas das plataformas, sem perfil específico comprovado.

## 10. Plano técnico de implementação e aceite

### 10.1 Componentes sugeridos [P]

`SiteShell`, `AmbientBackground`, `Header`, `MobileMenu`, `SoundToggle`, `HeroPortrait`, `ScrollManifesto`, `ServicesArc`, `ServicesCarousel`, `CareJourney`, `ConsultationCTA`, `AvatarStack`, `TrustRating`, `ApproachBento`, `TestimonialDeck`, `PricingGrid`, `AnimatedMetrics`, `JournalPreview`, `FAQList`, `NewsletterForm`, `Footer`, `TemplatePromo`.

Manter textos e assets em dados separados da geometria dos componentes. Usar fontes e imagens originais do ZIP para a maior fidelidade; geração de novas imagens é uma alternativa de produção, com desvios inevitáveis descritos no documento2. Não converter a página inteira em uma única imagem nem rasterizar textos de interface.

### 10.2 Ordem de construção [P]

1. Preparar fontes, reset, tokens, containers e quatro escalas tipográficas.
2. Montar a sequência de seções e comparar o ritmo vertical sem animação.
3. Aplicar fotografias/crops exatos e máscaras; validar hero e bento antes de efeitos.
4. Reproduzir serviços em arco e carrossel touch, manifesto sticky e deck.
5. Inserir reveals, contagem, fundo procedural e profundidade do retrato.
6. Validar variantes mobile/tablet, interações e acessibilidade.
7. Comparar capturas com mesmo viewport, idioma, fontes e estado de animação.

### 10.3 Critérios de comparação [P; tolerâncias propostas]

| Item | Critério |
|---|---|
| Tipografia | Mesma família/peso/size/line-height/tracking; mesmas quebras do texto-alvo. |
| Caixas principais | Diferença≤2px em posição/dimensão no viewport de referência, quando o conteúdo e o estado são os mesmos. |
| Espaçamentos locais | Diferença≤1–2px em padding/gap de componentes estáticos. |
| Cores | Mesmos valores CSS e composição alfa; comparar áreas planas, sem antialiasing. |
| Imagens | Mesmo arquivo, focal point, escala, máscara e crop; não aceitar apenas “foto semelhante”. |
| Altura da página | Reproduzir estrutura e intervalos; não forçar 14133px com um bloco vazio compensatório. |
| Movimento | Comparar nos mesmos pontos de scroll e tempos; registrar vídeo se a imagem estática for inconclusiva. |
| Breakpoints | Sem saltos não previstos ou perda de conteúdo ao atravessar809/810,1199/1200 e1599/1600. |
| Funcional | Menu, FAQ, carrosséis, CTAs e áudio utilizáveis por mouse/toque/teclado; formulário conforme integração definida separadamente. |

Para revisão visual, usar overlay a50% e mapa de diferença após estabilizar fontes, imagens e scroll. Não definir uma porcentagem universal de similaridade como prova de fidelidade: antialiasing, canvas, língua e animações interferem no cálculo.

### 10.4 Validações efetivamente realizadas

- **Executado:** inventário do ZIP; abertura/inspeção dos21 arquivos visuais físicos; dimensões/proporções e transparência; extração de estilos; medição das12 seções em 4 viewports; comparação de alturas com a captura.
- **Executado:** abertura de mais um item de FAQ (2 → 3 abertos); avanço do deck de depoimentos; abertura do menu mobile; inspeção de rotas e fontes.
- **Parcial:** execução de efeitos e carregamento lazy. O retrato WebGL não apareceu na automação; usar a captura e os assets como evidência visual desse componente.
- **Não executado:** submissão de newsletter, agendamento real, navegação integral por páginas internas, validação em Safari/Firefox, auditoria completa de acessibilidade, medição frame a frame de todas as animações e inspeção da versão pública atual.

## 11. Referências rastreáveis e manutenção

- Evidência de medidas: [referencias/medidas.json](referencias/medidas.json).
- Contato dos raster assets: [referencias/contato-imagens.jpg](referencias/contato-imagens.jpg).
- Assets locais identificados individualmente no [documento2](02-inventario-imagens-e-prompts.md).
- Para recuperar CSS exato: ler os `<style>` do documento de origem no ZIP, não apenas a captura. Classes Framer são hashes de exportação, não nomes de componentes estáveis.
- Módulo principal de composição e efeitos inspecionado: `9ZdNc_ZZWom6tRkRQwqruIOct_Toegtw9nyODWnYD2Y.BopVWxmg.mjs`.
- FAQ: `Zo4Qkn6BH.DevnLthk.mjs`; deck/variantes: `Zpq1pwEuB.CJagyfsT.mjs`; estilos globais/Lenis: `shared-lib.BVykF7Zt.mjs`.

Qualquer valor novo deve receber a marca de evidência correspondente e o viewport/estado em que foi obtido. A fidelidade deve ser avaliada contra a mesma versão de referência, evitando misturar propriedades atuais do site público com a captura arquivada sem registrar a mudança.

## Apêndice A — conteúdo textual original do arquivo

O bloco a seguir preserva o texto inglês extraído do documento para consulta de copy e respostas não totalmente legíveis na captura. Repetições técnicas de labels de botão e variantes de FAQ foram removidas na extração de parágrafos; não é uma proposta de substituir a tradução visível. Os nomes, valores e rotas das seções acima têm prioridade para localizar o componente.

```text
Althea

About

Services

Journal

Contact

Book a consultation

Experience
with sound

Subtle care. Visible confidence.

Modern aesthetic and wellness care, with a gentle and personal approach.

Start your journey

Dr. Eva Laurent — Founder

Our Services

Thoughtful care, chosen for you.

We offer a carefully selected range of aesthetic and wellness treatments focused on natural results and long-term skin health.

Skin
Health

Treatments designed to support balanced, healthy skin and maintain its natural strength over time.

Click to learn more

Aesthetic
Care

Subtle, non-invasive treatments designed to refresh your natural look without going to extremes.

Wellness &
Recovery

Care that supports deep relaxation, gentle recovery, and overall well-being for body and mind.

Personal
Consultation

A calm, one-on-one conversation to understand your goals and create a plan that fits you.

Long-Term
Care Plans

Thoughtful programs built around your skin and wellness needs, focused on lasting results.

Your Care Journey.

A simple, thoughtful process designed to understand your needs and guide you toward natural, lasting results.

01
Consultation.

We begin with a calm conversation to understand your goals and concerns before recommending the right approach.

02
Personalized Plan.

Based on your skin, lifestyle, and preferences, we create a thoughtful plan designed to support natural and balanced results.

03
Treatment & Care.

Treatments are performed with precision and care, followed by guidance to support long-term skin health and maintain refined results.

Ready to begin
your care?

Every step at Althea starts with a conversation. Together, we create a plan that feels right for you — calm, considered, and focused on long-term well-being.

Trusted by 80+ clients

+81

Excellent 4.9 out of 5

TrustPoint

Send us an email or connect with us on social — we’re always happy to help.

Our Approach

Bringing the pieces together.

Our approach is built by combining a few essential elements. Together, they create a thoughtful, balanced way of caring for you — from the first consultation to long-term support.

Listening first

Every journey starts with a real conversation. We take time to understand your goals, your concerns, and what truly matters to you.

Careful
choices

We recommend only what makes sense for you. No trends, no pressure — just thoughtful treatments chosen with care.

Subtle
results

Our focus is on natural-looking outcomes. The goal is to help you look refreshed and feel confident, never overdone.

Long-term
care

We think beyond quick fixes. Our approach supports your skin health and well-being over time, not just today.

Aesthetic & Wellness

TrustScore 4.9  245 reviews

What our
clients say
What our
clients say
“I appreciated how calm and unhurried the consultation felt. Everything was explained clearly, and the results look natural — exactly what I hoped for.”

— Emma L.

“I liked how personal the whole experience felt. Nothing was rushed, and the recommendations made complete sense for my skin. The results look fresh and natural.”

— Sofia M.

“The consultation was very thoughtful. I never felt pushed toward treatments I didn’t need, and the final result looks subtle but noticeably better.”

— Laura P.

“What stood out most was the calm atmosphere and clear explanations. I felt comfortable asking questions, and everything was done with real care.”

— Isabelle R.

“I was looking for something natural, not dramatic. The treatment refreshed my skin without changing how I look — exactly what I wanted.”

— Anna K.

Pricing

Thoughtful care,
transparent pricing.

Every treatment begins with a consultation so we can understand your goals and recommend what truly fits you.

Skin Health
Consultation

from

$120

A detailed skin assessment with personalized guidance to help you understand your skin and choose the most suitable care approach.

Aesthetic
Treatments

$250

Subtle, non-invasive treatments designed to refresh your appearance while maintaining natural, balanced results.

$180

Relaxing treatments that support recovery, reduce tension, and restore a natural sense of balance for body and mind.

Personal
Care Plan

$350

A tailored program combining treatments and professional guidance to support long-term skin health and well-being.

Final pricing may vary depending on your personal consultation and treatment plan.

Book your consultation

Years of experience in aesthetic and wellness care

Clients supported with personal, thoughtful attention

Services carefully selected and regularly reviewed

Behind every treatment is time, attention, and thoughtful work. These milestones reflect a practice focused on quality, trust, and long-term care.

Our Journal

Insights for thoughtful care.

Notes on skin health, aesthetic treatments, and simple ways to support long-term well-being.

Aesthetic Care

How Professional Guidance Makes a Difference.

A closer look at why personal assessment matters and how tailored care supports refined outcomes.

Wellness

Hydration Beyond Moisturizer.

An overview of internal and external hydration, what truly supports moisture retention, and how to maintain it daily.

Explore more articles in our Journal and discover practical insights for thoughtful, long-term care.

Browse insights

Frequently Asked Questions

Your questions, answered.

Everything you need to know before booking your visit.

Do I need a consultation before any treatment?

Yes. Every treatment at Althea starts with a personal consultation. This gives us time to understand your goals, your concerns, and your skin or wellness needs.

We use this conversation to answer your questions, explain your options, and suggest only what truly fits you. There is no pressure and no rush — the consultation is about making careful, well-informed decisions together.

Are the results natural-looking?

Yes. Our approach is focused on subtle, natural results. The goal is to help you look refreshed and feel confident, not overdone.

Do you offer wellness treatments as well as aesthetic ones?

Yes. Althea combines aesthetic care with wellness-focused treatments that support relaxation, recovery, and overall balance.

How can I book an appointment?

You can book your consultation online through our booking page or contact us directly if you have questions first.

Are the treatments safe?

Your safety is always our priority. We work with professional standards, proven methods, and carefully chosen treatments designed for long-term skin health and well-being.

How do I know which treatment is right for me?

You don’t need to decide alone. During your consultation, we listen to your goals and concerns and create a personal plan that makes sense for you.

Is there any pressure to book a treatment?

No. We believe good care starts with trust and honest advice. The consultation is about understanding your options, not pushing you into decisions.

What should I expect during my first visit?

Your first visit starts with a calm, personal consultation. We talk about your goals, your skin or wellness concerns, and any questions you may have. From there, we suggest a thoughtful plan that fits you, without pressure and without rushing into decisions.

Didn’t find what you were looking for? Get in touch and let’s sort it out.

hello@altheacare.com

A quiet note from Althea.

Occasional updates on skin health, thoughtful care, and simple ways to support your well being.

Subscribe

By subscribing, you agree to receive emails from Althea. You can unsubscribe at any time. Read our Privacy Policy.

Sitemap

Home

Article

Book a session

404

Legal

Privacy Policy

Terms of Use

Cookie Policy

Copyright 2026 Althea. All rights reserved.

Framer Template handcrafted by Anton Drukarov

New Release

Get this template

from $129
```
