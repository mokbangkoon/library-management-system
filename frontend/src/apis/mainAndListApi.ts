import axios from 'axios';
import { mainParam } from './apiParam';

export const getPurchasedBooks = async (param: mainParam) => {
  const { page, size, type } = param;
  try {
    const response = await axios.get(
      type == 1 && !page && !size
        ? `http://localhost:8080/books/purchased?type=${type}`
        : `http://localhost:8080/books/purchased?type=${type}&page=${page}&size=${size}`,
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
      type == 1 && !page && !size
        ? `http://localhost:8080/books/best?type=${type}`
        : `http://localhost:8080/books/best?type=${type}&page=${page}&size=${size}`,
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
      type == 1 && !page && !size
        ? `http://localhost:8080/books/shareAndFind?type=${type}`
        : `http://localhost:8080/books/shareAndFind?type=${type}&page=${page}&size=${size}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
  }
};

export const getReviewBooks = async (param: mainParam) => {
  const { page, size, type } = param;
  try {
    const response = await axios.get(
      type == 1 && !page && !size
        ? `http://localhost:8080/books/review?type=${type}`
        : `http://localhost:8080/books/review?type=${type}&page=${page}&size=${size}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
  }
};

export const getTeamBooks = async (param: mainParam) => {
  const { page, size, teamId, type } = param;
  try {
    const response = await axios.get(
      type == 1 && !page && !size && teamId
        ? `http://localhost:8080/books/team?type=${type}&teamId=${teamId}`
        : `http://localhost:8080/books/team?type=${type}&teamId=${teamId}&page=${page}&size=${size}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
  }
};

export const getSearchedBooks = async (param: mainParam) => {
  const { page, size, searchFilter, title } = param;
  try {
    const response = await axios.get(
      `http://localhost:8080/books/search?searchFilter=${searchFilter}&title=${title}&page=${page}&size=${size}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
  }
};
