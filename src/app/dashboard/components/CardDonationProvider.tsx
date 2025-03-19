import Boxtag from "@/components/Boxtag";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useToggle } from "@/hooks/useToggle";
import { toRupiah } from "@/utils/toRupiah";
import clsx from "clsx";
import Image from "next/image";
import { useRef } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import ConfrimDeleteDonation from "./ConfrimDeleteDonation";
import MenuItemsCardDonation from "./MenuItemsCardDonation";

interface CardDonationProviderProps {
  id: string;
  thumbnail: string;
  title: string;
  tags: string[];
  targetAmount: number;
}

const CardDonationProvider: React.FC<CardDonationProviderProps> = ({
  id,
  thumbnail,
  tags,
  title,
  targetAmount = 0,
}) => {
  const maxTag = tags.slice(0, 3);
  const [openDropdown, handleOpenDropdown] = useToggle();
  const [openModalDelete, handleOpenModalDelete] = useToggle();

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLButtonElement | null>(null);

  useClickOutside([dropdownRef, iconRef], handleOpenDropdown, openDropdown);

  const handleOpenModalConfirmDelete = () => {
    handleOpenDropdown();
    handleOpenModalDelete();
  };

  return (
    <div className="relative rounded-lg border border-gray-300 shadow-md transition-all duration-300">
      <div className="overflow-hidden">
        <Image
          width={200}
          height={200}
          alt="Card donation"
          src={thumbnail || "/non-image.png"}
          className={clsx(
            "h-40 w-full rounded-lg",
            thumbnail && "object-cover",
          )}
        />
      </div>

      <div className="px-2 py-1 pb-3">
        <h1 className="font-montserrat mt-2 mb-3 line-clamp-2 h-10 leading-5 font-semibold text-black">
          {title}
        </h1>
        <div className="flex h-[50px] flex-wrap items-start gap-1">
          {maxTag.map((tag, idx) => {
            return <Boxtag text={tag} key={`Tag-${tag}-${idx}`} />;
          })}
          {tags.length > 3 && <Boxtag text={`${tags.length - 3}+`} />}
        </div>
        <div className="mt-1 text-xs font-medium">
          Target donasi{" "}
          <span className="font-raleway">{toRupiah(targetAmount)}</span>
        </div>
      </div>

      <button
        ref={iconRef}
        onClick={handleOpenDropdown}
        className="absolute top-2 right-2 cursor-pointer rounded-full bg-neutral-900 p-1 text-white"
      >
        <SlOptionsVertical size={10} />
      </button>
      <MenuItemsCardDonation
        id={id}
        isOpen={openDropdown}
        ref={dropdownRef}
        handleOpenModalDelete={handleOpenModalConfirmDelete}
      />
      <ConfrimDeleteDonation
        id={id}
        title={title}
        isOpen={openModalDelete}
        onClose={handleOpenModalDelete}
      />
    </div>
  );
};

export default CardDonationProvider;
