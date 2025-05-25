import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="relative flex items-center justify-center min-h-[calc(100vh-136px)]">
      <Loader2 className="w-10 h-10 animate-spin text-brand" />

      <div className="absolute m-auto w-14 h-14 rounded-full border-t-2 border-purple-500 animate-[spin_2s_linear_infinite]" />
    </div>
  )
}
