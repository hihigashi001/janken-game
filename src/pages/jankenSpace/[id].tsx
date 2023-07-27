import Layout from "@/components/Layout";
import Area from "@/components/jankenArea";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const pageId = router.query.id;

  return (
    <Layout>
      <Area pageId={pageId} />
    </Layout>
  );
};

export default Index;
