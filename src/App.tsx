import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Registro from "./pages/Registro";
import InicioSesion from "./pages/InicioSesion";
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./components/PrivateRoute";
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from "./pages/Profile";
import AddRegister from "./pages/AddRegister";
import Config from "./pages/Config";
import DataReg from "./pages/DataReg";
import "./global.css"; // Importa el archivo CSS global

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;
  
  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";
    switch (pathname) {
      case "/registro":
        title = "";
        metaDescription = "";
        break;
      case "/iniciosesion":
        title = "";
        metaDescription = "";
        break;
    }
    if (title) {
      document.title = title;
    }
    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);
  
  return (
    <>
      <div className="app-container">
        <Header />
        <ToastContainer />
        { }
        <Routes>
          <Route path="/registro" element={<Registro />} />
          <Route path="/iniciosesion" element={<InicioSesion />} />
          <Route path='' element={<PrivateRoute />}>
            { }
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home />} />
            <Route path="/addregister" element={<AddRegister />} />
            <Route path="/config" element={<Config />} />
            <Route path="/datareg" element={<DataReg />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
}
export default App;
