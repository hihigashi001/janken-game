import { LayoutProps } from "@/types";
import { Footer } from "./Footer";
import { Header } from "./Header";

const Layout = (props: LayoutProps) => {

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <Header />
        <div>{props.children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
