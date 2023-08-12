import { columns } from '@/components/bulletin/columns'
import { TransformedBet } from '@/components/bulletin/transformed-bets.types'
import { Match } from '@/data/bets/bets.types'
import { promises as fs } from 'fs'
import path from 'path'
import DataTable from './data-table'

async function getBets() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'src/data/bets/bets.json')
  )

  const bets = JSON.parse(data.toString())

  const transformedBets = bets.map((bet: Match) => {
    return {
      NID: bet.NID,
      id: bet.C,
      name: bet.N,
      date: bet.D,
      time: bet.T,
      day: bet.DAY,
      status: bet.S,
      leagueName: bet.LN,
      isMatchFinished: bet.IMF,
      oddCategories: Object.keys(bet.OCG).map((key) => {
        return {
          id: bet.OCG[key].ID,
          name: bet.OCG[key].N,
          minBetStake: bet.OCG[key].MBS,
          sortOrder: bet.OCG[key].SO,
          odds: Object.keys(bet.OCG[key].OC).map((id) => {
            return {
              id: bet.OCG[key].OC[id].ID,
              name: bet.OCG[key].OC[id].N,
              value: bet.OCG[key].OC[id].O,
              sortOrder: bet.OCG[key].OC[id].OD,
              group: bet.OCG[key].OC[id].G,
              minBetStake: bet.OCG[key].OC[id].MBS,
            }
          }),
        }
      }),
      comments: 'Yorumlar',
      moreOddOptions: {
        name: '+99',
        value: '3',
      },
    }
  })

  return {
    data: transformedBets,
  }
}

const Bulletin = async () => {
  const bets: { data: TransformedBet[] } = await getBets()

  return <DataTable columns={columns} data={bets.data} />
}
export default Bulletin
