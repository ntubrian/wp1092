var imgn=0;
img=["https://i.imgur.com/0hCyt3b.gif","https://i.imgur.com/VbDQN2E.gif","https://i.imgur.com/TZwrPQ6.gif","https://i.imgur.com/1vQDfFi.gif"];
var dis=document.getElementById("display");
var sou=document.getElementById("source");
var pre=document.getElementById("previous");
var nex=document.getElementById("next");
function display(){
    if(imgn==0){
        dis.src=img[0];
        sou.innerHTML=img[0];
        sou.href=img[0];
        pre.className='disabled';
        nex.className='image-viewer__button';
    }else if(imgn==1){
        dis.src=img[1];
        sou.innerHTML=img[1];
        sou.href=img[1];
        pre.className='image-viewer__button';
        nex.className='image-viewer__button';
    }else if(imgn==2){
        dis.src=img[2];
        sou.innerHTML=img[2];
        sou.href=img[2];
        pre.className='image-viewer__button';
        nex.className='image-viewer__button';
    }else if(imgn==3){
        dis.src=img[3];
        sou.innerHTML=img[3];
        sou.href=img[3];
        pre.className='image-viewer__button';
        nex.className='disabled';
    }
}
function next(){
    if(imgn<img.length-1){
        imgn++;
        loading();
        setTimeout(() => {
            display();
        }, 250);
    }
}

function previous(){
    if(imgn>0){
        imgn--;
        loading();
        setTimeout(() => {
            display();
        }, 250);
        
    }
}
function loading(){
    dis.src="./images/loading.gif";

}