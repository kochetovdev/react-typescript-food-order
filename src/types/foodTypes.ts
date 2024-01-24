export interface Meal {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
}

export interface OrderData {
  order: {
    items: Meal[];
    customer: {
      [k: string]: FormDataEntryValue;
    };
  };
}
