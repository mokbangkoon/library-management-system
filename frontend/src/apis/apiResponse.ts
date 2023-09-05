interface book {
  id: number;
  categories: string;
  img: string;
  title: string;
  writer: string;
}

export interface booksResponse {
  books?: book[];
  currentPage: number;
  lastPage: number;
  totalCount: number;
  totalPage: number;
}

