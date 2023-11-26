import { Dispatch, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import fetchProducts from "@/utils/api/fetch-products";
import { clientFilterSorter } from "./utils";
import { Product } from "@/utils/api/schemas/product-schema";
import Dropdown, { DropdownOnChangeFn } from "@/components/elements/dropdown";

type FiltersProps = {
  setItems: Dispatch<React.SetStateAction<Product[] | undefined>>;
  items?: Product[];
};

/**
 * Filtering options for product catalogue
 *
 *  @param setItems setState function drilled down and from parent
 *  @param items Items array state that gets displayed by the [Catalogue](../catalogue/index.tsx) component
 */

const Filters = ({ setItems, items }: FiltersProps) => {
  const [clearAllFilters, setClearAllFilters] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") as string | undefined;
  const limit = searchParams.get("limit") as string | undefined;
  const sort = searchParams.get("sort") as string | undefined;

  const handleChange = useCallback<DropdownOnChangeFn>((data) => {
    const key = data.id;
    const val = data.selected;

    searchParams.set(key, val as string);
    setSearchParams(searchParams);
  }, []);

  // Server Filters
  useEffect(() => {
    if (!clearAllFilters) {
      fetchProducts({ category, limit }).then((data) => {
        const sorted = data && sort && clientFilterSorter(data, sort);
        if (sorted) {
          setItems(sorted);
        } else {
          setItems(data);
        }
      });
    }
  }, [searchParams, clearAllFilters]);

  // Reset all filters
  useEffect(() => {
    if (clearAllFilters) {
      searchParams.delete("category");
      searchParams.delete("limit");
      searchParams.delete("sort");

      setSearchParams(searchParams);

      setItems(items);

      setClearAllFilters(false);
    }
  }, [clearAllFilters, setSearchParams, items]);

  return (
    <section className="fs-padding flex w-full flex-col justify-end gap-10 lg:flex-row">
      <Dropdown
        id="category"
        title={"Category"}
        initial={category ? category : null}
        options={[
          "electronics",
          "jewelery",
          "men's clothing",
          "women's clothing",
        ]}
        reset={clearAllFilters}
        onChange={handleChange}
      />
      <Dropdown
        id="limit"
        title={"Limit"}
        initial={limit ? limit : null}
        options={["1", "2", "3", "5"]}
        reset={clearAllFilters}
        onChange={handleChange}
      />
      <Dropdown
        id="sort"
        title={"Sort"}
        initial={sort ? sort : null}
        options={[
          "ID - descending",
          "ID - ascending",
          "price - low to high",
          "price - high to low",
          "rating - low to high",
          "rating - high to low",
        ]}
        reset={clearAllFilters}
        onChange={handleChange}
      />
      <button
        className="btn btn-primary"
        onClick={(_) => setClearAllFilters(true)}
      >
        Reset Filters
      </button>
    </section>
  );
};

export default Filters;
