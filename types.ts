import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type CategoriesType = {
  name: string;
  icon: IconProp;
};

export type CountriesType = {
  value: string;
  label: string;
};

export type ItemsType = {
  id: any;
  status: any;
  title: any;
  image: any;
  city: any;
  state: any;
  country: any;
  description: any;
  user_id: any;
  created_at: any;
  users: {
    name: any;
  };
};

export type DateStateType = {
  startDate: Date;
  endDate: Date;
  key: string;
};

export type SearchParamsType = {
  country: string;
  weeks: string;
};
