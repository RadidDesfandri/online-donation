import Image from "next/image";

interface AvatarProps {
  avatar?: string;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ avatar, onClick }) => {
  return (
    <Image
      width={100}
      height={100}
      alt="Avatar image"
      onClick={onClick}
      className="h-9 w-9 cursor-pointer rounded-full object-cover ring-2 ring-neutral-300 md:h-11 md:w-11"
      src={avatar || "/home/profileplaceholder.png"}
    />
  );
};

export default Avatar;
