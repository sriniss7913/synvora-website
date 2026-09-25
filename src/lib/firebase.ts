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

/**
 * Fetch all documents in a collection from Firestore via REST API
 */
export async function fetchFirestoreCollection<T>(collectionName: string): Promise<T[]> {
  if (!isFirebaseConfigured) return [];

  try {
    const url = `${FIRESTORE_BASE_URL}/${collectionName}?key=${FIREBASE_API_KEY}`;
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) return [];

    const json = await response.json();
    if (!json.documents || !Array.isArray(json.documents)) return [];

    return json.documents.map((docItem: any) => {
      const result: Record<string, any> = {};
      const fields = docItem.fields || {};

      for (const [key, valObj] of Object.entries<any>(fields)) {
        if ('stringValue' in valObj) {
          result[key] = valObj.stringValue;
        } else if ('doubleValue' in valObj) {
          result[key] = Number(valObj.doubleValue);
        } else if ('integerValue' in valObj) {
          result[key] = Number(valObj.integerValue);
        } else if ('booleanValue' in valObj) {
          result[key] = Boolean(valObj.booleanValue);
        }
      }

      // Ensure doc id is set if missing
      if (!result.id && docItem.name) {
        result.id = docItem.name.split('/').pop();
      }

      return result as T;
    });
  } catch (err) {
    console.error(`Firebase Firestore fetch error for ${collectionName}:`, err);
    return [];
  }
}
