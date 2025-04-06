export const fetchLeagueStandings = async (leagueId: number = 175725) => {
  const url = `https://cors-anywhere.herokuapp.com/https://fantasy.premierleague.com/api/leagues-classic/${leagueId}/standings/`
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Error fetching league standings: ${response.statusText}`)
    }
    const data = await response.json()
    console.log('League Standings:', data) // Debugging
    return data.standings.results.map((entry: any) => ({
      id: entry.id,
      entry: entry.entry, // Include entry field
      entry_name: entry.entry_name,
      player_name: entry.player_name,
    }))
  } catch (error) {
    console.error('Error fetching league standings:', error)
    throw error
  }
}