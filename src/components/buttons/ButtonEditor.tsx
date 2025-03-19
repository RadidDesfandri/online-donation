import { Editor } from "@tiptap/react";
import clsx from "clsx";
import { ReactNode } from "react";

interface ButtonEditorProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
  editor: Editor;
  type: string;
  heading?: number;
}

const ButtonEditor: React.FC<ButtonEditorProps> = ({
  onClick,
  children,
  className,
  editor,
  type,
  heading,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg p-1",
        editor.isActive(type, heading && { level: heading })
          ? "bg-primaryGreen font-bold text-white"
          : "font-normal text-black",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default ButtonEditor;
