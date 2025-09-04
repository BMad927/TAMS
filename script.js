// ==============================
// SUPABASE INIT
// ==============================
const SUPABASE_URL = 'https://frmsjykcwzklqzaxfiyq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybXNqeWtjd3prbHF6YXhmaXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5MDgzMjEsImV4cCI6MjA3MjQ4NDMyMX0.v7pwM3qU8RzHKe0RYuMq0hSG95sKzwLH4LYCRvZyFNo';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==============================
// THEME TOGGLE
// ==============================
const themeButton = document.getElementById('theme-toggle');
const html = document.documentElement;

// Function to apply a theme
function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if(themeButton) themeButton.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Load saved theme or default to light
const savedTheme = localStorage.getItem('theme');
if(savedTheme) {
  setTheme(savedTheme);
} else {
  setTheme('light');
}

// Toggle on button click
if(themeButton){
  themeButton.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'light' ? 'dark' : 'light');
  });
}


// ==============================
// MOBILE MENU TOGGLE
// ==============================
const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');

menuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// ==============================
// CONTACT FORM
// ==============================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const full_name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;

    const { error } = await supabase
      .from('contacts')
      .insert([{ full_name, email, message }]);

    if (error) alert('Error sending message: ' + error.message);
    else {
      alert('Message sent successfully!');
      contactForm.reset();
    }
  });
}

// ==============================
// APPLY FORM
// ==============================
const applyForm = document.getElementById('apply-form');
if (applyForm) {
  applyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const full_name = document.getElementById('apply-name').value;
    const email = document.getElementById('apply-email').value;
    const phone = document.getElementById('apply-phone').value;
    const position = document.getElementById('apply-position').value;
    const resumeFile = document.getElementById('apply-resume').files[0];

    let resume_url = '';
    if (resumeFile) {
      const { data, error } = await supabase.storage
        .from('resumes')
        .upload(`resumes/${Date.now()}_${resumeFile.name}`, resumeFile);

      if (error) {
        alert('Error uploading resume: ' + error.message);
        return;
      }
      resume_url = data.path;
    }

    const { error } = await supabase
      .from('applications')
      .insert([{ full_name, email, phone, position, resume_url }]);

    if (error) alert('Error submitting application: ' + error.message);
    else {
      alert('Application submitted successfully!');
      applyForm.reset();
    }
  });
}
