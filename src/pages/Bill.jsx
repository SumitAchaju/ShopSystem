import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import BillSettings from "../components/bill/BillSettings";
import { filterBillDate } from "../utils/fiterBill";
import BillList from "../components/bill/BillList";
import BillFilter from "../components/bill/BillFilter";
import DataContext from "../context/Data";

export default function Bill() {
  const { importBill, salesBill } = useContext(DataContext);
  const [tab, setTab] = useState("import");
  const [filterBtnStatus, setFilterBtnStatus] = useState("week");
  const initialLimit = 10;
  const [limit, setLimit] = useState(() => initialLimit);
  const [showSpinner, setShowSpinner] = useState(false);
  const inputRef = useRef(null);

  const bill = useMemo(() => {
    if (tab === "import") return importBill;
    else if (tab === "sales") return salesBill;
  }, [tab, importBill, salesBill]);

  const allBill = useMemo(() => {
    return {
      importBillData: importBill,
      salesBillData: salesBill,
    };
  }, [importBill, salesBill]);

  const [billData, setBillData] = useState(() => filterBillDate(bill, "week"));

  const salesProfit = useMemo(() => {
    let total = 0;
    billData.forEach((item) => {
      item.bill.forEach((innerItem) => {
        total += Number(innerItem.profit);
      });
    });
    return total.toFixed(2);
  }, [billData]);
  return (
    <>
      <BillSettings
        tab={tab}
        setTab={setTab}
        setBillData={setBillData}
        bill={allBill}
        billStatus={bill}
        setLimit={setLimit}
        initialLimit={initialLimit}
        filterBtnStatus={filterBtnStatus}
        setFilterBtnStatus={setFilterBtnStatus}
        inputRef={inputRef}
        setShowSpinner={setShowSpinner}
      />
      <BillList
        tab={tab}
        limit={limit}
        setLimit={setLimit}
        profit={salesProfit}
        filterData={billData}
        initialLimit={initialLimit}
        showSpinner={showSpinner}
        setShowSpinner={setShowSpinner}
      />
      <BillFilter
        initialLimit={initialLimit}
        setBillData={setBillData}
        bill={bill}
        setLimit={setLimit}
        setFilterBtnStatus={setFilterBtnStatus}
        inputRef={inputRef}
        setShowSpinner={setShowSpinner}
        filterBtnStatus={filterBtnStatus}
      />
    </>
  );
}
