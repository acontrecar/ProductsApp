import React, { useState } from "react";
import { RefreshControl, StyleSheet, View } from "react-native";
import { Product } from "../../../domain/entities/product";
import { Layout, List, Text } from "@ui-kitten/components";
import { ProductCard } from "./ProductCard";
import { QueryClient } from "@tanstack/react-query";

interface Props {
  products: Product[];
  fetchNextPage: () => void;
}

export const ProductsList = ({ products, fetchNextPage }: Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const queryClient = new QueryClient();

  const sortedProducts = [...products].sort((a, b) => a.id.localeCompare(b.id));

  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 200));
    queryClient.invalidateQueries({ queryKey: ["products", "infinite"] });
    setIsRefreshing(false);
  };

  return (
    <List
      data={sortedProducts}
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
