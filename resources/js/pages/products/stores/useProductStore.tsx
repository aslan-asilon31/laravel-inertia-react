import { create } from "zustand";

interface Product {
  id: string;
  product_category_first_id: string;
  name: string;
  selling_price: number;
  availability: string;
  image_url: string;
  created_by: string;
  updated_by: string;
  is_activated: number;
  created_at: string;
  updated_at: string;
}

interface Pagination {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface ProductStore {
  records: Product[];
  loading: boolean;
  pagination: Pagination;
  filter: {
    search: string;
    availability: string;
    selling_price: string;
    image_url: string;
    created_by: string;
    updated_by: string;
    is_activated: string;
  };
  setRecords: (records: Product[]) => void;
  setLoading: (loading: boolean) => void;
  setPagination: (pagination: Pagination) => void;
  setFilter: (filter: Partial<ProductStore['filter']>) => void;
  clearFilter: () => void;
}

const useProductStore = create<ProductStore>((set) => ({
  records: [],
  loading: false,
  pagination: {
    current_page: 1,
    from: 1,
    last_page: 1,
    per_page: 10,
    prev_page_url: null,
    to: 10,
    total: 0,
  },
  filter: {
    search: "",
    availability: "",
    selling_price: "",
    image_url: "",
    created_by: "",
    updated_by: "",
    is_activated: "",
  },
  setRecords: (records) => set({ records }),
  setLoading: (loading) => set({ loading }),
  setPagination: (pagination) => set({ pagination }),
  setFilter: (filter) => set((state) => ({
    filter: { ...state.filter, ...filter }
  })),
  clearFilter: () => set({
    filter: {
      search: "",
      availability: "",
      selling_price: "",
      image_url: "",
      created_by: "",
      updated_by: "",
      is_activated: "",
    }
  })
}));

export default useProductStore;
