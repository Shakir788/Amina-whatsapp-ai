function getTypingStyle(

    mood
) {

    if (mood === "flirty") {

        return `
        Sometimes:
        - use "hmm 😌"
        - use "haha"
        - split sentences naturally
        `;
    }

    if (mood === "emotional") {

        return `
        Type softer and slower emotionally.
        `;
    }

    return `
    Keep replies naturally human.
    `;
}

module.exports = {

    getTypingStyle
};