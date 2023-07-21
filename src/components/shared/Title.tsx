type Props = {
  children: React.ReactNode;
};

export const Title = (props: Props) => {
  return <h2 className="text-center">{props.children}</h2>;
};
