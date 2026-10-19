# Althea — inventário visual, prompt-base e prompts individuais

**Referência:** https://althea-template.framer.website/

**Data:** 19/10/2026. **Escopo:** imagens e elementos gráficos da home presentes ou referenciados no ZIP, cruzados com a captura de 1358× 14133px.

**Documento de layout:** [Especificação técnica](01-especificacao-tecnica-althea.md).

## 1. Cobertura e evidência

O ZIP contém **21 arquivos visuais físicos** em `assets/framerusercontent.com/images/`: **18 raster e 3 SVG**. Duas fotografias têm versões1024e 2048, resultando em **19 imagens lógicas distintas:16 raster e 3 SVG**. Este documento identifica as19, suas variantes, usos e prompts. O áudio, as fontes e os scripts não são imagens. Elementos desenhados em CSS/canvas/SVG inline são inventariados separadamente na seção7.

As cópias de referência estão em [referencias/assets](referencias/assets), com os nomes originais. [Prancha de contato dos raster assets](referencias/contato-imagens.jpg). As miniaturas abaixo servem para identificação; tamanho de exibição no Markdown não é medida de layout.

**Precisão:** **[V]** metadado/arquivo/código verificado; **[M]** medida no navegador arquivado; **[C]** observação da captura ou do asset aberto; **[E]** interpretação visual/estimativa; **[P]** proposta para produzir um substituto; **[ND]** não determinado. Cores descritivas e distâncias fotográficas são aproximações visuais; resolução, modo de cor e nomes de arquivo são verificados. Não há EXIF de lente/estúdio recuperado; termos como “85mm” nos prompts são orientações de geração, não fatos sobre a fotografia original.

O site público retornou bloqueio 403 no ambiente. O inventário não afirma cobrir fotografias exclusivas de `/about`, `/services` ou páginas de artigo não arquivadas. Uma imagem social adicional é citada no código, mas seu arquivo não está no ZIP; está registrada como X01, sem composição inventada.

## 2. Diretriz de fidelidade

Para reprodução praticamente idêntica, **reutilizar os arquivos originais** é a primeira escolha: todos os assets visuais efetivamente capturados estão disponíveis. Regenerar uma fotografia altera identidade, contornos, cabelo, iluminação e crop. Prompts detalhados reduzem diferenças, mas não garantem igualdade de pixels nem continuidade perfeita de uma pessoa entre gerações.

Os retratos de I01/I03/I04/I05/I06 têm forte coerência visual — pele muito clara, cabelo castanho preso, acabamento de beleza high-key. **[E]** Parecem pertencer à mesma família visual; não é possível comprovar que representam a mesma pessoa real. Para gerar uma coleção consistente, usar uma imagem aprovada como referência visual em todos os pedidos e conferir rosto/cabelo antes de prosseguir. O retrato frontal I03 é a versão com alfa; I04 é uma imagem semelhante sobre branco, com função de recorte diferente. Não tratá-las como arquivos intercambiáveis sem comparar a silhueta.

### 2.1 Fluxo recomendado de geração [P]

1. Selecionar I01 ou I03 como referência de identidade e aprovar um retrato mestre.
2. Gerar os demais retratos editoriais mantendo a referência aprovada e pedindo apenas mudança de pose/enquadramento.
3. Gerar a natureza-morta I07 e o close-up I08 com a mesma temperatura e contraste suaves.
4. Tratar avatars I09–I13 como uma série separada: são deliberadamente mais saturados e variados.
5. Usar originais para SVG, ícones, marcas e máscara. Um gerador raster não oferece a precisão geométrica de um vetor.
6. Exportar em resolução suficiente, conferir alfa real, dimensões, perfil de cor e crop em todos os cards. Redimensionar de maneira determinística para as variantes menores; não gerar uma pessoa nova para cada resolução.

### 2.2 Formato e resolução

Os tamanhos exatos abaixo são os dos arquivos disponíveis. O gerador do ChatGPT pode não oferecer esses canvases arbitrários. Nesse caso, solicitar a proporção mais próxima, reservar margem de segurança e ajustar o canvas na exportação. Não esticar o rosto para atingir o tamanho. Para retratos com alfa, pedir **fundo transparente verdadeiro**, não quadriculado desenhado; preservar fios e transição dos ombros. Os prompts não precisam conter texto de UI, que deve permanecer em HTML/CSS.

## 3. Prompt-base de consistência estética

### 3.1 Série editorial e retratos da clínica — base pronta

```text
Crie uma imagem editorial de beleza e bem-estar para o site Althea, seguindo com máxima fidelidade as referências visuais fornecidas. Estética high-key, calma, delicada e minimalista; luz muito ampla e difusa, com preenchimento frontal generoso e sombras quase imperceptíveis. Paleta de branco leitoso, pérola, cinza frio muito claro, azul acinzentado suave e rosa natural de pele; saturação baixa, contraste suave e altas luzes preservadas. Aparência fotográfica de campanha de skincare premium, acabamento limpo e refinado, pele luminosa com textura muito sutil e anatomia natural, sem efeito de plástico e sem nitidez agressiva. Em retratos, use uma mulher claramente adulta, cabelo castanho liso preso de forma baixa e limpa, maquiagem quase imperceptível, sem acessórios; preserve a identidade da referência aprovada quando ela estiver anexada. Enquadramento e direção do olhar devem seguir a descrição específica, sem espelhar a imagem. Não inclua texto, logotipo, embalagem, equipamento clínico, agulhas, antes/depois, elementos decorativos extras, borda ou marca-d’água. Respeite a área negativa e a proporção solicitadas. A descrição específica define se o fundo deve ser branco opaco ou transparente com canal alfa. Entregue apenas a imagem, em alta resolução.
```

### 3.2 Série de avatares — base própria

```text
Crie um retrato fotográfico de uma pessoa claramente adulta para um avatar circular pequeno. Use a composição e a aparência descritas no pedido individual, com rosto reconhecível no recorte central, fundo simples e boa separação entre cabeça e fundo. Preserve o estilo realista de retrato editorial informal, luz agradável e textura natural. Nesta série, mantenha a cor de fundo específica de cada pessoa: azul, mostarda ou terracota; não aplique automaticamente o fundo branco e a paleta dessaturada dos retratos principais do site. Componha no formato quadrado e deixe margem para um recorte circular sem cortar olhos ou queixo. Sem texto, logotipo, moldura ou marca-d’água; alta qualidade mesmo em uma miniatura de 44 pixels.
```

### 3.3 Elementos técnicos e vetores

Não aplicar a base fotográfica ao depth map, máscaras, setas, favicon ou ícones. Seus prompts individuais descrevem apenas geometria/cor/fundo. Para SVG e marca, a opção de alta fidelidade é conservar o vetor ou a fonte original; geração serve como esboço substituto.

## 4. Índice de imagens

| ID | Imagem lógica | Arquivos / dimensões [V] | Papel |
|---|---|---|---|
| I01 | Busto do hero em perfil3/4 | WEBP 928×1228, RGBA | Retrato com profundidade no hero |
| I02 | Mapa de profundidade do hero | JPEG 612×810, RGB | Textura técnica; não exibir como foto |
| I03 | Busto frontal transparente | WEBP 1667×1653, RGBA | Jornada de cuidado |
| I04 | Retrato frontal sobre branco | JPEG 1667×1653, RGB | Bento “Resultados sutis” |
| I05 | Mulher olhando para baixo | JPEG 758×1024, RGB | Bento “Escolhas cuidadosas” |
| I06 | Busto inclinado olhando para cima | JPEG 774×1024, RGB | Bento “Cuidados de longo prazo” |
| I07 | Plumas secas e luz na parede | JPEG 1024² e 2048², RGB | Artigo de orientação profissional |
| I08 | Close-up lateral de skincare | JPEG 1024² e 2048², RGB | Artigo de hidratação |
| I09 | Mulher de cabelo cacheado sobre azul | JPEG 280², RGB | Avatar1 |
| I10 | Homem de óculos sobre mostarda | JPEG 512², RGB | Avatar2 |
| I11 | Mulher de óculos sobre terracota | JPEG 512², RGB | Avatar3 |
| I12 | Homem de óculos escuros ao ar livre | JPEG 512², RGB | Avatar4 |
| I13 | Mulher de cabelo escuro sobre mostarda | JPEG 512², RGB | Avatar5 |
| I14 | Miniatura de outro template | JPEG 512×384, RGB | Widget promocional |
| I15 | Ícone Apple touch | PNG 180², paleta indexada | Metadado, “t” branca sobre azul |
| I16 | Favicon | PNG 64², RGBA | Metadado, “t” preta sobre azul |
| I17 | Chevron para a esquerda | SVG 40×40 | Controle de carrossel |
| I18 | Chevron para a direita | SVG 40×40 | Controle de carrossel |
| I19 | Máscara de recorte dos avatars | SVG 40×48 | Máscara alfa; não é ilustração visível |

Os IDs abaixo são estáveis neste material. Os arquivos físicos e hashes estão no apêndiceB.

## 5. Imagens editoriais e recursos técnicos

### I01 — Retrato do hero — perfil de olhos fechados

<img src="referencias/assets/oK4ZpG0Udo91FCmeNX5CiuStQBg__qdd5a09f3.webp" alt="Referência I01" width="240">

**Arquivos originais [V]:**

- [oK4ZpG0Udo91FCmeNX5CiuStQBg__qdd5a09f3.webp](referencias/assets/oK4ZpG0Udo91FCmeNX5CiuStQBg__qdd5a09f3.webp) — 928×1228; RGBA; proporção 0.7557:1; 57,355 bytes.

**Uso [V/C]:** Hero, camada central atrás do H1; imagem colorida do efeito3D.

**Composição e estilo [C/E]:** Mulher adulta de pele muito clara e cabelo castanho escuro, repartido e preso num coque baixo. Busto em três quartos: torso levemente girado, cabeça inclinada para trás, nariz apontando para a direita da imagem e olhos fechados. Pescoço comprido; orelha próxima visível; ombros e clavículas delicadamente iluminados. Lábios rosados discretamente entreabertos. O cabelo cria a principal área escura. Acabamento muito suave, entre fotografia de beleza retocada e render editorial, sem cenário ou acessórios. Não há roupa visível no recorte dos ombros; o enquadramento não é de corpo inteiro.

