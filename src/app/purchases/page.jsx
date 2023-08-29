import PurchasedProducts from "@/components/PurchasedProducts/PurchasedProducts";
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";
import { auth } from "@clerk/nextjs";

const PurchasesPage = () => {
    const {userId} = auth();
    
    
  return (
    <div>
        <PageWrapper>
            <PurchasedProducts clerkId={userId}/>
        </PageWrapper>
    </div>
  )
}

export default PurchasesPage;