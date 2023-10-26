import { useContext, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

import ContextProductAdddingData from "../contexts/ContextProductAddingData";
import stringMatching from "../helper/stringMatching";
import { clearAddingData, countingAllCart, deleteSingle, editSingle, retrivingLocalAddData, savingLocalAddData } from "../helper/workingWithLocalStorage";
import { confirmationToDelete, confirmationToSubmit, errorAlert, successfullySubmitted } from "../helper/alerts";
import { dateTostring } from "../helper/dateFormatter";


//date picker components
export function DateInput(){
    const {date,setDate} = useContext(ContextProductAdddingData);

    return(
        <div className="flex justify-center font-semibold items-center gap-3 w-3/5 px-2">
            <div>
                <FontAwesomeIcon icon={faCalendar} size='xl' className=""/>
            </div>
            <DatePicker
                id="dateInput"
                selected={date}
                onChange={(date)=>setDate(date)}
                dateFormat="yyyy-MM-dd"
                maxDate={new Date()} // Restrict to previous dates
                placeholderText={date}
                className="w-full p-2 border rounded-md text-center focus:outline-none focus:border-black"
            />
        </div>

    )
}


export function SupplierAdder(){
    const [open,setOpen] = useState(true);
    const [clicked, setClicked] = useState('');

    const {supplier,setSupplier, supplierArr} = useContext(ContextProductAdddingData);
    const [filteredData, setFilteredData] = useState([...supplierArr]);
    
    return(
        <div className="dropdown w-full">

            <div onClick={()=>setOpen(true)} >
                <fieldset className={`border px-4 pb-1 rounded-md shadow-md transition-color  ${clicked}`}>
                    <legend className="text-md text-gray-800  mb-2">সাপ্লায়ার</legend>
                    <input 
                        onChange={(e)=>
                            {setSupplier(e.target.value); 
                             setFilteredData([...stringMatching(e.target.value,supplierArr)])}} 
                        value={supplier} 
                        placeholder="অজানা"
                        className="input w-full  focus:outline-none" 
                        onFocus={()=>setClicked('border-gray-500 font-semibold')} 
                        onBlur={()=>setClicked('')}
                    />

                </fieldset>
            </div>

            <ul tabIndex={0} className={`dropdown-content z-[1] menu p-3 shadow text-white rounded-box w-full bg-maindeep-3 text-lg ${open ? 'block' : 'hidden'}`}>
                {filteredData.map((item)=>{
                    return(
                        item && <li onClick={()=>{setSupplier(item);setOpen(false)}}>
                            <a>
                                {item}
                            </a>
                        </li>
                    )
                })}
            </ul>

        </div>
    )
}


export function IndividualProductAdder({btnName = "পণ্যটি যোগ করুন", editBtn, index, pre={}}){

    const [clicked, setClicked] = useState('');
    const [open,setOpen] = useState(true);

    const {preName,preQuantity,preRate} = pre; //previous record

    const [productName, setProductName] = useState('');
    const [quantity,setQuantity] = useState('');
    const [rate,setRate] = useState('');


    const {productArr, setProductArr, cartDetails, setCartDetails, totalAddNow, setTotalAddNow} = useContext(ContextProductAdddingData);
    const [filteredData, setFilteredData] = useState([...productArr]);

    return (
        <fieldset className={`border px-4 py-3 rounded-md shadow-md transition-color duration-500 `}>
            <legend className={`text-md text-gray-800  mb-2 ${clicked}`} onFocus={()=>setClicked('border-gray-500 font-semibold')} onBlur={()=>setClicked('')}>পণ্য যোগ করুন</legend>
            
            
            <div className="dropdown w-full">
                <div onClick={()=>setOpen(true)} >
                    <input 
                        type="text" 
                        value={productName} 
                        onChange={(e)=>{
                            setProductName(e.target.value);
                            setFilteredData([...stringMatching(e.target.value,productArr)])}} 
                        placeholder={preName ? preName : "পণ্যের নাম" }
                        className="input input-bordered w-full font-normal" 
                    />
                </div>

                <ul tabIndex={0} className={`dropdown-content z-[1] menu p-3 shadow text-white rounded-box w-full bg-maindeep-3 text-lg ${open ? 'block' : 'hidden'}`}>
                    {filteredData.map((item)=>{
                        return(
                            item && <li onClick={()=>{setProductName(item);setOpen(false)}}>
                                <a>
                                    {item}
                                </a>
                            </li>
                        )
                    })}
                </ul>

            </div>
            
            <div className="flex mt-4 gap-4">
                <input type="number" value={quantity} onChange={e=>setQuantity(e.target.value)} placeholder={preQuantity ? preQuantity : "পরিমান"} min='0' max='100' className="input input-bordered w-full  font-normal" />
                <input type="number" value={rate} onChange={e=>setRate(e.target.value)} placeholder={preRate ? preRate : "দর" } min={0} className="input input-bordered w-full  font-normal" />
            </div>

            <button onClick={()=>{
                    if(!editBtn){
                        if(productName && quantity && rate){
                            setProductName('');
                            setQuantity('');
                            setRate('');
    
                            savingLocalAddData(productName, quantity, rate);
                            setCartDetails(retrivingLocalAddData());
                            setTotalAddNow(countingAllCart());
    
                        }else {
                            errorAlert('Error!', 'তথ্য সঠিক ভাবে পূরণ করুন')
                        }
                    }else {
                        editSingle(index,productName,quantity,rate);
                        setCartDetails(retrivingLocalAddData());
                        setTotalAddNow(countingAllCart()); 
                    }
                }} 
                className="btn btn-active bg-maindeep-3 w-full mt-5 text-white">
                    {btnName}
            </button>
            
        </fieldset>
    );
}


//cart confirmation section
function SingleCard({name,quantity,rate,index}){

    const {productArr, setCartDetails,totalAddNow,setTotalAddNow} = useContext(ContextProductAdddingData);

    return(
        <div className="w-full flex flex-col px-1 border border-maindeep-4 py-5 rounded-lg shadow-lg items-center text-center text-md gap-2 text-maindeep-1">
            <div className="text-center font-semibold">
                {name}
                <div className="badge  bg-green-1 text-white text-xs w-fit">New</div>
            </div>

            <div>
                পরিমান = 
                <div className="badge text-lg ml-2 font-semibold w-fit">{quantity}x</div>
            </div>
            <div>
                দর = 
                <div className="badge text-lg py-3 ml-2 font-semibold w-fit">{rate} টাকা</div> 
            </div>
            <div>
                মোট =
                <div className="badge text-lg py-3 ml-2 font-semibold w-fit">{quantity * rate} টাকা</div> 
            </div>
            
            <div className="flex justify-center gap-3 mt-5">
                <button 
                    onClick={()=>document.getElementById(index).showModal()}
                    className="bg-maindeep-3 text-white rounded-md px-6 py-1 hover:scale-105 transition-transform duration-200">Edit
                </button>
                <button 
                    onClick={async()=>{
                        const agree = await confirmationToDelete('কার্ট থেকে পণ্যটি ডিলিট করতে চান?');
                        if(agree) {
                            deleteSingle(index);
                            setCartDetails(retrivingLocalAddData());
                            setTotalAddNow(countingAllCart());
                        }
                    }} 
                    className="bg-red-2 text-white rounded-md px-6 hover:scale-105 transition-transform duration-200">Delete
                </button>
            </div>

            {/* modal opening */}

            
            <dialog id={index} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        <h3 className="font-bold text-lg">Edit</h3>
                         
                        {/* pre builded design */}
                        <IndividualProductAdder btnName="পণ্য ইডিড করুন" editBtn={true} index={index} pre={{preName:name,preQuantity:quantity,preRate:rate}}/>
                    </form>
                    
                </div>
            </dialog>

        </div>
    )
}

export function SavedCart(){

    const {cartDetails} = useContext(ContextProductAdddingData);

    return(
        <div>
            <div className="flex flex-col gap-3">
                {cartDetails.map((item,index)=>
                    <SingleCard 
                        name={item.name}
                        quantity={item.quantity} 
                        rate ={item.rate} 
                        index = {index}
                    />)}
            </div>
        </div>
    )
}


export function ReviewCart(){

    const {date, supplier,totalAddNow, setTotalAddNow, preDue, setCartDetails,setPreDue} = useContext(ContextProductAdddingData);
    const [paid,setPaid] = useState(0);
    const [clicked,setClicked] = useState('');

    return(
        <div className="flex flex-col mt-10 ">
                <div className="text-center font-semibold text-lg py-2">মোট হিসাব</div>
                <div className="flex justify-center text-md font-semibold">{dateTostring(date)} </div>
                <div className="text-center text-lg text-gray-700 w-full">
                    {supplier ? supplier : "অজানা"}
                    <div className="badge  bg-green-700 text-white text-xs w-fit">New</div>
                </div>
                <hr className="border border-gray-500 my-4"></hr>
                
                <div className="w-full flex justify-center">
                    <div className="w-4/5 py-5 text-lg">
                        <div className="flex justify-between">
                            <div>বর্তমান মোট =</div>
                            <div className="font-semibold">{totalAddNow} টাকা</div>
                        </div>
                        <div className="flex justify-between">
                            <div>পূর্বের জের =</div>
                            <div className="font-semibold">{preDue} টাকা</div>
                        </div>

                        <hr className="border border-gray-500 my-2"></hr>

                        <div className="flex justify-between">
                            <div>সর্বোমোট বাকি =</div>
                            <div className="font-semibold">{preDue + totalAddNow} টাকা</div>
                        </div>

                        <div className=" py-10 flex flex-col gap-8 item-center">
                            <fieldset className={`border px-4 pb-1 rounded-md shadow-md transition-color  ${clicked}`}>
                                <legend className="text-md text-gray-800  mb-2">পরিশোধ</legend>
                                <input 
                                    onChange={(e)=>{
                                        setPaid(e.target.value);
                                    }} 
                                    value={paid} 
                                    placeholder="Pay"
                                    type='number'
                                    className="input w-full focus:outline-none " 
                                    onFocus={()=>setClicked('border-gray-500 font-semibold')} 
                                    onBlur={()=>setClicked('')}
                                />
                            </fieldset>

                            <fieldset className={`border px-4 pb-1 rounded-md shadow-md transition-color  ${clicked}`}>
                                <legend className="text-md text-gray-800  mb-2">নতুন বাকি</legend>
                                <input 
                                    value={totalAddNow + preDue - paid} 
                                    placeholder="new"
                                    disabled = {true}
                                    className="input w-full focus:outline-none " 
                                    onFocus={()=>setClicked('border-gray-500 font-semibold')} 
                                    onBlur={()=>setClicked('')}
                                />
                            </fieldset>
                            
                        </div>

                        {/* submit all */}
                        <button
                            onClick={async()=>{
                                const agree = await confirmationToSubmit('আপনি কি সাবমিট করতে চান?')
                                if(agree){
                                    clearAddingData();
                                    setCartDetails([])
                                    setTotalAddNow(0);
                                    setPreDue(0);
                                    successfullySubmitted('সফল', 'আপনার তথ্য সংরক্ষিত হয়েছে !');
                                    setPaid(0);
                                }
                            }}
                            className="btn btn-active bg-maindeep-3 w-full text-white font-lg">
                                সাবমিট করুন
                        </button>
                        
                    </div>

                </div>
            </div>
    )
}