// COMPLETE PRODUCTS DATABASE WITH BRANDS
const products = {
    guitars: [
        {name:"Yamaha FG800",price:"$349",rating:4.8,icon:"fas fa-guitar",brand:"Yamaha",img:"brands/yamaha.png"},
        {name:"Cort G250",price:"$299",rating:4.6,icon:"fas fa-guitar",brand:"Cort",img:"brands/cort.png"},
        {name:"Fender Stratocaster",price:"$1,299",rating:5,icon:"fas fa-guitar",brand:"Fender",img:"brands/fender.png"},
        {name:"Gibson Les Paul",price:"$2,499",rating:5,icon:"fas fa-guitar",brand:"Gibson",img:"brands/gibson.png"}
    ],
    keyboards: [
        {name:"Yamaha P-125",price:"$899",rating:4.8,icon:"fas fa-piano-keyboard",brand:"Yamaha",img:"brands/yamaha.png"},
        {name:"Roland FP-30X",price:"$999",rating:4.9,icon:"fas fa-piano-keyboard",brand:"Roland",img:"brands/roland.png"},
        {name:"Casio PX-S1100",price:"$749",rating:4.7,icon:"fas fa-piano-keyboard",brand:"Casio",img:"brands/casio.png"}
    ],
    drums: [
        {name:"Roland TD-17",price:"$1,799",rating:4.8,icon:"fas fa-drum",brand:"Roland",img:"brands/roland.png"},
        {name:"Tama Imperialstar",price:"$1,199",rating:4.7,icon:"fas fa-drum",brand:"Tama",img:"brands/tama.png"},
        {name:"Alesis Nitro Max",price:"$649",rating:4.5,icon:"fas fa-drum",brand:"Alesis",img:"brands/alesis.png"}
    ],
    classical: [
        {name:"Yamaha V3 Violin",price:"$399",rating:4.8,icon:"fas fa-music",brand:"Yamaha",img:"brands/yamaha.png"},
        {name:"Vault VN51 Violin",price:"$299",rating:4.6,icon:"fas fa-music",brand:"Vault",img:"brands/vault.png"}
    ]
};

let cart=JSON.parse(localStorage.getItem('cart'))||[];


// DOM Ready
document.addEventListener('DOMContentLoaded',()=>{
    loadHeader();loadFooter();updateCartCount();updateWishlistCount();
    document.querySelectorAll('.category-card').forEach(card=>{
        card.onclick=()=>window.location.href=`shop.html?category=${card.dataset.category}`;
    });
});

function loadHeader(){
    document.getElementById('header-container').innerHTML=`
        <header>
            <nav>
                <div class="logo">🎶Musical Haven</div>
                <div class="search-container">
                    <input type="text" class="search-box" placeholder="Search Yamaha, Roland, drums..." id="searchInput">
                    <button class="search-btn" id="searchBtn"><i class="fas fa-search"></i></button>
                </div>
                <div class="header-icons">
                    <div class="icon-btn" onclick="openWishlist()">
                        <i class="fas fa-heart"></i><span class="wishlist-count" id="wishlistCount">0</span>
                    </div>
                    <div class="icon-btn" onclick="openCart()">
                        <i class="fas fa-shopping-cart"></i><span class="cart-count" id="cartCount">0</span>
                    </div>
                    <a href="login.html" class="icon-btn" title="Login"><i class="fas fa-user"></i></a>
                </div>
            </nav>
        </header>`;
    
    setTimeout(()=>{
        const searchBtn=document.getElementById('searchBtn');
        const searchInput=document.getElementById('searchInput');
        if(searchBtn&&searchInput){
            searchBtn.onclick=performSearch;
            searchInput.onkeypress=e=>e.key==='Enter'&&performSearch();
        }
    },100);
}

function loadFooter(){
    document.getElementById('footer-container').innerHTML=`
        <footer>
            <div class="social-links">
                <a href="https://wa.me/916385250077" class="social-link"><i class="fab fa-whatsapp"></i></a>
                <a href="tel:+916385250077" class="social-link"><i class="fas fa-phone"></i></a>
                <a href="mailto:support@musicalhaven.com" class="social-link"><i class="fas fa-envelope"></i></a>
            </div>
            <div class="contact-info">
                <p>📱 WhatsApp: +91 6385250077 | 📞 Phone: +91 6385250077</p>
                <p>✉️ Email: support@musicalhaven.com</p>
            </div>
            <p style="opacity:0.7;">Thank you for choosing Musical Haven 🎶</p>
        </footer>`;
}

function updateCartCount(){document.getElementById('cartCount')&&(document.getElementById('cartCount').textContent=cart.length);}
function updateWishlistCount(){document.getElementById('wishlistCount')&&(document.getElementById('wishlistCount').textContent=wishlist.length);}

function performSearch(){
    const query=document.getElementById('searchInput').value.trim();
    if(query) window.location.href=`shop.html?search=${encodeURIComponent(query)}`;
}

function addToCart(productName){
    cart.push(productName);localStorage.setItem('cart',JSON.stringify(cart));updateCartCount();showNotification(`${productName} added to cart! 🛒`);
}

// ===== WISHLIST FUNCTIONS (FULL PRODUCT DETAILS) =====

function addToWishlist(name, price, image) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // prevent duplicates
    if (wishlist.some(item => item.name === name)) {
        showNotification("Already in wishlist ❤️");
        return;
    }

    wishlist.push({ name, price, image });
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    updateWishlistCount();
    showNotification(`${name} added to wishlist ❤️`);
}

// Used ONLY in wishlist.html
function showWishlist() {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let container = document.getElementById("wishlistItems");

    if (!container) return;

    if (wishlist.length === 0) {
        container.innerHTML = "<p>Your wishlist is empty 😔</p>";
        return;
    }

    container.innerHTML = "";

    wishlist.forEach((item, index) => {
        container.innerHTML += `
          <div class="product">
            <img src="${item.image}">
            <h3>${item.name}</h3>
            <p>${item.price}</p>
            <button onclick="removeItem(${index})">❌ Remove</button>
          </div>
        `;
    });
}

function removeItem(index) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist.splice(index, 1);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    location.reload();
}

function updateWishlistCount(){
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    document.getElementById('wishlistCount') &&
    (document.getElementById('wishlistCount').textContent = wishlist.length);
}

function openCart(){window.location.href='cart.html';}
function openWishlist(){window.location.href='wishlist.html';}

function showNotification(message){
    const n=document.createElement('div');
    n.style.cssText=`position:fixed;top:100px;right:20px;background:linear-gradient(45deg,#cc98eb,#7391f6);color:white;padding:1rem 2rem;border-radius:50px;z-index:3000;box-shadow:0 10px 30px rgba(0,0,0,0.3);font-weight:600;`;
    n.textContent=message;document.body.appendChild(n);setTimeout(()=>n.remove(),3000);
}

// Modal
function openModal(content){
    const m=document.getElementById('imageModal')||createModal();
    m.querySelector('#modalImage').innerHTML=`<i style="font-size:10rem;color:#ce8ceb;">${content}</i>`;
    m.style.display='block';
}
function closeModal(){document.getElementById('imageModal').style.display='none';}
function createModal(){
    const modal=document.createElement('div');
    modal.id='imageModal';modal.className='modal';
    modal.innerHTML=`<span class="close" onclick="closeModal()">&times;</span><div class="modal-content" id="modalImage"></div>`;
    document.body.appendChild(modal);return modal;
}