**Proporção, crop e integração:** Proporção0.7557:1, próxima de 3:4. Há canal alfa real [V]; a silhueta precisa continuar limpa contra o fundo azul luminoso. A direção do nariz é para a direita da tela; não espelhar. O título passa à frente da parte inferior da cabeça/colo, portanto não gerar texto dentro da imagem. Escala é guiada pela altura do container e máscara90vh/70vh descrita no documento1.

**Paleta:** Pele rosa-pérola quase branca, cabelo castanho frio com reflexos acinzentados, boca rosa muito suave. Contraste concentrado no cabelo; sombras de pele lavanda/bege muito claras [C/E].

**Prompt individual completo [P]:**

```text
Crie um retrato editorial de skincare premium, em orientação vertical próxima de 3:4. Mostre uma mulher claramente adulta de aproximadamente 25–35 anos, pele muito clara e luminosa, cabelo castanho escuro liso com risca central, preso num coque baixo. Componha do alto da cabeça até os ombros e parte superior do busto. Torso em três quartos e rosto em perfil de três quartos voltado para a direita da imagem; cabeça levemente inclinada para trás, nariz elevado, olhos delicadamente fechados, boca rosada relaxada e ligeiramente entreaberta. Preserve um pescoço alongado, anatomia natural, orelha próxima e clavículas suaves. Use luz high-key ampla, branca e fria, sem sombra dura; aparência fotográfica muito refinada, textura de pele sutil e acabamento difuso, sem brilho oleoso. Fundo totalmente transparente com canal alfa real, sem quadriculado desenhado; preserve fios de cabelo e uma transição delicada na base dos ombros. Deixe uma pequena margem no alto e nas laterais e não corte o nariz. Sem acessórios, roupa visível além do recorte, equipamento clínico, texto, moldura ou marca-d’água. Se uma referência estiver anexada, preserve a identidade, a pose e o desenho de cabelo dessa referência. O canvas final de referência é928×1228; use a proporção mais próxima disponível sem deformar o rosto.
```

### I02 — Depth map do hero — mapa em escala de cinza

<img src="referencias/assets/30nszQvXKcEgIENheS0WavYlM2Y__q2a2e22cb.jpg" alt="Referência I02" width="240">

**Arquivos originais [V]:**

- [30nszQvXKcEgIENheS0WavYlM2Y__q2a2e22cb.jpg](referencias/assets/30nszQvXKcEgIENheS0WavYlM2Y__q2a2e22cb.jpg) — 612×810; RGB; proporção 0.7556:1; 9,190 bytes.

**Uso [V/C]:** Entrada técnica depthMap do efeito de profundidade de I01; não aparece como fotografia no layout.

**Composição e estilo [C/E]:** Silhueta de cabeça, pescoço e ombros sobre preto. Rosto em perfil de três quartos voltado à direita, cabeça inclinada para trás. Volumes são codificados por luminosidade: testa, nariz, bochecha, queixo e ombro próximos ficam claros; bordas e partes afastadas escurecem. Aparência de busto cinza suavemente esculpido. É um JPEG RGB com conteúdo visual acromático, não arquivo de profundidade métrica nem modelo3D [V/C].

**Proporção, crop e integração:** 612×810, razão 0.7556:1, praticamente a mesma proporção de I01. O alinhamento entre silhuetas deve ocorrer em coordenadas normalizadas; apenas a dimensão em pixels é diferente. Intensidade45 e invertDepthfalse no componente [V]. Um novo mapa desalinhado causa deformação de nariz, olhos e cabelos.

**Paleta:** Preto no fundo e cinzas contínuos com branco nos volumes mais próximos; sem cor e sem textura de pele [C].

**Prompt individual completo [P]:**

```text
Usando como referência obrigatória o retrato colorido do hero anexado, produza um mapa de profundidade relativo em escala de cinza para a mesma imagem. Preserve exatamente o enquadramento, a silhueta, o perfil voltado à direita, a inclinação da cabeça, o coque, o pescoço e os ombros; não mude a pessoa nem a pose. Fundo preto uniforme. Codifique os volumes próximos em tons claros e as regiões afastadas em tons escuros, com transições contínuas e suaves. Dê volume gradual à testa, ponte do nariz, bochecha, lábios, queixo, pescoço e ombros; mantenha os cabelos como massa volumétrica, sem fios de alto contraste. Remova textura fotográfica, maquiagem, reflexos especulares e qualquer cor. Não desenhe linhas de contorno, números, legenda ou luz estética direcional. Produza a mesma proporção vertical do retrato, próxima de 3:4, com alvo 612×810 na exportação. Este é um mapa de profundidade artístico para parallax, não uma fotografia em preto e branco.
```

**Limite técnico:** um depth map gerado visualmente não é profundidade calibrada. A equivalência precisa com I01 exige conferência de alinhamento, ausência de halos e teste do shader; conservar o mapa original é mais fiel. Não declarar esse prompt como método de reconstrução3D exata.

### I03 — Busto frontal com transparência — jornada

<img src="referencias/assets/azpEwdss6XW8gQrcvhKGGrYqjg__qec5eb331.webp" alt="Referência I03" width="240">

**Arquivos originais [V]:**

- [azpEwdss6XW8gQrcvhKGGrYqjg__qec5eb331.webp](referencias/assets/azpEwdss6XW8gQrcvhKGGrYqjg__qec5eb331.webp) — 1667×1653; RGBA; proporção1.0085:1; 96,244 bytes.

**Uso [V/C]:** Imagem grande à esquerda das etapas01,02,03 em Your Care Journey.

**Composição e estilo [C/E]:** Retrato frontal simétrico, cabeça ereta, olhos azul-acinzentados olhando diretamente para a câmera, boca pequena rosada e expressão neutra serena. Risca central no cabelo castanho preso; orelhas aparecem dos dois lados. Pele muito clara com luz uniforme, pescoço longo e ombros abertos. Busto ocupa quase todo o quadrado; cabelo no alto, ombros no terço inferior. A base perde opacidade e se mistura ao fundo da página. É semelhante à composição de I04, mas possui recorte e canal alfa próprios [C/V].

**Proporção, crop e integração:** 1667×1653, razão 1.0085:1. Não cortar o topo da cabeça ou as orelhas ao encaixar. A imagem transborda a coluna nominal 500px no desktop; não reduzir para um pequeno avatar. Preservar a centralidade do rosto mesmo quando o busto se sobrepõe aos números.

**Paleta:** Rosa muito claro da pele, olhos azul-cinza, cabelo castanho frio, leve sombra malva e boca rosa pálido [C/E].

**Prompt individual completo [P]:**

```text
Crie um retrato editorial de beleza high-key em formato quase quadrado. Mostre uma mulher claramente adulta de 25–35 anos, pele muito clara e luminosa, rosto oval delicado, olhos azul-acinzentados olhando diretamente para a câmera, sobrancelhas castanhas naturais, lábios pequenos rosa pálido e expressão neutra serena. A cabeça deve estar perfeitamente frontal e ereta, sem inclinação, com os dois olhos no mesmo nível. Cabelo castanho liso com risca central, preso para trás, e orelhas visíveis dos dois lados. Enquadre da parte superior da cabeça até ombros e clavículas, com pescoço longo e os ombros abertos simetricamente. Use iluminação muito ampla e difusa, quase sem sombras, balanço frio-neutro e baixo contraste; fotografia de skincare refinada com pele delicada e textura sutil. Fundo realmente transparente com canal alfa, sem cenário nem quadriculado desenhado; suavize progressivamente a borda inferior dos ombros para integrar ao fundo da página. Preserve a identidade da referência aprovada se anexada. Não adicione acessórios, maquiagem marcada, texto, marca-d’água ou corte das orelhas. Alvo de exportação1667×1653, sem esticar a anatomia.
```

### I04 — Retrato frontal branco — bento de resultados

<img src="referencias/assets/Iygm9WFensHwXXoe01QWLQ0iF78__qec5eb331.jpg" alt="Referência I04" width="240">

**Arquivos originais [V]:**

- [Iygm9WFensHwXXoe01QWLQ0iF78__qec5eb331.jpg](referencias/assets/Iygm9WFensHwXXoe01QWLQ0iF78__qec5eb331.jpg) — 1667×1653; RGB; proporção1.0085:1; 71,370 bytes.

**Uso [V/C]:** Card vertical Resultados sutis. A imagem fica deslocada para a direita, com parte do rosto cortada pelo painel.

**Composição e estilo [C/E]:** Busto frontal de mulher adulta, olhos claros voltados à câmera, pele muito clara, cabelo castanho repartido ao meio e preso. Fundo branco opaco e ombros que se diluem na alta exposição. Rosto no eixo central da imagem original; os olhos aproximadamente no terço superior/centro superior e ombros na metade inferior. Sua aparência se aproxima de I03, mas o JPEG tem fundo branco e não contém alfa [V/C].

**Proporção, crop e integração:** 1667×1653, razão 1.0085:1. No desktop o container tem altura 114% do painel, centro em 100%/69%; a imagem ultrapassa a borda direita. O crop de card mostra aproximadamente uma lateral do rosto. Não gerar diretamente uma meia-face: conservar o retrato inteiro para controlar o recorte viaCSS.

**Paleta:** Branco puro no entorno, pele pérola rosada, cabelo castanho acinzentado, olhos azuis claros e boca rosa discreta [C/E].

**Prompt individual completo [P]:**

```text
Crie um retrato fotográfico editorial de skincare em formato quase quadrado, sobre fundo branco puro opaco. Mulher claramente adulta de 25–35 anos com pele muito clara, rosto oval, olhos azul-acinzentados olhando de frente para a câmera, boca pequena rosada e expressão calma e neutra. Cabeça ereta perfeitamente frontal, cabelo castanho liso com risca central preso para trás, orelhas visíveis e sem brincos. Inclua a cabeça inteira, pescoço alongado, clavículas e ambos os ombros; componha simetricamente com o rosto centralizado. Luz de estúdio high-key muito difusa e abundante, sombra mínima, baixo contraste, gradação rosa-pérola suave e textura de pele discreta. Faça os ombros se fundirem suavemente no fundo branco na parte inferior. Se uma referência de identidade estiver anexada, preserve seus traços e o desenho do cabelo. Não corte metade do rosto: a imagem será recortada pelo layout posteriormente. Sem roupa destacada, acessórios, objetos, texto, logo, moldura ou marca-d’água. Referência de proporção1667×1653.
```

