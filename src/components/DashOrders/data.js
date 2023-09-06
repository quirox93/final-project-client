import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const dateFormat = (createdAt) => {
  return new Date(createdAt).toGMTString("en-US");
};
export const formatOrders = (items) => {
  const format = items.map((order) => {
    return {
      id: order._id,
      mpId: order.mpId,
      status: order.status,
      name: order.payer.name,
      identification: order.payer.identification,
      city: order.payer.city,
      email: order.payer.email,
      address: order.payer.address,
      cp: order.payer.cp,
      products: order.items,
      createdAt: order.createdAt,
      total: totalOrder(order.items),
      statusMp: order.mpStatus,
      phone: order.payer.phone,
    };
  });

  return format;
};
const totalOrder = (items) => {
  return items.reduce(
    (total, item) => total + item.unit_price * item.quantity,
    0
  );
};
export const captureView = (input) =>
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4", true);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 30;
    pdf.addImage(
      imgData,
      "PNG",
      imgX,
      imgY,
      imgWidth * ratio,
      imgHeight * ratio
    );
    pdf.save("OrderGod.pdf");
  });

export const values = [10000, 4000, 2000, 2500, 23000, 500, 14040];
export const day = ["Mon", "Tues", "wed", "Thurs", "Fri", "Sat", "Sun"];
export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
