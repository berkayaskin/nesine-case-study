import { QueryClient } from '@tanstack/react-query'
import { cache } from 'react'

export const queryClientOptions = {
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
}

export const getQueryClient = cache(() => new QueryClient(queryClientOptions))
