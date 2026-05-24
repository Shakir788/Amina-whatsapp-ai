function getSalesStrategy(intent) {

    switch (intent) {

        case "pricing":

            return `
            Create desire BEFORE price.
            Make product feel premium.
            Add soft urgency naturally.
            `;

        case "shopping":

            return `
            Sound stylish and luxurious.
            Recommend products elegantly.
            Keep customer emotionally interested.
            `;

        case "emotional":

            return `
            Avoid aggressive selling.
            Build emotional trust first.
            `;

        default:

            return `
            Keep conversation engaging
            and naturally attractive.
            `;
    }
}

module.exports = {

    getSalesStrategy
};