'use client'

import { CouponContext } from '@/contexts/coupon'
import { Coupon, CouponProviderProps } from '@/types/coupon.types'
import { TransformedBet } from '@/types/transformed-bets.types'
import { Row } from '@tanstack/react-table'
import { FC, useState } from 'react'

export const CouponProvider: FC<CouponProviderProps> = ({ children }) => {
  const [coupon, setCoupon] = useState<Coupon[] | null>(null)
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null)

  const handleClickCell = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    cellValue: string,
    cellId: string,
    row: Row<TransformedBet>
  ) => {
    e.preventDefault()

    const rowId = row.original.id
    const isCellSelected = coupon?.some(
      (c) => c.id === rowId && c.oddId === cellId
    )

    if (isCellSelected) {
      // If the cell is already selected, remove it from the coupon array
      setCoupon((prev) => {
        if (prev) {
          return prev.filter((c) => !(c.id === rowId && c.oddId === cellId))
        }
        return [] as Coupon[]
      })
    } else {
      // If the cell is not selected, add or update it in the coupon array
      setCoupon((prev) => {
        if (prev) {
          return prev
            .filter((c) => c.id !== rowId)
            .concat({
              id: rowId,
              name: row.original.name,
              oddValue: cellValue,
              oddId: cellId,
              minBetStake: row.original.oddCategories[0].minBetStake,
            })
        }
        // If there's no previous coupon state, just return the new item
        return [
          {
            id: rowId,
            name: row.original.name,
            oddValue: cellValue,
            oddId: cellId,
            minBetStake: row.original.oddCategories[0].minBetStake,
          },
        ]
      })
    }

    setSelectedRowId(rowId)
  }

  const value = { coupon, setCoupon, selectedRowId, handleClickCell }

  return (
    <CouponContext.Provider value={value}>{children}</CouponContext.Provider>
  )
}
