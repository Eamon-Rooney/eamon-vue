export const fetchUserHistory = async (entry: number) => {
  const url = `https://cors-anywhere.herokuapp.com/https://fantasy.premierleague.com/api/entry/${entry}/history/`
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Error fetching user history: ${response.statusText}`)
    }
    const data = await response.json()
    console.log(`User History for entry ${entry}:`, data) // Debugging
    return data.current.map((gameweek: any) => ({
      event: gameweek.event,
      points: gameweek.points,
      total_points: gameweek.total_points,
      bank: gameweek.bank,
      value: gameweek.value,
      event_transfers: gameweek.event_transfers,
      event_transfers_cost: gameweek.event_transfers_cost,
      points_on_bench: gameweek.points_on_bench,
    }))
  } catch (error) {
    console.error('Error fetching user history:', error)
    throw error
  }
}