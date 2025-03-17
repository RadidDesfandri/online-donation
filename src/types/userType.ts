export interface AllUserType {
  id: number;
  email: string;
  username: string;
  avatar: string;
  role: "USER" | "PROVIDER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
}
