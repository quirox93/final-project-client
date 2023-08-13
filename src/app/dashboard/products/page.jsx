import DashProducts from "@/components/DashProducts";
import SearchBar from "@/components/SearchBar";
import FilterModal from "@/components/FilterModal";

const ProductsDash = () => {
  return (
    <div className="my-8">
      <SearchBar />
      <div className="flex mt-10 justify-evenly my-8">
        <FilterModal />
        <FilterModal />
        <FilterModal />
      </div>
      <div className="flex justify-center">
        <DashProducts />
      </div>
    </div>
  );
};

export default ProductsDash;
