import Products from "@/components/Products";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <>
    <div className="m-8">
      <SearchBar />
      <Products />

    </div>
    </>
  );
}
