const fallbackReport = {
  score: 82,
  faceShape: "Balanced",
  attractiveness: "Strong presentation",
  style: "Minimal Korean streetwear",
  hairstyle: "Textured fringe or Korean two-block",
  priority: "Improve photo lighting, hair volume, posture, and outfit contrast.",
  outfit: "Clean neutral layers, straight-leg trousers, minimal sneakers, and one structured outer layer.",
  plan30Days:
    "Week 1: haircut references and skincare consistency. Week 2: outfit basics. Week 3: posture and fitness routine. Week 4: retake profile photos.",
};

const reportSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "score",
    "faceShape",
    "attractiveness",
    "style",
    "hairstyle",
    "priority",
    "outfit",
    "plan30Days",
  ],
  properties: {
    score: {
      type: "number",
      minimum: 1,
      maximum: 100,
      description: "A subjective style and presentation score, not a measure of human worth.",
    },
    faceShape: {
      type: "string",
      description: "Broad visual face-shape impression, such as oval, round, square, heart, or balanced.",
    },
    attractiveness: {
      type: "string",
      description: "A short presentation-focused label, avoiding identity, age, or sensitive traits.",
    },
    style: {
      type: "string",
      description: "Best style direction for the person in the image.",
    },
    hairstyle: {
      type: "string",
      description: "Practical hairstyle recommendation.",
    },
    priority: {
      type: "string",
      description: "Highest-impact glow-up priority.",
    },
    outfit: {
      type: "string",
      description: "Practical outfit direction.",
    },
    plan30Days: {
      type: "string",
      description: "Short 30-day action plan.",
    },
  },
};

function isValidDataUrl(value) {
  return typeof value === "string" && /^data:image\/(png|jpe?g|webp);base64,/i.test(value);
}

function extractJsonText(responseJson) {
  if (typeof responseJson.output_text === "string") return responseJson.output_text;

  const message = responseJson.output?.find((item) => item.type === "message");
  const textItem = message?.content?.find((item) => item.type === "output_text");
  return textItem?.text || "";
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    response.status(500).json({ error: "Missing OPENAI_API_KEY" });
    return;
  }

  const { image } = request.body || {};

  if (!isValidDataUrl(image)) {
    response.status(400).json({ error: "Upload a PNG, JPG, JPEG, or WEBP selfie first." });
    return;
  }

  try {
    const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        input: [
          {
            role: "system",
            content: [
              {
                type: "input_text",
                text:
                  "You are a careful personal style analyst. Analyze visible styling, grooming, lighting, face-shape impression, and presentation. Do not identify the person, infer age, ethnicity, gender identity, health conditions, wealth, or other sensitive traits. Keep the tone constructive and practical.",
              },
            ],
          },
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text:
                  "Create an AI Personal Glow-Up Report from this selfie. Return concise, practical recommendations. The score is a subjective presentation/style score only.",
              },
              {
                type: "input_image",
                image_url: image,
                detail: "low",
              },
            ],
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "glowup_report",
            strict: true,
            schema: reportSchema,
          },
        },
      }),
    });

    const data = await openaiResponse.json();

    if (!openaiResponse.ok) {
      response.status(openaiResponse.status).json({
        error: data.error?.message || "OpenAI analysis failed.",
      });
      return;
    }

    const jsonText = extractJsonText(data);
    const report = JSON.parse(jsonText);

    response.status(200).json({ report });
  } catch (error) {
    response.status(500).json({
      error: error.message || "Unable to analyze this image.",
      report: fallbackReport,
    });
  }
}
