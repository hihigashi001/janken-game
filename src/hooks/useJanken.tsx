import { useEffect } from "react";
import { create } from "zustand";
import useSWR from "swr";
import { getJankenSpace, updateJankenSpace, createdAt } from "@/lib/apiClient";
import { getRockPaperScissorsResult, checkButtonDisabled } from "@/lib/functions";
import {
  ButtonProps,
  MessageProps,
  StoreData,
  useCreateJankenSpaceProps,
  useJankenHandlers,
  useJankenStore,
} from "@/types";

const initialValues: useJankenStore = {
  playerSelect: [],
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
  onClick: () => {},
  disabled: true,
};

const statusStore = create<useJankenStore>(() => initialValues);
const buttonStore = create<{ button: ButtonProps }>(() => ({
  button: initButton,
}));
const messageStore = create<{ message: MessageProps }>(() => ({
  message: warningMessage,
}));

export const useJanken = ({ pageId }: useCreateJankenSpaceProps) => {
  const { playerSelect, modalState } = statusStore();
  const { button } = buttonStore();
  const { message } = messageStore();
  const { data, mutate } = useSWR(pageId, getJankenSpace, { refreshInterval: 3000 });

  const title = data?.title || "じゃんけん広場";

  useEffect(() => {
    if (data && modalState.isOpen === false) {
      const gameData = data.playerValues.map((p) => {
        return {
          playerId: p.playerId,
          playerName: p.playerName,
          onClick: () =>
            statusStore.setState({ modalState: { isOpen: true, playerId: p.playerId } }),
          selectedValue: p.selectedValue,
          isButton: p.isButton,
        };
      });
      statusStore.setState({ playerSelect: gameData });
    }
  }, [data, modalState.isOpen]);

  useEffect(() => {
    if (data && modalState.isOpen === false) {
      const buttonStatus = data?.gameStatus === "result";
      if (buttonStatus) {
        const playerSelect = statusStore.getState().playerSelect;
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
            onClick: () => {
              const updateData: StoreData = {
                title: data?.title || "",
                playerValues: playerSelect.map((p) => ({
                  playerId: p.playerId,
                  playerName: p.playerName,
                  selectedValue: null,
                  isButton: true,
                })),
                gameStatus: "playing",
                createdAt: data?.createdAt || createdAt(),
              };
              if (typeof pageId === "string") {
                updateJankenSpace(pageId, updateData).then(() => {
                  mutate();
                });
              }
            },
            disabled: false,
          },
        });
      } else {
        messageStore.setState({ message: warningMessage });
        buttonStore.setState({
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
                messageStore.setState({
                  message: { ...infoMessage, winner: winner, children: "の勝ち" },
                });
              }
              const updateData: StoreData = {
                title: data?.title || "",
                playerValues: playerSelect.map((p) => ({
                  playerId: p.playerId,
                  playerName: p.playerName,
                  selectedValue: p.selectedValue,
                  isButton: false,
                })),
                gameStatus: "result",
                createdAt: data?.createdAt || createdAt(),
              };
              if (typeof pageId === "string") {
                updateJankenSpace(pageId, updateData).then(() => {
                  mutate();
                });
              }
            },
            disabled: checkButtonDisabled(playerSelect),
          },
        });
      }
    }
  }, [data, playerSelect, pageId, mutate, modalState.isOpen]);

  const handlers: useJankenHandlers = {
    updateValue: () => {
      const updateData: StoreData = {
        title: data?.title || "",
        playerValues: playerSelect.map((p) => ({
          playerId: p.playerId,
          playerName: p.playerName,
          selectedValue: p.selectedValue,
          isButton: p.isButton || true,
        })),
        gameStatus: data?.gameStatus || "playing",
        createdAt: data?.createdAt || createdAt(),
      };
      if (typeof pageId === "string") {
        updateJankenSpace(pageId, updateData).then(() => {
          mutate();
        });
        mutate();
      }
    },
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
      const updateData: StoreData = {
        title: data?.title || "",
        playerValues: playerSelect.map((p) => {
          if (p.playerId === playerId) {
            return {
              playerId: p.playerId,
              playerName: p.playerName,
              selectedValue: value,
              isButton: p.isButton || true,
            };
          } else {
            return {
              playerId: p.playerId,
              playerName: p.playerName,
              selectedValue: p.selectedValue,
              isButton: p.isButton || true,
            };
          }
        }),
        gameStatus: data?.gameStatus || "playing",
        createdAt: data?.createdAt || createdAt(),
      };
      if (typeof pageId === "string") {
        updateJankenSpace(pageId, updateData).then(() => {
          mutate();
        });
      }
    },
  };

  return { title, message, playerSelect, button, handlers, modalState };
};
