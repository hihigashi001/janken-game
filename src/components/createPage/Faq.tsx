import React from "react";

export const Faq = () => {
  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h2 className="mb-5 text-3xl font-bold text-center text-gray-800">よくある質問</h2>
          <dl className="space-y-6 divide-y divide-gray-200">
            <div>
              <dt className="text-lg leading-6 font-medium text-gray-900">
                Q. どうやって遊ぶのでしょうか？
              </dt>
              <dd className="mt-2 text-base text-gray-500">
                A.
                人数と部屋名を入力してじゃんけん会場を作成してください。じゃんけん会場では、じゃんけんを選択ボタンから選択するだけです。じゃんけんポンボタンを押すと勝敗が確認できます。サイトのURLを共有することでオンライン上でお友達とも遊ぶことができます。
              </dd>
            </div>
            <div className="pt-6">
              <dt className="text-lg leading-6 font-medium text-gray-900">
                Q. じゃんけん履歴は残っていますか？
              </dt>
              <dd className="mt-2 text-base text-gray-500">
                A. じゃんけんの結果や履歴は残らない仕様になっています。
              </dd>
            </div>
            <div className="pt-6">
              <dt className="text-lg leading-6 font-medium text-gray-900">
                Q. じゃんけん終了後する方法は？
              </dt>
              <dd className="mt-2 text-base text-gray-500">
                A.
                特に終了方法などはありません。じゃんけん広場については、不定期で運営側で削除する予定です。
              </dd>
            </div>
            <div className="pt-6">
              <dt className="text-lg leading-6 font-medium text-gray-900">
                Q. 運営者について教えてください。
              </dt>
              <dd className="mt-2 text-base text-gray-500">
                A. 個人開発を趣味でやっている人間です。お問合せなどは受け付けておりません。
              </dd>
            </div>
            <div className="pt-6">
              <dt className="text-lg leading-6 font-medium text-gray-900">Q. 広告について</dt>
              <dd className="mt-2 text-base text-gray-500">
                A.
                サイト運営費用を捻出するため、ページ移動した時に広告が表示されることがありますが、ご了承下さい。
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};
