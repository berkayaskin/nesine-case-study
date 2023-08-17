/* import Bulletin from '@/components/bulletin' */
import Coupon from '@/components/coupon'
import { fetchSize } from '@/data/constants'
import { getBets } from '@/lib/api'
import { getQueryClient } from '@/lib/providers/react-query.client'
import { ReactQueryHydrator } from '@/lib/providers/react-query.provider'
import { dehydrate } from '@tanstack/react-query'
import type { NextPage } from 'next'
import { Fragment } from 'react'

const Home: NextPage = async () => {
  const queryClient = getQueryClient()

  const data = await queryClient.prefetchInfiniteQuery(
    ['table-data'],
    async ({ pageParam = 0 }) => {
      const start = pageParam * fetchSize
      const fetchedData = getBets(start, fetchSize)
      return fetchedData
    }
  )

  console.log(data)

  const dehydratedState = dehydrate(queryClient)

  return (
    <Fragment>
      <ReactQueryHydrator state={dehydratedState}>
        {/* <Bulletin /> */}
        <Coupon />
      </ReactQueryHydrator>
    </Fragment>
  )
}

export default Home
