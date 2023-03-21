import React from "react";
import {
  EntryDate,
  EntryHeading,
  EntryInputBtn,
  EntryInputSelectBtn,
  EntryLabelName,
  EntryPrice,
} from "../components/Entry";

const discountInputRef = React.createRef(null);
const incrementInputRef = React.createRef(null);

export default function Import() {
  return (
    <>
      <EntryHeading title={"Import Entry"} />
      <section className="import mt-2">
        <div className="container px-4">
          <div className="import-input-box">
          <form action="">
            <EntryLabelName {...productNameInput} />

            <EntryPrice {...productBuyPrice} />

            <EntryInputSelectBtn {...productDiscount} />

            <EntryInputBtn {...productQuantity} />

            <EntryPrice {...productRate} />

            <EntryPrice {...productOurRate} />

            <EntryInputSelectBtn {...productIncrement} />

            <EntryPrice {...productSalesUnit} />

            <EntryDate />
            <div className="d-flex justify-content-center mt-4 mb-3">
              <button className="btn btn-success d-block fs-4 py-2 px-5">
                Save
              </button>
            </div>
          </form>
          </div>
        </div>
      </section>
    </>
  );
}

const productNameInput = {
  label: {
    name: "Name:",
    id: "import-product-name",
  },
  input: {
    type: "text",
    placeHolder: "Product Name...",
    name: "productName",
    id: "import-product-name",
  },
};
const productBuyPrice = {
  label: {
    name: "Buy:",
    id: "import-product-buy",
  },
  input: {
    type: "number",
    placeHolder: "Rate...",
    name: "productBuy",
    id: "import-product-buy",
  },
};
const productDiscount = {
  label: {
    name: "Discount:",
    id: "import-product-discount",
  },
  input: {
    ref: discountInputRef,
    type: "number",
    placeHolder: "",
    name: "productDiscount",
    id: "import-product-discount",
  },
  selection: {
    menu: ["Rs", "%"],
  },
  info: {
    title: "0%",
    className: "rounded-circle",
    onClick: () => (discountInputRef.current.value = 0),
  },
};
const productQuantity = {
  label: {
    name: "Quantity:",
    id: "import-product-quantity",
  },
  input: {
    type: "number",
    placeHolder: "Pcs...",
    name: "productQuantity",
    id: "import-product-quantity",
  },
  input2: {
    type: "number",
    name: "productKg",
    id: "import-product-kg",
    className:"px-2"
  },
  info: {
    title: "kg",
    className: "rounded-circle",
  },
};
const productRate = {
  label: {
    name: "Rate:",
    id: "import-product-rate",
  },
  input: {
    type: "number",
    placeHolder: "",
    name: "productRate",
    id: "import-product-rate",
    readOnly:true
  },
};
const productOurRate = {
  label: {
    name: "OurRate:",
    id: "import-product-ourrate",
  },
  input: {
    type: "number",
    placeHolder: "",
    name: "productOurRate",
    id: "import-product-ourrate",
    readOnly:true
  },
};
const productIncrement = {
  label: {
    name: "Increment:",
    id: "import-product-increment",
  },
  input: {
    ref: incrementInputRef,
    type: "number",
    placeHolder: "",
    name: "productIncrement",
    id: "import-product-increment",
  },
  selection: {
    menu: ["Rs", "%"],
  },
  info: {
    title: "0%",
    className: "rounded-circle",
    onClick: () => (incrementInputRef.current.value = 0),
  },
};
const productSalesUnit = {
  label: {
    name: "SaleUnit:",
    id: "import-product-unit",
  },
  input: {
    type: "text",
    placeHolder: "",
    name: "productUnit",
    id: "import-product-unit",
  },
};
