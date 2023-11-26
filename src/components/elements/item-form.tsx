import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ZodError } from "zod";
import Dropdown, { DropdownOnChangeFn } from "./dropdown";
import addNewProduct from "@/utils/api/add-new-product";
import { Product, ProductSchema } from "@/utils/api/schemas/product-schema";
import patchProduct from "@/utils/api/edit-product";

const CATEGORIES = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

const BLANK_FORM = {
  id: 0,
  title: "",
  price: 0.0,
  description: "",
  image: "",
  category: "",
  rating: {
    rate: 0,
    count: 0,
  },
};

type ItemFormProps = {
  setOverlayOpen: Dispatch<SetStateAction<boolean>>;
  clearAllFields: boolean;
  item?: Product;
  type: "add" | "edit";
};

/**
 * Form component used for adding or editing items in the catalogue
 * @component
 *
 * @param setOverlayOpen Boolean value that controls if the enquiry overlay is open
 * @param clearAllFields Boolean value that resets all form fields when set to ```true```
 * @param type shows the type of form action (ie - add/edit)
 *
 * Submission flow is as follows:
 * 1. ```validateFormData()``` - Validate input fields using Zod checking all fields are filled correctly
 * 2. ```setCaptchaVisibility(true)``` - Blur out form and start Captcha
 * 3. ```sendFormData(reCaptchaToken)``` - Once Captcha returns - send the form data and token
 * 4. ```setThankYouVisibility(true)``` - Show "Thank You" copy
 * 5. ```resetAll()``` - Reset all form fields and all states and close overlay
 *
 */

