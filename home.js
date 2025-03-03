// async function initForms() {
//   // function closeModal(modalName) {
//   //   const modal = document.querySelector(`[popupmodal=${modalName}]`);
//   //   if (modal) {
//   //     modal.style.display = 'none';
//   //   }
//   // }

//   function handleTrialSignupEmail(event, form) {
//     event.preventDefault();
//     // const modal = document.querySelector('[popupmodal=waitlist-signup]');
//     // document.querySelector('[input=waitlist-signup-name]').focus();
//     // if (modal) {
//     //   modal.style.display = 'flex';
//     // }

//     const emailInput = form.querySelector('input[formtrigger="trial-signup-email-input"]');
//     const emailValue = emailInput ? emailInput.value : '';
//     console.log(emailValue);
//     window.location.href = `/sign-up?email=${emailValue}`;

//     // const waitlistEmailInput = document.querySelector('[input=waitlist-signup-email]');
//     // if (waitlistEmailInput) {
//     //   waitlistEmailInput.value = emailValue;
//     //   waitlistEmailInput.style.backgroundColor = '#f0f0f0';
//     // }
//   }

//   document.querySelectorAll('[formtrigger=trial-signup-email]').forEach(form => {
//     form.addEventListener('submit', event => {
//       event.preventDefault();
//     });
//     const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
//     const emailInput = form.querySelector('input[formtrigger=trial-signup-email-input]');

//     if (submitButton) {
//       submitButton.addEventListener('click', event => {
//         handleTrialSignupEmail(event, form);
//       });
//     }
//     if (emailInput) {
//       emailInput.addEventListener('keydown', event => {
//         if (event.key === 'Enter') {
//           handleTrialSignupEmail(event, form);
//         }
//       });
//     }
//   });

//   // const trialSignupForm = document.querySelector('[formtrigger=trial-signup]');
//   // if (trialSignupForm) {
//   //   trialSignupForm.addEventListener('submit', event => {
//   //     event.preventDefault();
//   //     const formData = new FormData(trialSignupForm);
//   //     const data = {};
//   //     formData.forEach((value, key) => {
//   //       data[key] = value;
//   //     });

//   //     fetch('https://api.misc.sleak.chat/webhook/waitlist-signup', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json'
//   //       },
//   //       body: JSON.stringify(data)
//   //     })
//   //       .then(response => response.json())
//   //       .then(result => {
//   //         console.log('Form submitted successfully:', result);
//   //       });
//   //   });
//   // }

//   // Event listener for elements with the attribute [popupmodal-closetrigger={name}]
//   document.querySelectorAll('[popupmodal-closetrigger]').forEach(closeTrigger => {
//     const modalName = closeTrigger.getAttribute('popupmodal-closetrigger');

//     closeTrigger.addEventListener('click', () => {
//       closeModal(modalName);
//     });
//   });
// }
// initForms();

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

  //
  const stepsData = [
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

  function rotateSteps() {
    let items = Array.from(container.children);
    if (items.length !== 3) return; // Ensure we always maintain 3 elements

    let stepToRemove = items[2]; // Last element (step)
    let waitToRemove = items[1]; // Middle element (wait)

    gsap.to([stepToRemove, waitToRemove], {
      opacity: 0,
      y: 30, // Move down slightly further for a better exit feel
      duration: 0.6, // Make exit animation slightly slower
      ease: 'power3.inOut', // Smooth acceleration & deceleration
      onComplete: () => {
        stepToRemove.remove();
        waitToRemove.remove();

        let newStep = getNextStep();
        let newWait = getNextWait();

        // Set initial position & opacity for smooth appearance
        gsap.set([newStep, newWait], { opacity: 0, y: -30 });

        // Maintain Step → Wait → Step order
        container.prepend(newStep);
        container.insertBefore(newWait, container.children[1]);

        // Smoothly animate the new elements in
        gsap.to([newStep, newWait], {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out', // Make entrance slightly softer
          stagger: 0.1
        });
        setTimeout(() => {
          updateActiveStep();
        }, 60);
      }
    });
  }

  let interval;
  function startRotation() {
    if (interval) return; // Prevent multiple intervals
    interval = setInterval(rotateSteps, 4000);
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

initGsap();
