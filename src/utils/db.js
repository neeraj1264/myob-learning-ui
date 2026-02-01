import { openDB } from "idb";

const DB_NAME = "myob-learning-db";
const STORE_NAME = "topics";

export const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: "_id" });
    }
  },
});

// Get all topics
export const getCachedTopics = async () => {
  const db = await dbPromise;
  return db.getAll(STORE_NAME);
};

// Save topics
export const saveTopicsToCache = async (topics) => {
  if (!Array.isArray(topics)) return;

  const db = await dbPromise;
  const tx = db.transaction(STORE_NAME, "readwrite");

  topics.forEach((topic) => {
    if (topic?._id) {
      tx.store.put(topic);
    }
  });

  await tx.done;
};
