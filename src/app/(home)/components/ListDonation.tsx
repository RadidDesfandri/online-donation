import { DUMMY_ITEMS } from "@/constanst/dummy";
import React from "react";
import CardDonation from "./CardDonation";

const ListDonation = () => {
  return (
    <div className="grid grid-cols-1 place-content-center gap-4 md:grid-cols-2 lg:grid-cols-3">
      {DUMMY_ITEMS.map((item, idx) => {
        return (
          <CardDonation
            key={idx}
            id={item.id}
            header={item.header}
            thumbnail={item.thumbnail}
            totalAmount={item.totalAmount}
            tagline={item.tagline}
          />
        );
      })}
    </div>
  );
};

export default ListDonation;
