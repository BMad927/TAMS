// -----------------------------
// Supabase client
// -----------------------------
const SUPABASE_URL = 'https://frmsjykcwzklqzaxfiyq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybXNqeWtjd3prbHF6YXhmaXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5MDgzMjEsImV4cCI6MjA3MjQ4NDMyMX0.v7pwM3qU8RzHKe0RYuMq0hSG95sKzwLH4LYCRvZyFNo';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// -----------------------------
// Theme toggle with persistence
// -----------------------------
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('tass-theme');
if (savedTheme) html.dataset.theme = savedTheme;

themeToggle.addEventListener('click', () => {
  const newTheme = html.dataset.theme === 'light' ? 'dark' : 'light';
  html.dataset.theme = newTheme;
  localStorage.setItem('tass-theme', newTheme);
});

// -----------------------------
// Navbar hide on scroll
// -----------------------------
let lastScroll = 0;
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll) header.classList.add('hidden');
  else header.classList.remove('hidden');
  lastScroll = currentScroll;
});

// -----------------------------
// Mobile menu toggle
// -----------------------------
const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');
if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
}

// -----------------------------
// Contact form
// -----------------------------
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;

    const { data, error } = await supabaseClient.from('contacts').insert([{ name, email, message }]);
    if (error) alert('Error sending message: ' + error.message);
    else {
      alert('Message sent successfully!');
      contactForm.reset();
    }
  });
}

// -----------------------------
// Apply form
// -----------------------------
const applyForm = document.getElementById('apply-form');
if (applyForm) {
  applyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('apply-name').value;
    const email = document.getElementById('apply-email').value;
    const phone = document.getElementById('apply-phone').value;
    const position = document.getElementById('apply-position').value;
    const resumeFile = document.getElementById('apply-resume').files[0];

    if (!resumeFile) return alert('Please upload a resume file.');

    const { data: uploadData, error: uploadError } = await supabaseClient.storage.from('resumes').upload(`resumes/${resumeFile.name}`, resumeFile, { upsert: true });
    if (uploadError) return alert('Error uploading resume: ' + uploadError.message);

    const { data: publicData } = supabaseClient.storage.from('resumes').getPublicUrl(`resumes/${resumeFile.name}`);
    const resume_url = publicData.publicUrl;

    const { data, error } = await supabaseClient.from('applications').insert([{ full_name: name, email, phone, position, resume_url }]);
    if (error) alert('Error submitting application: ' + error.message);
    else {
      alert('Application submitted successfully!');
      applyForm.reset();
    }
  });
}
