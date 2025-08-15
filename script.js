// Resume Download Functionality
function downloadResume() {
    // Create a temporary link element
    const link = document.createElement('a');
    
    // Set the download attribute and filename
    link.download = 'Vashishth_Prajapati_Resume.pdf';
    
    // Set the href to your local PDF file
    // Make sure the PDF file is in the same directory as your HTML file
    link.href = 'Vashishth_Prajapati_Latest_Resume.pdf';
    
    // Add the link to the document body temporarily
    document.body.appendChild(link);
    
    // Trigger the download
    link.click();
    
    // Remove the link from the document
    document.body.removeChild(link);
    
    // Optional: Show a success message
    showDownloadFeedback();
}

// Visual feedback for download action
function showDownloadFeedback() {
    const downloadBtn = document.querySelector('.download-btn');
    const originalText = downloadBtn.innerHTML;
    
    // Change button text temporarily
    downloadBtn.innerHTML = `
        <svg class="download-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        Downloaded!
    `;
    
    // Reset after 2 seconds
    setTimeout(() => {
        downloadBtn.innerHTML = originalText;
    }, 2000);
}

// Add click animation and feedback
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.querySelector('.download-btn');
    
    // Add click animation
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Scale animation
        this.style.transform = 'translateY(-1px) scale(0.98)';
        
        // Reset transform after animation
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Call download function after animation
        setTimeout(downloadResume, 200);
    });
    
    // Add smooth scroll behavior for any internal links (future use)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add hover effects for skills
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        skill.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Add fade-in animation on scroll (optional enhancement)
    const observeElements = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    observeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Handle keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const focused = document.activeElement;
        if (focused.classList.contains('download-btn')) {
            e.preventDefault();
            downloadResume();
        }
    }
});

// Error handling for download
window.addEventListener('error', function(e) {
    if (e.filename && e.filename.includes('Professional Modern CV Resume (1).pdf')) {
        console.error('PDF file not found. Please ensure the PDF file is in the same directory.');
        alert('Resume file not found. Please contact the developer.');
    }
});

// Optional: Add print functionality
function printResume() {
    window.print();
}

// Optional: Add email functionality
function emailResume() {
    const subject = encodeURIComponent('Resume - Vashishth R. Prajapati');
    const body = encodeURIComponent('Hello,\n\nPlease find my resume attached. You can also view it online at: ' + window.location.href + '\n\nBest regards,\nVashishth R. Prajapati');
    
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
}