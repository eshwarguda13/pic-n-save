// Upload Image to Backend
async function uploadImage(){

  const input = document.getElementById("fileInput");
  const file = input.files[0];

  if(!file){
    alert("Select a file first");
    return;
  }

  const formData = new FormData();
  formData.append("photo", file);   // must match server.js

  await fetch("http://localhost:3000/upload",{
    method:"POST",
    body:formData
  });

  loadPhotos();
}


// Load Images from uploads folder
async function loadPhotos(){

  const res = await fetch("http://localhost:3000/photos");
  const data = await res.json();

  const gallery = document.getElementById("gallery");
  gallery.innerHTML="";

  data.forEach(name=>{

    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = "http://localhost:3000/uploads/" + name;

    // Delete Button
    const delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.className = "deleteBtn";

    delBtn.onclick = async ()=>{
      await fetch("http://localhost:3000/delete/" + name,{
        method:"DELETE"
      });
      loadPhotos();
    };

    // Download Button
    const downBtn = document.createElement("button");
    downBtn.innerText = "Download";
    downBtn.className = "downloadBtn";

    downBtn.onclick = ()=>{
      const a = document.createElement("a");
      a.href = img.src;
      a.download = name;
      a.click();
    };

    card.appendChild(img);
    card.appendChild(delBtn);
    card.appendChild(downBtn);
    gallery.appendChild(card);
  });
}


// Auto load images when page opens
loadPhotos();