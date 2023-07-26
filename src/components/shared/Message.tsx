import cc from "classcat";
import { MessageProps } from "@/types";
import { RoundValue } from "./RoundValue";

export const Message = (props: MessageProps) => {
  const variant = props.variant ?? "standard";
  const classNames = cc([
    "text-center",
    {
      "text-gray-800": variant === "standard",
      "text-dark-red": variant === "warning",
    },
  ]);

  return (
    <div className="flex items-center justify-center">
      {props.winner && <RoundValue value={props.winner} />}
      <div className={classNames}>{props.children}</div>
    </div>
  );
};
