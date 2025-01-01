import { useQueryClient } from "@tanstack/react-query";
import { Layout, Text } from "@ui-kitten/components";
import { useLocalSearchParams } from "expo-router";
import { Product } from "../../src/domain/entities/product";

export default function ProductScreen() {
  const { id } = useLocalSearchParams();
  const queryClient = useQueryClient();

  const product = queryClient
    .getQueryData<Product[]>(["products", "infinite"])
    ?.flat()
    .find((product) => product.id === id);

  if (!product) return null;

  return (
    <Layout>
      <Text>{product.description}</Text>
    </Layout>
  );
}
