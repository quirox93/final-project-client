import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";

const ProductPopOver = ({popoverOpen, handleAddToCart, quantity, stock}) => {
  return (
    <Popover placement="left" offset={60} showArrow isOpen={popoverOpen}>
      <PopoverTrigger>
        <Button
          className=" flex mt-5  bg-primary rounded text-white m-auto  hover:shadow-lg hover:shadow-primary-500/50"
          onClick={handleAddToCart}
          disabled={stock === 0}
          size="sm"
        >
          Add
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">Products</div>
          <div className="text-tiny">Added {quantity}</div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProductPopOver;
