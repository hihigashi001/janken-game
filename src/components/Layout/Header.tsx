import Link from "next/link";

export const Header = () => {
  return (
    <div className="flex justify-center items-center p-4 mb-4">
      <Link href="/">
        <h1 className="text-2xl text-gray-700 font-bold">じゃんけんWebサイト</h1>
      </Link>
    </div>
  );
};
