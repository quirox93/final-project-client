import Products from "@/components/Products";
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";

export default function Home() {
  return (
    <>
      <PageWrapper>
        <div className="m-8">
          <Products />
        </div>
      </PageWrapper>
    </>
  );
}
