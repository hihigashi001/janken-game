import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaHome, FaLine, FaLink, FaTwitter } from "react-icons/fa";
import { LineShareButton, TwitterShareButton } from "react-share";

export const Footer = () => {
  const [isCopied, setIsCopied] = useState(false);
  const pathname = usePathname();
  const currentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`;
  const message = "じゃんけんゲームをしよう！";

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <div>
      <div className="border-t border-gray-200"></div>
      <div className="flex min-h-11 text-dark-blue mx-2 my-2">
        <div className="w-1/4 flex flex-col justify-center items-center">
          <Link href="/">
            <FaHome size={32} color="#86ADBF" />
            <span>home</span>
          </Link>
        </div>
        <div className="w-1/4 flex flex-col justify-center items-center">
          <TwitterShareButton title={message} url={currentUrl}>
            <FaTwitter size={32} color="#86ADBF" />
            <span>Twitter</span>
          </TwitterShareButton>
        </div>
        <div className="w-1/4 flex flex-col justify-center items-center">
          <LineShareButton title={message} url={currentUrl}>
            <FaLine size={32} color="#86ADBF" />
            <span>Line</span>
          </LineShareButton>
        </div>
        <div className="relative w-1/4 flex flex-col justify-center items-center">
          <div className="cursor-pointer">
            <CopyToClipboard onCopy={handleCopy} text={currentUrl}>
              <FaLink size={32} color="#86ADBF" />
            </CopyToClipboard>
            <span>copy</span>
          </div>
          {isCopied && (
            <div className="absolute top-0 left-4/5 py-1 px-2 transform -translate-x-1/2 bg-dark-red text-white rounded-md">
              Copied!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
