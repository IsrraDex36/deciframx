import { NextResponse } from 'next/server';

export async function GET() {
  const openApiDocs = {
    openapi: "3.0.0",
    info: {
      title: "AhíTaClave API",
      description: "API REST pública para validar y decodificar CURP y RFC mexicanos localmente.",
      version: "1.0.0"
    },
    servers: [
      {
        url: "https://desciframx.com",
        description: "Servidor de Producción"
      },
      {
        url: "http://localhost:3000",
        description: "Servidor de Desarrollo Local"
      }
    ],
    paths: {
      "/api/validate/curp": {
        post: {
          summary: "Valida y decodifica un CURP",
          description: "Recibe un CURP en formato JSON, verifica su estructura, longitud y calcula matemáticamente que el dígito verificador coincida.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    curp: {
                      type: "string",
                      example: "HEGJ850101HMNRLN09"
                    }
                  },
                  required: ["curp"]
                }
              }
            }
          },
          responses: {
            "200": {
              description: "Respuesta exitosa de validación"
            },
            "400": {
              description: "Error de validación (estructura, longitud)"
            },
            "429": {
              description: "Rate Limit excedido"
            }
          }
        }
      },
      "/api/validate/curp/{curp}": {
        get: {
          summary: "Valida un CURP desde la URL",
          description: "Mismo comportamiento que el POST pero permitiendo el pase de datos directos por la URL",
          parameters: [
            {
              name: "curp",
              in: "path",
              required: true,
              schema: {
                type: "string",
                example: "HEGJ850101HMNRLN09"
              }
            }
          ],
          responses: {
            "200": { description: "Respuesta exitosa de validación" },
            "400": { description: "Error de validación" }
          }
        }
      },
      "/api/validate/rfc": {
        post: {
          summary: "Valida y decodifica un RFC",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    rfc: {
                      type: "string",
                      example: "HEGJ850101ABC"
                    }
                  },
                  required: ["rfc"]
                }
              }
            }
          },
          responses: {
            "200": { description: "Respuesta exitosa" }
          }
        }
      },
      "/api/states": {
        get: {
          summary: "Catálogo de estados del CURP",
          responses: {
            "200": { description: "Catálogo devuelto exitosamente" }
          }
        }
      }
    }
  };

  return NextResponse.json(openApiDocs, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
