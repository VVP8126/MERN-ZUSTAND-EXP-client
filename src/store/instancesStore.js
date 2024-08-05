import { create } from 'zustand';
import serverApi from './../http/serverApi';

const instancesStore = create((set) => ({
  instances: [],
  instance: null,
  count: 0,
  isLoading: false,
  error: '',

  fetchInstancesCount: async () => {
    try {
      set({ isLoading: true });
      const result = await serverApi.get('/catalog/book_instance/count');
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

  fetchInstancesByBook: async (bookId) => {
    try {
      set({ isLoading: true });
      const result = await serverApi.get(`/catalog/book_instance/book?bookId=${bookId}`);
      set({ instances: result.data });
      set({ error: '' });
    } catch (error) {
      set({ instances: [] });
      set({ error: error.message });
      if (error.response.data) {
        set({ error: error.response.data.message });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  fetchInstanceById: async (id) => {
    try {
      set({ isLoading: true });
      const result = await serverApi.get(`/catalog/book_instance/${id}`);
      set({ instance: result.data });
      set({ error: '' });
    } catch (error) {
      set({ instance: null });
      set({ error: error.message });
      if (error.response.data) {
        set({ error: error.response.data.message });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  fetchInstancesList: async () => {
    try {
      set({ isLoading: true });
      const result = await serverApi.get('/catalog/book_instance/list');
      set({ instances: result.data });
      set({ error: '' });
    } catch (error) {
      set({ instances: [] });
      set({ error: error.message });
      if (error.response.data) {
        set({ error: error.response.data.message });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default instancesStore;
