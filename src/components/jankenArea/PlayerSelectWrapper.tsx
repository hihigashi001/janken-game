type Props = {
  children: React.ReactNode;
};

export const PlayerSelectWrapper = (props: Props) => {
  return <div className="flex flex-col gap-2">{props.children}</div>;
};
