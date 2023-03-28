import React, { useContext, useEffect, useMemo } from "react";
import {
  EntryDate,
  EntryLabelInputInfo,
  EntryLabelName,
} from "../../components/Entry";
import useAxios from "../../utils/useAxios";
import { savedBillToast } from "../../utils/toast";
import DataContext, { parseDataSales } from "../../context/Data";
import autoComplete from "../../utils/searchSuggetions";

export default function SalesBillUpdateContent({ data }) {
  const { HomeProductData, setSalesBill, salesBill } = useContext(DataContext);
  const api = useAxios();
  const urlId = data.id;
  function handleSalesSumbit(e) {
    e.preventDefault();
    const data = {
      product: e.target.productName.value,
      amount: Number(e.target.productRate.value),
      pcs: Number(e.target.productQuantity.value),
      date: e.target.productDate.value,
    };
    const myPromise = api.patch(`/sales_bill/${urlId}/`, data).then((res) => {
      const responseData = res.data;
      const parsedBill = parseDataSales([responseData])[0];
      let brk = false;
      let updated = false;
      salesBill.forEach((item, i) => {
        item.bill.forEach((innerItem, innerI) => {
          if (innerItem.id === responseData.id) {
            if (innerItem.import_date === responseData.import_date) {
              salesBill[i].bill[innerI] = responseData;
              setSalesBill([...salesBill]);
              brk = true;
              updated = true;
              return;
            } else {
              salesBill[i].bill.splice(
                salesBill[i].bill.indexOf(salesBill[i].bill[innerI]),
                1
              );
              brk = true;
              return;
            }
          }
        });
        if (brk) {
          return;
        }
      });
      if (!updated) {
        let isDateInImport = false;
        salesBill.forEach((item) => {
          if (item.date === parsedBill.date) {
            item.bill.unshift(parsedBill.bill[0]);
            isDateInImport = true;
            setSalesBill([...salesBill]);
            return;
          }
        });
        if (!isDateInImport) {
          setSalesBill((prev) => [parsedBill, ...prev]);
        }
      }
    });
    savedBillToast(myPromise);
  }
  const product = useMemo(() => {
    let productlist = [];
    HomeProductData.forEach((item) => {
      productlist.push(item.product_name);
    });
    return productlist;
  }, [HomeProductData]);
  useEffect(() => {
    autoComplete(document.getElementById("sales-product-name"), product);
  }, [product]);
  useEffect(() => {
    document.getElementById("sales-product-name").value =
      data.product?.product_name;
    document.getElementById("sales-product-rate").value = data.total_sales;
    document.getElementById("sales-product-quantity").value =
      data.amount_in_pcs;
    document.getElementById("import-product-date").value = data.sales_date;
  }, [data]);
  return (
    <>
      <section className="sales mt-4">
        <div className="container px-1">
          <form autoComplete="off" onSubmit={handleSalesSumbit}>
            <EntryLabelName
              {...productNameInput}
              defaultValue={data.product?.product_name}
            />

            <EntryLabelInputInfo
              {...productSalesRate}
              defaultValue={data.total_sales}
            />

            <EntryLabelInputInfo
              {...productSalesQuantity}
              defaultValue={data.amount_in_pcs}
            />

            <EntryDate defaultValue={data.sales_date} default={true} />

            <button
              type="sumbit"
              id="updatesalesbillform"
              className="d-none"
            ></button>
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
    type: "search",
    placeHolder: "Product Name...",
    name: "productName",
    id: "sales-product-name",
    readOnly: true,
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
