import { Form, Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postOrder, editOrder } from "../store/actions/orderAction";
import { postMenu } from "../store/actions/menuAction";
import { useParams } from "react-router-dom";
import InputComponent from "../componets/InputComponent";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { editMenu } from "../store/actions/menuAction";

export default function FormView(props) {
  const dispatch = useDispatch();
  let { name } = useParams();
  const { orderById } = useSelector((state) => state.order);
  const { menuList, menuById } = useSelector((state) => state.menu);
  // const { transactionById } = useSelector((state) => state.transaction);
  const [noTable, setTable] = useState("");
  const [listMenu, setListMenu] = useState("");
  const [catagory, setCatagory] = useState("");
  const [status, setStatus] = useState("");

  const [menu, setMenu] = useState([]);
  const [menuFilter, setMenuFilter] = useState([]);

  const MySwal = withReactContent(Swal);

  const post = () => {
    switch (name) {
      case "order":
        dispatch(postOrder({ noTable, menu }))
          .then(() => {
            props.onHide();
          })
          .catch((err) => {
            MySwal.fire({
              icon: "error",
              title: "Oops...",
              text: err.response.data,
            });
          });
        setMenu([]);
        break;
      case "menu":
        dispatch(postMenu({ name: listMenu, category: catagory, status }))
          .then(() => {
            props.onHide();
          })
          .catch((err) => {
            MySwal.fire({
              icon: "error",
              title: "Oops...",
              text: err.response.data,
            });
          });
        setMenu([]);
        break;

      default:
        break;
    }
  };

  const edit = () => {
    switch (name) {
      case "order":
        dispatch(
          editOrder({
            id: orderById.id,
            noTable,
            menu,
          })
        )
          .then(() => {
            props.onHide();
          })
          .catch((err) => {
            MySwal.fire({
              icon: "error",
              title: "Oops...",
              text: err.response.data,
            });
          });
        break;
      case "menu":
        dispatch(
          editMenu({
            id: menuById.id,
            name: listMenu,
            category: catagory,
            status,
          })
        )
          .then(() => {
            props.onHide();
          })
          .catch((err) => {
            MySwal.fire({
              icon: "error",
              title: "Oops...",
              text: err.response.data,
            });
          });
        break;
      default:
        break;
    }
  };

  const input = () => {
    switch (name) {
      case "order":
        return [
          {
            type: "number",
            placeholder: "Enter no table",
            name: "table",
            value: noTable,
            require: true,
          },
          {
            type: "text",
            placeholder: "Enter Menu",
            value: menu,
            name: "Menu",
            require: true,
          },
        ];
      case "menu":
        return [
          {
            type: "text",
            placeholder: "Enter Menu",
            value: listMenu,
            name: "listMenu",
            require: true,
          },
          {
            type: "text",
            placeholder: "Enter Catagories",
            value: catagory,
            name: "catagory",
            require: true,
          },
          {
            type: "text",
            placeholder: "Enter Catagories",
            value: status,
            name: "status",
            require: true,
          },
        ];
      default:
        break;
    }
  };

  const inputHandler = (value, name) => {
    switch (name) {
      case "Menu":
        setMenu((prev) => [...prev, value]);
        break;
      case "table":
        setTable(value);
        break;
      case "listMenu":
        setListMenu(value);
        break;
      case "catagory":
        setCatagory(value);
        break;
      case "status":
        setStatus(value);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    if (props.edits) {
      switch (name) {
        case "order":
          setTable(orderById.noTable);
          setMenu(orderById.OrderMenus.map((e) => e.menu));
          break;
        case "menu":
          setListMenu(menuById.name);
          setCatagory(menuById.category);
          setStatus(menuById.status);
          break;
        default:
          break;
      }
    }
  }, [props.edits]);

  useEffect(() => {
    if (menuList) {
      setMenuFilter(menuList.filter((e) => e.status === "ready"));
    }
  }, [menuList]);

  useEffect(() => {
    if (!props.modalShow) {
      setTable("");
      setMenu("");
    }
  }, [props.modalShow]);
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          {props.edits ? (
            <Modal.Title id="contained-modal-title-vcenter">
              Edit form
            </Modal.Title>
          ) : (
            <Modal.Title id="contained-modal-title-vcenter">
              Add form
            </Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form>
            {input()?.map((el) => (
              <InputComponent
                type={el.type}
                placeholder={el.placeholder}
                key={el.placeholder}
                value={el.value}
                name={el.name}
                menuList={menuFilter}
                placement={name}
                inputHandler={inputHandler}
              />
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {props.edits ? (
            <Button
              onClick={() => {
                edit();
              }}
            >
              Edit
            </Button>
          ) : (
            <Button
              onClick={() => {
                post();
              }}
            >
              submit
            </Button>
          )}

          <Button
            onClick={() => {
              props.onHide();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
