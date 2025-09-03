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

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://frmsjykcwzklqzaxfiyq.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// ---------------------------
// Contact Form Handler
// ---------------------------
// Initialize client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Contact form handler
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault(); // stop page reload & query params in URL

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Insert into Supabase
      const { data, error } = await supabase
        .from("contacts")
        .insert([{ name, email, message }]);

      if (error) {
        console.error("Error inserting contact:", error.message);
        alert("Something went wrong. Please try again!");
      } else {
        console.log("Message saved:", data);
        alert("✅ Message sent successfully!");
        contactForm.reset();
      }
    });
  }
});

// ---------------------------
// Job Application Form Handler
// ---------------------------
const applyForm = document.getElementById("applyForm");

if (applyForm) {
  applyForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("apply-name").value;
    const email = document.getElementById("apply-email").value;
    const position = document.getElementById("apply-position").value;
    const resumeLink = document.getElementById("apply-resume").value;

    const { error } = await supabase
      .from("applications")
      .insert([{ full_name: fullName, email, position, resume_link: resumeLink }]);

    if (error) {
      alert("❌ Error saving application: " + error.message);
      console.error(error);
    } else {
      alert("✅ Application submitted successfully!");
      applyForm.reset();
    }
  });
}
