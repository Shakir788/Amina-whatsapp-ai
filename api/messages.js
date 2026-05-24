const {
    connectDB
} = require(
    '../src/utils/chatLogger'
);

module.exports =
async function handler(
    req,
    res
) {

    // ========================================
    // CORS
    // ========================================

    res.setHeader(
        'Access-Control-Allow-Origin',
        '*'
    );

    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, OPTIONS'
    );

    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type'
    );

    // ========================================
    // OPTIONS
    // ========================================

    if (
        req.method === 'OPTIONS'
    ) {

        return res
        .status(200)
        .end();
    }

    // ========================================
    // METHOD CHECK
    // ========================================

    if (
        req.method !== 'GET'
    ) {

        return res
        .status(405)
        .json({

            success: false,

            error:
            'Method not allowed'
        });
    }

    try {

        console.log(
            '📥 Fetching messages'
        );

        const db =
        await connectDB();

        const collection =
        db.collection(
            'messages'
        );

        // ========================================
        // FETCH MESSAGES
        // ========================================

        const messages =

        await collection

        .find({})

        .sort({

            timestamp: 1
        })

        .limit(1000)

        .toArray();

        // ========================================
        // SAFE CLEAN
        // ========================================

        const cleanedMessages =

        messages.map((msg) => ({

            ...msg,

            timestamp:

                msg.timestamp ||

                new Date()
        }));

        console.log(
            `✅ ${cleanedMessages.length} messages loaded`
        );

        // ========================================
        // RESPONSE
        // ========================================

        return res
        .status(200)
        .json({

            success: true,

            count:
            cleanedMessages.length,

            messages:
            cleanedMessages
        });

    } catch (error) {

        console.log(
            '❌ FETCH MESSAGES ERROR'
        );

        console.log(error);

        return res
        .status(500)
        .json({

            success: false,

            error:
            'Failed to fetch messages'
        });
    }
};