import { Dispatch, ReactNode, SetStateAction } from "react";

type OverlayProps = {
  children: ReactNode;
  isOverlayOpen: boolean;
  setOverlayOpen: Dispatch<SetStateAction<boolean>>;
};

/**
 * Overlay modal/dialog component that blurs all other content and shows over the top of it
 * @component
 * 
 * @param children All content to be shown in the Overlay
 * @param isOverlayOpen The current state of overlay
 * @param setOverlayOpen Function to control the state of overlay
 * 
 * @example
 *  <Overlay
      isOverlayOpen={isEnquiryOverlayOpen}
      setOverlayOpen={setEnquiryOpen}
    >
      <EnquiryForm />
    </Overlay>
 */

const Overlay = ({ children, isOverlayOpen, setOverlayOpen }: OverlayProps) => {
  return (
    <div
      id="overlay"
      className={`overlay glass-10  no-scrollbar fixed top-0 z-[99999] mt-[1px] flex h-full w-[100vw] min-w-[100vw] overflow-hidden bg-none text-black  transition-all delay-500 duration-500 ${
        isOverlayOpen ? "z-10" : "-z-10"
      }`}
    >
      <div
        className={`grid-center-parent relative h-full w-full items-center justify-center overflow-scroll`}
      >
        <div
          onClick={(_) => setOverlayOpen(false)}
          className="h-full w-full bg-transparent "
        ></div>
        <div className="mx-auto h-full min-h-[750px] w-full max-w-[950px] rounded-lg border border-solid border-purple-600 bg-purple-100 text-base-200 lg:h-min lg:w-[50%]">
          <div
            className="sticky top-0 z-50 flex w-full cursor-pointer gap-1  px-4 pb-3.5 pt-3.5 text-black drop-shadow-md"
            onClick={(_) => setOverlayOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="mt-1"
            >
              <path
                d="M9.99967 12.6663L5.33301 7.99967L9.99967 3.33301L11.0886 4.4219L7.51079 7.99967L11.0886 11.5775L9.99967 12.6663Z"
                fill="rgb(147 51 234)"
              />
            </svg>
            <p>BACK</p>
          </div>
          <div className="z-[40] h-full min-h-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
