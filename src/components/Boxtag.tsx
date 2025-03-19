import { upperCaseFirstLetter } from "@/lib/uppareCaseFirstLetter";

interface BoxtagProps {
  text: string;
}

const Boxtag: React.FC<BoxtagProps> = ({ text }) => {
  return (
    <div className="rounded-full bg-[#E2E2E2] px-2 text-center text-sm font-light text-[#434343]">
      {upperCaseFirstLetter(text)}
    </div>
  );
};

export default Boxtag;
