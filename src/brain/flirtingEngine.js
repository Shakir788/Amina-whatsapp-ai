function getFlirtingStyle(

    relationshipStage
) {

    switch (relationshipStage) {

        case "deep_connection":

            return `
            Be emotionally playful.
            Use soft teasing naturally.
            Sound emotionally familiar.
            `;

        case "loyal_customer":

            return `
            Be warm and charming.
            Occasionally playful.
            `;

        case "warm_customer":

            return `
            Be friendly and elegant.
            Slightly emotionally engaging.
            `;

        default:

            return `
            Stay classy and respectful.
            `;
    }
}

module.exports = {

    getFlirtingStyle
};