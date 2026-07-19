/**
 * NUTSTREE — Premium Sticky Add to Cart JS
 * - Watches main button to show/hide sticky bar
 * - Syncs price and selected variant
 * - Bidirectional variant sync (Main form <-> Sticky Bar)
 */

(function () {
  'use strict';

  const SELECTORS = {
    mainBtn:       '#MainProduct-{{ section.id }} .product-form__submit, .product-form__submit',
    stickyBar:     '.nt-sticky-atc',
    stickyBtn:     '.nt-sticky-atc__btn',
    stickyBtnText: '.nt-sticky-atc__btn-text',
    stickyPrice:   '#nt-sticky-price',
    stickyPills:   '.nt-sticky-atc__pill',
    stickySelect:  '#nt-sticky-select',
    variantInput:  '.product-variant-id',
    variantSelects:'variant-selects, variant-radios',
    addToCartForm: 'form[data-type="add-to-cart-form"]'
  };

  function init() {
    const bar = document.querySelector(SELECTORS.stickyBar);
    const stickyBtn = document.querySelector(SELECTORS.stickyBtn);
    const stickyPrice = document.querySelector(SELECTORS.stickyPrice);
    const stickyPills = document.querySelectorAll(SELECTORS.stickyPills);
    const stickySelect = document.querySelector(SELECTORS.stickySelect);

    if (!bar || !stickyBtn) return;

    // ── Find main ATC button ──
    const mainBtn = document.querySelector(SELECTORS.mainBtn);
    if (!mainBtn) return;

    // ── IntersectionObserver — show bar when main btn out of view ──
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            bar.classList.remove('is-visible');
          } else {
            if (!stickyBtn.disabled) {
              bar.classList.add('is-visible');
            }
          }
        });
      },
      { threshold: 0, rootMargin: '0px' }
    );
    observer.observe(mainBtn);

    // ── Helper to format price ──
    const formatMoney = (cents) => {
      // Shopify returns cents, we want DH format. Very basic formatter.
      if (typeof window.Shopify !== 'undefined' && window.Shopify.formatMoney) {
         // If Shopify's built-in formatter is loaded
         return window.Shopify.formatMoney(cents, window.theme?.moneyFormat || '{{amount}} DH');
      }
      return (cents / 100).toFixed(2) + ' DH';
    };

    // ── Helper: Sync state FROM main form TO sticky bar ──
    const syncFromVariant = (variant) => {
      // Update Price
      if (stickyPrice) {
        stickyPrice.innerHTML = formatMoney(variant.price);
      }
      
      // Update Button State
      if (variant.available) {
        stickyBtn.disabled = false;
        stickyBtn.removeAttribute('data-sold-out');
        const textSpan = stickyBtn.querySelector(SELECTORS.stickyBtnText);
        if(textSpan) textSpan.innerText = 'AJOUTER AU PANIER';
        // Only show bar if currently off-screen
        if (mainBtn.getBoundingClientRect().top < 0) {
           bar.classList.add('is-visible');
        }
      } else {
        stickyBtn.disabled = true;
        stickyBtn.setAttribute('data-sold-out', 'true');
        const textSpan = stickyBtn.querySelector(SELECTORS.stickyBtnText);
        if(textSpan) textSpan.innerText = 'ÉPUISÉ';
        bar.classList.remove('is-visible');
      }

      // Update Pills/Dropdown UI
      if (stickyPills.length > 0) {
        stickyPills.forEach(pill => {
          pill.classList.toggle('is-active', pill.dataset.variantId == variant.id);
        });
      }
      if (stickySelect) {
        stickySelect.value = variant.id;
      }
    };

    // Listen to Dawn's custom event
    document.addEventListener('variant:change', (event) => {
      const { variant } = event.detail;
      if (variant) syncFromVariant(variant);
    });

    // ── Helper: Sync state FROM sticky bar TO main form ──
    const triggerMainFormChange = (variantId) => {
      // If Dawn uses variant-selects or variant-radios, we have to simulate a click/change on the underlying inputs
      // Easiest robust way in Dawn OS 2.0 without knowing the exact structure is to change the hidden input and dispatch event
      const mainVariantSelects = document.querySelector(SELECTORS.variantSelects);
      
      if (mainVariantSelects) {
        // We look for the inputs inside variantSelects that map to the options of this variant.
        // But since we only have variantId, Dawn's variantSelects doesn't easily let us set variantId directly.
        // We have to find the specific variant data and set its options.
        const variantDataEl = mainVariantSelects.querySelector('[type="application/json"]');
        if (variantDataEl) {
          try {
            const variants = JSON.parse(variantDataEl.textContent);
            const targetVariant = variants.find(v => v.id == variantId);
            if (targetVariant) {
              // Now we have targetVariant.options (e.g. ["250g", "Naturel"]). We must click the right labels in main form.
              const fieldsets = Array.from(mainVariantSelects.querySelectorAll('fieldset, select'));
              targetVariant.options.forEach((opt, index) => {
                const group = fieldsets[index];
                if (group.tagName === 'SELECT') {
                  group.value = opt;
                  group.dispatchEvent(new Event('change', { bubbles: true }));
                } else if (group.tagName === 'FIELDSET') {
                  const radio = group.querySelector(`input[value="${opt.replace(/"/g, '\\"')}"]`);
                  if (radio) {
                    radio.checked = true;
                    radio.dispatchEvent(new Event('change', { bubbles: true }));
                  }
                }
              });
            }
          } catch(e) { console.error('Error parsing variant data', e); }
        }
      }
    };

    // Sticky Pills Click
    if (stickyPills.length > 0) {
      stickyPills.forEach(pill => {
        pill.addEventListener('click', () => {
          if (pill.disabled) return;
          triggerMainFormChange(pill.dataset.variantId);
        });
      });
    }

    // Sticky Select Change
    if (stickySelect) {
      stickySelect.addEventListener('change', (e) => {
        triggerMainFormChange(e.target.value);
      });
    }

    // ── Sticky button click → submit main product form ──
    stickyBtn.addEventListener('click', () => {
      if (stickyBtn.disabled) return;
      const form = document.querySelector(SELECTORS.addToCartForm);
      if (!form) return;

      stickyBtn.disabled = true;
      const textSpan = stickyBtn.querySelector(SELECTORS.stickyBtnText);
      if(textSpan) textSpan.innerText = '...';

      // Find the main add to cart button and click it to ensure all Dawn logic runs
      const mainSubmit = form.querySelector('[name="add"]');
      if (mainSubmit) {
         mainSubmit.click();
      } else {
         form.submit();
      }
      
      setTimeout(() => {
        stickyBtn.disabled = false;
        if(textSpan) textSpan.innerText = 'AJOUTER AU PANIER';
      }, 1000);
    });
  }

  // Init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
