'use client'

import { CouponContext } from '@/contexts/coupon'
import { Coupon, CouponProviderProps } from '@/types/coupon.types'
import { FC, useState } from 'react'

export const CouponProvider: FC<CouponProviderProps> = ({ children }) => {
  const [coupon, setCoupon] = useState<Coupon[] | null>(null)

  const value = { coupon, setCoupon }

  return (
    <CouponContext.Provider value={value}>{children}</CouponContext.Provider>
  )
}
