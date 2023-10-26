const ObjectName = 'tempAddingProduct';

export function savingLocalAddData(name,quantity,rate){
    let temp = localStorage.getItem(ObjectName);
    temp = temp ? JSON.parse(temp)  : [];
    temp.push({
        name,
        quantity,
        rate
    })
     
    localStorage.setItem(ObjectName,JSON.stringify(temp));
}

export function retrivingLocalAddData(){
    let temp = localStorage.getItem(ObjectName);
    temp = temp ? temp : '[]';

    temp = JSON.parse(temp);
    return temp;
}


export function clearAddingData(){
    localStorage.setItem(ObjectName, '')
}


export function deleteSingle(no){
    let temp = localStorage.getItem(ObjectName);
    temp = temp ? JSON.parse(temp)  : [];
    temp.splice(no,1);
     
    localStorage.setItem(ObjectName,JSON.stringify(temp));
}

export function editSingle(no,name,quantity,rate){
    let temp = localStorage.getItem(ObjectName);
    temp = temp ? JSON.parse(temp)  : [];

    const memory = temp[no];

    temp[no] = {
        name : name ? name : memory.name,
        quantity : quantity ? quantity : memory.quantity,
        rate : rate ? rate : memory.rate
    }
     
    localStorage.setItem(ObjectName,JSON.stringify(temp));
}

export function countingAllCart(){
    let temp = localStorage.getItem(ObjectName);
    temp = temp ? JSON.parse(temp)  : [];

    let total = 0;
    temp.forEach((item)=>{
        total+= (item.quantity * item.rate);
    })

    return total;
}