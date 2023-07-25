import React from "react";
import { RoundButton } from "@/components/shared/RoundButton";
import { RoundValue } from "@/components/shared/RoundValue";

export type PlayerSelectProps = {
  playerName: string;
  onClick: () => void;
  selectedValue: "Rock" | "Paper" | "Scissors" | null;
  isButton?: boolean;
};

export const PlayerSelect = (props: PlayerSelectProps) => {
  const playerName = props.playerName ?? "PlayerNameDefault";

  return (
    <div className="flex">
      <div className="flex w-8/12 justify-start items-center truncate">{playerName}</div>
      <div className="w-4/12">
        {props.isButton ? (
          <RoundButton onClick={props.onClick} disabled={props.selectedValue !== null} />
        ) : (
          <RoundValue value={props.selectedValue}/>
        )}
      </div>
    </div>
  );
};
