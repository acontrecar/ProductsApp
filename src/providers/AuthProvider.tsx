import { useRouter } from "expo-router";
import React, { PropsWithChildren, useEffect } from "react";
import { Text, View } from "react-native";
import { useAuthStore } from "../presentation/store/auth/useAuthStore";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { checkStatus, status } = useAuthStore();

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  useEffect(() => {
    if (status !== "cheking") {
      if (status === "authenticated") {
        router.push("home");
      } else {
        router.push("login");
      }
    }
  }, [status, router]);

  return <>{children}</>;
};
