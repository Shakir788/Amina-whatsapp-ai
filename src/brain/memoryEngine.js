function extractImportantMemory(

    message
) {

    const text =
    message.toLowerCase();

    const memories = [];

    // ========================================
    // FAVORITE COLORS
    // ========================================

    if (
        text.includes("black")
    ) {

        memories.push(
            "Customer likes black color"
        );
    }

    if (
        text.includes("white")
    ) {

        memories.push(
            "Customer likes white color"
        );
    }

    // ========================================
    // PRODUCTS
    // ========================================

    if (
        text.includes("hoodie")
    ) {

        memories.push(
            "Customer interested in hoodies"
        );
    }

    if (
        text.includes("abaya")
    ) {

        memories.push(
            "Customer interested in abayas"
        );
    }

    // ========================================
    // EMOTIONAL
    // ========================================

    if (
        text.includes("sad") ||
        text.includes("lonely")
    ) {

        memories.push(
            "Customer was emotionally vulnerable"
        );
    }

    // ========================================
    // BUDGET
    // ========================================

    if (
        text.includes("cheap") ||
        text.includes("budget")
    ) {

        memories.push(
            "Customer is price sensitive"
        );
    }

    return memories;
}

module.exports = {

    extractImportantMemory
};