import { useState } from "react"
import DueDetailsComponents from "../components/DueDetailsComponents";



const suppliers = [
    { name: "পেট্রো বাংলা ট্রেডার্স", due: 1000 },
    { name: "মিয়া ভাই ট্রেডার্স", due: 750 },
    { name: "সুপারিউন ইন্ডাস্ট্রিজ", due: 500 },
    { name: "বাংলা ইলেকট্রনিক্স", due: 1200 },
    { name: "ক্রিএটিভ ইউনিক্স", due: 900 },
    { name: "ইনোভেটিভ ইন্টারন্যাশনাল", due: 600 },
    { name: "গ্লোবাল ট্রেডার্স", due: 1100 },
    { name: "টেকনো সোলিউশন্স", due: 850 },
    { name: "প্রোগ্রেসিভ টেক", due: 720 },
    { name: "সাইনটিফিক ইনকর্পোরেটেড", due: 950 },
    { name: "কোর ক্রেশন্স", due: 1350 },
    { name: "মাস্টারমাইন্ড সাপ্লায়ার্স", due: 800 },
    { name: "স্মার্ট সিস্টেমস", due: 1250 },
    { name: "আইডিয়াল কর্পোরেট সাপ্লায়ার্স", due: 770 },
    { name: "ক্রিয়েটিভ বিজনেস ট্রেডার্স", due: 1020 }
];
const customers = [
    { name: "মোহাম্মদ আলি", due: 1000 },
    { name: "ফাতেমা বেগম", due: 750 },
    { name: "আহমেদ হোসেন", due: 500 },
    { name: "নূর ইসলাম", due: 1200 },
    { name: "মেহর তাসনিম", due: 900 },
    { name: "রহিম উদ্দিন", due: 600 },
    { name: "আফরোজা খানম", due: 1100 },
    { name: "জাহাঙ্গীর আলম", due: 850 },
    { name: "শাহিদুল ইসলাম", due: 720 },
    { name: "নিশাত তাসনিয়া", due: 950 },
    { name: "ফরিদা আক্তার", due: 1350 },
    { name: "মহিউদ্দিন খান", due: 800 },
    { name: "আবুল হাশেম", due: 1250 },
    { name: "জুলফিকার রহমান", due: 770 },
    { name: "লাবীবা খান", due: 1020 }
];

export default function(){

    const [selectCustomer, setSelectCuotomer] = useState(true);
    const [selectSupplier, setSelectSupplier] = useState(false);

    return(
        <div className="w-full h-fit pb-32 flex justify-center">
            <div className="font-bold text-white bg-maindeep-2 text-center px-5 py-5 fixed left-0 right-0 top-0 z-10">সাপ্লায়ার/কাস্টমার</div>

            <div className="w-11/12 mt-20">
                <div className="flex w-full flex-row">

                <div onClick={()=>{setSelectCuotomer(true); setSelectSupplier(false)}} className={`grid flex-grow h-fit card  rounded-box place-items-center  ${selectCustomer ? 'bg-maindeep-2 text-white' : 'bg-gray-200'}`}>
                        <div className="flex gap-3 h-10 w-full justify-center items-center bg-none">
                            <div>কাস্টমার</div>
                            <input type="radio" name="radio-1" className="radio" checked={selectCustomer}/>
                        </div>
                    </div>

                    <div className="divider divider-horizontal"></div> 

                    <div onClick={()=>{setSelectCuotomer(false); setSelectSupplier(true)}} className={`grid flex-grow h-fit card  rounded-box place-items-center ${selectSupplier ? 'bg-maindeep-2 text-white' : 'bg-gray-200'}`}>
                        <div className="flex gap-3 h-10 w-full justify-center items-center bg-none">
                            <input type="radio" name="radio-1" className="radio" checked={selectSupplier} />
                            <div>সাপ্লায়ার</div>
                        </div>
                    </div> 

                    

                </div>

                {selectSupplier && <DueDetailsComponents type="supplier" arr={suppliers}/>}
                {selectCustomer && <DueDetailsComponents type="customer" arr ={customers}/>}


            </div>




        </div>
    )
}