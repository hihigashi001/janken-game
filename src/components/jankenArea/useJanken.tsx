import { ButtonProps } from "@/components/shared/Button";
import { MessageProps } from "@/components/shared/Message";
import { PlayerSelectProps } from "./PlayerSelect";
import { create } from "zustand";
import useSWR from "swr";
import { getJankenSpace } from "@/lib/apiClient";
import { useEffect } from "react";

type Props = {
  pageId?: string | string[] | undefined;
};

type ModalState = {
  isOpen: boolean;
  playerId: number;
};

export type PlayerSelect = PlayerSelectProps & { playerId: number };

type Store = {
  playerSelect: PlayerSelect[];
  modalState: ModalState;
};

type Handlers = {
  modalClose: () => void;
  playerNameChange: (value: string) => void;
  selectValue: (value: "Rock" | "Paper" | "Scissors") => void;
};

type Result = { winner: "Rock" | "Paper" | "Scissors" } | "Draw";

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

const initButton: ButtonProps = {
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
      messageStore.setState({
        message: { ...infoMessage, winner: winner, children: "の勝ち" },
      });
    }
    buttonStore.setState({
      button: {
        children: "もう一度やる",
        onClick: () => resetState(),
      },
    });
  },
  disabled: true,
};

const resetState = () => {
  statusStore.setState(initialValues);
  buttonStore.setState({ button: initButton });
  messageStore.setState({ message: warningMessage });
};

const statusStore = create<Store>(() => initialValues);
const buttonStore = create<{ button: ButtonProps }>(() => ({
  button: initButton,
}));
const messageStore = create<{ message: MessageProps }>(() => ({
  message: warningMessage,
}));

export const useJanken = ({ pageId }: Props) => {
  const { playerSelect, modalState } = statusStore();
  const { data, error, mutate } = useSWR(pageId, getJankenSpace);

  useEffect(() => {
    if (data) {
      const gameData = data.playerValues.map((p) => {
        return {
          playerId: p.playerId,
          playerName: p.playerName,
          onClick: () => statusStore.setState({ modalState: { isOpen: true, playerId: p.playerId } }),
          isButton: true,
        };
      });
      statusStore.setState({ playerSelect: gameData })
    }
  }, [data])


  const { button } = buttonStore();
  const { message } = messageStore();
  const title = data?.title || "じゃんけん広場";

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
