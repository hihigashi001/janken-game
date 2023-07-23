type Option = {
  value: string;
  label: string;
};

export type SelectProps = {
  options: Option[];
};

export const Select = (props: SelectProps) => {
  return (
    <select className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:bg-white focus:border-dark-blue">
      {props.options.map((option, i) => {
        return (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
};
