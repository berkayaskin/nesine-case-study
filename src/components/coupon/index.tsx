'use client'

import { Icons } from '@/assets/lucide-icons'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useCoupon } from '@/contexts/coupon'

const Coupon = () => {
  const { coupon } = useCoupon()

  // calculate totalAmount based on multiplication of oddValues
  // if coupon is null(initialState) or array length is 0(remove all selected items), totalAmount is 0
  // else, calculate totalAmount
  const totalAmount =
    coupon && coupon.length > 0
      ? coupon.reduce((acc, curr) => acc * Number(curr.oddValue), 1).toFixed(2)
      : 0

  return (
    <Card className="relative flex flex-col items-start justify-center text-xl xl:gap-4">
      <CardHeader className="w-full border-b border-border bg-muted">
        <CardTitle>İDDAA KUPONUM</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        {coupon && coupon.length > 0 ? (
          <ul className="p-2 pt-0">
            {coupon.map((item) => (
              <li
                key={item.id}
                className="min-w-max space-x-4 border-b border-border p-4 text-left"
              >
                <span>{item.minBetStake}</span>
                <span>Kod: {item.id}</span>
                <span>Maç: {item.name}</span>
                <span className="font-bold">Oran: {item.oddValue}</span>
              </li>
            ))}
          </ul>
        ) : (
          <CardDescription className="my-8 flex flex-col items-center justify-center gap-6 text-xl font-semibold">
            <Icons.Circle size={48} />
            Kuponunuzda maç bulunmamaktadır.
          </CardDescription>
        )}
      </CardContent>
      <CardFooter className="block font-medium">
        Toplam Tutar: {totalAmount} TL
      </CardFooter>
    </Card>
  )
}
export default Coupon
