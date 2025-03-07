const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas to fit the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 150; // Increased number of particles for a richer effect
const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFF5']; // Array of colors for particles

// Particle constructor
function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = colors[Math.floor(Math.random() * colors.length)]; // Random color from the array
}

// Update particle position
Particle.prototype.update = function() {
    this.x += this.speedX;
    this.y += this.speedY;
    // Shrink particle over time
    if (this.size > 0.2) this.size -= 0.1;
};

// Draw particle
Particle.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
};

// Handle mouse movement
window.addEventListener('mousemove', function(event) {
    for (let i = 0; i < particleCount / 2; i++) { // Add fewer particles per frame for better performance
        particles.push(new Particle(event.x, event.y));
    }
});

// Handle touch movement for mobile devices
window.addEventListener('touchmove', function(event) {
    event.preventDefault(); // Prevent default touch behavior
    const touch = event.touches[0];
    for (let i = 0; i < particleCount / 2; i++) {
        particles.push(new Particle(touch.clientX, touch.clientY));
    }
});

// Animate particles
function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Add a fading trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        // Remove particles that are too small
        if (particles[i].size <= 0.2) {
            particles.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}

animate();

// Handle window resize
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
