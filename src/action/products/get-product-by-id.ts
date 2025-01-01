import { tesloApi } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/product";
import { TesloProducts } from "../../infraestructure/interfaces/teslo-products.response";
import { ProductMapper } from "../../infraestructure/mappers/product.mapper";

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const { data } = await tesloApi.get<TesloProducts>(`/products/${id}`);

    return ProductMapper.toEntity(data);
  } catch (error) {
    console.log(`Error getProducts: ${error}`);
    throw new Error("Error al obtener el producto por id");
  }
};
