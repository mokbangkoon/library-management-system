export type mainParam = {
  page?: number;
  size?: number;
  teamId?: number;
  type?: number;
  title?: string;
  searchFilter?: number;
};

export type detailParam = {
  bookId: number;
};

export type loginParm = {
  email: string;
  password: string;
};

export type categoryParam = {
  categoryId: string;
  subCategory?: string;
  page: number;
  size: number;
};

export type categoryCountParam = {
  categoryId: string;
};
