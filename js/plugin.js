$('.tilt')
  .on('mouseenter', function() {animate = false})
  .on('mousemove', mouseMove)
  .on('mouseleave', mouseLeave)

function mouseMove(e) {
  let bRect = this.getBoundingClientRect();
  let mX = e.pageX;
  let mY = e.pageY;
  let pX = Math.floor((mX - bRect.left) / bRect.width * 100);
  let pY = Math.floor((mY - bRect.top) / bRect.height * 100);
  let bgi =  `radial-gradient(${bRect.width}px at ${pX}% ${pY}%, rgba(255,255,255,.5), rgba(255,255,255,0))`;
  let rotX = (pY - 50)/5;
  let rotY = -(pX - 50)/5;
  let shd =  `0 ${rotX}px ${Math.abs(rotX) * 5}px rgba(0,0,50,.15), 0 ${pY/10}px ${pY/5}px rgba(0,0,0,.25)`;
  let trs =  `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  
  $('.tilt').css('background-image', bgi).addClass('hover');
  $('.tilt').css('box-shadow', shd);
  $('.tilt').css('transform', trs);
}

function mouseLeave() {
  $('.tilt').css('background-image', '').removeClass('hover');
  $('.tilt').css('box-shadow', '');
  $('.tilt').css('transform', '');
}

// Just used for the teaser animation.
// I wouldn't suggest emulating your own mouse events.
// Ever.
var animFrames = 100;
var animate = true;

(function fakeAnim(frame) {
  frame = frame || 1;
  let size = 500;
  let half = size / 2;
  let fakeEvt = { pageX: 0, pageY: 0 };
  let fakeElm = {
    getBoundingClientRect: function() {
      return {top: 0, left: 0, width: size, height: size}
    }
  };
  fakeEvt.pageY = Math.sin((frame/animFrames) * Math.PI * 2) * half + half;
  fakeEvt.pageX = Math.cos((frame/animFrames) * Math.PI * 2) * half + half;
  mouseMove.call(fakeElm, fakeEvt);
  
  if (animate && frame < animFrames) {
    window.requestAnimationFrame(function() {
      fakeAnim(frame + 1);
    });
  } else {
    mouseLeave();
  }
})();