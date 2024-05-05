import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDog,
  faPhone,
  faKey,
  faWallet,
  faCamera,
  faBook,
  faGlasses,
  faUmbrella,
  faObjectGroup,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import { CategoriesType } from "@/types";

export const categories: Array<CategoriesType> = [
  {
    name: "Pets",
    icon: faDog,
  },
  {
    name: "Electronics",
    icon: faPhone,
  },
  {
    name: "Keys",
    icon: faKey,
  },
  {
    name: "Wallets",
    icon: faWallet,
  },
  {
    name: "Cameras",
    icon: faCamera,
  },
  {
    name: "Books",
    icon: faBook,
  },
  {
    name: "Eyewear",
    icon: faGlasses,
  },
  {
    name: "Umbrellas",
    icon: faUmbrella,
  },
  {
    name: "Miscellaneous Items",
    icon: faObjectGroup,
  },
  {
    name: "Bags",
    icon: faBagShopping,
  },
];