### I05 — Retrato de olhos baixos — escolhas cuidadosas

<img src="referencias/assets/AYmhm7fQptPoF2bCQsLfIJDi0U4__qb58c289b.jpg" alt="Referência I05" width="240">

**Arquivos originais [V]:**

- [AYmhm7fQptPoF2bCQsLfIJDi0U4__qb58c289b.jpg](referencias/assets/AYmhm7fQptPoF2bCQsLfIJDi0U4__qb58c289b.jpg) — 758×1024; RGB; proporção 0.7402:1; 46,639 bytes.

**Uso [V/C]:** Lado direito do card horizontal Escolhas cuidadosas.

**Composição e estilo [C/E]:** Mulher adulta com cabelo castanho em coque baixo na parte posterior esquerda da imagem, cabeça inclinada para baixo e rosto voltado para a direita. Olhos fechados ou fortemente abaixados, nariz e lábios delicados em perfil de três quartos. Pescoço e ombro do lado próximo percorrem a área inferior. Fundo branco extremamente claro; a imagem tem efeito suave e etéreo, sem acessórios nem cenário. Cabeça/rosto estão relativamente próximos da parte superior e direita [C].

**Proporção, crop e integração:** 758×1024, razão 0.7402:1. O código declara dimensão de origem1297×1753, mas o arquivo capturado é menor [V]. Reproduzir a proporção, não prometer os pixels originais ausentes. No card, largura 66% e centro71%/50%; o texto deve continuar à esquerda.

**Paleta:** Fundo branco, pele rosada muito clara, cabelo castanho frio, sombras cinza-lilás discretas [C/E].

**Prompt individual completo [P]:**

```text
Produza um retrato editorial vertical de beleza high-key, próximo de 3:4, sobre fundo branco puro. Mostre uma mulher claramente adulta de 25–35 anos, pele muito clara e cabelo castanho liso preso num coque baixo limpo. Enquadre cabeça, pescoço e ombros. O rosto deve estar em três quartos voltado para a direita da imagem e inclinado para baixo, olhos delicadamente fechados ou abaixados, boca relaxada, expressão contemplativa. O coque aparece atrás da cabeça, à esquerda do rosto. Preserve o perfil suave do nariz, a mandíbula natural e o pescoço alongado. Use luz ampla e difusa frontal/lateral, sem sombras duras; paleta pérola e rosa natural muito claro, cabelo como principal contraste escuro. Acabamento fotográfico delicado, sem maquiagem evidente e sem aspecto oleoso. Dissolva suavemente os ombros no branco inferior. Mantenha a identidade da referência aprovada se anexada. Sem acessórios, texto, logotipos, mãos, objetos ou marca-d’água. Reserve o enquadramento completo para posterior crop no lado direito de um card; não desenhe o card nem o texto. Proporção final758×1024.
```

### I06 — Retrato branco com cabeça elevada — cuidado prolongado

<img src="referencias/assets/AFEMnkblR75GU9bwfRpmzlqBpQ__q6685a546.jpg" alt="Referência I06" width="240">

**Arquivos originais [V]:**

- [AFEMnkblR75GU9bwfRpmzlqBpQ__q6685a546.jpg](referencias/assets/AFEMnkblR75GU9bwfRpmzlqBpQ__q6685a546.jpg) — 774×1024; RGB; proporção 0.7559:1; 25,793 bytes.

**Uso [V/C]:** Lado direito do card Cuidados de longo prazo.

**Composição e estilo [C/E]:** Busto de mulher adulta com cabelo castanho preso, olhos fechados e cabeça elevada em perfil de três quartos. Nesta imagem o nariz aponta para a esquerda da tela, ao contrário do hero I01. Pescoço longo, queixo alto, ombros em luz branca difusa. Fundo branco contínuo e base muito clara, com ombros suavizados. Aparência fotográfica extremamente delicada e baixa saturação [C].

**Proporção, crop e integração:** 774×1024, razão 0.7559:1; dimensão declarada de origem1856×2455, arquivo capturado774×1024 [V]. Container de 47% da largura do card, centro86%/55%. Manter o nariz apontando ao espaço livre à esquerda; não espelhar automaticamente I01 e considerar pronto.

**Paleta:** Branco leitoso, rosa pálido, sombras frias leves e castanho escuro no cabelo [C/E].

**Prompt individual completo [P]:**

```text
Crie uma fotografia editorial vertical de skincare sobre fundo branco high-key, em proporção próxima de 3:4. Mulher claramente adulta de 25–35 anos, pele muito clara, cabelo castanho liso preso para trás num coque baixo, maquiagem quase invisível. Retrato do alto da cabeça até ombros e clavículas. Torso em três quartos, cabeça levemente inclinada para trás, queixo elevado e nariz apontando para a esquerda da imagem. Olhos suavemente fechados e lábios rosados relaxados. Preserve pescoço alongado e anatomia natural, com clavículas e ombros delicadamente iluminados. Luz de estúdio muito ampla e difusa, abundante preenchimento branco, baixo contraste e temperatura fria-neutra; pele pérola, sem brilho plástico. Faça a base dos ombros se fundir suavemente no fundo branco opaco. Mantenha os traços da referência aprovada se anexada, mas preserve a orientação para a esquerda deste pedido. Sem acessórios, objetos, texto, moldura ou marca-d’água. Entregue o busto inteiro para recorte posterior, na proporção774×1024.
```

### I07 — Natureza-morta de plumas secas — artigo editorial

<img src="referencias/assets/nJqFkXMmRiafaaCThCYlQSprSFk__qc3f29497.jpg" alt="Referência I07" width="240">

**Arquivos originais [V]:**

- [nJqFkXMmRiafaaCThCYlQSprSFk__qc3f29497.jpg](referencias/assets/nJqFkXMmRiafaaCThCYlQSprSFk__qc3f29497.jpg) — 2048×2048; RGB; proporção1.0000:1; 150,582 bytes.
- [nJqFkXMmRiafaaCThCYlQSprSFk__q6849539d.jpg](referencias/assets/nJqFkXMmRiafaaCThCYlQSprSFk__q6849539d.jpg) — 1024×1024; RGB; proporção1.0000:1; 46,308 bytes.

**Uso [V/C]:** Fotografia do artigo Como a orientação profissional faz a diferença, no card esquerdo do journal.

**Composição e estilo [C/E]:** Hastes finas de gramíneas/plumas secas em tons areia e creme atravessam verticalmente a composição. Uma pluma clara maior ocupa a região central/esquerda, enquanto outras hastes e espigas mais desfocadas seguem à direita. Fundo de parede cinza-gelo quente, com faixas diagonais de luz de janela e sombra ampla. Não há vaso visível no crop. Profundidade de campo rasa e textura fibrosa delicada; imagem silenciosa e quase monocromática [C].

**Proporção, crop e integração:** Mestres capturados2048×2048 e 1024×1024, mesma fotografia com variantes de resolução [V]. Não gerar duas composições distintas. O card desktop recorta aproximadamente384×357; mobile334×400, portanto manter as plumas no centro útil para cortes mais verticais.

**Paleta:** Bege areia, palha creme, branco marfim, cinza claro e sombras taupe frias [C/E].

**Prompt individual completo [P]:**

```text
Crie uma natureza-morta fotográfica minimalista para um editorial de bem-estar, em formato quadrado. Mostre um pequeno conjunto de hastes muito finas de gramíneas secas com plumas macias em bege-palha e creme. A pluma mais clara e nítida deve ficar na metade esquerda/centro, inclinada discretamente para a esquerda, com outras hastes altas e plumas mais desfocadas na metade direita e no fundo. Enquadre apenas hastes e plumas: não mostre vaso, mesa ou mãos. Use uma parede lisa cinza-gelo clara como fundo, atravessada por uma grande faixa diagonal de luz natural de janela e sombras suaves. Fotografia de close médio, profundidade de campo rasa, foco nas fibras da pluma dianteira, bokeh delicado, contraste baixo e saturação muito baixa. Atmosfera calma e arquitetônica, cores areia, marfim e cinza neutro, sem plantas verdes nem flores coloridas. Preserve espaço claro entre as hastes e margem para crop vertical posterior. Sem texto, moldura, objetos adicionais, logotipo ou marca-d’água. Gere um mestre quadrado de alta resolução; exportar 2048×2048 e derivar 1024×1024 da mesma imagem.
```

### I08 — Close-up de rosto inclinado — hidratação

<img src="referencias/assets/0WVX1KMgVFBEAviv4zQhKVw8rgk__qc3f29497.jpg" alt="Referência I08" width="240">

**Arquivos originais [V]:**

- [0WVX1KMgVFBEAviv4zQhKVw8rgk__qc3f29497.jpg](referencias/assets/0WVX1KMgVFBEAviv4zQhKVw8rgk__qc3f29497.jpg) — 2048×2048; RGB; proporção1.0000:1; 281,996 bytes.
- [0WVX1KMgVFBEAviv4zQhKVw8rgk__q6849539d.jpg](referencias/assets/0WVX1KMgVFBEAviv4zQhKVw8rgk__q6849539d.jpg) — 1024×1024; RGB; proporção1.0000:1; 66,881 bytes.

**Uso [V/C]:** Card direito do journal, Hidratação além do hidratante.

**Composição e estilo [C/E]:** Rosto de mulher adulta em perfil de três quartos voltado para a esquerda da tela e inclinado para baixo. Cabelo castanho escuro com aparência úmida, puxado para trás. Olho abaixado/fechado, nariz e lábios na metade esquerda e pescoço/ombro na direita inferior. Pele lisa e luminosa com brilho pontual de hidratação na bochecha/testa; sem gotas grandes ou produto visível. Fundo branco azul muito claro, com cortina ou faixa vertical difusa à esquerda [C].

