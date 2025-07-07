"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { type BreadcrumbItem } from "@/types";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Dummy Data for Analytics and Chart
const stats = [
  { title: "Total Sales", value: "$10,200" },
  { title: "Total Products", value: "150" },
  { title: "Active Users", value: "1,024" },
];

const lineChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], // Months
  datasets: [
    {
      label: "Sales Growth",
      data: [1200, 1900, 3000, 2500, 3500, 4500, 5000], // Sales data for each month
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      tension: 0.1,
    },
  ],
};

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard", href: "/dashboard" },
];

export default function Dashboard() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        {/* Stats Section */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-6">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <h3 className="text-lg font-semibold">{stat.title}</h3>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Line Chart for Sales Growth */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Sales Growth Over Time</h2>
          <Line data={lineChartData} />
        </div>

        {/* Products Table Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-semibold">Product List</h2>
            <Button type="add" url="/products/create" className="bg-blue-500 text-white">
              Add New Product
            </Button>
          </div>

          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lineChartData.labels.map((month, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{`Product ${index + 1}`}</td>
                  <td className="py-2 px-4">${(index + 1) * 100}</td>
                  <td className="py-2 px-4">{index % 2 === 0 ? "In Stock" : "Out of Stock"}</td>
                  <td className="py-2 px-4">
                    <Button className="text-sm bg-green-500 text-white">Edit</Button>
                    <Button className="text-sm bg-red-500 text-white ml-2">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <Button className="px-4 py-2 border rounded-md">Previous</Button>
          <Button className="px-4 py-2 border rounded-md ml-2">Next</Button>
        </div>
      </div>
    </AppLayout>
  );
}
