"use client";

import Chart from "@/components/echarts/Chart";
import { useGetCurrentUser } from "@/hooks/auth/useGetCurrentUser";
import { useSession } from "@/hooks/auth/useSession";
import ListDonationProvider from "./ListDonationProvider";

const InnerDashboardProvider = () => {
  const { session } = useSession();
  const { data: userData } = useGetCurrentUser();

  const optionPie = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: Rp {c} ({d}%)",
    },
    legend: {
      left: "left",
      top: "top",
      orient: "vertical",
      padding: [0, 10],
    },
    series: [
      {
        name: "Kategori Donasi",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 15,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 150000000, name: "Bantuan Bencana" },
          { value: 90000000, name: "Pendidikan" },
          { value: 75000000, name: "Kesehatan" },
          { value: 50000000, name: "Panti Asuhan" },
        ],
      },
    ],
  };

  const colors = ["#27AE60", "#2980B9"];

  const optionBar = {
    color: colors,
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross" },
    },
    grid: { right: "15%", left: "20%", top: "25%" },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    xAxis: [
      {
        type: "category",
        axisTick: { alignWithLabel: true },
        // prettier-ignore
        data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "Total Donasi",
        position: "left",
        alignTicks: true,
        axisLine: { show: true, lineStyle: { color: colors[0] } },
        axisLabel: { formatter: "Rp {value}" },
      },
      {
        type: "value",
        name: "Jumlah Donatur",
        position: "right",
        alignTicks: true,
        axisLine: { show: true, lineStyle: { color: colors[1] } },
        axisLabel: { formatter: "{value} orang" },
      },
    ],
    series: [
      {
        name: "Total Donasi",
        type: "bar",
        // prettier-ignore
        data: [2000000, 4900000, 7000000, 23000000, 25600000, 76700000, 135600000, 162200000, 32600000, 20000000, 6400000, 3300000],
      },
      {
        name: "Jumlah Donatur",
        type: "bar",
        yAxisIndex: 1,
        // prettier-ignore
        data: [26, 59, 90, 264, 287, 707, 1756, 1822, 487, 188, 60, 23],
      },
    ],
  };

  if (session && userData?.role === "PROVIDER") {
    return (
      <div className="grid gap-2 md:grid-cols-5 md:gap-4">
        <div className="flex h-fit flex-col items-center justify-center text-white md:col-span-2 md:row-span-2 md:min-h-96">
          <Chart option={optionPie} />
        </div>
        <div className="flex h-fit flex-col items-center justify-center text-white md:col-span-3 md:col-start-3 md:row-span-2 md:min-h-96">
          <Chart option={optionBar} />
        </div>
        <div className="h-fit md:col-span-5 md:row-span-2 md:row-start-3">
          <h1 className="mb-3 text-2xl font-semibold">Donasi anda</h1>
          <ListDonationProvider />
        </div>
      </div>
    );
  }
};

export default InnerDashboardProvider;
