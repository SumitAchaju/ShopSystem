import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import DataContext from "../context/Data";
import { SearchIcon } from "../assets/icons/Icon";

export default function ProductSearch() {
  const { HomeProductData } = useContext(DataContext);
  const [filterData, setFilterData] = useState(HomeProductData);
  const initialLimit = 10;
  const [limit, setLimit] = useState(initialLimit);
  const [showSpinner, setShowSpinner] = useState(false);
  function handleSearch(e) {
    e.preventDefault();
    const search = e.target.value.toLowerCase();
    const filter = HomeProductData.filter(
      (item) => item.product_name.toLowerCase().includes(search) === true
    );
    setFilterData(filter);
    setLimit(initialLimit);
    setShowSpinner(true);
  }
  useEffect(() => {
    setFilterData(HomeProductData);
  }, [HomeProductData]);
  return (
    <>
      <section className="product-search">
        <div className="container">
          <div className=" p-4">
            <h2>Product Search</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <Search
                onChange={handleSearch}
                placeHolder="Search..."
                inputName="productSearch"
              />
            </form>
          </div>
        </div>
      </section>
      <Outlet
        context={[
          filterData,
          limit,
          setLimit,
          initialLimit,
          showSpinner,
          setShowSpinner,
        ]}
      />
    </>
  );
}

export function Search(props) {
  return (
    <>
      <div className="row align-items-stretch search">
        <div className="col-10">
          <input
            ref={props.inputRef ? props.inputRef : null}
            className="form-control px-4"
            type="text"
            placeholder={props.placeHolder}
            name={props.inputName}
            required
            onChange={props?.onChange}
          />
        </div>
        <div className="col-2">
          <button
            id="top-search"
            className="border-0 d-block rounded-circle"
            type="sumbit"
          >
            <SearchIcon/>
          </button>
        </div>
      </div>
    </>
  );
}
