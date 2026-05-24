function getRelationshipStage(

    messages = []
) {

    const count =
    messages.length;

    if (count > 60) {

        return "deep_connection";
    }

    if (count > 30) {

        return "loyal_customer";
    }

    if (count > 15) {

        return "warm_customer";
    }

    return "new_customer";
}

module.exports = {

    getRelationshipStage
};