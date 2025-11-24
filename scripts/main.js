/**
 * Dana Manciagli Professional Legacy Site
 * Main JavaScript - Interactive Features
 */

// ========================================
// Smooth Scroll & Navigation
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  initSmoothScroll();
  initMobileMenu();
  initScrollEffects();
  initContactForm();
  initAnimations();
});

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Skip if href is just "#"
      if (href === '#') {
        e.preventDefault();
        return;
      }

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();

        // Close mobile menu if open
        const navMenu = document.getElementById('nav-menu');
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
        }

        // Smooth scroll with offset for fixed nav
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    // Toggle menu open/closed
    const toggleMenu = function(shouldClose = false) {
      const isExpanded = navMenu.classList.contains('active');

      if (shouldClose || isExpanded) {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        const icon = navToggle.querySelector('.nav__toggle-icon');
        if (icon) icon.classList.remove('active');
      } else {
        navMenu.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        const icon = navToggle.querySelector('.nav__toggle-icon');
        if (icon) icon.classList.add('active');
      }
    };

    // Click to toggle
    navToggle.addEventListener('click', function() {
      toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        toggleMenu(true);
      }
    });

    // Close menu with Escape key (WCAG 2.1 AA - Keyboard Accessible)
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMenu(true);
        navToggle.focus(); // Return focus to toggle button
      }
    });
  }
}

/**
 * Initialize scroll effects (navbar shadow, fade-in animations)
 */
function initScrollEffects() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    // Add shadow to navbar on scroll
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    '.stat, .highlight, .expertise__item, .service, .testimonial, .achievement'
  );

  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    observer.observe(el);
  });

  // Animate stat numbers with count-up effect
  const statNumbers = document.querySelectorAll('.stat__number');
  const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        animateStatNumber(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => {
    statsObserver.observe(num);
  });
}

/**
 * Animate stat numbers with count-up effect
 */
function animateStatNumber(element) {
  const text = element.textContent;
  const hasPlus = text.includes('+');
  const hasComma = text.includes(',');
  const targetNumber = parseInt(text.replace(/[^0-9]/g, ''), 10);

  if (isNaN(targetNumber)) return;

  const duration = 2000; // 2 seconds
  const startTime = Date.now();
  const step = targetNumber / (duration / 16); // 60fps

  let currentNumber = 0;

  function updateNumber() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    currentNumber = Math.floor(targetNumber * easeOutQuart);

    // Format number with comma if original had comma
    let displayNumber = currentNumber.toString();
    if (hasComma && currentNumber >= 1000) {
      displayNumber = currentNumber.toLocaleString();
    }

    // Add plus if original had plus
    if (hasPlus) {
      displayNumber += '+';
    }

    element.textContent = displayNumber;

    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    } else {
      // Ensure final number matches exactly
      let finalDisplay = targetNumber.toString();
      if (hasComma) {
        finalDisplay = targetNumber.toLocaleString();
      }
      if (hasPlus) {
        finalDisplay += '+';
      }
      element.textContent = finalDisplay;
    }
  }

  updateNumber();
}

/**
 * Initialize fade-in animation styles
 */
