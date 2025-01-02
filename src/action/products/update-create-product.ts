import { isAxiosError } from "axios";
import { tesloApi } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/product";
import { TesloProducts } from "../../infraestructure/interfaces/teslo-products.response";
import { ProductMapper } from "../../infraestructure/mappers/product.mapper";

export const updateCreateProduct = async (product: Partial<Product>) => {
  product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
  product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

  if (product.id) {
    return updateProduct(product);
  }

  throw new Error("Creacion no implementada");
};

const updateProduct = async (product: Partial<Product>) => {
  console.log({ product });
  const { id, images = [], ...rest } = product;

  try {
    const checkedImages = prepareImages(images);

    console.log({ checkedImages });

    const { data } = await tesloApi.patch(`/products/${id}`, {
      images: checkedImages,
      ...rest,
    });

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
    }

    throw new Error("Error al actualizar el producto");
  }
};

const prepareImages = (images: string[]) => {
  return images.map((image) => image.split("/").pop());
};
