const imageContainer =document.getElementById('image-container')
const loader =document.getElementById('loader')
let imageArray=[];
let ready =false;
let imagesLoded=0;
let totalImages=0;
// unsplash api
let count=6;
const unsplashApiUrl=`https://api.unsplash.com/photos/random/?client_id=nJPRXy-_xElzeA9BFJLtFggU5fiyA6jOSToZFon_Gw4&count=${count}`;
//creat elements for links & images 
function imageloaded(){
 
    imagesLoded++;
    // console.log('imagenumber', imagesLoded);
    if(imagesLoded===totalImages){
        ready=true;
        loader.hidden=1;
        // console.log('ready=',ready)
    }
}
function setAttributes(element ,attributes){
    for(const key in attributes ){
        element.setAttribute(key,attributes[key]);
    }
}
function  displayImage(){
imagesLoded=0;
totalImages=imageArray.length;

// console.log('total length',totalImages)

  //do this to all the image in the array
imageArray.forEach((photo) => {
      //creat <a> and its atributes     
      
        const item= document.createElement('a');
        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target','_blank');
        setAttributes(item ,{
            href: photo.links.html,
            target : '_blank'
        });
        //creat <img> to shown
        const img=document.createElement('img')
        // img.setAttribute('src',photo.urls.regular);
        // img.setAttribute('title',photo.alt_description);
        // img.setAttribute('alt',photo.alt_dsscription);
        setAttributes(img,{
            src:photo.urls.regular,
            title:photo.alt_description,
            alt:photo.alt_description
        });
        img.addEventListener('load',imageloaded);
        //put <img> int<a> then put <a>into imageContainer 
        item.appendChild(img);
        imageContainer.appendChild(item);
       
    
    });


}
 
async function getImages(){
    try{const response = await fetch(unsplashApiUrl);
     imageArray=await response.json();

    displayImage();
        }
     
     catch (error){

     }}


 window.addEventListener('scroll',()=>{
if (window.scrollY+window.innerHeight>=document.body.offsetHeight-1000&& ready) {
  getImages();
  ready=false;


}
})

//on load
getImages();
     