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
import { useCoupon } from '@/contexts/coupon'
import { fetchSize } from '@/data/constants'
import { getBets } from '@/lib/api'
import { cn } from '@/lib/utils'
import { Coupon } from '@/types/coupon.types'
import { TransformedBet } from '@/types/transformed-bets.types'
import { useInfiniteQuery } from '@tanstack/react-query'
import {
  ColumnDef,
  Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useVirtual } from '@tanstack/react-virtual'
import { Fragment, memo, useMemo, useRef, useState } from 'react'

const Bulletin = () => {
  /*
   * TODOS
   * Solve the table is flickering issue while scrolling
   * Breakup the table into smaller components
   * Create columns dynamically
   */

  const tableContainerRef = useRef<HTMLDivElement>(null)
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null)

  const { coupon, setCoupon } = useCoupon()

  const handleClickCell = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    cellValue: string,
    row: Row<TransformedBet>
  ) => {
    e.preventDefault()

    const rowId = row.original.id
    const isCellSelected = isSelected(rowId, cellValue)

    if (isCellSelected) {
      // If the cell is already selected, remove it from the coupon array
      setCoupon((prev) => {
        if (prev) {
          return prev.filter(
            (c) => !(c.id === rowId && c.oddValue === cellValue)
          )
        }
        return [] as Coupon[]
      })
    } else {
      // If the cell is not selected, add or update it in the coupon array
      setCoupon((prev) => {
        if (prev) {
          return prev
            .filter((c) => c.id !== rowId)
            .concat({
              id: rowId,
              name: row.original.name,
              oddValue: cellValue,
              minBetStake: row.original.oddCategories[0].minBetStake,
            })
        }
        // If there's no previous coupon state, just return the new item
        return [
          {
            id: rowId,
            name: row.original.name,
            oddValue: cellValue,
            minBetStake: row.original.oddCategories[0].minBetStake,
          },
        ]
      })
    }

    setSelectedRowId(rowId)
  }

  const isSelected = (rowId: string, cellValue: string) => {
    return coupon?.some((c) => c.id === rowId && c.oddValue === cellValue)
  }

  const columns: ColumnDef<TransformedBet>[] = [
    {
      header: (props) => (
        <span>Event Count: {props.table.getRowModel().rows.length}</span>
      ),
      id: 'eventCount',
      cell: ({ row }) => {
        return (
          <p className="min-w-max space-x-1 text-left">
            <span className="font-bold">{row.original.id}</span>
            <span>{row.original.time}</span>
            <span>{row.original.name}</span>
          </p>
        )
      },
    },
    {
      accessorKey: 'comments',
      header: 'Yorumlar',
      cell: ({ row }) => {
        return <p>{row.original.comments}</p>
      },
    },
    {
      accessorFn: (row) => row.oddCategories[0].minBetStake,
      id: 'minBetStake',
      header: '',
    },
    {
      accessorFn: (row) => row.oddCategories[0].odds[0].value,
      id: 'oddCategoryName-1',
      header: '1',
      cell: ({ row }) => {
        const oddValue = row.original.oddCategories[0].odds[0].value
        const isCouponSelected = coupon?.some(
          (c) => c.id === row.original.id && c.oddValue === oddValue
        )
        const rowId = row.original.id
        const isRowSelected = selectedRowId === rowId

        return (
          <Button
            variant="ghost"
            onClick={(e) => {
              handleClickCell(e, oddValue, row)
            }}
            className={cn('text-blue-500 underline hover:text-blue-600', {
              'bg-yellow-200 no-underline hover:bg-yellow-200':
                (isRowSelected && isSelected(rowId, oddValue)) ||
                isCouponSelected,
            })}
          >
            {oddValue}
          </Button>
        )
      },
    },
    {
      accessorFn: (row) => row.oddCategories[0].odds[1].value,
      id: 'oddCategoryName-x',
      header: 'x',
      cell: ({ row }) => {
        const oddValue = row.original.oddCategories[0].odds[1].value
        const isCouponSelected = coupon?.some(
          (c) => c.id === row.original.id && c.oddValue === oddValue
        )
        const rowId = row.original.id
        const isRowSelected = selectedRowId === rowId

        return (
          <Button
            variant="ghost"
            onClick={(e) => {
              handleClickCell(e, oddValue, row)
            }}
            className={cn('text-blue-500 underline hover:text-blue-600', {
              'bg-yellow-200 no-underline hover:bg-yellow-200':
                (isRowSelected && isSelected(rowId, oddValue)) ||
                isCouponSelected,
            })}
          >
            {oddValue}
          </Button>
        )
      },
    },
    {
      header: '2',
    },
    {
      accessorFn: (row) => row.oddCategories[2].odds[0].value,
      id: 'oddCategoryName-alt',
      header: 'Alt',
      cell: ({ row }) => {
        const oddValue = row.original.oddCategories[2].odds[0].value
        const isCouponSelected = coupon?.some(
          (c) => c.id === row.original.id && c.oddValue === oddValue
        )
        const rowId = row.original.id
        const isRowSelected = selectedRowId === rowId

        return (
          <Button
            variant="ghost"
            onClick={(e) => {
              handleClickCell(e, oddValue, row)
            }}
            className={cn('text-blue-500 underline hover:text-blue-600', {
              'bg-yellow-200 no-underline hover:bg-yellow-200':
                (isRowSelected && isSelected(rowId, oddValue)) ||
                isCouponSelected,
            })}
          >
            {oddValue}
          </Button>
        )
      },
    },
    {
      accessorFn: (row) => row.oddCategories[2].odds[1].value,
      id: 'oddCategoryName-ust',
      header: 'Üst',
      cell: ({ row }) => {
        const oddValue = row.original.oddCategories[2].odds[1].value
        const isCouponSelected = coupon?.some(
          (c) => c.id === row.original.id && c.oddValue === oddValue
        )
        const rowId = row.original.id
        const isRowSelected = selectedRowId === rowId

        return (
          <Button
            variant="ghost"
            onClick={(e) => {
              handleClickCell(e, oddValue, row)
            }}
            className={cn('text-blue-500 underline hover:text-blue-600', {
              'bg-yellow-200 no-underline hover:bg-yellow-200':
                (isRowSelected && isSelected(rowId, oddValue)) ||
                isCouponSelected,
            })}
          >
            {oddValue}
          </Button>
        )
      },
    },
    {
      id: 'handicap-home',
      header: 'H1',
    },
    {
      id: 'handicap-1',
      header: '1',
    },
    {
      id: 'handicap-x',
      header: 'x',
    },
    {
      id: 'handicap-2',
      header: '2',
    },
    {
      id: 'handicap-away',
      header: 'H2',
    },
    {
      accessorFn: (row) => row.oddCategories[1].odds[0].value,
      id: 'oddCategoryName-1x',
      header: '1-X',
      cell: ({ row }) => {
        const oddValue = row.original.oddCategories[1].odds[0].value
        const isCouponSelected = coupon?.some(
          (c) => c.id === row.original.id && c.oddValue === oddValue
        )
        const rowId = row.original.id
        const isRowSelected = selectedRowId === rowId

        return (
          <Button
            variant="ghost"
            onClick={(e) => {
              handleClickCell(e, oddValue, row)
            }}
            className={cn('text-blue-500 underline hover:text-blue-600', {
              'bg-yellow-200 no-underline hover:bg-yellow-200':
                (isRowSelected && isSelected(rowId, oddValue)) ||
                isCouponSelected,
            })}
          >
            {oddValue}
          </Button>
        )
      },
    },
    {
      accessorFn: (row) => row.oddCategories[1].odds[1].value,
      id: 'oddCategoryName-12',
      header: '1-2',
      cell: ({ row }) => {
        const oddValue = row.original.oddCategories[1].odds[1].value
        const isCouponSelected = coupon?.some(
          (c) => c.id === row.original.id && c.oddValue === oddValue
        )
        const rowId = row.original.id
        const isRowSelected = selectedRowId === rowId

        return (
          <Button
            variant="ghost"
            onClick={(e) => {
              handleClickCell(e, oddValue, row)
            }}
            className={cn(
              'text-blue-500 underline hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500',
              {
                'bg-yellow-200 no-underline hover:bg-yellow-200':
                  (isRowSelected && isSelected(rowId, oddValue)) ||
                  isCouponSelected,
              }
            )}
          >
            {oddValue}
          </Button>
        )
      },
    },
    {
      accessorFn: (row) => row.oddCategories[1].odds[2].value,
      id: 'oddCategoryName-x2',
      header: 'X-2',
      cell: ({ row }) => {
        const oddValue = row.original.oddCategories[1].odds[2].value
        const isCouponSelected = coupon?.some(
          (c) => c.id === row.original.id && c.oddValue === oddValue
        )
        const rowId = row.original.id
        const isRowSelected = selectedRowId === rowId

        return (
          <Button
            variant="ghost"
            onClick={(e) => {
              handleClickCell(e, oddValue, row)
            }}
            className={cn('text-blue-500 underline hover:text-blue-600', {
              'bg-yellow-200 no-underline hover:bg-yellow-200':
                (isRowSelected && isSelected(rowId, oddValue)) ||
                isCouponSelected,
            })}
          >
            {oddValue}
          </Button>
        )
      },
    },
    {
      header: 'Var',
    },
    {
      header: 'Yok',
    },
    {
      accessorFn: (row) => row.moreOddOptions.value,
      id: 'moreOddOptions',
      header: '+99',
    },
  ]

  const { data, fetchNextPage, isFetching, isLoading } = useInfiniteQuery(
    ['table-data'],
    async ({ pageParam = 0 }) => {
      const start = pageParam * fetchSize
      const fetchedData = getBets(start, fetchSize)
      return fetchedData
    },
    {
      getNextPageParam: (_lastGroup, groups) => groups.length,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )

  //we must flatten the array of arrays from the useInfiniteQuery hook
  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data]
  )

  const totalDBRowCount = data?.pages?.[0]?.meta?.total ?? 0
  const totalFetched = flatData.length

  const handleLoadMoreClick = () => {
    fetchNextPage()
  }

  const table = useReactTable({
    data: flatData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  })

  const { rows } = table.getRowModel()

  // Calculate the padding at the top and bottom of the table
  const { virtualItems: virtualRows, totalSize } = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 5,
  })

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
      {!isFetching && totalFetched < totalDBRowCount && (
        <div className="flex w-full items-center justify-center py-5">
          <Button onClick={handleLoadMoreClick}>Load More</Button>
        </div>
      )}
    </div>
  )
}
export default memo(Bulletin)
