import React, { useEffect, useState } from "react";
import { filterBillCustomDate } from "../../utils/fiterBill";

export default function BillFilter({
  bill,
  setBillData,
  setLimit,
  initialLimit,
  setFilterBtnStatus,
  inputRef,
  setShowSpinner,
}) {
  const [selectMode, setSelectMode] = useState("day");
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [month, setMonth] = useState(() => 1);
  const [day, setDay] = useState(() => 1);

  function handleFilter() {
    let date;

    if (selectMode === "year") date = [year.toString()];
    else if (selectMode === "month") date = [year.toString(), month.toString()];
    else if (selectMode === "day")
      date = [year.toString(), month.toString(), day.toString()];

    const newBill = filterBillCustomDate(bill, date, selectMode);
    setBillData(newBill);
    setLimit(initialLimit);
    setFilterBtnStatus("filter");
    setShowSpinner(true);
    inputRef.current.value = "";
  }

  return (
    <>
      <div
        className="modal fade"
        id="filterDateModal"
        tabIndex={-1}
        aria-labelledby="filterDateModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog mx-4 modal-dialog-centered">
          <div className="modal-content filterDateModal">
            <div className="p-2 bg-danger">
              <h2 className="text-center text-light">Filter</h2>
            </div>
            <div className="m-3">
              <div className="d-flex justify-content-between menu">
                <button
                  className={selectMode === "day" ? "active" : ""}
                  onClick={() => setSelectMode("day")}
                >
                  Day
                </button>
                <button
                  className={selectMode === "month" ? "active" : ""}
                  onClick={() => setSelectMode("month")}
                >
                  Month
                </button>
                <button
                  className={selectMode === "year" ? "active" : ""}
                  onClick={() => setSelectMode("year")}
                >
                  Year
                </button>
              </div>
            </div>
            <div className="select-date m-3">
              <FilterDatePicker
                selectMode={selectMode}
                year={year}
                setYear={setYear}
                month={month}
                setMonth={setMonth}
                day={day}
                setDay={setDay}
              />
            </div>
            <div className="d-flex m-3 closefilterbtn gap-3">
              <button type="button" data-bs-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                onClick={handleFilter}
                data-bs-dismiss="modal"
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function FilterDatePicker({
  selectMode,
  year,
  month,
  day,
  setYear,
  setMonth,
  setDay,
}) {
  function getYearOption() {
    const yearNo = new Date().getFullYear() - 2019;
    const yearOption = [...Array(yearNo).keys()].map(
      (year) => new Date().getFullYear() - year
    );
    return yearOption;
  }
  function getMonthOption() {
    const monthOption = [...Array(12).keys()].map((month) => month + 1);
    return monthOption;
  }
  function getDayOption() {
    const daysInMonth = new Date(year, month, 0).getDate();
    const dayOption = [...Array(daysInMonth).keys()].map((day) => day + 1);
    return dayOption;
  }
  useEffect(() => {
    if (getDayOption().includes(Number(day)) === false) setDay(1);
  }, [year, month]);
  return (
    <>
      <div className="row filterdatepicker">
        <div className="col-4">
          <label htmlFor="year">Year</label>
          <select
            id="year"
            onChange={(e) => {
              setYear(e.target.value);
            }}
            value={year}
          >
            {getYearOption().map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {selectMode != "year" && (
          <div className="col-4">
            <label htmlFor="month">Month</label>
            <select
              id="month"
              onChange={(e) => {
                setMonth(e.target.value);
              }}
              value={month}
            >
              {getMonthOption().map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectMode != "year" && selectMode != "month" && (
          <div className="col-4">
            <label htmlFor="day">Day</label>
            <select
              id="day"
              onChange={(e) => setDay(e.target.value)}
              value={day}
            >
              {getDayOption().map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </>
  );
}
