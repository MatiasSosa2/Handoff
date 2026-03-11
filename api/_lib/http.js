export const sendJson = (response, statusCode, payload) => {
  response.status(statusCode).json(payload);
};

export const sendError = (response, error, fallbackMessage) => {
  const statusCode = typeof error?.statusCode === 'number' ? error.statusCode : 500;
  const message = error instanceof Error ? error.message : fallbackMessage;
  response.status(statusCode).json({ error: message || fallbackMessage });
};

export const allowMethods = (request, response, methods) => {
  if (!methods.includes(request.method)) {
    response.setHeader('Allow', methods);
    response.status(405).json({ error: 'Método no permitido.' });
    return false;
  }

  return true;
};