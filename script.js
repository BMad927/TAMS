// ---------------------------
// Analytics Example (Simple Bar Chart)
// ---------------------------
const analyticsData = {
  labels: ["Stevedores", "Winch Operators", "Payloader", "Arrastre", "Mooring"],
  values: [120, 50, 35, 80, 25] // Example numbers (replace later with real data)
};

function renderAnalytics() {
  const ctx = document.getElementById("analyticsChart");
  if (!ctx) return;

  ctx.innerHTML = ""; // clear if re-rendered
  analyticsData.labels.forEach((label, i) => {
    const barContainer = document.createElement("div");
    barContainer.style.display = "flex";
    barContainer.style.alignItems = "center";
    barContainer.style.margin = "6px 0";

    const barLabel = document.createElement("span");
    barLabel.textContent = label;
    barLabel.style.width = "150px";

    const bar = document.createElement("div");
    bar.style.height = "20px";
    bar.style.background = "#007BFF";
    bar.style.width = analyticsData.values[i] + "px";
    bar.style.marginLeft = "10px";
    bar.style.borderRadius = "5px";

    barContainer.appendChild(barLabel);
    barContainer.appendChild(bar);
    ctx.appendChild(barContainer);
  });
}
renderAnalytics();

// ---------------------------
// Supabase Setup
// ---------------------------
const { createClient } = supabase;

const SUPABASE_URL = "https://frmsjykcwzklqzaxfiyq.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybXNqeWtjd3prbHF6YXhmaXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5MDgzMjEsImV4cCI6MjA3MjQ4NDMyMX0.v7pwM3qU8RzHKe0RYuMq0hSG95sKzwLH4LYCRvZyFNo";

const supa = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---------------------------
// Contact Form Handler
// ---------------------------
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    if (!name || !email || !message) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    const { error } = await supa.from("contacts").insert([{ name, email, message }]);

    if (error) {
      console.error("Supabase Error:", error);
      alert("❌ Error saving contact: " + error.message);
    } else {
      alert("✅ Message sent successfully!");
      contactForm.reset();
    }
  });
}

// ---------------------------
// Job Application Form Handler
// ---------------------------
const applyForm = document.getElementById("apply-form");
if (applyForm) {
  applyForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("apply-name").value.trim();
    const email = document.getElementById("apply-email").value.trim();
    const position = document.getElementById("apply-position").value.trim();
    const resume = document.getElementById("apply-resume").value.trim();

    if (!name || !email || !position || !resume) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    const { error } = await supa
      .from("applications")
      .insert([{ name, email, position, resume }]);

    if (error) {
      console.error("Supabase Error:", error);
      alert("❌ Error saving application: " + error.message);
    } else {
      alert("✅ Application submitted successfully!");
      applyForm.reset();
    }
  });

  const toggleBtn = document.getElementById("themeToggle");
const root = document.documentElement;

// Load saved theme
if (localStorage.getItem("theme")) {
  root.setAttribute("data-theme", localStorage.getItem("theme"));
} else {
  root.setAttribute("data-theme", "light"); // default
}

toggleBtn.addEventListener("click", () => {
  let current = root.getAttribute("data-theme");
  let next = current === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

}
