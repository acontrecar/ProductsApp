import { Button, Input, Layout, Text } from "@ui-kitten/components";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { MyIcon } from "../../components/ui/MyIcon";
import { Link, useRouter } from "expo-router";

export const LoginScreen = () => {
  const { height } = useWindowDimensions();
  const router = useRouter();

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
            accessoryLeft={<MyIcon name="email-outline" />}
            style={{ marginBottom: 10 }}
          />

          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            secureTextEntry
            accessoryLeft={<MyIcon name="lock-outline" />}
            style={{ marginBottom: 10 }}
          />
        </Layout>

        <Layout style={{ height: 20 }}></Layout>

        <Layout>
          <Button
            accessoryRight={<MyIcon name="arrow-forward-outline" white />}
            onPress={() => {}}
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
            onPress={() => router.push("/auth/register")}
          >
            Crea una
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

// const styles = StyleSheet.create({});
