function detectMood(message) {

    const text =
    message.toLowerCase();

    // SAD

    if (
        text.includes("sad") ||
        text.includes("lonely") ||
        text.includes("cry") ||
        text.includes("hurt") ||
        text.includes("depressed")
    ) {

        return "sad";
    }

    // HAPPY

    if (
        text.includes("happy") ||
        text.includes("excited") ||
        text.includes("love it") ||
        text.includes("amazing")
    ) {

        return "happy";
    }

    // ANGRY

    if (
        text.includes("bad") ||
        text.includes("angry") ||
        text.includes("worst") ||
        text.includes("hate")
    ) {

        return "angry";
    }

    // SHOPPING

    if (
        text.includes("price") ||
        text.includes("hoodie") ||
        text.includes("dress") ||
        text.includes("buy")
    ) {

        return "shopping";
    }

    return "normal";
}

module.exports = {

    detectMood
};