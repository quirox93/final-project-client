import Products from "@/components/Products";
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";
import { auth } from "@clerk/nextjs";

export default function Home() {
  const { userId } = auth();
  return (
    <>
      <PageWrapper>
        <div className="m-3">
          <Products userId={userId} />
        </div>
      </PageWrapper>
    </>
  );
}
