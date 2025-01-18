// sticky header
$(document).ready(function () {
  var lastScrollTop = 0;
  var threshold = 100;
  var hideThreshold = 100;
  var buffer = 5;
  var $stickyHeader = $('.sticky-header');

  $(window).on('scroll', function () {
    var st = $(this).scrollTop();
    if (Math.abs(st - lastScrollTop) <= buffer) {
      return;
    }
    if (st < hideThreshold) {
      $stickyHeader.addClass('hidden');
    } else if (st < lastScrollTop && st > threshold) {
      $stickyHeader.removeClass('hidden');
    } else {
      $stickyHeader.addClass('hidden');
    }
    lastScrollTop = st;
  });
});

async function initGsap() {
  // header megamenu
  const triggerMenu = document.querySelector('[navbar="megamenu-trigger"][variant="floating-header"]');
  const megaMenu = document.querySelector('[navbar="megamenu"][variant="floating-header"]');
  const header = document.querySelector('[navbar="floating-header"]');
  const headerStart = document.querySelector('[navbar="header-startstate"]');

  gsap.set(megaMenu, { height: 0, display: 'none', autoAlpha: 0 });

  const showMegaMenu = gsap.timeline({ paused: true }).set(megaMenu, { display: 'flex' }).to(megaMenu, {
    height: 'auto',
    duration: 0.2,
    ease: 'power2.out',
    autoAlpha: 1
  });

  const hideMegaMenu = gsap
    .timeline({ paused: true })
    .to(megaMenu, {
      height: 0,
      duration: 0.2,
      ease: 'power2.in',
      autoAlpha: 0
    })
    .set(megaMenu, { display: 'none' });

  triggerMenu.addEventListener('mouseenter', () => {
    showMegaMenu.restart();
  });
  header.addEventListener('mouseleave', () => {
    hideMegaMenu.restart();
  });
  // megaMenu.addEventListener('mouseleave', () => {
  //   hideMegaMenu.restart();
  // });
  // megaMenu.addEventListener('mouseenter', () => {
  //   showMegaMenu.restart();
  // });
}

initGsap();
