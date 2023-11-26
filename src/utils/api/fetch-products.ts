import { z } from "zod";
import { ProductSchema } from "./schemas/product-schema";

export type ServerFilterOptions = {
  category?: string;
  limit?: string;
};

const fetchProducts = async (options?: ServerFilterOptions) => {
  const baseUrl = "https://fakestoreapi.com/products";

  const params = [];
  if (options) {
    if (options.category) {
      params.push(`/category/${encodeURIComponent(options.category)}`);
    }

    if (options.limit) {
      params.push(`?limit=${encodeURIComponent(options.limit)}`);
    }

    /**
     *  API does not actually allow for category + limit + sort
     *  but will leave this here anyway as for bit catalogues it might be
     *  better to be able to limit and sort on the backend
     */
    // if (options.sort && !isActive) {
    //   if (options.sort.includes("ascending")) {
    //     params.push(`?sort=${encodeURIComponent("asc")}`);
    //   }

    //   if (options.sort.includes("descending")) {
    //     params.push(`?sort=${encodeURIComponent("desc")}`);
    //   }
    // }
  }
  // Combine the base URL with the parameters
  const url = `${baseUrl}${params.length > 0 ? `${params.join("")}` : ""}`;

  const response = await fetch(url);

  const data = await response.json();

  // Validate response
  const ProductSchemaArray = z.array(ProductSchema);
  ProductSchemaArray.parse(data);

  // Add Zod validation to the response data
  return data;
};

export default fetchProducts;
