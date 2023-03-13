
export interface Expense {
  id: number;
  name: string;
  description?: string;
  amount: number;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}

export interface Category {
  id: number;
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}
