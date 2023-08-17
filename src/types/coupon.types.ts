import { Row } from '@tanstack/react-table'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { TransformedBet } from './transformed-bets.types'

export type Coupon = {
  id: string
  name: string
  oddValue: string
  oddId: string
  minBetStake: string
}

export type CouponContextType = {
  coupon: Coupon[] | null
  setCoupon: Dispatch<SetStateAction<Coupon[] | null>>
  selectedRowId: string | null
  handleClickCell: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    cellValue: string,
    cellId: string,
    row: Row<TransformedBet>
  ) => void
}

export type CouponProviderProps = {
  children: ReactNode
}
