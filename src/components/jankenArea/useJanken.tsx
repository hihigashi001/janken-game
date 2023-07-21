import { ButtonProps } from "@/components/shared/Button";
import { MessageProps } from "@/components/shared/Message";
import { PlayerSelectProps } from "./PlayerSelect";
import { create } from "zustand";

type ModalState = {
  isOpen: boolean;
  playerId: number;
};

type PlayerSelect = PlayerSelectProps & { playerId: number };

type Store = {
  playerSelect: PlayerSelect[];
  modalState: ModalState;
};

type Handlers = {
  modalClose: () => void;
  playerNameChange: (value: string) => void;
  selectValue: (value: "Rock" | "Paper" | "Scissors") => void;
};

type Result = { winner: "Rock" | "Paper" | "Scissors"; players: PlayerSelect[] } | "Draw";

const initialValues: Store = {
  playerSelect: [
    {
      playerId: 1,
      playerName: "playerName1",
      onClick: () => statusStore.setState({ modalState: { isOpen: true, playerId: 1 } }),
      isButton: true,
    },
    {
      playerId: 2,
      playerName: "playerName2",
      onClick: () => statusStore.setState({ modalState: { isOpen: true, playerId: 2 } }),
      isButton: true,
    },
    {
      playerId: 3,
      playerName: "playerName3",
      onClick: () => statusStore.setState({ modalState: { isOpen: true, playerId: 3 } }),
      isButton: true,
    },
  ],
  modalState: { isOpen: false, playerId: 0 },
};

const warningMessage: MessageProps = {
  children: "全員が選択したら下のボタンを押して",
  variant: "warning",
};

const infoMessage: MessageProps = {
  children: "下のボタンを押して結果を確認しよう",
  variant: "standard",
};

const statusStore = create<Store>(() => initialValues);
const buttonStore = create<{ button: ButtonProps }>(() => ({
  button: {
    children: "じゃんけんポン",
    onClick: () => {
      const playerSelect = statusStore.getState().playerSelect;
      const newPlayerSelect = playerSelect.map((p) => {
        return { ...p, isButton: false };
      });
      statusStore.setState({ playerSelect: newPlayerSelect });
      const result = getRockPaperScissorsResult(playerSelect);
      if (result === "Draw") {
        messageStore.setState({ message: { ...infoMessage, children: "あいこでした" } });
      } else {
        const winner = result.winner;
        const players = result.players;
        const stringPlayers = players.map((p) => p.playerName).join(", ");
        messageStore.setState({
          message: { ...infoMessage, winner: winner, children: `の勝ち 勝者：${stringPlayers}` },
        });
      }
    },
    disabled: true,
  },
}));
const messageStore = create<{ message: MessageProps }>(() => ({
  message: warningMessage,
}));

export const useJanken = () => {
  const { playerSelect, modalState } = statusStore();
  const { button } = buttonStore();
  const { message } = messageStore();
  const title = "じゃんけん";

  const handlers: Handlers = {
    modalClose: () => {
      statusStore.setState({ modalState: { isOpen: false, playerId: 0 } });
    },
    playerNameChange: (value) => {
      const playerId = modalState.playerId;
      const playerSelect = statusStore.getState().playerSelect;
      const newPlayerSelect = playerSelect.map((p) => {
        if (p.playerId === playerId) {
          return { ...p, playerName: value };
        } else {
          return p;
        }
      });
      statusStore.setState({ playerSelect: newPlayerSelect });
    },
    selectValue: (value) => {
      const playerId = modalState.playerId;
      const playerSelect = statusStore.getState().playerSelect;
      const newPlayerSelect = playerSelect.map((p) => {
        if (p.playerId === playerId) {
          return { ...p, selectedValue: value };
        } else {
          return p;
        }
      });
      statusStore.setState({ playerSelect: newPlayerSelect });
      buttonStore.setState({ button: { ...button, disabled: false } });
      messageStore.setState({ message: infoMessage });
    },
  };

  return { title, message, playerSelect, button, handlers, modalState };
};

function getRockPaperScissorsResult(playerSelect: PlayerSelect[]): Result {
  const counts: Record<string, number> = {
    Rock: 0,
    Paper: 0,
    Scissors: 0,
  };

  const players: Record<string, PlayerSelect[]> = {
    Rock: [],
    Paper: [],
    Scissors: [],
  };

  for (const player of playerSelect) {
    const choice = player.selectedValue;

    if (!choice) {
      throw new Error(`Player ${player.playerName} didn't make a choice`);
    }

    counts[choice]++;
    players[choice].push(player);
  }

  const choices = ["Rock", "Paper", "Scissors"].filter((choice) => counts[choice] > 0);

  if (choices.length !== 2) {
    return "Draw";
  }

  if (choices.includes("Rock") && choices.includes("Scissors")) {
    return { winner: "Rock", players: players.Rock };
  } else if (choices.includes("Scissors") && choices.includes("Paper")) {
    return { winner: "Scissors", players: players.Scissors };
  } else {
    return { winner: "Paper", players: players.Paper };
  }
}
