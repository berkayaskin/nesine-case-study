import { Button } from '@/components/ui/button'
import { useCoupon } from '@/contexts/coupon'
import { cn } from '@/lib/utils'
import { TransformedBet } from '@/types/transformed-bets.types'
import { Row } from '@tanstack/react-table'

type CellButtonProps = {
  row: Row<TransformedBet>
  oddValue: string
}

export const CellButton = ({ row, oddValue }: CellButtonProps) => {
  const { coupon, selectedRowId, handleClickCell } = useCoupon()

  const rowId = row.original.id
  const isRowSelected = selectedRowId === rowId
  const isCellSelected = coupon?.some(
    (c) => c.id === rowId && c.oddValue === oddValue
  )

  return (
    <Button
      variant="ghost"
      onClick={(e) => handleClickCell(e, oddValue, row)}
      className={cn('text-blue-500 underline hover:text-blue-600', {
        'bg-yellow-200 no-underline hover:bg-yellow-200':
          (isRowSelected && isCellSelected) || isCellSelected,
      })}
    >
      {oddValue}
    </Button>
  )
}
