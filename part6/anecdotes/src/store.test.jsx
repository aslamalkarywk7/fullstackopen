import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useAnecdoteStore, {
  useAnecdotes,
  useAnecdoteActions,
} from './store'


const backendData = [
  { content: 'Alpha saying', id: '1', votes: 1 },
  { content: 'Beta saying', id: '2', votes: 5 },
  { content: 'Gamma saying', id: '3', votes: 3 },
]

const resetBackend = () => {
  backendData.length = 0
  backendData.push(
    { content: 'Alpha saying', id: '1', votes: 1 },
    { content: 'Beta saying', id: '2', votes: 5 },
    { content: 'Gamma saying', id: '3', votes: 3 }
  )
}

vi.stubGlobal(
  'fetch',
  vi.fn(async (url, options) => {
    const method = options?.method || 'GET'
    if (method === 'GET') {
      return { ok: true, json: async () => backendData.map((a) => ({ ...a })) }
    }
    if (method === 'POST') {
      const body = JSON.parse(options.body)
      const created = { ...body, id: 'new-id' }
      backendData.push(created)
      return { ok: true, json: async () => ({ ...created }) }
    }
    if (method === 'PUT') {
      const updated = JSON.parse(options.body)
      const index = backendData.findIndex((a) => String(a.id) === String(updated.id))
      backendData[index] = updated
      return { ok: true, json: async () => ({ ...updated }) }
    }
    if (method === 'DELETE') {
      const id = String(url).split('/').pop()
      const index = backendData.findIndex((a) => String(a.id) === id)
      backendData.splice(index, 1)
      return { ok: true, json: async () => ({}) }
    }
    return { ok: false, json: async () => ({}) }
  })
)

beforeEach(() => {
  resetBackend()
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
})

describe('anecdote store', () => {
  it('initializes state with the anecdotes returned by the backend', async () => {
    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    expect(useAnecdoteStore.getState().anecdotes).toEqual(backendData)
  })

  it('displays anecdotes sorted by votes without mutating the store order', async () => {
    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: list } = renderHook(() => useAnecdotes())
    expect(list.current.map((a) => a.content)).toEqual([
      'Beta saying',
      'Gamma saying',
      'Alpha saying',
    ])
    expect(
      useAnecdoteStore.getState().anecdotes.map((a) => a.content)
    ).toEqual(['Alpha saying', 'Beta saying', 'Gamma saying'])
  })

  it('gives the list a properly filtered, still-sorted set of anecdotes', async () => {
    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    await act(async () => {
      result.current.setFilter('gamma')
    })

    const { result: list } = renderHook(() => useAnecdotes())
    expect(list.current.map((a) => a.content)).toEqual(['Gamma saying'])
  })

  it('voting increases the vote count of the anecdote', async () => {
    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    await act(async () => {
      await result.current.vote('1')
    })
    await act(async () => {
      await result.current.vote('1')
    })

    const voted = useAnecdoteStore
      .getState()
      .anecdotes.find((a) => a.id === '1')
    expect(voted.votes).toBe(3)
  })
})
