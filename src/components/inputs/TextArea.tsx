import { Field, ErrorMessage } from "formik";
import clsx from "clsx";

interface TextAreaProps {
  name: string;
  id?: string;
  label?: string;
  error?: boolean;
  disabled?: boolean;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
  rows?: number;
}

const TextArea: React.FC<TextAreaProps> = ({
  name,
  id,
  label,
  error,
  disabled,
  placeholder,
  autoComplete,
  className,
  rows = 4,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1 block text-sm font-medium">
          {label}
        </label>
      )}
      <Field
        as="textarea"
        id={id}
        name={name}
        disabled={disabled}
        autoComplete={autoComplete}
        placeholder={placeholder}
        rows={rows}
        className={clsx(
          `disabled:hover:ring-primaryGreen bg-primaryGreen/20 mb-1 w-full rounded-lg px-4 py-3 text-sm transition-all duration-300 outline-none placeholder:text-sm focus:ring-1`,
          disabled && "opacity-55",
          error
            ? "ring-rose-500 ring-offset-rose-500"
            : "hover:ring-primaryGreen focus:ring-primaryGreen placeholder:text-gray-500",
          className,
        )}
      />
      {error && (
        <ErrorMessage
          name={name}
          component="div"
          className="text-[11px] text-red-500"
        />
      )}
    </div>
  );
};

export default TextArea;
