// resources/js/pages/users/columns.ts
"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Swal from 'sweetalert2';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

export type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

export const columns: ColumnDef<User>[] = [
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
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name", 
    header: "name", 
  },
{
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      )
    },
    filterFn: "includesString",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "created_at",  
    header: "Created At", 
  },
    {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
                                <button
                                  onClick={() =>
                                    router.visit(route('users.edit', { id: user.id }))
                                  }
                                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                >
                                  Edit
                                </button>


            </DropdownMenuItem>
            <DropdownMenuItem>
              <button
                                  onClick={() => {
                                    Swal.fire({
                                      title: 'Are you sure?',
                                      text: 'This user will be deleted permanently.',
                                      icon: 'warning',
                                      showCancelButton: true,
                                      confirmButtonText: 'Yes, delete it!',
                                      cancelButtonText: 'Cancel',
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        router.delete(route('users.destroy', { id: user.id }), {
                                          onSuccess: () => {
                                            Swal.fire({
                                              title: 'Deleted!',
                                              text: 'User deleted successfully.',
                                              icon: 'success',
                                              showConfirmButton: false,
                                              timer: 1500,
                                            });
                                          },
                                          onError: () => {
                                            Swal.fire({
                                              title: 'Error!',
                                              text: 'Failed to delete the User.',
                                              icon: 'error',
                                            });
                                          },
                                        });
                                      }
                                    });
                                  }}
                                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                                >
                                  Delete
                                </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },

];
