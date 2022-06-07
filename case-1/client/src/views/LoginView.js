import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getToken } from "../store/actions/userAction";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const MySwal = withReactContent(Swal);

  const login = () => {
    getToken({ email, password })
      .then(() => {
        navigate("/about/company");
      })
      .catch((err) => {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data,
        });
      });
  };

  return (
    <>
      <div className="main">
        <section className="signup">
          <div className="container">
            <div className="signup-content">
              <form method="POST" id="signup-form" className="signup-form">
                <h2 className="form-title">LogIn account</h2>
                <br></br>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-input"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => {
                      const value = e.target.value;
                      setEmail(value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-input"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      const value = e.target.value;
                      setPassword(value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    name="submit"
                    id="submit"
                    className="form-submit"
                    value="Log In"
                    onClick={(e) => {
                      e.preventDefault();
                      login();
                    }}
                  />
                </div>
              </form>
              <p className="loginhere">
                Don't have an account ?{" "}
                <Link to="/register" className="loginhere-link">
                  register here
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
