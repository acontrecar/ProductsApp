import { Redirect } from "expo-router";

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
