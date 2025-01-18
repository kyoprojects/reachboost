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
  const headerStart = document.querySelector('[navbar="header-startstate"][variant="floating-header"]');

  gsap.set(megaMenu, { height: 0, scaleY: 0, autoAlpha: 0, transformOrigin: 'top center' });
  gsap.set(headerStart, { display: 'flex', autoAlpha: 1, height: 'auto' });

  const showMegaMenu = gsap
    .timeline({ paused: true })
    .to(headerStart, {
      height: 0,
      autoAlpha: 0,
      duration: 0.2,
      ease: 'power4.in'
    })
    .to(
      megaMenu,
      {
        height: 'auto',
        scaleY: 1,
        autoAlpha: 1,
        duration: 0.2,
        ease: 'power4.in'
      },
      '<'
    )
    .to(header, { scale: 1.02, duration: 0.2, ease: 'power4.in' }, '<');

  const hideMegaMenu = gsap
    .timeline({ paused: true })
    .to(megaMenu, {
      height: 0,
      scaleY: 0,
      autoAlpha: 0,
      duration: 0.2,
      ease: 'power4.out'
    })
    .to(
      headerStart,
      {
        autoAlpha: 1,
        height: 'auto',
        duration: 0.2,
        ease: 'power4.out'
      },
      '<'
    )
    .to(header, { scale: 1, duration: 0.2, ease: 'power4.out' }, '<');

  triggerMenu.addEventListener('mouseenter', () => {
    showMegaMenu.restart();
  });
  header.addEventListener('mouseleave', () => {
    hideMegaMenu.restart();
  });
}

initGsap();
