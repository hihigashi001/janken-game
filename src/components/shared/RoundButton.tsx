import cc from "classcat";
import { RoundButtonProps } from "@/types";

export const RoundButton = (props: RoundButtonProps) => {
  const variant = props.variant ?? "outlined";
  const disabled = props.disabled ?? false;
  const buttonText = disabled ? "選択済" : "選択";
  const classNames = cc([
    "w-16 h-16 rounded-full border-4 text-sm flex justify-center items-center focus:outline-none m-1",
    props.className,
    {
      "border-dark-blue text-gray-800": variant === "outlined",
      "cursor-not-allowed border-gray-400 bg-gray-400 text-white": disabled,
    },
  ]);

  return (
    <button className={classNames} onClick={props.onClick} disabled={disabled}>
      {buttonText}
    </button>
  );
};
