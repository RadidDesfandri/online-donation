import { getToken } from "@/lib/supabase/getToken";
import React from "react";

const page = async () => {
  const token = await getToken();
  return <div>{token}</div>;
};

export default page;
