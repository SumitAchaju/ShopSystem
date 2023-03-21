import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import ImportBillBox, { SalesBillBox } from "./BillBox";

export default function BillList({
  tab,
  filterData,
  limit,
  setLimit,
  initialLimit,
  showSpinner,
  setShowSpinner,
  profit
}) {
  function fullRenderFilterData() {
    if (limit >= filterData.length) {
      return true;
    } else return false;
  }

  function sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  if (showSpinner) stopSpinner();
  async function stopSpinner() {
    await sleep(1000);
    setShowSpinner(false);
  }
  return (
    <>
      <section className={`${tab}-bill`}>
        <div className="container px-4">
          {showSpinner ? (
            <div
              style={{ height: "50vh" }}
              className="d-flex justify-content-center align-items-center"
            >
              <ClipLoader size={50} color="#F84242" />
            </div>
          ) : (
            <div>
              {tab === "sales" && (
                <div>
                  <h2 className="total-profit">
                    Total Profit: <span>{profit}</span>
                  </h2>
                </div>
              )}
              {filterData.slice(0, limit).map((item, index) => (
                <div
                  key={item.date}
                  className={
                    index + 1 === filterData.slice(0, limit).length
                      ? ""
                      : "mb-5"
                  }
                >
                  <div className="ps-3">
                    <h2 className="date">{item.date}</h2>
                  </div>
                  {tab === "import"
                    ? item.bill.map((innerItem) => (
                        <ImportBillBox {...innerItem} key={innerItem.id} />
                      ))
                    : item.bill.map((innerItem) => (
                        <SalesBillBox {...innerItem} key={innerItem.id} />
                      ))}
                </div>
              ))}
              {filterData.length === 0 ? (
                <h2 className="text-center mt-5 pt-5">No Bill Available</h2>
              ) : null}
              {fullRenderFilterData() ? null : (
                <div className="loadmore text-center">
                  <button
                    onClick={() => setLimit((prev) => prev + initialLimit)}
                    className="border-0 rounded bg-brand text-light fs-5 py-2 px-4 my-2"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
