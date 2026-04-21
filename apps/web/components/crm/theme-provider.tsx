'use client'

export function CRMThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <div className="crm-scope">
      {children}
    </div>
  )
}
