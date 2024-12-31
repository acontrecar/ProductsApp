import { Redirect } from "expo-router";
import { LoginScreen } from "../src/presentation/screens/auth/LoginScreen";
import { ProductsApp } from "../src/ProductsApp";

export default function index() {
  return (
    // <Layout>
    //   <Text>HomeScreen</Text>

    //   {/* <Icon name="facebook" /> */}

    //   <Button accessoryLeft={<Icon name="facebook" />}>Cerrar Sesion</Button>
    // </Layout>
    // <ProductsApp />
    <Redirect href="loading" />
  );
}
