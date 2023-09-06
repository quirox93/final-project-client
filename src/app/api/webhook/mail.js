import { GMAIL_MAIL, GMAIL_PASS } from "@/utils/config";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: GMAIL_MAIL,
    pass: GMAIL_PASS,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

export const purchaseNotification = (dbOrder, host) => {
  const generateTableRows = () => {
    let tableRows = "";
    let totalAmount = 0;

    dbOrder.items.forEach((item) => {
      const itemTotal = item.unit_price * item.quantity;
      totalAmount += itemTotal;
      tableRows += `
        <tr>
          <td>
            <img src="" alt="" width="50" />
            Product ${item._id.name}
          </td>
          <td>${item.unit_price.toFixed(2)}</td>
          <td>${item.quantity}</td>
          <td>${(item.unit_price * item.quantity).toFixed(2)}</td>
        </tr>
      `;
    });

    return { tableRows, totalAmount };
  };
  const { tableRows, totalAmount } = generateTableRows();
  return {
    from: GMAIL_MAIL,
    to: dbOrder.payer.email,
    subject: "New Purchase",
    html: `
  <html>
<head>
<style>
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}
.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}
.header {
    background-color: #007bff;
    color: white;
    text-align: center;
    padding: 10px 0;
}
.product-list {
    border-collapse: collapse;
    width: 100%;
}
.product-list th,
.product-list td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}
.product-list th {
    background-color: #f2f2f2;
}
.button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
}
</style>
</head>
<body>
<div class="container">
<div class="header">
    <h1>Thank You for Your Purchase!</h1>
</div>
<p>Hello <strong>${dbOrder.payer.name}</strong>,</p>
<p>Your order with Order Number <strong>${
      dbOrder.mpId
    }</strong> has been processed successfully.</p>
<p>Here is the list of products you purchased:</p>
<table class="product-list">
      <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total</th>
      </tr>
      ${tableRows} 
    </table>
    <p>Total Amount: <strong>${totalAmount.toFixed(2)}</strong></p> 
<p>Thank you for shopping with us!</p>
<p><a class="button" href="${host}/purchases">Track Your Order</a></p>
<p>If you have any questions, feel free to contact our customer support.</p>
<p>Best regards,</p>
<p>The Online Store Team</p>
</div>
</body>
</html>`,
  };
};
