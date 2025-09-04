// script.js
const SUPABASE_URL = 'https://frmsjykcwzklqzaxfiyq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzYSIsInJlZiI6ImZybXNqeWtjd3prbHF6YXhmaXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5MDgzMjEsImV4cCI6MjA3MjQ4NDMyMX0.v7pwM3qU8RzHKe0RYuMq0hSG95sKzwLH4LYCRvZyFNo';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =====================
// THEME TOGGLE
// =====================
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

// Load theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
}

// Update button icon based on theme
function updateThemeIcon() {
  themeToggle.textContent = root.getAttribute('data-theme') === 'dark' ? '🌙' : '☀️';
}
updateThemeIcon();

// Toggle theme
themeToggle.addEventListener('click', () => {
  let current = root.getAttribute('data-theme');
  let newTheme = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon();
});

// =====================
// MOBILE MENU TOGGLE
// =====================
const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');

menuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// =====================
// HIDE NAVBAR ON SCROLL DOWN
// =====================
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll && currentScroll > 50) {
    header.classList.add('hidden');
  } else {
    header.classList.remove('hidden');
  }
  lastScroll = currentScroll;
});

// =====================
// CONTACT FORM
// =====================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const full_name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;

    const { error } = await supabase.from('contacts').insert([{ full_name, email, message }]);
    if (error) {
      alert('Error sending message: ' + error.message);
    } else {
      alert('Message sent successfully!');
      contactForm.reset();
    }
  });
}

// =====================
// APPLY FORM
// =====================
const applyForm = document.getElementById('apply-form');
if (applyForm) {
  applyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const full_name = document.getElementById('apply-name').value;
    const email = document.getElementById('apply-email').value;
    const phone = document.getElementById('apply-phone').value;
    const position = document.getElementById('apply-position').value;
    const resumeFile = document.getElementById('apply-resume').files[0];

    if (!resumeFile) {
      alert('Please select a resume file.');
      return;
    }

    // Upload resume
    const fileExt = resumeFile.name.split('.').pop();
    const fileName = `${full_name.replace(/\s+/g,'_')}_${Date.now()}.${fileExt}`;
    const { data, error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(fileName, resumeFile);

    if (uploadError) {
      alert('Error uploading resume: ' + uploadError.message);
      return;
    }

    // Get public URL
    const { publicUrl, error: urlError } = supabase.storage
      .from('resumes')
      .getPublicUrl(fileName);

    if (urlError) {
      alert('Error getting resume URL: ' + urlError.message);
      return;
    }

    // Insert into applications table
    const { error: insertError } = await supabase.from('applications').insert([{
      full_name,
      email,
      phone,
      position,
      resume_url: publicUrl
    }]);

    if (insertError) {
      alert('Error submitting application: ' + insertError.message);
    } else {
      alert('Application submitted successfully!');
      applyForm.reset();
    }
  });
}
