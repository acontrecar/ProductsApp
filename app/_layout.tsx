import { Slot } from "expo-router";
import { StyleSheet, useColorScheme, View } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import React from "react";
import { AuthProvider } from "../src/providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function _layout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? eva.dark : eva.light;

  return (
    <QueryClientProvider client={queryClient}>
      <IconRegistry icons={EvaIconsPack} />

      <AuthProvider>
        <ApplicationProvider {...eva} theme={theme}>
          <View style={styles.container}>
            <Slot />
          </View>
        </ApplicationProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Asegura que el layout ocupe toda la pantalla
    //backgroundColor: "#FFF", // Fondo global
    //justifyContent: "center",
    //alignItems: "center",
  },
});
