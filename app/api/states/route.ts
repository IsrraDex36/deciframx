import { NextRequest } from 'next/server';
import { checkRateLimit, cleanupRateLimitMap, getClientIp } from '@/lib/api/rate-limit';
import { apiResponse, apiErrorResponse } from '@/lib/api/response';
import { ESTADOS } from '@/lib/curp-rfc-decoder';

export async function GET(request: NextRequest) {
  // Simple periodic cleanup of expired rate limits
  if (Math.random() < 0.1) cleanupRateLimitMap();

  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(ip);

  if (!rateLimit.success) {
    return apiErrorResponse(
      [{ code: 'RATE_LIMIT_EXCEEDED', message: 'Se han excedido las 100 peticiones por hora.' }],
      429,
      undefined,
      rateLimit.headers
    );
  }

  const statesArray = Object.entries(ESTADOS).map(([codigo, nombre]) => ({
    codigo,
    nombre,
  }));

  return apiResponse(
    { states: statesArray },
    200,
    rateLimit.headers
  );
}

// Support preflight OPTIONS for CORS
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    },
  });
}
