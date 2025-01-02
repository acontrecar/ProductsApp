import React from "react";
import { FlatList, Image } from "react-native";
import { FadeInImage } from "../ui/FadeInImage";

interface Props {
  images: string[];
}

export const ProductImages = ({ images }: Props) => {
  return (
    <>
      {images.length === 0 ? (
        <Image
          source={require("../../../../assets/no-product-image.png")}
          style={{ height: 200, width: "100%" }}
        />
      ) : (
        <FlatList
          data={images}
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
      )}
    </>
  );
};
