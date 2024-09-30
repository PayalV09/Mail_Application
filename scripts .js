document.getElementById('mail-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Show the loader while sending the email
    document.getElementById('loader').classList.remove('hidden');
    
    // Simulate sending email (you can replace this with an actual API call)
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
        showToast('Email sent successfully!');
    }, 2000);
});

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Theme Toggle (Dark/Light Mode)
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});
