document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form form');
  const selectedOption = document.querySelector('.selected');
  const defaultOptionText = "Choose your photoshoot package";
  
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
      const select = dropdown.querySelector('.select');
      const caret = dropdown.querySelector('.caret');
      const menu = dropdown.querySelector('.menu');
      const options = dropdown.querySelectorAll('.menu li');
    
      select.addEventListener('click', () => {
          select.classList.toggle('select-clicked');
          caret.classList.toggle('caret-rotate');
          menu.classList.toggle('menu-open');
      });

      options.forEach(option => {
          option.addEventListener('click', (e) => {
              selectedOption.innerText = e.target.innerText;
              select.classList.remove('select-clicked');
              caret.classList.remove('caret-rotate');
              menu.classList.remove('menu-open');
          });
      });
  });

  function sendEmail() {
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      const choice = document.getElementById('choice');
      const subject = document.getElementById('subject');

      const bodyMessage = `Email: ${email.value}<br> Message: ${message.value}<br> Choice: ${choice.innerText}<br>`

      Email.send({
           Host : "smtp.elasticemail.com",
          Username : "Username",
          Password : "Password",
          To : 'Email',
          From : "Email",
          Subject : subject.value,
          Body : bodyMessage
      }).then(
          message => {
              if (message === "OK") {
                  Swal.fire({
                      title: "Booking Request Sent!",
                      text: "Thank you for your interest in the car photoshoot. I'll be in touch soon.",
                      icon: "success"
                  });
              }
          }
      );
  }

  form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (selectedOption.innerText === defaultOptionText) {
          Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Please select a photoshoot package before submitting."
          });
      } else {
          sendEmail();
          form.reset();
          selectedOption.innerText = defaultOptionText;
          return false;
      }
  });
});
