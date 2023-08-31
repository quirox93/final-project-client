import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Wallet } from "@mercadopago/sdk-react";
import Link from "next/link";

const CartRedirect = ({ isOpen, onClose, preferenceId }) => {
  return (
    <Modal isOpen={isOpen} placement="center" onOpenChange={onClose} isDismissable={false}>
      <ModalContent>
        <ModalHeader>Finalizar Compra con Mercado Pago</ModalHeader>
        <ModalBody>
          <p>Seras redirigido a mercado pago.</p>
          {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
        </ModalBody>
        <ModalFooter>
        <Link
         
          isExternal
          showAnchorIcon
          href="https://developers.mercadopago.com"
        >
          https://developers.mercadopago.com
        </Link>
        
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CartRedirect;