**Proporção, crop e integração:** 2048×2048 e 1024×1024, razão1:1 [V]. O card desktop usa um crop largo,624×386.4: preservar nariz, boca e bochecha no centro útil; não cortar o perfil. Em mobile o crop é vertical334×400. Alinhamento cover50%50% no elemento observado [M].

**Paleta:** Pele bege-rosada clara, cabelo castanho quase preto, altas luzes brancas e fundo azul gelo [C/E].

**Prompt individual completo [P]:**

```text
Crie um close-up fotográfico editorial de hidratação da pele em formato quadrado. Mulher claramente adulta de 25–35 anos, pele clara e luminosa, cabelo castanho escuro com aparência ligeiramente úmida e penteado para trás. Rosto em três quartos voltado para a esquerda da imagem, cabeça inclinada para baixo, olho próximo suavemente fechado ou abaixado. Enquadre o cabelo no alto, testa, nariz, lábios naturais e pescoço/ombro na metade direita inferior; mantenha o nariz e a boca inteiros dentro da área central para um crop horizontal posterior. Use iluminação natural high-key muito difusa de uma janela à esquerda, fundo branco-azulado quase sem detalhes e uma faixa vertical de cortina suave na esquerda. Pele com leve brilho de hidratação na testa e bochecha, textura muito fina e realista, sem gotas exageradas nem produto visível. Paleta de gelo, pérola e rosa-bege, baixo contraste, sombras suaves, lente de retrato sem distorção. Não inclua joias, maquiagem forte, frascos, texto, logo ou marca-d’água. Gere um único mestre quadrado de alta resolução e derive as versões2048 e 1024 sem mudar a pessoa.
```

### I09 — Mulher de cabelo cacheado, fundo azul

<img src="referencias/assets/POpTLGuLzTuWYxuEYrRGJD678__qb9231ed5.jpg" alt="Referência I09" width="240">

**Arquivos originais [V]:**

- [POpTLGuLzTuWYxuEYrRGJD678__qb9231ed5.jpg](referencias/assets/POpTLGuLzTuWYxuEYrRGJD678__qb9231ed5.jpg) — 280×280; RGB; proporção1.0000:1; 16,390 bytes.

**Uso [V/C]:** Avatar1, primeiro à esquerda.

**Composição e estilo [C/E]:** Mulher adulta de cabelo curto, preto e muito cacheado. Perfil de três quartos voltado para a esquerda; queixo elevado e olhar para o alto. Top cinza claro, ombros na parte inferior. Fundo azul acinzentado; iluminação lateral marca a testa/nariz e mantém contraste no cabelo. [C] Não há vínculo confirmado entre a pessoa fotografada e os nomes dos depoimentos; não atribuir identidade.

**Proporção, crop e integração:** Formato quadrado. Na interface, imagem 44×44 dentro de caixa48×48 com recorte circular/mascarado; não gerar círculo dentro do bitmap nem aplicar a máscara I19 à imagem mestre. Preservar margem para cabelo e queixo. Não ampliar um arquivo pequeno como se fosse um retrato editorial de alta resolução.

**Paleta:** azul acinzentado médio, preto do cabelo, pele em luz neutra e tecido cinza [C/E].

**Prompt individual completo [P]:**

```text
Crie um retrato fotográfico quadrado para avatar de um site de bem-estar. Mostre uma mulher claramente adulta de 25–35 anos, pele de tom médio-claro, cabelo preto curto e densamente cacheado, perfil de três quartos voltado à esquerda da imagem, queixo discretamente elevado e olhar dirigido para o alto à esquerda; top cinza claro com decote simples e ombros visíveis; fundo de estúdio azul acinzentado uniforme, luz lateral suave da esquerda destacando testa e nariz, cabelo escuro bem definido. Componha a cabeça no centro, com pescoço e parte superior dos ombros, deixando margem suficiente para um recorte circular posterior sem cortar olhos ou queixo. Mantenha a pessoa claramente adulta e a anatomia natural. Use fotografia editorial informal, textura de pele realista, nitidez suave no rosto e fundo simples; preserve a paleta específica descrita, sem aplicar o fundo branco dos retratos principais. Se o avatar de referência estiver anexado, siga sua composição e direção do olhar. Não inclua outras pessoas, texto, moldura circular desenhada, logotipo ou marca-d’água. Gere um mestre quadrado nítido; a aplicação final será44 pixels, por isso a expressão e a silhueta precisam permanecer legíveis em miniatura.
```

### I10 — Homem de óculos, fundo mostarda

<img src="referencias/assets/aLd0GlWVHywVWuurCk8JtAWSPw__qb28827a7.jpg" alt="Referência I10" width="240">

**Arquivos originais [V]:**

- [aLd0GlWVHywVWuurCk8JtAWSPw__qb28827a7.jpg](referencias/assets/aLd0GlWVHywVWuurCk8JtAWSPw__qb28827a7.jpg) — 512×512; RGB; proporção1.0000:1; 20,306 bytes.

**Uso [V/C]:** Avatar2.

**Composição e estilo [C/E]:** Homem adulto de cabelo castanho penteado para cima, barba cheia aparada e óculos de grau pretos. Cabeça frontal, expressão neutra, camiseta preta. Fundo amarelo-mostarda quente e uniforme. Contraste mais forte que nos retratos principais. [C] Não há vínculo confirmado entre a pessoa fotografada e os nomes dos depoimentos; não atribuir identidade.

**Proporção, crop e integração:** Formato quadrado. Na interface, imagem 44×44 dentro de caixa48×48 com recorte circular/mascarado; não gerar círculo dentro do bitmap nem aplicar a máscara I19 à imagem mestre. Preservar margem para cabelo e queixo. Não ampliar um arquivo pequeno como se fosse um retrato editorial de alta resolução.

**Paleta:** mostarda/amarelo quente, preto da camiseta e armação, castanho da barba [C/E].

**Prompt individual completo [P]:**

```text
Crie um retrato fotográfico quadrado para avatar de um site de bem-estar. Mostre um homem claramente adulto de 25–40 anos, cabelo castanho escuro curto penteado para cima e para trás, barba cheia curta e bem aparada, óculos de grau pretos com armação grossa e formato levemente arredondado; olhando frontalmente para a câmera com expressão neutra, camiseta preta lisa; fundo amarelo-mostarda quente e uniforme, luz frontal suave, contraste moderado e textura natural. Componha a cabeça no centro, com pescoço e parte superior dos ombros, deixando margem suficiente para um recorte circular posterior sem cortar olhos ou queixo. Mantenha a pessoa claramente adulta e a anatomia natural. Use fotografia editorial informal, textura de pele realista, nitidez suave no rosto e fundo simples; preserve a paleta específica descrita, sem aplicar o fundo branco dos retratos principais. Se o avatar de referência estiver anexado, siga sua composição e direção do olhar. Não inclua outras pessoas, texto, moldura circular desenhada, logotipo ou marca-d’água. Gere um mestre quadrado nítido; a aplicação final será44 pixels, por isso a expressão e a silhueta precisam permanecer legíveis em miniatura.
```

### I11 — Mulher de óculos, fundo terracota

<img src="referencias/assets/PH9MBoozXCDuSg7Zw0ksQExNo__qb28827a7.jpg" alt="Referência I11" width="240">

**Arquivos originais [V]:**

- [PH9MBoozXCDuSg7Zw0ksQExNo__qb28827a7.jpg](referencias/assets/PH9MBoozXCDuSg7Zw0ksQExNo__qb28827a7.jpg) — 512×512; RGB; proporção1.0000:1; 33,376 bytes.

**Uso [V/C]:** Avatar3.

**Composição e estilo [C/E]:** Mulher adulta jovem, cabelo loiro-escuro/castanho-claro de comprimento médio e ondulado. Óculos arredondados finos, sorriso discreto e cabeça ligeiramente inclinada. Blusa branca; fundo vermelho-terracota com textura de parede. [C] Não há vínculo confirmado entre a pessoa fotografada e os nomes dos depoimentos; não atribuir identidade.

**Proporção, crop e integração:** Formato quadrado. Na interface, imagem 44×44 dentro de caixa48×48 com recorte circular/mascarado; não gerar círculo dentro do bitmap nem aplicar a máscara I19 à imagem mestre. Preservar margem para cabelo e queixo. Não ampliar um arquivo pequeno como se fosse um retrato editorial de alta resolução.

**Paleta:** terracota queimado, branco quente, cabelo mel/castanho-claro e pele quente [C/E].

**Prompt individual completo [P]:**

```text
Crie um retrato fotográfico quadrado para avatar de um site de bem-estar. Mostre uma mulher claramente adulta de 25–35 anos, cabelo loiro-escuro ou castanho-claro ondulado até os ombros, óculos de armação fina arredondada, sorriso discreto e natural e cabeça levemente inclinada; blusa branca simples, enquadramento de cabeça e ombros; fundo de parede terracota avermelhado com textura muito suave e luz lateral quente e difusa, clima acolhedor sem pose publicitária exagerada. Componha a cabeça no centro, com pescoço e parte superior dos ombros, deixando margem suficiente para um recorte circular posterior sem cortar olhos ou queixo. Mantenha a pessoa claramente adulta e a anatomia natural. Use fotografia editorial informal, textura de pele realista, nitidez suave no rosto e fundo simples; preserve a paleta específica descrita, sem aplicar o fundo branco dos retratos principais. Se o avatar de referência estiver anexado, siga sua composição e direção do olhar. Não inclua outras pessoas, texto, moldura circular desenhada, logotipo ou marca-d’água. Gere um mestre quadrado nítido; a aplicação final será44 pixels, por isso a expressão e a silhueta precisam permanecer legíveis em miniatura.
```

### I12 — Homem de óculos escuros ao ar livre

<img src="referencias/assets/duZSo1YDta06usFuc3EkJTiRdM__qb28827a7.jpg" alt="Referência I12" width="240">

**Arquivos originais [V]:**

- [duZSo1YDta06usFuc3EkJTiRdM__qb28827a7.jpg](referencias/assets/duZSo1YDta06usFuc3EkJTiRdM__qb28827a7.jpg) — 512×512; RGB; proporção1.0000:1; 33,409 bytes.

