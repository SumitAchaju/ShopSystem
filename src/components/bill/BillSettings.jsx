import React from "react";
import { Search } from "../ProductSearch";
import { filterBillDate } from "../../utils/fiterBill";

export default function BillSettings({
  setTab,
  tab,
  setBillData,
  bill,
  billStatus,
  setLimit,
  initialLimit,
  filterBtnStatus,
  setFilterBtnStatus,
  setShowSpinner,
  inputRef
}) {

  function resetLimit(){
    setLimit(initialLimit)
  }
  function changeTabSales() {
    if (tab === "import") {
      setTab("sales");
      if(filterBtnStatus==="search"||filterBtnStatus==="filter"){
        setFilterBtnStatus("week")
        inputRef.current.value=""
        setBillData(filterBillDate(bill.salesBillData, "week"))
      }
      else{
        setBillData(filterBillDate(bill.salesBillData, filterBtnStatus));
      }
      resetLimit()
      setShowSpinner(true)
    }
  }
  function changeTabImport() {
    if (tab === "sales") {
      setTab("import");
      if(filterBtnStatus==="search"||filterBtnStatus==="filter"){
        setFilterBtnStatus("week")
        inputRef.current.value=""
        setBillData(filterBillDate(bill.importBillData, "week"));
      }
      else{
        setBillData(filterBillDate(bill.importBillData, filterBtnStatus));
      }
      resetLimit()
      setShowSpinner(true)
    }
  }
  function searchBill(search){
    const newBill = [];
    billStatus.forEach((item) => {
      const isInBill = item.bill.filter(
        (innerItem) => innerItem.name.toLowerCase().includes(search) === true
      );
      if (isInBill.length != 0) {
        newBill.push({
          date: item.date,
          bill: isInBill,
        });
      }
    });
    setBillData(newBill);
    setFilterBtnStatus("search")
    resetLimit()
  }
  function handleBillSearch(e) {
    e.preventDefault();
    const search = e.target.billSearch.value.toLowerCase();
    searchBill(search)
    setShowSpinner(true)
  }
  function setBillDay() {
    setBillData(filterBillDate(billStatus, "day"));
    setFilterBtnStatus("day");
    inputRef.current.value=""
    resetLimit()
    setShowSpinner(true)
  }
  function setBillWeek() {
    setBillData(filterBillDate(billStatus, "week"));
    setFilterBtnStatus("week");
    inputRef.current.value=""
    resetLimit()
    setShowSpinner(true)
  }
  function setBillMonth() {
    setBillData(filterBillDate(billStatus, "month"));
    setFilterBtnStatus("month");
    inputRef.current.value=""
    resetLimit()
    setShowSpinner(true)
  }
  return (
    <>
      <section className="billsetting pt-4 pb-3">
        <div className="container px-4">
          <div className="import-sales-btn">
            <div className="row">
              <div className={tab==="import"?"col-6 active" :"col-6"}>
                <button onClick={changeTabImport}>Import</button>
              </div>
              <div className={tab==="sales"?"col-6 active" :"col-6"}>
                <button onClick={changeTabSales}>Sales</button>
              </div>
            </div>
          </div>
          <div className="bill-search my-3">
            <form onSubmit={handleBillSearch}>
              <Search inputRef={inputRef} placeHolder="Search Bill" inputName="billSearch" />
            </form>
          </div>
          <div className="filter-date">
            <div className="d-flex justify-content-between">
              <div>
                <button
                  className={filterBtnStatus === "day" ? "active" : ""}
                  onClick={setBillDay}
                >
                  1 Day
                </button>
              </div>
              <div>
                <button
                  className={filterBtnStatus === "week" ? "active" : ""}
                  onClick={setBillWeek}
                >
                  7 Day
                </button>
              </div>
              <div>
                <button
                  className={filterBtnStatus === "month" ? "active" : ""}
                  onClick={setBillMonth}
                >
                  1 Month
                </button>
              </div>
              <div>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#filterDateModal"
                  className="filter-date-filter"
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
