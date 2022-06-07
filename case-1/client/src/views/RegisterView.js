import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../store/actions/userAction";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function RegisterView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const MySwal = withReactContent(Swal);

  let navigate = useNavigate();

  const register = () => {
    registerUser({ email, password })
      .then(() => {
        MySwal.fire({
          icon: "success",
          title: "success",
        });
        navigate("/login");
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
                <h2 className="form-title">Create account</h2>
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
                    type="text"
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
                    value="Sign up"
                    onClick={(e) => {
                      e.preventDefault();
                      register();
                    }}
                  />
                </div>
              </form>
              <p className="loginhere">
                Have already an account ?{" "}
                <Link to="/login" className="loginhere-link">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
