/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";
import NameOrders from "./NameOrders";
import {formatDate} from "../PurchasedProducts/utils"
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { HiShoppingBag } from "react-icons/hi";

import { SearchIcon } from "@/components/AdminProducts/SearchIcon";
import { ChevronDownIcon } from "@/components/AdminProducts/ChevronDownIcon";
import { capitalize } from "@/components/AdminProducts/utils";

import Actions from "./Actions";
import StatusOrder from "./StatusOrder";

const sort = {
  nameascending: (a, b) => a.name.localeCompare(b.name),
  namedescending: (a, b) => b.name.localeCompare(a.name),
  statusascending: (a, b) => a.status.localeCompare(b.status),
  statusdescending: (a, b) => b.status.localeCompare(a.status),
  statusMpascending: (a, b) => a.statusMp.localeCompare(b.statusMp),
  statusMpdescending: (a, b) => b.statusMp.localeCompare(a.statusMp),
  createdAtascending: (a, b) =>
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  createdAtdescending: (a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
};

export default function OrdersTable({
  orders,
  columns,
  statusOptions,
  statusColorMap,
  INITIAL_VISIBLE_COLUMNS,
}) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    const sortF = sort[sortDescriptor.column + sortDescriptor.direction];
    let filteredUsers = [...orders].sort(sortF);
    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((item) =>
        item.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((item) =>
        Array.from(statusFilter).includes(item.status)
      );
    }

    return filteredUsers;
  }, [orders, filterValue, statusFilter, sortDescriptor]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const renderCell = React.useCallback((_order, columnKey) => {
    const cellValue = _order[columnKey];
    switch (columnKey) {
      case "name":
        return <NameOrders order={_order} cellValue={cellValue} />;
      case "total":
        return (
          <div>
            <Popover placement="top" showArrow={true} color={"primary"}>
              <PopoverTrigger>
                <Button
                  color="primary"
                  variant="bordered"
                  size="sm"
                >{`$ ${_order.total}`}</Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="px-1 py-2">
                  <div className="text-small font-bold">Products</div>
                  <div className="text-tiny">
                    items: {_order.products.length}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        );

      case "createdAt":
        return (formatDate(cellValue));

      case "status":
          return (
          <StatusOrder
            statusColorMap={statusColorMap}
            status={cellValue}
            statusOptions={statusOptions}
            id={_order.mpId}
          />
        );
      case "statusMp":
        return (
          <Chip className="capitalize" color="primary" size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <>
            <Actions order={_order} statusColorMap={statusColorMap} />
          </>
        );
      default:
        return cellValue;
    }
  }, []);
  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);
  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {orders.length} orders
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    orders.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-center items-center gap-4">
        <Button
          isDisabled={pages === 1}
          size="sm"
          variant="flat"
          onPress={onPreviousPage}
        >
          Previous
        </Button>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <Button
          isDisabled={pages === 1}
          size="sm"
          variant="flat"
          onPress={onNextPage}
        >
          Next
        </Button>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Items table"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[400px max-sm:max-h-max]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="single"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No orders found"} items={items}>
        {(item) => {
          return (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          );
        }}
      </TableBody>
    </Table>
  );
}
