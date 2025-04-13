import Button from "@/components/buttons/Button";
import { useRouter } from "next/navigation";
import { CgDetailsMore } from "react-icons/cg";
import { FaHandHoldingHeart } from "react-icons/fa";
import { IoShareSocialOutline, IoBookmarksOutline } from "react-icons/io5";

interface DonationInteractionCardProps {
  donationId: string;
}

const DonationInteractionCard: React.FC<DonationInteractionCardProps> = ({
  donationId,
}) => {
  const router = useRouter();

  return (
    <div className="mt-4 hidden w-[80%] md:block">
      <div className="sticky top-3 w-full rounded-lg border bg-white px-3 py-5 text-black shadow-md">
        <h1 className="font-montserrat">
          Bersama, kita ciptakan dunia yang lebih baik. Ayo mulai perjalanan
          kebaikan ini sekarang!
        </h1>
        <div className="my-5 flex w-full items-center gap-x-3">
          <Button outline fullWidth autoPadding type="button">
            <IoShareSocialOutline />
            <p>Bagikan</p>
          </Button>
          <Button
            secondary
            fullWidth
            autoPadding
            type="button"
            onClick={() => router.push(`/form-payment/${donationId}`)}
          >
            <FaHandHoldingHeart />
            <p>Donasi</p>
          </Button>
        </div>
        <div className="flex items-center justify-center gap-x-6 border-t pt-4">
          <Button type="button">
            <IoBookmarksOutline />
            <p>Simpan</p>
          </Button>
          <Button type="button" onClick={() => router.push("#detail-donate")}>
            <CgDetailsMore />
            <p>Lihat detail</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DonationInteractionCard;
