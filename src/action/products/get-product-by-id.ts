import { tesloApi } from "../../config/api/tesloApi";
import { Gender, Product } from "../../domain/entities/product";
import { TesloProducts } from "../../infraestructure/interfaces/teslo-products.response";
import { ProductMapper } from "../../infraestructure/mappers/product.mapper";

const emptyProduct: Product = {
  id: "",
  title: "Nuevo producto",
  description: "",
  price: 0,
  stock: 0,
  images: [],
  gender: Gender.Unisex,
  sizes: [],
  tags: [],
  slug: "",
};

export const getProductById = async (id: string): Promise<Product> => {
  if (id === "new") return emptyProduct;

  try {
    const { data } = await tesloApi.get<TesloProducts>(`/products/${id}`);

    return ProductMapper.toEntity(data);
  } catch (error) {
    console.log(`Error getProducts: ${error}`);
    throw new Error("Error al obtener el producto por id");
  }
};
