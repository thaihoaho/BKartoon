import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/home/home.jsx';
import DefaultLayout from "./components/layout/DefaultLayout.jsx";
import Start from "./pages/start/start.jsx";
import Login from "./pages/auth/signin.jsx";
import Signup from "./pages/auth/signup.jsx";
import Role from "./pages/auth/role.jsx";
import LoginAdmin from "./pages/auth/signinAdmin.jsx";
import AddFilmPage from "./pages/config/addFilm/addFilm.jsx";
import UpdateFilmPage from "./pages/config/updateFilm/updateFilm.jsx";
// import DeleteFilmPage from "./pages/config/deleteFilm/deleteFilm.jsx";
import FilmManagementLayout from "./pages/config/layout.jsx";
import MovieList from "./pages/movielist/movielist.jsx";
import AnimeDetails from "./pages/info/info.jsx";
import RankingCategory from "./pages/ranking/RankingCategory.jsx";
import Profile from "./pages/profile/profile.jsx";
import FILMManagement from "./pages/admin/admin.jsx";

function App() {

  return (
      <Routes>
        <Route path='/' element={<Start></Start>} />
        <Route path='/signin/user' element={<Login></Login>} />
        <Route path='/signin/admin' element={<LoginAdmin></LoginAdmin>} />
        <Route path='/signup' element={<Signup></Signup>} />
        <Route
          path="/profile"
          element={
            // Lấy ID từ localStorage
            localStorage.getItem('user')
              ? <Navigate to={`/profile/${JSON.parse(localStorage.getItem('user')).id}`} />
              : <Navigate to="/" />
          }
      />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path='/role' element={<Role></Role>} />
        <Route path='/home' element={<DefaultLayout><Home></Home></DefaultLayout>} />
        <Route path='/all' element={<DefaultLayout><MovieList></MovieList></DefaultLayout>} />
        <Route path='/admin' element={<FILMManagement></FILMManagement>} />
        <Route path='/config' element={<FilmManagementLayout></FilmManagementLayout>} />
        <Route path='/config/addfilm' element={<AddFilmPage></AddFilmPage>} />
        <Route path='/config/updatefilm' element={<UpdateFilmPage></UpdateFilmPage>} />
        <Route path='/info' element={<AnimeDetails></AnimeDetails>} />
        <Route path="/film/:id" element={<AnimeDetails />} />
        <Route path="/ranking" element={<RankingCategory />} />
      

      </Routes>
  )
}
export default App
