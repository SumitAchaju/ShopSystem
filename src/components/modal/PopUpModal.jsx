import React from "react";

export default function PopUpModal({ id, Content, data, setSumbit, title,setUpdate }) {
  return (
    <div>
      {/* Modal */}
      <div
        className="modal fade"
        id={id}
        tabIndex={-1}
        aria-labelledby={`${id}Label`}
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`${id}Label`}>
                {title}
              </h1>
            </div>
            <div className="modal-body">
              <Content data={data} />
            </div>
            <div className="modal-footer justify-content-center gap-3">
              <button
                data-bs-dismiss="modal"
                type="sumbit"
                className="btn btn-success fs-5 px-4 active-btn"
                onClick={setUpdate?setUpdate:null}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-danger fs-5 px-4"
                data-bs-dismiss="modal"
                onClick={setSumbit ? () => setSumbit(false) : null}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ImportBillContent({ data }) {
  return (
    <>
      <div>
        <div className="row fs-5 ">
          <div className="col-6 mb-3">Product Name:</div>
          <div className="col-6 mb-3">{data.productName}</div>
          <div className="col-6 mb-3">Buy:</div>
          <div className="col-6 mb-3">Rs {data.buy}</div>
          <div className="col-6 mb-3">Discount:</div>
          <div className="col-6 mb-3">
            {data.discountType === "Rs" ? data.discountType : ""}{" "}
            {data.discount} {data.discountType === "%" ? data.discountType : ""}
          </div>
          <div className="col-6 mb-3">Quantity:</div>
          <div className="col-6 mb-3">
            {data.quantity} Pcs | {data.kg} kg
          </div>
          <div className="col-6 mb-3">Rate:</div>
          <div className="col-6 mb-3">Rs {data.rate}</div>
          <div className="col-6 mb-3">Our Rate:</div>
          <div className="col-6 mb-3">Rs {data.ourRate}</div>
          <div className="col-6 mb-3">Sales Price:</div>
          <div className="col-6 mb-3">Rs {data.salesPrice}</div>
          <div className="col-6 mb-3">Increment:</div>
          <div className="col-6 mb-3">
            {data.incrementType === "Rs" ? data.incrementType : ""}{" "}
            {data.increment}{" "}
            {data.incrementType === "%" ? data.incrementType : ""}
          </div>
          <div className="col-6 mb-3">Sales Unit:</div>
          <div className="col-6 mb-3">{data.salesUnit}</div>
          <div className="col-6 mb-3">Date:</div>
          <div className="col-6 mb-3">{data.date}</div>
        </div>
      </div>
    </>
  );
}

export function SalesBillContent({ data }) {
  return (
    <>
      <div className="row fs-5">
        <div className="col-6 mb-3">Product Name:</div>
        <div className="col-6 mb-3">{data.product}</div>
        <div className="col-6 mb-3">Total Price:</div>
        <div className="col-6 mb-3">{data.amount}</div>
        <div className="col-6 mb-3">Quantity:</div>
        <div className="col-6 mb-3">{data.pcs}</div>
        <div className="col-6 mb-3">Date:</div>
        <div className="col-6 mb-3">{data.date}</div>
      </div>
    </>
  );
}

export function ProductUpdateContent({ data }) {
  return (
    <>
      <div className="row fs-5">
        <div className="col-6 mb-3">Price:</div>
        <div className="col-6 mb-3">{data.price}</div>
        <div className="col-6 mb-3">Increment:</div>
        <div className="col-6 mb-3">
          {data.incrementType === "Rs" ? "Rs" : ""} {data.increment}{" "}
          {data.incrementType === "%" ? "%" : ""}
        </div>
        <div className="col-6 mb-3">In Stock:</div>
        <div className="col-6 mb-3">{data.inStock}</div>
        <div className="col-6 mb-3">Sales Unit:</div>
        <div className="col-6 mb-3">{data.salesUnit}</div>
      </div>
    </>
  );
}
