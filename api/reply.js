const sendWhatsAppMessage =

require(
    '../src/services/whatsapp'
);

const {
    saveChatMessage
} = require(
    '../src/utils/chatLogger'
);

const {
    enableHumanMode
} = require(
    '../src/services/takeover'
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
        'POST, OPTIONS'
    );

    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type'
    );

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
        req.method !== 'POST'
    ) {

        return res
        .status(405)
        .json({

            error:
            'Method not allowed'
        });
    }

    try {

        const {

            userId,

            message

        } = req.body;

        // ========================================
        // VALIDATION
        // ========================================

        if (
            !userId ||
            !message
        ) {

            return res
            .status(400)
            .json({

                error:
                'Missing userId or message'
            });
        }

        // ========================================
        // CLEAN MESSAGE
        // ========================================

        const cleanMessage =

        message.trim();

        if (
            cleanMessage.length === 0
        ) {

            return res
            .status(400)
            .json({

                error:
                'Empty message'
            });
        }

        console.log(
            `📤 OWNER REPLY → ${userId}`
        );

        // ========================================
        // ENABLE HUMAN MODE
        // ========================================

        enableHumanMode(userId);

        console.log(
            '🧠 Human mode enabled'
        );

        // ========================================
        // SEND TO WHATSAPP
        // ========================================

        await sendWhatsAppMessage(

            userId,

            cleanMessage
        );

        console.log(
            '✅ WhatsApp message sent'
        );

        // ========================================
        // SAVE TO DATABASE
        // ========================================

        await saveChatMessage({

            userId,

            sender: 'owner',

            message: cleanMessage,

            type: 'text',

            timestamp:
            new Date()
        });

        console.log(
            '💾 Owner message saved'
        );

        // ========================================
        // SUCCESS
        // ========================================

        return res
        .status(200)
        .json({

            success: true,

            message:
            'Reply sent successfully 😈'
        });

    } catch (error) {

        console.error(
            '❌ SEND REPLY ERROR'
        );

        console.error(error);

        return res
        .status(500)
        .json({

            success: false,

            error:
            'Failed to send reply'
        });
    }
};