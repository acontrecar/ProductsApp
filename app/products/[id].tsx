import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { Formik } from "formik";
import { updateCreateProduct } from "../../src/action/products/update-create-product";

const sizes: Size[] = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl];
const gender: Gender[] = [Gender.Kid, Gender.Men, Gender.Unisex, Gender.Women];

export default function ProductScreen() {
  const productIdRef = useRef(useLocalSearchParams().id);
  // const themes = useTheme();
  const queryClient = useQueryClient();

  const { data: product } = useQuery<Product>({
    queryKey: ["product", productIdRef.current],
    staleTime: 1000 * 60 * 60,
    queryFn: () => getProductById(productIdRef.current as string),
  });

  const mutations = useMutation({
    mutationFn: (data: Product) =>
      updateCreateProduct({ ...data, id: productIdRef.current as string }),
    onSuccess(data: Product) {
      productIdRef.current = data.id; //creacion
      queryClient.invalidateQueries({ queryKey: ["products", "infinite"] });
      queryClient.invalidateQueries({
        queryKey: ["product", productIdRef.current],
      });
    },
  });

  if (!product) {
    return <MainLayout title="Cargando..." />;
  }

  return (
    <Formik initialValues={product} onSubmit={mutations.mutate}>
      {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
        <MainLayout title={values.title} subTitle={`Precio: ${values.price}`}>
          <ScrollView style={{ flex: 1 }}>
            <Layout>
              <FlatList
                data={values.images}
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
                value={values.title}
                style={{ marginVertical: 5 }}
                onChangeText={handleChange("title")}
              />
              <Input
                label="Slug"
                value={values.slug}
                style={{ marginVertical: 5 }}
                onChangeText={handleChange("slug")}
              />
              <Input
                label="Descripcion"
                value={values.description}
                numberOfLines={10}
                multiline
                style={{ marginVertical: 5 }}
                onChangeText={handleChange("description")}
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
                value={values.price.toString()}
                style={{ flex: 1 }}
                keyboardType="numeric"
                onChangeText={handleChange("price")}
              />

              <Input
                label="Inventario"
                value={values.stock.toString()}
                style={{ flex: 1 }}
                keyboardType="numeric"
                onChangeText={handleChange("stock")}
              />
            </Layout>

            <ButtonGroup
              style={{ margin: 2, marginTop: 30, marginHorizontal: 15 }}
              size="small"
              appearance="outline"
            >
              {sizes.map((size) => (
                <Button
                  onPress={() =>
                    setFieldValue(
                      "sizes",
                      values.sizes.includes(size)
                        ? values.sizes.filter((s) => s !== size)
                        : [...values.sizes, size]
                    )
                  }
                  key={size}
                  style={{
                    flex: 1,
                    backgroundColor: values.sizes.includes(size)
                      ? "green"
                      : "white",
                  }}
                >
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
                <Button
                  onPress={() => setFieldValue("gender", gender)}
                  key={gender}
                  style={{
                    flex: 1,
                    backgroundColor: values.gender.startsWith(gender)
                      ? "green"
                      : "white",
                  }}
                >
                  {gender}
                </Button>
              ))}
            </ButtonGroup>

            <Button
              onPress={() => handleSubmit()}
              accessoryLeft={<MyIcon name="save-outline" white />}
              style={{ margin: 15 }}
              disabled={mutations.isPending}
            >
              Guardar
            </Button>

            <Text>{JSON.stringify(values, null, 2)}</Text>

            <Layout style={{ height: 200 }} />
          </ScrollView>
        </MainLayout>
      )}
    </Formik>
  );
}
