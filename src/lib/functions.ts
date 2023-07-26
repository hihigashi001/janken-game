import { PlayerSelectValues, getRockPaperScissorsResultType } from "@/types";

export function getRockPaperScissorsResult(playerSelect: PlayerSelectValues[]): getRockPaperScissorsResultType {
  const counts: Record<string, number> = {
    Rock: 0,
    Paper: 0,
    Scissors: 0,
  };

  for (const player of playerSelect) {
    const choice = player.selectedValue;

    if (!choice) {
      throw new Error(`Player ${player.playerName} didn't make a choice`);
    }
    counts[choice]++;
  }

  const choices = ["Rock", "Paper", "Scissors"].filter((choice) => counts[choice] > 0);

  if (choices.length !== 2) {
    return "Draw";
  }

  if (choices.includes("Rock") && choices.includes("Scissors")) {
    return { winner: "Rock" };
  } else if (choices.includes("Scissors") && choices.includes("Paper")) {
    return { winner: "Scissors" };
  } else {
    return { winner: "Paper" };
  }
}

export function checkButtonDisabled(playerSelect: PlayerSelectValues[]): boolean {
  const disabled = playerSelect.some((p) => p.selectedValue === null);
  return disabled;
}
