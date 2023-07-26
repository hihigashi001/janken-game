import Image from "next/image";
import { RoundValueProps } from "@/types";

export const RoundValue = (props: RoundValueProps) => {
  if (props.value === "Rock")
    return <Image src="/images/Rock.png" width={72} height={72} alt="value rock" />;
  if (props.value === "Scissors")
    return <Image src="/images/Scissors.png" width={72} height={72} alt="value rock" />;
  if (props.value === "Paper")
    return <Image src="/images/Paper.png" width={72} height={72} alt="value rock" />;
  return (
    <div className="w-16 h-16 rounded-full border-4 text-2xl flex justify-center items-center focus:outline-none border-dark-blue bg-dark-blue text-white m-1">
      ?
    </div>
  );
};
