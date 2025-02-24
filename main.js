// Canvas နဲ့ context ရယူခြင်း
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Canvas size သတ်မှတ်ခြင်း
canvas.width = 500;  // သင့်လျော်တဲ့ အရွယ်အစားကို ရွေးချယ်ပါ
canvas.height = 450; // သင့်လျော်တဲ့ အရွယ်အစားကို ရွေးချယ်ပါ

const sizeEl= document.querySelector('.size');
const colorEl=document.querySelector('#color');
const clearEl=document.querySelector('.clear');
const increaseBtn=document.querySelector('.increase');
const decreaseBtn=document.querySelector('.decrease');
 
let size = 1;
let color = 'black';
let isPressed = false;
 
 
function drawCircle(x,y){
    ctx.beginPath();
    ctx.arc(x,y,size,0,Math.PI*2,true);
    ctx.fillStyle=color;
    ctx.fill();

}

function drawLine(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2)
    ctx.strokeStyle=color;
    ctx.lineWidth=size*2;
    ctx.stroke();

}

function updateSizeOnScreen(){
    sizeEl.textContent=size;
}

canvas.addEventListener('mousedown',(e)=>{
    isPressed=true;
    x= e.offsetX;
    y= e.offsetY;    
})

canvas.addEventListener('mousemove',(e)=>{
    if(isPressed){
        const x2= e.offsetX;
        const y2= e.offsetY;

        drawCircle(x2,y2);
        drawLine(x,y,x2,y2);
        x=x2;
        y=y2;
    }
    
    
})
window.addEventListener('mouseup', () => {
    isPressed = false;
    x = undefined;
    y = undefined;
});

canvas.addEventListener('touchstart',(e)=>{
    e.preventDefault();
    isPressed = true;
    const touch=e.touches[0];
    x = touch.clientX - canvas.offsetLeft;
    y = touch.clientY - canvas.offsetTop;
})

canvas.addEventListener('touchmove',(e)=>{
    e.preventDefault();
    isPressed = true;
    const touch=e.touches[0];
    x2 = touch.clientX - canvas.offsetLeft;
    y2 = touch.clientY - canvas.offsetTop;
    drawCircle(x2,y2);
    drawLine(x,y,x2,y2);
    x=x2;
    y=y2;
})
canvas.addEventListener('touchend',(e)=>{
    isPressed=false;
    x = undefined;
    y = undefined;
})

increaseBtn.addEventListener('click',()=>{
    size += 2;
   
    if(size > 19){
        size= 20;
    }
    updateSizeOnScreen();
     
  })

decreaseBtn.addEventListener('click',()=>{
    size -= 2;
    if(size < 1){
        size = 1;
    }
    updateSizeOnScreen();
    
})

document.body.addEventListener('touchstart', function(e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
}, { passive: false });

document.body.addEventListener('touchend', function(e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
}, { passive: false });

document.body.addEventListener('touchmove', function(e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
}, { passive: false });

 
function updateColor(e) {
    color = e.target.value;
}




colorEl.addEventListener('change', updateColor);
colorEl.addEventListener('input', updateColor);

clearEl.addEventListener('click',()=>{
    ctx.clearRect(0,0, canvas.width,canvas.height)
})

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

function resizeCanvasForMobile() {
    if (isMobileDevice()) {
        const maxPercentageforWidth = 0.9; // 90% of window size
        const maxPercentageheight = 0.8; // 90% of window size
        canvas.width = Math.floor(window.innerWidth * maxPercentageforWidth);
        canvas.height = Math.floor(window.innerHeight * maxPercentageheight);
    }
}


window.addEventListener('load', resizeCanvasForMobile);
window.addEventListener('orientationchange', resizeCanvasForMobile);


updateSizeOnScreen();

 