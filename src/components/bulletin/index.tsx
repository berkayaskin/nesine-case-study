'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { fetchSize } from '@/data/constants'
import { getBetsQueryFn } from '@/lib/api/getBetsQueryFn'
import { useInfiniteQuery } from '@tanstack/react-query'
import {
  ColumnDef,
  Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useVirtual } from '@tanstack/react-virtual'
import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { Coupon, useCoupon } from '@/contexts/coupon-context'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { TransformedBet } from './transformed-bets.types'

const Bulletin = () => {
  /*
   * TODOS
   * Solve the table is flickering issue while scrolling
   * Solve fetching additional data on initial load
   */

  const tableContainerRef = useRef<HTMLDivElement>(null)
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null)

  const { coupon, setCoupon } = useCoupon()

  const handleCellClick = (
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
              handleCellClick(e, oddValue, row)
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
              handleCellClick(e, oddValue, row)
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
              handleCellClick(e, oddValue, row)
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
              handleCellClick(e, oddValue, row)
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
              handleCellClick(e, oddValue, row)
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
              handleCellClick(e, oddValue, row)
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
              handleCellClick(e, oddValue, row)
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
      const fetchedData = await getBetsQueryFn(start, fetchSize)
      return fetchedData
    },
    {
      getNextPageParam: (_lastGroup, groups) => groups.length,
    }
  )

  //we must flatten the array of arrays from the useInfiniteQuery hook
  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data]
  )

  const totalDBRowCount = data?.pages?.[0]?.meta?.total ?? 0
  const totalFetched = flatData.length

  //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement
        //once the user has scrolled within 300px of the bottom of the table, fetch more data if there is any
        if (
          scrollHeight - scrollTop - clientHeight < 300 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage()
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
  )

  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current)
  }, [fetchMoreOnBottomReached])

  const table = useReactTable({
    data: flatData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  })

  const { rows } = table.getRowModel()

  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
  })
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0

  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <div
      className="max-h-[800px] overflow-auto"
      ref={tableContainerRef}
      onScroll={(e) => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
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
            <tr>
              <td style={{ height: `${paddingTop}px` }} />
            </tr>
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
              <TableCell className={`h-[${paddingBottom}px]`} />
            </TableRow>
          )}
          {isFetching && (
            <TableRow>
              <TableCell className="text-center" colSpan={columns.length}>
                Loading...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
export default memo(Bulletin)