**Uso [V/C]:** Avatar4.

**Composição e estilo [C/E]:** Homem adulto de cabelo castanho curto ondulado, barba cheia e óculos escuros redondos. Rosto em três quartos para a esquerda, olhando além da câmera. Roupa escura, fino colar visível. Fundo externo desfocado com céu azul/verde muito claro, contraluz quente no cabelo e barba. [C] Não há vínculo confirmado entre a pessoa fotografada e os nomes dos depoimentos; não atribuir identidade.

**Proporção, crop e integração:** Formato quadrado. Na interface, imagem 44×44 dentro de caixa48×48 com recorte circular/mascarado; não gerar círculo dentro do bitmap nem aplicar a máscara I19 à imagem mestre. Preservar margem para cabelo e queixo. Não ampliar um arquivo pequeno como se fosse um retrato editorial de alta resolução.

**Paleta:** castanho/âmbar, preto, azul esverdeado claro e dourado do contraluz [C/E].

**Prompt individual completo [P]:**

```text
Crie um retrato fotográfico quadrado para avatar de um site de bem-estar. Mostre um homem claramente adulto de 25–40 anos, cabelo castanho curto ondulado, barba cheia e óculos de sol escuros redondos; rosto em três quartos apontando para a esquerda da imagem, olhar além da câmera, expressão tranquila; camiseta ou camisa escura simples e um colar fino discreto; ambiente externo desfocado, fundo azul-esverdeado claro com bokeh e contraluz de fim de tarde dourado no cabelo e na barba, aparência espontânea e fotográfica. Componha a cabeça no centro, com pescoço e parte superior dos ombros, deixando margem suficiente para um recorte circular posterior sem cortar olhos ou queixo. Mantenha a pessoa claramente adulta e a anatomia natural. Use fotografia editorial informal, textura de pele realista, nitidez suave no rosto e fundo simples; preserve a paleta específica descrita, sem aplicar o fundo branco dos retratos principais. Se o avatar de referência estiver anexado, siga sua composição e direção do olhar. Não inclua outras pessoas, texto, moldura circular desenhada, logotipo ou marca-d’água. Gere um mestre quadrado nítido; a aplicação final será44 pixels, por isso a expressão e a silhueta precisam permanecer legíveis em miniatura.
```

### I13 — Mulher de cabelo escuro, fundo amarelo

<img src="referencias/assets/ES6IJ8JiS4iNVkDK38fQhwjZDr4__qb28827a7.jpg" alt="Referência I13" width="240">

**Arquivos originais [V]:**

- [ES6IJ8JiS4iNVkDK38fQhwjZDr4__qb28827a7.jpg](referencias/assets/ES6IJ8JiS4iNVkDK38fQhwjZDr4__qb28827a7.jpg) — 512×512; RGB; proporção1.0000:1; 22,864 bytes.

**Uso [V/C]:** Avatar5, à direita antes de +81.

**Composição e estilo [C/E]:** Mulher adulta com cabelo castanho escuro longo solto, rosto frontal, olhos verdes/cinzentos e expressão séria suave. Alças escuras finas nos ombros. Fundo amarelo-mostarda; luz mais intensa de uma lateral com sombra discreta do outro lado do rosto. [C] Não há vínculo confirmado entre a pessoa fotografada e os nomes dos depoimentos; não atribuir identidade.

**Proporção, crop e integração:** Formato quadrado. Na interface, imagem 44×44 dentro de caixa48×48 com recorte circular/mascarado; não gerar círculo dentro do bitmap nem aplicar a máscara I19 à imagem mestre. Preservar margem para cabelo e queixo. Não ampliar um arquivo pequeno como se fosse um retrato editorial de alta resolução.

**Paleta:** amarelo-mostarda vivo, castanho escuro, pele quente e roupa escura [C/E].

**Prompt individual completo [P]:**

```text
Crie um retrato fotográfico quadrado para avatar de um site de bem-estar. Mostre uma mulher claramente adulta de 25–35 anos, cabelo castanho escuro longo solto com risca natural, olhos claros verde-acinzentados, rosto frontal olhando diretamente para a câmera e expressão serena sem sorriso amplo; top escuro de alças finas no recorte dos ombros; fundo amarelo-mostarda quente e uniforme, luz natural lateral suave com gradação de sombra de um lado do rosto, textura de pele realista e contraste moderado. Componha a cabeça no centro, com pescoço e parte superior dos ombros, deixando margem suficiente para um recorte circular posterior sem cortar olhos ou queixo. Mantenha a pessoa claramente adulta e a anatomia natural. Use fotografia editorial informal, textura de pele realista, nitidez suave no rosto e fundo simples; preserve a paleta específica descrita, sem aplicar o fundo branco dos retratos principais. Se o avatar de referência estiver anexado, siga sua composição e direção do olhar. Não inclua outras pessoas, texto, moldura circular desenhada, logotipo ou marca-d’água. Gere um mestre quadrado nítido; a aplicação final será44 pixels, por isso a expressão e a silhueta precisam permanecer legíveis em miniatura.
```

### I14 — Miniatura promocional de outro template

<img src="referencias/assets/zKYk3xaySEc43cUDiQTIdQsugwU__q885e406b.jpg" alt="Referência I14" width="240">

**Arquivos originais [V]:**

- [zKYk3xaySEc43cUDiQTIdQsugwU__q885e406b.jpg](referencias/assets/zKYk3xaySEc43cUDiQTIdQsugwU__q885e406b.jpg) — 512×384; RGB; proporção1.3333:1; 22,055 bytes.

**Uso [V/C]:** Widget flutuante de divulgação de outro template, inferior direito; não é conteúdo clínico.

**Composição e estilo [C/E]:** Miniatura de apresentação de um website comercial em painel central, com ambiente/gradiente azul-petróleo ao redor. O layout fotografado exibe dois profissionais em conversa/aperto de mãos na direita, tipografia branca pesada à esquerda e detalhes pequenos em coral/vermelho. A frase grande legível é “NOW IT’S A PLAN.”; há pequenas navegação e chamadas. É uma imagem de interface composta, não fotografia simples [C].

**Proporção, crop e integração:** 512×384, razão 4:3 [V]. Elemento de 138×101 no widget observado [M], com cover. Para máxima precisão, conservar o JPEG original; geração não preserva microtipografia com exatidão.

**Paleta:** Azul-petróleo, ciano acinzentado, branco, roupa escura e acentos coral [C/E].

**Prompt individual completo [P]:**

```text
Crie uma miniatura promocional de um website corporativo, em proporção4:3, com estética de mockup de página. Fundo externo em gradiente azul-petróleo suave; no centro, um painel de website retangular com cantos discretamente arredondados, sombra suave e fundo teal escuro. Na metade esquerda do painel, escreva em tipografia sans-serif muito pesada e branca, em duas linhas grandes: “NOW” e “IT’S A PLAN.”. Inclua apenas pequenos acentos coral/vermelho ao redor das chamadas e uma faixa discreta de navegação no topo. Na metade direita, mostre dois profissionais adultos de perfil em um encontro cordial: homem de cabelo escuro à esquerda e mulher de cabelo escuro à direita, roupas sociais escuras, em um aperto de mãos. Mantenha acabamento de apresentação de template, com profundidade suave e boa leitura em miniatura. Não inclua a interface do navegador nem logotipos adicionais. Use a miniatura de referência se anexada para preservar a hierarquia e o enquadramento. Alvo512×384. Para correspondência exata da tipografia, a imagem final deve ser composta manualmente a partir do layout, não depender apenas da geração.
```

### I15 — Apple touch icon — t branca sobre azul

<img src="referencias/assets/FovUcCMKMP12nR1uhOYL6c8pKi0.png" alt="Referência I15" width="240">

**Arquivos originais [V]:**

- [FovUcCMKMP12nR1uhOYL6c8pKi0.png](referencias/assets/FovUcCMKMP12nR1uhOYL6c8pKi0.png) — 180×180; P; proporção1.0000:1; 390 bytes.

**Uso [V/C]:** link rel=apple-touch-icon no `head`; não aparece como card no corpo.

**Composição e estilo [C/E]:** Quadrado azul claro/pervinca com letra “t” branca, sem serifa, grande e deslocada para a direita. Haste vertical grossa, travessão horizontal e curva inferior suave; parte da forma fica próxima da borda direita. É marca auxiliar do template, visualmente distinta do logotipo textual Althea [C/V].

**Proporção, crop e integração:** 180×180, PNG em modo P (paleta indexada) [V]. O original visual tem fundo azul; não confundir modo P com garantia de transparência. Preservar a geometria original para uso real.

**Paleta:** Azul de fundo dominante `#91B4FF` (27383 pixels) e branco `#FFFFFF` (4839 pixels), medidos no arquivo convertido paraRGBA [V]; pixels de antialiasing têm valores intermediários.

**Prompt individual completo [P]:**

```text
Crie um ícone gráfico plano quadrado, sem efeito3D, sobre fundo azul pervinca claro uniforme. Desenhe uma única letra “t” branca, sans-serif, com haste vertical larga, travessão horizontal simples e terminação inferior arredondada, muito grande e deslocada para a direita, próxima ao corte da borda direita. Preserve amplo espaço azul à esquerda. Sem contorno, sombra, textura, gradiente, outras letras, logotipo adicional ou moldura. Use a imagem de referência para a geometria exata caso anexada. Entregue uma composição quadrada adequada para exportação180×180. Este é um esboço raster; para fidelidade absoluta, usar o PNG original.
```

### I16 — Favicon — t preta sobre azul

<img src="referencias/assets/WT1fXZXGqa7Qd4EpaVBU6nft0.png" alt="Referência I16" width="240">

**Arquivos originais [V]:**

- [WT1fXZXGqa7Qd4EpaVBU6nft0.png](referencias/assets/WT1fXZXGqa7Qd4EpaVBU6nft0.png) — 64×64; RGBA; proporção1.0000:1; 936 bytes.

**Uso [V/C]:** link rel=icon tanto para prefers-color-scheme light quanto dark.

