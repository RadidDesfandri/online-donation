import { decodeToken } from "@/actions/decodeToken";
import prisma from "@/lib/prismadb";

export const getUserId = async (req: Request) => {
  const { user, error, status } = await decodeToken(req);

  if (error) return { error: true, message: error, status };

  const findUser = await prisma.user.findUnique({
    where: {
      email: user?.email,
    },
  });

  if (!findUser) return { error: true, message: "User not found", status: 404 };

  return { userId: findUser.id, role: findUser.role };
};
