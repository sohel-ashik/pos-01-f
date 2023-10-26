import { useState } from 'react';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
const btnSelectStyle = 'bg-maindeep-2 rounded-md text-white font-semibold';

function Drawer({setPageName,pageName}){

    const navigate = useNavigate();
    

    return(
        <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer" className="drawer-button">
                        <div>
                            <div className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </div>
                        </div>
                    </label>
                </div> 
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"> </label>
                    
                    <ul className="menu p-4 w-fit min-h-full bg-white text-base-content">
                    {/* Sidebar content here */}
                    <div className='mx-4 font-semibold text-lg'>পেইজ ব্রাউজ করুন</div>
                    <hr className='border border-gray-400 mt-5 '></hr>
                        <div className='mt-10 text-lg'>
                            <li  className={`mx-4 ${pageName == 'হোম' ? btnSelectStyle : ''}`}>
                                <label htmlFor="my-drawer" onClick={()=>{ setPageName('হোম')}} aria-label="close sidebar" className="drawer-overlay">
                                    হোম
                                </label>
                            </li>

                            <li  className={`mx-4 ${pageName == 'ক্রয় (সাপ্লায়ার)' ? btnSelectStyle : ''}`}>
                                <label htmlFor="my-drawer" onClick={()=>{navigate('/buy'); setPageName('ক্রয় (সাপ্লায়ার)')}} aria-label="close sidebar" className="drawer-overlay">
                                    ক্রয়
                                </label>
                            </li>
                            <li className={`mx-4 ${pageName == 'বিক্রয় (কাস্টমার)' ? btnSelectStyle : ''}`}>
                                <label htmlFor="my-drawer" onClick={()=>{navigate('/sell'); setPageName('বিক্রয় (কাস্টমার)')}} aria-label="close sidebar" className="drawer-overlay">
                                    বিক্রয়
                                </label>
                            </li>
                            <li className={`mx-4 ${pageName == 'স্টক পণ্য' ? btnSelectStyle : ''}`}>
                                <label htmlFor="my-drawer" onClick={()=>{navigate('/inhouse'); setPageName('স্টক পণ্য')}} aria-label="close sidebar" className="drawer-overlay">
                                    স্টক পণ্য
                                </label>
                            </li>
                            <li className={`mx-4 ${pageName == 'সাপ্লায়ার/কাস্টমার' ? btnSelectStyle : ''}`}>
                                <label htmlFor="my-drawer" onClick={()=>{navigate('/stakeholders'); setPageName('সাপ্লায়ার/কাস্টমার')}} aria-label="close sidebar" className="drawer-overlay">
                                    সাপ্লায়ার/কাস্টমার
                                </label>
                            </li>
                            <li className={`mx-4 ${pageName == 'রিপোর্ট' ? btnSelectStyle : ''}`}>
                                <label htmlFor="my-drawer" onClick={()=>{navigate('/reports'); setPageName('রিপোর্ট')}} aria-label="close sidebar" className="drawer-overlay">
                                    রিপোর্ট
                                </label>
                            </li>
                        </div>
                    
                    </ul>
                </div>
            </div>
    )
}


export default function(){
    const [pageName, setPageName] = useState('হোম');
    return(
        <header className="fixed top-0 left-0 w-full z-20">
            
            <div className="navbar bg-maindeep-2  text-white">
                <div className="flex-none">
                    <Drawer setPageName={setPageName} pageName={pageName}/>
                    
                    
                </div>
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">{pageName}</a>
                </div>
                <div className="flex-none">
                    <button className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                    </button>
                </div>
            </div>
      </header>
    )
}