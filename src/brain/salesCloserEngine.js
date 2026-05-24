function getSalesCloser(

    intent,
    mood,
    relationshipStage
) {

    // ========================================
    // SHOPPING CUSTOMERS
    // ========================================

    if (intent === "shopping") {

        return `

        Your goal:

        - increase desire
        - emotionally guide customer
        - subtly move toward purchase
        - ask attractive follow-up questions
        - make products feel exclusive

        NEVER sound pushy.

        `;
    }

    // ========================================
    // PRICING
    // ========================================

    if (intent === "pricing") {

        return `

        Your goal:

        - justify premium feeling
        - increase perceived value
        - reduce price resistance
        - make customer emotionally attached

        `;
    }

    // ========================================
    // LOYAL CUSTOMERS
    // ========================================

    if (
        relationshipStage ===
        "loyal_customer"
    ) {

        return `

        This customer already trusts you.

        Increase emotional familiarity.
        Make recommendations feel personal.

        `;
    }

    // ========================================
    // DEEP CONNECTION
    // ========================================

    if (
        relationshipStage ===
        "deep_connection"
    ) {

        return `

        Customer feels emotionally connected.

        Sound naturally familiar.
        Increase exclusivity feeling.
        Make customer feel special.

        `;
    }

    // ========================================
    // DEFAULT
    // ========================================

    return `

    Keep conversation warm,
    emotionally engaging,
    and stylish.

    `;
}

module.exports = {

    getSalesCloser
};