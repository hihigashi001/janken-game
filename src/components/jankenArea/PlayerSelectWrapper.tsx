import { PlayerSelectWrapperProps } from "@/types";

export const PlayerSelectWrapper = (props: PlayerSelectWrapperProps) => {
  return <div className="flex flex-col gap-2">{props.children}</div>;
};
