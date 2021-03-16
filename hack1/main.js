// TODO:
var cnlBtn = document.getElementById("cancel-button");
var cmtBtn = document.getElementById("comment-button");


 
function changeTheColorOfButtonComment() {
    
    if (document.getElementById("comment-input").value !== "") {
       document.getElementById("comment-button").style.backgroundColor = "#065fd4";
       cmtBtn.disabled = false;
    } else {
       document.getElementById("comment-button").style.backgroundColor = "#cccccc";
       
    }
 }

 const copyBolck = document.querySelector("#comment-group");
 function func7(){
    document.getElementById("comment-input").value = "";
    document.getElementById("comment-button").style.backgroundColor = "#cccccc";
    let newBlock = copyBolck.innerHTML;
    // 
    copyBolck.innerHTML += newBlock;
    document.querySelector("comment-text").innerHTML = 'boob';
 }

 function func8(){
    cnlBtn.style.visibility = 'visible';
    cmtBtn.style.visibility = 'visible';
 }

 function func9(){
    document.getElementById("comment-input").value = "";
    cnlBtn.style.visibility = 'hidden';
    cmtBtn.style.visibility = 'hidden';
 }
