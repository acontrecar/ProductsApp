import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  ButtonGroup,
  Input,
  Layout,
  Text,
  useTheme,
} from "@ui-kitten/components";
import { useLocalSearchParams } from "expo-router";
import { Product } from "../../src/domain/entities/product";
import { getProductById } from "../../src/action/products/get-product-by-id";
import { MainLayout } from "../../src/presentation/layouts/MainLayout";
import { useRef } from "react";
import { FlatList, ScrollView } from "react-native";
import { FadeInImage } from "../../src/presentation/components/ui/FadeInImage";
import {
  Gender,
  Size,
} from "../../src/infraestructure/interfaces/teslo-products.response";
import { MyIcon } from "../../src/presentation/components/ui/MyIcon";

const sizes: Size[] = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl];
const gender: Gender[] = [Gender.Kid, Gender.Men, Gender.Unisex, Gender.Women];

export default function ProductScreen() {
  const productIdRef = useRef(useLocalSearchParams().id);
  // const themes = useTheme();

  const { data: product } = useQuery<Product>({
    queryKey: ["product", productIdRef.current],
    staleTime: 1000 * 60 * 60,
    queryFn: () => getProductById(productIdRef.current as string),
  });

  if (!product) {
    return <MainLayout title="Cargando..." />;
  }

  return (
    <MainLayout title={product.title} subTitle={`Precio: ${product.price}`}>
      <ScrollView style={{ flex: 1 }}>
        <Layout>
          <FlatList
            data={product.images}
            horizontal
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <FadeInImage
                uri={item}
                style={{ width: 300, height: 300, marginHorizontal: 2 }}
              />
            )}
          />
        </Layout>

        <Layout style={{ marginHorizontal: 10 }}>
          <Input
            label="Titulo"
            value={product.title}
            style={{ marginVertical: 5 }}
          />
          <Input
            label="Slug"
            value={product.slug}
            style={{ marginVertical: 5 }}
          />
          <Input
            label="Descripcion"
            value={product.description}
            numberOfLines={10}
            multiline
            style={{ marginVertical: 5 }}
          />
        </Layout>

        <Layout
          style={{
            marginHorizontal: 15,
            flexDirection: "row",
            gap: 10,
            marginVertical: 5,
          }}
        >
          <Input
            label="Precio"
            value={product.price.toString()}
            style={{ flex: 1 }}
          />

          <Input
            label="Inventario"
            value={product.stock.toString()}
            style={{ flex: 1 }}
          />
        </Layout>

        <ButtonGroup
          style={{ margin: 2, marginTop: 30, marginHorizontal: 15 }}
          size="small"
          appearance="outline"
        >
          {sizes.map((size) => (
            <Button key={size} style={{ flex: 1 }}>
              {size}
            </Button>
          ))}
        </ButtonGroup>

        <ButtonGroup
          style={{ margin: 2, marginTop: 30, marginHorizontal: 15 }}
          size="small"
          appearance="outline"
        >
          {gender.map((gender) => (
            <Button key={gender} style={{ flex: 1 }}>
              {gender}
            </Button>
          ))}
        </ButtonGroup>

        <Button
          onPress={() => {}}
          accessoryLeft={<MyIcon name="save-outline" white />}
          style={{ margin: 15 }}
        >
          Guardar
        </Button>

        <Text>{JSON.stringify(product, null, 2)}</Text>

        <Layout style={{ height: 200 }} />
      </ScrollView>
    </MainLayout>
  );
}
