import { useState } from "react";
import Item from "./item";
import { Product } from "@/utils/api/schemas/product-schema";
import Overlay from "@/components/elements/overlay";
import ItemForm from "@/components/elements/item-form";

const Catalogue = ({ itemList }: { itemList: Product[] | undefined }) => {
  // const [shownItems, setShownItems] = useState<number>(20);

  // Pagination to be completed
  // const [noMoreItemsAvailable, setNoMoreItemsAvailable] =
  //   useState<boolean>(false);

  const [isItemEditOverlayOpen, setItemEditOpen] = useState<boolean>(false);
  const [editItem, setEditIitem] = useState<Product | undefined>();

  return (
    <>
      <section className="fs-padding">
        <div className="my-auto grid grid-cols-1 gap-10 lg:grid-cols-2 xl:grid-cols-3">
          {itemList && itemList[0] ? (
            itemList.map((itemData, index) => {
              return (
                <Item
                  setOverlayOpen={setItemEditOpen}
                  setEditItem={setEditIitem}
                  item={itemData}
                  key={index}
                />
              );
            })
          ) : (
            <p>Loading products....</p>
          )}
          {/* PART OF PAGINATION  */}
          {/* {itemList &&
            itemList.slice(0, shownItems).map((itemData, index) => {
              return (
                <Item
                  setOverlayOpen={setItemEditOpen}
                  setEditItem={setEditIitem}
                  item={itemData}
                  key={index}
                />
              );
            })} */}
          {/* <button
            onClick={() =>
              noMoreItemsAvailable ? "" : setShownItems((prev) => prev + 1)
            }
          >
            {noMoreItemsAvailable ? "No more items available" : "Show more"}
          </button> */}
        </div>
      </section>

      {/* Enquiry Overlay */}
      {/* TODO: (Find solution)
          Passing it conditionally doesn't allow the animation
          but plain component declaration leads to DOM crowding.
      */}
      {isItemEditOverlayOpen && (
        <Overlay
          isOverlayOpen={isItemEditOverlayOpen}
          setOverlayOpen={setItemEditOpen}
        >
          {editItem && (
            <ItemForm
              type="edit"
              item={editItem}
              setOverlayOpen={setItemEditOpen}
              clearAllFields={!isItemEditOverlayOpen}
            />
          )}
        </Overlay>
      )}
    </>
  );
};

export default Catalogue;
