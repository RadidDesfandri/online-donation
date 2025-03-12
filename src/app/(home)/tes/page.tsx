import { getSession } from "@/actions/getSession";
import React from "react";

const page = async () => {
  const token = await getSession();
  return <div>{token?.user.email}</div>;
};

export default page;
