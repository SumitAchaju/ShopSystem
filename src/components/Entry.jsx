import React, { useMemo, useRef } from "react";
import Input, { Info, Label, Selection } from "./Input";
import { getDate } from "../utils/getDate";

export default function Row({ children }) {
  return (
    <>
      <div className="row my-3 align-items-center">{children}</div>
    </>
  );
}

export function EntryLabelName(props) {
  return (
    <Row>
      <div className="col-3">
        <Label {...props.label} />
      </div>
      <div className="col-9">
        <Input {...props.input} />
      </div>
    </Row>
  );
}

export function EntryPrice(props) {
  return (
    <Row>
      <div className="col-3">
        <Label {...props.label} />
      </div>
      <div className="col-5">
        <Input {...props.input} />
      </div>
    </Row>
  );
}
export function EntryInputSelectBtn(props) {
  return (
    <Row>
      <div className="col-3">
        <Label {...props.label} />
      </div>
      <div className="col-5">
        <Input {...props.input} />
      </div>
      <div className="col-2">
        <Selection {...props.selection} />
      </div>
      <div className="col-2">
        <Info {...props.info} />
      </div>
    </Row>
  );
}
export function EntryInputBtn(props) {
  return (
    <Row>
      <div className="col-3">
        <Label {...props.label} />
      </div>
      <div className="col-5">
        <Input {...props.input} />
      </div>
      <div className="col-2">
        <Input {...props.input2} />
      </div>
      <div className="col-2">
        <Info {...props.info} />
      </div>
    </Row>
  );
}
export function EntryLabelInputInfo(props) {
  return (
    <Row>
      <div className="col-3">
        <Label {...props.label} />
      </div>
      <div className="col-7">
        <Input {...props.input} />
      </div>
      <div className="col-2">
        <Info {...props.info} />
      </div>
    </Row>
  );
}
export function EntryDate() {
  const dateInputRef = useRef(null);

  const currentDate = useMemo(getDate, []);

  function setDateToday(e) {
    e.preventDefault();
    dateInputRef.current.value = currentDate;
  }
  return (
    <Row>
      <div className="col-3">
        <Label name="Date:" id="import-product-date" />
      </div>
      <div className="col-6">
        <Input
          type="date"
          placeHolder="dd/mm/year"
          name="productDate"
          id="import-product-date"
          ref={dateInputRef}
          defaultValue={currentDate}
        />
      </div>
      <div className="col-3">
        <Info title="Today" className="rounded" onClick={setDateToday} />
      </div>
    </Row>
  );
}

export function EntryHeading({ title }) {
  return (
    <>
      <section
        className="entry-heading bg-light mb-4"
        style={{ position: "sticky", left: "0", top: "0" }}
      >
        <div
          style={{
            boxShadow: "2px 4px 15px 5px rgba(0, 0, 0, 0.1)",
            height: "65px",
          }}
          className=" d-flex align-items-center  justify-content-center color-brand"
        >
          <h2 style={{ fontSize: "30px" }}>
            {title}
          </h2>
        </div>
      </section>
    </>
  );
}

export function EntrySelection(props){
  return(
    <Row>
    <div className="col-3">
      <Label {...props.label} />
    </div>
    <div className="col-5">
      <Selection {...props.selection} />
    </div>
  </Row>
  )
}

export function EntryProductSuggestions(props){
  return(
  <datalist id={props.id}>
    {props.product && props.product.map(item=>
      <option key={item.id} value={item.product_name}>{item.product_name}</option>
      )}
</datalist>
  )
}