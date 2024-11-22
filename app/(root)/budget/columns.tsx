"use client"

import EditBudget from "@/components/EditBudget"
import DeleteBudget from "@/components/DeleteBudget"
import {Budget } from "@/types/collections";
import { ColumnDef } from "@tanstack/react-table"

// import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

export const columns: ColumnDef<Budget>[] = [
  
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="border-rose-600"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="border-rose-600"
        />
      ),
    },
  
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "item",
         header: "Item"
      },
      {
        accessorKey: "cost",
        header: () => <div>Cost</div>,
        cell: ({ row }) => {
          const cost = parseFloat(row.getValue("cost"))
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "GHS",
          }).format(cost)
     
          return <div className=" font-medium">{formatted}</div>
        },
        
      },
        {
          accessorKey: "id",
          header: "",
          cell: ({ row }) => {
            const payment = row.original
       
            return (
              <EditBudget budgetId={payment.budget_id} budgetItem={payment.item} budgetcost={payment.cost} budgetStatus={payment.status}/>
            )
          },
        },

        {
          accessorKey: "actions",
          header: "",
          cell: ({ row }) => {
            const payment = row.original
       
            return (
              <DeleteBudget budgetId={payment.budget_id}  />
            )
          },
        },
  ]
  



