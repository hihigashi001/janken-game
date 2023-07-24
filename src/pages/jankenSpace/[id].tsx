import Area from "@/components/jankenArea";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const pageId = router.query.id;

  return <Area pageId={pageId} />;
};

export default Index;
