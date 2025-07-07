// resources/js/pages/users/index.tsx
"use client"

import { columns, User } from "@/pages/users-old2/columns";
import { DataTable } from "./data-table";
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

    
type Props = {
  users: {
    data: User[];
    current_page: number;
    last_page: number;
  };
  filters: { search: string };
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

export default function DemoPage({ users, filters }: Props) {
  return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min ">
                    <DataTable columns={columns} data={users.data} /> {/* Ensure correct data is passed */}
                </div>
            </div>
        </AppLayout>
  );
}
