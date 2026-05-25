const {
    GoogleGenerativeAI
} = require("@google/generative-ai");

const genAI =
new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

const model =
genAI.getGenerativeModel({

    model: "gemini-2.5-flash"
});

async function transcribeAudio(

    audioBase64,

    mimeType
) {

    try {

        console.log(
            `🎤 MIME TYPE: ${mimeType}`
        );

        // ========================================
        // GEMINI AUDIO TRANSCRIPTION
        // ========================================

        const result =

        await Promise.race([

            model.generateContent([

                {
                    inlineData: {

                        data: audioBase64,

                        mimeType:
                        mimeType
                    }
                },

                `
You are an expert multilingual transcription AI.

The user may speak:
- Moroccan Darija
- French
- English
- Arabic
- Mixed languages

Your task:

- Transcribe EXACTLY what is spoken
- Keep original language
- No translation
- No explanations
- No formatting
- No summaries
- No extra text

IMPORTANT:

If audio is:
- empty
- unclear
- noise only

return ONLY:
...

`
            ]),

            // ========================================
            // TIMEOUT PROTECTION
            // ========================================

            new Promise((_, reject) =>

                setTimeout(() =>

                    reject(
                        new Error(
                            'Gemini timeout'
                        )
                    ),

                    15000
                )
            )
        ]);

        // ========================================
        // EXTRACT TEXT
        // ========================================

        const text =

        result.response
        .text()
        ?.trim();

        console.log(
            `🗣️ TRANSCRIBED: ${text}`
        );

        // ========================================
        // EMPTY SAFETY
        // ========================================

        if (
            !text ||
            text === '' ||
            text === '...'
        ) {

            console.log(
                '⚠️ Empty transcription'
            );

            return null;
        }

        return text;

    } catch (error) {

        console.log(
            '❌ AUDIO AI ERROR'
        );

        console.log(error);

        return null;
    }
}

module.exports = {

    transcribeAudio
};