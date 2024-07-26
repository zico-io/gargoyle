import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface Endpoint {
  url: string
  status: number
}

interface GargoyleState {
  endpoints: Array<Endpoint>
  addEndpoint: (url: string) => void
  deleteEndpoint: (index: number) => void
  clearEndpoints: () => void
}

export const useGargoyleStore = create<GargoyleState>()(
  devtools(
    persist(
      (set) => ({
        endpoints: [],
        addEndpoint: (url) => set((state) => {
          const endpoint = {
            url: url,
            status: 200
          }

          state.endpoints.push(endpoint)
          return { endpoints: state.endpoints }
        }),
        deleteEndpoint: (index) => set((state) => {
          state.endpoints.splice(index, 1)
          return { endpoints: state.endpoints }
        }),
        clearEndpoints: () => set(() => ({ endpoints: [] }))
      }),
      {
        name: 'gargoyle-storage',
      }
    )
  )
)

