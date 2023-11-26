import { Product } from "./schemas/product-schema";

const addNewProduct = async (formData: Product) => {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify({
        title: formData.title,
        price: formData.price,
        description: formData.description,
        image: formData.image,
        category: formData.category,
      }),
    })
      .then((res) => res.json())
      .then((json) => json);

    return res;
  } catch (err) {
    return err;
  }
};

export default addNewProduct;
