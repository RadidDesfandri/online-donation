import React from "react";
import { IconType } from "react-icons";

interface BenefitProps {
  icon: IconType;
  tittle: string;
  description: string;
}

const CardBenefit: React.FC<BenefitProps> = ({
  icon: Icon,
  tittle,
  description,
}) => {
  return (
    <div className="rounded-xl border border-gray-400 px-4 py-7">
      <Icon
        size={30}
        className="text-primaryGreen hover:text-secondaryGreen transition-all duration-200"
      />
      <h1 className="font-montserrat mt-4 font-semibold text-black">
        {tittle}
      </h1>
      <p className="font-montserrat text-xs text-gray-600">{description}</p>
    </div>
  );
};

export default CardBenefit;
