// ===== Theme Toggle =====
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

themeToggle.addEventListener('click', () => {
  const currentTheme = root.getAttribute('data-theme');
  root.setAttribute('data-theme', currentTheme === 'light' ? 'dark' : 'light');
});

// ===== Supabase Setup =====
const SUPABASE_URL = 'https://frmsjykcwzklqzaxfiyq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybXNqeWtjd3prbHF6YXhmaXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5MDgzMjEsImV4cCI6MjA3MjQ4NDMyMX0.v7pwM3qU8RzHKe0RYuMq0hSG95sKzwLH4LYCRvZyFNo';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ===== Contact Form =====
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = contactForm.name.value;
  const email = contactForm.email.value;
  const message = contactForm.message.value;

  const { error } = await supabase
    .from('contacts')
    .insert([{ name, email, message }]);

  if (error) alert('Error sending message: ' + error.message);
  else {
    alert('Message sent!');
    contactForm.reset();
  }
});

// ===== Apply Form =====
const applyForm = document.getElementById('apply-form');
applyForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fullname = applyForm.fullname.value;
  const email = applyForm.email.value;
  const phone = applyForm.phone.value;
  const position = applyForm.position.value;

  // NOTE: Resume uploads require extra setup; here we only save metadata
  const { error } = await supabase
    .from('applications')
    .insert([{ fullname, email, phone, position }]);

  if (error) alert('Error submitting application: ' + error.message);
  else {
    alert('Application submitted!');
    applyForm.reset();
  }
});

// ===== Theme Toggle =====
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
const themeIcon = document.getElementById('theme-icon');

themeToggle.addEventListener('click', () => {
  const currentTheme = root.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', newTheme);

  // Optionally rotate the icon or change color
  themeIcon.style.transform = newTheme === 'dark' ? 'rotate(180deg)' : 'rotate(0deg)';
});
