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
  let mm = gsap.matchMedia();

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

  // mobile menu
  mm.add('(max-width: 800px)', () => {
    (async function showMobileMenu() {
      let mobileMenuOpenState = false;
      const openTriggers = document.querySelectorAll('#mobile-menu-btn');
      const closeTrigger = document.querySelector('#mobile-menu-closebtn');
      openTriggers.forEach(element => {
        element.addEventListener('click', () => {
          console.log('showww');
          gsap.set('#mobile-menu', { display: 'flex', opacity: 0 });
          gsap.to('#mobile-menu', { opacity: 1, duration: 0.2, autoAlpha: 1, ease: 'power4.out' });
        });
      });
      closeTrigger.addEventListener('click', () => {
        gsap.to('#mobile-menu', { opacity: 0, duration: 0.2, autoAlpha: 1, ease: 'power4.out', onComplete: () => gsap.set('#mobile-menu', { display: 'none' }) });
      });
    })();
  });
}

initGsap();

async function initCampaignAnimation() {
  // hero animation

  gsap.registerPlugin(MotionPathPlugin);

  gsap.set('[ray-object1]', { opacity: 0 });
  gsap.set('[ray-object2]', { opacity: 0 });
  gsap.set('[ray-object3]', { opacity: 0 });

  const timeline2 = gsap.timeline({ repeat: -1, repeatDelay: 3 });
  timeline2
    .to('[ray-object2]', { opacity: 1, duration: 0.1 })
    .to(
      '[ray-object2]',
      {
        x: 360,
        duration: 1.5,
        opacity: 1,
        ease: 'power1.inOut'
      },
      '<'
    )
    .to('[ray-object2]', { opacity: 0, duration: 0.5 }, '-=0.5');

  const timeline1 = gsap.timeline({
    repeat: -1,
    repeatDelay: 3,
    delay: 0.3
  });
  timeline1
    .to('[ray-object1]', { opacity: 1, duration: 0.08 })
    .to(
      '[ray-object1]',
      {
        motionPath: {
          path: '[ray1]',
          autoRotate: true
        },
        transformOrigin: 'center center',
        duration: 1.5,
        opacity: 1,
        ease: 'power1.inOut'
      },
      '<'
    )
    .to('[ray-object1]', { opacity: 0, duration: 0.5 }, '-=0.5');

  const timeline3 = gsap.timeline({
    repeat: -1,
    repeatDelay: 3,
    delay: 0.6
  });
  timeline3
    .to('[ray-object3]', { opacity: 1, duration: 0.08 })
    .to(
      '[ray-object3]',
      {
        motionPath: {
          path: '[ray3]',
          autoRotate: true,
          start: 1,
          end: 0
        },
        transformOrigin: 'center center',
        duration: 1.5,
        opacity: 1,
        ease: 'power1.inOut'
      },
      '<'
    )
    .to('[ray-object3]', { opacity: 0, duration: 0.5 }, '-=0.5');

  // card stack
  gsap.set('[cal-variant]', { opacity: 0 });
  let cards = gsap.utils.toArray('[cal-variant]');
  function updateZIndexAndAnimate() {
    let bottomCard = cards.pop();
    cards.unshift(bottomCard);

    cards.forEach((card, i) => {
      gsap.set(card, { zIndex: cards.length - i });

      if (i > 3) {
        gsap.to(card, { opacity: 0, duration: 0.5, ease: 'power3.out' });
      }
    });

    const newTopCard = cards[0];
    gsap.fromTo(
      newTopCard,
      { opacity: 0, y: 20, scale: 0.8, rotateX: -30 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.5,
        ease: 'power3.out'
      }
    );
  }
  setInterval(updateZIndexAndAnimate, 4500);

  // notices
  let notices = document.querySelectorAll('[notice]');
  console.log('notices', notices);

  function rotateNotices() {
    const container = document.querySelector('[notices-container]');
    if (!container) {
      console.error('No container found.');
      return;
    }

    let notices = Array.from(document.querySelectorAll('[notice]'));
    if (!notices.length) {
      console.error('No notices found.');
      return;
    }

    const firstNotice = notices[0];
    if (!firstNotice) {
      console.error('First notice is undefined.');
      return;
    }

    gsap.to(firstNotice, {
      opacity: 0,
      scale: 0,
      duration: 0.5,
      ease: 'power3.out',
      onComplete: () => {
        firstNotice.classList.remove('_4');
        firstNotice.classList.add('_1');
        firstNotice.setAttribute('notice', '1');

        container.appendChild(firstNotice);

        notices = Array.from(document.querySelectorAll('[notice]'));

        notices.forEach((notice, index) => {
          const newClass = `_${notices.length - index}`;
          notice.classList.remove('_1', '_2', '_3', '_4');
          notice.classList.add(newClass);
          notice.setAttribute('notice', notices.length - index);
        });

        const lastNotice = notices[notices.length - 1];
        gsap.fromTo(
          lastNotice,
          { opacity: 0, y: 30, scale: 0.6 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.2,
            delay: 0.2,
            ease: 'power3.out',
            onStart: () => {
              lastNotice.style.transition = 'none';
            },
            onComplete: () => {
              lastNotice.style.transition = 'all 500ms ease';
            },
            clearProps: 'all'
          }
        );
      }
    });
  }

  setTimeout(() => {
    setInterval(rotateNotices, 4500);
  }, 1200);

  //
  const locale = window.location.pathname.includes('/nl') ? 'NL' : 'EN';

  const stepsData =
    locale === 'NL'
      ? [
          { type: 'step', title: 'Bezoek profiel', status: 'Completed', content: 'Maandag 10:30', icon: 'https://cdn.prod.website-files.com/67014e966ac70f4e8a365764/677d9bbc500eda676d3918a7_message-circle-more%20(1).svg' },
          { type: 'waitFor', title: 'Wacht 1 dag' },
          { type: 'step', title: 'Stuur connectie verzoek', content: 'Hey {First Name}, ik zie dat je…', icon: 'https://cdn.prod.website-files.com/67014e966ac70f4e8a365764/677d9bbc500eda676d3918a7_message-circle-more%20(1).svg' },
          { type: 'waitFor', title: 'Wacht 2 dagen' },
          { type: 'step', title: 'Stuur follow-up bericht', content: 'Dank voor het connecten! Hier heb je…', icon: 'https://cdn.prod.website-files.com/67014e966ac70f4e8a365764/677d9bbc500eda676d3918a7_message-circle-more%20(1).svg' },
          { type: 'waitFor', title: 'Nieuwe doelgroep...' }
        ]
      : [
          { type: 'step', title: 'Visit profile', status: 'Completed', content: 'Monday 10:30', icon: 'https://cdn.prod.website-files.com/67014e966ac70f4e8a365764/677d9bbc500eda676d3918a7_message-circle-more%20(1).svg' },
          { type: 'waitFor', title: 'Wait for 1 day' },
          { type: 'step', title: 'Send connection request', content: 'Hey {First Name}, I noticed...', icon: 'https://cdn.prod.website-files.com/67014e966ac70f4e8a365764/677d9bbc500eda676d3918a7_message-circle-more%20(1).svg' },
          { type: 'waitFor', title: 'Wait for 2 days' },
          { type: 'step', title: 'Send follow-up message', content: "Appreciate the connection! Let's...", icon: 'https://cdn.prod.website-files.com/67014e966ac70f4e8a365764/677d9bbc500eda676d3918a7_message-circle-more%20(1).svg' },
          { type: 'waitFor', title: 'Targeting new profile...' }
        ];

  const container = document.querySelector('[config-container]');
  const baseStep = document.querySelector('[config="base-step"]');
  const baseWait = document.querySelector('[config="base-waitfor"]');

  baseStep.remove();
  baseWait.remove();

  const stepItems = stepsData.filter(i => i.type === 'step');
  const waitItems = stepsData.filter(i => i.type === 'waitFor');
  let sIndex = 0;
  let wIndex = 0;

  function createStep(data) {
    let c = baseStep.cloneNode(true);
    c.style.removeProperty('display');
    c.querySelector('[data="icon"]').src = data.icon || '';
    c.querySelector('[data="title"]').textContent = data.title;
    c.querySelector('[data="content"]').textContent = data.content;
    c.querySelector('[data="status"]').style.display = 'none';
    return c;
  }

  function createWait(data) {
    let c = baseWait.cloneNode(true);
    c.style.removeProperty('display');
    c.querySelector('[data="text"]').textContent = data.title;
    return c;
  }

  function getNextStep() {
    let d = stepItems[sIndex % stepItems.length];
    sIndex++;
    return createStep(d);
  }

  function getNextWait() {
    let d = waitItems[wIndex % waitItems.length];
    wIndex++;
    return createWait(d);
  }

  // Initial 3 items: step, wait, step
  container.appendChild(getNextStep());
  container.appendChild(getNextWait());
  container.appendChild(getNextStep());

  function updateActiveStep() {
    let steps = container.querySelectorAll('.config-step');
    steps.forEach(step => step.classList.remove('active')); // Remove from all
    let lastStep = steps[steps.length - 1]; // Get the last step
    if (lastStep) lastStep.classList.add('active'); // Apply only to the last step
    if (lastStep) lastStep.querySelector('[data="status"]').style.display = 'flex';
  }
  updateActiveStep();

  function animateHeightAndScale(element, toHeight, scaleEffect = false) {
    gsap.fromTo(element, { height: 0, opacity: 0, scale: scaleEffect ? 0.3 : 1 }, { height: toHeight, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' });
  }

  function rotateSteps() {
    let items = Array.from(container.children);
    if (items.length !== 3) return;

    let stepToRemove = items[2]; // Last step element
    let waitToRemove = items[1]; // Middle wait element

    // Animate out: collapse height & shrink wait elements
    gsap.to(waitToRemove, {
      height: 0,
      opacity: 0,
      scale: 0.8, // Shrink out effect for wait steps
      duration: 0.5,
      ease: 'power3.inOut'
    });

    gsap.to(stepToRemove, {
      height: 0,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.inOut',
      onComplete: () => {
        stepToRemove.remove();
        waitToRemove.remove();

        let newStep = getNextStep();
        let newWait = getNextWait();

        // Append new elements before measuring height
        container.prepend(newStep);
        container.insertBefore(newWait, container.children[1]);

        // Get natural height before setting it to 0
        let stepHeight = newStep.scrollHeight;
        let waitHeight = newWait.scrollHeight;

        // Reset their position correctly
        gsap.set([newStep, newWait], { height: 0, opacity: 0 });

        // Expand elements smoothly
        animateHeightAndScale(newStep, stepHeight);
        animateHeightAndScale(newWait, waitHeight, true); // Apply scale effect for wait step
        setTimeout(() => {
          updateActiveStep();
        }, 200);
      }
    });
  }

  let interval;
  function startRotation() {
    if (interval) return; // Prevent multiple intervals
    interval = setInterval(rotateSteps, 4500);
  }

  function stopRotation() {
    clearInterval(interval);
    interval = null;
  }

  function cleanUpOnFocus() {
    let items = Array.from(container.children);

    // If more than 3 elements exist (because of missed removals), clean up
    while (items.length > 3) {
      let excess = items.pop(); // Remove extra items from the bottom
      excess.remove();
    }

    startRotation(); // Restart the interval safely
  }

  // Start animation loop
  startRotation();

  // Ensure cleanup happens when the user returns to the page
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      cleanUpOnFocus();
    } else {
      stopRotation();
    }
  });

  //
}

const wrapper = document.querySelector('[campaign-animation-wrapper]');

if (wrapper) initCampaignAnimation();
