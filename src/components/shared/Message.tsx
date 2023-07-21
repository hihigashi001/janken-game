import cc from "classcat";
import { RoundValue } from "./RoundValue";

export type MessageProps = {
  children: React.ReactNode;
  variant?: "standard" | "warning";
  winner?: "Rock" | "Paper" | "Scissors";
};

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