function initAnimations() {
  // Add CSS for fade-in animation
  const style = document.createElement('style');
  style.textContent = `
    .fade-in {
      animation: fadeInUp 0.6s ease forwards;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
}

/**
 * Initialize contact form handling
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const inquiryTypeSelect = document.getElementById('inquiry-type');
  const otherInquiryGroup = document.getElementById('other-inquiry-group');
  const otherInquiryInput = document.getElementById('other-inquiry');

  if (form) {
    // Handle "Other" inquiry type selection
    if (inquiryTypeSelect && otherInquiryGroup && otherInquiryInput) {
      inquiryTypeSelect.addEventListener('change', function() {
        if (this.value === 'other') {
          otherInquiryGroup.style.display = 'block';
          otherInquiryInput.required = true;
        } else {
          otherInquiryGroup.style.display = 'none';
          otherInquiryInput.required = false;
          otherInquiryInput.value = '';
        }
      });
    }

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Validate form
      if (validateForm(data)) {
        // Submit to Netlify Forms
        handleNetlifyFormSubmission(form, formData);
      }
    });
  }
}

/**
 * Sanitize user input to prevent XSS attacks
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') return input;

  // Create a temporary element to use browser's built-in sanitization
  const temp = document.createElement('div');
  temp.textContent = input;
  return temp.innerHTML;
}

/**
 * Validate contact form data
 */
function validateForm(data) {
  let isValid = true;
  const errors = [];

  // Sanitize all input fields
  Object.keys(data).forEach(key => {
    if (typeof data[key] === 'string') {
      data[key] = sanitizeInput(data[key]);
    }
  });

  // Required fields
  if (!data.name || data.name.trim() === '') {
    errors.push('Name is required');
    isValid = false;
  } else if (data.name.length > 100) {
    errors.push('Name must be less than 100 characters');
    isValid = false;
  }

  if (!data.email || data.email.trim() === '') {
    errors.push('Email is required');
    isValid = false;
  } else if (!isValidEmail(data.email)) {
    errors.push('Please enter a valid email address');
    isValid = false;
  } else if (data.email.length > 254) {
    errors.push('Email address is too long');
    isValid = false;
  }

  if (!data['inquiry-type'] || data['inquiry-type'] === '') {
    errors.push('Please select an inquiry type');
    isValid = false;
  }

  // Validate "other" inquiry field if "Other" is selected
  if (data['inquiry-type'] === 'other') {
    if (!data['other-inquiry'] || data['other-inquiry'].trim() === '') {
      errors.push('Please specify your inquiry type');
      isValid = false;
    } else if (data['other-inquiry'].length > 200) {
      errors.push('Inquiry specification is too long');
      isValid = false;
    }
  }

  if (!data.message || data.message.trim() === '') {
    errors.push('Message is required');
    isValid = false;
  } else if (data.message.length > 5000) {
    errors.push('Message is too long (maximum 5000 characters)');
    isValid = false;
  }

  // Display errors if any
  if (!isValid) {
    showFormErrors(errors);
  }

  return isValid;
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Show form validation errors
 */
function showFormErrors(errors) {
  // Remove existing error messages
  const existingError = document.querySelector('.form__error');
  if (existingError) {
    existingError.remove();
  }

  // Create error message element with ARIA live region
  const errorDiv = document.createElement('div');
  errorDiv.className = 'form__error';
  errorDiv.setAttribute('role', 'alert');
  errorDiv.setAttribute('aria-live', 'assertive');
  errorDiv.setAttribute('aria-atomic', 'true');
  errorDiv.style.cssText = `
    background-color: #fee;
    color: #c33;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    border: 1px solid #fcc;
  `;

  const errorList = document.createElement('ul');
  errorList.style.cssText = 'margin: 0; padding-left: 1.5rem;';

  errors.forEach(error => {
    const li = document.createElement('li');
    li.textContent = error;
    errorList.appendChild(li);
  });

  errorDiv.appendChild(errorList);

  // Insert error message at top of form
  const form = document.getElementById('contact-form');
  form.insertBefore(errorDiv, form.firstChild);

  // Scroll to error message
  errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Focus on first error for keyboard users
  const firstInput = form.querySelector('.form__input:invalid, .form__select:invalid');
  if (firstInput) {
    setTimeout(() => firstInput.focus(), 100);
  }
}

/**
 * Handle form submission to Netlify Forms
 */
function handleNetlifyFormSubmission(form, formData) {
  // Disable submit button to prevent double submission
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';

  // Submit form data to Netlify
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData).toString()
  })
  .then(response => {
    if (response.ok) {
      showFormSuccess();
      form.reset();

      // Hide the "other inquiry" field if it was shown
      const otherInquiryGroup = document.getElementById('other-inquiry-group');
      if (otherInquiryGroup) {
        otherInquiryGroup.style.display = 'none';
      }
    } else {
      throw new Error('Form submission failed');
    }
  })
  .catch(error => {
    console.error('Form submission error:', error);
    showFormErrors(['An error occurred while submitting the form. Please try emailing Dana@Danamanciagli.com directly or try again later.']);
  })
  .finally(() => {
    // Re-enable submit button
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  });
}

/**
 * Handle form submission (legacy - kept for reference)
 * NOTE: Now using handleNetlifyFormSubmission for production
 */
function handleFormSubmission(data) {
  console.log('Form submitted with data:', data);

  // Show success message
  showFormSuccess();

  // Reset form
  document.getElementById('contact-form').reset();
}

/**
 * Show form success message
 */
function showFormSuccess() {
  // Remove existing messages
  const existingMessage = document.querySelector('.form__error, .form__success');
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create success message with ARIA live region
  const successDiv = document.createElement('div');
  successDiv.className = 'form__success';
  successDiv.setAttribute('role', 'status');
  successDiv.setAttribute('aria-live', 'polite');
  successDiv.setAttribute('aria-atomic', 'true');
  successDiv.style.cssText = `
    background-color: #efe;
    color: #3a3;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    border: 1px solid #cfc;
    text-align: center;
    font-weight: 600;
  `;

  successDiv.innerHTML = `
    <p style="margin: 0 0 0.5rem 0; font-size: 1.125rem;">✓ Message sent successfully!</p>
    <p style="margin: 0; font-weight: 400; font-size: 0.875rem;">Thank you for reaching out. Dana will review your message and respond within 3-5 business days.</p>
  `;

  // Insert success message at top of form
  const form = document.getElementById('contact-form');
  form.insertBefore(successDiv, form.firstChild);

  // Scroll to success message
  successDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Focus on success message for screen reader announcement
  successDiv.setAttribute('tabindex', '-1');
  setTimeout(() => successDiv.focus(), 100);

  // Remove success message after 10 seconds
  setTimeout(() => {
    successDiv.style.transition = 'opacity 0.5s ease';
    successDiv.style.opacity = '0';
    setTimeout(() => successDiv.remove(), 500);
  }, 10000);
}

// ========================================
// Utility Functions
// ========================================

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// ========================================
// Performance Optimization
// ========================================

// Lazy load images when they come into viewport
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}