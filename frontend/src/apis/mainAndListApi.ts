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
  const { page, size } = param;
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

export const getReviewBooks = async (param: mainParam) => {
  const { page, size } = param;
  try {
    const response = await axios.get(
      `http://localhost:8080/books/review
      ${page !== undefined ? `&page=${page}` : ''}
      ${size !== undefined ? `&size=${size}` : ''}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
  }
};

export const getTeamBooks = async (param: mainParam) => {
  const { page, size, teamId } = param;
  try {
    const response = await axios.get(
      `http://localhost:8080/books/team?teamId=${teamId}
      ${page !== undefined ? `&page=${page}` : ''}
      ${size !== undefined ? `&size=${size}` : ''}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
  }
};
