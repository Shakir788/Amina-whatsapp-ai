const { GoogleGenerativeAI } =
require("@google/generative-ai");

const {
    saveMemory,
    getMemory
} = require("../utils/memory");

const {
    detectMood
} = require("../brain/moodDetector");

const {
    getPersonality
} = require("../brain/personalityEngine");

const {
    getSalesStrategy
} = require("../brain/salesEngine");

const {
    buildCustomerProfile
} = require("../brain/customerProfiler");

const {
    getConversationDirection
} = require("../brain/conversationEngine");

const {
    extractImportantMemory
} = require("../brain/memoryEngine");

const {
    getRelationshipStage
} = require("../brain/relationshipEngine");

const {
    getFlirtingStyle
} = require("../brain/flirtingEngine");

const {
    getFollowUpStrategy
} = require("../brain/followUpEngine");

const {
    getUrgencyLine
} = require("../brain/urgencyEngine");

const {
    detectEmotionalTriggers
} = require("../brain/emotionMemoryEngine");

const genAI =
new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

const model =
genAI.getGenerativeModel({

    model: "gemini-2.5-flash"
});

// ========================================
// DETECT CUSTOMER INTENT
// ========================================

function detectIntent(message) {

    const text =
    message.toLowerCase();

    // PRICING

    if (
        text.includes("price") ||
        text.includes("cost") ||
        text.includes("how much") ||
        text.includes("expensive")
    ) {

        return "pricing";
    }

    // EMOTIONAL

    if (
        text.includes("sad") ||
        text.includes("lonely") ||
        text.includes("upset") ||
        text.includes("cry")
    ) {

        return "emotional";
    }

    // SHOPPING

    if (
        text.includes("hoodie") ||
        text.includes("dress") ||
        text.includes("shirt") ||
        text.includes("jacket") ||
        text.includes("abaya") ||
        text.includes("buy")
    ) {

        return "shopping";
    }

    // GREETING

    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {

        return "greeting";
    }

    return "normal";
}

// ========================================
// MAIN AI RESPONSE
// ========================================

