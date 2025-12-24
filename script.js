// Get all elements
const card1 = document.getElementById('card1');
const card2 = document.getElementById('card2');
const card3 = document.getElementById('card3');
const card4 = document.getElementById('card4');
const btn2 = document.getElementById('btn2');
const giftBox = document.getElementById('giftBox');
const giftLid = document.getElementById('giftLid');
const bearContainer = document.getElementById('bearContainer');
const bear = document.getElementById('bear');
const kiss = document.getElementById('kiss');
const christmasContent = document.getElementById('christmasContent');
const scratchCanvas = document.getElementById('scratchCanvas');
const hiddenMessage = document.querySelector('.hidden-message');
const doneBtn = document.getElementById('doneBtn');
const bgMusic = document.getElementById('bgMusic');

// Set music volume
bgMusic.volume = 0.3;
let musicStarted = false;

// Show Card 1 on page load
window.addEventListener('load', function() {
    card1.classList.add('active');
});

// Start music function
function startMusic() {
    if (!musicStarted) {
        bgMusic.play().then(() => {
            musicStarted = true;
            console.log('✅ Music playing!');
        }).catch((error) => {
            console.log('❌ Music blocked:', error);
        });
    }
}

// Card 1 to Card 2
card1.addEventListener('click', function() {
    startMusic();
    card1.classList.add('hide');
    
    setTimeout(() => {
        card1.classList.remove('active', 'hide');
        card2.classList.add('active');
    }, 600);
});

// Card 2 to Card 3
btn2.addEventListener('click', function() {
    card2.classList.add('hide');
    
    setTimeout(() => {
        card2.classList.remove('active', 'hide');
        card3.classList.add('active');
    }, 600);
});

// Card 3: Gift Box Animation
giftBox.addEventListener('click', function() {
    giftLid.classList.add('open');
    
    setTimeout(() => {
        giftBox.style.display = 'none';
        bearContainer.classList.add('show');
        
        setTimeout(() => {
            bear.classList.add('move-to-screen');
            
            setTimeout(() => {
                kiss.classList.add('show-kiss');
                
                setTimeout(() => {
                    bearContainer.style.display = 'none';
                    christmasContent.classList.add('show');
                    createFloatingElements();
                    
                    // Enable swipe for Card 4 after 2 seconds
                    setTimeout(() => {
                        enableSwipeForCard4();
                    }, 2000);
                }, 2000);
            }, 1500);
        }, 500);
    }, 1000);
});

// Swipe functionality for Card 3 to Card 4
function enableSwipeForCard4() {
    let startX = 0;
    let currentX = 0;
    let isSwiping = false;
    
    card3.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        isSwiping = true;
    });
    
    card3.addEventListener('touchmove', function(e) {
        if (!isSwiping) return;
        
        currentX = e.touches[0].clientX;
        const diffX = currentX - startX;
        
        // Only allow left swipe
        if (diffX < 0) {
            card3.style.transform = `translateX(${diffX}px)`;
        }
    });
    
    card3.addEventListener('touchend', function(e) {
        if (!isSwiping) return;
        
        const diffX = currentX - startX;
        
        // If swiped left more than 100px
        if (diffX < -100) {
            card3.style.transform = 'translateX(-100%)';
            
            setTimeout(() => {
                card3.classList.remove('active');
                card3.style.transform = '';
                card4.classList.add('active');
                initScratchCard();
            }, 300);
        } else {
            // Reset position
            card3.style.transform = '';
        }
        
        isSwiping = false;
    });
    
    // Mouse swipe for desktop
    card3.addEventListener('mousedown', function(e) {
        startX = e.clientX;
        isSwiping = true;
    });
    
    card3.addEventListener('mousemove', function(e) {
        if (!isSwiping) return;
        
        currentX = e.clientX;
        const diffX = currentX - startX;
        
        if (diffX < 0) {
            card3.style.transform = `translateX(${diffX}px)`;
        }
    });
    
    card3.addEventListener('mouseup', function(e) {
        if (!isSwiping) return;
        
        const diffX = currentX - startX;
        
        if (diffX < -100) {
            card3.style.transform = 'translateX(-100%)';
            
            setTimeout(() => {
                card3.classList.remove('active');
                card3.style.transform = '';
                card4.classList.add('active');
                initScratchCard();
            }, 300);
        } else {
            card3.style.transform = '';
        }
        
        isSwiping = false;
    });
}

