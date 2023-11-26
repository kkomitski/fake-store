import { Dispatch, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import fetchProducts from "@/utils/api/fetch-products";
import { clientFilterSorter } from "./utils";
import { Product } from "@/utils/api/schemas/product-schema";
import Dropdown from "@/components/elements/dropdown";

type FilterState = Record<string, string> | null;

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
  const [initialLoad, setInitalLoad] = useState(true);

  const [serverFilters, setServerFilters] = useState<FilterState>(null);
  const [clientFilters, setClientFilters] = useState<FilterState>(null);

  const [clearAllFilters, setClearAllFilters] = useState(false);
  const [preventFetch, setPreventFetch] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  // Save URLSearchParams (ie - the url field) into serverFilters state
  useEffect(() => {
    // @ts-ignore
    if (searchParams.size) {
      setItems([])

      // If search params available - regenerate the catalogue state
      for (const param of searchParams) {
        const paramKey = param[0];
        const paramVal = param[1];

        // Server filters
        if (paramKey !== "sort") {
          setServerFilters((prev) => ({
            ...prev,
            [paramKey]: paramVal,
          }));
        }

        // Run the fetch for server filters
        setPreventFetch(false);

        // Client filters
        if (paramKey === "sort") {
          initialLoad ? setInitalLoad(false) : setPreventFetch(true);
          // setPreventFetch(true);
          setClientFilters((prev) => ({
            ...prev,
            [paramKey]: paramVal,
          }));
        }
      }
    } else {
      // Else fetch normally
      setPreventFetch(false);
    }
  }, [searchParams]);

  /**
   * SERVER FILTER
   * Refetch with the new params every time the filter state updates
   */
  useEffect(() => {
    if (!preventFetch) {
      // Initial load
      const category = serverFilters?.category;
      const limit = serverFilters?.limit;

      fetchProducts({ category, limit }).then((data) => {
        setItems(data);
      });
    }
  }, [preventFetch, serverFilters, setItems]);

  /**
   * CLIENT FILTER
   * Only sorts the already existing items state based on the
   * required condition
   */
  useEffect(() => {
    if (clientFilters) {
      const sorted = items && clientFilterSorter(items, clientFilters.sort);
      if (sorted) setItems(sorted);
    }
  }, [clientFilters, setItems]);

  // Reset all filters
  useEffect(() => {
    if (clearAllFilters) {
      const params = [];

      // Push all params to array
      for (const param of searchParams) {
        params.push(param[0]);
      }

      // Remove all params
      params.forEach((param) => {
        const currentParam = searchParams.get(param);
        if (currentParam) searchParams.delete(param);
        setSearchParams(searchParams);
      });

      // Reset clear filters state
      setClearAllFilters(false);

      // Reset all filters
      setServerFilters(null);
      setClientFilters(null);

      // Allow a new fetch to repopulate the catalogue
      setPreventFetch(false);
    }
  }, [clearAllFilters, setSearchParams]);

  return (
    <section className="fs-padding flex w-full flex-col justify-end gap-10 lg:flex-row">
      <Dropdown
        id="category"
        title={"Category"}
        options={[
          "electronics",
          "jewelery",
          "men's clothing",
          "women's clothing",
        ]}
        reset={clearAllFilters}
        callback={setSearchParams}
      />
      <Dropdown
        id="limit"
        title={"Limit"}
        options={["1", "2", "3", "5"]}
        reset={clearAllFilters}
        callback={setSearchParams}
      />
      <Dropdown
        id="sort"
        title={"Sort"}
        options={[
          "ID - descending",
          "ID - ascending",
          "price - low to high",
          "price - high to low",
          "rating - low to high",
          "rating - high to low",
        ]}
        reset={clearAllFilters}
        callback={setSearchParams}
      />

      <button
        className="btn-primary btn"
        onClick={(_) => setClearAllFilters(true)}
      >
        Reset Filters
      </button>
    </section>
  );
};

export default Filters;
