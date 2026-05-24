function buildCustomerProfile(

    messages = []
) {

    const profile = {

        vibe: "normal",

        favoriteProduct: null,

        loyaltyLevel: "new",

        emotionalState: "normal",

        language: "unknown"
    };

    const text =
    messages.join(" ").toLowerCase();

    // ========================================
    // FAVORITE PRODUCTS
    // ========================================

    if (text.includes("hoodie")) {

        profile.favoriteProduct =
        "hoodies";
    }

    if (text.includes("abaya")) {

        profile.favoriteProduct =
        "abayas";
    }

    if (text.includes("dress")) {

        profile.favoriteProduct =
        "dresses";
    }

    // ========================================
    // EMOTIONAL STATE
    // ========================================

    if (
        text.includes("sad") ||
        text.includes("lonely")
    ) {

        profile.emotionalState =
        "sensitive";
    }

    // ========================================
    // LANGUAGE
    // ========================================

    if (
        text.includes("salam") ||
        text.includes("labas")
    ) {

        profile.language =
        "darija";
    }

    if (
        text.includes("bonjour")
    ) {

        profile.language =
        "french";
    }

    // ========================================
    // LOYALTY
    // ========================================

    if (messages.length > 20) {

        profile.loyaltyLevel =
        "vip";
    }

    else if (messages.length > 8) {

        profile.loyaltyLevel =
        "warm";
    }

    return profile;
}

module.exports = {

    buildCustomerProfile
};