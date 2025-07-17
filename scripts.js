// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
        }
    });
});

// EmailJS Configuration
(function () {
    // Initialize EmailJS when the page loads
    emailjs.init("wrwopFKbMAZ-HbBqz"); // Replace with your actual EmailJS public key
})();

// Contact form handling with EmailJS
document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Get form data
    const formData = new FormData(this);
    const templateParams = {
        name: formData.get('name'),
        from_email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        to_email: 'harshitajn18@gmail.com'
    };

    try {
        // Send email using EmailJS
        const response = await emailjs.send(
            'service_np522vh',    // Replace with your EmailJS service ID
            'template_70yfhof',   // Replace with your EmailJS template ID
            templateParams
        );

        console.log('Email sent successfully:', response);

        // Show success message
        showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');

        // Reset form
        this.reset();

    } catch (error) {
        console.error('EmailJS failed:', error);

        // Fallback to mailto
        const mailtoLink = `mailto:harshitajn18@gmail.com?subject=${encodeURIComponent(templateParams.subject)}&body=${encodeURIComponent(`Name: ${templateParams.from_name}\nEmail: ${templateParams.from_email}\n\nMessage:\n${templateParams.message}`)}`;
        window.location.href = mailtoLink;

        showMessage('Email client opened! Please send the email to complete your message.', 'info');
        this.reset();
    }

    // Reset button state
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
});

// Function to show messages
function showMessage(text, type) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.contact-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = 'contact-message mt-4 p-4 rounded-lg';

    if (type === 'success') {
        messageDiv.className += ' bg-green-100 text-green-800 border border-green-200';
        messageDiv.innerHTML = `
                    <div class="flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>${text}</span>
                    </div>
                `;
    } else if (type === 'info') {
        messageDiv.className += ' bg-blue-100 text-blue-800 border border-blue-200';
        messageDiv.innerHTML = `
                    <div class="flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>${text}</span>
                    </div>
                `;
    } else {
        messageDiv.className += ' bg-red-100 text-red-800 border border-red-200';
        messageDiv.innerHTML = `
                    <div class="flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>${text}</span>
                    </div>
                `;
    }

    // Insert message after the form
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(messageDiv, form.nextSibling);

    // Auto-hide message after 8 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 8000);
}

// Add scroll effect to navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('shadow-lg');
    } else {
        nav.classList.remove('shadow-lg');
    }
});



// Project card click functionality
document.addEventListener('DOMContentLoaded', function () {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', function () {
            const details = this.querySelector('.project-details');
            const icon = this.querySelector('.icon-toggle');
            const label = this.querySelector('.label-toggle');
            const isExpanded = !details.classList.contains('hidden');

            // Close other cards
            projectCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.querySelector('.project-details').classList.add('hidden');
                    otherCard.classList.remove('ring-2', 'ring-accent');
                    const otherIcon = otherCard.querySelector('.icon-toggle');
                    const otherLabel = otherCard.querySelector('.label-toggle');
                    if (otherIcon) otherIcon.classList.remove('rotate-180');
                    if (otherLabel) otherLabel.textContent = 'Click to expand';
                }
            });

            // Toggle current card
            if (isExpanded) {
                details.classList.add('hidden');
                this.classList.remove('ring-2', 'ring-accent');
                if (icon) icon.classList.remove('rotate-180');
                if (label) label.textContent = 'Click to expand';
            } else {
                details.classList.remove('hidden');
                this.classList.add('ring-2', 'ring-accent');
                if (icon) icon.classList.add('rotate-180');
                if (label) label.textContent = 'Click to collapse';
            }
        });
    });
});

