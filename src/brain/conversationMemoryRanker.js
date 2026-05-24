function rankMemoryImportance(

    memory
) {

    const text =
    memory.toLowerCase();

    // HIGH IMPORTANCE

    if (
        text.includes("favorite") ||
        text.includes("love") ||
        text.includes("emotion") ||
        text.includes("important")
    ) {

        return 10;
    }

    // MEDIUM

    if (
        text.includes("hoodie") ||
        text.includes("abaya")
    ) {

        return 7;
    }

    // LOW

    return 3;
}

module.exports = {

    rankMemoryImportance
};