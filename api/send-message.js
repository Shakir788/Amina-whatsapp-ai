const {
    connectDB
} = require("../src/utils/chatLogger");

const generateAIResponse =
    require("../src/services/ai");

const sendWhatsAppMessage =
    require("../src/services/whatsapp");

module.exports = async function handler(
    req,
    res
) {

    // =========================
    // CORS
    // =========================

    res.setHeader(
        "Access-Control-Allow-Origin",
        "*"
    );

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS"
    );

    res.setHeader(
        "Access-Control-Allow-Headers",
        "*"
    );

    if (req.method === "OPTIONS") {

        return res.status(200).end();
    }

    // =========================
    // ONLY POST
    // =========================

    if (req.method !== "POST") {

        return res.status(405).json({

            success: false
        });
    }

    try {

        const {

            userId,

            message

        } = req.body;

        // =========================
        // DB
        // =========================

        const db =
            await connectDB();

        const collection =
            db.collection("messages");

        // =========================
        // SAVE ADMIN MESSAGE
        // =========================

        const adminMessage = {

            userId,

            message,

            sender: "admin",

            timestamp: new Date()
        };

        await collection.insertOne(
            adminMessage
        );

        // =========================
        // SEND TO WHATSAPP
        // =========================

        await sendWhatsAppMessage(

            userId,

            message
        );

        // =========================
        // GENERATE AI REPLY
        // =========================

        const aiReply =
            await generateAIResponse(
                message
            );

        // =========================
        // SAVE AI REPLY
        // =========================

        const aiMessage = {

            userId,

            message: aiReply,

            sender: "ai",

            timestamp: new Date()
        };

        await collection.insertOne(
            aiMessage
        );

        // =========================
        // SEND AI MESSAGE
        // =========================

        await sendWhatsAppMessage(

            userId,

            aiReply
        );

        return res.status(200).json({

            success: true
        });

    } catch (error) {

        console.log(
            "❌ SEND MESSAGE ERROR"
        );

        console.log(error);

        return res.status(500).json({

            success: false
        });
    }
};