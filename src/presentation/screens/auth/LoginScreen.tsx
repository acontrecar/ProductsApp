import { Button, Input, Layout, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { Alert, ScrollView, useWindowDimensions } from "react-native";
import { MyIcon } from "../../components/ui/MyIcon";
import { useRouter } from "expo-router";
import getEnvVars from "../../../../constants/api";
import { useAuthStore } from "../../store/auth/useAuthStore";

export const LoginScreen = () => {
  const { height } = useWindowDimensions();
  const router = useRouter();

  // const { API_URL } = getEnvVars();
  const { login } = useAuthStore();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isPosting, setIsPosting] = useState(false);

  const onLogin = async () => {
    if (form.email === "" || form.password === "") {
      return;
    }

    setIsPosting(true);

    const wasSuccessful = await login(form.email, form.password);

    setIsPosting(false);

    if (wasSuccessful) {
      router.push("home");
      return;
    }

    Alert.alert("Error", "Credenciales incorrectas", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };

  return (
    <Layout style={{ marginHorizontal: 20 }}>
      <ScrollView>
        <Layout style={{ paddingTop: height * 0.35 }}>
          <Text category="h1">Ingresar</Text>
          <Text category="p2">Por favor, ingrese para continuar</Text>
        </Layout>

        <Layout style={{ marginTop: 20 }}>
          <Input
            placeholder="Correo electronico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(email) => setForm({ ...form, email })}
            accessoryLeft={<MyIcon name="email-outline" />}
            style={{ marginBottom: 10 }}
          />

          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            secureTextEntry
            value={form.password}
            onChangeText={(password) => setForm({ ...form, password })}
            accessoryLeft={<MyIcon name="lock-outline" />}
            style={{ marginBottom: 10 }}
          />
        </Layout>

        <Layout style={{ height: 20 }}></Layout>

        <Layout>
          <Button
            disabled={isPosting}
            accessoryRight={<MyIcon name="arrow-forward-outline" white />}
            onPress={onLogin}
          >
            Ingresar
          </Button>
        </Layout>

        <Layout style={{ height: 20 }}></Layout>

        <Layout
          style={{
            alignItems: "flex-end",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text>No tienes cuenta?</Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => router.push("register")}
          >
            Crea una
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

// const styles = StyleSheet.create({});
