import { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

import {useNavigate} from 'react-router-dom';

export function DateInput({date, setDate,type}){
    let formatt = type == 'date' ? 'yyyy-MM-dd' : type == 'month' ? 'yyyy-MM' : 'yyyy'; 

    return(
            <DatePicker
                id="dateInput"
                selected={date}
                onChange={(date)=>setDate(date)}
                dateFormat={formatt}
                showMonthYearPicker={type=='month'}
                showYearPicker={type=='year'}
                maxDate={new Date()} // Restrict to previous dates
                placeholderText={date}
                className="w-full p-2 border rounded-md text-center focus:outline-none focus:border-black"
            />

    )
}

export default function(){
    const totalBuy = 1500;
    const totalSell = 2000;
    const totalSupplierDue = 500;
    const totalCustomerDue = 300;
    const extraCost = 100;
    const totalProfit = totalSell - totalBuy - extraCost;

    const [filterOption, setFilterOption] = useState('date');
    const [date,setDate] = useState(new Date());

    const naviget = useNavigate();

    
    return(
        <div className="w-full h-fit pb-32 flex justify-center bg-maindeep-4">
            <div className="font-bold text-white bg-maindeep-2 text-center px-5 py-5 fixed left-0 right-0 top-0 z-10">রিপোর্ট</div>
        
            <div className="h-40 w-11/12 mt-20">
                <div className="p-6 min-h-screen">
                <div className="bg-white p-6 rounded-lg shadow-lg ">
                        <div className="text-center pb-5 font-semibold text-xl">ফিল্টার করুন</div>

                        <div className="flex justify-center gap-4  items-center">
                            <div className="flex items-center justify-between ">
                                <select
                                    className="select select-bordered w-fit text-md font-semibold"
                                    value={filterOption}
                                    onChange={(e)=>setFilterOption(e.target.value)}
                                >
                                    <option value="date">Day</option>
                                    <option value="month">Month</option>
                                    <option value="year">Year</option>
                                </select>
                            </div>
                            <div className="">
                                <DateInput date={date} setDate={setDate} type={filterOption}/>
                            </div>
                        </div>



                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-4 flex flex-col border-2 border-gray-300 p-3 rounded-lg mt-3">
                            {reportItem("মোট ক্রয়", totalBuy)}
                            {reportItem("মোট সাপ্লায়ারের বাকি", totalSupplierDue)}
                            <button onClick={()=>naviget('/reportdetails')} className="btn btn-active btn-accent text-white py-2 px-4 rounded-lg">ক্রয় বিস্তারিত</button>
                        </div>

                        <div className="space-y-4 flex flex-col border-2 border-gray-300 p-3 rounded-lg">
                            {reportItem("মোট বিক্রি", totalSell)}
                            {reportItem("মোট কাস্টমারের বাকি", totalCustomerDue)}
                            <button className="btn btn-active btn-accent text-white py-2 px-4 rounded-lg">বিক্রয় বিস্তারিত</button>
                        </div>
                    </div>


                    <div className="mt-10 flex flex-col gap-5">
                        {reportItem("অন্যান্য খরচ", extraCost)}
                        {reportItem("মোট লাভ", totalProfit, totalProfit >= 0)}
                    </div>

                </div>
                </div>
            </div>
        </div>
    )
}

const reportItem = (label, value, isPositive = true) => (
    <div className={`bg-white p-4 rounded-lg shadow-lg shadow-gray-400 text-center `}>
      <p className="text-lg font-semibold text-gray-600">{label}</p>
      <p className={`text-2xl ${isPositive ? 'text-green-600' : 'text-red-600'}`}>{value}<mark className="bg-white pl-1 ">৳</mark></p>
    </div>
  );