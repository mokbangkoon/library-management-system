export interface book {
  id: number;
  img: string;
  title: string;
  writer: string;
  categories?: string;
  content?: string;
  name?: string;
  rating?: number;
  createDateTime?: Date;
}

export interface bookList extends book {
  publisher: string;
  shareCount: number;
  findCount: number;
}

interface pagination {
  currentPage: number;
  lastPage: number;
  totalCount: number;
  totalPage: number;
}

export interface booksResponse {
  books: book[];
  currentPage: number;
  lastPage: number;
  totalCount: number;
  totalPage: number;
}

export interface shareAndFindBooksResponse {
  shareBooks: book[];
  sharePage: pagination;
  findBooks: book[];
  findPage: pagination;
}
