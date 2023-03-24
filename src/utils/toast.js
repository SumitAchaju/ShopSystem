import { toast } from "react-hot-toast"

export const savedBillToast = (myPromise)=>toast.promise(myPromise, {
    loading: 'Loading',
    success: 'successfully updated',
    error: (err) => `${err.toString()}`,
  });
