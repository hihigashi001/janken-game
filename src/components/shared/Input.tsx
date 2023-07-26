import { InputProps } from "@/types";

export const Input = (props: InputProps) => {
  return (
    <input
      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:bg-white focus:border-dark-blue"
      id="inline-full-name"
      type="text"
      value={props.value}
      onChange={props.onChange}
    />
  );
};
