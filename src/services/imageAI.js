const {
    GoogleGenerativeAI
} = require("@google/generative-ai");

const {
    buildImageReactionPrompt
} = require("../brain/imagePersonalityEngine");

const genAI =
new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

const model =
genAI.getGenerativeModel({

    model: "gemini-2.5-flash"
});

async function analyzeFashionImage(

    imageBase64,

    mimeType
) {

    try {

        // ========================================
        // STEP 1 — ANALYZE IMAGE
        // ========================================

        const analysisResult =
        await model.generateContent([

            {
                inlineData: {

                    data: imageBase64,

                    mimeType
                }
            },

            `
Analyze this women's fashion image.

Detect:
- outfit type
- colors
- luxury vibe
- elegance
- feminine styling
- fashion energy

Keep analysis SHORT.
`
        ]);

        const analysis =

        analysisResult.response.text();

        // ========================================
        // STEP 2 — HUMANIZE RESPONSE
        // ========================================

        const humanPrompt =

        buildImageReactionPrompt(
            analysis
        );

        const finalResult =
        await model.generateContent(
            humanPrompt
        );

        let finalReply =

        finalResult.response.text();

        // ========================================
        // CLEAN RESPONSE
        // ========================================

        finalReply =

        finalReply

        .replace(/\*/g, "")

        .replace(/Amina:/gi, "")

        .trim();

        return finalReply;

    } catch (error) {

        console.log(
            "❌ IMAGE AI ERROR"
        );

        console.log(error);

        return `
Hmm 😔

I couldn't fully analyze the look love,
but it definitely feels elegant ✨
`;
    }
}

module.exports = {

    analyzeFashionImage
};