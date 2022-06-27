import Image1 from "./Images/ads0.png";
import Image2 from "./Images/ads1.jpg";
import Image3 from "./Images/ads2.png";
import Image4 from "./Images/ads3.png";
import Image5 from "./Images/ads4.png";

import Seafreight from "./Images/parcel.jpg";
import Warehouse from "./Images/parcel.jpg";
import ParcelTracking from "./Images/parcel.jpg";

import FacebookLogo from "./Images/facebook.png";
import InstaLogo from "./Images/instagram.png";
import WhatsAppLogo from "./Images/whatsapp.png";
import CompanyLogo from "./Images/logo.png";

const data = {
  company: "YNL Logistics & Services",
  carousel: [
    { image: Image1 },
    { image: Image2 },
    { image: Image3 },
    { image: Image4 },
    { image: Image5 },
  ],
  tabs: [
    {
      top: "1,100,000+",
      bottom: "Malaysian Customer",
    },
    {
      top: "2,000,000+",
      bottom: "Parcel Delivered Monthly",
    },
    {
      top: "100%",
      bottom: "Coverage in Sabah",
    },
  ],
  tracker: {
    title: "中国直通沙巴納閩海运",
    placeholder: "快遞單號",
    button: "查詢單號",
  },
  about: {
    title: "Enjoy convenience with us",
    description:
      "Enjoy hassle-free delivery with the leading courier company in Singapore and across Southeast Asia. Whether it’s parcel collection or home delivery in Singapore, we make life easier for both shippers and recipients.",
    cards: [
      {
        image: Seafreight,
        title: "Sea Freight Shipping",
        description:
          "Shipping goods by sea is still popular nowadays due to low cost, high sea vessel load capacity, and minimal restrictions on vessel carrying capacity.",
      },
      {
        image: Warehouse,
        title: "Warehouse in China",
        description:
          "We provide warehouse services in China. Customers can ship parcels separately to the warehouse, and we will ship to Kota Kinabalu automaticaly.",
      },
      {
        image: ParcelTracking,
        title: "Parcel Tracking",
        description:
          "View the latest delivery statuses of all your shipments in one place and notify receiver via SMS.",
      },
    ],
  },
  updates: [
    {
      title: "海运费價格調整通告",
      description: "調整價格将从24/3/2022之后装柜货有效",
      date: "21/3/2022 10:52 AM",
    },
    {
      title: "海运费價格調整通告",
      description: "調整價格将从24/3/2022之后装柜货有效",
      date: "21/3/2022 10:52 AM",
    },
    {
      title: "海运费價格調整通告",
      description: "調整價格将从24/3/2022之后装柜货有效",
      date: "21/3/2022 10:52 AM",
    },
    {
      title: "海运费價格調整通告",
      description: "調整價格将从24/3/2022之后装柜货有效",
      date: "21/3/2022 10:52 AM",
    },
  ],
  footer: {
    company: CompanyLogo,
    logos: [
      {
        icon: FacebookLogo,
        name: "YNL Logistics",
        type: "facebook",
      },
      {
        icon: InstaLogo,
        name: "@ynllogistics",
        type: "instagram",
      },
      {
        icon: WhatsAppLogo,
        name: "+6016 200 2859",
        type: "whatsapp",
      },
    ],
    word: "Thank you for supporting us.",
    word2: "",
    word3: "",
    copyright: `COPYRIGHT ${"\u00A9"} ${new Date().getFullYear()}`,
    rights: "YNL LOGISTICS & SERVICES SDN. BHD. ALL RIGHTS RESERVED.",
  },
};

export default data;
