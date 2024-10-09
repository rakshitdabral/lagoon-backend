import { Webhook } from 'svix';
import express from 'express';
import dotenv from 'dotenv'; 
import { createUser, updateUser, deleteUser } from '../controllers/user.controller.js'; 

dotenv.config();
const router = express.Router();
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

router.post('/api/webhooks', async (req, res) => {
    console.log('Received webhook:', req.body); 
    const svixId = req.headers['svix-id'];
    const svixTimestamp = req.headers['svix-timestamp'];
    const svixSignature = req.headers['svix-signature'];

    if (!svixId || !svixTimestamp || !svixSignature) {
        return res.status(400).json({ message: 'Invalid headers' });
    }

    const body = JSON.stringify(req.body);
    const wh = new Webhook(WEBHOOK_SECRET);

    try {
        const evt = wh.verify(body, { 'svix-id': svixId, 'svix-timestamp': svixTimestamp, 'svix-signature': svixSignature });

        switch (evt.type) {
            case 'user.created':
                const { email_addresses, username, id: userId } = evt.data; 
                const email = email_addresses[0]?.email_address; 
                const password = 'defaultPassword123'; 

                const newUser = {
                    username: username, 
                    email,
                    userId, 
                };

                await createUser({ body: newUser }, res);
                break;

            case 'user.updated':
                const userUpdateData = {
                    username: evt.data.username, 
                    email: evt.data.email_addresses[0]?.email_address,
                    userId: evt.data.id 
                };

                await updateUser({ params: { id: evt.data.id }, body: userUpdateData }, res);
                break;

            case 'user.deleted':
                await deleteUser({ params: { id: evt.data.id } }, res);
                break;

            default:
                console.log(`Unhandled event type: ${evt.type}`);
                return res.status(400).json({ message: 'Unhandled event type' });
        }

        return res.status(200).send();
    } catch (error) {
        console.error('Error verifying webhook:', error);
        return res.status(400).json({ message: 'Webhook verification failed' });
    }
});

export default router;
