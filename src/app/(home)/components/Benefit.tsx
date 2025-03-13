import Image from "next/image";
import CardBenefit from "./CardBenefit";
import { BENEFIT_ITEMS } from "@/constanst/benefit";

const Benefit = () => {
  const leftCard = BENEFIT_ITEMS.slice(0, 2);
  const rightCard = BENEFIT_ITEMS.slice(2, 4);

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <h1 className="font-robotoSlab text-center text-3xl font-medium md:text-5xl">
        Kenapa <span className="text-primaryGreen">Berdonasi</span> Bersama
        Kami?
      </h1>

      <div className="mt-12 grid grid-cols-1 space-y-4 md:grid-cols-3 md:space-y-0 md:space-x-4">
        <div className="flex flex-col space-y-4">
          {leftCard.map((item) => {
            return (
              <CardBenefit
                key={item.tittle}
                icon={item.icon}
                tittle={item.tittle}
                description={item.description}
              />
            );
          })}
        </div>

        <div className="bg-primaryGreen relative hidden overflow-hidden rounded-xl md:block">
          <Image
            alt="Benefit"
            width={400}
            height={200}
            src={"/home/benefitcard.jpg"}
            className="h-[337px] object-cover"
          />
          <div className="bg-primaryGreen/10 absolute top-0 h-full w-full p-2" />
        </div>

        <div className="flex flex-col space-y-4">
          {rightCard.map((item) => {
            return (
              <CardBenefit
                key={item.tittle}
                icon={item.icon}
                tittle={item.tittle}
                description={item.description}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Benefit;
