import Overlay from "@/components/elements/overlay";
import { useState } from "react";
import ItemForm from "@/components/elements/item-form";

const Add = () => {
  const [isNewItemOverlayOpen, setNewItemOpen] = useState<boolean>(false);

  return (
    <>
      <section>
        <div className="fs-padding">
          <div className="hero-content flex-col lg:flex-row lg:justify-start">
            <div>
              <h1 className="text-5xl font-bold">Welcome</h1>
              <p className="py-5">
                Welcome to this super awesome, mega great, giga-chad style shop
                management console.
              </p>
              <p className="pt-1">
                This admin console is{" "}
                <strong className="underline">definitely not fake</strong> and
                all the information queried from{" "}
                <a
                  href="https://fakestoreapi.com/"
                  className="text-purple-400 underline"
                >
                  fakestoreapi.com
                </a>{" "}
                is <strong className="underline">completely real.</strong>
              </p>
              <button
                className="btn-primary btn mt-10"
                onClick={(_) => setNewItemOpen(!isNewItemOverlayOpen)}
              >
                Add a new fake item
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* New Item Overlay */}
      {isNewItemOverlayOpen && (
        <Overlay
          isOverlayOpen={isNewItemOverlayOpen}
          setOverlayOpen={setNewItemOpen}
        >
          <ItemForm
            type="add"
            setOverlayOpen={setNewItemOpen}
            clearAllFields={!isNewItemOverlayOpen}
          />
        </Overlay>
      )}
    </>
  );
};

export default Add;
