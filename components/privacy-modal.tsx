"use client"

import { useRef, useCallback } from "react"
import { Lock, FileText, ServerOff, EyeOff, X } from "lucide-react"

export function PrivacyModal() {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const open = useCallback(() => {
    dialogRef.current?.showModal()
  }, [])

  const close = useCallback(() => {
    dialogRef.current?.close()
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="hover:text-foreground transition-colors underline underline-offset-4 text-left"
      >
        Aviso de Privacidad
      </button>

      <dialog
        ref={dialogRef}
        onCancel={close}
        className="fixed inset-0 z-50 w-full max-w-3xl max-h-[90vh] m-auto p-0 rounded-xl border border-border bg-card text-card-foreground shadow-2xl open:flex open:flex-col"
        aria-labelledby="privacy-title"
        aria-modal="true"
      >
        <div className="flex flex-col max-h-[90vh] overflow-hidden">
          <header className="flex items-center justify-between gap-4 shrink-0 p-4 sm:p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center p-2.5 bg-muted rounded-lg">
                <Lock className="w-5 h-5 text-foreground" aria-hidden />
              </div>
              <h2 id="privacy-title" className="text-xl sm:text-2xl font-semibold tracking-tight">
                Aviso de Privacidad
              </h2>
            </div>
            <button
              type="button"
              onClick={close}
              className="shrink-0 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </header>

          <div className="overflow-y-auto p-4 sm:p-6 space-y-10">
            <p className="text-muted-foreground leading-relaxed">
              Nuestra premisa es muy simple: la principal forma de proteger tus datos es no recopilarlos en absoluto.
            </p>

            <section className="space-y-8">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <ServerOff className="w-5 h-5 text-muted-foreground shrink-0" aria-hidden />
                  <h3 className="text-lg font-medium">1. Cero recolección de datos</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed pl-8">
                  DescífraMX no cuenta con bases de datos para almacenar usuarios, códigos, ubicaciones ni fechas de nacimiento. La aplicación es puramente visual y lógica; todo el análisis de tu CURP o RFC se procesa exclusivamente mediante JavaScript dentro de tu dispositivo.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <EyeOff className="w-5 h-5 text-muted-foreground shrink-0" aria-hidden />
                  <h3 className="text-lg font-medium">2. Procesamiento local (Client-side)</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed pl-8">
                  Cuando escribes un carácter en la caja de texto central, el código que descifra la estructura de las claves gubernamentales se ejecuta directamente en el navegador de tu computadora o celular. Ni un solo bit de esa información viaja a internet o a servidores externos.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground shrink-0" aria-hidden />
                  <h3 className="text-lg font-medium">3. Sin afiliación gubernamental</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed pl-8">
                  Este proyecto es independiente, educativo y de código abierto. No existe conexión ni comunicación alguna con herramientas de SEGOB, RENAPO o el SAT. Nuestro propósito es únicamente didáctico: que comprendas cómo está ensamblada tu identidad digital en México.
                </p>
              </div>
            </section>

            <div className="pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                Última actualización: Marzo 2026.
                <br className="sm:hidden" />
                Válido en todo momento porque nunca cambiaremos este enfoque.
              </p>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}
