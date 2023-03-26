import React, { useRef, useState } from "react";

export default function ImportBillBox(props) {
  const [discount, setDiscount] = useState(
    `Rs ${props.discount_rate.toFixed(2)}`
  );
  const [pressTimer, setPressTimer] = useState(null);
  const buttonRef = useRef(null);

  const handleMouseDown = () => {
    // Set a timer for 500ms
    const timer = setTimeout(() => {
      // Long press action
      props.setData(props);
      new bootstrap.Modal("#importbillupdatemodal").show();
    }, 1000);
    setPressTimer(timer);
  };

  const handleMouseUp = () => {
    // Clear the timer
    clearTimeout(pressTimer);
  };
  return (
    <>
      <div
        ref={buttonRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        className="import-bill-box my-3"
      >
        <div className="row px-3 pt-3">
          <div className="col-8">
            <h4 className="name">{props.product.product_name}</h4>
          </div>
          <div className="col-4 text-end">
            <h4 className="price pe-3">{props.total_price}</h4>
          </div>
          <div className="col-5">
            <p>
              Rate: <span>{props.rate}</span>
            </p>
          </div>
          <div className="col-4">
            {props.amount_in_kg ? (
              <p>
                kg: <span>{props.amount_in_kg}</span>
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="col-3">
            <p>
              Pcs: <span>{props.amount_in_pcs}</span>
            </p>
          </div>
          <div className="col-12">
            <p
              onClick={() => {
                setDiscount((prev) => {
                  return prev === `Rs ${props.discount_rate.toFixed(2)}`
                    ? `${props.discount_percentage.toFixed(2)} %`
                    : `Rs ${props.discount_rate.toFixed(2)}`;
                });
              }}
            >
              Discount: <span>{discount}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export function SalesBillBox(props) {
  const [pressTimer, setPressTimer] = useState(null);
  const buttonRef = useRef(null);

  const handleMouseDown = () => {
    // Set a timer for 500ms
    const timer = setTimeout(() => {
      // Long press action
      props.setData(props);
      new bootstrap.Modal("#salesbillupdatemodal").show();
    }, 1000);
    setPressTimer(timer);
  };

  const handleMouseUp = () => {
    // Clear the timer
    clearTimeout(pressTimer);
  };
  return (
    <>
      <div
        ref={buttonRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        className="sales-bill-box my-3"
      >
        <div className="row px-3 pt-3">
          <div className="col-8">
            <h4 className="name">{props.product.product_name}</h4>
          </div>
          <div className="col-4">
            <h4 className="sales-rate">{props.total_sales}</h4>
          </div>
          <div className="col-7">
            <p>
              Profit: <span className="profit">{props.profit.toFixed(2)}</span>
            </p>
          </div>
          <div className="col-5">
            <p>
              Pcs: <span>{props.amount_in_pcs}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
