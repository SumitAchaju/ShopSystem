import React from "react";

export default function ImportBillBox(props) {
  return (
    <>
      <div className="import-bill-box my-3">
        <div className="row px-3 pt-3">
          <div className="col-8">
            <h4 className="name">{props.name}</h4>
          </div>
          <div className="col-4">
            <h4 className="price">{props.price}</h4>
          </div>
          <div className="col-5">
            <p>
              Rate: <span>{props.rate}</span>
            </p>
          </div>
          <div className="col-4">
            {props.kg ? (
              <p>
                kg: <span>{props.kg}</span>
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="col-3">
            <p>
              Pcs: <span>{props.pcs}</span>
            </p>
          </div>
          <div className="col-12">
            <p>
              Discount: <span>{props.discount}%</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export function SalesBillBox(props) {
  return (
    <>
      <div className="sales-bill-box my-3">
        <div className="row px-3 pt-3">
          <div className="col-8">
            <h4 className="name">{props.name}</h4>
          </div>
          <div className="col-4">
            <h4 className="sales-rate">{props.salesRate}</h4>
          </div>
          <div className="col-7">
            <p>
              Profit: <span className="profit">{props.profit}</span>
            </p>
          </div>
          <div className="col-5">
            <p>
              Pcs: <span>{props.pcs}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
