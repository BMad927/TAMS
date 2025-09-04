// -----------------------------
// Supabase client
// -----------------------------
const SUPABASE_URL = 'https://frmsjykcwzklqzaxfiyq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZybXNqeWtjd3prbHF6YXhmaXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5MDgzMjEsImV4cCI6MjA3MjQ4NDMyMX0.v7pwM3qU8RzHKe0RYuMq0hSG95sKzwLH4LYCRvZyFNo';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// -----------------------------
// Theme toggle
// -----------------------------
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === 'light' ? 'dark' : 'light';
});

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

    const { data, error } = await supabase
      .from('contacts')
      .insert([{ name, email, message }]);

    if (error) {
      alert('Error sending message: ' + error.message);
    } else {
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

    if (!resumeFile) {
      alert('Please upload a resume file.');
      return;
    }

    // Upload resume to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('resumes') // Make sure you created this bucket
      .upload(`resumes/${resumeFile.name}`, resumeFile, { upsert: true });

    if (uploadError) {
      alert('Error uploading resume: ' + uploadError.message);
      return;
    }

    // Get public URL
    const { data: publicData } = supabase.storage.from('resumes').getPublicUrl(`resumes/${resumeFile.name}`);
    const resume_url = publicData.publicUrl;

    // Insert application into Supabase table
    const { data, error } = await supabase
      .from('applications')
      .insert([{ full_name: name, email, phone, position, resume_url }]);

    if (error) {
      alert('Error submitting application: ' + error.message);
    } else {
      alert('Application submitted successfully!');
      applyForm.reset();
    }
  });
}
