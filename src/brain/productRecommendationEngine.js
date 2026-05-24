function getProductRecommendation(

    message,
    customerProfile
) {

    const text =
    message.toLowerCase();

    // ========================================
    // HOODIES
    // ========================================

    if (
        text.includes("hoodie")
    ) {

        return `
        Recommend oversized hoodies,
        premium streetwear,
        and luxury casual styles.
        `;
    }

    // ========================================
    // ABAYAS
    // ========================================

    if (
        text.includes("abaya")
    ) {

        return `
        Recommend elegant abayas,
        satin collections,
        and luxury modest fashion.
        `;
    }

    // ========================================
    // DRESSES
    // ========================================

    if (
        text.includes("dress")
    ) {

        return `
        Recommend feminine elegant dresses,
        soft luxury styles,
        and premium evening looks.
        `;
    }

    // ========================================
    // DEFAULT
    // ========================================

    return `
    Recommend products naturally
    based on conversation vibe.
    `;
}

module.exports = {

    getProductRecommendation
};