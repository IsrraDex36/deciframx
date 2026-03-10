import { Lock, FileText, ServerOff, EyeOff } from "lucide-react"

export const metadata = {
  title: "Privacidad | DescífraMX",
  description: "Aviso de privacidad de DescífraMX. Tu información nunca sale de tu navegador.",
}

export default function Privacidad() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <main className="max-w-3xl mx-auto px-4 py-16 sm:py-24 animate-fade-in">
        <a 
          href="/" 
          className="inline-block mb-10 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          &larr; Volver al inicio
        </a>

        <header className="mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-muted rounded-xl mb-6">
            <Lock className="w-6 h-6 text-foreground" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
            Aviso de Privacidad
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Nuestra premisa es muy simple: la principal forma de proteger tus datos es no recopilarlos en absoluto.
          </p>
        </header>

        <section className="space-y-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <ServerOff className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-xl font-medium">1. Cero recolección de datos</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed pl-8">
              DescífraMX no cuenta con bases de datos para almacenar usuarios, códigos, ubicaciones ni fechas de nacimiento. La aplicación es puramente visual y lógica; todo el análisis de tu CURP o RFC se procesa exclusivamente mediante JavaScript dentro de tu dispositivo.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <EyeOff className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-xl font-medium">2. Procesamiento local (Client-side)</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed pl-8">
              Cuando escribes un carácter en la caja de texto central, el código que descifra la estructura de las claves gubernamentales se ejecuta directamente en el navegador de tu computadora o celular. Ni un solo bit de esa información viaja a internet o a servidores externos.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-xl font-medium">3. Sin afiliación gubernamental</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed pl-8">
              Este proyecto es independiente, educativo y de código abierto. No existe conexión ni comunicación alguna con herramientas de SEGOB, RENAPO o el SAT. Nuestro propósito es únicamente didáctico: que comprendas cómo está ensamblada tu identidad digital en México.
            </p>
          </div>
        </section>

        <div className="mt-20 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            Última actualización: Marzo 2026. <br className="sm:hidden" />
            Válido en todo momento porque nunca cambiaremos este enfoque.
          </p>
        </div>
      </main>
    </div>
  )
}
