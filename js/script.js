// ------------------------------
// Supabase Initialization
// ------------------------------
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://frmsjykcwzklqzaxfiyq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybXNqeWtjd3prbHF6YXhmaXlxIiwicm9sZSI6ImFub25iYXMiLCJpYXQiOjE3NTY5MDgzMjEsImV4cCI6MjA3MjQ4NDMyMX0.v7pwM3qU8RzHKe0RYuMq0hSG95sKzwLH4LYCRvZyFNo';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ------------------------------
// Theme Toggle
// ------------------------------
const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    if (currentTheme === 'light') {
      htmlEl.setAttribute('data-theme', 'dark');
    } else {
      htmlEl.setAttribute('data-theme', 'light');
    }
  });
}

// ------------------------------
// Contact Form Submission
// ------------------------------
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;

    const { error } = await supabase.from('contacts').insert([{ name, email, message }]);

    if (error) {
      alert('Error sending message: ' + error.message);
    } else {
      alert('Message sent successfully!');
      contactForm.reset();
    }
  });
}

// ------------------------------
// Apply Form Submission
// ------------------------------
const applyForm = document.getElementById('apply-form');
if (applyForm) {
  applyForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullName = document.getElementById('apply-name').value;
    const email = document.getElementById('apply-email').value;
    const phone = document.getElementById('apply-phone').value;
    const position = document.getElementById('apply-position').value;
    const resumeInput = document.getElementById('apply-resume');
    let resumeUrl = null;

    const BUCKET_NAME = 'resumes';

    // Ensure bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets.some(b => b.name === BUCKET_NAME);
    if (!bucketExists) {
      const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, { public: true });
      if (createError) {
        alert('Error creating storage bucket: ' + createError.message);
        return;
      }
    }

    // Upload resume file if exists
    if (resumeInput.files.length > 0) {
      const file = resumeInput.files[0];
      const { data, error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(`resumes/${Date.now()}_${file.name}`, file);

      if (uploadError) {
        alert('Error uploading resume: ' + uploadError.message);
        return;
      }

      // Get public URL
      const { publicUrl } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path);
      resumeUrl = publicUrl;
    }

    // Insert into Supabase including phone number and resume_url
    const { error } = await supabase.from('applications').insert([
      { full_name: fullName, email, position, phone, resume_url: resumeUrl }
    ]);

    if (error) {
      alert('Error submitting application: ' + error.message);
    } else {
      alert('Application submitted successfully!');
      applyForm.reset();
    }
  });
}
