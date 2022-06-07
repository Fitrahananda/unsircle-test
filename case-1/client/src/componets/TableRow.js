import FormView from "../views/FormView";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteItem, getItemById } from "../store/actions/itemAction";
import { deleteTransaction } from "../store/actions/transtactionAction";
import { getTransactionById } from "../store/actions/transtactionAction";
export default function TableRow({ item, i, name, transaction }) {
  const dispatch = useDispatch();
  const [edits, setEdit] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const deletedItem = (id) => {
    switch (name) {
      case "item":
        dispatch(deleteItem(id));
      case "transaction":
        dispatch(deleteTransaction(id));
      default:
        break;
    }
  };

  function edit() {
    switch (name) {
      case "item":
        dispatch(getItemById(item));
        setEdit(true);
        setModalShow(true);
      case "transaction":
        dispatch(getTransactionById(transaction));
        setEdit(true);
        setModalShow(true);
      default:
        break;
    }
  }

  const input = () => {
    switch (name) {
      case "item":
        return (
          <>
            <td>{item.name}</td>
            <td>{item.stock}</td>
          </>
        );

      case "transaction":
        return (
          <>
            <td>{transaction.Item.name}</td>
            <td>{transaction.Item.Company.name}</td>

            <td>{transaction.total}</td>
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
              if (name === "item") {
                edit(item.id);
              } else {
                edit(transaction.id);
              }
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
              if (name === "item") {
                deletedItem(item.id);
              } else {
                deletedItem(transaction.id);
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
