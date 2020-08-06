let outputDiv=document.getElementById('solved');

let formInputBox=document.getElementById('string');

let submitButton=document.getElementById('button');



let finalDataArray='';

async function callback(e){
    e.preventDefault();

    let boardString=formInputBox.value;

    let result;

    try { 
        result= await axios.get(`/string?board=${boardString}`);
    }
    catch{
        console.log(error);
    }
    
    // console.log(result);
    // console.log(result.data);

    finalDataArray=result.data;    

    
    outputDiv.innerHTML=stringCalculator();

}


function stringCalculator(){
    let strRep='';
for(let i=0;i<finalDataArray.length;i++){
    strRep+=`</br>`
    for(let j=0;j<finalDataArray.length;j++){
        strRep+=`${finalDataArray[i][j]}`+`&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp`;
    }
    strRep+=`</br></br>`
}
return strRep;
}




submitButton.addEventListener('click',callback);


