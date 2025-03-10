$(function () {
  $('#slider-single').css('display', 'none');
  $('<div></div>').insertAfter('#slider-single');

  var single = $('#slider-single').next()[0];
  noUiSlider.create(single, {
    start: [1],
    range: {
      min: 1,
      max: 20
    },
    step: 1,
    connect: 'lower',
    tooltips: [wNumb({ decimals: 0, prefix: '', suffix: ' Users' })]
  });

  let lastPriceTier = null;
  let lastIsAnnual = null;
  let lastTotalPrice = null;
  let lastBillingPeriod = null;
  let lastUserCount = null;
  let tooltipTimeout;
  let isContainerVisible = true;

  function updatePrice(userCount) {
    let isAnnual = $('#toggle-annual').is(':checked');
    let priceTier = userCount <= 5 ? 'low' : 'high';
    let unitPrice = isAnnual ? (priceTier === 'low' ? 79 : 67) : priceTier === 'low' ? 99 : 84;

    if (priceTier !== lastPriceTier || isAnnual !== lastIsAnnual) {
      $('#price-business').animate({ opacity: 0, marginTop: '-10px' }, 150, function () {
        $(this).text(unitPrice);
        $(this).css({ marginTop: '10px' }).animate({ opacity: 1, marginTop: '0px' }, 150);
      });

      isAnnual ? $('#yearly-savings-label').fadeIn(150) : $('#yearly-savings-label').fadeOut(150);

      lastPriceTier = priceTier;
      lastIsAnnual = isAnnual;
    }

    let totalPrice = userCount * unitPrice;
    $('#business-total-price').text(totalPrice);

    if (priceTier === 'high') {
      let oldUnitPrice = isAnnual ? 99 : 119; // Define the old price
      let strikethroughPrice = userCount * oldUnitPrice;
      $('#striketrough-total-price').text(strikethroughPrice);
      $('#striketrough-total-price-container').fadeIn(150);
    } else {
      $('#striketrough-total-price-container').fadeOut(150);
    }

    $('#business-total-users').text(userCount + (userCount === 1 ? ' user' : ' users'));

    let billingPeriod = isAnnual ? 'Annually' : 'Monthly';
    if (billingPeriod !== lastBillingPeriod) {
      $('#billing-period').animate({ opacity: 0, marginTop: '-10px' }, 150, function () {
        $(this).text(billingPeriod);
        $(this).css({ marginTop: '10px' }).animate({ opacity: 1, marginTop: '0px' }, 150);
      });

      lastBillingPeriod = billingPeriod;
    }
  }

  function handleUpdate() {
    let userCount = parseInt(single.noUiSlider.get(), 10);
    if (userCount !== lastUserCount) {
      $('#slider-single-value').text(userCount);
      updatePrice(userCount);
      lastUserCount = userCount;
    }

    showTooltip();
  }

  function showTooltip() {
    clearTimeout(tooltipTimeout);
    $('.noUi-tooltip').fadeIn(150);

    tooltipTimeout = setTimeout(() => {
      $('.noUi-tooltip').fadeOut(300);
    }, 2000);
  }

  $('.noUi-handle').on('mousedown touchstart', function () {
    showTooltip();
  });

  single.noUiSlider.on('update', handleUpdate);

  $('#toggle-annual').on('change', function () {
    let userCount = parseInt(single.noUiSlider.get(), 10);
    updatePrice(userCount);
  });

  $('[data-tooltip-pos]').next().children().find('.noUi-tooltip').addClass('bottom');

  // Hide tooltip initially
  $('.noUi-tooltip').hide();

  $('#yearly-container').on('click', function () {
    let checkbox = $('#toggle-annual');

    checkbox.prop('checked', !checkbox.prop('checked')).trigger('change');
  });
});
