export type Odds = {
  //Unique identifier for the odd.
  ID: string
  //Odd value.
  O: string
  //Odd name.
  N: string
  //Minimum bet stake.
  MBS: string
  //Group of the odd.
  G: string
  //Sort order of the odd.
  OD: number
  //Is match finished?
  IMF: boolean
}

export type OddCategory = {
  //Unique identifier for the odd category.
  ID: string
  //Odd category name.
  N: string
  //Minimum bet stake.
  MBS: string
  //Sort order of the odd category.
  SO: number
  //Odds.
  OC: Record<string, Odds>
}

export type Match = {
  //Unique identifier for the match.
  C: string
  //Match name (e.g., team names).
  N: string
  //Type of the match.
  TYPE: string
  //Unique identifier for the match.
  NID: string
  //Date of the match.
  D: string
  //Time of the match.
  T: string
  //Day of the match.
  DAY: string
  //Status of the match.
  S: string
  //League name.
  LN: string
  //Is match finished?
  IMF: boolean
  //Odds category group.
  OCG: Record<string, OddCategory>
  //Has event calendar?
  HEC: boolean
}
