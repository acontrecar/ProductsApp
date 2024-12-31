import { tesloApi } from "../../config/api/tesloApi";
import { TesloProducts } from "../../infraestructure/interfaces/teslo-products.response";
import { ProductMapper } from "../../infraestructure/mappers/product.mapper";

export const getProductsyPage = async (page: number, limit: number = 20) => {
  try {
    const { data } = await tesloApi.get<TesloProducts[]>(
      `/products?offset=${page * 10}&limit=${limit}`
    );

    console.log({ data });

    const products = data.map(ProductMapper.toEntity);
    return products;
  } catch (error) {
    console.log(`Error getProducts: ${error}`);
    throw new Error("Error al obtener los productos");
  }
};
