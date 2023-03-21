import React from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function HomeProduct({
  filterData,
  limit,
  setLimit,
  initialLimit,
  showSpinner,
  setShowSpinner,
}) {
  function sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  if (showSpinner) stopSpinner();
  async function stopSpinner() {
    await sleep(300);
    setShowSpinner(false);
  }
  function fullRenderFilterData() {
    if (limit >= filterData.length) {
      return true;
    } else return false;
  }
  return (
    <>
      <section className="home-product-list">
        <div className="container">
          {showSpinner ? (
            <div
              style={{ height: "50vh" }}
              className="d-flex justify-content-center align-items-center"
            >
              <ClipLoader size={50} color="#F84242" />
            </div>
          ) : (
            <>
              <div>
                {filterData.slice(0, limit).map((item) => (
                  <div key={item.id}>
                    <Link to={`/product/${item.id}`}>
                    <div className="row">
                      <div className="col-10">
                        <h4>{item.product_name}</h4>
                      </div>
                      <div className="col-2">
                        <span>{item.sale_unit}</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <p>
                          Price: <span>{item.price}</span>
                        </p>
                      </div>
                      <div className="col-6">
                        <p>
                          inStock: <span>{item.in_stock}</span>
                        </p>
                      </div>
                    </div>
                    </Link>
                  </div>
                ))}
              </div>
              {filterData.length === 0 ? (
                <h2 className="text-center mt-5 pt-5">No Product Available</h2>
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
            </>
          )}
        </div>
      </section>
    </>
  );
}
