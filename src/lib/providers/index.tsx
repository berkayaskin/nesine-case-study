import { CouponProvider } from './coupon.provider'
import { ReactQueryProvider } from './react-query.provider'
import { ReduxProvider } from './redux.provider'
import { ThemeProvider } from './theme.provider'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryProvider>
      <ReduxProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CouponProvider>{children}</CouponProvider>
        </ThemeProvider>
      </ReduxProvider>
    </ReactQueryProvider>
  )
}
