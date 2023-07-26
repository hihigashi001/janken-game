import { TitleProps } from "@/types"

export const Title = (props: TitleProps) => {
  return <h2 className="text-center">{props.children}</h2>;
};
