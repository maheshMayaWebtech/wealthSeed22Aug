type DatasType = {
  id: number;
  color: string;
  image: string;
  title: string;
  imagetitle: string;
  url: string;
}[];

import icomodule1 from "../../public/Images/ico-modules1.svg";
import icomodule2 from "../../public/Images/ico-module2.svg";
import icomodule3 from "../../public/Images/ico-module3.svg";
import icomodule4 from "../../public/Images/ico-module4.svg";
import icomodule5 from "../../public/Images/ico-module5.svg";
export const Data: DatasType = [
  {
    id: 1,
    color: "#77B4F2",
    image: icomodule1,
    title: "Modules",
    imagetitle: "ModuleIcon",
    url: "/modules",
  },
  {
    id: 2,
    color: "#F2C8CA",
    image: icomodule2,
    title: "Live",
    imagetitle: "LiveIcon",
    url: "/",
  },
  {
    id: 3,
    color: "#F0B32A",
    image: icomodule3,
    title: "Videos",
    imagetitle: "VideosIcon",
    url: "/videos",
  },
  {
    id: 4,
    color: "#B6ADF4",
    image: icomodule4,
    title: "Certified",
    imagetitle: "CertifiedIcon",
    url: "/",
  },
  {
    id: 5,
    color: "#A5CC65",
    image: icomodule5,
    title: "Junior",
    imagetitle: "JuniorIcon",
    url: "/",
  },
];
