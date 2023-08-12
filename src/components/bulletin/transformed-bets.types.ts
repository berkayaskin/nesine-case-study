export type TransformedOdds = {
  id: string
  name: string
  value: string
  sortOrder: number
  group: string
  minBetStake: string
}

export type TransformedOddCategory = {
  id: string
  name: string
  minBetStake: string
  sortOrder: number
  odds: TransformedOdds[]
}

export type TransformedBet = {
  NID: string
  id: string
  name: string
  date: string
  time: string
  day: string
  status: string
  leagueName: string
  isMatchFinished: boolean
  oddCategories: TransformedOddCategory[]
  comments: string
  moreOddOptions: {
    name: string
    value: string
  }
}
