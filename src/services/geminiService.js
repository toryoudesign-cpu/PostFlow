/**
 * Serviço de Geração de Conteúdo Inteligente com IA
 */

export async function generateContent({ brand, format, topic, customTone, apiKey }) {
  // Se houver uma chave da API do Gemini configurada
  if (apiKey && apiKey.trim().length > 10) {
    try {
      return await generateWithGeminiApi({ brand, format, topic, customTone, apiKey });
    } catch (err) {
      console.warn('Erro na chamada da API Gemini, usando motor inteligente de fallback:', err);
    }
  }

  // Simulação com inteligência de copy especializada para demonstração instantânea do MVP
  await new Promise(resolve => setTimeout(resolve, 1400));
  return generateIntelligentFallback({ brand, format, topic, customTone });
}

async function generateWithGeminiApi({ brand, format, topic, customTone, apiKey }) {
  const prompt = `Você é um estrategista de conteúdo sênior e copywriter para redes sociais especialista no nicho de ${brand.niche}.
Crie um conteúdo completo para o perfil ${brand.handle} (${brand.name}).
Público-alvo: ${brand.targetAudience}
Tom de voz: ${customTone || brand.tone}
Regra de formatação de texto nos cards da imagem: ${brand.lowercaseRules ? 'TODOS OS TEXTOS NAS ARTES E CARDS DEVEM SER OBRIGATORIAMENTE EM MINÚSCULO.' : 'Caixa normal.'}

Formato solicitado: ${format === 'simples' ? 'Post Simples (Card Tipográfico Único ou Foto com Frase)' : format === 'carrossel' ? 'Carrossel Educativo (5 a 6 slides com gancho e CTA)' : 'Roteiro de Reel (Fala para câmera de 35 a 50 segundos com minutagem)'}
Tema do post: "${topic}"

Retorne APENAS um JSON válido no seguinte formato exato (sem blocos markdown extras):
{
  "theme": "Resumo do tema",
  "hook": "Frase de impacto inicial",
  "cardTitle": "Frase principal do card (em minúsculo se aplicável)",
  "cardSub": "Subtítulo do card",
  "slides": [
    { "slideNum": 1, "title": "Capa...", "content": "Texto do slide 1" },
    { "slideNum": 2, "title": "Ponto 1", "content": "Texto do slide 2" },
    { "slideNum": 3, "title": "Ponto 2", "content": "Texto do slide 3" },
    { "slideNum": 4, "title": "Ponto 3", "content": "Texto do slide 4" },
    { "slideNum": 5, "title": "Encerramento", "content": "Texto do slide 5 com CTA" }
  ],
  "reelScript": [
    { "time": "0–5s", "speech": "Gancho inicial impactante..." },
    { "time": "5–18s", "speech": "Desenvolvimento do problema..." },
    { "time": "18–32s", "speech": "Virada de chave e solução..." },
    { "time": "32–45s", "speech": "CTA suave e acolhedor..." }
  ],
  "caption": "Texto completo da legenda com parágrafos bem espaçados...",
  "hashtags": "#hashtag1 #hashtag2 #hashtag3 #hashtag4",
  "designerGuidelines": {
    "visualDirection": "Instruções de fotografia, enquadramento e luz para o designer",
    "suggestedBgColor": "${brand.colors.light}",
    "suggestedTextColor": "${brand.colors.dark}",
    "fontPairing": "${brand.fontSerif} + ${brand.fontSans}"
  }
}`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.7
      }
    })
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  const data = await response.json();
  const textOutput = data.candidates[0].content.parts[0].text;
  return JSON.parse(textOutput);
}

