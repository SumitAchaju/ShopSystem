import React, { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "./Auth";
import { allBill } from "../utils/dummyData";
import useAxios from "../utils/useAxios";

const DataContext = createContext();
export default DataContext;

export function DataProvider({children}){
    let {baseUrl} = useContext(AuthContext)
    const api = useAxios()
    const [product,setProduct] = useState()
    const [importBill,setImportBill] = useState()
    const [salesBill,setSalesBill] = useState()

    useEffect(()=>{
        api.get(`${baseUrl}/product/`).then(res=>setProduct(res.data))
    },[])
    // useEffect(()=>{
    //     api.get(`${baseUrl}/import_bill/`).then(res=>setImportBill(res.data))
    // },[])
    // useEffect(()=>{
    //     api.get(`${baseUrl}/sales_bill/`).then(res=>setSalesBill(res.data))
    // },[])
    const value = {
        allBill,
        product,
        importBill,
        salesBill
    }
    return(
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    )

}