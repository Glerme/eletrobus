import { createContext, useContext, useState } from "react";

import axios from "axios";
import * as AuthSession from "expo-auth-session";

import { UserProps } from "~/interfaces/User.interface";

interface AuthContextProps {
  user: UserProps | null;
  signIn: () => Promise<void>;
  signOut: () => void;
  loading: boolean;
  handleGoogleLogin: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  signIn: async () => {},
  signOut: () => {},
  user: null,
  loading: true,
  handleGoogleLogin: async () => {},
});

type AuthResponse = {
  params: {
    access_token: string;
  };
  type: string;
};

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const CLIENT_ID = process.env.CLIENT_ID;
  const REDIRECT_URI = process.env.REDIRECT_URI;
  const SCOPE = encodeURI(process.env.SCOPE ?? "profile email");
  const RESPONSE_TYPE = process.env.RESPONSE_TYPE;

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

  const handleGoogleLogin = async () => {
    try {
      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthResponse;

      console.log({
        type,
        params,
      });

      if (type === "success") {
        const { data } = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );

        setUser(data);
        console.log(data);
      }
    } catch (error) {
      console.log("Error ao fazer login com o Google: ", error);
    }
  };

  const signIn = async () => {};

  const signOut = () => {};

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        signIn,
        signOut,
        handleGoogleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthContext");
  }

  return context;
};
