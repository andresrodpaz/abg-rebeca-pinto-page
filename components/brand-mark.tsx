import Image from 'next/image'
import { site } from '@/lib/site'

type Size = 'sm' | 'md'

/**
 * Monograma + firma tipográfica del despacho.
 * El logotipo es granate sobre blanco y apaisado (500×221), por lo que sobre
 * los fondos oscuros se presenta en una placa crema con su misma proporción.
 */
export default function BrandMark({
  size = 'md',
  className = '',
}: {
  size?: Size
  className?: string
}) {
  const plate = size === 'sm' ? 'h-8 px-1.5' : 'h-10 px-2'
  const mark = size === 'sm' ? 'w-12' : 'w-16'
  const nameSize = size === 'sm' ? 'text-xs' : 'text-sm md:text-base'

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <span
        className={`${plate} shrink-0 flex items-center rounded-sm bg-cream shadow-sm ring-1 ring-gold/40`}
      >
        <Image
          src="/logo.png"
          alt=""
          width={500}
          height={221}
          className={`${mark} h-auto object-contain`}
          priority
        />
      </span>

      <span className="w-px self-stretch bg-gold/40" aria-hidden="true" />

      <span className="leading-tight">
        <span
          className={`block font-serif ${nameSize} font-semibold uppercase text-cream tracking-[0.13em] whitespace-nowrap`}
        >
          Rebeca Pinto
        </span>
        <span className="block font-sans text-[9px] md:text-[10px] text-gold/85 uppercase tracking-[0.2em] whitespace-nowrap">
          {site.role} · Extranjería
        </span>
      </span>
    </span>
  )
}
