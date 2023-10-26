import { AddNewProduct, TableOfInhouseProducts } from "../components/InhouseDetailsComponents";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import stringMatching, { stringMatchingObject } from "../helper/stringMatching";

const dummyProductData = [
{ product: 'জাপান চিনিগুড়া চাল', quantity: 3, rate: 50 },
{ product: 'মফিজ বড় আটা', quantity: 2, rate: 300 },
{ product: 'কৃষি শাক সাদা সাদা কালা কালা', quantity: 5, rate: 40 },
{ product: 'দারুচিনি দানা', quantity: 1, rate: 150 },
{ product: 'দুধের ব্যপার', quantity: 4, rate: 60 },
{ product: 'পানির আচার', quantity: 10, rate: 1 },
{ product: 'পিজার পিঠা', quantity: 2, rate: 200 },
{ product: 'পাকিস্তানি মালাই চা', quantity: 2, rate: 100 },
{ product: 'স্যান্ডউইচ ব্রেড', quantity: 3, rate: 80 },
{ product: 'বাসুন্দি চা পাতা', quantity: 2, rate: 30 },
{ product: 'মাংশের গোশ্ত', quantity: 2, rate: 280 },
{ product: 'পান পুড়ি মিষ্টি', quantity: 3, rate: 25 },
{ product: 'বিস্কুটের আদম', quantity: 4, rate: 20 }
]




export default function(){

    const [productSearch, setProductSearch] = useState('');
    const [productsDetail, setProductsDetail] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(()=>{
        setProductsDetail([...dummyProductData]);
        setFilteredData([...dummyProductData]);
    },[])

    return(
        <div className="w-full h-fit pb-32 flex justify-center">
            <div className="font-bold text-white bg-maindeep-2 text-center px-5 py-5 fixed left-0 right-0 top-0 z-10">স্টক পণ্য সমূহ</div>

            <div className="h-40 w-11/12 mt-20">
                <AddNewProduct/>

                <div className="flex justify-center mt-4 gap-2">
                    <input 
                        type="text" 
                        onChange={(e)=>{
                            setProductSearch(e.target.value);
                            setFilteredData([...stringMatchingObject(e.target.value,productsDetail)]);
                        }} 
                        value={productSearch} 
                        placeholder="পণ্য সার্চ করুন" 
                        className="input input-bordered input-error w-9/12 max-w-xs" 
                    />

                    <button className="btn btn-active bg-maindeep-2 w-14 text-white font-lg">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </button>
                </div>

                <div className="mt-10 pb-10 flex flex-col items-center">
                    <TableOfInhouseProducts arr={filteredData}/>
                    <hr className="border border-maindeep-2 mt-3 w-10/12"></hr>
                </div>

            </div>
        </div>
    )
}