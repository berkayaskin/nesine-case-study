'use client'

import { Icons } from '@/assets/lucide-icons'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { fetchSize } from '@/data/constants'
import { getBets } from '@/lib/api'
import { useInfiniteQuery } from '@tanstack/react-query'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useVirtual } from '@tanstack/react-virtual'
import { Fragment, useMemo, useRef } from 'react'
import { columns } from './columns'

const Bulletin = () => {
  /*
   * TODOS
   * Solve the table is flickering issue while scrolling
   */

  const tableContainerRef = useRef<HTMLDivElement>(null)

  // Fetch data using useInfiniteQuery
  const { data, fetchNextPage, isFetching, isLoading, hasNextPage } =
    useInfiniteQuery(
      ['table-data'],
      async ({ pageParam = 0 }) => {
        const start = pageParam * fetchSize
        const fetchedData = await getBets(start, fetchSize)
        return fetchedData
      },
      {
        getNextPageParam: (_lastGroup, groups) => groups.length,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
      }
    )

  // Flattened data
  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data]
  )

  // Create React Table instance
  const table = useReactTable({
    data: flatData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  })

  const { rows } = table.getRowModel()

  // Virtualization setup
  const { virtualItems: virtualRows, totalSize } = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 5,
  })

  // Padding calculations
  const paddingTop = virtualRows.length > 0 ? virtualRows[0].start || 0 : 0
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows[virtualRows.length - 1].end || 0)
      : 0

  if (isLoading) {
    return <Icons.Loader className="animate-spin" />
  }

  return (
    <div
      className="max-h-[calc(100vh-76px)] min-w-[100vw] overflow-auto text-center"
      ref={tableContainerRef}
    >
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="sticky top-0 bg-gray-100 dark:bg-gray-900"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            )
          })}
        </TableHeader>
        <TableBody>
          {paddingTop > 0 && (
            <TableRow>
              <TableCell style={{ height: `${paddingTop}px` }} />
            </TableRow>
          )}
          {virtualRows.map((virtualRow) => {
            const row = rows[virtualRow.index]
            return (
              <Fragment key={row.id}>
                {table.getHeaderGroups().map((headerGroup) => {
                  return (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableCell key={header.id} className="py-1">
                            {header.index === 0
                              ? flexRender(
                                  <p className="min-w-max space-x-1 text-left">
                                    <span>{row.original.date}</span>
                                    <span>{row.original.day}</span>
                                    <span>{row.original.leagueName}</span>
                                  </p>,
                                  header.getContext()
                                )
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
                <TableRow>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </Fragment>
            )
          })}
          {paddingBottom > 0 && (
            <TableRow>
              <TableCell style={{ height: `${paddingBottom}px` }} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isFetching && (
        <div className="flex w-full items-center justify-center py-5">
          <Icons.Loader className="animate-spin" />
        </div>
      )}
      {!isFetching && hasNextPage && (
        <div className="flex w-full items-center justify-center py-5">
          <Button onClick={() => fetchNextPage()}>Load More</Button>
        </div>
      )}
    </div>
  )
}
export default Bulletin
