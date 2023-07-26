import { Title } from "@/components/shared/Title";
import { Wrapper } from "@/components/shared/Wrapper";
import { Input } from "@/components/shared/Input";
import { Select } from "@/components/shared/Select";
import { Button } from "@/components/shared/Button";
import { useCreateJankenSpace } from "@/hooks/useCreateJankenSpace";
import { SelectProps } from "@/types";

const options: SelectProps["options"] = [
  { value: "2", label: "2人" },
  { value: "3", label: "3人" },
  { value: "4", label: "4人" },
  { value: "5", label: "5人" },
  { value: "6", label: "6人" },
  { value: "7", label: "7人" },
  { value: "8", label: "8人" },
  { value: "9", label: "9人" },
];

const CreatePage = () => {
  const { title, playerCount, handlers } = useCreateJankenSpace();

  return (
    <div className="flex flex-col gap-4 p-4">
      <Title>じゃんけんサイト</Title>
      <div className="flex flex-col gap-2">
        <h3>サイト説明</h3>
        <p>
          このサイトはオンラインでじゃんけんをするためのサイトです。誰でも簡単に無料でご利用頂けます。
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h3>利用方法</h3>
        <ol className="list-decimal list-outside ml-4 space-y-2">
          <li>以下のフォームを入力してじゃんけん会場を作成する</li>
          <li>作成されたじゃんけん会場のURLをメールやSNS等で共有する</li>
          <li>じゃんけんをする（ぐー、ちょき、ぱーを選ぶだけ）</li>
        </ol>
      </div>
      <p>簡単なのでまずは、やってみよ〜</p>
      <Wrapper>
        <Title>じゃんけん会場作成</Title>
        <div>
          <span>会場名</span>
          <Input value={title} onChange={(e) => handlers.handleTitleChange(e.target.value)} />
        </div>
        <div>
          <span>参加人数</span>
          <Select
            value={playerCount}
            options={options}
            onChange={(e) => handlers.handlePlayerCountChange(e.target.value)}
          />
        </div>
        <Button onClick={handlers.handleCreate}>じゃんけん会場を作成する</Button>
      </Wrapper>
    </div>
  );
};

export default CreatePage;
