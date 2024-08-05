import { create } from 'zustand';
import serverApi from '../http/serverApi';

const genresStore = create((set) => ({
  genres: [],
  genre: null,
  count: 0,
  isLoading: false,
  error: '',

  fetchGenreDetails: async (genreId) => {
    try {
      set({ isLoading: true });
      const result = await serverApi.get(`/catalog/genre?genreId=${genreId}`);
      set({ genre: result.data });
      set({ error: '' });
    } catch (error) {
      set({ genre: null });
      set({ error: error.message });
      if (error?.response?.data) {
        set({ error: error.response.data.message });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  fetchGenresCount: async () => {
    try {
      set({ isLoading: true });
      const result = await serverApi.get('/catalog/genre/count');
      set({ count: result.data.count });
      set({ error: '' });
    } catch (error) {
      set({ count: 0 });
      set({ error: error.message });
      if (error.response.data) {
        set({ error: error.response.data.message });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  fetchGenresList: async () => {
    try {
      set({ isLoading: true });
      const result = await serverApi.get('/catalog/genre/list');
      set({ genres: result.data });
      set({ error: '' });
    } catch (error) {
      set({ genres: [] });
      set({ error: error.message });
      if (error.response.data) {
        set({ error: error.response.data.message });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  fetchRemoveGenre: async (id) => {
    try {
      set({ isLoading: true });
      const result = await serverApi.delete(`/catalog/genre/delete/${id}`);
      set({ genre: result.data });
      set({ error: '' });
    } catch (error) {
      set({ genre: null });
      set({ error: error.message });
      if (error.response.data) {
        set({ error: error.response.data.message });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCreateGenre: async (name) => {
    try {
      set({ isLoading: true });
      const result = await serverApi.post(`/catalog/genre`, { name });
      set({ genre: result.data });
      set({ error: '' });
    } catch (error) {
      set({ genre: null });
      set({ error: error.message });
      if (error.response.data) {
        if (error.response.data.message instanceof Array) {
          set({ error: error.response.data.message.map((er) => er.msg).join(' ') });
        } else {
          set({ error: error.response.data.message });
        }
      }
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUpdateGenre: async (id, name) => {
    try {
      set({ isLoading: true });
      await serverApi.patch(`/catalog/genre/${id}`, { name });
      set({ error: '' });
    } catch (error) {
      set({ genre: null });
      set({ error: error.message });
      if (error.response.data) {
        if (error.response.data.message instanceof Array) {
          set({ error: error.response.data.message.map((er) => er.msg).join(' ') });
        } else {
          set({ error: error.response.data.message });
        }
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default genresStore;
