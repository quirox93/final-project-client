import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

const AlertModalStock = ({ isOpen, onClose, name }) => {
  return (
    <Modal isOpen={isOpen} placement="center" onOpenChange={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Warning</ModalHeader>
            <ModalBody>
              <p>Maximum stock reached for {name}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default AlertModalStock;