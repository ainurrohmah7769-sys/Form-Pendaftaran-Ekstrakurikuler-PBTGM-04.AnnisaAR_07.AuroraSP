const form = document.getElementById('registrationForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const extracurricular = document.getElementById('extracurricular');
const successMessage = document.getElementById('success-message');

// Menampilkan indikator eror (border merah & pesan)
const showError = (input, message) => {
  const formGroup = input.parentElement.classList.contains('password-wrapper') 
    ? input.parentElement.parentElement 
    : input.parentElement;
  const small = formGroup.querySelector('.error-text');
  input.classList.remove('success');
  input.classList.add('error');
  small.innerText = message;
  formGroup.classList.add('show-error');
};

// Menampilkan indikator sukses (border hijau)
const showSuccess = (input) => {
  const formGroup = input.parentElement.classList.contains('password-wrapper') 
    ? input.parentElement.parentElement 
    : input.parentElement;
  input.classList.remove('error');
  input.classList.add('success');
  formGroup.classList.remove('show-error');
};

// Validasi Nama Lengkap
const checkFullName = () => {
  const val = fullName.value.trim();
  if (val === '') {
    showError(fullName, 'Nama lengkap tidak boleh kosong');
    return false;
  } else if (val.length < 3) {
    showError(fullName, 'Nama minimal terdiri dari 3 karakter');
    return false;
  } else {
    showSuccess(fullName);
    return true;
  }
};

// Validasi Email dengan Regular Expression
const checkEmail = () => {
  const val = email.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (val === '') {
    showError(email, 'Email tidak boleh kosong');
    return false;
  } else if (!emailPattern.test(val)) {
    showError(email, 'Format email tidak valid');
    return false;
  } else {
    showSuccess(email);
    return true;
  }
};

// Validasi Password
const checkPassword = () => {
  const val = password.value.trim();
  if (val === '') {
    showError(password, 'Password tidak boleh kosong');
    return false;
  } else if (val.length < 8) {
    showError(password, 'Password minimal 8 karakter');
    return false;
  } else {
    showSuccess(password);
    return true;
  }
};

// Validasi Konfirmasi Password
const checkConfirmPassword = () => {
  const passwordVal = password.value.trim();
  const confirmVal = confirmPassword.value.trim();

  if (confirmVal === '') {
    showError(confirmPassword, 'Konfirmasi password tidak boleh kosong');
    return false;
  } else if (confirmVal !== passwordVal) {
    showError(confirmPassword, 'Password tidak cocok');
    return false;
  } else {
    showSuccess(confirmPassword);
    return true;
  }
};

// Validasi Ekstrakurikuler
const checkExtracurricular = () => {
  if (extracurricular.value === '') {
    showError(extracurricular, 'Silakan pilih ekstrakurikuler');
    return false;
  } else {
    showSuccess(extracurricular);
    return true;
  }
};

// Function Toggle Password (Show/Hide)
function togglePassword(inputId, btn) {
  const inputField = document.getElementById(inputId);
  if (inputField.type === 'password') {
    inputField.type = 'text';
    btn.innerText = 'Sembunyi';
  } else {
    inputField.type = 'password';
    btn.innerText = 'Lihat';
  }
}

// Event Listener Validasi Real-time
fullName.addEventListener('input', checkFullName);
email.addEventListener('input', checkEmail);
password.addEventListener('input', checkPassword);
confirmPassword.addEventListener('input', checkConfirmPassword);
extracurricular.addEventListener('change', checkExtracurricular);

// Event Listener Submit Form
form.addEventListener('submit', (e) => {
  // Mencegah reload halaman
  e.preventDefault();

  const isFullNameValid = checkFullName();
  const isEmailValid = checkEmail();
  const isPasswordValid = checkPassword();
  const isConfirmPasswordValid = checkConfirmPassword();
  const isExtraValid = checkExtracurricular();

  const isFormValid = isFullNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isExtraValid;

  // Jika semua inputan valid
  if (isFormValid) {
    successMessage.innerText = 'Pendaftaran Berhasil!';
    successMessage.style.display = 'block';
    alert('Pendaftaran Berhasil!');
    
    // Reset form setelah berhasil
    form.reset();

    // Hapus border hijau setelah reset
    [fullName, email, password, confirmPassword, extracurricular].forEach(input => {
      input.classList.remove('success');
    });
  } else {
    successMessage.style.display = 'none';
  }
});