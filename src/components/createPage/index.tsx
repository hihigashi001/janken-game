import { Title } from "@/components/shared/Title";
import { Wrapper } from "@/components/shared/Wrapper";
import { Input } from "@/components/shared/Input";
import { Select } from "@/components/shared/Select";
import { Button } from "@/components/shared/Button";
import { useCreateJankenSpace } from "@/hooks/useCreateJankenSpace";
import { SelectProps } from "@/types";
import { Faq } from "./Faq";
import { Policy } from "./Policy";

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
    <div className="flex flex-col gap-8 p-8">
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">サイト説明</h2>
        <p className="text-lg">
          このサイトはオンラインでじゃんけんをするためのサイトです。誰でも簡単に無料でご利用頂けます。
        </p>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">利用方法</h2>
        <ol className="list-decimal list-outside ml-6 space-y-2 text-lg">
          <li>以下のフォームを入力してじゃんけん会場を作成する</li>
          <li>作成されたじゃんけん会場のURLをメールやSNS等で共有する</li>
          <li>じゃんけんをする（ぐー、ちょき、ぱーを選ぶだけ）</li>
        </ol>
      </section>
      <p className="text-lg">簡単なのでまずは、やってみよ〜</p>
      <Wrapper>
        <Title>じゃんけん会場作成</Title>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-bold">会場名</label>
          <Input value={title} onChange={(e) => handlers.handleTitleChange(e.target.value)} />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-bold">参加人数</label>
          <Select
            value={playerCount}
            options={options}
            onChange={(e) => handlers.handlePlayerCountChange(e.target.value)}
          />
        </div>
        <Button onClick={handlers.handleCreate}>じゃんけん会場を作成する</Button>
      </Wrapper>
      <Faq />
      <Policy />
    </div>
  );
};

export default CreatePage;
