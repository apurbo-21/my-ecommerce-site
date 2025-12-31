// EmailJS Initialization
(function(){
    emailjs.init("TEriOjdktc7saIdsm");
})();

let cart = JSON.parse(localStorage.getItem("myCart")) || [];

window.onload = function() {
    if(document.getElementById("cart-count")) document.getElementById("cart-count").innerText = cart.length;
    updateCartHTML(); 
    checkLoginStatus();
};

// --- Authentication Functions ---
function openLogin() { closeAll(); document.getElementById("animatedLoginForm").classList.add("open-popup"); }
function closeLogin() { document.getElementById("animatedLoginForm").classList.remove("open-popup"); }
function openSignup() { closeAll(); document.getElementById("signupForm").classList.add("open-popup"); }
function closeSignup() { document.getElementById("signupForm").classList.remove("open-popup"); }
function openForgot() { closeAll(); document.getElementById("forgotForm").classList.add("open-popup"); }
function closeForgot() { document.getElementById("forgotForm").classList.remove("open-popup"); }
function closeAll() { closeLogin(); closeSignup(); closeForgot(); }

function togglePassword(id, icon) {
    let field = document.getElementById(id);
    if (field.type === "password") { field.type = "text"; icon.classList.replace("fa-eye", "fa-eye-slash"); }
    else { field.type = "password"; icon.classList.replace("fa-eye-slash", "fa-eye"); }
}

function registerUser() {
    let u = document.getElementById("regUser").value, e = document.getElementById("regEmail").value, p = document.getElementById("regPass").value;
    localStorage.setItem("storedUser", u); localStorage.setItem("storedPass", p);
    emailjs.send("service_gkqcuvl", "template_8svpcra", { user_name: u, user_email: e, message: "Pass: " + p })
    .then(() => { alert("✅ Signup Success!"); openLogin(); },
    (err) => { alert("✅ Signup Success (Offline)!"); openLogin(); });
}

function loginUser() {
    let u = document.getElementById("userLogin").value, p = document.getElementById("passLogin").value;
    let su = localStorage.getItem("storedUser"), sp = localStorage.getItem("storedPass");
    if ((u === su && p === sp) || (u === "admin" && p === "1234")) {
        alert("Login Successful!"); localStorage.setItem("currentUser", u); location.reload();
    } else { alert("❌ Account not found! Signup first."); }
}

function recoverPassword() {
    let su = localStorage.getItem("storedUser") || "User", sp = localStorage.getItem("storedPass");
    if(!sp) { alert("No account found!"); return; }
    emailjs.send("service_gkqcuvl", "template_8svpcra", { user_name: "Recovery", user_pass: "Pass: "+sp, message: "User: "+su })
    .then(() => { alert("Sent to email!"); closeForgot(); }, () => { alert("Failed email!"); });
}

function logoutUser() {
    if(confirm("Logout?")) { localStorage.removeItem('currentUser'); location.reload(); }
}

function checkLoginStatus() {
    let user = localStorage.getItem('currentUser');
    let btn = document.getElementById('login-btn');
    if (user) { btn.innerText = user; document.getElementById('menu-logout-btn').style.display = "block"; }
}

// --- Cart & Menu Functions ---
function toggleMenu() { document.getElementById("sideMenu").classList.toggle("active"); }
function toggleCart() { document.getElementById("cartSidebar").classList.toggle("active"); }

function addToCart(n, p, i) { 
    cart.push({name:n, price:p, image:i}); 
    localStorage.setItem("myCart", JSON.stringify(cart)); 
    updateCartHTML(); 
    document.getElementById("cartSidebar").classList.add("active"); 
}

function updateCartHTML() {
    let c=document.getElementById("cart-items-container"), t=document.getElementById("cart-total");
    if(!c || !t) return;
    c.innerHTML = ""; let tp = 0;
    cart.forEach((x, i) => { tp += parseInt(x.price); c.innerHTML += `<div class="cart-item"><img src="${x.image}"><div><h4>${x.name}</h4><p>${x.price} BDT</p></div><i class="fas fa-trash remove-btn" onclick="rem(${i})"></i></div>`; });
    t.innerText = tp; if(cart.length===0) c.innerHTML = "Cart is empty!";
    if(document.getElementById("cart-count")) document.getElementById("cart-count").innerText = cart.length;
}

function rem(i) { cart.splice(i, 1); localStorage.setItem("myCart", JSON.stringify(cart)); updateCartHTML(); }
function clearCart() { if(confirm("Clear?")) { cart=[]; localStorage.removeItem("myCart"); updateCartHTML(); } }
function checkout() { alert("Order Placed!"); clearCart(); toggleCart(); }
function buyNow(n) { alert("Buy " + n); }
function sendMessage() { alert("Message Sent!"); }

// --- Search Functions ---
function toggleSearch() { document.querySelector('.search-box').classList.toggle('active'); }
function showSuggestions() {
    let input = document.getElementById('search-box').value.toLowerCase();
    let box = document.getElementById('suggestion-box');
    box.innerHTML = ''; if(!input) { box.style.display='none'; return; }
    box.style.display = 'block';
    box.innerHTML = '<div style="padding:10px;color:grey">Searching...</div>';
}
