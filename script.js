// Supabase setup
const SUPABASE_URL = "https://frmsjykcwzklqzaxfiyq.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybXNqeWtjd3prbHF6YXhmaXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5MDgzMjEsImV4cCI6MjA3MjQ4NDMyMX0.v7pwM3qU8RzHKe0RYuMq0hSG95sKzwLH4LYCRvZyFNo";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Mobile navbar toggle
const menuButton = document.getElementById("menu-button");
const mobileMenu = document.getElementById("mobile-menu");
if (menuButton) {
  menuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
  });
}

// Hide navbar on scroll down
let lastScroll = 0;
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  if (currentScroll > lastScroll) {
    header.style.top = "-80px";
  } else {
    header.style.top = "0";
  }
  lastScroll = currentScroll;
});

// Theme toggle
const themeToggle = document.getElementById("theme-toggle");
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const newTheme = current === "light" ? "dark" : "light";
    setTheme(newTheme);
  });
}
const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

// Contact form
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("contact-name").value;
    const email = document.getElementById("contact-email").value;
    const message = document.getElementById("contact-message").value;

    const { error } = await supabase.from("contacts").insert([{ name, email, message }]);
    if (error) {
      alert("Error sending message: " + error.message);
    } else {
      alert("Message sent successfully!");
      contactForm.reset();
    }
  });
}

// Apply form
const applyForm = document.getElementById("apply-form");
if (applyForm) {
  applyForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const full_name = document.getElementById("apply-name").value;
    const email = document.getElementById("apply-email").value;
    const phone = document.getElementById("apply-phone").value;
    const position = document.getElementById("apply-position").value;
    const resumeFile = document.getElementById("apply-resume").files[0];

    if (!resumeFile) {
      alert("Please upload a resume.");
      return;
    }

    // Upload resume
    const fileName = `${Date.now()}_${resumeFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(fileName, resumeFile);

    if (uploadError) {
      alert("Error uploading resume: " + uploadError.message);
      return;
    }

    const { data: publicUrlData } = supabase.storage.from("resumes").getPublicUrl(fileName);
    const resume_url = publicUrlData.publicUrl;

    // Save application
    const { error } = await supabase
      .from("applications")
      .insert([{ full_name, email, phone, position, resume_url }]);

    if (error) {
      alert("Error submitting application: " + error.message);
    } else {
      alert("Application submitted successfully!");
      applyForm.reset();
    }
  });
}
