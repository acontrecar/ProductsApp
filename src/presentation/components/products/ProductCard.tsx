import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Product } from "../../../domain/entities/product";
import { Card, Text } from "@ui-kitten/components";
import { FadeInImage } from "../ui/FadeInImage";
import { useRouter } from "expo-router";

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const router = useRouter();

  return (
    <Card
      style={{ flex: 1, backgroundColor: "#F9F9F9", margin: 3 }}
      onPress={() => router.push(`/products/${product.id}`)}
    >
      {product.images.length === 0 ? (
        <Image source={require("../../../../assets/no-product-image.png")} />
      ) : (
        <FadeInImage
          uri={product.images[0]}
          style={{ flex: 1, height: 200, width: "100%" }}
        />
      )}

      <Text numberOfLines={2} style={{ textAlign: "center" }}>
        {product.title}
      </Text>
    </Card>
  );
};
