$(document).ready(function () {
  let lastScrollTop = 0;
  const threshold = 300;
  const buffer = 5;
  const $stickyHeader = $('[navbar="floating-header"]');

  // Flag to track visibility
  let isHidden = false;

  $(window).on('scroll', function () {
    const st = $(this).scrollTop();

    // Ignore small scroll differences
    if (Math.abs(st - lastScrollTop) <= buffer) return;

    if (st < threshold) {
      // Hide header when near the top of the page
      if (!isHidden) {
        $stickyHeader.addClass('hidden');
        isHidden = true;
      }
    } else if (st < lastScrollTop) {
      // Show header when scrolling up
      if (isHidden) {
        $stickyHeader.removeClass('hidden');
        isHidden = false;
      }
    } else {
      // Hide header when scrolling down
      if (!isHidden) {
        $stickyHeader.addClass('hidden');
        isHidden = true;
      }
    }

    lastScrollTop = st;
  });
});

async function initGsap() {
  const triggerMenu = document.querySelector('[navbar="megamenu-trigger"][variant="floating-header"]');
  const megaMenu = document.querySelector('[navbar="megamenu"][variant="floating-header"]');
  const header = document.querySelector('[navbar="floating-header"]');
  const headerStart = document.querySelector('[navbar="header-startstate"][variant="floating-header"]');
  const triggerMenuFixed = document.querySelector('[navbar="megamenu-trigger"][variant="fixed-header"]');
  const fixedModal = document.querySelector('[navbar="fixed-header"]');

  function floatingModalHandling() {
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
      // wait for 0.1sec
      .to(header, { scale: 1.02, duration: 0.2, ease: 'power4.in' }, '-=0.2');

    const hideMegaMenu = gsap
      .timeline({ paused: true })
      .to(header, { scale: 1, duration: 0.1, ease: 'power4.out' })
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
      );

    triggerMenu.addEventListener('mouseenter', () => {
      showMegaMenu.restart();
    });
    header.addEventListener('mouseleave', () => {
      hideMegaMenu.restart();
    });
  }

  floatingModalHandling();

  function fixedModalHandling() {
    let fixedModalIsHovered = false;
    let hideTimeout;

    triggerMenuFixed.addEventListener('mouseenter', () => {
      console.log('triggerMenuFixed mouseenter');
      clearTimeout(hideTimeout); // Clear any pending hide actions
      fixedModal.classList.remove('hidden');
    });
    triggerMenuFixed.addEventListener('mouseleave', () => {
      hideTimeout = setTimeout(() => {
        if (!fixedModalIsHovered) fixedModal.classList.add('hidden');
      }, 100);
    });
    fixedModal.addEventListener('mouseenter', () => {
      fixedModalIsHovered = true;
      clearTimeout(hideTimeout);
    });
    fixedModal.addEventListener('mouseleave', () => {
      fixedModalIsHovered = false;
      hideTimeout = setTimeout(() => {
        fixedModal.classList.add('hidden');
      }, 100);
    });
  }

  fixedModalHandling();
}

initGsap();
