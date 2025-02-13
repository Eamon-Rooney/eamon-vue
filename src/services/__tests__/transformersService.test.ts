import { describe, it, expect, vi } from 'vitest'
import { fetchData } from '../transformersService'

describe('transformersService', () => {
  it('fetches data correctly', async () => {
    const mockData = [
      { assetId: 1, name: 'Transformer Alpha', region: 'London', health: 'Good', lastTenVoltageReadings: [] }
    ]

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData)
      })
    ) as unknown as typeof fetch

    const data = await fetchData()
    expect(data).toEqual(mockData)
  })
})