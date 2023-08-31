"use client"
import React from 'react';
import { useDispatch } from 'react-redux';
import { selectedProducts } from "@/store/slice";
import { Button, Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Modal, ModalContent } from "@nextui-org/react";
import { useRouter, useSearchParams } from 'next/navigation';

const CartFailure = ({ userId, isOpen, onClose }) => {
  const searchParams = useSearchParams(); // Obtener parámetros de la URL
  const router = useRouter();
  const dispatch = useDispatch();
  dispatch(selectedProducts([]));

  const status = searchParams.get('status'); // Estado desde los parámetros de la URL
  const paymentId = searchParams.get('payment_id'); // ID de pago desde los parámetros de la URL

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <Card className="max-w-[400px]">
          <CardHeader className="flex gap-3">
            <Image
              alt="Guardian of Decks logo"
              height={40}
              radius="sm"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-small text-default-500">Guardian of Decks</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div>
              <h1>¡Error in payment!</h1>
              <p>State: {status}</p>
              <p>Payment ID: {paymentId}</p>
              <div>
                <h2>Details:</h2>
                <p>Buyer ID: {userId}</p>
                <p>Buyer Details: {""}</p>
              </div>
              <div>
                <Button onClick={() => router.push("/")}>Go back</Button>
              </div>
            </div>
          </CardBody>
          <Divider />
          <CardFooter>
            <Link isExternal showAnchorIcon href="https://developers.mercadopago.com">
              https://developers.mercadopago.com
            </Link>
          </CardFooter>
        </Card>
      </ModalContent>
    </Modal>
  );
};

export default CartFailure;
