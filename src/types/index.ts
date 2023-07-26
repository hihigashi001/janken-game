import firebase from "firebase/compat/app";

// functions Props

export type PlayerSelectValues = PlayerSelectProps & { playerId: number };

export type getRockPaperScissorsResultType = { winner: "Rock" | "Paper" | "Scissors" } | "Draw";

// components Props

export type playerValues = {
  playerId: number;
  playerName: string;
  selectedValue: "Rock" | "Paper" | "Scissors" | null;
  isButton: boolean;
};

export type SelectModalProps = {
  handlers: {
    updateValue: () => void;
    modalClose: () => void;
    playerNameChange: (value: string) => void;
    selectValue: (value: "Rock" | "Paper" | "Scissors") => void;
  };
  modalState: {
    isOpen: boolean;
    playerId: number;
  };
  playerSelect: PlayerSelectValues[];
};

export type JankenAreaIndexProps = {
  pageId: string | string[] | undefined;
};

export type PlayerSelectProps = {
  playerName: string;
  onClick: () => void;
  selectedValue: "Rock" | "Paper" | "Scissors" | null;
  isButton?: boolean;
};

export type PlayerSelectWrapperProps = {
  children: React.ReactNode;
};

// Shared components Props

export type SelectProps = {
  options: {
    value: string;
    label: string;
  }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
};

export type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
};

export type InputProps = {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type MessageProps = {
  children: React.ReactNode;
  variant?: "standard" | "warning";
  winner?: "Rock" | "Paper" | "Scissors";
};

export type RoundButtonProps = {
  className?: string;
  onClick: () => void;
  variant?: "filled" | "outlined";
  disabled?: boolean;
};

export type RoundValueProps = {
  value?: "Rock" | "Paper" | "Scissors" | null;
};

export type TitleProps = {
  children: React.ReactNode;
};

export type WrapperProps = {
  children: React.ReactNode;
};

// hooks Props

export type useJankenStore = {
  playerSelect: PlayerSelectValues[];
  modalState: {
    isOpen: boolean;
    playerId: number;
  };
};

export type useJankenHandlers = {
  updateValue: () => void;
  modalClose: () => void;
  playerNameChange: (value: string) => void;
  selectValue: (value: "Rock" | "Paper" | "Scissors") => void;
};

export type useCreateJankenSpaceProps = {
  pageId?: string | string[] | undefined;
};

export type useCreateJankenSpaceStore = {
  title: string;
  playerCount: string;
};

export type useCreateJankenSpaceHandlers = {
  handleCreate: () => void;
  handleTitleChange: (value: string) => void;
  handlePlayerCountChange: (value: string) => void;
};

// API Props

export type StoreData = {
  title: string;
  playerValues: playerValues[];
  gameStatus: "waiting" | "playing" | "result";
  createdAt: firebase.firestore.Timestamp;
};
