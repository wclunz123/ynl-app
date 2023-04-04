// import Image1 from "./Images/ads0.png";
// import Image2 from "./Images/ads1.jpg";
// import Image3 from "./Images/ads2.png";
// import Image4 from "./Images/ads3.png";
// import Image5 from "./Images/ads4.png";

import Image1 from "./Images/Picture1.jpg";
import Image2 from "./Images/Picture2.jpg";
import Image3 from "./Images/Picture3.jpg";
import Image4 from "./Images/Picture4.jpg";

import Seafreight from "./Images/airfreight.jpg";
import Warehouse from "./Images/custom.jpg";
import ParcelTracking from "./Images/truck.jpg";
import Packing from "./Images/packing.png";

import FacebookLogo from "./Images/facebook.png";
import InstaLogo from "./Images/instagram.png";
import WhatsAppLogo from "./Images/whatsapp.png";
import CompanyLogo from "./Images/logo.png";

const data = {
  company: "HK Cargo Services",
  carousel: [
    { image: Image1 },
    { image: Image2 },
    { image: Image3 },
    { image: Image4 },
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
        title: "Air Freight Shipping",
        description:
          "Licensed agent from Malaysia Airlines (MH), Raya Airway (RASB), focuses on providing airway bills and to the purpose of exporting goods from W.P Labuan and importing goods to W.P Labuan (from West Malaysia extended to Singapore) .",
      },
      {
        image: Warehouse,
        title: "Custom Declaration",
        description:
          "We provide services of declaring goods through customs for importers and exporters.  All staffs are trained and experience in handling all sort of goods and responsible on forwarding and documentation.",
      },
      {
        image: ParcelTracking,
        title: "Transportation",
        description:
          "HK Cargo equipped with range of transportation vehicles which includes 3T & 4T forklift, 3T trucks. We aimed to serve our customer the most competitive rates and ensure all goods are delivered timely. To better facilitate our customer, HK Cargo also provide services from goods packaging to supply of labour on handling the goods.",
      },
      {
        image: Packing,
        title: "Packaging",
        description:
          "Our company offers professional packing services to ensure your valuable goods are properly protected during transportation. Our experienced team uses high-quality packing materials and techniques to guarantee safe delivery of your items to their destination.",
      },
    ],
  },
  footer: {
    company: CompanyLogo,
    logos: [
      {
        icon: FacebookLogo,
        name: "HK Cargo Services",
        type: "facebook",
      },
      {
        icon: InstaLogo,
        name: "@hkcargoservices",
        type: "instagram",
      },
      {
        icon: WhatsAppLogo,
        name: "+6012 834 3511",
        type: "whatsapp",
      },
    ],
    word: "Thank you for supporting us.",
    word2: "",
    word3: "",
    copyright: `COPYRIGHT ${"\u00A9"} ${new Date().getFullYear()}`,
    rights: "HK CARGO SERVICES SDN. BHD. ALL RIGHTS RESERVED.",
  },
};

export default data;
