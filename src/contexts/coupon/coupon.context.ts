import { CouponContextType } from '@/types/coupon.types'
import { createContext } from 'react'

// Provide default values for the context
export const CouponContext = createContext<CouponContextType>({
  coupon: null,
  setCoupon: () => {},
  selectedRowId: null,
  handleClickCell: () => {},
})
