
 
"use client"

import * as React from "react"
import { ColumnDef ,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { setTotalBudget } from "@/lib/Store/slice";
import {  useDispatch } from 'react-redux'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import AddBudget from "@/components/AddBudget"



interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
  }

 
  
export function DataTable<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const dispatch = useDispatch()

   


  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const calculateTotalCost = () => {
    const allRows = table.getRowModel().rows;
    const totalCost = allRows.reduce((acc, row) => {
      const cost = parseFloat(row.getValue("cost"));
      return acc + (isNaN(cost) ? 0 : cost);
    }, 0);
  
    dispatch(setTotalBudget(totalCost));
    return totalCost;
  };
  


  return (
    <div >
    <div>
      <p className="text-lg text-slate-900 dark:text-slate-50">Budget</p>
      <p className="text-sm font-medium text-slate-400">Manage your event budget</p>
    </div>
    <div className="flex flex-col justify-between py-4 sm:flex-row">
      <Input
        placeholder="Filter items..."
        value={table.getColumn("item")?.getFilterValue() as string}
        onChange={(event) =>
          table.getColumn("item")?.setFilterValue(event.target.value)
        }
        
      />
      <AddBudget />
    </div>
    <div >
      <Table className="rounded-md border">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    <div className="text-muted-foreground flex-1 text-sm">
      {table.getFilteredSelectedRowModel().rows.length} of{" "}
      {table.getFilteredRowModel().rows.length} row(s) selected.
      <span className="block sm:inline-block mt-2 sm:mt-0 sm:float-right text-lg text-slate-900 dark:text-slate-50">
        Total Cost: {calculateTotalCost() }
      </span>
    </div>
  </div>
  
  )
}
