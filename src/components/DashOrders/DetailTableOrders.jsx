import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
  Image,
} from "@nextui-org/react";
const DetailTableOrders = ({ order, statusColorMap }) => {
  
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Content of the order</h1>
      <Table
        aria-label="Order items"
        shadow="none"
        className=" rounded-medium border-2 "
        bottomContent={
          <div className="flex justify-start items-center p-4 bg-primary-200 rounded-lg max-sm:p-2">
            <span className="text-lg font-bold">
              {`Total: $ ${parseFloat(order.total.toFixed(2))} `}
            </span>
          </div>
        }
      >
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Price</TableColumn>
          <TableColumn>Quantity</TableColumn>
          <TableColumn className="max-sm:hidden">Order Date</TableColumn>
        </TableHeader>
        <TableBody>
          {order.products?.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="flex items-center">
                <Image
                  width={50}
                  height={50}
                  src={
                    "https://res.cloudinary.com/db8y8eb5s/image/upload/v1691969460/products/ct8vgfnd2cepvevgqjxm.webp"
                  }
                  alt={"galaticus"}
                  className="max-sm:hidden"
                />
                <div className="ml-2">galaticus</div>
              </TableCell>
              <TableCell>
                <Chip
                  className="capitalize p-4 max-sm:p-0 max-sm:text-xs"
                  color={statusColorMap[order.status]}
                  size="sm max-sm:lg"
                  variant="flat"
                >
                  ${item.unit_price}
                </Chip>
              </TableCell>
              <TableCell>
                <Chip
                  className="capitalize p-4"
                  color={statusColorMap[order.status]}
                  size="sm"
                  variant="flat"
                >
                  {`«${item.quantity}`}
                </Chip>
              </TableCell>
              <TableCell className="max-sm:hidden">
                <Chip
                  className="capitalize p-4"
                  color={statusColorMap[order.status]}
                  size="sm"
                  variant="flat"
                >
                  {order.createdAt}
                </Chip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default DetailTableOrders;
