// Lấy các phần tử DOM
const galleryItems = document.querySelectorAll(".gallery-item");
const modal = document.getElementById("galleryModal");
const modalImg = document.getElementById("modalImage");
const captionText = document.getElementById("caption");
const closeModal = document.querySelector(".close-modal");

// Thêm sự kiện click cho mỗi ảnh trong gallery
galleryItems.forEach((item) => {
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

// Chức năng thêm ảnh mới (có thể mở rộng sau này)
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

  // Thêm vào gallery
  document.querySelector(".gallery-container").appendChild(newItem);

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

// Chức năng tải ảnh từ thiết bị (có thể mở rộng sau này)
function setupImageUpload() {
  // Tạo input file ẩn
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.style.display = "none";
  document.body.appendChild(fileInput);

  // Xử lý khi chọn file
  fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file && file.type.match("image.*")) {
      const reader = new FileReader();

      reader.onload = function (e) {
        // Hiển thị hộp thoại nhập caption
        const caption = prompt("Nhập mô tả cho ảnh:", "Kỷ niệm đẹp");

        if (caption !== null) {
          addNewImage(e.target.result, caption);
        }
      };

      reader.readAsDataURL(file);
    }
  });
}
