/**
 * NUTSTREE — Sticky Add to Cart JS
 * - IntersectionObserver watches the main ATC button
 * - Shows/hides the sticky bar when main button exits viewport
 * - Syncs variant title, price, availability with main product form
 * - Submits to same cart endpoint as main form
 */

(function () {
  'use strict';

  const SELECTORS = {
    mainBtn:       '#MainProduct-{{ section.id }} .product-form__submit, .product-form__submit',
    stickyBar:     '.nt-sticky-atc',
    stickyBtn:     '.nt-sticky-atc__btn',
    stickyPrice:   '.nt-sticky-atc__price',
    stickyVariant: '.nt-sticky-atc__variant',
    variantInput:  '.product-variant-id',
    // Dawn's variant selector custom element
    variantSelects: 'variant-selects',
  };

  function init() {
    const bar        = document.querySelector(SELECTORS.stickyBar);
    const stickyBtn  = document.querySelector(SELECTORS.stickyBtn);
    const priceEl    = document.querySelector(SELECTORS.stickyPrice);
    const variantEl  = document.querySelector(SELECTORS.stickyVariant);

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
            // Only show if not disabled (not sold out)
            if (!stickyBtn.disabled) {
              bar.classList.add('is-visible');
            }
          }
        });
      },
      { threshold: 0, rootMargin: '0px' }
    );

    observer.observe(mainBtn);

    // ── Sync variant info when Dawn fires variant:change ──
    document.addEventListener('variant:change', (event) => {
      const { variant } = event.detail;
      if (!variant) return;

      syncFromVariant(variant, stickyBtn, priceEl, variantEl);
    });

    // ── Also listen to Dawn's own PubSub (subscribe to CART events) ──
    // Fallback: observe the hidden variant input for changes
    const variantInput = document.querySelector(SELECTORS.variantInput);
    if (variantInput) {
      const inputObserver = new MutationObserver(() => {
        const variantSelectsEl = document.querySelector(SELECTORS.variantSelects);
        if (variantSelectsEl) {
          // Get current variant from the script tag Dawn writes
          const variantData = document.querySelector('[data-selected-variant]');
          if (variantData) {
            try {
              const variant = JSON.parse(variantData.textContent);
              if (variant) syncFromVariant(variant, stickyBtn, priceEl, variantEl);
            } catch (e) {}
          }
        }
      });
      inputObserver.observe(variantInput, { attributes: true, attributeFilter: ['value', 'disabled'] });
    }

    // ── Sticky button click → submit main product form ──
    stickyBtn.addEventListener('click', () => {
      if (stickyBtn.disabled) return;

      // Find and submit the main product form
      const form = document.querySelector('form[data-type="add-to-cart-form"]');
      if (!form) return;

      stickyBtn.classList.add('loading');
      stickyBtn.disabled = true;

      // Use fetch to add to cart (same as Dawn's product-form.js pattern)
      const variantId = form.querySelector('.product-variant-id')?.value;
      if (!variantId) {
        stickyBtn.classList.remove('loading');
        stickyBtn.disabled = false;
        return;
      }

      fetch(window.routes.cart_add_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({ id: variantId, quantity: 1 }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 422) {
            console.warn('[NutstreeStickyATC] Erreur panier:', data.description);
          } else {
            // Fire Dawn's cart:refresh event to update cart count bubble
            document.dispatchEvent(new CustomEvent('cart:refresh', { bubbles: true }));
            // Brief visual feedback
            const origText = stickyBtn.querySelector('.nt-sticky-atc__btn-text');
            if (origText) {
              const prev = origText.textContent;
              origText.textContent = '✓ Ajouté !';
              setTimeout(() => { origText.textContent = prev; }, 1800);
            }
          }
        })
        .catch(console.error)
        .finally(() => {
          stickyBtn.classList.remove('loading');
          stickyBtn.disabled = false;
        });
    });
  }

  function syncFromVariant(variant, btn, priceEl, variantEl) {
    // Availability
    const available = variant.available;
    btn.disabled = !available;

    if (!available) {
      btn.setAttribute('data-sold-out', '');
      const textEl = btn.querySelector('.nt-sticky-atc__btn-text');
      if (textEl) textEl.textContent = window.variantStrings?.soldOut || 'Épuisé';
    } else {
      btn.removeAttribute('data-sold-out');
      const textEl = btn.querySelector('.nt-sticky-atc__btn-text');
      if (textEl) textEl.textContent = window.variantStrings?.addToCart || 'Ajouter au panier';
    }

    // Price
    if (priceEl && variant.price !== undefined) {
      const price = (variant.price / 100).toFixed(2) + ' MAD';
      priceEl.textContent = price;
    }

    // Variant title
    if (variantEl && variant.title && variant.title !== 'Default Title') {
      variantEl.textContent = variant.title;
      variantEl.style.display = '';
    } else if (variantEl) {
      variantEl.style.display = 'none';
    }
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
