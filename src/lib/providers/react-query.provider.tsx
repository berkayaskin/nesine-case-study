'use client'
import {
  HydrateProps,
  QueryClient,
  QueryClientProvider,
  Hydrate as ReactQueryHydrate,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import { queryClientOptions } from './react-query.client'

export const ReactQueryHydrator = (props: HydrateProps) => {
  return <ReactQueryHydrate {...props} />
}

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [queryClient] = useState(() => new QueryClient(queryClientOptions))
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  )
}
