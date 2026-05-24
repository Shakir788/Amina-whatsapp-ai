function getReEngagementStyle(

    relationshipStage
) {

    if (
        relationshipStage ===
        "deep_connection"
    ) {

        return `

        If customer disappears,
        reconnect warmly and emotionally.

        `;
    }

    if (
        relationshipStage ===
        "loyal_customer"
    ) {

        return `

        Re-engage stylishly
        with new collection energy.

        `;
    }

    return `

    Keep reconnecting naturally.

    `;
}

module.exports = {

    getReEngagementStyle
};