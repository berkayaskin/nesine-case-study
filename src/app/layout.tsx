import Layout from '@/components/layouts'
import { Providers } from '@/lib/providers'
import { cn } from '@/lib/utils'
import { fontSans } from '@/styles/fonts'
import type { Metadata } from 'next'

import { APP_NAME } from '@/data/constants'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'Nesine.com Case Study',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: '#FFFFFF',
  openGraph: {
    url: 'https://berkayaskin.dev',
    title: 'nesine-case-study',
    description: 'Nesine.com Case Study',
    images: {
      url: '',
      alt: 'berkayaskin.dev og-image',
    },
  },
  twitter: {
    creator: '@berkayaskin',
    card: 'summary_large_image',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
