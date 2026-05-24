function getUrgencyLine(

    intent
) {

    if (intent === "shopping") {

        return `
        This product is getting
        strong attention lately.
        `;
    }

    if (intent === "pricing") {

        return `
        Stock is moving quickly
        for this collection.
        `;
    }

    return `
    Keep urgency subtle and elegant.
    `;
}

module.exports = {

    getUrgencyLine
};