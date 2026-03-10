"use client"

import { Info, CheckCircle, XCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const sampleWords = [
  "BACA", "BAKA", "BUEI", "BUEY", "CACA", "CACO", "CAGA", "CAGO", "CAKA", "CAKO",
  "COGE", "COGI", "COJA", "COJE", "COJI", "COJO", "COLA", "CULO", "FALO", "FETO"
]

export function InfoSection() {
  return (
    <section className="mt-16 w-full max-w-2xl mx-auto animate-fade-in delay-500 pt-8 border-t border-border">
      <h2 className="text-xl font-medium flex items-center gap-2 mb-8">
        <Info className="h-5 w-5 text-muted-foreground" />
        Preguntas Frecuentes
      </h2>
      <Accordion type="single" collapsible className="w-full space-y-1">
        <AccordionItem value="item-1" className="bg-transparent border-b border-border">
          <AccordionTrigger className="text-left font-medium text-base hover:no-underline hover:text-muted-foreground transition-colors focus-visible:ring-2 focus-visible:ring-ring py-4">
            ¿Cómo funciona?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-6 pt-2">
            <p className="mb-6">
              Esta herramienta analiza la estructura estándar de una CURP (18 caracteres) o 
              un RFC (13 caracteres para personas físicas). Separa cada componente 
              (letras del nombre, fecha de nacimiento, sexo, estado, etc.) y explica 
              qué significa cada uno según las reglas oficiales de SEGOB y el SAT.
            </p>

            <div className="overflow-hidden rounded-md border border-border">
              <table className="w-full text-left text-sm bg-background">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="p-3 font-medium text-foreground w-1/2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-500" /> 
                        <span>Lo que SÍ hace DescífraMX</span>
                      </div>
                    </th>
                    <th className="p-3 font-medium text-foreground w-1/2 border-l border-border">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-600 dark:text-red-500" /> 
                        <span>Lo que NO hace DescífraMX</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="p-3">Valida que la estructura sea correcta</td>
                    <td className="p-3 border-l border-border">Confirmar que existe en RENAPO</td>
                  </tr>
                  <tr>
                    <td className="p-3">Explica cada segmento visualmente</td>
                    <td className="p-3 border-l border-border">Consultar bases de datos del SAT</td>
                  </tr>
                  <tr>
                    <td className="p-3">Detecta errores de formato</td>
                    <td className="p-3 border-l border-border">Verificar si está activo o cancelado</td>
                  </tr>
                  <tr>
                    <td className="p-3">Decodifica información embebida en el documento</td>
                    <td className="p-3 border-l border-border">Acceder a datos reales del titular</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2" className="bg-transparent border-b border-border">
          <AccordionTrigger className="text-left font-medium text-base hover:no-underline hover:text-muted-foreground transition-colors focus-visible:ring-2 focus-visible:ring-ring py-4">
            ¿Por qué mi CURP/RFC tiene letras extrañas al final?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-6 pt-2">
            <p>
              Los últimos caracteres suelen ser la <strong>homoclave</strong> (asignada por el SAT
              para evitar duplicados) y un <strong>dígito verificador</strong> (un número o letra 
              calculado matemáticamente para comprobar que todo el código es correcto).
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="bg-transparent border-b border-border">
          <AccordionTrigger className="text-left font-medium text-base hover:no-underline hover:text-muted-foreground transition-colors focus-visible:ring-2 focus-visible:ring-ring py-4">
            Privacidad y Seguridad
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground text-sm leading-relaxed space-y-4 pb-6 pt-2">
            <p>
              <strong>Tus datos están seguros.</strong> Todo el procesamiento y descodificación 
              se realiza localmente en tu navegador mediante JavaScript. 
            </p>
            <div className="border-l-2 border-muted-foreground pl-4 py-1">
              <p className="text-sm">
                Esta página <strong>nunca</strong> envía tu CURP, RFC o información personal 
                a ningún servidor. Funciona incluso si te desconectas de internet.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-4" className="bg-transparent border-b border-border">
          <AccordionTrigger className="text-left font-medium text-base hover:no-underline hover:text-muted-foreground transition-colors focus-visible:ring-2 focus-visible:ring-ring py-4">
            Palabras inconvenientes
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-6 pt-2">
            <div className="mb-6 rounded-md border-l-4 border-amber-500 bg-amber-500/10 p-4">
              <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                😅 El SAT sustituye automáticamente combinaciones de letras que pueden formar palabras ofensivas. No somos nosotros, es el gobierno.
              </p>
            </div>

            <p className="mb-4">
              Para evitar palabras altisonantes que puedan formarse con las primeras cuatro letras 
              (las iniciales del nombre), el sistema las sustituye por una &quot;X&quot;. Algunas de estas palabras son:
            </p>
            <div className="flex flex-wrap gap-2">
              {sampleWords.map((word) => (
                <span key={word} className="px-1.5 py-0.5 text-xs font-mono font-medium text-foreground border border-border">
                  {word}
                </span>
              ))}
              <span className="px-1.5 py-0.5 text-xs font-mono font-medium text-muted-foreground">
                entre otras...
              </span>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="bg-transparent border-b-0 border-border">
          <AccordionTrigger className="text-left font-medium text-base hover:no-underline hover:text-muted-foreground transition-colors focus-visible:ring-2 focus-visible:ring-ring py-4">
            ¿Cuál es la diferencia entre CURP y RFC?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-6 pt-2">
            <p className="mb-3">
              Aunque comparten la misma estructura para las letras del nombre y la fecha de nacimiento (los primeros 10 caracteres):
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                El <strong>CURP</strong> (Clave Única de Registro de Población) tiene 18 caracteres. 
                Sirve para identificarte como ciudadano residente en México e incluye información sobre 
                tu sexo y el estado donde naciste.
              </li>
              <li>
                El <strong>RFC</strong> (Registro Federal de Contribuyentes) de personas físicas tiene 13 caracteres. 
                Se usa exclusivamente para fines fiscales y tributarios ante el SAT.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}
