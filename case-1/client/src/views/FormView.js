import { Form, Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postCompany, editCompany } from "../store/actions/companyAction";
import { postItem, editItem } from "../store/actions/itemAction";
import {
  postTransaction,
  editTransaction,
} from "../store/actions/transtactionAction";
import { useParams } from "react-router-dom";
import InputComponent from "../componets/InputComponent";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function FormView(props) {
  const dispatch = useDispatch();
  let { name } = useParams();
  const { companyData } = useSelector((state) => state.company);
  const { itemById, itemList } = useSelector((state) => state.item);
  const { transactionById } = useSelector((state) => state.transaction);

  const [companyDescription, setCompanyDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemStock, setItemStock] = useState("");

  const [companyId, setCompanyId] = useState("");
  const [itemId, setItemId] = useState("");
  const [total, setTotal] = useState("");

  const MySwal = withReactContent(Swal);

  const post = () => {
    switch (name) {
      case "item":
        dispatch(postItem({ itemName, itemStock }))
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

      case "transaction":
        dispatch(postTransaction({ ItemId: itemId, total }))
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
        dispatch(
          postCompany({ companyName, companyAddress, companyDescription })
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
    }
  };

  const edit = () => {
    switch (name) {
      case "item":
        dispatch(
          editItem({
            id: itemById.id,
            CompanyId: companyId,
            ItemId: itemId,
            total,
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

      case "transaction":
        dispatch(
          editTransaction({
            id: transactionById.id,
            CompanyId: companyId,
            ItemId: itemId,
            total,
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
        dispatch(
          editCompany({
            id: companyData.id,
            companyName,
            companyAddress,
            companyDescription,
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
    }
  };

  const input = () => {
    switch (name) {
      case "item":
        return [
          {
            type: "text",
            placeholder: "Enter item name",
            name: "Item Name",
            value: itemName,
            require: true,
          },
          {
            type: "number",
            placeholder: "Enter stock",
            value: itemStock,
            name: "Item Stock",
            require: true,
          },
        ];
      case "transaction":
        return [
          {
            type: "text",
            placeholder: "Enter item name",
            value: itemId,
            name: "Item name",
            require: true,
          },
          {
            type: "number",
            placeholder: "Enter total",
            value: total,
            name: "Total",
            require: true,
          },
        ];
      default:
        return [
          {
            type: "text",
            placeholder: "Enter company name",
            name: "Company Name",
            value: companyName,
            require: true,
          },
          {
            type: "text",
            placeholder: "Enter company address",
            value: companyAddress,
            name: "Company Address",
            require: true,
          },
          {
            type: "text",
            placeholder: "Enter description address",
            value: companyDescription,
            name: "Company Description",
            require: true,
          },
        ];
    }
  };

  const inputHandler = (value, name) => {
    switch (name) {
      case "Company Name":
        setCompanyName(value);
        break;
      case "Company Description":
        setCompanyDescription(value);
        break;
      case "Company Address":
        setCompanyAddress(value);
        break;
      case "Item Name":
        setItemName(value);
        break;
      case "Item Stock":
        setItemStock(value);
        break;
      case "Item name":
        setItemId(value);
        break;
      case "Total":
        setTotal(value);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    switch (name) {
      case "item":
        setItemName(itemById.name);
        setItemStock(itemById.stock);
        break;
      case "transaction":
        if (transactionById) {
          setCompanyId(transactionById.Company.id);
          setItemId(transactionById.Item.id);
          setTotal(transactionById.total);
        }
        break;
      default:
        setCompanyName(companyData.name);
        setCompanyAddress(companyData.address);
        setCompanyDescription(companyData.description);

        break;
    }
  }, [props.edits]);
  useEffect(() => {
    if (!props.modalShow) {
      setItemName("");
      setItemStock("");
      setCompanyName("");
      setCompanyAddress("");
      setCompanyId("");
      setItemId("");
      setTotal("");
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
                itemList={itemList}
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
