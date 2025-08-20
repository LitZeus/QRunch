import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  className?: string
  size?: number
  text?: string
}

export function LoadingSpinner({ className = '', size = 24, text }: LoadingSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Loader2 className="animate-spin text-[#4A6B57]" size={size} />
      {text && <p className="mt-2 text-sm text-[#4A6B57]/70">{text}</p>}
    </div>
  )
}

export function FullPageLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingSpinner size={48} text="Loading..." />
    </div>
  )
}

export default LoadingSpinner
