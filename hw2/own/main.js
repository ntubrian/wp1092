
var flower = ['http://image.huahuibk.com/uploads/20190222/20/1550839208-RTYldNOQks.jpeg',
'https://i.keaitupian.net/up/f6/25/67/60d1381b984161c76d59c7412b6725f6.jpg',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbC80mxMj1xpdqlMl94orpUd-izowGch-xOA&usqp=CAU',
'https://i.keaitupian.net/up/f6/25/67/60d1381b984161c76d59c7412b6725f6.jpg',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR9cVQQ2RdtQhohip0Kzpk500pI3_MSaAlKA&usqp=CAU',
'https://wallpaperaccess.com/full/1178350.jpg',
'https://www.wallpaperbetter.com/wallpaper/29/1012/999/beautiful-orchid-flower-high-definition-for-desktop-1080P-wallpaper.jpg',
'https://newevolutiondesigns.com/images/freebies/flowers-wallpaper-3.jpg'];

var man = ['https://s.newtalk.tw/album/news/169/5bf25a3176f47.jpg',
'https://images.chinatimes.com/newsphoto/2020-04-30/656/20200430001506.jpg',
'https://cdn2.ettoday.net/images/5459/5459018.jpg',
'https://attach.setn.com/newsimages/2019/11/26/2266688-XXL.jpg',
'https://img.ttshow.tw/images/media/uploads/2020/07/23/746.jpg',
'https://i.ytimg.com/vi/5AWD__bzPfw/maxresdefault.jpg',
'https://img.news.ebc.net.tw/EbcNews/news/2021/02/26/1614341131_92130.jpg',
'https://img.ttshow.tw/images/author/Morry/%E7%B5%B1%E7%A5%9E.jpg'];

var nature = ['https://vastphotos.com/files/uploads/photos/10780/photo-of-mountains-and-stars-l.jpg',
'https://vastphotos.com/files/uploads/photos/10779/houses-in-italy-l.jpg',
    'https://vastphotos.com/files/uploads/photos/10784/road-in-forest-l.jpg',
    'https://vastphotos.com/files/uploads/photos/10790/lake-covered-in-snow-l.jpg', 
            'https://vastphotos.com/files/uploads/photos/10791/abstract-church-photo-l.jpg',
            'https://vastphotos.com/files/uploads/photos/10788/high-resolution-winter-photo-l.jpg',
        'https://vastphotos.com/files/uploads/photos/10785/limited-edition-nature-photograph-l.jpg',
    'https://vastphotos.com/files/uploads/photos/10781/winding-pathway-in-forest-l.jpg'];
var imgArr = nature;
var currentDisplayPicIndex = 1;
/*document.querySelector('#display').style.background = "url('./images/loading.gif') norepeat";
setTimeout((() => document.querySelector('#display').style.background = "none"), 1000);

setTimeout((() => document.getElementById('display').src = imgArr[currentDisplayPicIndex]), 1000);*/
document.querySelector('.image-viewer__display-source-wrapper a').innerHTML = imgArr[currentDisplayPicIndex];
var currentDisplayPic = document.getElementById('display');
var viewerDisplay = document.getElementById('hi');
var molecular = document.getElementById('molecular');


var downloadingImage = new Image();
downloadingImage.onload = function(){
    viewerDisplay.classList.remove('image-viewer__display');
    setTimeout((()=>{
        
        currentDisplayPic.src = this.src;
        
        
    }), 200);
    void viewerDisplay.offsetWidth;
    viewerDisplay.classList.add('image-viewer__display');
    
};
downloadingImage.src = imgArr[currentDisplayPicIndex];
var currentDisplaySrc = document.querySelector('.image-viewer__display-source-wrapper a');
currentDisplaySrc.href = imgArr[currentDisplayPicIndex];
function changeSrc(){
    currentDisplaySrc.innerHTML = imgArr[currentDisplayPicIndex];
    currentDisplaySrc.href = imgArr[currentDisplayPicIndex];
}

