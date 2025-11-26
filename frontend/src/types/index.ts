declare global {
  type User = {
    _id: string;
    firstName: string;
    lastName: string;
    street: string;
    streetNumber: string;
    city: string;
    postalCode: string;
    phone: string;
    email: string;
    roles: string[];
    createdAt?: string;
    updatedAt?: string;
    tokenVersion?: number;
    __v?: number;
  };

  type Category = {
    _id: string;
    categoryName: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  };

  type Characteristic = {
    _id: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  };

  type Animal = {
    _id: string;
    name: string;
    description?: string;
    age?: number | string;
    sex?: "männlich" | "weiblich" | "unbekannt";
    race?: string;
    image_url?: string[]; // URLs
    owner?: User | string; // full user or user id
    category?: Category | string;
    characteristics?: Characteristic[] | string[];
    handycap?: boolean;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  };

  type Message = {
    _id: string;
    message: string;
    sender: User | string;
    animal: Animal | string;
    status: "active" | "revoked" | "declined" | "archived";
    // Mongoose may add these — keep optional if present
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  };

  type LoginInput = { email: string; password: string };

  type AuthContextType = {
    signedIn: boolean;
    user: User | null;
    handleSignIn: ({ email, password }: LoginInput) => Promise<void>;
    handleSignOut: () => Promise<void>;
  };
}
