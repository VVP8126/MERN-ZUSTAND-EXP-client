import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SharedLayout from './components/Layout/SharedLayout';
import Home from './pages/Home/index';
import List from './pages/List/index';
import Item from './pages/Item';
import Genre from './pages/Genre';
import DeleteGenre from './pages/Genre/DeleteGenre';
import Error from './pages/Error';
import ProhibitedPage from './pages/ProhibitedPage/indeх';
import EditGenre from './pages/Genre/EditGenre';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route element={<Home />} index />
          <Route element={<List />} path="book/list" />
          <Route element={<List />} path="author/list" />
          <Route element={<List />} path="genre/list" />
          <Route element={<List />} path="book_instance/list" />

          <Route element={<Genre />} path="genre/new" />
          <Route element={<DeleteGenre />} path="genre/remove" />
          <Route element={<EditGenre />} path="genre/edit" />

          <Route element={<ProhibitedPage />} path="book/new" />
          <Route element={<ProhibitedPage />} path="book/edit" />
          <Route element={<ProhibitedPage />} path="book/remove" />

          <Route element={<ProhibitedPage />} path="author/new" />
          <Route element={<ProhibitedPage />} path="author/edit" />
          <Route element={<ProhibitedPage />} path="author/remove" />

          <Route element={<ProhibitedPage />} path="book_instance/new" />
          <Route element={<ProhibitedPage />} path="book_instance/edit" />
          <Route element={<ProhibitedPage />} path="book_instance/remove" />

          <Route element={<Item />} path="author/:id" />
          <Route element={<Item />} path="book/:id" />
          <Route element={<Item />} path="genre/:id" />
          <Route element={<Item />} path="book_instance/:id" />

          <Route element={<Error />} path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
