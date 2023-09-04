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
      createdAt: dateFormat(order.createdAt),
      total: totalOrder(order.items),
      statusMp: order.mpStatus,
      phone: order.payer.phone,
      
    };
  });
  return format;
};
const totalOrder = (items) => {
  return items.reduce((total, item) => total + item.unit_price * item.quantity, 0);
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

export const order = [
  {
    payer: {
      clerkId: "user_2UBZtSTnjzVyVAVYOnKs5qqGpv9",
      name: "Brian Quiroz",
      email: "quirox01@gmail.com",
      city: "Bogota",
      address: "Marcos grigera 2036",
      identification: 123123123,
      cp: 1828,
      phone: 1128532014,
    },
    _id: "1",
    status: "Pending",
    mpId: "1453720691-3e8c7420-6288-493a-b9ec-7782512c8324",
    mpStatus: "APRO",
    items: [
      {
        quantity: 3,
        unit_price: 10,
        _id: "64d967b46baea30ee160c129",
      },
      {
        quantity: 1,
        unit_price: 20,
        _id: "64d967c36baea30ee160c130",
      },
    ],
    createdAt: "2023-08-20T14:36:36.301Z",
    updatedAt: "2023-08-20T14:36:36.301Z",
    __v: 110,
  },
  {
    payer: {
      clerkId: "user_2UBZtSTnjzVyVAVYOnKs5qqGpv9",
      name: "Zoey Lang",
      city: "Medellin",
      email: "zoey.lang@example.com",
      address: "Marcos grigera 2036",
      identification: 123123123,
      cp: 1828,
      phone: 1128532014,
    },
    _id: "2",
    status: "Success",
    mpId: "1453720691-66998a7b-5d3e-4288-b46b-e33d9d89cec7",
    mpStatus: "APRO",
    items: [
      {
        quantity: 6,
        unit_price: 10,
        _id: "64d967b46baea30ee160c129",
      },
      {
        quantity: 1,
        unit_price: 20,
        _id: "64d967c36baea30ee160c130",
      },
    ],
    createdAt: "2023-07-01T12:36:36.301Z",
    updatedAt: "2023-07-01T12:36:36.301Z",
    __v: 200,
  },
  {
    payer: {
      clerkId: "user_2UBZtSTnjzVyVAVYOnKs5qqGpv9",
      name: "Jane Fisher",
      city: "Cucuta",
      email: "jane.fisher@example.com",
      address: "Marcos grigera 2036",
      identification: 123123123,
      cp: 1828,
      phone: 1128532014,
    },
    _id: "3",
    status: "Success",
    mpId: "1453720691-66998a7b-5d3e-4288-b46b-e33d9d89cec7",
    mpStatus: "APRO",
    items: [
      {
        quantity: 1,
        unit_price: 10,
        _id: "64d967b46baea30ee160c129",
      },
      {
        quantity: 1,
        unit_price: 20,
        _id: "64d967c36baea30ee160c130",
      },
    ],
    createdAt: "2023-08-28T11:36:36.301Z",
    updatedAt: "2023-08-28T11:36:36.301Z",
    __v: 300,
  },
  {
    payer: {
      clerkId: "user_2UBZtSTnjzVyVAVYOnKs5qqGpv9",
      name: "Hector Gomez",
      city: "Cartagena",
      email: "camiloduquee@gmail.com",
      address: "Marcos grigera 2036",
      identification: 123123123,
      cp: 1828,
      phone: 1128532014,
    },
    _id: "4",
    status: "Canceled",
    mpId: "1453720691-66998a7b-5d3e-4288-b46b-e33d9d89cec7",
    mpStatus: "FUND",
    items: [
      {
        quantity: 9,
        unit_price: 10,
        _id: "64d967b46baea30ee160c129",
      },
      {
        quantity: 1,
        unit_price: 20,
        _id: "64d967c36baea30ee160c130",
      },
    ],
    createdAt: "2023-08-29T15:36:36.301Z",
    updatedAt: "2023-08-29T15:36:36.301Z",
    __v: 10,
  },
  {
    payer: {
      clerkId: "user_2UBZtSTnjzVyVAVYOnKs5qqGpv9",
      name: "Luciano Emilio",
      email: "LucianoEmilio@gmail.com",
      city: "Cartagena",
      address: "Marcos grigera 2036",
      identification: 123123123,
      cp: 1828,
      phone: 1128532014,
    },
    _id: "5",
    status: "Success",
    mpId: "1453720691-66998a7b-5d3e-4288-b46b-e33d9d89cec7",
    mpStatus: "APRO",
    items: [
      {
        quantity: 12,
        unit_price: 10,
        _id: "64d967b46baea30ee160c129",
      },
      {
        quantity: 1,
        unit_price: 20,
        _id: "64d967c36baea30ee160c130",
      },
    ],
    createdAt: "2023-08-29T09:36:36.301Z",
    updatedAt: "2023-08-29T09:36:36.301Z",
    __v: 45,
  },
  {
    payer: {
      clerkId: "user_2UBZtSTnjzVyVAVYOnKs5qqGpv9",
      name: "Manuel",
      email: "Manuel@gmail.com",
      city: "Cartagena",
      address: "Marcos grigera 2036",
      identification: 123123123,
      cp: 1828,
      phone: 1128532014,
    },
    _id: "6",
    status: "Pending",
    mpId: "1453720691-66998a7b-5d3e-4288-b46b-e33d9d89cec7",
    mpStatus: "APRO",
    items: [
      {
        quantity: 2,
        unit_price: 10,
        _id: "64d967b46baea30ee160c129",
      },
      {
        quantity: 1,
        unit_price: 20,
        _id: "64d967c36baea30ee160c130",
      },
    ],
    createdAt: "2023-08-28T16:36:36.301Z",
    updatedAt: "2023-08-28T16:36:36.301Z",
    __v: 5,
  },
  {
    payer: {
      clerkId: "user_2UBZtSTnjzVyVAVYOnKs5qqGpv9",
      name: "Zoey Lang",
      city: "Cartagena",
      email: "zoey.lang@example.com",
      address: "Marcos grigera 2036",
      identification: 123123123,
      cp: 1828,
      phone: 1128532014,
    },
    _id: "7",
    status: "Success",
    mpId: "1453720691-66998a7b-5d3e-4288-b46b-e33d9d89cec7",
    mpStatus: "APRO",
    items: [
      {
        quantity: 3,
        unit_price: 10,
        _id: "64d967b46baea30ee160c129",
      },
      {
        quantity: 2,
        unit_price: 20,
        _id: "64d967c36baea30ee160c130",
      },
      {
        quantity: 2,
        unit_price: 20,
        _id: "64d967c36baea30ee160c130",
      },
    ],
    createdAt: "2023-08-29T13:36:36.301Z",
    updatedAt: "2023-08-29T13:36:36.301Z",
    __v: 1000,
  },
  {
    payer: {
      clerkId: "user_2UBZtSTnjzVyVAVYOnKs5qqGpv9",
      name: "Warben3D",
      email: "Warben3D@example.com",
      city: "Cartagena",
      address: "Marcos grigera 2036",
      identification: 123123123,
      cp: 1828,
      phone: 1128532014,
    },
    _id: "8",
    status: "Canceled",
    mpId: "1453720691-66998a7b-5d3e-4288-b46b-e33d9d89cec7",
    mpStatus: "EXPI",
    items: [
      {
        quantity: 2,
        unit_price: 10,
        _id: "64d967b46baea30ee160c129",
      },
      {
        quantity: 1,
        unit_price: 20,
        _id: "64d967c36baea30ee160c130",
      },
    ],
    createdAt: "2023-08-29T20:36:36.301Z",
    updatedAt: "2023-08-29T20:36:36.301Z",
    __v: 400,
  },
  {
    payer: {
      clerkId: "user_2UBZtSTnjzVyVAVYOnKs5qqGpv9",
      name: "Brian Leonardo",
      email: "brianL@gmail.com",
      city: "Cartagena",
      address: "Marcos grigera 2036",
      identification: 123123123,
      cp: 1828,
      phone: 1128532014,
    },
    items: ["64d967b46baea30ee160c129", "64d967c36baea30ee160c130"],
    _id: "9",
    status: "Canceled",
    mpId: "1453720691-66998a7b-5d3e-4288-b46b-e33d9d89cec7",
    mpStatus: "EXPI",
    items: [
      {
        quantity: 2,
        unit_price: 10,
        _id: "64d967b46baea30ee160c129",
      },
      {
        quantity: 1,
        unit_price: 20,
        _id: "64d967c36baea30ee160c130",
      },
    ],
    createdAt: "2023-08-28T11:36:36.301Z",
    updatedAt: "2023-08-28T11:36:36.301Z",
    __v: 120,
  },
  {
    payer: {
      clerkId: "user_2UBZtSTnjzVyVAVYOnKs5qqGpv9",
      name: "Monica",
      email: "Monica@gmail.com",
      city: "Cartagena",
      address: "Marcos grigera 2036",
      identification: 123123123,
      cp: 1828,
      phone: 1128532014,
    },
    _id: "10",
    status: "Success",
    mpId: "1453720691-66998a7b-5d3e-4288-b46b-e33d9d89cec7",
    mpStatus: "APRO",
    items: [
      {
        quantity: 20,
        unit_price: 10,
        _id: "64d967b46baea30ee160c129",
      },
      {
        quantity: 10,
        unit_price: 20,
        _id: "64d967c36baea30ee160c130",
      },
      {
        quantity: 10,
        unit_price: 20,
        _id: "64d967c36baea30ee160c130",
      },
      {
        quantity: 5,
        unit_price: 20,
        _id: "64d967c36baea30ee160c130",
      },
    ],
    createdAt: "2023-08-29T07:36:36.301Z",
    updatedAt: "2023-08-29T07:36:36.301Z",
    __v: 45,
  },
  {
    payer: {
      clerkId: "user_2UBZtSTnjzVyVAVYOnKs5qqGpv9",
      name: "Brian Leonardo",
      email: "brianL@gmail.com",
      city: "Cartagena",
      address: "Marcos grigera 2036",
      identification: 123123123,
      cp: 1828,
      phone: 1128532014,
    },
    items: ["64d967b46baea30ee160c129", "64d967c36baea30ee160c130"],
    _id: "11",
    status: "Sent",
    mpId: "1453720691-66998a7b-5d3e-4288-b46b-e33d9d89cec7",
    mpStatus: "EXPI",
    items: [
      {
        quantity: 2,
        unit_price: 10,
        _id: "64d967b46baea30ee160c129",
      },
      {
        quantity: 1,
        unit_price: 20,
        _id: "64d967c36baea30ee160c130",
      },
    ],
    createdAt: "2023-08-28T11:36:36.301Z",
    updatedAt: "2023-08-28T11:36:36.301Z",
    __v: 120,
  },
  {
    payer: {
      clerkId: "user_2UBZtSTnjzVyVAVYOnKs5qqGpv9",
      name: "Brian Leonardo",
      email: "brianL@gmail.com",
      city: "Cartagena",
      address: "Marcos grigera 2036",
      identification: 123123123,
      cp: 1828,
      phone: 1128532014,
    },
    items: ["64d967b46baea30ee160c129", "64d967c36baea30ee160c130"],
    _id: "12",
    status: "Sent",
    mpId: "1453720691-66998a7b-5d3e-4288-b46b-e33d9d89cec7",
    mpStatus: "EXPI",
    items: [
      {
        quantity: 2,
        unit_price: 10,
        _id: "64d967b46baea30ee160c129",
      },
      {
        quantity: 1,
        unit_price: 20,
        _id: "64d967c36baea30ee160c130",
      },
    ],
    createdAt: "2023-08-28T11:36:36.301Z",
    updatedAt: "2023-08-28T11:36:36.301Z",
    __v: 120,
  },
];

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