**Composição e estilo [C/E]:** Pequeno ícone de fundo azul-pervinca e letra “t” preta, com cantos externos arredondados/transparência nos extremos. Letra grande à direita; composição próxima do Apple icon, mas com outra cor de letra e tamanho [C/V]. Não é uma versão de Althea escrita em caligrafia.

**Proporção, crop e integração:** 64×64, RGBA [V]. Preservar alfa e leitura em 16/32px. Não reduzir I15 e trocar apenas o nome do arquivo: há diferença visual de letra/fundo.

**Paleta:** Fundo dominante `#90B4FE` (2862 pixels com alfa 255), tons próximos em bordas e áreas transparentes nos cantos [V]. A letra aparenta preto; pixels com alfa 0 podem conterRGB arbitrário, sem influência na aparência.

**Prompt individual completo [P]:**

```text
Crie um favicon gráfico plano quadrado com fundo azul pervinca claro e cantos arredondados, deixando transparência real fora dos cantos. Sobre ele, desenhe uma única letra “t” preta, sans-serif pesada, grande e alinhada mais à direita, com haste vertical simples, travessão horizontal e curva suave na terminação inferior. Mantenha espaço azul na metade esquerda e boa leitura em miniatura. Sem sombra, textura, gradiente, contorno, outras letras ou marca-d’água. Use o favicon anexado como referência geométrica se disponível. Produza um mestre quadrado limpo para exportar 64×64,32×32e16×16 sem perder o canal alfa. Para reprodução exata, conservar o PNG original.
```

### I17 — Chevron esquerdo do carrossel

**Arquivos originais [V]:**

- [6tTbkXggWgQCAJ4DO2QEdXXmgM.svg](referencias/assets/6tTbkXggWgQCAJ4DO2QEdXXmgM.svg) — SVG; dimensões descritas abaixo; 214 bytes.

**Uso [V/C]:** Imagem padrão do botão Previous no componente de carrossel; o próprio botão fornece o círculo/fundo.

**Composição e estilo [C/E]:** Canvas40×40 sem fundo pintado. Chevron branco de traço2, pontas e junções arredondadas, apontando à esquerda. Path exato: M22.5 12.5 15 20l7.5 7.5. Sem preenchimento interno [V].

**Proporção, crop e integração:** 40×40, viewBox implícito pelas dimensões. A ponta esquerda fica em x15/y20 e os braços em x22.5/y12.5e27.5. Não incluir círculo no arquivo. ReutilizarSVG é exato; um bitmap gerado introduz antialiasing e escala diferentes.

**Paleta:** Stroke branco hsl(0,0%,100%); filltransparent [V].

**Prompt individual completo [P]:**

```text
Crie somente um símbolo de chevron apontando para a esquerda, centralizado num canvas quadrado totalmente transparente, sem círculo nem fundo. O desenho deve ser uma linha branca uniforme com pontas e junções arredondadas, sem preenchimento. Geometria desejada em um canvas 40×40: partir de 22.5,12.5, seguir até15,20 e terminar em 22.5,27.5; espessura2 unidades. Não adicionar sombra, textura, texto ou outros símbolos. Se o gerador produzir raster, use alta resolução e reduza para 40×40 preservando alfa. Para a entrega exata em SVG, usar o path original informado no inventário.
```

### I18 — Chevron direito do carrossel

**Arquivos originais [V]:**

- [11KSGbIZoRSg4pjdnUoif6MKHI.svg](referencias/assets/11KSGbIZoRSg4pjdnUoif6MKHI.svg) — SVG; dimensões descritas abaixo; 215 bytes.

**Uso [V/C]:** Imagem padrão do botão Next no carrossel.

**Composição e estilo [C/E]:** Chevron branco de traço2, pontas e junções arredondadas, apontando à direita em canvas 40×40. Path exato: M17.5 12.5 25 20l-7.5 7.5. Fundo sem pintura e sem círculo [V].

**Proporção, crop e integração:** 40×40; ponta em x25/y20 e braços em x17.5/y12.5e27.5. Manter a mesma espessura/altura do I17 e apenas inverter a direção.

**Paleta:** Stroke branco hsl(0,0%,100%); filltransparent [V].

**Prompt individual completo [P]:**

```text
Crie somente um símbolo de chevron apontando para a direita, centralizado num canvas quadrado totalmente transparente, sem círculo nem fundo. Desenhe uma linha branca uniforme com pontas e junções arredondadas, sem preenchimento. Em um canvas 40×40, a linha deve partir de 17.5,12.5, seguir até25,20 e terminar em 17.5,27.5, com espessura2 unidades. Preserve simetria com o chevron esquerdo da coleção. Sem sombra, textura, texto, moldura ou outros símbolos. Se a saída for raster, gere em alta resolução e reduza preservando alfa; para exatidão geométrica, reutilize o SVG original.
```

### I19 — Máscara alfa dos avatars — círculo com recorte côncavo

**Arquivos originais [V]:**

- [9O8sLldl6mV9miUVjkyrhGJsZ7c__q8307f77b.svg](referencias/assets/9O8sLldl6mV9miUVjkyrhGJsZ7c__q8307f77b.svg) — SVG; dimensões descritas abaixo; 263 bytes.

**Uso [V/C]:** mask-image dos avatars sobrepostos, não imagem cinza visível na página.

**Composição e estilo [C/E]:** Forma de máscara40×48 derivada de um círculo nominal de 48px: arco exterior convexo à esquerda e recorte circular côncavo à direita para acomodar o próximo avatar. Extremos do path em x24/y0e48, borda direita recortada entre encontros próximos dex40/y6.112e41.887; área nominal do círculo completo extrapola o canvas em x48. Fill#D9D9D9 opaco, que serve como alfa e não como cor de aparência [V].

**Proporção, crop e integração:** 40×48, razão 5:6. O recorte remove uma lente da borda direita. Não pintar essa máscara sobre a fotografia; aplicar comCSS mask em contêineres. Um prompt raster é apenas aproximação.

**Paleta:** Forma cinza#D9D9D9 sobre fundo transparente [V].

**Prompt individual completo [P]:**

```text
Crie uma máscara gráfica plana para sobreposição de avatars, em canvas vertical de proporção40:48, com fundo completamente transparente e uma única forma cinza opaca#D9D9D9. A forma deve parecer um disco circular de 48 unidades de diâmetro centrado em 24,24, mas com a lateral direita removida por uma concavidade circular que acomoda o próximo disco à direita. Preserve o arco convexo externo esquerdo, o topo em 24,0 e a base em 24,48; a borda côncava direita conecta aproximadamente40,6.112a40,41.887e alcança seu ponto mais à esquerda perto de 32,24. Não adicionar borda, sombra, textura, rosto, texto ou marca-d’água. O objetivo é uma máscara alfa uniforme, não uma imagem decorativa. Para geometria perfeita, usar diretamente o SVG original em CSS mask.
```

## 6. Imagem referenciada e ausente

**X01 — imagem de compartilhamento social. [V]** O módulo de metadados referencia `https://framerusercontent.com/assets/cz5xJ4dOi9EFif1Q78sutD4j0.png`. O arquivo não consta entre os assets capturados. **[ND]** Resolução, composição, textos e aparência não podem ser determinados com segurança. Não reutilizar o screenshot da home afirmando que é oOpenGraph original.

**Prompt fiel:** pendente de inspeção do arquivo original. Um prompt específico de reprodução não pode ser escrito de forma tecnicamente honesta sem referência visual. Se for necessário produzir um substituto, usar I01 e compor manualmente um social card com o título Althea, marcando-o como novo material e não como réplica verificada.

## 7. Elementos gráficos que não são arquivos de fotografia

Os itens seguintes aparecem no layout, mas não aumentam a contagem de 19 imagens lógicas da pasta. São marca tipográfica, vetores inline, ícones de biblioteca e desenho procedural. Recriá-los em código fornece mais fidelidade e resolução do que gerar novos bitmaps. Os prompts abaixo são alternativas de esboço, explicitamente **[P]**.

### G01 — linhas topográficas e luminosidade do fundo

**[C/V]** Linhas brancas muito finas, orgânicas e concêntricas, parecidas com curvas de nível deformadas, em volta do centro do hero. O número, fase e forma variam com o efeito. Sob elas há esfera azul-clara e esfera de luz branca com gradientes recuperados na especificação. **[E]** Espessura aparente~1px no desktop. **[P]** Preferir SVG/canvas para a animação; um wallpaper gerado só reproduz um frame.

```text
Crie um fundo abstrato minimalista horizontal para uma página de estética e bem-estar. Use base pervinca muito clara próxima de#D6DAEB, uma região azul-gelo clara próxima de#CEDFED e uma grande luminosidade branca difusa no centro. Sobre o fundo, desenhe apenas linhas brancas extremamente finas, suaves e contínuas, como curvas topográficas concêntricas organicamente deformadas. As curvas devem envolver uma área central de repouso, sem um círculo perfeito e sem parecer ondas de água ou impressões digitais. Baixo contraste, grandes espaçamentos, atmosfera aérea e quase branca, sem textura granulada, objetos ou vinheta escura. Não desenhe retratos, texto, logotipo, botões nem cards. Componha no formato1358:610, em alta resolução. Use a captura de referência, se anexada, para reproduzir a distribuição das curvas e a intensidade da luz. A saída é um frame estático de referência, não substitui a animação procedural do site.
```

### G02 — logotipo Althea

**[V]** Texto `Althea` em Dancing Script 700, não uma imagem raster. Cor#333 no cabeçalho e card branco. **[P]** Usar a fonte original para obter a mesma largura/curvas; não pedir que um gerador invente uma assinatura nova. No menu aberto a versão é branca [M/C].

```text
Crie somente um wordmark com a palavra exata “Althea”, em escrita cursiva conectada equivalente à fonte Dancing Script no peso 700, sem ícone adicional. Use inicial A maiúscula, letras restantes minúsculas, inclinação fluida para a direita, contraste suave de traço e aparência caligráfica limpa, seguindo o wordmark de referência se anexado. Cor sólida #333333 sobre fundo realmente transparente com canal alfa. Não adicione sublinhado, floreio extra, moldura, sombra, slogan ou outras palavras. Deixe margens pequenas e equilibradas. Esta imagem serve apenas como referência visual; a implementação final deve usar Dancing Script 700 em texto para preservar a geometria do original.
```

