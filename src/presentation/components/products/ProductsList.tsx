import React, { useState } from "react";
import { RefreshControl, StyleSheet, View } from "react-native";
import { Product } from "../../../domain/entities/product";
import { Layout, List, Text } from "@ui-kitten/components";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
  fetchNextPage: () => void;
}

export const ProductsList = ({ products, fetchNextPage }: Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  return (
    <List
      data={products}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({ item }) => <ProductCard product={item} />}
      ListFooterComponent={() => <Layout style={{ height: 150 }} />}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
};
