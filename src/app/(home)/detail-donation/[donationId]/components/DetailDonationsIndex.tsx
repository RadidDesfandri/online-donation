"use client";

import Boxtag from "@/components/Boxtag";
import Button from "@/components/buttons/Button";
import ButtonIcon from "@/components/buttons/ButtonIcon";
import { useGetDetailDonation } from "@/hooks/donations/useGetDetailDonation";
import { upperCaseFirstLetter } from "@/lib/uppareCaseFirstLetter";
import clsx from "clsx";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHandHoldingHeart } from "react-icons/fa";
import { IoBookmarks, IoShareSocialOutline } from "react-icons/io5";
import DonationInteractionCard from "./DonationInteractionCard";
import LoadingSkeletonDetailDonation from "./LoadingSkeletonDetailDonation";

const DetailDonationsIndex = ({ donationId }: { donationId: string }) => {
  const { data: donationData, isPending } = useGetDetailDonation(donationId);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      const ifScroll = window.scrollY;
      setIsScrolled(ifScroll > 360);
    };

    window.addEventListener("scroll", checkScroll);

    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  if (isPending) return <LoadingSkeletonDetailDonation />;

  if (!donationData) return notFound();

  return (
    <>
      <Image
        width={1300}
        height={1000}
        alt="donate"
        priority
        src={donationData?.thumbnail || "/non-image.png"}
        className={clsx(
          "h-60 w-full md:h-[450px]",
          donationData?.thumbnail ? "object-cover" : "object-none",
        )}
      />
      <div className="w-full border-t border-gray-400" />

      <div className="mx-auto w-full max-w-5xl px-5 pb-14 md:flex md:justify-between md:gap-x-4">
        <div className="my-5 flex w-full items-center justify-end gap-x-3 md:hidden">
          <ButtonIcon variant="green" icon={IoBookmarks} size={15} />
          <Button outline autoPadding type="button">
            <IoShareSocialOutline />
            <p>Bagikan</p>
          </Button>
          <Button secondary autoPadding type="button">
            <FaHandHoldingHeart />
            <p>Donasi</p>
          </Button>
        </div>

        {isScrolled && (
          <div className="fixed bottom-0 left-0 block w-full bg-amber-400 transition-all duration-300 md:hidden">
            ACTIVEEEE
          </div>
        )}

        <div id="detail-donate" className="mt-6 md:mt-4 md:min-w-[65%]">
          <h1 className="font-montserrat text-xl font-bold md:text-4xl">
            {upperCaseFirstLetter(donationData?.title || "...")}
          </h1>
          <div className="mt-2 mb-4 flex flex-wrap items-center gap-1 md:gap-2">
            {donationData?.tag.map((tag, idx) => {
              return <Boxtag key={`Tag-${tag}-${idx}`} text={tag} />;
            })}
          </div>
          <div
            className="ProseMirror font-montserrat"
            dangerouslySetInnerHTML={{
              __html: donationData?.content || "<p>...</p>",
            }}
          />
        </div>

        <DonationInteractionCard donationId={donationId} />
      </div>
    </>
  );
};

export default DetailDonationsIndex;
