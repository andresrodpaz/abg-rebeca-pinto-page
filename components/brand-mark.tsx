import Image from 'next/image'
import { site } from '@/lib/site'

type Size = 'sm' | 'md'

/**
 * Monograma + firma tipográfica del despacho.
 * El logotipo es granate sobre blanco, por lo que sobre los fondos oscuros
 * se presenta dentro de una placa crema.
 */
export default function BrandMark({
  size = 'md',
  className = '',
}: {
  size?: Size
  className?: string
}) {
  const plate = size === 'sm' ? 'h-8 w-8 p-1' : 'h-11 w-11 p-1.5'
  const nameSize = size === 'sm' ? 'text-sm' : 'text-base md:text-lg'

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <span
        className={`${plate} shrink-0 rounded-full bg-cream flex items-center justify-center shadow-sm ring-1 ring-gold/40`}
      >
        <Image
          src="/logo.png"
          alt=""
          width={88}
          height={38}
          className="w-full h-auto object-contain"
          priority
        />
      </span>
      <span className="leading-tight">
        <span
          className={`block font-serif ${nameSize} font-semibold uppercase text-cream tracking-[0.14em]`}
        >
          Rebeca Pinto
        </span>
        <span className="block font-sans text-[10px] text-gold/85 uppercase tracking-[0.22em]">
          {site.role} · Extranjería
        </span>
      </span>
    </span>
  )
}
