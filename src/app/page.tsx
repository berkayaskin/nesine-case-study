import Bulletin from '@/components/bulletin'
import Coupon from '@/components/coupon'
import type { NextPage } from 'next'

const Home: NextPage = async () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Bulletin />
      <div className="fixed bottom-0 right-0 z-50 w-1/3 min-w-max 2xl:w-1/5">
        <Coupon />
      </div>
    </div>
  )
}

export default Home
