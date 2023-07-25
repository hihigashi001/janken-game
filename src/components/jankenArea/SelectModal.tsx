import Image from "next/image";

import { Button } from "@/components/shared/Button";
import { Title } from "@/components/shared/Title";
import { Input } from "@/components/shared/Input";

import { PlayerSelect } from "./useJanken"

type SelectModalProps = {
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
  playerSelect: PlayerSelect[];
};

export const SelectModal = ({ playerSelect, modalState, handlers }: SelectModalProps) => {
  const playerName = playerSelect.find((p) => p.playerId === modalState.playerId)?.playerName ?? "";

  const handlePlayerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handlers.playerNameChange(e.target.value);
  };

  const handleImageClick = (value: "Rock" | "Paper" | "Scissors") => {
    handlers.modalClose();
    handlers.selectValue(value);
  };

  const handleAiSelect = () => {
    const random = Math.floor(Math.random() * 3);
    const value = ["Rock", "Paper", "Scissors"][random] as "Rock" | "Paper" | "Scissors";
    handlers.modalClose();
    handlers.selectValue(value);
  };

  const handlePrevClick = () => {
    handlers.updateValue();
    handlers.modalClose();
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="player-select-modal"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white p-4">
              <div className="flex gap-2 text-center justify-center items-center mb-4">
                <Input value={playerName} onChange={handlePlayerNameChange} />
                <div className="w-20">さん</div>
              </div>
              <Title>選択してください</Title>
              <div className="w-full flex gap-8 justify-center my-12">
                <Image
                  src="/images/Rock.png"
                  width={72}
                  height={72}
                  alt="value Rock"
                  className="hover:cursor-pointer"
                  onClick={() => handleImageClick("Rock")}
                />
                <Image
                  src="/images/Scissors.png"
                  width={72}
                  height={72}
                  alt="value Scissors"
                  className="hover:cursor-pointer"
                  onClick={() => handleImageClick("Scissors")}
                />
                <Image
                  src="/images/Paper.png"
                  width={72}
                  height={72}
                  alt="value Paper"
                  className="hover:cursor-pointer"
                  onClick={() => handleImageClick("Paper")}
                />
              </div>
              <div className="flex flex-col gap-4">
                <Button variant="primary" onClick={handleAiSelect}>
                  コンピュータにお任せする
                </Button>
                <Button variant="secondary" onClick={handlePrevClick}>
                  選択しないで戻る
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
