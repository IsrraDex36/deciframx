import { NextResponse } from 'next/server';

const API_VERSION = '1.0';

const STANDARD_HEADERS = {
  'Content-Type': 'application/json',
  'X-API-Version': API_VERSION,
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/**
 * Helper to build a standardized Next.js JSON response
 * @param body The JSON body payload
 * @param status The HTTP status code
 * @param extraHeaders Additional headers (like Rate Limit headers)
 * @returns NextResponse
 */
export function apiResponse(body: any, status = 200, extraHeaders: HeadersInit = {}) {
  return NextResponse.json(body, {
    status,
    headers: {
      ...STANDARD_HEADERS,
      ...extraHeaders,
    },
  });
}

/**
 * Helper to build an error response in the required format
 * @param errors Array of error objects [{ code, message, field }]
 * @param status HTTP Status
 * @param curpOrRfc The input string (for context in response)
 * @param extraHeaders Additional headers
 * @returns NextResponse
 */
export function apiErrorResponse(
  errors: Array<{ code: string; message: string; field?: string }>,
  status = 400,
  curpOrRfc?: string,
  extraHeaders: HeadersInit = {}
) {
  const body: any = { valid: false, errors };
  
  if (curpOrRfc !== undefined) {
    // Try to guess if it's CURP or RFC based on length, or just add both for context
    if (curpOrRfc.length > 13) {
      body.curp = curpOrRfc;
    } else {
      body.rfc = curpOrRfc;
    }
  }

  return apiResponse(body, status, extraHeaders);
}

/**
 * Sanitizes an input string by trimming spaces and converting to uppercase.
 * @param input The raw input string
 * @returns Sanitized string or undefined if input is not a string
 */
export function sanitizeInput(input: any): string | undefined {
  if (typeof input !== 'string') return undefined;
  return input.trim().toUpperCase().replace(/\s+/g, '');
}
