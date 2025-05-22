// Utility functions from before: setCookie, getCookie, deleteCookie remain same

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let c of ca) {
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = name + '=; Max-Age=0; path=/;';
}

// Register function for your form
function registerUser() {
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPass').value.trim();

  if (!email || !password) {
    alert('Please enter email and password');
    return;
  }

  if(getCookie("user_" + email)) {
    alert("This email is already registered. Please login.");
    return;
  }

  // Save password as cookie for demo only (do NOT do this in real apps)
  setCookie("user_" + email, password, 7);
  alert("Registration successful! You can now login.");
  window.location.href = "login.html";
}

// Login function for your form
function loginUser() {
  const email = document.getElementById('logEmail').value.trim();
  const password = document.getElementById('logPass').value.trim();

  if (!email || !password) {
    alert('Please enter email and password');
    return;
  }

  const storedPassword = getCookie("user_" + email);

  if (storedPassword && storedPassword === password) {
    setCookie("auth", email, 1);  // logged in for 1 day
    alert("Login successful!");
    window.location.href = "home.html"; // your home page after login
  } else {
    alert("Invalid email or password");
  }
}

// Logout function
function logout() {
  deleteCookie("auth");
  alert("Logged out!");
  window.location.href = "login.html";
}
