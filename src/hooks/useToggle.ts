import { useState } from "react";

export const useToggle = (initialValue: boolean = false) => {
  const [state, setState] = useState<boolean>(initialValue);

  const toggle = () => setState((prev) => !prev);

  return [state, toggle, setState] as const;
};
