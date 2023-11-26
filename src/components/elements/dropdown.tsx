import React, { useEffect, useRef, useState } from "react";
import { SetURLSearchParams } from "react-router-dom";

type DropdownProps = {
  id: string;
  title: string;
  reset: boolean;
  className?: string;
  options: string[];
  callback?: SetURLSearchParams;
  addDataToForm?: (id: string, value: string) => void;
};

/**
 * Basic dropdown
 * @component
 * 
 * @param id Mainly used keys for prop drilled setState functions 
 * @param title String initially displayed on the dropdown
 * @param options Array of strings to be displayed as options
 * @param reset Boolean to reset the dropdown to the initial title (reset if true)
 * @param className String to add custom classes to the dropdown
 * @param callback Function to set URLSearchParams on the parent component
 * @param addDataToForm Function to add data to the parent component's state. Used for form validation. 
 * 
 * @example
 *  <Dropdown
      id="category"
      title="Category"
      options={["Electronics", "Jewelery", "Others"]}
      addDataToForm={addDataToForm}
      reset={clearAllFields}
      className="bg-white text-black"
    />
 * 
 */

const Dropdown = ({
  id,
  title,
  options,
  reset,
  className,
  callback,
  addDataToForm,
}: DropdownProps) => {
  const [selected, setSelected] = useState(title);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    setSelected(e.currentTarget.id);
    detailsRef.current?.removeAttribute("open");

    addDataToForm && addDataToForm(id, selected);
  };

  useEffect(() => {
    if (selected !== title && callback) {
      callback((prev) => {
        prev.set(id, selected);
        return prev;
      });
    }
  }, [callback, id, selected, title]);

  useEffect(() => {
    if (reset) {
      setSelected(title);
    }
  }, [reset, title, selected]);

  return (
    <details
      ref={detailsRef}
      id={id}
      className={`dropdown flex h-full min-w-[150px] cursor-pointer justify-end rounded-lg border border-solid border-purple-600 hover:bg-transparent focus:bg-transparent ${
        className && className
      }`}
    >
      <summary className="flex h-full min-h-[45px] items-center justify-between gap-4 bg-transparent px-5 capitalize">
        {selected}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="rgb(147 51 234)"
          height="15px"
          width="15px"
          version="1.1"
          id="Layer_1"
          viewBox="0 0 330 330"
        >
          <path
            id="XMLID_225_"
            d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
          />
        </svg>
      </summary>
      <ul className="dropdown-content menu z-[1] mt-1 w-full min-w-min rounded-lg border border-solid border-purple-600 bg-purple-100 p-2 text-black shadow ">
        {options.map((opt, index) => {
          return (
            <li
              id={opt}
              key={index}
              className="capitalize"
              onClick={handleClick}
            >
              <a>{opt}</a>
            </li>
          );
        })}
      </ul>
    </details>
  );
};

export default Dropdown;
