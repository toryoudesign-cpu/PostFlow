/**
 * Gerador de Mini-Site em HTML Standalone para Envio ao Designer / Cliente
 */

export function generateStandaloneHtml({ brand, content, format, aspectRatio = '4/5' }) {
  const isCarousel = format === 'carrossel' && content.slides;
  const isReel = format === 'reel' && content.reelScript;

  const aspectDimMap = {
    '4/5': '1080 x 1350 px (4:5)',
    '1/1': '1080 x 1080 px (1:1)',
    '3/4': '1080 x 1440 px (3:4)',
    '9/16': '1080 x 1920 px (9:16)'
  };

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${brand.handle} — Briefing de Conteúdo</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Serif+Display:ital@0;1&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'DM Sans', sans-serif;
    background: ${brand.colors.bg};
    color: ${brand.colors.dark};
    line-height: 1.6;
    padding: 32px 20px;
  }
  .container { max-width: 860px; margin: 0 auto; }
  header {
    background: ${brand.colors.primary};
    color: ${brand.colors.light};
    padding: 36px 32px;
    border-radius: 16px;
    margin-bottom: 24px;
  }
  .handle { font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; opacity: 0.8; margin-bottom: 8px; }
  h1 { font-family: 'DM Serif Display', serif; font-size: 32px; font-weight: 400; }
  .pills { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 16px; }
  .pill { background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); border-radius: 100px; padding: 4px 12px; font-size: 11.5px; }
  
  .card {
    background: white;
    border-radius: 16px;
    border: 1px solid #EAE3DA;
    padding: 28px;
    margin-bottom: 24px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.04);
  }
  .mockup {
    background: ${content.designerGuidelines.suggestedBgColor};
    color: ${content.designerGuidelines.suggestedTextColor};
    border-radius: 12px;
    padding: 40px 24px;
    text-align: center;
    margin-bottom: 24px;
  }
  .mockup-title { font-family: 'DM Serif Display', serif; font-size: 26px; font-style: italic; line-height: 1.3; }
  .mockup-sub { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 10px; opacity: 0.75; }

  .box-spec {
    background: #FAF6F1;
    border-left: 4px solid ${brand.colors.accent};
    padding: 14px 18px;
    border-radius: 0 8px 8px 0;
    margin-bottom: 20px;
    font-size: 13px;
  }
  .box-spec strong { color: ${brand.colors.primary}; display: block; margin-bottom: 4px; text-transform: uppercase; font-size: 11px; }

  .caption-box {
    background: ${brand.colors.bg};
    border: 1px solid #EAE3DA;
    border-radius: 10px;
    padding: 18px;
    font-size: 13.5px;
    line-height: 1.8;
    white-space: pre-line;
  }
  .hashtags { color: ${brand.colors.highlight}; font-weight: 600; font-size: 12px; margin-top: 12px; }

  .copy-btn {
    background: ${brand.colors.primary};
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
    margin-top: 16px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .copy-btn:hover { opacity: 0.9; }

  .slides-grid { display: flex; flex-direction: column; gap: 8px; margin: 16px 0; }
  .slide-item { background: #FAF6F1; padding: 12px 16px; border-radius: 8px; font-size: 13px; }
  .slide-num { font-weight: 700; color: ${brand.colors.primary}; font-size: 11.5px; text-transform: uppercase; margin-bottom: 3px; }

  .palette { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px; }
  .color-badge { display: inline-flex; align-items: center; gap: 6px; background: white; border: 1px solid #DDD; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; }
  .color-dot { width: 12px; height: 12px; border-radius: 3px; }
</style>
</head>
<body>
<div class="container">
  <header>
    <div class="handle">${brand.handle} · Briefing de Produção</div>
    <h1>${content.theme}</h1>
    <div class="pills">
      <span class="pill">${format.toUpperCase()}</span>
      <span class="pill">Nicho: ${brand.niche}</span>
      <span class="pill">Proporção: ${aspectDimMap[aspectRatio] || aspectRatio}</span>
    </div>
  </header>

  <div class="card">
    <div class="mockup">
      <div class="mockup-title">${content.cardTitle}</div>
      <div class="mockup-sub">${content.cardSub}</div>
    </div>

    ${isCarousel ? `
      <h3 style="font-family:'DM Serif Display',serif; font-size: 18px; margin-bottom: 10px;">Estrutura dos Slides</h3>
      <div class="slides-grid">
        ${content.slides.map(s => `
          <div class="slide-item">
            <div class="slide-num">Slide ${s.slideNum} — ${s.title}</div>
            <div>${s.content}</div>
          </div>
        `).join('')}
      </div>
    ` : ''}

    ${isReel ? `
      <h3 style="font-family:'DM Serif Display',serif; font-size: 18px; margin-bottom: 10px;">Roteiro com Minutagem</h3>
      <div class="slides-grid">
        ${content.reelScript.map(r => `
          <div class="slide-item">
            <div class="slide-num">Tempo: ${r.time}</div>
            <div>${r.speech}</div>
          </div>
        `).join('')}
      </div>
    ` : ''}

    <div class="box-spec">
      <strong>Diretrizes Visuais para o Designer</strong>
      ${content.designerGuidelines.visualDirection}<br>
      • <strong>Dimensão:</strong> ${aspectDimMap[aspectRatio] || aspectRatio}<br>
      • <strong>Tipografia:</strong> ${content.designerGuidelines.fontPairing}<br>
      • <strong>Cores sugeridas:</strong> Fundo (${content.designerGuidelines.suggestedBgColor}) | Texto (${content.designerGuidelines.suggestedTextColor})
    </div>

    <h3 style="font-family:'DM Serif Display',serif; font-size: 18px; margin: 20px 0 10px;">Legenda Completa</h3>
    <div class="caption-box" id="caption-text">${content.caption}</div>
    <div class="hashtags">${content.hashtags}</div>

    <button class="copy-btn" onclick="copiarLegenda()">📋 Copiar Legenda Completa</button>
  </div>

  <div class="card">
    <h3 style="font-family:'DM Serif Display',serif; font-size: 16px; margin-bottom: 8px;">Paleta de Cores da Marca</h3>
    <div class="palette">
      <span class="color-badge"><span class="color-dot" style="background:${brand.colors.primary}"></span> ${brand.colors.primary} (Primária)</span>
      <span class="color-badge"><span class="color-dot" style="background:${brand.colors.dark}"></span> ${brand.colors.dark} (Escura)</span>
      <span class="color-badge"><span class="color-dot" style="background:${brand.colors.accent}"></span> ${brand.colors.accent} (Destaque)</span>
      <span class="color-badge"><span class="color-dot" style="background:${brand.colors.light}"></span> ${brand.colors.light} (Clara)</span>
      <span class="color-badge"><span class="color-dot" style="background:${brand.colors.highlight}"></span> ${brand.colors.highlight} (Realce)</span>
    </div>
  </div>
</div>

<script>
function copiarLegenda() {
  const txt = document.getElementById('caption-text').innerText;
  navigator.clipboard.writeText(txt).then(() => {
    alert('Legenda copiada com sucesso!');
  });
}
</script>
</body>
</html>`;
}

export function downloadHtmlFile(htmlContent, filename = 'briefing-conteudo.html') {
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
