import { Dispatch, ReactNode, SetStateAction } from 'react'

export type Coupon = {
  id: string
  name: string
  oddValue: string
  minBetStake: string
}

export type CouponContextType = {
  coupon: Coupon[] | null
  setCoupon: Dispatch<SetStateAction<Coupon[] | null>>
}

export type CouponProviderProps = {
  children: ReactNode
}
