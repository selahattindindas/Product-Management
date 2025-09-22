export interface User {
  id: number;
  email: string;
  fullName: string;
  role: string;
  createdAt: string;
}

export interface UserPayload {
  fullName: string;
  email: string;
  role?: string;
}


