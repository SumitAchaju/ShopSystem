import React, { useContext, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DataContext from "../context/Data";
import useAxios from "../utils/useAxios";
import { savedBillToast } from "../utils/toast";
import PopUpModal, {
  ProductUpdateContent,
} from "../components/modal/PopUpModal";

const salesRef = React.createRef();
const incrementRef = React.createRef();
const inStockRef = React.createRef();
const salesUnitRef = React.createRef();

export default function ProductDetail() {
  const { id } = useParams();
  const { HomeProductData,setHomeProductData } = useContext(DataContext);
  const [editStatus, setEditStatus] = useState(false);
  const [showD, setDShow] = useState("%");
  const [showI, setIShow] = useState("%");
  const [popUpData, setPopUpData] = useState({});
  const api = useAxios();
  const ProductData = useMemo(
    () => HomeProductData.find((item) => item.id === Number(id)),
    [id]
  );
  function confirmUpdate() {
    setEditStatus(true);
    if(editStatus===false){
      return
    }
    setPopUpData({
      price: salesRef.current.value,
      increment: incrementRef.current.value,
      incrementType: showI,
      inStock: inStockRef.current.value,
      salesUnit: salesUnitRef.current.value,
    });
    new bootstrap.Modal("#productupdate").show();
  }
  function updateProduct(e) {
    e.preventDefault();
    if (!editStatus) {
      return;
    }
    const data = {
      price: e.target.salesPrice.value,
      increment: e.target.increment.value,
      in_stock: e.target.inStock.value,
      sales_unit: e.target.salesUnit.value,
      show: showI,
    };
    const myPromise = api
      .patch(`/product/${ProductData.id}/`, data)
      .then((res) => {
        const responseData = res.data
        HomeProductData.forEach((item,i)=>{
          if(item.id === responseData.id){
            HomeProductData[i] = responseData
            setHomeProductData([...HomeProductData])
            return
          }
        })
      });
    savedBillToast(myPromise);
  }
  function handleInputSalesChange() {
    const sales = Number(salesRef.current.value);
    const ourRate = ProductData.our_rate;
    if (showI === "%") {
      const increment = (sales / ourRate - 1) * 100;
      incrementRef.current.value = increment.toFixed(2);
    } else {
      const increment = sales - ourRate;
      incrementRef.current.value = increment.toFixed(2);
    }
  }
  function handleInputIncrementChange() {
    const increment = Number(incrementRef.current.value);
    const ourRate = ProductData.our_rate;
    if (showI === "%") {
      const sales = (increment / 100) * ourRate + ourRate;
      salesRef.current.value = sales.toFixed(2);
    } else {
      const sales = increment + ourRate;
      salesRef.current.value = sales.toFixed(2);
    }
  }
  if (!ProductData) {
    return;
  }
  const go = useNavigate();
  return (
    <>
      <section className="product-detail">
        <div className="container">
          <div className="product-detail-box">
            <div>
              <h2 className="text-center">{ProductData.product_name}</h2>
            </div>
            <form onSubmit={updateProduct}>
              <div>
                <ul>
                  <li>
                    <span>Sales:</span>
                    <SpanOrInput
                      editStatus={editStatus}
                      data={ProductData.price}
                      name="salesPrice"
                      type={"number"}
                      forwardRef={salesRef}
                      onChange={handleInputSalesChange}
                    />
                  </li>
                  <li>
                    <span>Discount:</span>
                    <span
                      onClick={() =>
                        setDShow((prev) => {
                          const returndata = prev === "Rs" ? "%" : "Rs";
                          return returndata;
                        })
                      }
                    >
                      {showD === "%"
                        ? `${ProductData.discount_percentage.toFixed(2)} %`
                        : `Rs ${ProductData.discount_rate.toFixed(2)}`}
                    </span>
                  </li>
                  <li>
                    <span>Rate:</span>
                    <span>Rs {ProductData.rate}</span>
                  </li>
                  <li>
                    <span>OurRate:</span>
                    <span>Rs {ProductData.our_rate}</span>
                  </li>
                  <li>
                    <span>Increment:</span>
                    <PercentageOrRate
                      data={
                        showI === "%"
                          ? ProductData.increment_percentage
                          : ProductData.increment_rate
                      }
                      name={"increment"}
                      editStatus={editStatus}
                      show={showI}
                      setShow={setIShow}
                      forwardRef={incrementRef}
                      onChange={handleInputIncrementChange}
                    />
                  </li>
                  <li>
                    <span>inStock:</span>
                    <SpanOrInput
                      editStatus={editStatus}
                      data={ProductData.in_stock}
                      name="inStock"
                      type={"number"}
                      noRs={true}
                      forwardRef={inStockRef}
                    />
                  </li>
                  <li>
                    <span>SalesUnit:</span>
                    <SpanOrSelect
                      data={ProductData.sales_unit}
                      menu={["Pcs", "6Pcs", "dozn", "kg"]}
                      name={"salesUnit"}
                      editStatus={editStatus}
                      forwardRef={salesUnitRef}
                    />
                  </li>
                  <li>
                    <span>Date:</span>
                    <span>{ProductData.latest_bill_date}</span>
                  </li>
                </ul>
              </div>
              <PopUpModal
                title={"Confirm Product"}
                id="productupdate"
                data={popUpData}
                Content={ProductUpdateContent}
                setSumbit={setEditStatus}
              />
            </form>
            <div>
              <div className="d-flex justify-content-center gap-3">
                <button
                  type="sumbit"
                  onClick={confirmUpdate}
                  className={editStatus ? "active-btn" : ""}
                >
                  {editStatus ? "Save" : "Edit"}
                </button>
                <button onClick={() => go("/")}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SpanOrInput({
  data,
  type,
  editStatus,
  name,
  noRs,
  forwardRef,
  onChange,
}) {
  let parseData = data;
  const onChangeFunction = onChange ? onChange : null;
  return (
    <>
      {editStatus ? (
        <input
          ref={forwardRef}
          type={type}
          required
          name={name}
          defaultValue={parseData}
          onChange={onChangeFunction}
          min="0"
          step='0.01'
        />
      ) : (
        <span>
          {noRs === true ? "" : "Rs"} {data}
        </span>
      )}
    </>
  );
}

function PercentageOrRate({
  data,
  editStatus,
  name,
  show,
  setShow,
  forwardRef,
  onChange,
}) {
  data = data.toFixed(2);
  return (
    <>
      {editStatus ? (
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ width: "50%" }}
        >
          <input
            className="percentageorrate d-block"
            type="number"
            required
            name={name}
            defaultValue={data}
            ref={forwardRef}
            onChange={onChange}
            style={{width:"70%"}}
            min="0"
            step={"0.01"}
          />
          <p className="rounded-circle mb-0">{show}</p>
        </div>
      ) : (
        <span
          onClick={() =>
            setShow((prev) => {
              const returndata = prev === "Rs" ? "%" : "Rs";
              return returndata;
            })
          }
        >
          {show === "Rs" ? show : ""} {data} {show === "%" ? show : ""}
        </span>
      )}
    </>
  );
}

function SpanOrSelect({ data, menu, name, editStatus, forwardRef }) {
  return (
    <>
      {editStatus ? (
        <select
          style={{
            width: "50%",
            borderColor: "gray",
            fontSize: "20px",
            fontWeight: "500",
            borderRadius: "3px",
            color: "black",
          }}
          className={"selectdropdown py-1 px-1 text-start"}
          aria-label="Default select example"
          defaultValue={data}
          name={name}
          ref={forwardRef}
        >
          {menu.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      ) : (
        <span>{data}</span>
      )}
    </>
  );
}
