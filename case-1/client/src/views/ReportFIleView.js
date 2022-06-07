import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchTransaction } from "../store/actions/transtactionAction";
import { fetchCompany } from "../store/actions/companyAction";
import { fetchItem } from "../store/actions/itemAction";

export default function ReportFIleView() {
  const dispatch = useDispatch();
  const [transaction, setTransaction] = useState();
  const [item, setItem] = useState();

  const { transactionList } = useSelector((state) => state.transaction);
  // const { companyData } = useSelector((state) => state.company);
  const { itemList } = useSelector((state) => state.item);
  useEffect(() => {
    if (transactionList) {
      let data = [];
      transactionList.forEach((element, i) => {
        data.push({
          no: i + 1,
          ItemName: element.Item.name,
          CompanyName: element.Item.Company.name,
          CompanyAddress: element.Item.Company.address,
          Total: element.total,
        });
        setTransaction(data);
      });
    }
  }, [transactionList]);

  useEffect(() => {
    if (itemList) {
      let data = [];
      itemList.forEach((element, i) => {
        data.push({
          no: i + 1,
          ItemName: element.name,
          Stock: element.stock,
        });
        setItem(data);
      });
    }
  }, [itemList]);

  useEffect(() => {
    dispatch(fetchTransaction());
    dispatch(fetchItem());
  }, []);
  return (
    <div className="table">
      <div className="container-xl">
        <div className="table-responsives">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6 titlefood">
                  <h2>
                    Report <b>File</b>
                  </h2>
                </div>
              </div>
            </div>
            <h3>Transaction report</h3>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>No</th>
                  <td>Item Name</td>
                  <td>Company Name</td>
                  <td>Company Address</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>
                {" "}
                {transactionList &&
                  transactionList.map((transaction, i) => (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{transaction.Item.name}</td>

                      <td>{transaction.Item.Company.name}</td>
                      <td>{transaction.Item.Company.address}</td>

                      <td>{transaction.total}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {transaction && (
              <CSVLink
                data={transaction}
                filename={"transaction.csv"}
                className="btn btn-primary"
                target="_blank"
              >
                Download me
              </CSVLink>
            )}

            <h3>Item report</h3>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>No</th>
                  <td>Item Name</td>
                  <td>Stock</td>
                </tr>
              </thead>
              <tbody>
                {" "}
                {itemList &&
                  itemList.map((item, i) => (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{item.name}</td>

                      <td>{item.stock}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {item && (
              <CSVLink
                data={item}
                filename={"item.csv"}
                className="btn btn-primary"
                target="_blank"
              >
                Download me
              </CSVLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
