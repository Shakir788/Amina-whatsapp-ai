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

    // =========================
    // CORS FIX
    // =========================

    res.setHeader(
        'Access-Control-Allow-Origin',
        '*'
    );

    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET,OPTIONS'
    );

    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type'
    );

    if (req.method === 'OPTIONS') {

        return res.status(200).end();
    }

    try {

        const db =
            await connectDB();

        const collection =
            db.collection(
                'messages'
            );

        const messages =
            await collection

                .find({})

                .sort({
                    timestamp: 1
                })

                .toArray();

        return res.status(200).json({

            success: true,

            messages
        });

    } catch (error) {

        console.log(
            '❌ FETCH MESSAGES ERROR'
        );

        console.log(error);

        return res.status(500).json({

            success: false
        });
    }
};