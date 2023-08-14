import Bulletin from '@/components/bulletin'
import Coupon from '@/components/coupon'
import type { NextPage } from 'next'
import { Fragment } from 'react'

const Home: NextPage = () => {
  return (
    <Fragment>
      <Bulletin />
      <Coupon />
    </Fragment>
  )
}

export default Home
