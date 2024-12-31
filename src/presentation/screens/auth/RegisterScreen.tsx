import { Button, Input, Layout, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { Alert, ScrollView, useWindowDimensions } from "react-native";
import { MyIcon } from "../../components/ui/MyIcon";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../store/auth/useAuthStore";

export const RegisterScreen = () => {
  const { height } = useWindowDimensions();
  const router = useRouter();

  const { register } = useAuthStore();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [isPosting, setIsPosting] = useState(false);

  const onRegister = async () => {
    if (form.email === "" || form.password === "" || form.fullName === "") {
      return;
    }

    setIsPosting(true);

    const wasSuccessful = await register(
      form.fullName,
      form.email,
      form.password
    );

    console.log({ wasSuccessful });

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
        <Layout style={{ paddingTop: height * 0.3 }}>
          <Text category="h1">Crear cuenta</Text>
          <Text category="p2">Por favor, crea una cuenta para continuar</Text>
        </Layout>

        <Layout style={{ marginTop: 20 }}>
          <Input
            placeholder="Nombre completo"
            accessoryLeft={<MyIcon name="person-outline" />}
            style={{ marginBottom: 10 }}
            value={form.fullName}
            onChangeText={(fullName) => setForm({ ...form, fullName })}
          />

          <Input
            placeholder="Correo electronico"
            keyboardType="email-address"
            autoCapitalize="none"
            accessoryLeft={<MyIcon name="email-outline" />}
            style={{ marginBottom: 10 }}
            value={form.email}
            onChangeText={(email) => setForm({ ...form, email })}
          />

          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            secureTextEntry
            accessoryLeft={<MyIcon name="lock-outline" />}
            style={{ marginBottom: 10 }}
            value={form.password}
            onChangeText={(password) => setForm({ ...form, password })}
          />
        </Layout>

        <Layout style={{ height: 20 }}></Layout>

        <Layout>
          <Button
            accessoryRight={<MyIcon name="arrow-forward-outline" white />}
            disabled={isPosting}
            onPress={onRegister}
          >
            Crear
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
          <Text>Ya tienes cuenta?</Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => router.push("/login")}
          >
            Ingrese
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

// const styles = StyleSheet.create({});
