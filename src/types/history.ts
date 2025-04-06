export interface GameWeekData {
  event: number
  points: number
  total_points: number
  bank: number
  value: number
  event_transfers: number
  event_transfers_cost: number
  points_on_bench: number
}

export interface User {
  id: number
  entry: number
  entry_name: string
  player_name: string
}

export type LeagueStandings = User[]