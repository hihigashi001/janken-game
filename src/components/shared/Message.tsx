import cc from "classcat";

export type MessageProps = {
  children: React.ReactNode;
  variant?: "standard" | "warning";
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
  return <div className={classNames}>{props.children}</div>;
};
