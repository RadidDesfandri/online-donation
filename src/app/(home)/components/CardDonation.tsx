import Link from "next/link";
import Image from "next/image";
import { toRupiah } from "@/utils/toRupiah";
import Boxtag from "@/components/Boxtag";

interface CardDonationProps {
  id: string;
  thumbnail: string;
  header: string;
  totalAmount: number;
  tagline: { text: string }[];
}

const CardDonation: React.FC<CardDonationProps> = ({
  id,
  thumbnail,
  header,
  totalAmount,
  tagline,
}) => {
  const maxTag = tagline.slice(0, 3);

  return (
    <Link
      href={`/detail-donation/${id}`}
      className="rounded-lg border border-gray-300 px-2 py-2 shadow-md transition-all duration-300 hover:scale-[101%]"
    >
      <Image
        width={200}
        height={200}
        alt="Card donation"
        src={thumbnail}
        className="h-full max-h-48 w-full rounded-lg object-cover"
      />
      <h4 className="font-montserrat mt-2 mb-3 line-clamp-2 leading-5 font-semibold">
        {header}
      </h4>

      <div className="flex h-[50px] flex-wrap items-start gap-1">
        {maxTag.map((tag, idx) => {
          return <Boxtag text={tag.text} key={`Tag-${tag.text}-${idx}`} />;
        })}
        {tagline.length > 3 && <Boxtag text={`${tagline.length - 3}+`} />}
      </div>

      <div className="mt-1 text-xs font-medium">
        Terkumpul <span className="font-raleway">{toRupiah(totalAmount)}</span>
      </div>
    </Link>
  );
};

export default CardDonation;
