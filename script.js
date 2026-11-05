document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    
    const emailInput = document.querySelector('input[id="email"]');
    const passwordInputs = document.querySelectorAll('input[id="password"]');
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = passwordInputs[1];

    
    function setError(input, message) {
        const formGroup = input.parentElement;
        
        input.style.borderColor = '#D9534F';
        input.style.backgroundColor = '#FDF2F0';

        
        let errorElement = formGroup.querySelector('.error-text');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-text';
            errorElement.style.color = '#D9534F';
            errorElement.style.fontSize = '13px';
            errorElement.style.marginTop = '6px';
            errorElement.style.fontFamily = 'DM SANS';
            errorElement.style.display = 'block';
            formGroup.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

   
    function clearError(input) {
        const formGroup = input.parentElement;
        input.style.borderColor = '';
        input.style.backgroundColor = '';
        
        const errorElement = formGroup.querySelector('.error-text');
        if (errorElement) {
            errorElement.remove();
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        let isValid = true;

        
        clearError(emailInput);
        clearError(passwordInput);
        clearError(confirmPasswordInput);

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (password.length < 6) {
            setError(passwordInput, "Password must be at least 6 characters");
            isValid = false;
        }

        if (password !== confirmPassword) {
            setError(confirmPasswordInput, "Passwords don't match");
            isValid = false;
        }

        try {
            const response = await fetch('db.json');
            const data = await response.json();
            const users = data.users || [];

            const emailExists = users.some(user => user.email.toLowerCase() === email.toLowerCase());
            if (emailExists) {
                setError(emailInput, "An account with this email already exists");
                isValid = false;
            }
        } catch (error) {
            console.error("Could not fetch db.json:", error);
        }

        if (isValid) {
            alert("Account created successfully!");
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#login-form');
    const emailInput = document.querySelector('input[id="email"]');
    const passwordInput = document.querySelector('input[id="password"]');

    function showBannerError(message) {
        let banner = form.querySelector('.error-banner');
        
        
        if (!banner) {
            banner = document.createElement('div');
            banner.className = 'error-banner';
            banner.style.backgroundColor = '#FDF2F0';
            banner.style.border = '1px solid #D9534F';
            banner.style.color = '#D9534F';
            banner.style.padding = '12px 16px';
            banner.style.borderRadius = '8px';
            banner.style.marginBottom = '20px';
            banner.style.display = 'flex';
            banner.style.alignItems = 'center';
            banner.style.gap = '10px';
            banner.style.fontSize = '14px';
            
           
            form.prepend(banner);
        }

        banner.innerHTML = `
            <svg  width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <span>${message}</span>
        `;

        
    }

    
    function clearBannerError() {
        const banner = form.querySelector('.error-banner');
        if (banner) {
            banner.remove();
        }
        emailInput.style.borderColor = '';
        passwordInput.style.borderColor = '';
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearBannerError();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        try {
            const response = await fetch('db.json');
            const data = await response.json();
            const users = data.users || [];

            const matchedUser = users.find(
                user => user.email.toLowerCase() === email.toLowerCase() && user.password === password
            );

            if (matchedUser) {
                alert(`Welcome back, ${matchedUser.fullName}! Login successful.`);
            } else {
                showBannerError("Invalid email or password");
            }
        } catch (error) {
            console.error("Could not connect to db.json:", error);
            showBannerError("An error occurred. Please try again later.");
        }
    });
});