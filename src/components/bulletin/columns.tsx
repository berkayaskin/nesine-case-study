import { TransformedBet } from '@/types/transformed-bets.types'
import { ColumnDef } from '@tanstack/react-table'
import { CellButton } from './cell-button'

export const columns: ColumnDef<TransformedBet>[] = [
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
      return <CellButton oddValue={oddValue} row={row} />
    },
  },
  {
    accessorFn: (row) => row.oddCategories[0].odds[1].value,
    id: 'oddCategoryName-x',
    header: 'x',
    cell: ({ row }) => {
      const oddValue = row.original.oddCategories[0].odds[1].value

      return <CellButton oddValue={oddValue} row={row} />
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

      return <CellButton oddValue={oddValue} row={row} />
    },
  },
  {
    accessorFn: (row) => row.oddCategories[2].odds[1].value,
    id: 'oddCategoryName-ust',
    header: 'Üst',
    cell: ({ row }) => {
      const oddValue = row.original.oddCategories[2].odds[1].value

      return <CellButton oddValue={oddValue} row={row} />
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

      return <CellButton oddValue={oddValue} row={row} />
    },
  },
  {
    accessorFn: (row) => row.oddCategories[1].odds[1].value,
    id: 'oddCategoryName-12',
    header: '1-2',
    cell: ({ row }) => {
      const oddValue = row.original.oddCategories[1].odds[1].value

      return <CellButton oddValue={oddValue} row={row} />
    },
  },
  {
    accessorFn: (row) => row.oddCategories[1].odds[2].value,
    id: 'oddCategoryName-x2',
    header: 'X-2',
    cell: ({ row }) => {
      const oddValue = row.original.oddCategories[1].odds[2].value

      return <CellButton oddValue={oddValue} row={row} />
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
