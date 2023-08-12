import Bulletin from '@/components/bulletin'
import type { NextPage } from 'next'

const Home: NextPage = async () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 text-center">
      <Bulletin />
    </div>
  )
}

export default Home
