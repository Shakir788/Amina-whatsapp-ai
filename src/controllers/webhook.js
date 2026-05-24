const express = require('express');

const router = express.Router();

const {
    generateAIResponse
} = require('../services/ai');

const {
    analyzeFashionImage
} = require('../services/imageAI');

const sendWhatsAppMessage =
require('../services/whatsapp');

console.log(
    '✅ WEBHOOK FILE LOADED'
);

// ========================================
// WEBHOOK VERIFICATION
// ========================================

router.get('/', (req, res) => {

    const mode =
    req.query['hub.mode'];

    const token =
    req.query['hub.verify_token'];

    const challenge =
    req.query['hub.challenge'];

    if (mode && token) {

        if (

            mode === 'subscribe' &&

            token === process.env.VERIFY_TOKEN

        ) {

            console.log(
                '✅ Meta Webhook Verified'
            );

            return res
            .status(200)
            .send(challenge);

        } else {

            console.log(
                '❌ Verification Failed'
            );

            return res.sendStatus(403);
        }
    }

    return res.send(
        'Webhook running 😈'
    );
});

// ========================================
// RECEIVE WHATSAPP EVENTS
// ========================================

router.post('/', async (req, res) => {

    try {

        console.log(
            '🔥 WEBHOOK EVENT RECEIVED'
        );

        const body = req.body;

        // ========================================
        // SAFETY CHECK
        // ========================================

        if (
            !body.object ||
            !body.entry ||
            !body.entry[0]?.changes ||
            !body.entry[0]?.changes[0]?.value
        ) {

            console.log(
                '⚠️ Invalid webhook structure'
            );

            return res.sendStatus(200);
        }

        const value =

        body.entry[0]
        .changes[0]
        .value;

        // ========================================
        // IGNORE STATUS EVENTS
        // ========================================

        if (!value.messages) {

            console.log(
                '⚠️ Status update ignored'
            );

            return res.sendStatus(200);
        }

        const message =
        value.messages[0];

        if (!message) {

            return res.sendStatus(200);
        }

        const from =
        message.from;

        // ========================================
        // IGNORE OWN MESSAGES
        // ========================================

        const businessPhoneNumberId =

        value.metadata
        ?.phone_number_id;

        if (
            from ===
            businessPhoneNumberId
        ) {

            console.log(
                '⚠️ Ignoring own message'
            );

            return res.sendStatus(200);
        }

        console.log(
            `📩 Message from ${from}`
        );

        let aiReply = '';

        // ========================================
        // TEXT MESSAGE
        // ========================================

        if (
            message.type === 'text'
        ) {

            const userMessage =
            message.text?.body || '';

            console.log(
                `💬 TEXT: ${userMessage}`
            );

            aiReply =
            await generateAIResponse(

                userMessage,

                from
            );
        }

        // ========================================
        // IMAGE MESSAGE
        // ========================================

        else if (
            message.type === 'image'
        ) {

            console.log(
                '🖼️ IMAGE RECEIVED'
            );

            aiReply =

            "oh wow 😍 this look feels sooo elegant honestly ✨";
        }

        // ========================================
        // UNSUPPORTED
        // ========================================

        else {

            console.log(
                `⚠️ Unsupported type: ${message.type}`
            );

            return res.sendStatus(200);
        }

        // ========================================
        // EMPTY REPLY SAFETY
        // ========================================

        if (
            !aiReply ||
            aiReply.trim() === ''
        ) {

            aiReply =
            "hmm 😭✨ tell me more love";
        }

        console.log(
            `🤖 AI: ${aiReply}`
        );

        // ========================================
        // SEND REPLY
        // ========================================

        await sendWhatsAppMessage(

            from,

            aiReply
        );

        console.log(
            '✅ Reply Sent'
        );

        return res.sendStatus(200);

    } catch (error) {

        console.log(
            '❌ WEBHOOK ERROR'
        );

        console.log(error);

        return res.sendStatus(500);
    }
});

module.exports = router;