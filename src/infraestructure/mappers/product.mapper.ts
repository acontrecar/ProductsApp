import getEnvVars from "../../../constants/api";
import { Product } from "../../domain/entities/product";
import { TesloProducts } from "../interfaces/teslo-products.response";

const { API_URL } = getEnvVars();

export class ProductMapper {
  static toEntity(tesloProduct: TesloProducts): Product {
    return {
      id: tesloProduct.id,
      title: tesloProduct.title,
      price: tesloProduct.price,
      description: tesloProduct.description,
      slug: tesloProduct.slug,
      stock: tesloProduct.stock,
      sizes: tesloProduct.sizes,
      gender: tesloProduct.gender,
      images: tesloProduct.images.map(
        (image) => `${API_URL}/files/product/${image}`
      ),
      tags: tesloProduct.tags,
    };
  }
}
