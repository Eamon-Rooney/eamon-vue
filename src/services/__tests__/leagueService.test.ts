import { describe, it, expect, vi } from 'vitest'
import { fetchLeagueStandings } from '@/services/leagueService'

describe('fetchLeagueStandings', () => {
  it('fetches league standings successfully', async () => {
    const standings = await fetchLeagueStandings(175725)
    expect(standings).toBeInstanceOf(Array)
    expect(standings[0]).toHaveProperty('id')
    expect(standings[0]).toHaveProperty('entry_name')
  })
})