import { useEffect, useState } from "react";
import TableRow from "../componets/TableRow";
import FormView from "../views/FormView";
import { useSelector, useDispatch } from "react-redux";
import { fetchMenu } from "../store/actions/menuAction";
import { fetchOrder } from "../store/actions/orderAction";
import { useParams } from "react-router-dom";
import { CSVLink } from "react-csv";

import { setModalShow } from "../store/actions/modalAction";

export default function TableAdmin() {
  const [csv, setCsv] = useState();
  const { menuList } = useSelector((state) => state.menu);
  const { modalShow } = useSelector((state) => state.company);
  const { orderList } = useSelector((state) => state.order);
  console.log(orderList);
  let { name } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    switch (name) {
      case "menu":
        dispatch(fetchMenu());
        break;

      case "order":
        dispatch(fetchOrder());
        if (!menuList) {
          dispatch(fetchMenu());
        }

        break;
      default:
        break;
    }
  }, [name]);

  useEffect(() => {
    console.log(orderList);
    if (orderList) {
      let data = [];
      orderList.forEach((element, i) => {
        data.push({
          no: i + 1,
          "no order": element.noOrder,
          "no table": element.noTable,
          Menu: element.OrderMenus.map((e) => e.menu),
          status: element.status,
        });
        console.log(data);
        setCsv(data);
      });
    }
  }, [orderList]);
  const rowTable = () => {
    switch (name) {
      case "menu":
        return (
          <>
            {menuList &&
              menuList.map((item, i) => (
                <TableRow item={item} i={i} key={item.id} name={name} />
              ))}
          </>
        );
      case "order":
        return (
          <>
            {orderList &&
              orderList.map((order, i) => (
                <TableRow order={order} i={i} key={order.id} name={name} />
              ))}
          </>
        );
      default:
        break;
    }
  };

  const input = () => {
    switch (name) {
      case "menu":
        return (
          <>
            <td>Name</td>
            <td>Catagories</td>
            <td>Status</td>
          </>
        );

      case "order":
        return (
          <>
            <td>No Order</td>
            <td>No Table</td>
            <td>Menu</td>
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
              {csv && name === "order" && (
                <CSVLink
                  data={csv}
                  filename={"report.csv"}
                  className="btn btn-primary"
                  target="_blank"
                >
                  Download me
                </CSVLink>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
