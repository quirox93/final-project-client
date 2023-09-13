import CartHandler from "@/components/CartHandler/CartHandler";
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";
import { auth } from "@clerk/nextjs";

const CartPage = () => {
  const { userId } = auth();
  return (
    <div>
      <PageWrapper>
        <CartHandler userId={userId} />
      </PageWrapper>
    </div>
  );
};

export default CartPage;
