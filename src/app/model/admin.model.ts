// admin.model.ts
export interface Admin {
  id: number;
  name: string;
  mobileNo: string;
  username: string;
  password: string;
  email: string;
  profilePicture: string | null;
}
