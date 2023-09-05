import axios from 'axios';
import { mainParam } from './apiParam';

export const getPurchasedBooks = async (param: mainParam) => {
  const { page, size, type } = param;
  try {
    const response = await axios.get(
      `http://localhost:8080/books/purchased?type=${type}
      ${page !== undefined ? `&page=${page}` : ''}
      ${size !== undefined ? `&size=${size}` : ''}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
  }
};

export const getBestBooks = async (param: mainParam) => {
  const { page, size, type } = param;
  try {
    const response = await axios.get(
      `http://localhost:8080/books/best?type=${type}
      ${page !== undefined ? `&page=${page}` : ''}
      ${size !== undefined ? `&size=${size}` : ''}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
  }
};

export const getShareAndFindBooks = async (param: mainParam) => {
  const { page, size, type } = param;
  try {
    const response = await axios.get(
      `http://localhost:8080/books/shareAndFind
      ${page !== undefined ? `&page=${page}` : ''}
      ${size !== undefined ? `&size=${size}` : ''}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
  }
};