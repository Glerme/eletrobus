import { createContext, useContext, useState } from "react";
import { Alert } from "react-native";

import axios from "axios";
import * as AuthSession from "expo-auth-session";

import { axiosErrorHandler } from "~/functions/axiosErrorHandler";

import { UserProps } from "~/interfaces/User.interface";
import { TabRouter } from "@react-navigation/native";

import { api } from "~/services/axios";

interface AuthContextProps {
  // user: UserProps | null;
  user: { driver: boolean } | null;
  signIn: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  signOut: () => void;
  loading: boolean;
  handleGoogleLogin: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  signIn: async ({ email, password }) => {},
  signOut: () => {},
  user: null,
  loading: true,
  handleGoogleLogin: async () => {},
});

interface AuthResponse {
  params: {
    access_token: string;
  };
  type: string;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const CLIENT_ID = process.env.EXPO_PUBLIC_CLIENT_ID;
  const REDIRECT_URI = process.env.EXPO_PUBLIC_REDIRECT_URI;
  const SCOPE = encodeURI(process.env.EXPO_PUBLIC_SCOPE ?? "profile email");
  const RESPONSE_TYPE = process.env.EXPO_PUBLIC_RESPONSE_TYPE;

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

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

        //enviar dados para cadastro

        setUser(data);
        console.log(data);
      }
    } catch (error) {
      console.log("Error ao fazer login com o Google: ", error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);

      const { data } = await api.post("/user/session", { email, password });

      if (data) {
        setUser(data);
        return data;
      }
    } catch (error) {
      setUser(null);
      const errorMessage = axiosErrorHandler(error);

      console.error(errorMessage);

      Alert.alert("Erro ao fazer login", errorMessage?.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    try {
      setUser(null);
    } catch (error) {
      setUser(null);
      console.error(error);
    }
  };

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
