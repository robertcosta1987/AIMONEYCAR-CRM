import { CRMThemeProvider } from '@/components/crm/theme-provider'
import { QueryProvider } from '@/components/providers/query-provider'

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <CRMThemeProvider>
        {children}
      </CRMThemeProvider>
    </QueryProvider>
  )
}
