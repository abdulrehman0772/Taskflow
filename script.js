document.addEventListner('DOMContentLoaded', () => {
    const form = document.querySelector('login-form');
    if (!form) return;
 
    function showError(input, message ) {
        const group  = input.parentElement;
        let error = group.querySelector('.error-text');
        if (!error) {
            error = document.createElement('span');
            error.className = 'error-text';
            error.style.color = '#D9534F';
            error.style.fontSize= '13px';
            error.style.display='block';
            error.style.marginTop= '6px';
            group.appendChild(error) ;
        }
        error.textContent = message;
        input.style.borderColor = #D9534F;
    }
    const fullNameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const passwordInputs = form.querySelector('#password');
    
    if (fullNameInput && passwordInputs.length === 2 ){
        const passwordInput= passwordInputs[0];
        const confirmPasswordInput = confirmPasswordInputs [1];

         form.addEventListener('submit', async (e) => {
            e.preventDefault();
             const fullName = fullNameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

             if (password.length < 6) {
                showError(passwordInput, 'Password must be at least 6 characters');
                return;
            }
              if (password !== confirmPassword) {
                showError(confirmPasswordInput, "Passwords don't match");
                return;
            }
            try {
                const checkResponse = await fetch(
                        `http://localhost:3000/users?email=${encodeURIComponent(email)}`
                );

                const existingUsers = await checkResponse.json();
                if (existingUsers.length > 0) {
                    showError(emailInput, 'Email already registered');
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

                alert('Account created successfully!');

                window.location.href = './login.html';
            }
              catch (error) {
                console.error(error);
                alert('JSON Server connection failed!');
            }
        });

    }
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

                    window.location.href = './dashboard.html';

                } else {
                    showError(emailInput, 'Invalid email or password');
                }

             catch (error) {
                console.error(error);
                alert('JSON Server connection failed!');
            }
        });

    }


});
 




