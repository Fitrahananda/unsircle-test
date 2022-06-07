import { Form } from "react-bootstrap";

export default function InputComponent({
  type,
  placeholder,
  inputHandler,
  value,
  name,
  placement,
  menuList,
}) {
  if (placement === "order") {
    if (name === "table") {
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
    } else {
      return (
        <>
          <Form>
            <Form.Label>{name}</Form.Label>

            {menuList.map((menu, i) => (
              <div key={menu.id} className="mb-3">
                <Form.Check
                  type="radio"
                  id={menu.name}
                  label={menu.name}
                  checked={value[i]}
                  onChange={(e) => {
                    const value = e.target.id;
                    inputHandler(value, name);
                  }}
                />
              </div>
            ))}
          </Form>
        </>
      );
    }
  } else {
    if (name !== "status") {
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
    } else {
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
              Select status
            </option>
            <option value="ready">ready</option>
            <option value="notReady">notReady</option>
          </Form.Select>
        </>
      );
    }
  }
}
