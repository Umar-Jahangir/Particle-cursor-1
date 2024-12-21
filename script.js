const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas to fit the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100; // Adjust number of particles

// Particle constructor
function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
}

// Update particle position
Particle.prototype.update = function() {
    this.x += this.speedX;
    this.y += this.speedY;
    // Shrink particle
    if (this.size > 0.2) this.size -= 0.1;
};

// Draw particle
Particle.prototype.draw = function() {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
};

// Handle mouse movement
window.addEventListener('mousemove', function(event) {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(event.x, event.y));
    }
});

// Animate particles
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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