import { Button, Layout, Text } from "@ui-kitten/components";
import { MyIcon } from "../../src/presentation/components/ui/MyIcon";
import { useAuthStore } from "../../src/presentation/store/auth/useAuthStore";
import { getProductsyPage } from "../../src/action/products/get-products-by-page";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { MainLayout } from "../../src/presentation/layouts/MainLayout";
import { FullScreenLoader } from "../../src/presentation/components/ui/FullScreenLoader";
import { ProductsList } from "../../src/presentation/components/products/ProductsList";

export default function HomeScreen() {
  const { logOut } = useAuthStore();

  // getProductsyPage(0);

  // const { isLoading, data: products = [] } = useQuery({
  //   queryKey: ["products", "infinite"],
  //   staleTime: 1000 * 60 * 60,
  //   queryFn: () => getProductsyPage(0),
  // });

  // const queryClient = useQueryClient();

  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["products", "infinite"],
    staleTime: 1000 * 60 * 60,
    initialPageParam: 0,

    queryFn: async (params) => {
      // console.log({ params });
      return await getProductsyPage(params.pageParam ?? 0);
      // return products;
    },

    getNextPageParam: (lastPage, allPages) => {
      return allPages.length;
    },
  });

  return (
    <MainLayout
      title="TesloShop-Products"
      subTitle="Aplicacion administrativa"
      rightAction={() => {}}
    >
      {isLoading ? (
        <FullScreenLoader />
      ) : (
        <ProductsList
          fetchNextPage={fetchNextPage}
          products={data?.pages.flat() ?? []}
        />
      )}
    </MainLayout>
  );
}