// Create Floating Hearts & Snowflakes
function createFloatingElements() {
    const elements = ['💕', '💖', '💗', '💝', '❄️', '❄️', '❄️'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const element = document.createElement('div');
            element.classList.add('floating-element');
            element.innerHTML = elements[Math.floor(Math.random() * elements.length)];
            element.style.left = Math.random() * 100 + 'vw';
            element.style.animationDuration = (Math.random() * 3 + 3) + 's';
            element.style.animationDelay = Math.random() * 2 + 's';
            element.style.fontSize = (Math.random() * 15 + 20) + 'px';
            
            document.body.appendChild(element);
            
            setTimeout(() => {
                element.remove();
            }, 8000);
        }, i * 100);
    }
    
    setInterval(() => {
        const element = document.createElement('div');
        element.classList.add('floating-element');
        element.innerHTML = elements[Math.floor(Math.random() * elements.length)];
        element.style.left = Math.random() * 100 + 'vw';
        element.style.animationDuration = (Math.random() * 3 + 3) + 's';
        element.style.fontSize = (Math.random() * 15 + 20) + 'px';
        
        document.body.appendChild(element);
        
        setTimeout(() => {
            element.remove();
        }, 8000);
    }, 500);
}

// Scratch Card Functionality (WARNING FIXED)
function initScratchCard() {
    const canvas = scratchCanvas;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    canvas.width = 400;
    canvas.height = 300;
    
    ctx.fillStyle = '#c0c0c0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#666';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch Here! 🎫', canvas.width / 2, canvas.height / 2);
    
    let isScratching = false;
    
    canvas.addEventListener('mousedown', startScratching);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', stopScratching);
    canvas.addEventListener('mouseleave', stopScratching);
    canvas.addEventListener('touchstart', startScratching);
    canvas.addEventListener('touchmove', scratch);
    canvas.addEventListener('touchend', stopScratching);
    
    function startScratching(e) {
        isScratching = true;
        scratch(e);
    }
    
    function stopScratching() {
        isScratching = false;
    }
    
    function scratch(e) {
        if (!isScratching) return;
        
        e.preventDefault();
        
        const rect = canvas.getBoundingClientRect();
        let x, y;
        
        if (e.type.includes('touch')) {
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        } else {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }
        
        x = x * (canvas.width / rect.width);
        y = y * (canvas.height / rect.height);
        
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.fill();
        
        checkScratchPercentage();
    }
    
    function checkScratchPercentage() {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let transparent = 0;
        
        for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i] === 0) transparent++;
        }
        
        const scratchedPercentage = (transparent / (pixels.length / 4)) * 100;
        
        if (scratchedPercentage > 50) {
            revealMessage();
        }
    }
    
    function revealMessage() {
        canvas.style.opacity = '0';
        hiddenMessage.style.opacity = '1';
        doneBtn.style.display = 'block';
    }
}

// Done button - Custom Popup
doneBtn.addEventListener('click', function() {
    card4.classList.add('hide');
    
    setTimeout(() => {
        showCustomPopup();
    }, 500);
});

// Custom Popup Function
function showCustomPopup() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease;
    `;
    
    const popup = document.createElement('div');
    popup.style.cssText = `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
        padding: 40px 30px;
        border-radius: 20px;
        text-align: center;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        animation: popupScale 0.4s ease;
        max-width: 350px;
        width: 85%;
    `;
    
    popup.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 20px;">🎄✨</div>
        <div style="font-size: 1.8rem; color: white; font-weight: 700; font-family: 'Poppins', sans-serif; text-shadow: 0 2px 10px rgba(0,0,0,0.3); line-height: 1.5;">
            Dev say Merry Christmas Madamjii 🎄✨❄️
        </div>
    `;
    
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    
    overlay.addEventListener('click', function() {
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            overlay.remove();
        }, 300);
    });
}

// Add animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    @keyframes popupScale {
        from { transform: scale(0.7); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
`;
document.head.appendChild(style);