import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home/home.jsx';
import DefaultLayout from "./components/layout/DefaultLayout.jsx";
import Start from "./pages/start/start.jsx";
import Login from "./pages/auth/signin.jsx";
import Signup from "./pages/auth/signup.jsx";

import UpdateFilmPage from "./pages/config/updateFilm/updateFilm.jsx";
import DeleteFilmPage from "./pages/config/deleteFilm/deleteFilm.jsx";
import FilmManagementLayout from "./pages/config/layout.jsx";
import MovieList from "./pages/movielist/movielist.jsx";
import AddFilmPage from "./pages/config/addfilm/addFilm.jsx";
function App() {

  return (
      <Routes>
        <Route path='/' element={<Start></Start>} />
        <Route path='/signin' element={<Login></Login>} />
        <Route path='/signup' element={<Signup></Signup>} />
        <Route path='/home' element={<DefaultLayout><Home></Home></DefaultLayout>} />
        <Route path='/all' element={<DefaultLayout><MovieList></MovieList></DefaultLayout>} />
        <Route path='/config' element={<FilmManagementLayout></FilmManagementLayout>} />
        <Route path='/config/addfilm' element={<AddFilmPage></AddFilmPage>} />
        <Route path='/config/updatefilm' element={<UpdateFilmPage></UpdateFilmPage>} />
        <Route path='/config/deletefilm' element={<DeleteFilmPage></DeleteFilmPage>} />

      </Routes>
  )
}
export default App
