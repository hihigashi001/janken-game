import { addJankenSpace, createdAt } from "@/lib/apiClient";
import { useRouter } from "next/router";
import { create } from "zustand";

type Store = {
  title: string;
  playerCount: string;
};

type Handlers = {
  handleCreate: () => void;
  handleTitleChange: (value: string) => void;
  handlePlayerCountChange: (value: string) => void;
};

const initialValues: Store = {
  title: "じゃんけん広場",
  playerCount: "2",
};

const statusStore = create<Store>(() => initialValues);

export const useCreateJankenSpace = () => {
  const router = useRouter();
  const { title, playerCount } = statusStore();

  const handlers: Handlers = {
    handleCreate: async () => {
      const createData = {
        title,
        playerValues: Array.from({ length: Number(playerCount) }).map((_, i) => ({
          playerId: i + 1,
          playerName: `playerName${i + 1}`,
        })),
        createdAt: createdAt(),
      };
      const id = await addJankenSpace(createData);
      id ? router.push(`/jankenSpace/${id}`) : alert("作成に失敗しました。")
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
