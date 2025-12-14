import { Link } from 'react-router-dom'

export default function Logo({ className = "", size = "default" }: { className?: string; size?: "default" | "small" | "large" }) {
  const sizeClasses = {
    default: 'h-12 w-auto',
    small: 'h-8 w-auto',
    large: 'h-20 w-auto'
  }
  
  const currentSize = sizeClasses[size]
  
  return (
    <Link to="/" className={`flex items-center group ${className}`}>
      <img
        src="/logo.png"
        alt="C mart Logo"
        className={`${currentSize} object-contain group-hover:opacity-90 transition-opacity`}
      />
    </Link>
  )
}
