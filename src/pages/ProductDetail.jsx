import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HomeProductData } from "./Home";
import { Selection } from "../components/Input";

export default function ProductDetail() {
  const { id } = useParams();
  const [editStatus, setEditStatus] = useState(false);
  const ProductData = useMemo(
    () => HomeProductData.find((item) => item.id === Number(id)),
    [id]
  );
  const go = useNavigate();
  return (
    <>
      <section className="product-detail">
        <div className="container">
          <div className="product-detail-box">
            <div>
              <h2 className="text-center">{ProductData.product_name}</h2>
            </div>
            <div>
              <ul>
                <li>
                  <span>Sales:</span>
                  <SpanOrInput
                    editStatus={editStatus}
                    data={ProductData.price}
                    name="salesPrice"
                    type={"number"}
                  />
                </li>
                <li>
                  <span>Discount:</span>
                  <PercentageOrRate
                    data={ProductData.increment}
                    name={"increment"}
                    editStatus={editStatus}
                  />
                </li>
                <li>
                  <span>Rate:</span>
                  <SpanOrInput
                    editStatus={editStatus}
                    data={ProductData.rate}
                    name="salesRate"
                    type={"number"}
                  />
                </li>
                <li>
                  <span>OurRate:</span>
                  <SpanOrInput
                    editStatus={editStatus}
                    data={ProductData.our_rate}
                    name="salesOurRate"
                    type={"number"}
                  />
                </li>
                <li>
                  <span>Increment:</span>
                  <PercentageOrRate
                    data={ProductData.increment}
                    name={"increment"}
                    editStatus={editStatus}
                  />
                </li>
                <li>
                  <span>inStock:</span>
                  <SpanOrInput
                    editStatus={editStatus}
                    data={ProductData.in_stock}
                    name="inStock"
                    type={"number"}
                    noRs={true}
                  />
                </li>
                <li>
                  <span>SalesUnit:</span>
                  <SpanOrSelect
                    data={ProductData.sale_unit}
                    menu={["Pcs", "6Pcs", "dozn", "kg"]}
                    name={"saleUnit"}
                    editStatus={editStatus}
                  />
                </li>
                <li>
                  <span>Date:</span>
                  <SpanOrInput
                    editStatus={editStatus}
                    data={ProductData.date}
                    name="date"
                    type={"date"}
                    noRs={true}
                  />
                </li>
              </ul>
            </div>
            <div>
              <div className="d-flex justify-content-center gap-3">
                <button onClick={() => setEditStatus((prev) => !prev)}>
                  {editStatus ? "Save" : "Edit"}
                </button>
                <button onClick={() => go("/")}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SpanOrInput({ data, type, editStatus, name, noRs }) {
  let parseData;
  if (type === "date") {
    let dateList = data.split("/");
    parseData = `${dateList[2]}-${dateList[0]}-${dateList[1]}`;
  } else {
    parseData = data;
  }
  return (
    <>
      {editStatus ? (
        <input type={type} required name={name} defaultValue={parseData} />
      ) : (
        <span>
          {noRs === true ? "" : "Rs"} {data}
        </span>
      )}
    </>
  );
}

function PercentageOrRate({ data, editStatus, name }) {
  const showData =
    data.show === "precentage" ? `${data.percentage}%` : `Rs ${data.price}`;
  return (
    <>
      {editStatus ? (
        <div
          style={{ width: "50%" }}
          className="d-flex justify-content-between"
        >
          <input
            className="percentageorrate"
            type="number"
            required
            name={name}
            defaultValue={
              data.show === "precentage" ? data.percentage : data.price
            }
          />
          <div>
            <Selection
              defaultValue={data.show === "precentage" ? "%" : "Rs"}
              menu={["Rs", "%"]}
              className="d-block text-dark fw-bold"
            />
          </div>
        </div>
      ) : (
        <span>{showData}</span>
      )}
    </>
  );
}

function SpanOrSelect({ data, menu, name, editStatus }) {
  return (
    <>
      {editStatus ? (
        <select
          style={{
            width: "50%",
            borderColor: "gray",
            fontSize: "20px",
            fontWeight: "500",
            borderRadius: "3px",
            color: "black",
          }}
          className={"selectdropdown py-1 px-1 text-start"}
          aria-label="Default select example"
          defaultValue={data}
          name={name}
        >
          {menu.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      ) : (
        <span>{data}</span>
      )}
    </>
  );
}
