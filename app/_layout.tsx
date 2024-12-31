import { Slot } from "expo-router";
import { StyleSheet, useColorScheme, View } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import React from "react";

export default function _layout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? eva.dark : eva.light;

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />

      <ApplicationProvider {...eva} theme={theme}>
        <View style={styles.container}>
          <Slot />
        </View>
      </ApplicationProvider>
    </>
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
