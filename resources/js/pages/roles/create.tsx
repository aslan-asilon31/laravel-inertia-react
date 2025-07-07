import Container from '@/components/container';
import Button from '@/components/button';
import AppLayout from '@/layouts/app-layout';
import { usePage, Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import Input from '@/components/input';
import Checkbox from "@/components/checkbox";
import Swal from 'sweetalert2';
import { Card } from "@/components/ui/card";
import React from 'react';
import { LoaderCircle } from "lucide-react";

export default function Create() {
    const { permissions } = usePage<{ permissions: Record<string, string[] | string> }>().props;

    const { data, setData, post, errors, processing } = useForm<{
        name: string;
        selectedPermissions: string[];
    }>({
        name: "",
        selectedPermissions: [],
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Roles > Create`,
            href: route('roles.create'),
        },
    ];

    const handleSelectedPermissions = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let items = [...data.selectedPermissions];

        if (e.target.checked) {
            if (!items.includes(value)) {
                items.push(value);
            }
        } else {
            items = items.filter((item) => item !== value);
        }

        setData("selectedPermissions", items);
    };

    const handleStoreData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("roles.store"), {
            onSuccess: () => {
                Swal.fire({
                    title: "Success!",
                    text: "Data created successfully!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
        });
    };

{Object.entries(permissions || {}).map(([group, permissionItems], i) => {
    const items = Array.isArray(permissionItems)
        ? permissionItems
        : typeof permissionItems === 'string'
        ? [permissionItems]
        : [];

    return (
        <div key={i} className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2">{group}</h3>
            <div className="flex flex-wrap gap-2">
                {items.map((permission: string) => (
                    <Checkbox
                        label={permission}
                        value={permission}
                        onChange={handleSelectedPermissions}
                        key={permission}
                    />
                ))}
            </div>
            {errors?.selectedPermissions && (
                <div className="text-xs text-red-500 mt-4">
                    {errors.selectedPermissions}
                </div>
            )}
        </div>
    );
})}

}
