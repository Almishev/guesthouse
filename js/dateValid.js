
  document.addEventListener("DOMContentLoaded", function() {
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    const phoneInput = document.getElementById('phone');
    const phoneErrorSpan = document.createElement('span');
    phoneErrorSpan.textContent = 'Моля въведете валиден телефонен номер';
    phoneErrorSpan.style.color = 'red';
    phoneErrorSpan.style.display = 'none';
    phoneInput.parentNode.insertBefore(phoneErrorSpan, phoneInput.nextSibling);

    // Set minimum check-in date as one day after today
    const minCheckInDate = new Date();
    minCheckInDate.setDate(minCheckInDate.getDate());
    checkInInput.min = minCheckInDate.toISOString().split("T")[0];

    // Set minimum check-out date based on the selected check-in date
    checkInInput.addEventListener('change', function() {
      checkOutInput.min = new Date(checkInInput.valueAsDate.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      checkOutInput.value = '';
    });

    // Add validation for check-out date to be at least two days after check-in date
    checkOutInput.addEventListener('change', function() {
      const checkOutDate = new Date(checkOutInput.valueAsDate);
      const checkInDate = new Date(checkInInput.valueAsDate);
      const minCheckOutDate = new Date(checkInDate.getTime() + 2 * 24 * 60 * 60 * 1000);

      if (checkOutDate < minCheckOutDate) {
        alert('Check-out date must be at least two days after check-in date');
        checkOutInput.value = '';
      }
    });

    // Add validation for phone number using regex
    phoneInput.addEventListener('blur', function() {
      const phoneNumber = phoneInput.value.trim();
      const phonePattern = /^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{5})$/;

      if (!phonePattern.test(phoneNumber)) {
        phoneErrorSpan.style.display = 'inline';
        phoneInput.value = '';
        phoneInput.focus();
      } else {
        phoneErrorSpan.style.display = 'none';
      }
    });
  });

