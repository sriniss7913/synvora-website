// Native Firebase Firestore REST API Client

export const FIREBASE_PROJECT_ID =
  process.env.FIREBASE_PROJECT_ID ||
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
  '';

export const FIREBASE_API_KEY =
  process.env.FIREBASE_API_KEY ||
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
  '';

export const isFirebaseConfigured = Boolean(FIREBASE_PROJECT_ID && FIREBASE_API_KEY);

const FIRESTORE_BASE_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents`;

/**
 * Save / Update a document in Firestore via REST API
 */
export async function saveFirestoreDoc(
  collectionName: string,
  docId: string,
  data: Record<string, any>
): Promise<boolean> {
  if (!isFirebaseConfigured) return false;

  try {
    const fields: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'number') {
        fields[key] = { doubleValue: value };
      } else if (typeof value === 'boolean') {
        fields[key] = { booleanValue: value };
      } else {
        fields[key] = { stringValue: String(value ?? '') };
      }
    }

    const url = `${FIRESTORE_BASE_URL}/${collectionName}/${docId}?key=${FIREBASE_API_KEY}`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields }),
    });

    return response.ok;
  } catch (err) {
    console.error(`Firebase Firestore REST sync error for ${collectionName}/${docId}:`, err);
    return false;
  }
}
