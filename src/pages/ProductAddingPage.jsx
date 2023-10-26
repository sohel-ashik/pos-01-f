import { useEffect, useState } from "react";
import ContextProductAddingData from '../contexts/ContextProductAddingData'
import { DateInput, IndividualProductAdder, ReviewCart, SavedCart, SupplierAdder } from "../components/ProductAddingComponents";
import { countingAllCart, retrivingLocalAddData } from "../helper/workingWithLocalStorage";


const dummyproductsArr = [
'কাটন শাড়ি (Cotton Sari)',
'স্মার্টফোন (Smartphone)',
'লেডিজ হ্যান্ডব্যাগ (Ladies Handbag)',
'সুন্দর সুনদর বেবি ড্রেস (Beautiful Baby Dress)',
'বাঙালী সাড়ি (Bengali Sari)',
'ফ্যাশনেবল ওয়াচ (Fashionable Watch)',
'ডেস্কটপ কম্পিউটার (Desktop Computer)',
'ফিটনেস ট্রেডমিল (Fitness Treadmill)',
'অ্যাপারেল শপার (Apparel Shaver)',
'বেবি ক্যারিয়ার (Baby Carrier)'
];

const dummysupplierArr = [
'শাহ ট্রেডার্স (Shah Traders)',
'বাঙালী গ্রুপ (Bengali Group)',
'সফল ইন্টারন্যাশনাল (Sofol International)',
'মামুন সাপ্লাইয়ার্স (Mamun Suppliers)',
'বিশ্বাস প্রসারণ (Bishwas Prosharon)',
'জল সরব (Jal Sorob)',
'রাজ এন্ড সন্স (Raj & Sons)',
'আমাদের মালিক সাপ্লাই (Amader Malik Supply)',
'উদ্যান গ্রুপ (Udyan Group)',
'কামিল সাপ্লাই (Kamil Supply)'
];

export default function ProductAdding(){
    
    const [date,setDate] = useState(new Date());
    const [supplier,setSupplier] = useState('');
    const [supplierArr,setSupplierArr] = useState([]);
    const [productArr, setProductArr] = useState([]);

    const [cartDetails, setCartDetails] = useState([]);

    const [totalAddNow, setTotalAddNow] = useState(0);
    const [preDue, setPreDue] = useState(10000);


    useEffect(()=>{
        setSupplierArr(dummysupplierArr);
        setProductArr(dummyproductsArr);
        setCartDetails(retrivingLocalAddData());
        setTotalAddNow(countingAllCart());
    },[])
    

    return(
        <ContextProductAddingData.Provider value = {{
            date,setDate,
            supplier,setSupplier, supplierArr,
            productArr, setProductArr,
            cartDetails,setCartDetails,
            totalAddNow, setTotalAddNow,
            preDue, setPreDue
        }}>


            
            <div className="flex justify-center flex-col items-center">
            <div className="font-bold text-white bg-maindeep-2 text-center px-5 py-5 fixed left-0 right-0 top-0 z-10">সাপ্লায়ার / ক্রয়</div>
                <div className="w-4/5 flex flex-col gap-3 mt-20">
                    
                    {/* inputing the date */}
                    <div className="flex justify-center">
                        <DateInput />
                    </div>

                    <hr className="border border-black"></hr>
                    
                    {/* supplier Adder */}
                    <SupplierAdder />

                    {/* default individual product adder */}
                    <IndividualProductAdder/>

                </div>

                <div className="w-11/12 flex flex-col gap-3 mt-10 h-fit rounded-lg mb-10  px-2 py-5">
                    <div className="flex flex-col gap-2">
                        <div className="text-center font-semibold text-lg py-2">পণ্য সমূহ</div>
                        <hr className="border border-gray-600"></hr>

                        {/* added products details */}
                        <SavedCart/>

                        {/* review carts */}
                        <ReviewCart/>

                    </div>
                </div>
            </div>
        </ContextProductAddingData.Provider>
        
    )
}