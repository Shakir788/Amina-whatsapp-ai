function detectEmotionalTriggers(

    message
) {

    const text =
    message.toLowerCase();

    const triggers = [];

    if (
        text.includes("sad")
    ) {

        triggers.push(
            "Customer felt sad"
        );
    }

    if (
        text.includes("lonely")
    ) {

        triggers.push(
            "Customer felt lonely"
        );
    }

    if (
        text.includes("happy")
    ) {

        triggers.push(
            "Customer felt happy"
        );
    }

    if (
        text.includes("love")
    ) {

        triggers.push(
            "Customer expressed emotional attachment"
        );
    }

    return triggers;
}

module.exports = {

    detectEmotionalTriggers
};