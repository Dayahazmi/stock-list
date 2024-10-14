import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../src/app/firebase/config'; // Ensure this path is correct
import admin from 'firebase-admin';

// Initialize Firebase Admin SDK if it hasn't been initialized
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(), // Ensure this is set up correctly
    });
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { token, stockData } = req.body;

        console.log('token:', token);

        try {
            // Verify token using Firebase Admin SDK
            const user = await admin.auth().verifyIdToken(token);
            console.log(user);
            const userId = user.uid;
            console.log(userId);

            // Add stock data to Firestore
            const docRef = await addDoc(collection(db, 'stocks'), {
                userId: userId,
                itemName: stockData.itemName,
                quantity: stockData.quantity,
                createdAt: new Date(),
            });

            res.status(200).json({ message: 'Stock added successfully', id: docRef.id });
        } catch (error) {
            console.error("Token verification error:", error);
            res.status(401).json({ error: 'Unauthorized' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
