import { create } from 'zustand';
import serverApi from '../http/serverApi';

const booksStore = create((set) => ({
  books: [],
  book: null,
  count: 0,
  isLoading: false,
  error: '',

  fetchBookById: async (bookId) => {
    try {
      set({ isLoading: true });
      const result = await serverApi.get(`/catalog/book/${bookId}`);
      set({ book: result.data });
      set({ error: '' });
    } catch (error) {
      set({ book: null });
      set({ error: error.message });
      if (error?.response?.data) {
        set({ error: error.response.data.message });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  fetchBooksByAuthor: async (authorId) => {
    try {
      set({ isLoading: true });
      const result = await serverApi.get(`/catalog/book/author?authorId=${authorId}`);
      set({ books: result.data });
      set({ error: '' });
    } catch (error) {
      set({ books: [] });
      set({ error: error.message });
      if (error?.response?.data) {
        set({ error: error.response.data.message });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  fetchBooksByGenre: async (genreId) => {
    try {
      set({ isLoading: true });
      const result = await serverApi.get(`/catalog/book/genre?genreId=${genreId}`);
      set({ books: result.data });
      set({ error: '' });
    } catch (error) {
      set({ books: [] });
      set({ error: error.message });
      if (error?.response?.data) {
        set({ error: error.response.data.message });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  fetchBooksCount: async () => {
    try {
      set({ isLoading: true });
      const result = await serverApi.get('/catalog/book/count');
      set({ count: result.data.count });
    } catch (error) {
      set({ error: error.message });
      if (error.response.data) {
        set({ error: error.response.data.message });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  fetchBooksList: async () => {
    try {
      set({ isLoading: true });
      const result = await serverApi.get('/catalog/book/list');
      set({ books: result.data });
      set({ error: '' });
    } catch (error) {
      set({ books: [] });
      set({ error: error.message });
      if (error.response.data) {
        set({ error: error.response.data.message });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default booksStore;
