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

  // Initial states
  gsap.set(megaMenu, { height: 0, scaleY: 0, autoAlpha: 0, transformOrigin: 'top center' });
  gsap.set(headerStart, { display: 'flex', autoAlpha: 1, height: 'auto' });

  // Animation timeline for showing mega menu
  const showMegaMenu = gsap
    .timeline({ paused: true })
    .to(headerStart, {
      height: 0,
      autoAlpha: 0,
      duration: 0.2,
      ease: 'power1.out'
    })
    .to(
      megaMenu,
      {
        height: 'auto',
        scaleY: 1,
        autoAlpha: 1,
        duration: 0.2,
        ease: 'power1.out'
      },
      '<' // Ensures this animation starts simultaneously with the above
    );
  // .set(headerStart, { display: 'none' });

  // Animation timeline for hiding mega menu
  const hideMegaMenu = gsap
    .timeline({ paused: true })
    .to(megaMenu, {
      height: 0, // Collapse height
      scaleY: 0, // Smooth vertical scaling
      autoAlpha: 0, // Fade out
      duration: 0.2,
      ease: 'power1.in'
    })
    .to(
      headerStart,
      {
        autoAlpha: 1, // Fade in headerStart
        height: 'auto', // Restore original height
        duration: 0.2,
        ease: 'power1.in'
      },
      '<'
    );
  // .set(megaMenu, { display: 'none' }) // Ensure it doesn’t occupy space
  // .set(headerStart, { display: 'flex' }); // Ensure it’s visible

  // Event Listeners
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
