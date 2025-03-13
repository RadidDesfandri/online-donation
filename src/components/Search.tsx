import clsx from "clsx";
import { IoSearchOutline } from "react-icons/io5";

interface SearchProps {
  className?: string;
  withIcon?: boolean;
  autoFocus?: boolean;
}

const Search: React.FC<SearchProps> = ({ className, withIcon, autoFocus }) => {
  return (
    <div
      className={clsx(
        `ring-primaryGreen relative flex max-w-xl items-center justify-center rounded-full ring-2 md:w-full ${className}`,
        withIcon && "px-5",
      )}
    >
      {withIcon && <IoSearchOutline />}
      <input
        type="text"
        id="search"
        // onChange={onChange}
        placeholder="Cari sesuatu disini"
        autoComplete="off"
        autoFocus={autoFocus}
        className={clsx(
          `w-fit max-w-xl rounded-full bg-transparent px-3 py-1 text-sm outline-none md:w-full md:px-5 md:py-2`,
        )}
      />
    </div>
  );
};

export default Search;
