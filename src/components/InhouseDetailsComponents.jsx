import { useState } from "react";
import { confirmationToDelete, errorAlert, successfullySubmitted } from "../helper/alerts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

export function AddNewProduct(){

    const [clicked, setClicked] = useState();
    const [product,setProduct] = useState('');
    const [quantity,setQuantity] = useState('');
    const [rate,setRate] = useState('');

    return(
        <div>
            <button onClick={()=>document.getElementById('newProductAdd').showModal()} className="btn btn-active bg-maindeep-3 w-full text-white font-lg"> নতুন পণ্য যোগ করুন </button>

            <dialog id='newProductAdd' className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                         
                        {/* modal input design*/}
                        <fieldset className={`border px-4 py-3 rounded-md shadow-md transition-color duration-500 `}>
                        <legend className={`text-md text-gray-800  mb-2 ${clicked}`} onFocus={()=>setClicked('border-gray-500 font-semibold')} onBlur={()=>setClicked('')}>পণ্য যোগ করুন</legend>
                    
                        
                           
                        <input type="text" onChange={(e)=>setProduct(e.target.value)} value={product} placeholder="পণ্যের নাম" className="input input-bordered w-full font-normal" />
                        <div className="flex mt-4 gap-4">
                            <input type="number" onChange={(e)=>setQuantity(e.target.value)} value={`${quantity}`} placeholder="পরিমান" min='0' max='100' className="input input-bordered w-full  font-normal" />
                            <input type="number" onChange={(e)=>setRate(e.target.value)} value={rate} placeholder="দর" min={0} className="input input-bordered w-full  font-normal" />
                        </div>

                        <button onClick={()=>{
                                if(product && quantity && rate){
                                    setProduct('');
                                    setQuantity('');
                                    setRate('');
                                }else {
                                    errorAlert('Error!', 'তথ্য সঠিক ভাবে পূরণ করুন')
                                }
                            }} 
                            className="btn btn-active bg-maindeep-3 w-full mt-5 text-white">
                                যোগ করুন
                        </button>
                        
                    </fieldset>
                    </form>
                    
                </div>
            </dialog>
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
                <td>{item.rate}</td>
                <td>{item.quantity}x</td>
                

                <div className="dropdown dropdown-left">
                <td><button tabIndex={0} className="py-4 "><FontAwesomeIcon size="lg" icon={faEllipsis} /></button></td>
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
                        <th>পণ্যের নাম</th>
                        <th>ক্রয় দর</th>
                        <th>পরিমান</th>
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