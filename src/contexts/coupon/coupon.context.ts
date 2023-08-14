'use client'

import { CouponContextType } from '@/types/coupon.types'
import { createContext } from 'react'

export const CouponContext = createContext<CouponContextType>({
  coupon: null,
  setCoupon: () => {},
})
