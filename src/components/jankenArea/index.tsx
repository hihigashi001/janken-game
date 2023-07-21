import { Title } from "@/components/shared/Title";
import { Wrapper } from "@/components/shared/Wrapper";
import { Button } from "@/components/shared/Button";
import { Message } from "../shared/Message";
import { PlayerSelect } from "./PlayerSelect";
import { PlayerSelectWrapper } from "./PlayerSelectWrapper";
import { useJanken } from "./useJanken";
import { SelectModal } from "./SelectModal";

const Index = () => {
  const { title, message, playerSelect, button, modalState } = useJanken();

  return (
    <>
      {modalState.isOpen && <SelectModal />}
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
        <Message variant={message.variant}>{message.children}</Message>
        <Button onClick={button.onClick} disabled={button.disabled}>
          {button.children}
        </Button>
      </Wrapper>
    </>
  );
};

export default Index;
