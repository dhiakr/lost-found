type CategoriesType = {
  name: string;
  icon: string;
};

type CountriesType = {
  value: string;
  label: string;
};

type ItemsType = {
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

type DateStateType = {
  startDate: Date;
  endDate: Date;
  key: string;
};

type SearchParamsType = {
  country: string;
  weeks: string;
};
