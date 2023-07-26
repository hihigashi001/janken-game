import { Title } from "@/components/shared/Title";
import { Wrapper } from "@/components/shared/Wrapper";
import { Button } from "@/components/shared/Button";
import { Message } from "@/components/shared/Message";
import { useJanken } from "@/hooks/useJanken";
import { JankenAreaIndexProps } from "@/types";

import { PlayerSelect } from "./PlayerSelect";
import { PlayerSelectWrapper } from "./PlayerSelectWrapper";
import { SelectModal } from "./SelectModal";

const Index = ({ pageId }: JankenAreaIndexProps) => {
  const { title, message, playerSelect, button, modalState, handlers } = useJanken({ pageId });

  return (
    <>
      {modalState.isOpen && (
        <SelectModal playerSelect={playerSelect} modalState={modalState} handlers={handlers} />
      )}
      <Wrapper>
        <Title>{title}</Title>
        <PlayerSelectWrapper>
          {playerSelect.map((p) => (
            <PlayerSelect
              key={p.playerId}
              playerName={p.playerName}
              onClick={p.onClick}
              selectedValue={p.selectedValue}
              isButton={p.isButton}
            />
          ))}
        </PlayerSelectWrapper>
        <Message winner={message.winner} variant={message.variant}>
          {message.children}
        </Message>
        <Button onClick={button.onClick} disabled={button.disabled}>
          {button.children}
        </Button>
      </Wrapper>
    </>
  );
};

export default Index;
