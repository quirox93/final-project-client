import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  Chip,
} from "@nextui-org/react";

import { AiOutlineFilePdf } from "react-icons/ai";
import { MdReviews } from "react-icons/md";
import { BsArrowReturnLeft } from "react-icons/bs";
import { SiMercadopago } from "react-icons/si";
import DetailTableOrders from "./DetailTableOrders";

import { useRef } from "react";
import { captureView } from "./data";

function DetailOrder({
  isOpen,
  onOpenChange,
  order,
  DateShipment,
  statusColorMap
}) {
  const pdfRef = useRef(null);
  const downloadPDF = () => {
    const input = pdfRef.current;
    captureView(input);
  };

  return (
    <div>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="full"
      >
        <ModalContent>
          {(onClose) => (
            <div ref={pdfRef}>
              <ModalHeader className="flex items-center justify-between">
                <div className="flex items-end gap-2">
                  <h1 className="text-3xl">Order details</h1>
                  <h2 className="text-sm text-gray-600 m-1">
                    N°: <span className="text-xs">{order.mpId}</span>
                  </h2>
                </div>
                <Divider className=" my-1" orientation="vertical" />
                <div className=" my-2">
                  <h2 className="text-xs text-gray-600 m-2">{order.name}</h2>
                </div>
              </ModalHeader>
              <ModalBody>
                {/* botones opcion */}

                <div className="flex items-center justify-between">
                  <Button
                    color="primary"
                    variant="bordered"
                    startContent={<BsArrowReturnLeft size={20} />}
                    className="mx-2 p-5"
                    onPress={onClose}
                  >
                    Return
                  </Button>
                  <div>
                    <Button
                      color="primary"
                      variant="bordered"
                      startContent={<AiOutlineFilePdf size={20} />}
                      className="mx-2 p-5"
                      onPress={downloadPDF}
                    >
                      download
                    </Button>
                    <Button
                      color="primary"
                      variant="bordered"
                      startContent={<MdReviews size={20} />}
                      className="mx-2 p-5"
                    >
                      Request a review
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between gap-10 my-2">
                  <div className="flex-1 w-full border-2">
                    <h2 className="m-2 font-bold">Order summary</h2>
                    <h4 className="m-2 text-default-500 text-small">
                      Date of shipment:{" "}
                      <span className=" text-orange-500">
                        {order.status == "Success"
                          ? "Enviado en XXX fecha"
                          : order.status == "Pending"
                          ? "Pending shipment"
                          : "Canceled order"}
                      </span>
                    </h4>
                    <h4 className="m-2 text-default-500 text-small">
                      Date of purchase:
                      <span className=" text-default-foreground">
                        {` ${order.createdAt}`}
                      </span>
                    </h4>
                    <h4 className="m-2 text-default-500 text-small">
                      Shipping service:
                      <span className=" text-default-foreground"> DHL</span>
                    </h4>
                    <h4 className="m-2 text-default-500 text-small">
                      Payment metho:
                      <Chip
                        color="primary"
                        startContent={
                          <SiMercadopago
                            size={24}
                            className=" bg-white rounded-md text-blue"
                          />
                        }
                        radius="sm"
                        variant="bordered"
                        className="m-2"
                      >
                        Mercado Pago
                      </Chip>
                    </h4>
                  </div>
                  <div className="flex-1 w-full  border-2">
                    <h2 className="m-2 font-bold">Shipping information</h2>
                    <h4 className="m-2 text-default-500 text-small">
                      City: <span className=" font-bold">{order.city}</span>
                    </h4>

                    <h4 className="m-2 text-default-500 text-small">
                      Address:{" "}
                      <span className=" font-bold">{order.address}</span>
                    </h4>

                    <h4 className="m-2 text-default-500 text-small">
                      Zip: <span className=" font-bold">{order.cp}</span>
                    </h4>

                    <h4 className="m-2 text-default-500 text-small">
                      ID:{" "}
                      <span className=" font-bold">{order.identification}</span>
                    </h4>

                    <h4 className="m-2 text-default-500 text-small">
                      Email: <span className=" font-bold">{order.email}</span>
                    </h4>

                    <h4 className="m-2 text-default-500 text-small">
                      Name: <span className=" font-bold">{order.name}</span>
                    </h4>

                    <h4 className="m-2 text-default-500 text-small">
                      Phone: <span className=" font-bold">{order.phone}</span>
                    </h4>
                  </div>
                </div>

                {/* tabla de articulos comprados */}

                <div className="p-4">
                  <DetailTableOrders order={order} statusColorMap={statusColorMap}/>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
export default DetailOrder;
