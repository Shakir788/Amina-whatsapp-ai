const {
    connectDB
} = require("../src/utils/chatLogger");

module.exports = async function handler(
    req,
    res
) {

    // =========================
    // CORS
    // =========================

    res.setHeader(
        "Access-Control-Allow-Credentials",
        true
    );

    res.setHeader(
        "Access-Control-Allow-Origin",
        "*"
    );

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,OPTIONS,POST"
    );

    res.setHeader(
        "Access-Control-Allow-Headers",
        "*"
    );

    // =========================
    // OPTIONS
    // =========================

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

        const db =
            await connectDB();

        const collection =
            db.collection("messages");

        const newMessage = {

            userId,

            message,

            sender: "admin",

            timestamp: new Date()
        };

        await collection.insertOne(
            newMessage
        );

        return res.status(200).json({

            success: true,

            data: newMessage
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false
        });
    }
};