import { FiInbox } from "react-icons/fi";

interface EmptyProps {
  sizeIcon?: number;
  text: string;
}

const Empty: React.FC<EmptyProps> = ({ sizeIcon = 30, text }) => {
  return (
    <div className="my-10 flex w-full cursor-default flex-col items-center justify-center text-gray-700">
      <FiInbox size={sizeIcon} />
      <p>{text}</p>
    </div>
  );
};

export default Empty;
