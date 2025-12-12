import Link from 'next/link'
import Image from 'next/image'

export default function Logo({ className = "", size = "default" }: { className?: string; size?: "default" | "small" | "large" }) {
  const sizeClasses = {
    default: { width: 120, height: 60 },
    small: { width: 80, height: 40 },
    large: { width: 180, height: 90 }
  }
  
  const currentSize = sizeClasses[size]
  
  return (
    <Link href="/" className={`flex items-center group ${className}`}>
      <Image
        src="/logo.png"
        alt="C mart Logo"
        width={currentSize.width}
        height={currentSize.height}
        className="object-contain group-hover:opacity-90 transition-opacity"
        priority
      />
    </Link>
  )
}
