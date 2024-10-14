service cloud.firestore {
    match /databases/{database}/documents {
        match /stocks/{document=**} {
            allow read, write: if request.auth != null; // Ensure only authenticated users can read/write
        }
    }
}
