// Elemen Halaman
const page1 = document.getElementById('page-1');
const page2 = document.getElementById('page-2');

// Elemen Form 1
const form1 = document.getElementById('registrationForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const extracurricular = document.getElementById('extracurricular');

// Elemen Form 2
const form2 = document.getElementById('jurnalistikForm');
const jurnalisFullName = document.getElementById('jurnalisFullName');
const jurnalisClass = document.getElementById('jurnalisClass');
const jurnalisPhone = document.getElementById('jurnalisPhone');
const jurnalisReason = document.getElementById('jurnalisReason');
const successMessage = document.getElementById('jurnalistik-success-message');

// Navigation Toggle Mobile
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// Helper Tampilan Error/Success (Kode Asli Kamu)
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

const showSuccess = (input) => {
  const formGroup = input.parentElement.classList.contains('password-wrapper') 
    ? input.parentElement.parentElement 
    : input.parentElement;
  input.classList.remove('error');
  input.classList.add('success');
  formGroup.classList.remove('show-error');
};

// Validasi Form 1 (Kode Asli Kamu)
const checkFullName = () => {
  const val = fullName.value.trim();
  if (val === '') {
    showError(fullName, 'Nama lengkap tidak boleh kosong');
    return false;
  } else if (val.length < 3) {
    showError(fullName, 'Nama minimal 3 karakter');
    return false;
  }
  showSuccess(fullName);
  return true;
};

const checkEmail = () => {
  const val = email.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (val === '') {
    showError(email, 'Email tidak boleh kosong');
    return false;
  } else if (!emailPattern.test(val)) {
    showError(email, 'Format email tidak valid');
    return false;
  }
  showSuccess(email);
  return true;
};

const checkPassword = () => {
  const val = password.value.trim();
  if (val === '') {
    showError(password, 'Password tidak boleh kosong');
    return false;
  } else if (val.length < 8) {
    showError(password, 'Password minimal 8 karakter');
    return false;
  }
  showSuccess(password);
  return true;
};

const checkConfirmPassword = () => {
  if (confirmPassword.value.trim() === '') {
    showError(confirmPassword, 'Konfirmasi password tidak boleh kosong');
    return false;
  } else if (confirmPassword.value.trim() !== password.value.trim()) {
    showError(confirmPassword, 'Password tidak cocok');
    return false;
  }
  showSuccess(confirmPassword);
  return true;
};

const checkExtracurricular = () => {
  if (extracurricular.value === '') {
    showError(extracurricular, 'Silakan pilih ekstrakurikuler');
    return false;
  }
  showSuccess(extracurricular);
  return true;
};

// Validasi Form 2 (Jurnalistik) (Kode Asli Kamu)
const checkJurnalisClass = () => {
  if (jurnalisClass.value.trim() === '') {
    showError(jurnalisClass, 'Kelas tidak boleh kosong');
    return false;
  }
  showSuccess(jurnalisClass);
  return true;
};

const checkJurnalisPhone = () => {
  const val = jurnalisPhone.value.trim();
  const phonePattern = /^[0-9]{10,14}$/;
  if (val === '') {
    showError(jurnalisPhone, 'Nomor telepon tidak boleh kosong');
    return false;
  } else if (!phonePattern.test(val)) {
    showError(jurnalisPhone, 'Nomor telepon harus angka (10-14 digit)');
    return false;
  }
  showSuccess(jurnalisPhone);
  return true;
};

const checkJurnalisReason = () => {
  const val = jurnalisReason.value.trim();
  if (val === '') {
    showError(jurnalisReason, 'Alasan tidak boleh kosong');
    return false;
  } else if (val.length < 10) {
    showError(jurnalisReason, 'Alasan minimal 10 karakter');
    return false;
  }
  showSuccess(jurnalisReason);
  return true;
};

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

// Event Listeners Real-time (Kode Asli Kamu)
fullName.addEventListener('input', checkFullName);
email.addEventListener('input', checkEmail);
password.addEventListener('input', checkPassword);
confirmPassword.addEventListener('input', checkConfirmPassword);
extracurricular.addEventListener('change', checkExtracurricular);

jurnalisClass.addEventListener('input', checkJurnalisClass);
jurnalisPhone.addEventListener('input', checkJurnalisPhone);
jurnalisReason.addEventListener('input', checkJurnalisReason);

// Submit Halaman 1 -> Pindah ke Halaman 2 (Kode Asli Kamu)
form1.addEventListener('submit', (e) => {
  e.preventDefault();

  const isForm1Valid = checkFullName() && checkEmail() && checkPassword() && checkConfirmPassword() && checkExtracurricular();

  if (isForm1Valid) {
    if (extracurricular.value === 'Jurnalis') {
      // Sembunyikan Halaman 1 & Tampilkan Halaman 2
      page1.classList.add('hidden');
      page2.classList.remove('hidden');

      // Pindahkan nama dari Form 1 ke Form 2
      jurnalisFullName.value = fullName.value;
      showSuccess(jurnalisFullName);
    } else {
      alert(`Pendaftaran untuk ${extracurricular.value} belum dibuka.`);
    }
  }
});

// Submit Halaman 2 (Selesai Pendaftaran) (Kode Asli Kamu)
form2.addEventListener('submit', (e) => {
  e.preventDefault();

  const isForm2Valid = checkJurnalisClass() && checkJurnalisPhone() && checkJurnalisReason();

  if (isForm2Valid) {
    successMessage.innerText = 'Pendaftaran Jurnalistik Berhasil!';
    successMessage.style.display = 'block';
    alert('Selamat! Pendaftaran Ekstrakurikuler Jurnalistik Berhasil!');
  } else {
    successMessage.style.display = 'none';
  }
});
