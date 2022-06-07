import { useEffect } from "react";
import TableRow from "../componets/TableRow";
import FormView from "../views/FormView";
import { useSelector, useDispatch } from "react-redux";
import { fetchItem } from "../store/actions/itemAction";
import { fetchTransaction } from "../store/actions/transtactionAction";
import { useParams } from "react-router-dom";

import { setModalShow } from "../store/actions/modalAction";

export default function TableAdmin() {
  const { itemList } = useSelector((state) => state.item);
  const { modalShow, companyData } = useSelector((state) => state.company);
  const { transactionList } = useSelector((state) => state.transaction);

  let { name } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    switch (name) {
      case "item":
        dispatch(fetchItem());
        break;

      case "transaction":
        dispatch(fetchTransaction());
        if (!itemList) {
          dispatch(fetchItem());
        }

        break;
      default:
        break;
    }
  }, [name]);

  const rowTable = () => {
    switch (name) {
      case "item":
        return (
          <>
            {itemList &&
              itemList.map((item, i) => (
                <TableRow item={item} i={i} key={item.id} name={name} />
              ))}
          </>
        );
      case "transaction":
        return (
          <>
            {transactionList &&
              transactionList.map((transaction, i) => (
                <TableRow
                  transaction={transaction}
                  i={i}
                  key={transaction.id}
                  name={name}
                />
              ))}
          </>
        );
      default:
        break;
    }
  };

  const input = () => {
    switch (name) {
      case "item":
        return (
          <>
            <td>Name</td>
            <td>Stock</td>
          </>
        );

      case "transaction":
        return (
          <>
            <td>Item Name</td>
            <td>Company Name</td>
            <td>Total</td>
          </>
        );
      default:
        break;
    }
  };
  return (
    <div className="table">
      <FormView
        show={modalShow}
        onHide={() => dispatch(setModalShow(false))}
        modalShow={modalShow}
      />
      <div className="container-xl">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6 titlefood">
                  <h2>
                    {name} <b>List</b>
                  </h2>
                </div>
                {companyData && (
                  <div className="col-sm-6">
                    <a
                      className="btn btn-success"
                      onClick={() => {
                        dispatch(setModalShow(true));
                      }}
                    >
                      <i className="material-icons">&#xE147;</i>
                      <span>Add new {name}</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>No</th>
                  {input()}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{rowTable()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
