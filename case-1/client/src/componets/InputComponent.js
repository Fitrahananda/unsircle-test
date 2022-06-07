import { Form } from "react-bootstrap";

export default function InputComponent({
  type,
  placeholder,
  inputHandler,
  value,
  name,
  itemList,
  companyList,
  placement,
}) {
  if (placement === "transaction") {
    if (name !== "Total") {
      return (
        <>
          <Form.Select
            aria-label="Default select example"
            value={value}
            onChange={(e) => {
              const value = e.target.value;
              inputHandler(value, name);
            }}
          >
            <option default hidden>
              Select {name.split(" ")[0]}
            </option>
            {itemList &&
              itemList.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
          </Form.Select>
          <br></br>
        </>
      );
    } else {
      return (
        <>
          <Form.Label>{name}</Form.Label>
          <Form.Control
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              const value = e.target.value;
              inputHandler(value, name);
            }}
            className="mb-3"
          />
        </>
      );
    }
  } else {
    return (
      <>
        <Form.Label>{name}</Form.Label>
        <Form.Control
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            const value = e.target.value;
            inputHandler(value, name);
          }}
          className="mb-3"
        />
      </>
    );
  }
}
