import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

import axios from "axios";
import Toast from "react-native-toast-message";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { axiosErrorHandler } from "~/functions/axiosErrorHandler";

import {
  MyQueryInterface,
  UserGoogleProps,
  UserProps,
} from "~/interfaces/User.interface";
import { CourseInterface } from "~/interfaces/Course.interface";
import { FavoriteBusStopInterface } from "~/interfaces/FavoriteBusStop.interface";

import api from "~/services/axios";

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
  updateUser: (user: MyQueryInterface) => Promise<void>;
  getRefreshToken: () => void;
  updateUserFavorites: (user: MyQueryInterface) => Promise<void>;
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
  updateUser: async () => {},
  getRefreshToken: () => {},
  updateUserFavorites: async () => {},
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
            refresh_token: googleData?.data?.refresh_token,
          };

          api.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${parsedData?.token}`;
            return config;
          });

          api.interceptors.response.use(
            (response) => {
              return response;
            },
            async (error) => {
              if (error.response.status === 401) {
                await signOut();
              }
              return Promise.reject(error);
            }
          );

          await AsyncStorage.setItem("@user", JSON.stringify(parsedData?.user));
          await AsyncStorage.setItem(
            "@token",
            JSON.stringify(parsedData.token)
          );
          await AsyncStorage.setItem(
            "@refresh_token",
            JSON.stringify(parsedData.refresh_token)
          );

          setUser(parsedData);

          Toast.show({
            type: "success",
            text1: "Login feito com sucesso",
          });
          return parsedData;
        }
      }
      return null;
    } catch (error) {
      const errorMessage = axiosErrorHandler(error);

      console.error(errorMessage);

      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Erro ao fazer login com o Google",
      });
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

      api.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${data?.data?.token}`;
        return config;
      });

      const parsedData: UserProps = {
        token: data?.data?.token,
        user: data?.data?.user,
        refresh_token: data?.data?.refresh_token,
      };

      await AsyncStorage.setItem("@user", JSON.stringify(parsedData?.user));
      await AsyncStorage.setItem("@token", JSON.stringify(parsedData.token));
      await AsyncStorage.setItem(
        "@refresh_token",
        JSON.stringify(parsedData.refresh_token)
      );

      setUser(parsedData);

      Toast.show({
        type: "success",
        text1: "Login feito com sucesso",
      });

      return data;
    } catch (error) {
      setUser(null);
      const errorMessage = axiosErrorHandler(error);

      console.error(errorMessage);

      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Erro ao fazer login",
      });

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
      await AsyncStorage.removeItem("@refreshToken");

      Toast.show({
        type: "success",
        text1: "Deslogado com sucesso!",
      });
    } catch (error) {
      setUser(null);
      console.error(error);
    }
  };

  const loadUser = async () => {
    try {
      setLoading(true);
      const getUser = await AsyncStorage.getItem("@user");
      const getToken = await AsyncStorage.getItem("@token");
      const getRefreshToken = await AsyncStorage.getItem("@refresh_token");

      if (getUser && getToken && getRefreshToken) {
        const parsedUser = {
          user: JSON.parse(getUser),
          token: JSON.parse(getToken),
          refresh_token: JSON.parse(getRefreshToken),
        };

        setUser(parsedUser);
      }
    } catch (error) {
      setUser(null);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updatedUser: MyQueryInterface) => {
    try {
      setLoading(true);

      const parsedData: UserProps = {
        token: user?.token ?? "",
        user: {
          ...user?.user,
          ...updatedUser?.data,
        },
        refresh_token: user?.refresh_token ?? "",
      };

      await AsyncStorage.setItem("@user", JSON.stringify(parsedData));

      setUser(parsedData);

      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2: "Usuário atualizado com sucesso",
      });
    } catch (error) {
      setUser(null);
      console.error(error);

      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2: "Usuário atualizado com sucesso",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserFavorites = async (updatedUser: MyQueryInterface) => {
    try {
      setLoading(true);

      let favorites = [];

      if (user?.user?.driver) {
        const { data } = await api.get<CourseInterface>(
          `/user/favorite/courses?orderAsc=desc`
        );

        favorites = data?.data;
      } else {
        const { data } = await api.get<FavoriteBusStopInterface>(
          `/user/favorite/bus-stop?orderAsc=desc`
        );
        favorites = data?.data;
      }

      const parsedData: UserProps = {
        token: user?.token ?? "",
        user: {
          ...user?.user,
          ...updatedUser?.data,
        },
        refresh_token: user?.refresh_token ?? "",
      };

      await AsyncStorage.setItem("@user", JSON.stringify(parsedData));

      setUser(parsedData);

      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2: "Favoritos atualizados com sucesso",
      });
    } catch (error) {
      setUser(null);
      console.error(error);

      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Ocorreu um erro ao atualizar os favoritos",
      });
    } finally {
      setLoading(false);
    }
  };

  const getRefreshToken = async () => {
    try {
      const { data } = await api.post("/user/session/refresh", {
        refresh_token: user?.refresh_token,
      });

      if (data) {
        api.defaults.headers.common["Authorization"] = `Bearer ${data?.token}`;

        await AsyncStorage.setItem("@token", JSON.stringify(data.token));
        setUser((state) => state && { ...state, token: data?.token });

        // Alert.alert("Token atualizado com sucesso");
      }
    } catch (error) {
      signOut();
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
        updateUser,
        updateUserFavorites,
        getRefreshToken,
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
