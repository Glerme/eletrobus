import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

import axios from "axios";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { axiosErrorHandler } from "~/functions/axiosErrorHandler";

import { UserGoogleProps, UserProps } from "~/interfaces/User.interface";

import { api } from "~/services/axios";

interface AuthContextProps {
  user: UserProps | null;
  signIn: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<UserProps | null>;
  signOut: () => void;
  loading: boolean;
  handleGoogleLogin: () => Promise<UserProps | null>;
  loadUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  signIn: async ({ email, password }) => {
    return null;
  },
  signOut: () => {},
  user: null,
  loading: true,
  handleGoogleLogin: async () => {
    return null;
  },
  loadUser: async () => {},
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
  const [user, setUser] = useState<UserProps | null>(null);
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

      if (type === "success") {
        const { data } = await axios.get<UserGoogleProps>(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );

        if (data) {
          const { data: googleData } = await api.post("/google/session", {
            user_token: params.access_token,
          });

          const parsedData: UserProps = {
            token: googleData?.data?.token,
            user: googleData?.data?.user,
          };

          console.log("GOOGLE", JSON.stringify(parsedData, null, 2));

          await AsyncStorage.setItem("@user", JSON.stringify(parsedData));
          await AsyncStorage.setItem(
            "@token",
            JSON.stringify(parsedData.token)
          );

          setUser(parsedData);
          return parsedData;
        }
      }
      return null;
    } catch (error) {
      const errorMessage = axiosErrorHandler(error);

      console.error(errorMessage);
      Alert.alert("Erro ao fazer login com o Google:", errorMessage?.message);
      return null;
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

      const { data } = await api.post("/user/session", {
        email,
        password,
      });

      console.log(JSON.stringify(data, null, 2));

      const parsedData: UserProps = {
        token: data?.data?.token,
        user: data?.data?.user,
      };

      await AsyncStorage.setItem("@user", JSON.stringify(parsedData));
      await AsyncStorage.setItem("@token", JSON.stringify(parsedData.token));

      setUser(parsedData);
      return data;
    } catch (error) {
      setUser(null);
      const errorMessage = axiosErrorHandler(error);

      console.error(errorMessage);
      Alert.alert("Erro ao fazer login", errorMessage?.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem("@user");
      await AsyncStorage.removeItem("@token");
    } catch (error) {
      setUser(null);
      console.error(error);
    }
  };

  const loadUser = async () => {
    try {
      setLoading(true);

      const getUser = await AsyncStorage.getItem("@user");

      if (getUser) {
        console.log("GET USER", JSON.stringify(getUser, null, 2));
        setUser(JSON.parse(getUser));
      }
    } catch (error) {
      setUser(null);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        signIn,
        signOut,
        handleGoogleLogin,
        loadUser,
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
