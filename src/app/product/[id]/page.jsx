import ProductDetail from "@/components/ProductDetail";
import { auth } from "@clerk/nextjs";

export default async function ProductDetailPage({ params }) {
  const { userId } = auth();
  const { id } = params;
  return <ProductDetail id={id} userId={userId} />;
}
