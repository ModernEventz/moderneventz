




"use client"

import * as React from "react"
import {  useDispatch } from 'react-redux'
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



import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Input } from "@/components/ui/input";
import AddCheckList from "@/components/AddCheckList";

import { setTotalTasks } from "@/lib/Store/slice";



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

  const calculateTotalTask = () => {
    const TotalTasks = table.getRowModel().rows.length;
    
    dispatch(setTotalTasks(TotalTasks));
    return TotalTasks;
  };
  


  return (
    <div >
      <div>
        <p className="text-lg text-slate-900 dark:text-slate-50">Check List</p>
        <p className="text-sm font-medium text-slate-400">Create a check List for your event</p>
      </div>
      <div className="flex flex-row justify-between py-4">
        <Input
          placeholder="Filter items..."
          value={table.getColumn("title")?.getFilterValue() as string}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {/*  code to implement delete all functionality        
        { table.getFilteredSelectedRowModel().rows.length ?
       <DeleteAllCheckList number_of_task={ table.getFilteredSelectedRowModel().rows.length }  /> : null
         }

          */}
      
      <AddCheckList/>
      </div>
      <div className="rounded-md border">
        <Table >
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
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
       <span className="float-right text-lg text-slate-900 dark:text-slate-50">Total Tasks: {calculateTotalTask()}</span>
</div>
    </div>
    
  )
}
