import React, { useState } from "react";
import {
  EntryDate,
  EntryHeading,
  EntryLabelInputInfo,
  EntryLabelName,
} from "../components/Entry";
import useAxios from "../utils/useAxios";
import { savedBillToast } from "../utils/toast";
import PopUpModal, { SalesBillContent } from "../components/modal/PopUpModal";

export default function Sales() {
  const api = useAxios();
  const [popUpData, setPopUpData] = useState({});
  const [sumbit, setSumbit] = useState(false);
  function handleSalesSumbit(e) {
    e.preventDefault();
    const data = {
      product: e.target.productName.value,
      amount: Number(e.target.productRate.value),
      pcs: Number(e.target.productQuantity.value),
      date: e.target.productDate.value,
    };
    if (sumbit === false) {
      setPopUpData(data);
      new bootstrap.Modal("#salesbillmodal").show();
      setSumbit(true);
      return;
    }
    const myPromise = api
      .post("/sales_bill/", data)
      .then((res) => console.log(res.data));
    savedBillToast(myPromise);
    setSumbit(false);
  }

  return (
    <>
      <EntryHeading title="Sales Entry" />
      <section className="sales mt-4">
        <div className="container px-4">
          <h4>Sales Entry</h4>

          <form onSubmit={handleSalesSumbit}>
            <EntryLabelName {...productNameInput} />

            <EntryLabelInputInfo {...productSalesRate} />

            <EntryLabelInputInfo {...productSalesQuantity} />

            <EntryDate />

            <PopUpModal
              title={"Confirm Bill"}
              id="salesbillmodal"
              data={popUpData}
              Content={SalesBillContent}
              setSumbit={setSumbit}
            />

            <div className="d-flex justify-content-center mt-4 mb-3">
              <button className="btn btn-success d-block fs-4 py-2 px-5">
                Save
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

const productNameInput = {
  label: {
    name: "Name:",
    id: "sales-product-name",
  },
  input: {
    type: "text",
    placeHolder: "Product Name...",
    name: "productName",
    id: "sales-product-name",
  },
};
const productSalesRate = {
  label: {
    name: "Rate:",
    id: "sales-product-rate",
  },
  input: {
    type: "number",
    placeHolder: "Rate...",
    name: "productRate",
    id: "sales-product-rate",
  },
  info: {
    title: "Rs",
    className: "rounded-circle",
  },
};
const productSalesQuantity = {
  label: {
    name: "Quantity:",
    id: "sales-product-quantity",
  },
  input: {
    type: "number",
    placeHolder: "Amount...",
    name: "productQuantity",
    id: "sales-product-quantity",
  },
  info: {
    title: "Pcs",
    className: "rounded-circle",
  },
};
