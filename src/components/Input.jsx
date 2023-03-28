import React from "react";

const Input = React.forwardRef(function (props, ref) {
  return (
    <>
      <input
        ref={ref}
        className={`form-control py-2 fs-5 ${props?.className}`}
        type={props.type}
        placeholder={props.placeHolder}
        name={props.name}
        id={props.id}
        defaultValue={props.defaultValue ? props.defaultValue : null}
        required={props?.required === false ? false : true}
        readOnly={props?.readOnly}
        onChange={props?.onChange}
        list={props?.list}
        min={props.type === "number" ? "0" : null}
        step={"0.01"}
      />
    </>
  );
});
export default Input;

export function Label(props) {
  return (
    <>
      <label className={props?.className + " fs-5"} htmlFor={props.id}>
        {props.name}
      </label>
    </>
  );
}

export function Selection(props) {
  return (
    <select
      ref={props.selectRef}
      onChange={props?.onChange}
      name={props?.name}
      className={props?.className + " selectdropdown py-2 w-100 rounded"}
      aria-label="Default select example"
      defaultValue={props.defaultValue ? props.defaultValue : props.menu[0]}
    >
      {props.menu.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}

export function Button(props) {
  return (
    <button
      style={{ background: "#F84242", color: "white" }}
      onClick={props?.onClick}
      className="btn"
    >
      {props.name}
    </button>
  );
}

export function Info(props) {
  return (
    <div
      style={{ background: "#F84242", color: "white" }}
      className={
        props.className
          ? `text-center py-2 ${props.className}`
          : "text-center py-2"
      }
      onClick={props?.onClick}
    >
      {props.title}
    </div>
  );
}
