import { Navigate } from "react-router-dom";

export function RouterAuthAbout({ children }) {
  if (!localStorage.getItem("access_token")) return <Navigate to={"/login"} />;

  return children;
}
export function RouterAuth({ children }) {
  if (!localStorage.getItem("access_token")) return <Navigate to={"/login"} />;
  return children;
}

export function RouterAuthHome({ children }) {
  if (localStorage.getItem("access_token")) return <Navigate to={"/"} />;

  return children;
}
