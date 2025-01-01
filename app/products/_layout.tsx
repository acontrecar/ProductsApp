import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";

export default function ProductsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="home" // Esto establece la ruta inicial al login
    />
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1, // Asegura que el contenedor ocupe toda la pantalla
    // backgroundColor: "#FFF", // Fondo coherente con el fondo global
  },
});
