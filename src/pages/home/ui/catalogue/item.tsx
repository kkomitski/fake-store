import StarRating from "./star-rating";
import { Product } from "@/utils/api/schemas/product-schema";
import { Dispatch } from "react";

type ItemProps = {
  item: Product;
  setOverlayOpen: Dispatch<React.SetStateAction<boolean>>;
  setEditItem: Dispatch<React.SetStateAction<Product | undefined>>;
};

const Item = ({ item, setOverlayOpen, setEditItem }: ItemProps) => {
  const handleEdit = () => {
    setOverlayOpen(true);
    setEditItem(item);
  };

  return (
    <div className="card h-full min-h-[850px] w-full min-w-full border border-solid border-purple-600 bg-base-100 shadow-xl">
      <figure className="max-h-[400px] min-h-[400px]">
        <img
          src={item.image}
          alt="Shoes"
          className="mx-14 my-20 h-full w-full min-w-full bg-white object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.title}</h2>
        <p>{item.description}</p>
        <div className="flex justify-between">
          <div className="">
            <StarRating rating={item.rating && (item.rating.rate as number)} />{" "}
            <div className="flex min-w-[130px]">
              <span>{item.rating && item.rating.rate}</span>
              <p className="pl-1">({item.rating && item.rating.count})</p>
            </div>
          </div>
          <div className="">
            <p>Price</p>
            <p>£{item.price && item.price.toFixed(2)}</p>
          </div>

          <button className="btn-primary btn" onClick={(_) => handleEdit()}>
            edit item
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
