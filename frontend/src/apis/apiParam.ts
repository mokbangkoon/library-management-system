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
  categoryType: string;
  subCategory?: string;
  page: number;
  size: number;
};

export type categoryCountParam = {
  categoryType: string;
};

export type reviewParam = {
  page: number;
  size: number;
  bookId: number;
};

export type postParam = {
  page: number;
  size: number;
  bookId: number;
  postType: number;
};