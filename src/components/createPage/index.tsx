import { Title } from "@/components/shared/Title";
import { Wrapper } from "@/components/shared/Wrapper";
import { Input } from "@/components/shared/Input";
import { Select, SelectProps } from "@/components/shared/Select";
import { Button } from "../shared/Button";

import { addJankenSpace, createdAt } from "@/lib/apiClient";

const options: SelectProps["options"] = [
  { value: "2", label: "2人" },
  { value: "3", label: "3人" },
  { value: "4", label: "4人" },
  { value: "5", label: "5人" },
  { value: "6", label: "6人" },
  { value: "7", label: "7人" },
  { value: "8", label: "8人" },
  { value: "9", label: "9人" }
];

const CreatePage = () => {
  const mockData = {
      title: "testタイトル",
      playerValues: [
        {
          playerId: 1,
          playerName: "player1",
        },
        {
          playerId: 2,
          playerName: "player2",
        },
        {
          playerId: 3,
          playerName: "player3",
        }
      ],
      createdAt: createdAt(),
  }

  const handleCreate = async () => {
    const res = await addJankenSpace(mockData);
    console.log(res);
  }
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
          <Input onChange={() => {}} />
        </div>
        <div>
          <span>参加人数</span>
          <Select options={options}/>
        </div>
        <Button onClick={handleCreate}>じゃんけん会場を作成する</Button>
      </Wrapper>
    </div>
  );
};

export default CreatePage;
