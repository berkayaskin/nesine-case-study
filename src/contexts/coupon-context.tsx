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
  totalAmount?: number
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

  // calculate totalAmount based on multiplication of oddValues
  const totalAmount = coupon?.reduce(
    (acc, curr) => acc * Number(curr.oddValue),
    1
  )

  const couponWithTotalAmount = coupon?.map((c) => ({
    ...c,
    totalAmount: Number(totalAmount?.toFixed(2)),
  }))

  const value = { coupon: couponWithTotalAmount || null, setCoupon }

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
