"use client"
import { useState } from "react";
import AlertModalStock from "@/components/AlertModalStock";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Button,
    Input,
    Image
    
} from "@nextui-org/react";

const CartTable = ({
    cartItems,
    removeFromCartFn,
    updateQuantityFn,
    handleCheckoutFn
}) => {
    const [showModal, setShowModal] = useState(false);
    const calculateSubtotal = (price, quantity) => {
        return price * quantity;
    };

    const calculateTotal = (cartItems) => {
        return cartItems.reduce((total, item) => total + calculateSubtotal(item.price, item.quantity), 0);
    };

    return (
        <div>
            
            <h1>Your Cart</h1>
            <Table aria-label="Cart items" bottomContent={(
                <div className="flex justify-between items-center p-4 bg-primary-200 rounded-lg">
                    <span className="text-lg font-bold">Total: ${calculateTotal(cartItems)}</span>
                    <Button
                        className="b-3 radius-20 bg-danger"
                        size="medium"
                        variant="secondary"
                        onClick={handleCheckoutFn}
                    >
                        Finalizar Compra
                    </Button>
                </div>
            )}>
                <TableHeader>
                  
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Price</TableColumn>
                    <TableColumn>Quantity</TableColumn>
                    <TableColumn>Subtotal</TableColumn>
                    <TableColumn>Delete</TableColumn>
                </TableHeader>
                <TableBody>
                    {cartItems.map(item => (
                        <TableRow key={item.id}>
                            
                            <TableCell className="flex items-center" >
                            <Image width={50} height={50} src={item.image} alt={item.name}/>
                             <div> {item.name}</div>
                  </TableCell>
                            <TableCell>${item.price}</TableCell>
                            <TableCell>
                                <Input
                                    className="w-20"
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => {
                                        if(e.target.value > item.stock){
                                          {setShowModal(true)}
                                          <AlertModalStock isOpen={showModal} onClose={() => setShowModal(false)} name={item.name}/>      
                                        } else{updateQuantityFn(item.id, e.target.value)}
                                        }}
                                         min={1}
                                         max={item.stock}
                                 
                                />
                            </TableCell>
                            <TableCell>${calculateSubtotal(item.price, item.quantity)}</TableCell>
                            <TableCell>
                                <Button
                                    size="small"
                                    variant="text"
                                    onClick={() => removeFromCartFn(item.id)}
                                >
                                    X
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CartTable;
