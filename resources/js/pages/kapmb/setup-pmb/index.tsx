import React, { useState } from 'react';
import Container from '@/components/container';
import Table from '@/components/table';
import Button from '@/components/button';
import Pagination from '@/components/pagination';
import Search from '@/components/search';
import useHasAnyPermission from '@/utils/permission';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage, Head, router } from '@inertiajs/react';
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

    const tabs = [
      { label: "Gelombang PMB", href: "#" },
      { label: "Daftar Presenter", href: "#" },
      { label: "Sumber Informasi", href: "#" },
      { label: "Prasyarat Formulir", href: "#" },
      { label: "Formulir PMB", href: "#" },
      { label: "Komponen USM", href: "#" },
      { label: "Prodi-USM", href: "#" },
      { label: "Prodi-Wawancara", href: "#" },
      { label: "Status Awal", href: "#" },
      { label: "PMB Grade", href: "#" },
    ];

    const [activeTab, setActiveTab] = useState("Gelombang PMB");
    const [search, setSearch] = useState(usePage().props.search || '');

    // Ambil data gelombang dari props inertia
    const { gelombang = [] } = usePage().props;

    // Data dummy untuk setiap tab
    const dummyData = {
      "Gelombang PMB": [
        { nama: "Gelombang 1", tahun: 2025 },
        { nama: "Gelombang 2", tahun: 2025 },
      ],
      "Daftar Presenter": [
        { nama: "Presenter 1", email: "presenter1@email.com" },
        { nama: "Presenter 2", email: "presenter2@email.com" },
      ],
      "Sumber Informasi": [
        { sumber: "Instagram" },
        { sumber: "Website" },
      ],
      "Prasyarat Formulir": [
        { syarat: "Ijazah SMA" },
        { syarat: "KTP" },
      ],
      "Formulir PMB": [
        { nama: "Formulir A", harga: 250000 },
        { nama: "Formulir B", harga: 300000 },
      ],
      "Komponen USM": [
        { komponen: "Tes Tulis" },
        { komponen: "Wawancara" },
      ],
      "Prodi-USM": [
        { prodi: "Teknik Informatika" },
        { prodi: "Manajemen" },
      ],
      "Prodi-Wawancara": [
        { prodi: "Teknik Mesin" },
        { prodi: "Akuntansi" },
      ],
      "Status Awal": [
        { status: "Baru" },
        { status: "Pindahan" },
      ],
      "PMB Grade": [
        { grade: "A" },
        { grade: "B" },
      ],
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Permission ${user ? user.name : "User"}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {/* Tab Navigation */}
                <div className="flex flex-nowrap gap-1 border-b border-gray-200 dark:border-gray-700 mb-4 overflow-x-auto whitespace-nowrap">
                  {tabs.map((tab) => (
                    <button
                      key={tab.label}
                      onClick={() => setActiveTab(tab.label)}
                      className={
                        (activeTab === tab.label
                          ? "bg-primary text-white"
                          : "bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800") +
                        " text-sm px-3 py-1 rounded-t-md font-medium transition-colors"
                      }
                      style={{ minWidth: 0 }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                {/* Action Buttons */}
                <div className="flex gap-2 mb-4">
                  <Button type="button" url="" className="bg-primary text-white">Tambah Gelombang</Button>
                  <Button type="button" url="" className="bg-gray-400 text-white">Refresh</Button>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {activeTab}
                            </CardTitle>
                        </CardHeader>
                        {/* Konten tab */}
                        <div className="p-4">
                          {activeTab === "Gelombang PMB" && (
                            <>
                              <form onSubmit={e => {
                                e.preventDefault();
                                router.get(
                                  route('kapmb.setup-pmb.index'),
                                  { search },
                                  {
                                    preserveState: true,
                                    replace: true,
                                    only: ['gelombang'],
                                  }
                                );
                              }} className="mb-2 flex gap-2">
                                <input
                                  type="text"
                                  value={search}
                                  onChange={e => setSearch(e.target.value)}
                                  placeholder="Cari gelombang..."
                                  className="border px-2 py-1 rounded"
                                />
                                <Button type="submit" url="" className="bg-primary text-white">Cari</Button>
                              </form>
                              <table className="min-w-full border">
                                <thead>
                                  <tr>
                                    <th className="border px-2 py-1">#</th>
                                    <th className="border px-2 py-1">Nama</th>
                                    <th className="border px-2 py-1">Tahun</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {gelombang.length === 0 ? (
                                    <tr><td colSpan={3} className="text-center">Tidak ada data</td></tr>
                                  ) : (
                                    gelombang.map((row: { id: number; nama: string; tahun: number }, idx: number) => (
                                      <tr key={row.id}>
                                        <td className="border px-2 py-1">{idx + 1}</td>
                                        <td className="border px-2 py-1">{row.nama}</td>
                                        <td className="border px-2 py-1">{row.tahun}</td>
                                      </tr>
                                    ))
                                  )}
                                </tbody>
                              </table>
                            </>
                          )}
                          {activeTab === "Daftar Presenter" && (
                            <table className="min-w-full">
                              <thead><tr><th>Nama</th><th>Email</th></tr></thead>
                              <tbody>
                                {dummyData["Daftar Presenter"].map((row, idx) => (
                                  <tr key={idx}><td>{row.nama}</td><td>{row.email}</td></tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                          {activeTab === "Sumber Informasi" && (
                            <table className="min-w-full">
                              <thead><tr><th>Sumber</th></tr></thead>
                              <tbody>
                                {dummyData["Sumber Informasi"].map((row, idx) => (
                                  <tr key={idx}><td>{row.sumber}</td></tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                          {activeTab === "Prasyarat Formulir" && (
                            <table className="min-w-full">
                              <thead><tr><th>Prasyarat</th></tr></thead>
                              <tbody>
                                {dummyData["Prasyarat Formulir"].map((row, idx) => (
                                  <tr key={idx}><td>{row.syarat}</td></tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                          {activeTab === "Formulir PMB" && (
                            <table className="min-w-full">
                              <thead><tr><th>Nama</th><th>Harga</th></tr></thead>
                              <tbody>
                                {dummyData["Formulir PMB"].map((row, idx) => (
                                  <tr key={idx}><td>{row.nama}</td><td>{row.harga}</td></tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                          {activeTab === "Komponen USM" && (
                            <table className="min-w-full">
                              <thead><tr><th>Komponen</th></tr></thead>
                              <tbody>
                                {dummyData["Komponen USM"].map((row, idx) => (
                                  <tr key={idx}><td>{row.komponen}</td></tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                          {activeTab === "Prodi-USM" && (
                            <table className="min-w-full">
                              <thead><tr><th>Prodi</th></tr></thead>
                              <tbody>
                                {dummyData["Prodi-USM"].map((row, idx) => (
                                  <tr key={idx}><td>{row.prodi}</td></tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                          {activeTab === "Prodi-Wawancara" && (
                            <table className="min-w-full">
                              <thead><tr><th>Prodi</th></tr></thead>
                              <tbody>
                                {dummyData["Prodi-Wawancara"].map((row, idx) => (
                                  <tr key={idx}><td>{row.prodi}</td></tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                          {activeTab === "Status Awal" && (
                            <table className="min-w-full">
                              <thead><tr><th>Status</th></tr></thead>
                              <tbody>
                                {dummyData["Status Awal"].map((row, idx) => (
                                  <tr key={idx}><td>{row.status}</td></tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                          {activeTab === "PMB Grade" && (
                            <table className="min-w-full">
                              <thead><tr><th>Grade</th></tr></thead>
                              <tbody>
                                {dummyData["PMB Grade"].map((row, idx) => (
                                  <tr key={idx}><td>{row.grade}</td></tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
