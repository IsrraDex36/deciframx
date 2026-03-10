import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from '@/app/api/validate/curp/route';
import { GET } from '@/app/api/validate/curp/[curp]/route';

// Mock de IP para simular request
const createMockRequest = (body: any, headers: Record<string, string> = {}) => {
  return new NextRequest('http://localhost:3000/api/validate/curp', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...headers
    },
    body: JSON.stringify(body)
  });
};

const createMockGetRequest = (url: string) => {
  return new NextRequest(url, { method: 'GET' });
};

describe('API: /api/validate/curp (POST)', () => {
  it('Debe devolver error si no se envía body o content-type erróneo', async () => {
    const req = new NextRequest('http://localhost:3000/api/validate/curp', {
      method: 'POST'
    });
    
    const res = await POST(req);
    expect(res.status).toBe(415); // Unsupported Media Type expected manually via handler
    const json = await res.json();
    expect(json.valid).toBe(false);
  });

  it('Debe fallar con INVALID_LENGTH si el CURP tiene más de 18 caracteres', async () => {
    const req = createMockRequest({ curp: 'HEGJ850101HMNRLN09123' });
    const res = await POST(req);
    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.valid).toBe(false);
    expect(json.errors[0].code).toBe('INVALID_LENGTH');
  });

  // CURP con estado DF (válido en catálogo) y dígito verificador correcto
  const CURP_VALIDO = 'HEGJ850101HDFRLN08';

  it('Debe pasar como válido con un CURP real y correcto', async () => {
    const req = createMockRequest({ curp: CURP_VALIDO });
    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.valid).toBe(true);
    expect(json.curp).toBe(CURP_VALIDO);
    expect(json.verificador.esValido).toBeDefined();
    expect(json.data.nombre).toBeDefined();
    expect(json.data.estadoNacimiento).toBeDefined();
  });

  it('Debe limpiar espacios y minúsculas', async () => {
    const req = createMockRequest({ curp: `  ${CURP_VALIDO.toLowerCase()}  ` });
    const res = await POST(req);
    const json = await res.json();

    expect(json.valid).toBe(true);
    expect(json.curp).toBe(CURP_VALIDO);
  });
});

describe('API: /api/validate/curp/[curp] (GET)', () => {
  const CURP_VALIDO = 'HEGJ850101HDFRLN08';

  it('Debe validar correctamente a través de la URL GET', async () => {
    const req = createMockGetRequest(`http://localhost:3000/api/validate/curp/${CURP_VALIDO}`);

    const res = await GET(req, { params: Promise.resolve({ curp: CURP_VALIDO }) });
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.valid).toBe(true);
    expect(json.curp).toBe(CURP_VALIDO);
  });
});
