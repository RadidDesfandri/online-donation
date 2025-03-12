import { getSession } from "@/actions/getSession";

const page = async () => {
  const token = await getSession();
  console.log(token?.access_token);
  return <div>{token?.user.email}</div>;
};

export default page;
