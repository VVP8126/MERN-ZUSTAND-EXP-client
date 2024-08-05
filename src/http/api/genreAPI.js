import http from '../serverApi';

export const hasGenreConstraints = async (id) => {
  const result = await http.get(`/catalog/book/genre?genreId=${id}`);
  return Boolean(result.data.length);
};
