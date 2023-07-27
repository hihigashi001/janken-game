import { WrapperProps } from "@/types";

export const Wrapper = (props: WrapperProps) => {
  return (
    <div className="w-full h-full p-4 flex justify-center">
      <div className="flex flex-col gap-4 justify-center w-full max-w-md py-8 px-6 bg-white border border-gray-200 rounded-lg shadow-md">
        {props.children}
      </div>
    </div>
  );
};