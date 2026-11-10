// B’Barber site script

// 1. WhatsApp number for bookings (country code, no plus sign or spaces). Change it here.
const WHATSAPP_NUMBER = "254705539550";

// 2. Copyright year fills in automatically
document.querySelectorAll(".year").forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

// 3. Highlight the current page in the navbar
const currentPage = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".site-nav .nav-link").forEach(function (link) {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});

// 4. Gallery lightbox (gallery page only)
const modalEl = document.getElementById("photoModal");
if (modalEl) {
  const modal = new bootstrap.Modal(modalEl);
  const modalImg = document.getElementById("photoModalImg");
  const modalTitle = document.getElementById("photoModalTitle");
  document.querySelectorAll(".gallery-item").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const img = btn.querySelector("img");
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modalTitle.textContent = btn.dataset.title;
      modal.show();
    });
  });
}

// 5. Booking form: checks the fields, then opens WhatsApp with the details filled in
const form = document.getElementById("bookingForm");
if (form) {
  const dateInput = document.getElementById("date");
  dateInput.min = new Date().toISOString().split("T")[0];

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }
    const data = new FormData(form);
    const text =
      "Hello B’Barber, I would like to book a haircut appointment.\n" +
      "Name: " + data.get("name") + "\n" +
      "Phone: " + data.get("phone") + "\n" +
      "Service: " + data.get("service") + "\n" +
      "Date: " + data.get("date") + "\n" +
      "Time: " + data.get("time") + "\n" +
      "Notes: " + (data.get("notes") || "None");
    window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text), "_blank");
    document.getElementById("bookingThanks").classList.remove("d-none");
    form.reset();
    form.classList.remove("was-validated");
  });
}
