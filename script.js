const ACCESS_KEY = "Eye7";

/* LOGIN */

function checkKey(){

const entered = document.getElementById("accessKey").value;

if(entered === ACCESS_KEY){

document.getElementById("loginPage").style.display="none";
document.getElementById("appPage").style.display="block";

loadPhotos();

}else{

alert("Wrong Access Key");

}

}


/* UPLOAD */

async function uploadImage(){

const input=document.getElementById("fileInput");
const file=input.files[0];

if(!file){

alert("Select a file first");
return;

}

const formData=new FormData();
formData.append("photo",file);

await fetch("/upload",{
method:"POST",
body:formData
});

input.value="";

loadPhotos();

}


/* LOAD PHOTOS */

async function loadPhotos(){

const res=await fetch("/photos");
const data=await res.json();

const gallery=document.getElementById("gallery");
gallery.innerHTML="";

data.forEach(name=>{

const card=document.createElement("div");
card.className="card";

const img=document.createElement("img");
img.src="/uploads/"+name;

/* IMAGE CLICK → VIEW */

img.onclick=()=>{

openViewer("/uploads/"+name);

};


/* DELETE */

const delBtn=document.createElement("button");
delBtn.innerText="Delete";
delBtn.className="deleteBtn";

delBtn.onclick=async()=>{

await fetch("/delete/"+name,{
method:"DELETE"
});

loadPhotos();

};


/* DOWNLOAD */

const downBtn=document.createElement("button");
downBtn.innerText="Download";
downBtn.className="downloadBtn";

downBtn.onclick=()=>{

const a=document.createElement("a");
a.href="/uploads/"+name;
a.download=name;
a.click();

};

card.appendChild(img);
card.appendChild(delBtn);
card.appendChild(downBtn);

gallery.appendChild(card);

});

}


/* IMAGE VIEWER */

function openViewer(src){

document.getElementById("viewerImg").src=src;
document.getElementById("imageViewer").style.display="flex";

}

function closeViewer(){

document.getElementById("imageViewer").style.display="none";

}