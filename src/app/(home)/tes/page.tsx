"use client";

import Button from "@/components/buttons/Button";
import { useToast } from "@/context/ToastContext";

const Pagess = () => {
  const { addToast } = useToast();
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Button
        type="button"
        secondary
        autoPadding
        onClick={() => addToast("Success, Please check your mail", "success")}
      >
        Click me
      </Button>
    </div>
  );
};

export default Pagess;
