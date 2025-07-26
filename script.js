$(document).ready(function () {
  // Sticky header on scroll
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }
    updateActiveSection();
  });

  // Smooth scrolling and active link update on nav click
  $(".header ul li a").on("click", function (e) {
    e.preventDefault();
    const target = $(this).attr("href");

    if ($(target).hasClass("active-section")) {
      return; // Already active, do nothing
    }

    let scrollToPos = 0;
    if (target !== "#home" && $(target).length) {
      scrollToPos = $(target).offset().top - 40; // Offset for sticky header
    }

    $("html, body").animate({ scrollTop: scrollToPos }, 500);

    $(".header ul li a").removeClass("active");
    $(this).addClass("active");
  });

  // ScrollReveal initialization and animations
  ScrollReveal({
    distance: "100px",
    duration: 2000,
    delay: 200,
  });

  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
    origin: "left",
  });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
    origin: "right",
  });
  ScrollReveal().reveal(".project-title, .contact-title", {
    origin: "top",
  });
  ScrollReveal().reveal(".projects, .contact", {
    origin: "bottom",
  });

  // Contact form submission to Google Sheets
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec";
  const form = document.forms["submitToGoogleSheet"];
  const msg = $("#msg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        msg.text("Message sent successfully");
        setTimeout(() => msg.text(""), 5000);
        form.reset();
      })
      .catch((error) => {
        console.error("Error!", error.message);
        msg.text("Failed to send message, please try again.");
        setTimeout(() => msg.text(""), 5000);
      });
  });

  // Initial update of active section on page load
  updateActiveSection();
});

// Function to highlight nav link based on scroll position
function updateActiveSection() {
  const scrollPosition = $(window).scrollTop();

  if (scrollPosition === 0) {
    $(".header ul li a").removeClass("active");
    $(".header ul li a[href='#home']").addClass("active");
    return;
  }

  $("section").each(function () {
    const target = $(this).attr("id");
    const offset = $(this).offset().top;
    const height = $(this).outerHeight();

    if (scrollPosition >= offset - 40 && scrollPosition < offset + height - 40) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#" + target + "']").addClass("active");
    }
  });
}