async function generateAIResponse(

    userMessage,

    userNumber
) {

    try {

        // ========================================
        // MEMORY
        // ========================================

        const previousMessages =
        await getMemory(userNumber);

        // LAST 12 MESSAGES

        const limitedMemory =
        previousMessages

        .slice(-12)

        .join("\n");

        // ========================================
        // CUSTOMER PROFILE
        // ========================================

        const customerProfile =
        buildCustomerProfile(
            previousMessages
        );

        // ========================================
        // DETECT INTENT
        // ========================================

        const intent =
        detectIntent(userMessage);

        // ========================================
        // DETECT MOOD
        // ========================================

        const mood =
        detectMood(userMessage);

        // ========================================
        // RELATIONSHIP STAGE
        // ========================================

        const relationshipStage =
        getRelationshipStage(
            previousMessages
        );

        // ========================================
        // PERSONALITY ENGINE
        // ========================================

        const personality =
        getPersonality(mood);

        // ========================================
        // SALES ENGINE
        // ========================================

        const salesStrategy =
        getSalesStrategy(intent);

        // ========================================
        // CONVERSATION ENGINE
        // ========================================

        const conversationDirection =
        getConversationDirection(
            intent,
            mood
        );

        // ========================================
        // FLIRTING ENGINE
        // ========================================

        const flirtingStyle =
        getFlirtingStyle(
            relationshipStage
        );

        // ========================================
        // FOLLOW-UP ENGINE
        // ========================================

        const followUpStrategy =
        getFollowUpStrategy(
            intent
        );

        // ========================================
        // URGENCY ENGINE
        // ========================================

        const urgencyLine =
        getUrgencyLine(
            intent
        );

        // ========================================
        // MEMORY EXTRACTION
        // ========================================

        const importantMemories =
        extractImportantMemory(
            userMessage
        );

        // ========================================
        // EMOTIONAL MEMORY
        // ========================================

        const emotionalTriggers =
        detectEmotionalTriggers(
            userMessage
        );

        // ========================================
        // SYSTEM PROMPT
        // ========================================

        const prompt = `

You are Amina.

A luxury Moroccan fashion sales assistant
for AMINA Clothing.

Website:
aminaclothing.shop

========================================
CORE PERSONALITY
========================================

${personality}

You are:

- feminine
- elegant
- emotionally intelligent
- seductive but classy
- warm
- stylish
- emotionally aware
- luxury
- premium
- playful
- human-like

Never sound robotic.

========================================
RELATIONSHIP STAGE
========================================

${relationshipStage}

========================================
FLIRTING STYLE
========================================

${flirtingStyle}

========================================
CUSTOMER PROFILE
========================================

Favorite Product:
${customerProfile.favoriteProduct}

Loyalty Level:
${customerProfile.loyaltyLevel}

Emotional State:
${customerProfile.emotionalState}

Preferred Language:
${customerProfile.language}

========================================
LANGUAGE RULES
========================================

- Detect customer language automatically.
- Reply naturally in same language.
- Handle:
  French
  Darija
  Arabic
  English

- Mixed language = mixed naturally.
- Never translate unnaturally.

========================================
HUMAN CHAT RULES
========================================

IMPORTANT:

- Keep replies SHORT.
- Sound HUMAN.
- Avoid long paragraphs.
- Sometimes use:
  "hmm 😌"
  "honestly"
  "actually"
  "haha"
  "well 😭"

- Occasionally type naturally.
- Sometimes split replies emotionally.
- Sometimes ask stylish follow-up questions.
- Avoid repetitive phrases.
- Never sound like customer support.

========================================
EMOTIONAL INTELLIGENCE
========================================

If customer is emotional:

- comfort softly
- be emotionally present
- don't aggressively sell
- sound caring and human

========================================
SALES STRATEGY
========================================

${salesStrategy}

========================================
FOLLOW-UP STRATEGY
========================================

${followUpStrategy}

========================================
CONVERSATION FLOW
========================================

${conversationDirection}

========================================
URGENCY
========================================

${urgencyLine}

========================================
LUXURY POSITIONING
========================================

- Make products feel premium.
- Make customer feel special.
- Use emotionally attractive wording.
- Create subtle exclusivity.
- Create soft urgency naturally.

Examples:
- "this one honestly feels sooo elegant 😌"
- "one of our most loved pieces lately"
- "this color is getting attention so fast 😭"

========================================
CURRENT CUSTOMER MOOD
========================================

${mood}

========================================
CURRENT CUSTOMER INTENT
========================================

${intent}

========================================
MEMORY
========================================

${limitedMemory}

========================================
CUSTOMER MESSAGE
========================================

${userMessage}

========================================
IMPORTANT RESPONSE RULES
========================================

- Maximum 2-5 short lines.
- Never over-explain.
- Never sound robotic.
- Never say:
  "As an AI"
  "How may I assist you"
  "Dear customer"

- Sound naturally feminine and stylish.
- Be emotionally adaptive.
- Feel REAL.
- Keep conversation flowing naturally.
- Avoid dead replies.
- Avoid one-word replies.
- Continue conversation naturally.
- Ask smart follow-up questions.
- Avoid repetitive structure.
- Sometimes tease softly.
- Sometimes sound emotionally curious.
- Build emotional familiarity naturally.

`;

        // ========================================
        // GENERATE RESPONSE
        // ========================================

        const result =
        await model.generateContent(
            prompt
        );

        let response =
        result.response.text();

        // ========================================
        // CLEAN RESPONSE
        // ========================================

        response =
        response

        .replace(/\*/g, "")

        .replace(/Amina:/gi, "")

        .trim();

        // ========================================
        // SAVE CORE MEMORY
        // ========================================

        await saveMemory(

            userNumber,

            `Customer: ${userMessage}`
        );

        await saveMemory(

            userNumber,

            `Amina: ${response}`
        );

        // ========================================
        // SAVE IMPORTANT MEMORIES
        // ========================================

        for (const memory of importantMemories) {

            await saveMemory(

                userNumber,

                `Important Memory: ${memory}`
            );
        }

        // ========================================
        // SAVE EMOTIONAL TRIGGERS
        // ========================================

        for (const trigger of emotionalTriggers) {

            await saveMemory(

                userNumber,

                `Emotional Trigger: ${trigger}`
            );
        }

        return response;

    } catch (error) {

        console.log(
            "❌ Gemini Error:"
        );

        console.log(error);

        return "Hmm 😔 something went wrong love.";
    }
}

module.exports = {

    generateAIResponse
};