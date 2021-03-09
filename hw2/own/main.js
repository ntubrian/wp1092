var imgArr = ['https://static.rti.org.tw/assets/thumbnails/2019/10/04/09729130cc63b924ed64136bd3aaf067.jpg', 
            'https://storage.googleapis.com/www-cw-com-tw/article/202002/article-5e4ce28d030c5.jpg',
            'https://i2.kknews.cc/SIG=3ndrmqs/5qq000n1sn54575qo69.jpg'];

document.querySelector('#display').style.background = "url('./images/loading.gif') norepeat";
var currentDisplayPicIndex = 1;
setTimeout((() => document.getElementById('display').src = imgArr[currentDisplayPicIndex]), 1000);
document.querySelector('.image-viewer__display-source-wrapper a').innerHTML = 'Source: ' + imgArr[currentDisplayPicIndex];
var currentDisplayPic = document.getElementById('display');
var currentDisplaySrc = document.querySelector('.image-viewer__display-source-wrapper a');

function changeSrc(){
    currentDisplaySrc.innerHTML = 'Source: ' + imgArr[currentDisplayPicIndex];
}

function backMove(){
    
    if(currentDisplayPicIndex > 0){
        currentDisplayPicIndex -= 1;
        currentDisplayPic.src = imgArr[currentDisplayPicIndex];
        changeSrc(); 
    }
}

function nextMove(){
    
    if(currentDisplayPicIndex < imgArr.length - 1){
        currentDisplayPicIndex += 1;
        currentDisplayPic.src = imgArr[currentDisplayPicIndex];
        changeSrc();    
    }
}

function changeCursor(event){
    if(currentDisplayPicIndex === 0 || currentDisplayPicIndex === imgArr.length - 1){
        event.target.className = 'disabled';
    }
    
}

function reverseCursorOfBack(){
    if(currentDisplayPicIndex !== 0 && currentDisplayPicIndex !== imgArr.length - 1){
        backBtn.className = 'image-viewer__button';
        nextBtn.className = 'image-viewer__button';
    }
}
backBtn = document.getElementById('previous');
backBtn.onclick = backMove;
nextBtn = document.getElementById('next');
nextBtn.onclick = nextMove;

backBtn.addEventListener('click', changeCursor);
nextBtn.addEventListener('click', changeCursor);
backBtn.addEventListener('click', reverseCursorOfBack);
nextBtn.addEventListener('click', reverseCursorOfBack);

//https://splidejs.com/getting-started/ 下一次 做照片slideshow