import { API_URL } from '@/data/constants'
import { Match } from '@/types/bets.types'
import { fetchData } from './fetch'

export const getBets = async (start: number = 0, size: number) => {
  const bets: Match[] = await fetchData(`${API_URL}/bets`)

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
    data: transformedBets.slice(start, start + size),
    meta: {
      total: transformedBets.length,
    },
  }
}
