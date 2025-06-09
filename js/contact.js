// Contact Form JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Contact Form Validation
  const contactForm = document.querySelector('#contactForm');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form fields
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const phoneInput = document.querySelector('#phone');
    const subjectInput = document.querySelector('#subject');
    const messageInput = document.querySelector('#message');
    
    // Reset previous error messages
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => element.remove());
    
    // Reset form field styles
    const formFields = contactForm.querySelectorAll('.form-control');
    formFields.forEach(field => {
      field.classList.remove('error');
      field.classList.remove('success');
    });
    
    // Validation flags
    let isValid = true;
    
    // Validate Name
    if (!nameInput.value.trim()) {
      showError(nameInput, 'Por favor, informe seu nome');
      isValid = false;
    } else {
      showSuccess(nameInput);
    }
    
    // Validate Email
    if (!emailInput.value.trim()) {
      showError(emailInput, 'Por favor, informe seu e-mail');
      isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
      showError(emailInput, 'Por favor, informe um e-mail válido');
      isValid = false;
    } else {
      showSuccess(emailInput);
    }
    
    // Validate Phone (optional)
    if (phoneInput.value.trim() && !isValidPhone(phoneInput.value)) {
      showError(phoneInput, 'Por favor, informe um telefone válido');
      isValid = false;
    } else if (phoneInput.value.trim()) {
      showSuccess(phoneInput);
    }
    
    // Validate Subject
    if (!subjectInput.value.trim()) {
      showError(subjectInput, 'Por favor, informe o assunto');
      isValid = false;
    } else {
      showSuccess(subjectInput);
    }
    
    // Validate Message
    if (!messageInput.value.trim()) {
      showError(messageInput, 'Por favor, escreva sua mensagem');
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      showError(messageInput, 'A mensagem deve ter pelo menos 10 caracteres');
      isValid = false;
    } else {
      showSuccess(messageInput);
    }
    
    // If form is valid, submit it
    if (isValid) {
      // Show loading state
      const submitBtn = contactForm.querySelector('.form-submit');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual form submission)
      setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Remove success styles
        formFields.forEach(field => {
          field.classList.remove('success');
        });
        
        // Show success message
        const formResponse = document.createElement('div');
        formResponse.className = 'form-response success';
        formResponse.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
        contactForm.appendChild(formResponse);
        
        // Reset button
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          formResponse.remove();
        }, 5000);
      }, 1500);
    }
  });
  
  // Helper Functions
  function showError(input, message) {
    const formGroup = input.closest('.form-group');
    input.classList.add('error');
    
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    
    formGroup.appendChild(errorMessage);
  }
  
  function showSuccess(input) {
    input.classList.add('success');
  }
  
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  function isValidPhone(phone) {
    // Basic Brazilian phone validation (accepts formats like: (11) 98765-4321 or 11987654321)
    const re = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
    return re.test(String(phone));
  }
  
  // Real-time validation
  const formInputs = contactForm.querySelectorAll('.form-control');
  
  formInputs.forEach(input => {
    input.addEventListener('blur', function() {
      // Remove previous error message
      const formGroup = this.closest('.form-group');
      const errorMessage = formGroup.querySelector('.error-message');
      
      if (errorMessage) {
        errorMessage.remove();
      }
      
      // Reset styles
      this.classList.remove('error');
      this.classList.remove('success');
      
      // Validate field
      switch (this.id) {
        case 'name':
          if (!this.value.trim()) {
            showError(this, 'Por favor, informe seu nome');
          } else {
            showSuccess(this);
          }
          break;
          
        case 'email':
          if (!this.value.trim()) {
            showError(this, 'Por favor, informe seu e-mail');
          } else if (!isValidEmail(this.value)) {
            showError(this, 'Por favor, informe um e-mail válido');
          } else {
            showSuccess(this);
          }
          break;
          
        case 'phone':
          if (this.value.trim() && !isValidPhone(this.value)) {
            showError(this, 'Por favor, informe um telefone válido');
          } else if (this.value.trim()) {
            showSuccess(this);
          }
          break;
          
        case 'subject':
          if (!this.value.trim()) {
            showError(this, 'Por favor, informe o assunto');
          } else {
            showSuccess(this);
          }
          break;
          
        case 'message':
          if (!this.value.trim()) {
            showError(this, 'Por favor, escreva sua mensagem');
          } else if (this.value.trim().length < 10) {
            showError(this, 'A mensagem deve ter pelo menos 10 caracteres');
          } else {
            showSuccess(this);
          }
          break;
      }
    });
  });
});

