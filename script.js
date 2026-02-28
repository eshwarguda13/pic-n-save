// Upload Image
async function uploadImage() {

  const input = document.getElementById("fileInput");
  const file = input.files[0];

  if (!file) {
    alert("Please select an image first.");
    return;
  }

  const formData = new FormData();
  formData.append("photo", file);

  try {

    await fetch("/upload", {
      method: "POST",
      body: formData
    });

    input.value = "";
    loadPhotos();

  } catch (error) {
    console.error("Upload failed:", error);
  }

}


// Load Images
async function loadPhotos() {

  try {

    const res = await fetch("/photos");
    const images = await res.json();

    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    images.forEach(name => {

      const card = document.createElement("div");
      card.className = "card";

      const img = document.createElement("img");
      img.src = "/uploads/" + name;

      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Delete";
      deleteBtn.className = "deleteBtn";

      deleteBtn.onclick = async () => {

        await fetch("/delete/" + name, {
          method: "DELETE"
        });

        loadPhotos();
      };

      const downloadBtn = document.createElement("button");
      downloadBtn.innerText = "Download";
      downloadBtn.className = "downloadBtn";

      downloadBtn.onclick = () => {

        const a = document.createElement("a");
        a.href = "/uploads/" + name;
        a.download = name;
        a.click();
      };

      card.appendChild(img);
      card.appendChild(deleteBtn);
      card.appendChild(downloadBtn);

      gallery.appendChild(card);

    });

  } catch (error) {
    console.error("Failed to load photos:", error);
  }

}


// Load images when page opens
loadPhotos();