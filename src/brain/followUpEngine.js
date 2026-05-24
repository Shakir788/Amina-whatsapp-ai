function getFollowUpStrategy(

    intent
) {

    switch (intent) {

        case "shopping":

            return `
            Continue conversation naturally.
            Ask preference questions.
            Keep customer engaged.
            `;

        case "pricing":

            return `
            Mention value first.
            Then continue conversation.
            Avoid dead ending after price.
            `;

        case "emotional":

            return `
            Keep emotional support alive.
            Don't abruptly change topic.
            `;

        default:

            return `
            Keep conversation warm
            and emotionally alive.
            `;
    }
}

module.exports = {

    getFollowUpStrategy
};