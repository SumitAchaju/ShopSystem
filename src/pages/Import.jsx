import React, { useContext, useState } from "react";
import useAxios from "../utils/useAxios";
import {
  EntryDate,
  EntryHeading,
  EntryInputBtn,
  EntryInputSelectBtn,
  EntryLabelName,
  EntryPrice,
  EntryProductSuggestions,
  EntrySelection,
} from "../components/Entry";
import AuthContext from "../context/Auth";
import DataContext from "../context/Data";
import { savedBillToast } from "../utils/toast";
import PopUpModal, { ImportBillContent } from "../components/modal/PopUpModal";

const discountInputRef = React.createRef(null);
const incrementInputRef = React.createRef(null);
const buyRef = React.createRef(null);
const quantityRef = React.createRef(null);
const ourRateRef = React.createRef(null);
const rateRef = React.createRef(null);
const discountTypeRef = React.createRef(null);
const incrementTypeRef = React.createRef(null);
const productPriceRef = React.createRef(null);

export default function Import() {
  const { baseUrl } = useContext(AuthContext);
  const { product } = useContext(DataContext);
  const api = useAxios();
  const [popUpData,setPopUpData] = useState({});
  const[sumbit,setSumbit] =useState(false)
  function handleImportSumbit(e) {
    e.preventDefault();
    const data = {
      productName: e.target.productName.value,
      buy: Number(e.target.productBuy.value),
      discount: Number(e.target.productDiscount.value),
      quantity: Number(e.target.productQuantity.value),
      kg: Number(e.target.productKg.value),
      rate: Number(e.target.productRate.value),
      ourRate: Number(e.target.productOurRate.value),
      increment: Number(e.target.productIncrement.value),
      salesUnit: e.target.productUnit.value,
      date: e.target.productDate.value,
      incrementType: e.target.productIncrementType.value,
      discountType: e.target.productDiscountType.value,
    };
    if(sumbit===false){
      setPopUpData(data)
      setSumbit(true)
      return
    }
    const myPromise = api.post(`${baseUrl}/import_bill/`, data);
    savedBillToast(myPromise);
    setSumbit(false)
  }
  return (
    <>
      <EntryHeading title={"Import Entry"} />
      <section className="import mt-2">
        <div className="container px-4">
          <div className="import-input-box">
            <form onSubmit={handleImportSumbit}>
              <EntryLabelName {...productNameInput} />

              <EntryProductSuggestions
                id={productNameInput.input.list}
                product={product}
              />

              <EntryPrice {...productBuyPrice} />

              <EntryInputSelectBtn {...productDiscount} />

              <EntryInputBtn {...productQuantity} />

              <EntryPrice {...productRate} />

              <EntryPrice {...productOurRate} />

              <EntryPrice {...productIncrementPrice} />

              <EntryInputSelectBtn {...productIncrement} />

              <EntrySelection {...productSalesUnit} />

              <EntryDate />

              <PopUpModal id="importbillmodal" data = {popUpData} Content={ImportBillContent} setSumbit={setSumbit}/>
              <div className="d-flex justify-content-center mt-4 mb-3">
                <button
                  type="sumbit"
                  data-bs-toggle="modal"
                  data-bs-target="#importbillmodal"
                  className="btn btn-success d-block fs-4 py-2 px-5"
                >
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

function onChangeHandler() {
  if (
    buyRef.current.value === "" ||
    discountInputRef.current.value === "" ||
    quantityRef.current.value === ""
  ) {
    ourRateRef.current.value = "";
    rateRef.current.value = "";
    return;
  }
  let buyValue = Number(buyRef.current.value);
  let discountValue = Number(discountInputRef.current.value);
  let quantityValue = Number(quantityRef.current.value);
  let discountType = discountTypeRef.current.value;
  let buyValueWithoutDiscount;
  if (discountType === "%") {
    buyValueWithoutDiscount = (100 * buyValue) / (100 - discountValue);
  } else {
    buyValueWithoutDiscount = buyValue + discountValue;
  }
  let rate = buyValueWithoutDiscount / quantityValue;
  rateRef.current.value = rate;
  ourRateRef.current.value = buyValue / quantityValue;
  let ourRate = Number(ourRateRef.current.value);
  let increment = Number(incrementInputRef.current.value);
  let incrementType = incrementTypeRef.current.value;
  let incrementAmount =
    incrementType === "%" ? (increment / 100) * ourRate : increment;
  productPriceRef.current.value = incrementAmount + ourRate;
}

const productNameInput = {
  label: {
    name: "Name:",
    id: "import-product-name",
  },
  input: {
    type: "search",
    placeHolder: "Product Name...",
    name: "productName",
    id: "import-product-name",
    list: "product-suggestions",
  },
  selection: {
    menu: ["New", "Old"],
    name: "productType",
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
    onChange: onChangeHandler,
    ref: buyRef,
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
    onChange: onChangeHandler,
  },
  selection: {
    menu: ["Rs", "%"],
    name: "productDiscountType",
    selectRef: discountTypeRef,
    onChange: onChangeHandler,
  },
  info: {
    title: "0%",
    className: "rounded-circle",
    onClick: () => {
      discountInputRef.current.value = 0;
      onChangeHandler();
    },
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
    onChange: onChangeHandler,
    ref: quantityRef,
  },
  input2: {
    type: "number",
    name: "productKg",
    id: "import-product-kg",
    className: "px-2",
    required: false,
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
    readOnly: true,
    ref: rateRef,
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
    readOnly: true,
    ref: ourRateRef,
  },
};
const productIncrementPrice = {
  label: {
    name: "SalePrice:",
    id: "import-product-price",
  },
  input: {
    type: "number",
    placeHolder: "",
    name: "productPrice",
    id: "import-product-price",
    readOnly: true,
    ref: productPriceRef,
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
    onChange: onChangeHandler,
  },
  selection: {
    menu: ["Rs", "%"],
    name: "productIncrementType",
    selectRef: incrementTypeRef,
    onChange: onChangeHandler,
  },
  info: {
    title: "0%",
    className: "rounded-circle",
    onClick: () => {
      incrementInputRef.current.value = 0;
      onChangeHandler();
    },
  },
};
const productSalesUnit = {
  label: {
    name: "SaleUnit:",
    id: "import-product-unit",
  },
  selection: {
    menu: ["Pcs", "Dozn", "Kg", "6Pcs"],
    name: "productUnit",
    className: "fs-5 text-start ps-2",
  },
};