async function backMove(){
    
    if(currentDisplayPicIndex > 0){
        currentDisplayPicIndex -= 1;
        currentDisplayPic.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
        downloadingImage.src = imgArr[currentDisplayPicIndex];
        // molecular.innerHTML = currentDisplayPicIndex - 1;
        document.getElementById('num').innerText = currentDisplayPicIndex;
        changeSrc();
        document.getElementById('slider').value = currentDisplayPicIndex * 10;
        
    }
}

async function nextMove(){
    
    if(currentDisplayPicIndex < imgArr.length - 1){
        currentDisplayPicIndex += 1;
        currentDisplayPic.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
        downloadingImage.src = imgArr[currentDisplayPicIndex];
        // molecular.innerText = currentDisplayPicIndex - 1;
        document.getElementById('num').innerText = currentDisplayPicIndex;
        changeSrc();
        document.getElementById('slider').value = currentDisplayPicIndex * 10;    
    }
}

async function changeCursor2(){
    if(currentDisplayPicIndex === 0 )
        backBtn.className = 'disabled';
    else if(currentDisplayPicIndex === imgArr.length - 1)
        nextBtn.className = 'disabled';
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

function flashPlayButton(ms, kcode) {
    if(kcode == '37') 
        var playButton = document.getElementById("previous");
    else if(kcode == '39') 
        var playButton = document.getElementById("next");
    
    playButton.classList.add("active");
    setTimeout(function() { 
      playButton.classList.remove("active");
    }, ms);
}
backBtn = document.getElementById('previous');
backBtn.onclick = backMove;
nextBtn = document.getElementById('next');
nextBtn.onclick = nextMove;

backBtn.addEventListener('click', changeCursor);
nextBtn.addEventListener('click', changeCursor);
backBtn.addEventListener('click', reverseCursorOfBack);
nextBtn.addEventListener('click', reverseCursorOfBack);





var checkKey = (e) => {

    e = e || window.event;

    
    if (e.keyCode == '37') {
        e.preventDefault();
        backMove();
        changeCursor2();
        reverseCursorOfBack();
        flashPlayButton(300, '37');
        document.getElementById('slider').value = currentDisplayPicIndex * 10;
    }
    else if (e.keyCode == '39') {
        e.preventDefault();
        
        nextMove();
        changeCursor2();
        reverseCursorOfBack();
        flashPlayButton(300, '39');
        document.getElementById('slider').value = currentDisplayPicIndex * 10;
    }
    
}
document.onkeydown = checkKey;

// function sliderKeyHandler() {
//     // Replace this with your slider id
    
// }
// document.body.addEventListener('keydown', sliderKeyHandler);

function changePicBySlider(){
    
    
    currentDisplayPicIndex = mySlider.value / 10;
    
    downloadingImage.src = imgArr[currentDisplayPicIndex];
    
}
var mySlider = document.getElementById('slider'); 
mySlider.addEventListener("change", changePicBySlider);

//https://splidejs.com/getting-started/ 下一次 做照片slideshow
//https://stackoverflow.com/questions/52785171/have-a-hover-effect-on-key-down/52785371
function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
    }
  }
  
  function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);     
      }
    }
    element.className = arr1.join(" ");
  }
  
  
  // Add active class to the current button (highlight it)
  var btnContainer = document.getElementById("myBtnContainer");
  var btns = btnContainer.getElementsByClassName("btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function(){
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }

  var switchCategory = (e)=>{
    currentDisplayPicIndex = 1;
    document.getElementById('num').value = currentDisplayPicIndex;  
    if(e.target.textContent == 'Nature'){
        imgArr = nature;
    }
    else if(e.target.textContent == 'Flower'){
        imgArr = flower;
    }
    else if(e.target.textContent == 'Secret'){
        imgArr = man;
    }
    downloadingImage.src = imgArr[currentDisplayPicIndex];
    document.getElementById('slider').value = currentDisplayPicIndex * 10;
    reverseCursorOfBack();
    // 
  }

  var btn = document.getElementsByClassName('btn');
  for(let i = 0; i < btn.length; i++){
    btn[i].addEventListener('click', switchCategory);
  }
  
