function getConversationDirection(

    intent,

    mood
) {

    // ========================================
    // EMOTIONAL
    // ========================================

    if (mood === "sad") {

        return `
        Comfort customer softly.
        Ask caring follow-up questions.
        Keep emotional connection alive.
        `;
    }

    // ========================================
    // SHOPPING
    // ========================================

    if (intent === "shopping") {

        return `
        Keep conversation flowing.
        Ask about customer preferences.
        Guide customer naturally.
        `;
    }

    // ========================================
    // PRICING
    // ========================================

    if (intent === "pricing") {

        return `
        Mention price naturally,
        but continue conversation after price.
        Ask stylish follow-up questions.
        `;
    }

    // ========================================
    // GREETING
    // ========================================

    if (intent === "greeting") {

        return `
        Be warm and playful.
        Start engaging conversation naturally.
        `;
    }

    return `
    Keep conversation emotionally alive.
    Avoid dead replies.
    `;
}

module.exports = {

    getConversationDirection
};