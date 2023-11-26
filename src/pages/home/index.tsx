import { Product } from "@/utils/api/schemas/product-schema";
import { useState } from "react";

// Components
import Add from "./ui/add";
import Filters from "./ui/filters";
import Catalogue from "./ui/catalogue";

/**
 * Homepage dashboard for managing products
 *
 * @component Hero - all logic for adding new items (fetch POST)
 *
 * @component Filters - all logic for fetching, filtering and initial setting of items state (init load) (fetch GET)
 *
 * @component Catalogue - all logic to display and edit items (fetch PATCH)
 *
 */
const Home = () => {
  const [items, setItems] = useState<Product[]>();

  return (
    <>
      <Add />

      <Filters setItems={setItems} items={items} />

      <Catalogue itemList={items} />
    </>
  );
};

export default Home;