### G03–G07 — ícones dos cinco serviços

[Frame de referência dos serviços em arco](referencias/servicos-arco.png). A renderização arquivada desse frame deve ser usada para os glifos e a composição dos cards, não para o retrato ausente do hero.

**[M/C]** Família de traço lavanda claro, sem preenchimento fotográfico, desenho limpo em área quadrada. No site, os vetores podem ter estados animados; extração de um frame não garante o comportamento inteiro. A ordem é a mesma dos cinco serviços. **[E]** Escala aparente dos glifos em torno de 80–100px no card, variando com a transformação do arco; não é uma medida de stroke recuperada. Para a geometria original, conservar o SVG embutido/componente; o prompt é aproximação.

**G03 — Skin Health: broto com círculo.**

```text
Crie um ícone vetorial minimalista de saúde da pele, em canvas quadrado transparente. Desenhe um pequeno círculo vazio na parte superior e, abaixo, duas folhas curvas que se abrem para os lados e convergem numa base central, como um broto abstrato acolhedor. Use apenas contorno de espessura visual uniforme, curvas arredondadas e cor lavanda-cinza muito clara próxima de#D6DAEB. Sem preenchimento sólido nas folhas, sem sombra, gradiente, brilho, texto ou círculo externo. Preserve a leveza e as proporções do glifo de referência se anexado. Mantenha bastante margem em torno do símbolo. O resultado é um esboço; para réplica exata, usar o vetor original do serviço Skin Health.
```

**G04 — Aesthetic Care: contorno de olho e nariz.**

```text
Crie um ícone de beleza em desenho linear minimalista sobre fundo totalmente transparente. Desenhe um único contorno abstrato de parte de um rosto: arco suave da sobrancelha/testa, um olho simples com pálpebra arredondada e uma linha longa e fluida que sugira a ponte e a ponta do nariz, voltada para a direita. Não desenhe um rosto completo nem uma cabeça fechada. Use traço lavanda-cinza muito claro próximo de#D6DAEB, espessura uniforme, pontas e curvas suaves, sem preenchimento, sombra ou gradiente. Composição quadrada, centralizada e arejada, sem texto, logotipo ou moldura. Siga o glifo de referência do serviço Aesthetic Care se anexado, sem acrescentar cílios decorativos ou detalhes de maquiagem.
```

**G05 — Wellness & Recovery: folhas com círculo superior.**

```text
Crie um símbolo linear abstrato de bem-estar sobre canvas quadrado transparente: um pequeno círculo vazio suspenso acima de duas folhas curvas assimétricas, com hastes que se encontram na base, sugerindo pessoa e planta de forma muito sutil. A folha esquerda deve subir de forma mais vertical e a direita abrir suavemente para o lado. Use um único traço lavanda-cinza muito claro próximo de#D6DAEB, curvas arredondadas e pouco detalhe. Sem preenchimento, textura, sombra, gradiente, texto ou moldura. Preserve margens amplas e a proporção do ícone de referência se anexado. Não aplique acabamento3Dnem aparência de desenho à mão irregular; a linguagem é vetorial, limpa e leve.
```

**G06 — Personal Consultation: espiral.**

```text
Crie um ícone vetorial minimalista formado por uma única espiral aberta, de aproximadamente duas voltas e meia, centralizada em canvas quadrado totalmente transparente. O centro deve ser pequeno e a curva aumentar progressivamente até a abertura externa, com traço contínuo suave e pontas arredondadas. Use lavanda-cinza muito claro próximo de#D6DAEB, sem preenchimento nem variação decorativa de cor. Mantenha aparência calma e orgânica, sem simetria mecânica exagerada, mas com desenho limpo. Sem sombra, gradiente, textura, texto ou círculo de fundo. Siga a orientação da abertura e o espaçamento do ícone do serviço Personal Consultation da referência, se anexado.
```

**G07 — Long-Term Care Plans: flor/lótus.**

```text
Crie um ícone vetorial de flor de lótus muito simples, em canvas quadrado transparente. Desenhe uma pétala central vertical em forma de gota pontuda arredondada, duas pétalas oblíquas intermediárias e duas folhas/pétalas inferiores abertas para os lados, todas convergindo suavemente na base central. Use apenas linhas lavanda-cinza muito claras próximas de#D6DAEB, espessura uniforme e curvas limpas, sem preenchimento ou sombreado. A flor deve ser compacta, centrada e amplamente cercada por espaço vazio. Sem caule longo, água, mãos, texto, moldura, textura ou gradiente. Se o glifo original estiver anexado, siga exatamente seu número de pétalas, proporções e aberturas.
```

### G08 — avaliações TrustPoint

**[V/M]** Marca textual escura com estrela verde; abaixo do deck, cinco quadrados#05B67A de 30×30, separados por 3px, com estrelas brancas. Não é um logoTrustpilot confirmado: o texto é **TrustPoint**. As cinco estrelas dos depoimentos são outro conjunto, laranja#FFA600, sem quadrados.

**Prompt da faixa verde:**

```text
Crie uma faixa gráfica de avaliação com cinco quadrados verdes idênticos alinhados horizontalmente, em fundo transparente. Cada quadrado deve usar cor sólida #05B67A e conter uma estrela branca de cinco pontas, centrada, com a mesma geometria em todos os cinco. Proporção de cada quadrado 1:1, intervalo entre quadrados equivalente a 3 unidades para lado 30. Sem arredondamento dos quadrados, sem sombra, brilho, gradiente, texto ou número de avaliações. O objetivo é uma faixa geométrica limpa para interface. Para precisão absoluta, implementar quadrados e estrelas em SVG/CSS com as medidas fornecidas.
```

**Prompt da marca TrustPoint:**

```text
Crie um pequeno elemento de marca para uma interface: estrela sólida verde#05B67A à esquerda e a palavra exata “TrustPoint” à direita, em sans-serif escura, peso médio/semibold, sem slogan. Mantenha a estrela e o texto alinhados verticalmente e com distância curta. Fundo realmente transparente, sem caixa de cor, sombra, gradiente ou textura. Não escrevaTrustpilotnem inclua marcas adicionais. Siga a referência anexada se disponível. A implementação final deve usar texto e vetor para a geometria e a tipografia exatas.
```

**Prompt das estrelas laranja:**

```text
Crie somente cinco estrelas sólidas de cinco pontas, idênticas, alinhadas horizontalmente, em cor uniforme#FFA600 sobre fundo transparente. Use formato de estrela simples e limpo, sem quadrado ou círculo de fundo, sem brilho, sombra, gradiente, contorno, texto ou numeral. Cada estrela deve ocupar aproximadamente16×17 unidades no resultado final, com espaçamento visual mínimo e alinhamento constante. Gere em alta resolução se necessário e preserve transparência. Para réplica exata, substituir o raster pelas estrelas SVG originais.
```

### G09 — ícones sociais

**[V/M]** Instagram, Threads, Facebook eYouTube, nessa ordem, extraídos de módulos Phosphor. Caixas24×24; gap 32; aparência de contorno cinza. Não gerar avatares/logos alternativos para esses links. Os módulos originais incluem `InstagramLogo.js`, `ThreadsLogo.js`, `FacebookLogo.js`, `YoutubeLogo.js`. Os prompts seguintes servem apenas caso seja necessário um esboço visual; a biblioteca é a referência geométrica.

```text
Crie somente um ícone de Instagram em estilo de contorno leve equivalente ao Phosphor InstagramLogo: quadrado de cantos arredondados, círculo central e pequeno ponto no canto superior direito. Cor cinza próxima de#777B89, canvas quadrado transparente, sem fundo colorido, preenchimento fotográfico, sombra, gradiente ou texto. Mantenha proporções adequadas para 24×24 pixels e siga o vetor de referência se anexado.
```

```text
Crie somente o símbolo de Threads em estilo de contorno leve equivalente ao Phosphor ThreadsLogo: forma contínua arredondada característica, centralizada em canvas quadrado transparente. Cor cinza próxima de#777B89, sem círculo externo acrescentado, fundo colorido, sombra, gradiente ou texto. Mantenha boa leitura em 24×24 pixels e preserve a geometria do vetor de referência se anexado; não substitua por uma letra “a” redesenhada livremente.
```

```text
Crie somente um ícone de Facebook equivalente ao Phosphor FacebookLogo em traço leve, com o “f” característico no contexto circular do glifo de referência. Cor cinza próxima de#777B89, fundo transparente, canvas quadrado, sem azul de marca, sombra, gradiente ou texto adicional. Preserve a geometria da referência anexada e a legibilidade em 24×24 pixels. A versão final deve preferencialmente reutilizar o móduloPhosphor original.
```

```text
Crie somente um ícone de YouTube equivalente ao Phosphor YoutubeLogo em contorno leve: retângulo horizontal de cantos arredondados e triângulo de reprodução central. Cor cinza próxima de#777B89, fundo transparente e canvas quadrado, sem preenchimento vermelho, sombra, gradiente, palavras ou elementos extras. Preserve a proporção larga do retângulo dentro da caixa24×24e siga o vetor de referência se anexado.
```

### G10 — outros controles e marca Framer

**[V/C]** Mais/fechar deFAQ, indicador de som, círculos de navegação e marca Framer no rodapé são elementos de interface. Usar os paths/componentes ouCSSoriginais; não precisam ser gerados como fotografias. O deck de depoimentos usa chevrons semelhantes aosSVGdo carrossel, mas com botão externo 56px. O wordmark Altheado card bento é texto, não uma imagem adicional. Otexto gigante por trás dos depoimentos e os números animados também são texto.

**Prompt da marca Framer, se indispensável como esboço:**

```text
Crie somente o símbolo geométricoFramerda referência anexada, monocromático cinza, em canvas quadrado transparente, sem palavra ao lado. Preserve os blocos e triângulos retos do vetor original, sem arredondamento, sombra, relevo ou textura. Centralize para uma aplicação de 30×30 pixels e não adicione outros símbolos. Para a versão final, usar o SVGoriginal do rodapé em vez de um raster gerado.
```

