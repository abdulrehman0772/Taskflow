



    const form = document.querySelector('.login-form');

    if (form) {

    // ERROR FUNCTION

    function showError(input, message) {
        const group = input.parentElement;

        let error = group.querySelector('.error-text');

        if (!error) {
            error = document.createElement('span');
            error.className = 'error-text';
            error.style.color = '#D9534F';
            error.style.fontSize = '13px';
            error.style.display = 'block';
            error.style.marginTop = '6px';
            group.appendChild(error);
        }
        


        error.textContent = message;
        input.style.borderColor = '#D9534F';
    }
    //Login page error 
    function showLoginError(input, message) {
        const oldBanner = form.querySelector('.login-error-banner');
        if (oldBanner) oldBanner.remove();

        const banner = document.createElement('div');
        banner.className = 'login-error-banner';
        banner.style.display = 'flex';
        banner.style.alignItems = 'center';
        banner.style.gap = '10px';
        banner.style.padding = '12px 16px';
        banner.style.marginBottom = '20px';
        banner.style.background = 'rgba(251, 234, 230, 1)';
        banner.style.border = '1px solid rgba(194, 65, 45, 1)';
        banner.style.borderRadius = '8px';
        banner.style.color = 'rgba(194, 65, 45, 1)';
        banner.style.fontSize = '14px';

        // ICON (this replaces the old banner.innerHTML lines)
        const icon = document.createElement('span');
        icon.textContent = '!';
        icon.style.display = 'flex';
        icon.style.alignItems = 'center';
        icon.style.justifyContent = 'center';
        icon.style.width = '18px';
        icon.style.height = '18px';
        icon.style.boxSizing = 'border-box';
        icon.style.border = '2px solid #C0392B';
        icon.style.borderRadius = '50%';
        icon.style.fontSize = '12px';
        icon.style.fontWeight = 'bold';
        icon.style.flexShrink = '0';
        banner.appendChild(icon);

        

        const text = document.createElement('span');
        text.textContent = message;
        banner.appendChild(text);

        input.parentElement.before(banner);
    }
        

    

    const fullNameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const passwordInputs = form.querySelectorAll('#password');

    if (fullNameInput && passwordInputs.length === 2) {

        const passwordInput = passwordInputs[0];
        const confirmPasswordInput = passwordInputs[1];

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            form.querySelectorAll('.error-text').forEach(error => {
                error.remove();
            });

            form.querySelectorAll('input').forEach(input => {
                input.style.borderColor = '';
            });

            const fullName = fullNameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
             
try {
                const checkResponse = await fetch(
                    `http://localhost:3000/users?email=${encodeURIComponent(email)}`
                );
           
 const existingUsers = await checkResponse.json();

                if (existingUsers.length > 0) {
                    showError(emailInput, 'An account with this email already exists');
                    return;
                }

               
            if (password.length < 6) {
                showError(passwordInput, 'Password must be at least 6 characters');
                return;
            }

            if (password !== confirmPassword) {
                showError(confirmPasswordInput, "Passwords don't match");
                return;
            }
             
                
                const response = await fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fullName,
                        email,
                        password
                    })
                });

           

                if (!response.ok) throw new Error('Signup failed');

const newUser = await response.json();

localStorage.setItem(
    'loggedInUser',
    JSON.stringify(newUser)
);

alert('Account created successfully!');

window.location.href = './empty-task.html';

            } catch (error) {
                console.error(error);
                alert('JSON Server connection failed!');
            }
        });

    }

    // LOGIN PAGE

    else if (emailInput && passwordInputs.length === 1) {

        const passwordInput = passwordInputs[0];

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value;

            try {
                const response = await fetch(
                    `http://localhost:3000/users?email=${encodeURIComponent(email)}`
                );

                if (!response.ok) throw new Error('Server error');

                const users = await response.json();

                const matchedUser = users.find(
                    user =>
                        user.email.toLowerCase() === email.toLowerCase() &&
                        user.password === password
                );

                if (matchedUser) {

                    localStorage.setItem(
                        'loggedInUser',
                        JSON.stringify(matchedUser)
                    );

                    window.location.href = './empty-task.html';

                } else {
                    showLoginError(emailInput, 'Invalid email or password');
                }

            } catch (error) {
                console.error(error);
                alert('JSON Server connection failed!');
            }
        });

    }

};
