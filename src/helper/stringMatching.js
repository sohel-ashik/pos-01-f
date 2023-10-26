export default function stringMatching(str = '',arr=[]){
    const temp = arr.map((item)=>{
        if(item.toLowerCase().includes(str)) return item;
    })

    return temp;
}


export function stringMatchingObject(str = '', objArr = [],strName = 'product'){
    const temp  = objArr.map((item)=>{
        if(item[strName].toLowerCase().includes(str)) return item;
    })

    return temp;
}