// ---- Supabase client (browser build) ----
const SUPABASE_URL = "https://frmsjykcwzklqzaxfiyq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybXNqeWtjd3prbHF6YXhmaXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5MDgzMjEsImV4cCI6MjA3MjQ4NDMyMX0.v7pwM3qU8RzHKe0RYuMq0hSG95sKzwLH4LYCRvZyFNo";

if (!window.supabase) {
  alert("❌ Supabase library failed to load. Check the <script src> include.");
}
const supabase = window.supabase?.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---- Hook forms after DOM is ready ----
document.addEventListener("DOMContentLoaded", () => {
  console.log("script.js loaded. Hooking forms…");

  // CONTACT
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    console.log("[contact] form found");
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("contact-name")?.value?.trim() ?? "";
      const email = document.getElementById("contact-email")?.value?.trim() ?? "";
      const message = document.getElementById("contact-message")?.value?.trim() ?? "";

      alert(`Submitting contact:\n${name}\n${email}`);
      try {
        const { data, error } = await supabase
          .from("contacts")
          .insert([{ name, email, message }])
          .select();

        if (error) {
          console.error(error);
          alert("❌ Error saving contact: " + error.message);
          return;
        }
        console.log("[contact] inserted:", data);
        alert("✅ Message sent! Thank you.");
        contactForm.reset();
      } catch (err) {
        console.error(err);
        alert("❌ Unexpected error. See console for details.");
      }
    });
  } else {
    console.log("[contact] form NOT found on this page");
  }

  // APPLY
  const applyForm = document.getElementById("apply-form");
  if (applyForm) {
    console.log("[apply] form found");
    applyForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("apply-name")?.value?.trim() ?? "";
      const email = document.getElementById("apply-email")?.value?.trim() ?? "";
      const position = document.getElementById("apply-position")?.value?.trim() ?? "";
      const resume = document.getElementById("apply-resume")?.value?.trim() ?? "";

      alert(`Submitting application:\n${name}\n${email}\n${position}`);
      try {
        const { data, error } = await supabase
          .from("applications")
          .insert([{ name, email, position, resume }])
          .select();

        if (error) {
          console.error(error);
          alert("❌ Error saving application: " + error.message);
          return;
        }
        console.log("[apply] inserted:", data);
        alert("✅ Application submitted!");
        applyForm.reset();
      } catch (err) {
        console.error(err);
        alert("❌ Unexpected error. See console for details.");
      }
    });
  } else {
    console.log("[apply] form NOT found on this page");
  }
});
