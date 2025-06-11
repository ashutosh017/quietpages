'use client'
import { SignIn } from '@clerk/nextjs'
import { dark, neobrutalism } from '@clerk/themes'
import { useTheme } from 'next-themes'

export default function Page() {
  const { resolvedTheme } = useTheme()

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <SignIn appearance={{ baseTheme: resolvedTheme === 'dark' ? dark : undefined }} />
    </div>
  )
}
