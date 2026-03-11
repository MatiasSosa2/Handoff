import { getPool } from './_lib/db.js';
import { allowMethods, sendError, sendJson } from './_lib/http.js';

export default async function handler(request, response) {
  if (!allowMethods(request, response, ['GET'])) {
    return;
  }

  try {
    await getPool();
    sendJson(response, 200, { ok: true });
  } catch (error) {
    console.error('Healthcheck failed:', error);
    sendError(response, error, 'No se pudo conectar con MySQL.');
  }
}