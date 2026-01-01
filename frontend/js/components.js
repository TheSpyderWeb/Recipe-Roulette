// Navbar Component
const navbar = `
<nav>
    <img src="img/search.png" alt="Logo" class="nav-logo" style="width:60px;">
    <h2 class="logo">Recipe<span>Roulette</span></h2>
    <ul>
        <li><a href="login.html"><button>Login</button></a></li>
        <li><a href="signup.html"><button>Sign Up</button></a></li>
    </ul>
</nav>
`;
document.getElementById('navbar').innerHTML = navbar;

// Footer Component
const footer = `
<footer>
    <p>Recipe Roulette</p>
    <p>Discover new recipes and enjoy cooking adventures!</p>
    <div class="social">
        <a href="#"><i class="fab fa-facebook-f"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
    </div>
    <p class="end">© 2026 Recipe Roulette</p>
</footer>
`;
document.getElementById('footer').innerHTML = footer;
