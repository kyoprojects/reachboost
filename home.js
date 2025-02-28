async function initForms() {
  // function closeModal(modalName) {
  //   const modal = document.querySelector(`[popupmodal=${modalName}]`);
  //   if (modal) {
  //     modal.style.display = 'none';
  //   }
  // }

  function handleTrialSignupEmail(event, form) {
    event.preventDefault();
    // const modal = document.querySelector('[popupmodal=waitlist-signup]');
    // document.querySelector('[input=waitlist-signup-name]').focus();
    // if (modal) {
    //   modal.style.display = 'flex';
    // }

    const emailInput = form.querySelector('input[formtrigger="trial-signup-email-input"]');
    const emailValue = emailInput ? emailInput.value : '';
    window.location.href = `/sign-up?email=${emailValue}`;

    // const waitlistEmailInput = document.querySelector('[input=waitlist-signup-email]');
    // if (waitlistEmailInput) {
    //   waitlistEmailInput.value = emailValue;
    //   waitlistEmailInput.style.backgroundColor = '#f0f0f0';
    // }
  }

  document.querySelectorAll('[formtrigger=trial-signup-email]').forEach(form => {
    event.preventDefault();
    const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
    const emailInput = form.querySelector('input[formtrigger=trial-signup-email-input]');

    if (submitButton) {
      submitButton.addEventListener('click', event => {
        handleTrialSignupEmail(event, form);
      });
    }
    if (emailInput) {
      emailInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          handleTrialSignupEmail(event, form);
        }
      });
    }
  });

  // const trialSignupForm = document.querySelector('[formtrigger=trial-signup]');
  // if (trialSignupForm) {
  //   trialSignupForm.addEventListener('submit', event => {
  //     event.preventDefault();
  //     const formData = new FormData(trialSignupForm);
  //     const data = {};
  //     formData.forEach((value, key) => {
  //       data[key] = value;
  //     });

  //     fetch('https://api.misc.sleak.chat/webhook/waitlist-signup', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(data)
  //     })
  //       .then(response => response.json())
  //       .then(result => {
  //         console.log('Form submitted successfully:', result);
  //       });
  //   });
  // }

  // Event listener for elements with the attribute [popupmodal-closetrigger={name}]
  document.querySelectorAll('[popupmodal-closetrigger]').forEach(closeTrigger => {
    const modalName = closeTrigger.getAttribute('popupmodal-closetrigger');

    closeTrigger.addEventListener('click', () => {
      closeModal(modalName);
    });
  });
}
initForms();

async function initGsap() {
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
}

initGsap();
