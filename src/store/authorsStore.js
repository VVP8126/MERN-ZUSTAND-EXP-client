import { create } from 'zustand';
import serverApi from './../http/serverApi';

const authorsStore = create((set) => ({
  authors: [],
  author: null,
  count: 0,
  isLoading: false,
  error: '',

  fetchAuthorsCount: async () => {
    try {
      set({ isLoading: true });
      const result = await serverApi.get('/catalog/author/count');
      set({ count: result.data.count });
      set({ error: '' });
    } catch (error) {
      set({ error: error.message });
      if (error.response.data) {
        set({ error: error.response.data.message });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAuthorById: async (authorId) => {
    try {
      set({ isLoading: true });
      const result = await serverApi.get(`/catalog/author/${authorId}`);
      set({ author: result.data });
      set({ error: '' });
    } catch (error) {
      set({ author: [] });
      set({ error: error.message });
      if (error.response.data) {
        set({ error: error.response.data.message });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAuthorsList: async () => {
    try {
      set({ isLoading: true });
      const result = await serverApi.get('/catalog/author/list');
      set({ authors: result.data });
      set({ error: '' });
    } catch (error) {
      set({ authors: [] });
      set({ error: error.message });
      if (error.response.data) {
        set({ error: error.response.data.message });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default authorsStore;
