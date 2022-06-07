import FormView from "../views/FormView";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateStatusOrder, setOrderId } from "../store/actions/orderAction";
import { getMenuId, deleteMenu } from "../store/actions/menuAction";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function TableRow({ item, i, name, order }) {
  const MySwal = withReactContent(Swal);

  const dispatch = useDispatch();
  const [edits, setEdit] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const deleteMenuId = (id) => {
    dispatch(deleteMenu(id));
  };
  const updateStatus = (id) => {
    dispatch(updateStatusOrder(id)).catch((err) => {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data,
      });
    });
  };

  function edit() {
    switch (name) {
      case "order":
        dispatch(setOrderId(order));
        setEdit(true);
        setModalShow(true);
        break;
      case "menu":
        dispatch(getMenuId(item));
        setEdit(true);
        setModalShow(true);
        break;
      default:
        break;
    }
  }

  const input = () => {
    switch (name) {
      case "menu":
        return (
          <>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>{item.status}</td>
          </>
        );

      case "order":
        return (
          <>
            <td>{order.noOrder}</td>
            <td>{order.noTable}</td>
            <td>
              {order.OrderMenus.map((menu) => (
                <li>{menu.menu}</li>
              ))}
            </td>
          </>
        );
      default:
        break;
    }
  };
  return (
    <>
      <FormView
        show={modalShow}
        onHide={() => setModalShow(false)}
        edits={edits}
      />
      <tr>
        <td>{i + 1}</td>
        {input()}
        <td>
          <a
            className="edit"
            data-toggle="modal"
            onClick={() => {
              edit();
            }}
          >
            <i className="material-icons" data-toggle="tooltip" title="Edit">
              &#xE254;
            </i>
          </a>
          <a
            className="delete"
            data-toggle="modal"
            onClick={() => {
              if (name === "order") {
                updateStatus(order.id);
              } else {
                deleteMenuId(item.id);
              }
            }}
          >
            <i className="material-icons" data-toggle="tooltip" title="Delete">
              &#xE872;
            </i>
          </a>
        </td>
      </tr>
    </>
  );
}
