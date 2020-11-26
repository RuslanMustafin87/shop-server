const formSignIn = document.getElementById('formSignIn');
const buttonSubmit = document.getElementById('button-submit');
console.log(buttonSubmit);

buttonSubmit.addEventListener('click', (event) => {
    //event.preventDefault();
   
    const body = JSON.stringify({
        user: formSignIn.user.value,
        password: formSignIn.password.value,
    });

    formSignIn.user.value = '';
    formSignIn.password.value = '';

    fetch('http://localhost:3007/signin', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: body
    }).then(
        () => {
            console.log('Yes');
        }
    )
})