'use client'

import { useContext } from 'react'
import { CouponContext } from './coupon.context'

export const useCoupon = () => {
  const context = useContext(CouponContext)

  if (context === undefined) {
    throw new Error('useCoupon must be used within a CouponProvider')
  }

  return context
}
