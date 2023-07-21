type Props = {
  children: React.ReactNode;
};

export const Wrapper = (props: Props) => {
  return (
    <div className="w-full h-full p-4">
      <div className="flex flex-col gap-8 justify-center w-full h-full p-8 border border-gray-400 rounded-md">{props.children}</div>
    </div>
  );
};
