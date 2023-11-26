import { Product } from "@/utils/api/schemas/product-schema";

export const clientFilterSorter = (array: Product[], filter: string) => {
  let sorted: Product[] | false = false;

  switch (filter) {
    // - Price - Ascending
    case "price - low to high":
      // TODO: (Bug-Fix) seems to not be sorting entirely correctly
      sorted = [...array].sort((a, b) => a.price - b.price);
      break;
    // - Price - Descending
    case "price - high to low":
      sorted = [...array].sort((a, b) => b.price - a.price);
      break;
    // - Rating - Ascending
    case "rating - low to high":
      sorted = [...array].sort((a, b) => a.rating.rate - b.rating.rate);
      break;
    // - Rating - Descending
    case "rating - high to low":
      sorted = [...array].sort((a, b) => b.rating.rate - a.rating.rate);
      break;
    // - Rating - Ascending
    case "ID - descending":
      sorted = [...array].sort((a, b) => b.id - a.id);
      break;
    // - Rating - Descending
    case "ID - ascending":
      sorted = [...array].sort((a, b) => a.id - b.id);
      break;

    default:
  }

  if (sorted) {
    return sorted;
  }
  return sorted;
};
