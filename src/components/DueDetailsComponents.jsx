import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass,faEllipsis,faArrowUpShortWide } from "@fortawesome/free-solid-svg-icons";
import { confirmationToDelete, confirmationToSubmit, errorAlert, successfullySubmitted } from "../helper/alerts";
import stringMatching, { stringMatchingObject } from "../helper/stringMatching";


function AddNew({name}){

    const [clicked, setClicked] = useState();
    const [newSupplier,setNewSupplier] = useState('');

    return(
        <div>
            <button onClick={()=>document.getElementById('newProductAdd').showModal()} className="btn btn-active bg-maindeep-3 w-full text-white font-lg">নতুন {name} </button>


            {/* modal design */}
            <dialog id='newProductAdd' className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                         
                        {/* modal input design*/}
                        <fieldset className={`border px-4 py-3 rounded-md shadow-md transition-color duration-500 `}>
                        <legend className={`text-md text-gray-800  mb-2 ${clicked}`} onFocus={()=>setClicked('border-gray-500 font-semibold')} onBlur={()=>setClicked('')}>{name} যোগ করুন</legend>
                    
                        
                           
                        <input type="text" onChange={(e)=>setNewSupplier(e.target.value)} value={newSupplier} placeholder={name} className="input input-bordered w-full font-normal" />
                        

                        <button onClick={()=>{
                                if(newSupplier){
                                    setNewSupplier('');
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

function TableRow({item,index,type}){
    const [name,setName] = useState('');
    const [nowPay,setNowPay] = useState(0);


    return(
        <>
            <tr className="font-semibold">
                <th>{index+1}</th>
                <td>{item.name}</td>
                <td>{item.due}</td>
                

                <div className="dropdown dropdown-left">
                <td><button tabIndex={0} className="py-4 "><FontAwesomeIcon size="lg" icon={faEllipsis} /></button></td>
                    <ul tabIndex={0} className="dropdown-content h-full items-center z-[1] flex gap-4  p-2 shadow-lg bg-base-100 rounded-box font-normal text-center">
                        <li className="">
                            <button
                                onClick={async ()=>{
                                    const agree = await confirmationToDelete(`আপনি কি "${item.name}" ডিলিট করতে চান?`);
                                    agree && successfullySubmitted('সফল', `"${item.name}" ডিলিট হয়েছে`)
                                }} 
                                className="btn bg-red-2 py-3 text-white">ডিলিট</button>
                        </li>
                        <li className="">
                            <button 
                                onClick={()=>document.getElementById(index).showModal()}
                                className="btn bg-maindeep-3 py-3 text-white">আপডেট</button>
                        </li>
                        <li className="">
                            <button 
                                className="btn bg-maindeep-2 py-3 text-white">ডিটেইলস</button>
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
                                <legend className={`text-md text-gray-800  mb-2 `} >{`${type == 'customer'? 'কাস্টমার': 'সাপ্লায়ার'}`} ইডিট করুন</legend>
                            
                                
                                
                                <input type="text" onChange={(e)=>setName(e.target.value)} value={name} placeholder={item.name} className="input input-bordered w-full font-normal" />

                                <div className="flex flex-col mt-4 gap-4">

                                    <fieldset className={`border px-4 py-3 rounded-md shadow-md transition-color duration-500 `}>
                                        <legend className={`text-md text-gray-800  mb-2 `} >পরিশোধ</legend>
                                        <input type="number" onChange={(e)=>setNowPay(e.target.value)} value={nowPay ? nowPay : ''} placeholder='এখন পরিশোধ' min='0' className="input input-bordered w-full  font-normal" />
                                    </fieldset>

                                    <fieldset className={`border px-4 py-3 rounded-md shadow-md transition-color duration-500 `}>
                                        <legend className={`text-md text-gray-800  mb-2 `} >নতুন বাকি</legend>
                                        <input type="number" value={item.due - nowPay} placeholder='নতুন বাকি'  className="input input-bordered w-full  font-normal" disabled={true} />
                                    </fieldset>
                                    
                                    
                                </div>

                                <button onClick={()=>{
                                        const agree = confirmationToSubmit(`আপনি কি সত্যিই তথ্য আপডেট করতে চান?`);
                                        if(agree){
                                            setName('');
                                            setNowPay('');
                                        }
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


function TableOfData({arr = [],type}){


    return(
        <div className="overflow-x-auto">
            <table className="table table-xs table-zebra">
                {/* head */}
                <thead>
                    <tr >
                        <th></th>
                        <th>{`${type == 'customer' ? 'কাস্টমার এর ': 'সাপ্লায়ার এর '}`}নাম</th>
                        <th>মোট বাকি</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {/* rows*/}
                {arr.map((item,index)=>{
                    
                    if(item) return(
                        <TableRow item={item} index = {index} type={type}/>
                    )
                })}
                
                </tbody>
            </table>
        </div>
    )
}

export default function({type,arr = []}){
    const [personSearch, setPersonSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const [selectFilter, setSelectFilter] = useState('');

    useEffect(()=>{
        setFilteredData([...arr])
    },[])

    return(
        <div className="w-full h-10 mt-4">
            
            <AddNew
                name = {`${type == 'supplier' ? 'সাপ্লায়ার':'কাস্টমার'}`}
            />

            <div className="flex justify-center mt-4 gap-2">
                    <input 
                        type="text" 
                        onChange={(e)=>{
                            setPersonSearch(e.target.value);
                            setFilteredData([...stringMatchingObject(e.target.value, arr,'name')]);
                        }} 
                        value={personSearch} 
                        placeholder={`${type == 'supplier' ? 'সাপ্লায়ার সার্চ করুন':'কাস্টমার সার্চ করুন'}`}
                        className="input input-bordered input-error w-9/12 max-w-xs" 
                    />

                    <button className="btn btn-active bg-maindeep-2 w-14 text-white font-lg">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </button>
            </div>
            
            <div className="flex w-full mt-4 justify-center items-center gap-3">
                <FontAwesomeIcon icon={faArrowUpShortWide}/>
                <select
                    onChange={(e)=>{
                        setSelectFilter(e.target.value);
                        if(selectFilter == 'lowTOhigh'){
                            setFilteredData([...filteredData.sort((a,b)=>a.due-b.due)])
                        }else{
                            setFilteredData([...filteredData.sort((a,b)=>b.due-a.due)])
                        }
                    }}
                    value={selectFilter} 
                    className="select select-bordered w-fit px-10 py-1 rounded-xl">
                    <option disabled selected value=''>ফিল্টার করুন </option>
                    <option value='lowTOhigh'>বেশি থেকে কম</option>
                    <option value='highTOlow'>কম থেকে বেশি</option>
                </select>
            </div>


            <div className="mt-8 pb-10">
                <TableOfData arr={filteredData} type={type}/>
            </div>
            
        </div>
    )
}