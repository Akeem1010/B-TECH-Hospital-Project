const searchIcon = document.querySelector('.icon-btn[title="Search"]');
const searchPopup = document.getElementById("search-popup");
const closePopup = document.querySelector(".close-popup");
const profileIcon = document.querySelector('.icon-btn[title="Profile"]');
const profilePopup = document.getElementById("profile-popup");
const appointmentIcon = document.querySelector(
  '.icon-btn[title="Appointments"]'
);
const appointmentPopup = document.getElementById("appointment-popup");

// Utility to close all popups
function closeAllPopups() {
  if (searchPopup) searchPopup.classList.remove("active");
  if (profilePopup) profilePopup.classList.remove("active");
  if (appointmentPopup) appointmentPopup.classList.remove("active");
}

// Search popup functionality
if (searchIcon && searchPopup && closePopup) {
  searchIcon.addEventListener("click", function (e) {
    e.preventDefault();
    closeAllPopups();
    searchPopup.classList.add("active");
    searchPopup.querySelector('input[type="text"]').focus();
  });
  closePopup.addEventListener("click", function () {
    searchPopup.classList.remove("active");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      searchPopup.classList.remove("active");
    }
  });
  document.addEventListener("mousedown", function (e) {
    if (!searchPopup.contains(e.target) && !searchIcon.contains(e.target)) {
      searchPopup.classList.remove("active");
    }
  });
}

// Profile popup functionality
if (profileIcon && profilePopup) {
  profileIcon.addEventListener("click", function (e) {
    e.preventDefault();
    closeAllPopups();
    profilePopup.classList.toggle("active");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      profilePopup.classList.remove("active");
    }
  });
  document.addEventListener("mousedown", function (e) {
    if (!profilePopup.contains(e.target) && !profileIcon.contains(e.target)) {
      profilePopup.classList.remove("active");
    }
  });
}

// Appointment popup functionality
if (appointmentIcon && appointmentPopup) {
  appointmentIcon.addEventListener("click", function (e) {
    e.preventDefault();
    closeAllPopups();
    appointmentPopup.classList.toggle("active");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      appointmentPopup.classList.remove("active");
    }
  });
  document.addEventListener("mousedown", function (e) {
    if (
      !appointmentPopup.contains(e.target) &&
      !appointmentIcon.contains(e.target)
    ) {
      appointmentPopup.classList.remove("active");
    }
  });
}

// Clickable menu actions
const viewProfileLink = document.getElementById("view-profile-link");
const logoutLink = document.getElementById("logout-link");
const appointmentCheckListLink = document.getElementById(
  "appointment-check-list-link"
);
const appointmentEditAppointmentLink = document.getElementById(
  "appointment-edit-appointment-link"
);

if (viewProfileLink) {
  viewProfileLink.addEventListener("click", function (e) {
    e.preventDefault();
    alert("View Profile clicked!");
  });
}
if (logoutLink) {
  logoutLink.addEventListener("click", function (e) {
    e.preventDefault();
    alert("Logout clicked!");
  });
}
if (appointmentCheckListLink) {
  appointmentCheckListLink.addEventListener("click", function (e) {
    e.preventDefault();
    alert("Appointment Check List clicked!");
  });
}
if (appointmentEditAppointmentLink) {
  appointmentEditAppointmentLink.addEventListener("click", function (e) {
    e.preventDefault();
    alert("Edit Appointment clicked!");
  });
}

// Mobile sidebar menu functionality
const menuToggle = document.querySelector(".menu-toggle");
const mobileSidebar = document.getElementById("mobile-sidebar");
const closeSidebar = document.querySelector(".close-sidebar");

if (menuToggle && mobileSidebar) {
  menuToggle.addEventListener("click", function () {
    mobileSidebar.classList.add("active");
  });
}
if (closeSidebar && mobileSidebar) {
  closeSidebar.addEventListener("click", function () {
    mobileSidebar.classList.remove("active");
  });
}
document.addEventListener("keydown", function (e) {
  if (
    e.key === "Escape" &&
    mobileSidebar &&
    mobileSidebar.classList.contains("active")
  ) {
    mobileSidebar.classList.remove("active");
  }
});
document.addEventListener("mousedown", function (e) {
  if (mobileSidebar && mobileSidebar.classList.contains("active")) {
    if (!mobileSidebar.contains(e.target) && !menuToggle.contains(e.target)) {
      mobileSidebar.classList.remove("active");
    }
  }
});
