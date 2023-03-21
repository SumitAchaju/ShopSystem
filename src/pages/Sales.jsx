import React from "react";
import { EntryDate, EntryHeading, EntryLabelInputInfo, EntryLabelName } from "../components/Entry";

export default function Sales() {
  return (
    <>
    <EntryHeading title="Sales Entry" />
      <section className="sales mt-4">
        <div className="container px-4">
          
          <h4>Sales Entry</h4>

          <form action="">

            <EntryLabelName {...productNameInput} />

            <EntryLabelInputInfo {...productSalesRate} />

            <EntryLabelInputInfo {...productSalesQuantity} />

            <EntryDate />

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
  info:{
    title:"Rs",
    className:"rounded-circle",
  }
};
const productSalesQuantity= {
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
  info:{
    title:"Pcs",
    className:"rounded-circle",
  }
};