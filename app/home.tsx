import { Button, Layout, Text } from "@ui-kitten/components";
import { MyIcon } from "../src/presentation/components/ui/MyIcon";
import { useAuthStore } from "../src/presentation/store/auth/useAuthStore";
import { getProductsyPage } from "../src/action/products/get-products-by-page";

export default function HomeScreen() {
  const { logOut } = useAuthStore();

  getProductsyPage(0);

  return (
    <Layout>
      <Text>HomeScreen</Text>
      <Layout>
        <Button
          accessoryLeft={<MyIcon name="lock-outline" white />}
          onPress={logOut}
        >
          Cerrar sesion
        </Button>
      </Layout>
    </Layout>
  );
}
