import {
  Navbar,
  Container,
  Nav,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  let navigate = useNavigate();

  const home = (name) => {
    switch (name) {
      case "menu":
        navigate("/list/menu");
        break;
      case "order":
        navigate("/list/order");
        break;
      case "transaction":
        navigate("/list/transaction");
        break;
      default:
        break;
    }
  };

  const report = (name) => {
    switch (name) {
      case "file":
        navigate("/report/file");
        break;
      case "chart":
        navigate("/report/chart");

        break;
      default:
        break;
    }
  };
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <Navbar expand="lg">
        <Navbar.Brand>Transaction Report</Navbar.Brand>
        {localStorage.getItem("access_token") ? (
          <div className="menu-bar">
            <Nav className="me-auto">
              <DropdownButton
                variant="outline-secondary"
                title="Menu"
                id="input-group-dropdown-1"
              >
                <Dropdown.Item
                  onClick={() => {
                    home("menu");
                  }}
                >
                  Menu
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    home("order");
                  }}
                >
                  Order
                </Dropdown.Item>
              </DropdownButton>

              <Nav.Link
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Nav.Link>
            </Nav>
          </div>
        ) : null}
      </Navbar>
    </div>
  );
}
