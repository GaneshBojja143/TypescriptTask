import { User } from "./user";

class dataFetch{
    getInfo(url:string){
        return fetch(url).then(function(response){return response.json();})
    }
}
class loadingDataIntoPage{
    dataFetch=new dataFetch();
    initialize(){
        this.dataFetch.getInfo("userdetails.json").then(function(data){dataEntry(data);})
    }
}

var loadData=new loadingDataIntoPage();
loadData.initialize();

var userDetails:any=new Array<User>();
var checkBoxes=document.getElementsByClassName("check-boxes");
var checkBoxHeader:any=document.getElementById("checkbox-header");

function dataEntry(details:any){
    var individualInfo=details.map((u:any) =>new User(u));
    UsersInfo(individualInfo);
}

function UsersInfo(individualInfo:any){
    for(let i=0;i<individualInfo.length;i++){
        var singleUser=new User(individualInfo[i]);
        userDetails[i]=singleUser;
        addRow(singleUser);
    }
}

function addRow(userDetails:any):void{
    var table:any=document.getElementById("person-details");

    var checkbox=document.createElement("div");
    checkbox.innerHTML=`<div class='child check-box'><span><input type='checkbox' name='' class='check-boxes' id='${userDetails.id}' onclick='onSelectOrDeselectUser()'></span></div>`;
    table.appendChild(checkbox);

    addIndividualRow(table,"child name user","field",userDetails.name);
    addIndividualRow(table,"child score user","field",userDetails.score);
    addIndividualRow(table,"child email user","field",userDetails.email);
    addIndividualRow(table,"child empty user","field","");
}

function addIndividualRow(parent:any,className:string,id:string,userData:string){
    var dataField=document.createElement("div");
    dataField.innerHTML=`<div class='${className}' id='${id}'>${userData}</div>`;
    parent.appendChild(dataField);
}

function checkHeaderStatus():void{
    selectOrDeselectAll(checkBoxHeader.checked);
}


function selectOrDeselectAll(status:boolean):void{
    userDetails.map((currentUser:any)=>{return (document.getElementById(currentUser.id)as any).checked=status;})
}

function onSelectOrDeselectUser():void{
    checkBoxHeader.checked=(totalUsersSelected().length==userDetails.length) ? true : false;
}

function totalUsersSelected(){
    return userDetails.filter((value:any)=>(document.getElementById(value.id)as any).checked==true);
}

function checkMatchedCharacters(){
    var x:any=document.getElementById("search");
    var inputText=x.value as string;

    inputText=inputText.replace(/\./g,'\\.');
    var regs=new RegExp(`${inputText}`,"gi");

    var userInfo:any=document.getElementsByClassName("user");

    for(var i=0;i<userInfo.length;i++){
        userInfo[i].innerHTML=inputText!="" ? userInfo[i].textContent.replaceAll(regs,(match: any)=>`<mark>${match}</mark>`) : userInfo[i].textContent.replaceAll(regs,(match: any)=>match);
    }
}

function calculateMaxAndAverage(){
    var activeUsers=totalUsersSelected();

    sumScores(activeUsers);
    maxScore(activeUsers);
}

function sumScores(activeUsers:any){
    var sum=activeUsers.reduce((totalSum:any,currentUser:any)=>{return +currentUser.score+ +totalSum},0);
    var average=sum/activeUsers.length;

    (document.getElementById("average")as any).innerText="Average:"+average;
}

function maxScore(activeUsers:any){
    var activeUserScores=activeUsers.map((currentUser:any)=>{return currentUser.score});
    var maxScore=Math.max(...activeUserScores);

    (document.getElementById("max")as any).innerText="Max:"+maxScore;
}











