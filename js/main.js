// Đặt ngày bắt đầu yêu nhau - định dạng: năm, tháng (0-11), ngày
// set thời gian ở đây
let loveStartDate = new Date(2023, 0, 1); // 01/01/2023 mặc định

// Kiểm tra xem có ngày bắt đầu được lưu trong localStorage không
if (localStorage.getItem("loveStartDate")) {
  loveStartDate = new Date(localStorage.getItem("loveStartDate"));
  updateStartDateDisplay();
}

// Hàm cập nhật bộ đếm thời gian yêu nhau
function updateLoveCounter() {
  const now = new Date();
  const diff = now - loveStartDate;

  // Tính toán thời gian
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // Cập nhật giao diện
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

// Cập nhật bộ đếm mỗi giây
setInterval(updateLoveCounter, 1000);
updateLoveCounter(); // Cập nhật ngay khi trang web được tải

// Hiệu ứng trái tim bay
function createFloatingHeart() {
  const heart = document.createElement("i");
  heart.classList.add("fas", "fa-heart", "floating-heart");

  // Vị trí ngẫu nhiên
  const startPositionX = Math.random() * window.innerWidth;
  heart.style.left = startPositionX + "px";

  // Kích thước ngẫu nhiên
  const size = Math.random() * 1 + 0.5; // 0.5 - 1.5
  heart.style.fontSize = size + "rem";

  // Thời gian animation ngẫu nhiên
  const animationDuration = Math.random() * 3 + 3; // 3-6 giây
  heart.style.animationDuration = animationDuration + "s";

  // Thêm vào DOM
  document.getElementById("floatingHearts").appendChild(heart);

  // Xóa sau khi animation kết thúc
  setTimeout(() => {
    heart.remove();
  }, animationDuration * 1000);
}

// Tạo trái tim bay mỗi 300ms
setInterval(createFloatingHeart, 300);

// Xử lý thêm lời nhắn yêu thương
document.getElementById("addNote").addEventListener("click", function () {
  const noteText = document.getElementById("noteText").value.trim();

  if (noteText !== "") {
    // Tạo lời nhắn mới
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");

    // Tạo nội dung lời nhắn
    const noteContent = document.createElement("p");
    noteContent.classList.add("note-content");
    noteContent.textContent = noteText;

    // Tạo ngày lời nhắn
    const noteDate = document.createElement("span");
    noteDate.classList.add("note-date");

    // Định dạng ngày tháng
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    noteDate.textContent = day + "/" + month + "/" + year;

    // Thêm vào lời nhắn
    noteElement.appendChild(noteContent);
    noteElement.appendChild(noteDate);

    // Thêm vào danh sách lời nhắn
    document.getElementById("notesDisplay").prepend(noteElement);

    // Xóa nội dung trong textarea
    document.getElementById("noteText").value = "";

    // Hiệu ứng xuất hiện
    noteElement.style.opacity = "0";
    setTimeout(() => {
      noteElement.style.opacity = "1";
    }, 10);

    // Lưu vào localStorage
    saveNotes();
  }
});

// Lưu lời nhắn vào localStorage
function saveNotes() {
  const notesContainer = document.getElementById("notesDisplay");
  const notes = notesContainer.innerHTML;
  localStorage.setItem("loveNotes", notes);
}

// Tải lời nhắn từ localStorage
function loadNotes() {
  const savedNotes = localStorage.getItem("loveNotes");
  if (savedNotes) {
    document.getElementById("notesDisplay").innerHTML = savedNotes;
  }
}

// Tạo modal chỉnh sửa ngày
function createDateEditModal() {
  // Tạo modal container
  const modal = document.createElement("div");
  modal.id = "dateModal";
  modal.className = "date-modal";

  // Tạo nội dung modal
  const modalContent = document.createElement("div");
  modalContent.className = "date-modal-content";

  // Tạo tiêu đề
  const modalTitle = document.createElement("h3");
  modalTitle.className = "date-modal-title";
  modalTitle.textContent = "Chỉnh sửa ngày bắt đầu yêu nhau";

  // Tạo nút đóng
  const closeBtn = document.createElement("span");
  closeBtn.className = "close-date-modal";
  closeBtn.innerHTML = "&times;";
  closeBtn.onclick = closeDateModal;

  // Tạo container cho input
  const inputContainer = document.createElement("div");
  inputContainer.className = "date-input-container";

  // Tạo label
  const label = document.createElement("label");
  label.htmlFor = "startDateInput";
  label.textContent = "Ngày bắt đầu yêu nhau:";

  // Tạo input
  const input = document.createElement("input");
  input.type = "date";
  input.id = "startDateInput";
  input.className = "date-input";

  // Đặt giá trị mặc định cho input
  const year = loveStartDate.getFullYear();
  const month = String(loveStartDate.getMonth() + 1).padStart(2, "0");
  const day = String(loveStartDate.getDate()).padStart(2, "0");
  input.value = `${year}-${month}-${day}`;

  // Tạo container cho các nút
  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "date-modal-buttons";

  // Tạo nút lưu
  const saveBtn = document.createElement("button");
  saveBtn.className = "date-modal-btn save-date-btn";
  saveBtn.textContent = "Lưu";
  saveBtn.onclick = saveNewDate;

  // Tạo nút hủy
  const cancelBtn = document.createElement("button");
  cancelBtn.className = "date-modal-btn cancel-date-btn";
  cancelBtn.textContent = "Hủy";
  cancelBtn.onclick = closeDateModal;

  // Ghép các phần tử lại với nhau
  inputContainer.appendChild(label);
  inputContainer.appendChild(input);

  buttonsContainer.appendChild(saveBtn);
  buttonsContainer.appendChild(cancelBtn);

  modalContent.appendChild(closeBtn);
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(inputContainer);
  modalContent.appendChild(buttonsContainer);

  modal.appendChild(modalContent);

  // Thêm vào body
  document.body.appendChild(modal);
}

// Mở modal chỉnh sửa ngày
function openDateModal() {
  const modal = document.getElementById("dateModal");
  if (!modal) {
    createDateEditModal();
    document.getElementById("dateModal").style.display = "flex";
  } else {
    modal.style.display = "flex";
  }
}

// Đóng modal chỉnh sửa ngày
function closeDateModal() {
  document.getElementById("dateModal").style.display = "none";
}

// Lưu ngày mới
function saveNewDate() {
  const dateInput = document.getElementById("startDateInput");
  const newDate = new Date(dateInput.value);

  // Kiểm tra xem ngày có hợp lệ không
  if (isNaN(newDate.getTime())) {
    alert("Ngày không hợp lệ. Vui lòng chọn lại.");
    return;
  }

  // Cập nhật ngày bắt đầu
  loveStartDate = newDate;

  // Lưu vào localStorage
  localStorage.setItem("loveStartDate", loveStartDate.toString());

  // Cập nhật hiển thị
  updateStartDateDisplay();

  // Cập nhật bộ đếm
  updateLoveCounter();

  // Đóng modal
  closeDateModal();
}

// Cập nhật hiển thị ngày bắt đầu
function updateStartDateDisplay() {
  const day = String(loveStartDate.getDate()).padStart(2, "0");
  const month = String(loveStartDate.getMonth() + 1).padStart(2, "0");
  const year = loveStartDate.getFullYear();
  document.getElementById("startDate").textContent = `${day}/${month}/${year}`;
}

// Thêm sự kiện click cho nút chỉnh sửa ngày
document.addEventListener("DOMContentLoaded", function () {
  // Tải lời nhắn
  loadNotes();

  // Thêm sự kiện cho nút chỉnh sửa ngày
  document
    .getElementById("editDateBtn")
    .addEventListener("click", openDateModal);

  // Cập nhật hiển thị ngày bắt đầu
  updateStartDateDisplay();
});

// Xử lý khi nhấn phím Esc để đóng modal
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const dateModal = document.getElementById("dateModal");
    if (dateModal && dateModal.style.display === "flex") {
      closeDateModal();
    }
  }
});
// main.js - Main JavaScript file for Kỷ Niệm Hẹn Hò website
// Thiết kế và phát triển bởi IT(K)
// Copyright © 2023 IT(K). All rights reserved.
