import type { ReactNode } from 'react'

import { ReduxProvider, ThemeProvider } from '@/providers'

import Header from './header'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <ReduxProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="container relative flex flex-1 items-center justify-center">
            {children}
          </main>
        </div>
      </ThemeProvider>
    </ReduxProvider>
  )
}

export default Layout
