import { useState } from "react";
import { confirmationToDelete, errorAlert, successfullySubmitted } from "../../helper/alerts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const dummyProductData = [
    { product: 'জাপান চিনিগুড়া চাল', quantity: 3, rate: 50, date: '02/12/2020' },
    { product: 'মফিজ বড় আটা', quantity: 2, rate: 300, date: '05/05/2021' },
    { product: 'কৃষি শাক সাদা সাদা কালা কালা', quantity: 5, rate: 40, date: '11/08/2019' },
    { product: 'দারুচিনি দানা', quantity: 1, rate: 150, date: '07/03/2022' },
    { product: 'দুধের ব্যপার', quantity: 4, rate: 60, date: '09/10/2020' },
    { product: 'পানির আচার', quantity: 10, rate: 1, date: '12/04/2021' },
    { product: 'পিজার পিঠা', quantity: 2, rate: 200, date: '03/09/2022' },
    { product: 'পাকিস্তানি মালাই চা', quantity: 2, rate: 100, date: '06/07/2021' },
    { product: 'স্যান্ডউইচ ব্রেড', quantity: 3, rate: 80, date: '01/01/2020' },
    { product: 'বাসুন্দি চা পাতা', quantity: 2, rate: 30, date: '10/11/2019' },
    { product: 'মাংশের গোশ্ত', quantity: 2, rate: 280, date: '04/06/2022' },
    { product: 'পান পুড়ি মিষ্টি', quantity: 3, rate: 25, date: '08/02/2021' },
    { product: 'বিস্কুটের আদম', quantity: 4, rate: 20, date: '12/09/2020' }
];



export default function(){

    return(
        <div className="mt-20 w-full flex justify-center">
            <div className="w-11/12">
                <div className="text-center font-semibold text-lg md:text-2xl">Nov, 2023</div>
                <div className="text-center font-semibold text-lg md:text-2xl">সাপ্লায়ার হিস্টোরি</div>

                <div className="flex justify-center w-full mt-5 gap-2">
                    <div className={` p-4 rounded-lg shadow-lg shadow-gray-400 text-center w-full`}>
                        <p className="text-lg font-semibold text-gray-600">মোট ক্রয়</p>
                        <p className={`text-2xl text-green-600`}>550<mark className="bg-white pl-1 ">৳</mark></p>
                    </div>

                    <div className={` p-4 rounded-lg shadow-lg shadow-gray-400 text-center w-full`}>
                        <p className="text-lg font-semibold text-gray-600">মোট বাকি</p>
                        <p className={`text-2xl text-green-600`}>550<mark className="bg-white pl-1 ">৳</mark></p>
                    </div>
                </div>

                <div className="flex flex-col items-center mt-10 gap-3 border-t-2 border-b-2 shadow-lg mb-10 py-3">
                    <div className="text-lg font-semibold">সাপ্লাইয়ার এর নাম</div>
                    <div className="flex justify-center text-center text-sm gap-4">
                        <div className="bg-gray-100 shadow-md px-3 py-1 rounded-lg"><div>মোট ক্রয়</div><div className="font-bold">456 ৳</div></div>
                        <div className="bg-gray-100 shadow-md px-3 py-1 rounded-lg"><div>মোট পরিশোধ</div><div className="font-bold">456 ৳</div></div>
                        <div className="bg-gray-100 shadow-md px-3 py-1 rounded-lg"><div>মোট বাকি</div><div className="font-bold">456 ৳</div></div>
                    </div>
                    <hr className="border-2 border-gray-400 w-full"></hr>
                    
                    
                    <div><TableOfInhouseProducts arr={dummyProductData}/></div>
                    
                </div>

            </div>
        </div>
    )
}



function TableRow({item,index}){
    const [product,setProduct] = useState('');
    const [quantity,setQuantity] = useState('');
    const [rate,setRate] = useState('');


    return(
        <>
            <tr className="font-semibold">
                <th>{index+1}</th>
                <td>{item.product}</td>
                <td>{item.quantity}x</td>
                <td>{item.rate}</td>
                <td>{item.quantity * item.rate}</td>
                <td>{item.date}</td>
                

                <div className="dropdown dropdown-left">
                <td><button tabIndex={0} className="py-4 "><FontAwesomeIcon size="lg" icon={faEllipsis}/></button></td>
                    <ul tabIndex={0} className="dropdown-content h-full items-center z-[1] flex gap-4  p-2 shadow-lg bg-base-100 rounded-box font-normal text-center">
                        <li className="">
                            <button
                                onClick={async ()=>{
                                    const agree = await confirmationToDelete(`আপনি কি "${item.product}" ডিলিট করতে চান?`);
                                    agree && successfullySubmitted('সফল', `পণ্যটি ডিলিট হয়েছে`)
                                }} 
                                className="btn bg-red-2 py-3 text-white">ডিলিট</button>
                        </li>
                        <li className="">
                            <button 
                                onClick={()=>document.getElementById(index).showModal()}
                                className="btn bg-maindeep-3 py-3 text-white">ইডিট</button>
                        </li>
                    </ul>
                </div>


                <dialog id={index} className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            
                            {/* modal input design*/}
                            <fieldset className={`border px-4 py-3 rounded-md shadow-md transition-color duration-500 `}>
                                <legend className={`text-md text-gray-800  mb-2 `} >পণ্যটি ইডিট করুন</legend>
                            
                                
                                
                                <input type="text" onChange={(e)=>setProduct(e.target.value)} value={product} placeholder={item.product} className="input input-bordered w-full font-normal" />
                                <div className="flex mt-4 gap-4">
                                    <input type="number" onChange={(e)=>setQuantity(e.target.value)} value={`${quantity}`} placeholder={item.quantity} min='0' max='100' className="input input-bordered w-full  font-normal" />
                                    <input type="number" onChange={(e)=>setRate(e.target.value)} value={rate} placeholder={item.rate} min={0} className="input input-bordered w-full  font-normal" />
                                </div>

                                <button onClick={()=>{
                                        setProduct('');
                                        setQuantity('');
                                        setRate('');
                                    }} 
                                    className="btn btn-active bg-maindeep-3 w-full mt-5 text-white">
                                        সেইভ করুন
                                </button>
                                
                            </fieldset>
                        </form>
                    </div>
                </dialog>
            </tr> 
        </>
    )
}

export function TableOfInhouseProducts({arr = []}){

    return(
        <div className="overflow-x-auto">
            <table className="table table-xs table-zebra">
                {/* head */}
                <thead>
                    <tr >
                        <th></th>
                        <th>পণ্য</th>
                        <th>পরিমান</th>
                        <th>দর</th>
                        <th>মোট</th>
                        <th>তারিখ</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {/* rows*/}
                {arr.map((item,index)=>{
                    
                    if(item) return(
                        <TableRow item={item} index = {index}/>
                    )
                })}
                
                </tbody>
            </table>
        </div>
    )
}