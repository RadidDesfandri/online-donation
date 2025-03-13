"use client";

import { FILTER_ITEMS } from "@/constanst/filterbox";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import BoxFilter from "./BoxFilter";
import ListDonation from "./ListDonation";

const ListFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentFilter = searchParams.get("filter") || "";
  const contentRef = useRef<HTMLDivElement>(null);

  const handleFilterClick = (filterLabel: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("filter", filterLabel.toLowerCase());
    router.push(`?${params.toString()}`, { scroll: false });

    setTimeout(() => {
      contentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col px-5 py-4">
      <div
        ref={contentRef}
        className="flex w-full items-center gap-x-5 overflow-x-auto px-2 py-5 md:justify-center"
      >
        {FILTER_ITEMS.map((item, idx) => (
          <BoxFilter
            key={idx}
            image={item.image}
            label={item.label}
            onClick={() => handleFilterClick(item.label)}
            isActive={currentFilter === item.label.toLowerCase()}
          />
        ))}
      </div>

      <div className="mt-6">
        <ListDonation />
      </div>
    </div>
  );
};

export default ListFilter;
