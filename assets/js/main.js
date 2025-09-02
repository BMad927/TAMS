// Simple client-side demo behavior for "Apply Now" and contact forms.
// Submissions are saved to localStorage so you can show them during the presentation.
document.addEventListener('DOMContentLoaded', function(){
  const applyForm = document.getElementById('applyForm');
  const formMsg = document.getElementById('formMsg');
  if (applyForm){
    applyForm.addEventListener('submit', function(e){
      e.preventDefault();
      const data = {
        name: document.getElementById('fullname').value,
        phone: document.getElementById('phone').value,
        position: document.getElementById('position').value,
        location: document.getElementById('location').value,
        resume: document.getElementById('resume').value,
        ts: new Date().toISOString()
      };
      let arr = JSON.parse(localStorage.getItem('tass_applications') || '[]');
      arr.unshift(data);
      localStorage.setItem('tass_applications', JSON.stringify(arr));
      formMsg.style.display = 'block';
      formMsg.className = 'alert alert-success';
      formMsg.innerText = 'Application saved (demo). You can show this during your presentation.';
      applyForm.reset();
    });
    const showSaved = document.getElementById('showSaved');
    showSaved && showSaved.addEventListener('click', function(){
      const arr = JSON.parse(localStorage.getItem('tass_applications') || '[]');
      if (!arr.length) {
        alert('No saved demo applications in this browser.');
        return;
      }
      let s = arr.slice(0,10).map((x,i)=> (i+1)+'. '+x.name+' — '+x.position+' — '+x.ts).join('\n');
      alert('Saved demo applications:\n\n'+s);
    });
  }

  const inquiryForm = document.getElementById('inquiryForm');
  const inquiryMsg = document.getElementById('inquiryMsg');
  if (inquiryForm){
    inquiryForm.addEventListener('submit', function(e){
      e.preventDefault();
      inquiryMsg.style.display = 'block';
      inquiryMsg.className = 'alert alert-info';
      inquiryMsg.innerText = 'Inquiry captured (demo). For a live site this would send to your email or CRM.';
      inquiryForm.reset();
    });
  }
});
