"use client";

import React from "react";
import { usePage, router } from "@inertiajs/react";
import Container from "@/components/container";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table"; // Corrected import statement

import Button from "@/components/ui/button";
import Search from "@/components/search";
import AppLayout from "@/layouts/app-layout";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Swal from "sweetalert2";
import useHasAnyPermission from "@/utils/permission";

export default function Index() {
  const { users, filters, auth } = usePage().props;
  const user = auth?.user;

  return (
    <AppLayout breadcrumbs={[{ title: "Users", href: "/users" }]}>
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <Card>
          <CardHeader>
            <CardTitle>Welcome {user?.name ?? "User"}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <Container>
            <div className="mb-4 flex items-center justify-between gap-4">
              <Button type={"add"} url={route("users.create")} />
              <div className="w-full md:w-4/6">
                <Search url={route("users.index")} placeholder={"Search users..."} filter={filters} />
              </div>
            </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Kode</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {arsips.data.map((arsip, index) => (
                <TableRow key={arsip.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{arsip.kode}</TableCell>
                  <TableCell>{arsip.nama}</TableCell>
                  <TableCell>{arsip.status}</TableCell>
                  <TableCell className="relative">
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={() => handleDropdownToggle(arsip.id)}
                      >
                        Aksi
                        <svg
                          className="-mr-1 ml-2 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>

                      {/* Dropdown */}
                      <div
                        id={`dropdown-${arsip.id}`}
                        className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none hidden"
                      >
                        <div className="py-1 text-sm text-gray-700">
                          {/* Edit Button */}
                          {useHasAnyPermission(["arsips-edit"]) && (
                            <button
                              onClick={() => router.visit(route("arsips.edit", arsip.id))}
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                              Edit
                            </button>
                          )}

                          {/* Delete Button */}
                          {useHasAnyPermission(["arsips-delete"]) && (
                            <button
                              onClick={() => {
                                Swal.fire({
                                  title: "Are you sure?",
                                  text: "This arsip will be deleted permanently.",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonText: "Yes, delete it!",
                                  cancelButtonText: "Cancel",
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    router.delete(route("arsips.destroy", arsip.id), {
                                      onSuccess: () => {
                                        Swal.fire({
                                          title: "Deleted!",
                                          text: "Arsip deleted successfully.",
                                          icon: "success",
                                          showConfirmButton: false,
                                          timer: 1500,
                                        });
                                      },
                                      onError: () => {
                                        Swal.fire({
                                          title: "Error!",
                                          text: "Failed to delete the Arsip.",
                                          icon: "error",
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
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </Container>
        </Card>
      </div>
    </AppLayout>
  );
}