## 8. Checklist de produção e comparação [P]

### 8.1 Retratos principais

- A direção do rosto é correta: I01 direita, I05 direita/baixo, I06 esquerda/cima, I08 esquerda/baixo; I03/I04 frontais.
- A mesma referência de identidade foi mantida na série quando o objetivo é consistência; nenhuma geração alterou a idade aparente para menor de idade.
- Não foram introduzidos joias, unhas/mãos, frascos, roupa contrastante, cenário clínico ou texto.
- Cabelo e silhueta não têm halo escuro/branco artificial ao serem colocados sobre #D6DAEB.
- I01/I03 têm alfa real; I04/I05/I06 fundem seu fundo branco com o card. Não trocar os dois comportamentos.
- Pele continua clara e suave, sem estouro que elimine nariz/olhos, sem textura plástica e sem contraste de campanha dramática.
- Crop mantém pescoço/queixo, topo da cabeça e direção do olhar compatíveis com a referência.

### 8.2 Journal e avatars

- I07 mantém plumas secas e luz diagonal; sem vaso/plantas verdes acrescentados.
- I08 mantém o perfil voltado à esquerda e espaço para cortes horizontal e vertical.
- Resoluções1024/2048derivam do mesmo mestre, sem variação de composição.
- Os cinco avatars mantêm ordem, fundo e direção do olhar. Não aplicar a paleta branca da clínica a todas as pessoas.
- A máscaraI19é aplicada como máscara e não aparece como camada cinza sobre a foto.

### 8.3 Qualidade técnica

- Comparar o mestre e o crop na posição real do site; aprovação isolada da imagem não valida o layout.
- Não declarar formato SVGquando a saída do gerador é raster.
- Exportar sRGB; confirmar alfa, dimensão final e ausência de metadados desnecessários.
- Avaliar a 20%,100%e no tamanho final44 pxdos avatars, além do desktop/mobile.
- Preservar originais; usar nomes novos para substitutos gerados e registrar qual asset foi trocado.
- Manter separados“arquivo capturado”, “imagem gerada” e “propriedade estimada”. Nenhuma imagem foi gerada durante esta análise; os blocos são prompts para uso posterior.

## Apêndice A — geometria original dos SVG

Para as setas, o original usa `stroke-linecap="round"`, `stroke-linejoin="round"`, `stroke-width="2"`, `stroke="hsl(0, 0%, 100%)"` e `fill="transparent"`. Os paths exatos já estão nas fichas I17/I18. Para a máscara, conservar o arquivo I19 completo: a escala e o recorte no CSSfazem parte do resultado.

## Apêndice B — arquivos físicos e integridade

As dimensões abaixo são dos arquivos copiados do ZIP, não das dimensões de origem declaradas em URLs. SHA-256 permite verificar se um asset foi preservado sem recompressão.


| Arquivo | Dimensão | Bytes | SHA-256 |
|---|---|---:|---|
| [0WVX1KMgVFBEAviv4zQhKVw8rgk__q6849539d.jpg](referencias/assets/0WVX1KMgVFBEAviv4zQhKVw8rgk__q6849539d.jpg) | 1024×1024 | 66881 | `56ab61f290e7b0dba80c24e1492fe40c761717274dfa061a3535a086f4695c68` |
| [0WVX1KMgVFBEAviv4zQhKVw8rgk__qc3f29497.jpg](referencias/assets/0WVX1KMgVFBEAviv4zQhKVw8rgk__qc3f29497.jpg) | 2048×2048 | 281996 | `20d1343d57013b286ecee310e97fb4f1b5aa3471bc842938623f476892fab48c` |
| [11KSGbIZoRSg4pjdnUoif6MKHI.svg](referencias/assets/11KSGbIZoRSg4pjdnUoif6MKHI.svg) | 40×40 | 215 | `6fce5a0604a6267ad769dd5e7afbfcf8bd0390897f682aec71f6307999a5b67e` |
| [30nszQvXKcEgIENheS0WavYlM2Y__q2a2e22cb.jpg](referencias/assets/30nszQvXKcEgIENheS0WavYlM2Y__q2a2e22cb.jpg) | 612×810 | 9190 | `225d8d1ea49cd64abb5561c3f6d7df35efc8d65a5344897570036945dfbe1b2f` |
| [6tTbkXggWgQCAJ4DO2QEdXXmgM.svg](referencias/assets/6tTbkXggWgQCAJ4DO2QEdXXmgM.svg) | 40×40 | 214 | `ca764b5867087d3c5ffc2bb0497a50b2ecf18ae7252169951ec97e18a592973d` |
| [9O8sLldl6mV9miUVjkyrhGJsZ7c__q8307f77b.svg](referencias/assets/9O8sLldl6mV9miUVjkyrhGJsZ7c__q8307f77b.svg) | 40×48 | 263 | `9148576069d87b0821a928a4ac81a48b34c28d8ccbf30495e53e56e7e2791625` |
| [AFEMnkblR75GU9bwfRpmzlqBpQ__q6685a546.jpg](referencias/assets/AFEMnkblR75GU9bwfRpmzlqBpQ__q6685a546.jpg) | 774×1024 | 25793 | `56825933e5bb00f6dbc8cb06be3922749fd6ecbe88a8e05cf38d2c761e6c51ad` |
| [AYmhm7fQptPoF2bCQsLfIJDi0U4__qb58c289b.jpg](referencias/assets/AYmhm7fQptPoF2bCQsLfIJDi0U4__qb58c289b.jpg) | 758×1024 | 46639 | `d0d7e7c1b7fc389dc221d0e6d21583fdb6f2b2c4412cb32f2157a83b6e7addca` |
| [ES6IJ8JiS4iNVkDK38fQhwjZDr4__qb28827a7.jpg](referencias/assets/ES6IJ8JiS4iNVkDK38fQhwjZDr4__qb28827a7.jpg) | 512×512 | 22864 | `accc5bfc80e1759a16a9acde97024b38dd197d4d1ca2c8b4e84a50f9a65a2854` |
| [FovUcCMKMP12nR1uhOYL6c8pKi0.png](referencias/assets/FovUcCMKMP12nR1uhOYL6c8pKi0.png) | 180×180 | 390 | `9714ce80db266173ef0614ab067b99ab80666ca5f229c22fa6e06cca8efbdc4b` |
| [Iygm9WFensHwXXoe01QWLQ0iF78__qec5eb331.jpg](referencias/assets/Iygm9WFensHwXXoe01QWLQ0iF78__qec5eb331.jpg) | 1667×1653 | 71370 | `4be53c785c0f783e141d09cb25938d6fef54ad9396e16d43e9a5e5fce0cd2fdb` |
| [PH9MBoozXCDuSg7Zw0ksQExNo__qb28827a7.jpg](referencias/assets/PH9MBoozXCDuSg7Zw0ksQExNo__qb28827a7.jpg) | 512×512 | 33376 | `3007ab315fd11c0d916f4515542539b0d63aaa87434ecac2c89d75e09dd2026e` |
| [POpTLGuLzTuWYxuEYrRGJD678__qb9231ed5.jpg](referencias/assets/POpTLGuLzTuWYxuEYrRGJD678__qb9231ed5.jpg) | 280×280 | 16390 | `4245268ed2a96a2781854fb7e17580f1182f7aae2ad14aa5272d34187ebbfd2a` |
| [WT1fXZXGqa7Qd4EpaVBU6nft0.png](referencias/assets/WT1fXZXGqa7Qd4EpaVBU6nft0.png) | 64×64 | 936 | `82bc936191e6997f15262624c9ce9f29a8a36c536b426afe652c5b6a94d30863` |
| [aLd0GlWVHywVWuurCk8JtAWSPw__qb28827a7.jpg](referencias/assets/aLd0GlWVHywVWuurCk8JtAWSPw__qb28827a7.jpg) | 512×512 | 20306 | `8548f10140e35f0bb589de8224df78b94af53544e0fc8f5503cf2bd3ce071261` |
| [azpEwdss6XW8gQrcvhKGGrYqjg__qec5eb331.webp](referencias/assets/azpEwdss6XW8gQrcvhKGGrYqjg__qec5eb331.webp) | 1667×1653 | 96244 | `677f05e9a252fb48901504136587cabed8cf3b0a735e92640e28e93eb4a16346` |
| [duZSo1YDta06usFuc3EkJTiRdM__qb28827a7.jpg](referencias/assets/duZSo1YDta06usFuc3EkJTiRdM__qb28827a7.jpg) | 512×512 | 33409 | `d0f1a44fefaa3eae9d58fc1d3eba833eb0323500afb344ee3ab7a2d7176c27cb` |
| [nJqFkXMmRiafaaCThCYlQSprSFk__q6849539d.jpg](referencias/assets/nJqFkXMmRiafaaCThCYlQSprSFk__q6849539d.jpg) | 1024×1024 | 46308 | `2a74d6ca8a8ea358f95f2f72ccd0588b0c83dcce4fc9a366e71baea0400fd703` |
| [nJqFkXMmRiafaaCThCYlQSprSFk__qc3f29497.jpg](referencias/assets/nJqFkXMmRiafaaCThCYlQSprSFk__qc3f29497.jpg) | 2048×2048 | 150582 | `44a3274bcb4d3f1a6f5fd4a01eb1583bdfd2cfa760d60b06f067287aaeb3046f` |
| [oK4ZpG0Udo91FCmeNX5CiuStQBg__qdd5a09f3.webp](referencias/assets/oK4ZpG0Udo91FCmeNX5CiuStQBg__qdd5a09f3.webp) | 928×1228 | 57355 | `3ce889134a3589b83f7756e337810d1765228ecae1ce6495f280c7a9ea96c847` |
| [zKYk3xaySEc43cUDiQTIdQsugwU__q885e406b.jpg](referencias/assets/zKYk3xaySEc43cUDiQTIdQsugwU__q885e406b.jpg) | 512×384 | 22055 | `1c4f10d70a412c2e3e637acb90e3056196ecb0a4d5e3108ff9962b2811f0d211` |
