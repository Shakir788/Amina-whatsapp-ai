const {
    connectDB
} = require(
    "../src/utils/chatLogger"
);

const sendWhatsAppMessage =
require(
    "../src/services/whatsapp"
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
        "Access-Control-Allow-Origin",
        "*"
    );

    res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, OPTIONS"
    );

    res.setHeader(
        "Access-Control-Allow-Headers",
        "*"
    );

    // ========================================
    // OPTIONS
    // ========================================

    if (
        req.method === "OPTIONS"
    ) {

        return res
        .status(200)
        .end();
    }

    // ========================================
    // METHOD CHECK
    // ========================================

    if (
        req.method !== "POST"
    ) {

        return res
        .status(405)
        .json({

            success: false,

            error:
            "Method not allowed"
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

                success: false,

                error:
                "Missing fields"
            });
        }

        const cleanMessage =

        message.trim();

        if (
            cleanMessage.length === 0
        ) {

            return res
            .status(400)
            .json({

                success: false,

                error:
                "Empty message"
            });
        }

        console.log(
            `📤 Sending message to ${userId}`
        );

        // ========================================
        // DATABASE
        // ========================================

        const db =
        await connectDB();

        const collection =
        db.collection(
            "messages"
        );

        // ========================================
        // SAVE OWNER MESSAGE
        // ========================================

        await collection.insertOne({

            userId,

            message:
            cleanMessage,

            sender:
            "owner",

            type:
            "text",

            timestamp:
            new Date()
        });

        console.log(
            "💾 Owner message saved"
        );

        // ========================================
        // SEND WHATSAPP MESSAGE
        // ========================================

        await sendWhatsAppMessage(

            userId,

            cleanMessage
        );

        console.log(
            "✅ WhatsApp message sent"
        );

        // ========================================
        // SUCCESS
        // ========================================

        return res
        .status(200)
        .json({

            success: true
        });

    } catch (error) {

        console.log(
            "❌ SEND MESSAGE ERROR"
        );

        console.log(error);

        return res
        .status(500)
        .json({

            success: false,

            error:
            "Internal server error"
        });
    }
};