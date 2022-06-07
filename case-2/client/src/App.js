import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TableAdmin from "./views/TableAdmin";
import NavBar from "./componets/NavBar";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import CommpanyView from "./views/CommpanyView";
import { Routes, Route } from "react-router-dom";
import {
  RouterAuth,
  RouterAuthHome,
  RouterAuthAbout,
} from "./authentication/RouterAuth";

function App() {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route
          path="/about/company"
          element={
            <RouterAuthAbout>
              <CommpanyView />
            </RouterAuthAbout>
          }
        />

        <Route
          path="/list/:name"
          element={
            <RouterAuth>
              <TableAdmin />
            </RouterAuth>
          }
        />
        <Route
          path="/login"
          element={
            <RouterAuthHome>
              <LoginView />
            </RouterAuthHome>
          }
        />
        <Route
          path="/register"
          element={
            <RouterAuthHome>
              <RegisterView />
            </RouterAuthHome>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
