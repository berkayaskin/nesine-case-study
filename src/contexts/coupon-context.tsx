'use client'

import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

export type Coupon = {
  id: string
  name: string
  oddValue: string
  minBetStake: string
}

type CouponContextType = {
  coupon: Coupon[] | null
  setCoupon: Dispatch<SetStateAction<Coupon[] | null>>
}

type CouponProviderProps = {
  children: ReactNode
}

const CouponContext = createContext<CouponContextType>({
  coupon: null,
  setCoupon: () => {},
})

const CouponProvider: FC<CouponProviderProps> = ({ children }) => {
  const [coupon, setCoupon] = useState<Coupon[] | null>(null)

  const value = { coupon, setCoupon }

  return (
    <CouponContext.Provider value={value}>{children}</CouponContext.Provider>
  )
}

const useCoupon = () => {
  const context = useContext(CouponContext)

  if (context === undefined) {
    throw new Error('useCoupon must be used within a CouponProvider')
  }

  return context
}

export { CouponProvider, useCoupon }
