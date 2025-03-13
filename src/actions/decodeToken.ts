interface RequestUser {
  email: string;
}

export const decodeToken = async (req: Request) => {
  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return { error: "Token notfound", status: 401 };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      },
    },
  );

  const data: RequestUser = await response.json();

  if (!response.ok) {
    return {
      error: "Invalid Token",
      status: 401,
    };
  }

  return { user: data };
};
