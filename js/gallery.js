// gallery.js - Gallery functionality for Kỷ Niệm Hẹn Hò website

// Lấy các phần tử DOM
const galleryItems = document.querySelectorAll(".gallery-item");
const modal = document.getElementById("galleryModal");
const modalImg = document.getElementById("modalImage");
const captionText = document.getElementById("caption");
const closeModal = document.querySelector(".close-modal");
const addImageBtn = document.getElementById("addImageBtn");
const imageModal = document.getElementById("imageModal");
const closeImageModal = document.getElementById("closeImageModal");
const imageUpload = document.getElementById("imageUpload");
const imagePreview = document.getElementById("imagePreview");
const imageCaption = document.getElementById("imageCaption");
const saveImageBtn = document.getElementById("saveImageBtn");
const cancelImageBtn = document.getElementById("cancelImageBtn");

// Mảng lưu trữ ảnh đã thêm
let galleryImages = [];

// Kiểm tra localStorage khi trang web được tải
if (localStorage.getItem("galleryImages")) {
  try {
    galleryImages = JSON.parse(localStorage.getItem("galleryImages"));
    loadGalleryImages();
  } catch (e) {
    console.error("Lỗi khi tải ảnh từ localStorage:", e);
    galleryImages = [];
  }
}

// Thêm sự kiện click cho mỗi ảnh trong gallery
function setupGalleryItemEvents() {
  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", function () {
      modal.style.display = "block";
      modalImg.src = this.querySelector("img").src;
      captionText.innerHTML = this.querySelector(
        ".gallery-overlay span"
      ).textContent;

      // Thêm hiệu ứng fade-in
      setTimeout(() => {
        modal.style.opacity = "1";
      }, 10);

      // Vô hiệu hóa cuộn trang
      document.body.style.overflow = "hidden";
    });
  });
}

// Đóng modal khi nhấp vào nút đóng
closeModal.addEventListener("click", closeGalleryModal);

// Đóng modal khi nhấp vào bên ngoài ảnh
modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeGalleryModal();
  }
});

// Đóng modal khi nhấn phím Esc
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeGalleryModal();
    closeImageUploadModal();
  }
});

// Hàm đóng modal
function closeGalleryModal() {
  modal.style.opacity = "0";
  setTimeout(() => {
    modal.style.display = "none";
    // Cho phép cuộn trang trở lại
    document.body.style.overflow = "auto";
  }, 300);
}

// Mở modal thêm ảnh
addImageBtn.addEventListener("click", function () {
  imageModal.style.display = "flex";
  imageCaption.value = "";
  imagePreview.innerHTML = "<p>Chưa có ảnh được chọn</p>";
  document.body.style.overflow = "hidden";
});

// Đóng modal thêm ảnh
function closeImageUploadModal() {
  imageModal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Xử lý khi nhấp vào nút đóng modal thêm ảnh
closeImageModal.addEventListener("click", closeImageUploadModal);
cancelImageBtn.addEventListener("click", closeImageUploadModal);

// Xử lý khi nhấp vào bên ngoài modal thêm ảnh
imageModal.addEventListener("click", function (event) {
  if (event.target === imageModal) {
    closeImageUploadModal();
  }
});

// Xử lý khi chọn ảnh
imageUpload.addEventListener("change", function () {
  const file = this.files[0];

  if (file && file.type.match("image.*")) {
    const reader = new FileReader();

    reader.onload = function (e) {
      imagePreview.innerHTML = `<img src="${e.target.result}" alt="Ảnh xem trước">`;
    };

    reader.readAsDataURL(file);
  }
});

// Xử lý khi lưu ảnh mới
saveImageBtn.addEventListener("click", function () {
  const file = imageUpload.files[0];
  const caption = imageCaption.value.trim() || "Kỷ niệm đẹp";

  if (!file) {
    alert("Vui lòng chọn một ảnh!");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    // Tạo đối tượng ảnh mới
    const newImage = {
      src: e.target.result,
      caption: caption,
      date: new Date().toISOString(),
    };

    // Thêm vào mảng ảnh
    galleryImages.push(newImage);

    // Lưu vào localStorage
    saveGalleryImages();

    // Thêm ảnh vào gallery
    addNewImage(newImage.src, newImage.caption);

    // Đóng modal
    closeImageUploadModal();
  };

  reader.readAsDataURL(file);
});

// Lưu ảnh vào localStorage
function saveGalleryImages() {
  localStorage.setItem("galleryImages", JSON.stringify(galleryImages));
}

// Tải ảnh từ localStorage
function loadGalleryImages() {
  galleryImages.forEach((image) => {
    addNewImage(image.src, image.caption);
  });
}

// Thêm ảnh mới vào gallery
function addNewImage(imageSrc, caption) {
  // Tạo phần tử gallery mới
  const newItem = document.createElement("div");
  newItem.classList.add("gallery-item");

  // Tạo ảnh
  const img = document.createElement("img");
  img.src = imageSrc;
  img.alt = caption;

  // Tạo overlay
  const overlay = document.createElement("div");
  overlay.classList.add("gallery-overlay");

  // Tạo caption
  const captionSpan = document.createElement("span");
  captionSpan.textContent = caption;

  // Ghép các phần tử lại với nhau
  overlay.appendChild(captionSpan);
  newItem.appendChild(img);
  newItem.appendChild(overlay);

  // Thêm vào đầu gallery
  const galleryContainer = document.querySelector(".gallery-container");
  galleryContainer.insertBefore(newItem, galleryContainer.firstChild);

  // Thêm sự kiện click
  newItem.addEventListener("click", function () {
    modal.style.display = "block";
    modalImg.src = imageSrc;
    captionText.innerHTML = caption;

    setTimeout(() => {
      modal.style.opacity = "1";
    }, 10);

    document.body.style.overflow = "hidden";
  });
}

// Khởi tạo sự kiện cho các ảnh có sẵn
setupGalleryItemEvents();
