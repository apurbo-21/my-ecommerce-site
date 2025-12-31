// EmailJS Init
(function(){
    if(typeof emailjs !== 'undefined') emailjs.init("TEriOjdktc7saIdsm");
})();

let cart = JSON.parse(localStorage.getItem("myCart")) || [];

window.onload = function() {
    updateCartHTML();
    checkLoginStatus();
};

function checkLoginStatus() {
    let user = localStorage.getItem('currentUser');
    let btn = document.getElementById('login-btn');
    if (user && btn) { 
        btn.innerText = user; 
        let logoutBtn = document.getElementById('menu-logout-btn');
        if(logoutBtn) logoutBtn.style.display = "block";
    }
}

// --- Auth Functions ---
function togglePassword(id, icon) {
    let field = document.getElementById(id);
    if (field.type === "password") { field.type = "text"; icon.classList.replace("fa-eye", "fa-eye-slash"); }
    else { field.type = "password"; icon.classList.replace("fa-eye-slash", "fa-eye"); }
}

function registerUser() {
    let u = document.getElementById("regUser").value, e = document.getElementById("regEmail").value, p = document.getElementById("regPass").value;
    localStorage.setItem("storedUser", u); localStorage.setItem("storedPass", p);
    alert("✅ Signup Success! Now Login.");
    location.reload(); 
}

function loginUser() {
    let u = document.getElementById("userLogin").value, p = document.getElementById("passLogin").value;
    let su = localStorage.getItem("storedUser"), sp = localStorage.getItem("storedPass");
    if ((u === su && p === sp) || (u === "admin" && p === "1234")) {
        alert("Login Successful!"); localStorage.setItem("currentUser", u);
        window.location.href = "index.html";
    } else { alert("❌ Account not found!"); }
}

function logoutUser() {
    if(confirm("Logout?")) { localStorage.removeItem('currentUser'); location.href = "index.html"; }
}

// --- Cart & UI Functions ---
function toggleMenu() { document.getElementById("sideMenu").classList.toggle("active"); }
function toggleCart() { document.getElementById("cartSidebar").classList.toggle("active"); }
function toggleSearch() { document.querySelector('.search-box').classList.toggle('active'); }

function addToCart(n, p, i) { 
    cart.push({name:n, price:p, image:i}); 
    localStorage.setItem("myCart", JSON.stringify(cart)); 
    updateCartHTML(); 
    document.getElementById("cartSidebar").classList.add("active"); 
}

function updateCartHTML() {
    let c = document.getElementById("cart-items-container"), t = document.getElementById("cart-total");
    if(!c) return;
    c.innerHTML = ""; let tp = 0;
    cart.forEach((x, i) => { tp += parseInt(x.price); c.innerHTML += `<div class="cart-item" style="display:flex; padding:10px; border-bottom:1px solid #333;"><img src="${x.image}" style="width:50px;"> <div style="margin-left:10px;">${x.name}<br>${x.price} BDT</div></div>`; });
    if(t) t.innerText = tp;
    if(document.getElementById("cart-count")) document.getElementById("cart-count").innerText = cart.length;
}

function clearCart() { cart = []; localStorage.removeItem("myCart"); updateCartHTML(); }
function checkout() { alert("Order Placed!"); clearCart(); toggleCart(); }
