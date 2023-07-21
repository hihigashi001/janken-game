import cc from "classcat";

export type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
};

export const Button = (props: ButtonProps) => {
  const variant = props.variant ?? "primary";
  const disabled = props.disabled ?? false;
  const classNames = cc([
    "w-full p-2 rounded-md cursor-pointer",
    props.className,
    {
      "text-white bg-dark-blue border border-gray-400": variant === "primary",
      "bg-white text-dark-blue border border-dark-blue": variant === "secondary",
      "opacity-50 cursor-not-allowed": disabled,
    },
  ]);

  return (
    <button className={classNames} onClick={props.onClick} disabled={disabled}>
      {props.children}
    </button>
  );
};
