import React, {  useContext, useEffect, useMemo } from "react";
import useAxios from "../../utils/useAxios";
import {
  EntryDate,
  EntryInputBtn,
  EntryInputSelectBtn,
  EntryLabelName,
  EntryPrice,
} from "../../components/Entry";
import DataContext from "../../context/Data";
import { savedBillToast } from "../../utils/toast";
import autoComplete from "../../utils/searchSuggetions";

const discountInputRef = React.createRef(null);
const buyRef = React.createRef(null);
const quantityRef = React.createRef(null);
const ourRateRef = React.createRef(null);
const rateRef = React.createRef(null);
const discountTypeRef = React.createRef(null);

export default function ImportBillUpdateContent({data}) {
  const { HomeProductData } = useContext(DataContext);
  const api = useAxios();
  const urlId = data.id
  function handleImportSumbit(e) {
    e.preventDefault();
    const data = {
      productName: e.target.productName.value,
      buy: Number(e.target.productBuy.value),
      quantity: Number(e.target.productQuantity.value),
      discount:Number(e.target.productDiscount.value),
      kg: Number(e.target.productKg.value),
      rate: Number(e.target.productRate.value),
      ourRate: Number(e.target.productOurRate.value),
      date: e.target.productDate.value,
      discountType: e.target.productDiscountType.value,
    };
    const myPromise = api.patch(`/import_bill/${urlId}/`, data);
    savedBillToast(myPromise);
  }
  const product = useMemo(()=>{
    let productlist=[];
    HomeProductData.forEach(item=>{
      productlist.push(item.product_name)
    })
    return productlist
  },[HomeProductData])
  useEffect(()=>{
    autoComplete(document.getElementById("import-product-name"), product)
  },[product])
  useEffect(()=>{
    document.getElementById("import-product-name").value = data.product?.product_name
    document.getElementById("import-product-buy").value = data.total_price
    document.getElementById("import-product-discount").value = data.discount_rate?.toFixed(2)
    document.getElementById("import-product-quantity").value = data.amount_in_pcs
    document.getElementById("import-product-kg").value = data.amount_in_kg
    document.getElementById("import-product-rate").value = data.rate
    document.getElementById("import-product-ourrate").value = data.our_rate
    document.getElementById("import-product-date").value = data.import_date
    discountTypeRef.current.value= "Rs"
  },[data])
  return (
    <>
      <section className="import mt-2">
        <div className="container px-1">
          <div className="import-input-box">
            <form autoComplete="off" onSubmit={handleImportSumbit}>
              <EntryLabelName {...productNameInput} defaultValue={data.product?.product_name} />

              <EntryPrice {...productBuyPrice} defaultValue={data.total_price} />

              <EntryInputSelectBtn {...productDiscount} defaultValue={data.discount_rate}/>

              <EntryInputBtn {...productQuantity} defaultValue1={data.amount_in_pcs} defaultValue2={data.amount_in_kg}/>

              <EntryPrice {...productRate} defaultValue={data.rate}/>

              <EntryPrice {...productOurRate} defaultValue={data.our_rate}/>

              <EntryDate defaultValue={data.import_date} default={true} />

              <button id="updateimportbillform" type="sumbit" className="d-none"></button>
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
  rateRef.current.value = rate.toFixed(2);
  ourRateRef.current.value = (buyValue / quantityValue).toFixed(2);
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
    readOnly:true
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
