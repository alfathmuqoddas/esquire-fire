import admin from "firebase-admin";
import { readFile } from "fs/promises";

// 1. Initialize Firebase Admin
// Replace the path below with your actual service account key file
const serviceAccount = JSON.parse(
  await readFile(new URL("./serviceAccountKey.json", import.meta.url)),
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function uploadData() {
  try {
    // 2. Read the generated properties.json file
    const rawData = await readFile(
      new URL("./properties.json", import.meta.url),
    );
    const dataToImport = JSON.parse(rawData);

    // 3. Initialize BulkWriter
    const bulkWriter = db.bulkWriter();

    // Error handling for individual document writes
    bulkWriter.onWriteError((error) => {
      console.error(
        `❌ Write failed for doc ${error.documentRef.path}: ${error.message}`,
      );
      return false; // Stop retrying after failure
    });

    bulkWriter.onWriteResult((documentRef, result) => {
      // Optional: log success for every doc if you want to see progress
      // console.log(`✅ Written: ${documentRef.id}`);
    });

    console.log(
      `🚀 Starting bulk upload of ${dataToImport.length} documents...`,
    );

    // 4. Loop through JSON and queue writes
    dataToImport.forEach((item) => {
      // Use the 'id' from your faker script as the Document ID
      // or use db.collection('properties').doc() to auto-generate
      const docRef = db.collection("properties").doc(item.id);

      // We remove the id from the object body if you don't want it inside the doc
      const { id, ...data } = item;

      const now = admin.firestore.Timestamp.now();

      bulkWriter.set(docRef, {
        ...data,
        createdAt: now,
        updatedAt: now,
      });
    });

    // 5. Close and flush
    // This is vital; the script won't finish until all buffered writes are sent
    await bulkWriter.close();

    console.log("🎉 All data successfully synced to Firestore!");
  } catch (err) {
    console.error("🔥 Critical Error:", err);
  }
}

uploadData();
