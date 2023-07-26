import { useRouter } from "next/router";
import { create } from "zustand";
import { addJankenSpace, createdAt } from "@/lib/apiClient";
import { StoreData, useCreateJankenSpaceHandlers, useCreateJankenSpaceStore } from "@/types";

const initialValues: useCreateJankenSpaceStore = {
  title: "じゃんけん広場",
  playerCount: "2",
};

const statusStore = create<useCreateJankenSpaceStore>(() => initialValues);

export const useCreateJankenSpace = () => {
  const router = useRouter();
  const { title, playerCount } = statusStore();

  const handlers: useCreateJankenSpaceHandlers = {
    handleCreate: async () => {
      const createData: StoreData = {
        title,
        playerValues: Array.from({ length: Number(playerCount) }).map((_, i) => ({
          playerId: i + 1,
          playerName: `playerName${i + 1}`,
          selectedValue: null,
          isButton: true,
        })),
        createdAt: createdAt(),
        gameStatus: "playing",
      };
      const id = await addJankenSpace(createData);
      id ? router.push(`/jankenSpace/${id}`) : alert("作成に失敗しました。");
    },
    handleTitleChange: (value) => {
      statusStore.setState({ title: value });
    },
    handlePlayerCountChange: (value) => {
      statusStore.setState({ playerCount: value });
    },
  };

  return { title, playerCount, handlers };
};
