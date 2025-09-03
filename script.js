// ---------------------------
// Analytics Example (Simple Bar Chart)
// ---------------------------
const analyticsData = {
  labels: ["Stevedores", "Winch Operators", "Payloader", "Arrastre", "Mooring"],
  values: [120, 50, 35, 80, 25] // Example numbers (replace later with real data)
}

function renderAnalytics() {
  const ctx = document.getElementById("analyticsChart")
  if (!ctx) return

  ctx.innerHTML = "" // clear if re-rendered
  analyticsData.labels.forEach((label, i) => {
    const barContainer = document.createElement("div")
    barContainer.style.display = "flex"
    barContainer.style.alignItems = "center"
    barContainer.style.margin = "6px 0"

    const barLabel = document.createElement("span")
    barLabel.textContent = label
    barLabel.style.width = "150px"

    const bar = document.createElement("div")
    bar.style.height = "20px"
    bar.style.background = "#007BFF"
    bar.style.width = analyticsData.values[i] + "px"
    bar.style.marginLeft = "10px"
    bar.style.borderRadius = "5px"

    barContainer.appendChild(barLabel)
    barContainer.appendChild(bar)
    ctx.appendChild(barContainer)
  })
}
renderAnalytics()

// ---------------------------
// Supabase Setup
// ---------------------------
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const SUPABASE_URL = "https://frmsjykcwzklqzaxfiyq.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybXNqeWtjd3prbHF6YXhmaXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5MDgzMjEsImV4cCI6MjA3MjQ4NDMyMX0.v7pwM3qU8RzHKe0RYuMq0hSG95sKzwLH4LYCRvZyFNo"

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ---------------------------
// Contact Form Handler
// ---------------------------
document.getElementById("contact-form")?.addEventListener("submit", async (e) => {
  e.preventDefault()

  const name = document.getElementById("contact-name").value
  const email = document.getElementById("contact-email").value
  const message = document.getElementById("contact-message").value

  const { error } = await supabase
    .from("contacts")
    .insert([{ name, email, message }])

  if (error) {
    alert("❌ Error saving contact: " + error.message)
  } else {
    alert("✅ Message sent successfully!")
    e.target.reset()
  }
})

// ---------------------------
// Job Application Form Handler
// ---------------------------
document.getElementById("apply-form")?.addEventListener("submit", async (e) => {
  e.preventDefault()

  const name = document.getElementById("apply-name").value
  const email = document.getElementById("apply-email").value
  const position = document.getElementById("apply-position").value
  const resume = document.getElementById("apply-resume").value // later could be file upload

  const { error } = await supabase
    .from("applications")
    .insert([{ name, email, position, resume }])

  if (error) {
    alert("❌ Error saving application: " + error.message)
  } else {
    alert("✅ Application submitted successfully!")
    e.target.reset()
  }
})
