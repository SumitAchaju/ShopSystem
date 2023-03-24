import React, { createContext, useContext, useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import AuthContext from "./Auth";

const DataContext = createContext();
export default DataContext;

export function DataProvider({ children }) {
  const api = useAxios();
  const {loginStatus} = useContext(AuthContext)
  const [HomeProductData, setHomeProductData] = useState([]);
  const [importBill, setImportBill] = useState();
  const [salesBill, setSalesBill] = useState();
  const [getAllData, setGetAllData] = useState(false);

  useEffect(() => {
    async function getData() {
      const productRes = await api.get(`/product/`);
      setHomeProductData(productRes.data);

      const importBillRes = await api.get(`/import_bill/`);
      const parsedDataImport = parseDataImport(importBillRes.data);
      console.log(parsedDataImport);
      setImportBill(parsedDataImport);
      const salesBillRes = await api.get(`/sales_bill/`);
      const parsedDataSales = parseDataSales(salesBillRes.data);
      console.log(parsedDataSales);
      setSalesBill(parsedDataSales);
      setGetAllData(true);
    }
    if(loginStatus){
      getData()
    }
    else{
      setGetAllData(true)
    }
  }, [loginStatus]);
  const value = {
    HomeProductData,
    importBill,
    salesBill,
  };
  return (
    <DataContext.Provider value={value}>
      {getAllData ? children : null}
    </DataContext.Provider>
  );
}

function parseDataImport(data) {
  let obtainedData = data;
  let parsedData = [];
  while (obtainedData.length !== 0) {
    let x = obtainedData.filter(
      (item, _, arr) => item.import_date === arr[0].import_date
    );
    x.forEach((item) => {
      let i = obtainedData.indexOf(item);
      obtainedData.splice(i, 1);
    });
    let singleParsedData = {
      date: x[0].import_date,
      bill: x,
    };
    parsedData.push(singleParsedData);
  }
  return parsedData;
}
function parseDataSales(data) {
  let obtainedData = data;
  let parsedData = [];
  while (obtainedData.length !== 0) {
    let x = obtainedData.filter(
      (item, _, arr) => item.sales_date === arr[0].sales_date
    );
    x.forEach((item) => {
      let i = obtainedData.indexOf(item);
      obtainedData.splice(i, 1);
    });
    let singleParsedData = {
      date: x[0].sales_date,
      bill: x,
    };
    parsedData.push(singleParsedData);
  }
  return parsedData;
}