function generateIntelligentFallback({ brand, format, topic, customTone }) {
  const cleanTopic = topic || 'autocuidado e limites saudáveis';

  if (format === 'carrossel') {
    return {
      theme: `${cleanTopic} — passo a passo prático para transformar esse padrão`,
      hook: `o que ninguém te conta sobre ${cleanTopic.toLowerCase()} e por que você continua caindo no mesmo ciclo.`,
      cardTitle: `como lidar com ${cleanTopic.toLowerCase()}<br>sem se perder<br>no caminho`,
      cardSub: `carrossel prático · 5 slides`,
      slides: [
        {
          slideNum: 1,
          title: "capa",
          content: `como lidar com ${cleanTopic.toLowerCase()} sem se perder no caminho 👉`
        },
        {
          slideNum: 2,
          title: "1. reconheça o gatilho",
          content: `o primeiro passo não é mudar o comportamento de uma vez, mas perceber o momento exato em que a reação automática começa.`
        },
        {
          slideNum: 3,
          title: "2. normalize o desconforto",
          content: `sentir ansiedade ou culpa não significa que você está fazendo errado. significa que seu cérebro está aprendendo um caminho novo.`
        },
        {
          slideNum: 4,
          title: "3. escolha a direção dos seus valores",
          content: `a pergunta não é 'o que é mais fácil agora?', mas 'quem eu quero ser diante dessa situação?'`
        },
        {
          slideNum: 5,
          title: "encerramento & cta",
          content: `mudar padrões leva tempo e gentileza. se você quer construir esse caminho com suporte profissional, me manda uma mensagem. 🤍`
        }
      ],
      caption: `a gente passa anos acreditando que precisa resolver tudo de uma vez.

mas a verdade sobre ${cleanTopic.toLowerCase()} é que pequenas viradas de chave diárias têm muito mais poder do que grandes promessas.

desliza para entender o passo a passo prático que uso em sessões. 👉

salva esse post pra ter fácil quando precisar lembrar. 📌 🤍`,
      hashtags: `#${brand.niche.split(' ')[0].toLowerCase()} #saúdemental #autocuidado #autoconhecimento #terapia #${brand.id}`,
      designerGuidelines: {
        visualDirection: `Capa com fundo de alto contraste (${brand.colors.accent}). Slides internos alternando ${brand.colors.light} e ${brand.colors.bg}. Uma ideia por slide com número em destaque. Slide final com foto real do perfil.`,
        suggestedBgColor: brand.colors.accent,
        suggestedTextColor: brand.colors.dark,
        fontPairing: `${brand.fontSerif} (títulos) + ${brand.fontSans} (corpo)`
      }
    };
  }

  if (format === 'reel') {
    return {
      theme: `a verdade sobre ${cleanTopic} que quase ninguém fala`,
      hook: `se você tem sentido que ${cleanTopic.toLowerCase()} está pesado ultimamente, esse vídeo é pra você.`,
      cardTitle: `o que você precisa saber<br>sobre ${cleanTopic.toLowerCase()}`,
      cardSub: `roteiro de reel · ~45s`,
      reelScript: [
        {
          time: "0–5s",
          speech: `se você tem sentido que ${cleanTopic.toLowerCase()} está pesado ultimamente — para 30 segundos pra me ouvir.`
        },
        {
          time: "5–18s",
          speech: `existe uma crença comum de que você precisa dar conta de tudo com um sorriso no rosto. mas tentar ser forte o tempo todo só gera exaustão.`
        },
        {
          time: "18–32s",
          speech: `o ponto de virada é quando você entende que cuidar de si não é egoísmo — é a base para conseguir sustentar o que realmente importa na sua vida.`
        },
        {
          time: "32–45s",
          speech: `se isso fez sentido pra você hoje, salva esse vídeo e me conta aqui nos comentários como você tem lidado com isso. 🤍`
        }
      ],
      caption: `tentar dar conta de tudo não é força. é sobrecarga disfarçada de controle.

aprender a pausar e recalcular a rota é um ato de coragem diário.

salva esse vídeo pra quando a autocobrança bater forte. 🤍

${brand.handle}`,
      hashtags: `#${brand.niche.split(' ')[0].toLowerCase()} #reflexão #reelsbrasil #saúdemental #desenvolvimentopessoal`,
      designerGuidelines: {
        visualDirection: `Filmagem direta para a câmera com olhar seguro e acolhedor. Luz suave natural lateral de janela. Sem música alta competindo com a voz. Legendas automáticas limpas e elegantes.`,
        suggestedBgColor: brand.colors.dark,
        suggestedTextColor: brand.colors.light,
        fontPairing: `${brand.fontSerif} + ${brand.fontSans}`
      }
    };
  }

  // Post Simples
  return {
    theme: `${cleanTopic} — desconstruindo a cobrança e criando espaço para o que importa`,
    hook: `você não precisa estar pronta para começar a fazer o que tem valor pra você.`,
    cardTitle: brand.lowercaseRules 
      ? `você não precisa<br>dar conta de tudo<br>ao mesmo tempo.`
      : `Você não precisa<br>dar conta de tudo<br>ao mesmo tempo.`,
    cardSub: `reflexão · ${cleanTopic.toLowerCase()}`,
    caption: `a gente aprendeu que descansar só é permitido depois que todas as pendências terminarem.

o problema é que a lista de pendências nunca acaba.

então a gente vai adiando a pausa, o respiro e a própria vida.

você não precisa merecer o descanso. descansar é parte do processo de estar viva. 🤍`,
    hashtags: `#${brand.niche.split(' ')[0].toLowerCase()} #reflexão #autocuidado #saúdemental #autoconhecimento #${brand.id}`,
    designerGuidelines: {
      visualDirection: `Card tipográfico minimalista com muito espaço negativo. Fundo ${brand.colors.light} com tipografia ${brand.colors.dark}. Ou foto real em momento introspectivo e acolhedor.`,
      suggestedBgColor: brand.colors.light,
      suggestedTextColor: brand.colors.dark,
      fontPairing: `${brand.fontSerif} + ${brand.fontSans}`
    }
  };
}
