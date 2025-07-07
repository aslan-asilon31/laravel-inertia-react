import React from 'react';
import Container from '@/components/container';
import Table from '@/components/table';
import Button from '@/components/button';
import Pagination from '@/components/pagination';
import Search from '@/components/search';
import useHasAnyPermission from '@/utils/permission';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage, Head } from '@inertiajs/react';

import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
export default function Index() {
    const { auth } = usePage().props;
    const { roles,filters } = usePage().props;
    const user = auth?.user;
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Roles`,
            href: '/dashboard/roles',
        },
    ];
  
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Permission ${user ? user.name : "User"}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                    <Card>
                        <CardHeader>
                            <CardTitle> Selamat Datang {user ? user.name : "User"}</CardTitle>
                        </CardHeader>
                       
                       
                    </Card>
                    {/* <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div> */}
                </div>
                <Card>
                    <Container>
                        <div className='mb-4 flex items-center justify-between gap-4'>
                            {useHasAnyPermission(['roles create']) &&
                                <Button type={'add'} url={route('roles.create')}/>
                            }
                            <div className='w-full md:w-4/6'>
                                <Search url={route('roles.index')} placeholder={'Search Roles data by name...'} filter={filters}/>
                            </div>
                        </div>
                        <Table.Card title={'Role'}>
                            <Table>
                                <Table.Thead>
                                    <tr>
                                        <Table.Th>#</Table.Th>
                                        <Table.Th>Role Name</Table.Th>
                                        <Table.Th>Action</Table.Th>
                                    </tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {roles.data.map((role, i) => (
                                        <tr key={i}>
                                            <Table.Td>{++i + (roles.current_page-1) * roles.per_page}</Table.Td>
                                            <Table.Td>{role.name}</Table.Td>
                                            <Table.Td>

                                            <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline">Open</Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56" align="start">
                                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                                <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    Profile
                                                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Billing
                                                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Settings
                                                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Keyboard shortcuts
                                                    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuGroup>
                                                <DropdownMenuItem>Team</DropdownMenuItem>
                                                <DropdownMenuSub>
                                                    <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                                                    <DropdownMenuPortal>
                                                    <DropdownMenuSubContent>
                                                        <DropdownMenuItem>Email</DropdownMenuItem>
                                                        <DropdownMenuItem>Message</DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem>More...</DropdownMenuItem>
                                                    </DropdownMenuSubContent>
                                                    </DropdownMenuPortal>
                                                </DropdownMenuSub>
                                                <DropdownMenuItem>
                                                    New Team
                                                    <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>GitHub</DropdownMenuItem>
                                                <DropdownMenuItem>Support</DropdownMenuItem>
                                                <DropdownMenuItem disabled>API</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                Log out
                                                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                            </DropdownMenu>
    
                                                <div className='flex items-center gap-2'>
                                                    {useHasAnyPermission(['permissions edit']) &&
                                                        <Button type={'edit'} url={route('roles.edit', role.id)}/>
                                                    }
                                                    {useHasAnyPermission(['roles delete']) &&
                                                        <Button type={'delete'} url={route('roles.destroy', role.id)}/>
                                                    }
                                                </div>
                                            </Table.Td>
                                        </tr>
                                    ))}
                                </Table.Tbody>
                            </Table>
                        </Table.Card>
                        <div className='flex items-center justify-center'>
                            {roles.last_page !== 1 && (<Pagination links={roles.links}/>)}
                        </div>
                    </Container>
                </Card>
            </div>
        </AppLayout>
    );
}