const ItemForm = ({
  setOverlayOpen,
  clearAllFields,
  item,
  type,
}: ItemFormProps) => {
  // const reCaptchaRef = ProductRef<ReCAPTCHA>(null);

  const [formData, setFormData] = useState<Product>(item ? item : BLANK_FORM);

  const [error, setError] = useState<false | string | string[]>(false);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [isThankYouVisible, setThankYouVisibility] = useState<boolean>(false);
  // const [isCaptchaVisible, setCaptchaVisibility] = useState<boolean>(false);
  const [returnedItemID, setReturnedItemID] = useState<{ id: string }>();

  const addDataToForm: DropdownOnChangeFn = (data) => {
    const field = data.id;
    const value = data.selected;

    console.log(field, value);
    setError("");
    setSubmitting(false);
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const validateFormData = () => {
    // Disable button
    setSubmitting(true);

    if (type === "edit" && formData === item) {
      setError("No changes made. Either make a change or cancel.");
    } else {
      try {
        // resetAll errors
        setError(false);

        // Validate
        ProductSchema.parse(formData);

        // If validation passes - start captcha
        // setCaptchaVisibility(true);
        sendFormData();
      } catch (err: any) {
        // Validation errors
        const errors = err.issues.map((err: ZodError) => err.message);
        if (errors[0].length >= 1) {
          setError(errors[0]);
        } else {
          setError(errors);
        }
        setSubmitting(false);
      }
    }
  };

  const sendFormData = async () => {
    setSubmitting(true);

    try {
      // Reset errors
      setError(false);

      // Send data to endpoint
      let res;
      if (type === "edit" && formData) res = await patchProduct(formData);
      if (type === "add" && formData) res = await addNewProduct(formData);
      setReturnedItemID(res);

      // Swap Captcha with "Thank You"
      // setCaptchaVisibility(false);
      setThankYouVisibility(true);
    } catch (err: unknown) {
      // reCaptchaRef.current && reCaptchaRef.current.reset();
      setError([
        "Something went wrong with the request, please refresh and try again...",
      ]);
      console.error(err);
    }

    setSubmitting(false);
  };

  const resetAll = useCallback(() => {
    // reCaptchaRef.current && reCaptchaRef.current.reset();
    setOverlayOpen(false);
    setFormData(BLANK_FORM);
    // setCaptchaVisibility(false);
    setThankYouVisibility(false);
    setError(false);
    setSubmitting(false);
  }, [setOverlayOpen]);

  useEffect(() => {
    if (clearAllFields) {
      resetAll();
    }
  }, [clearAllFields, resetAll]);

  return (
    <div
      id="item-form"
      className="flex h-[calc(100%-50px)]  w-full flex-col overflow-scroll text-black"
    >
      <div className="relative min-h-full">
        {/* Form */}
        <div className="flex h-full flex-col justify-between pb-6 md:justify-start">
          <div className="">
            <p
              id="id"
              className="text-caption w-full border-b border-t border-solid border-purple-600 px-4 py-4 uppercase"
            >
              {type === "edit" ? "Edit item" : "Add new item"}
            </p>
            <p className="text-h3 px-4 pb-5 pt-5 lg:max-w-[38ch] xl:pb-16 xl:pt-16">
              {type === "edit" ? "Edit" : "Fill out"} details about product
              below.
            </p>
          </div>

          <div className="flex grid-rows-6 flex-col justify-end px-4">
            <p id="errors" className="h-[25px] pb-10 text-purple-600">
              {error && error}
            </p>
            <form
              onSubmit={validateFormData}
              className="form grid h-full max-h-[600px] auto-rows-fr grid-cols-1 gap-4 lg:max-h-[400px] lg:grid-cols-2"
            >
              <input
                className="col-span-1 col-start-1 px-5"
                placeholder="Product Title"
                id="title"
                onChange={(e) =>
                  addDataToForm({
                    id: e.currentTarget.id,
                    selected: e.target.value,
                  })
                }
                value={formData?.title}
              />
              <Dropdown
                id="category"
                title={type === "edit" && item ? item.category : "Category"}
                options={CATEGORIES}
                reset={clearAllFields}
                onChange={addDataToForm}
                className="lg:col-span-1 lg:col-start-2"
              />

              <input
                id="price"
                className="px-5"
                placeholder="Price"
                type="number"
                name="price"
                required
                onChange={(e) =>
                  addDataToForm({
                    id: e.currentTarget.id,
                    selected: parseFloat(e.currentTarget.value),
                  })
                }
                value={!formData.price ? "" : formData?.price?.toString()}
              />

              <label
                htmlFor="image"
                className=" flex cursor-pointer items-center justify-start rounded-lg border border-solid border-purple-600 bg-transparent px-5 text-black placeholder:text-gray-900 focus:border-black"
              >
                {type === "add" ? "Upload  an" : "Replace"} image..
                <input
                  type="file"
                  className=" hidden  border-b border-r border-solid bg-base-100 px-5"
                  placeholder="* Image"
                  required
                  name="image"
                  id="image"
                  onChange={(e) =>
                    addDataToForm({
                      id: e.currentTarget.id,
                      selected: e.currentTarget.value,
                    })
                  }
                />
              </label>

              <textarea
                className=" col-span-1 row-span-3 px-5 pt-5"
                placeholder="Description"
                id="description"
                onChange={(e) =>
                  addDataToForm({
                    id: e.currentTarget.id,
                    selected: e.currentTarget.value,
                  })
                }
                value={formData?.description}
              />

              <div className="row-span-3 overflow-hidden rounded-lg border  border-solid border-purple-600 bg-white py-4">
                {formData.image.includes("fakepath") ? (
                  <p className="mx-auto w-[70%]">
                    New image can't display because it's only a mock
                  </p>
                ) : (
                  <img
                    src={formData.image}
                    alt=""
                    className="mx-auto h-full object-cover"
                  />
                )}
              </div>
            </form>

            <button
              onClick={validateFormData}
              className="btn-primary col-span-2 mt-4 h-min w-full rounded-lg py-5 disabled:bg-purple-400"
              disabled={isSubmitting}
              id="submit"
            >
              SEND
            </button>
          </div>
        </div>

        {/* Captcha */}
        {/* <div
          className={`glass-10 absolute top-0 h-full w-full flex-col items-center justify-center border border-solid border-red-600 bg-white pt-10 ${
            isCaptchaVisible ? "flex" : "hidden"
          }`}
        >
          <p className="text-h3 pb-6">
            Please click to confirm you are not a robot?
          </p> */}

        {/* <input type="check" /> */}

        {/* <ReCAPTCHA
            ref={reCaptchaRef}
            sitekey={process.env.CAPTCHA_SITE_KEY as string}
            onChange={(recaptchaToken) => {
              sendFormData(recaptchaToken as string);
            }}
            onErrored={() => setError("Captcha Error. Please try again.")}
          /> */}
        {/* </div> */}

        {/* Confirmation */}
        <div
          className={`glass-10 absolute top-0 h-full w-full flex-col items-center justify-center  pt-10 ${
            isThankYouVisible ? "flex" : "hidden"
          }`}
        >
          <div className="flex flex-col items-center justify-center rounded-lg border border-solid border-purple-600 bg-white px-12 py-5 ">
            <div className="pb-6 text-lg">
              {error ? (
                error
              ) : (
                <p className="flex flex-col items-center gap-2">
                  <span className=" font-semibold">{`Successfully added to catalogue!`}</span>
                  <span className="underline">{`Item ID: #${returnedItemID?.id}`}</span>
                </p>
              )}
            </div>

            <button className="btn btn-primary" onClick={resetAll}>
              Close form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemForm;
