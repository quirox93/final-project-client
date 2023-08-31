import PurchasedProducts from "@/components/PurchasedProducts/PurchasedProducts";
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";
import { auth } from "@clerk/nextjs";
import { getOrderById, prodGetAll } from "@/utils/api";

const getData = async (clerkId) => getOrderById(clerkId);

const PurchasesPage = async () => {
  const { userId } = auth();
  const orders = await getData(userId);
  return (
    <div>
      <PageWrapper>
        <PurchasedProducts clerkId={userId} orders={orders} />
      </PageWrapper>
    </div>
  );
};

export default PurchasesPage;
