/**
 * Cookie Consent Manager
 * GDPR-Compliant Cookie Consent System
 * Manages user preferences for Essential, Analytics, and Marketing cookies
 */

const CookieConsent = {
  STORAGE_KEY: 'cookie-consent-preferences',
  LANGUAGE_KEY: 'cookie-consent-language',
  BANNER_SHOWN_KEY: 'cookie-consent-shown',

  // Resolve policy URLs consistently from any page location (root, /blog/, /tecnical/)
  getPolicyUrl(policyFile) {
    const protocol = window.location.protocol;

    if (protocol === 'http:' || protocol === 'https:') {
      const path = window.location.pathname;
      const segments = (path || '').split('/').filter(Boolean);
      const firstSegment = segments[0] || '';
      const isFileLike = firstSegment.includes('.');
      const isKnownTopLevel = firstSegment === 'blog' || firstSegment === 'tecnical' || firstSegment === '';
      const projectPrefix = (!isFileLike && !isKnownTopLevel) ? `/${firstSegment}/` : '/';
      return `${window.location.origin}${projectPrefix}tecnical/${policyFile}`;
    }

    // file:// fallback for local preview
    const normalizedPath = (window.location.pathname || '').replace(/\\/g, '/');
    const inTechnical = normalizedPath.includes('/tecnical/');
    const inBlog = normalizedPath.includes('/blog/');

    if (inTechnical) return policyFile;
    return inBlog ? `../tecnical/${policyFile}` : `tecnical/${policyFile}`;
  },

  // Default preferences
  defaultPreferences: {
    essential: true, // Always true - these cookies are required for site functionality
    analytics: false,
    marketing: false
  },

  // Cookie categories with descriptions
  categories: {
    essential: {
      label_it: 'Essenziali',
      label_en: 'Essential',
      description_it: 'Cookie necessari per il funzionamento del sito. Non richiedono consenso.',
      description_en: 'Cookies necessary for site functionality. Consent not required.',
      required: true
    },
    analytics: {
      label_it: 'Analitici',
      label_en: 'Analytics',
      description_it: 'Google Analytics per analizzare il comportamento degli utenti e migliorare il sito.',
      description_en: 'Google Analytics to analyze user behavior and improve the site.',
      required: false
    },
    marketing: {
      label_it: 'Marketing',
      label_en: 'Marketing',
      description_it: 'Cookie di tracciamento per pubblicità mirata e remarketing.',
      description_en: 'Tracking cookies for targeted advertising and remarketing.',
      required: false
    }
  },

  // Initialize the consent system
  init() {
    this.loadLanguage();
    // Check if banner should be shown BEFORE creating it
    this.bannerShouldShow = !localStorage.getItem(this.BANNER_SHOWN_KEY);
    this.setupBannerHTML();
    this.attachEventListeners();
    this.loadPreferences();
    this.handleGoogleAnalytics();
    this.showBannerIfNeeded();
  },

  // Load or default language
  loadLanguage() {
    const savedLang = localStorage.getItem(this.LANGUAGE_KEY);
    if (savedLang && ['it', 'en'].includes(savedLang)) {
      this.language = savedLang;
    } else {
      // Detect browser language
      const browserLang = navigator.language || navigator.userLanguage;
      this.language = browserLang.toLowerCase().startsWith('it') ? 'it' : 'en';
      localStorage.setItem(this.LANGUAGE_KEY, this.language);
    }
  },

  // Get translated text
  t(key, fallback) {
    const translations = {
      it: {
        banner_title: 'Cookie e Privacy',
        banner_text: 'Utilizziamo cookie per migliorare la tua esperienza. Alcuni sono essenziali, altri ci aiutano ad analizzare il traffico e a mostrarti contenuti rilevanti.',
        banner_customize: 'Personalizza',
        banner_accept_all: 'Accetta tutto',
        banner_reject_all: 'Rifiuta tutto',
        modal_title: 'Impostazioni Cookie',
        modal_customize_text: 'Personalizza quali cookie desideri accettare. I cookie essenziali sono sempre abilitati.',
        modal_save: 'Salva impostazioni',
        modal_accept_all: 'Accetta tutto',
        modal_reject_all: 'Rifiuta tutto',
        modal_view_policy: 'Leggi la Cookie Policy',
        modal_view_privacy: 'Leggi la Privacy Policy',
        language: 'Lingua'
      },
      en: {
        banner_title: 'Cookies & Privacy',
        banner_text: 'We use cookies to enhance your experience. Some are essential, while others help us analyze traffic and show you relevant content.',
        banner_customize: 'Customize',
        banner_accept_all: 'Accept All',
        banner_reject_all: 'Reject All',
        modal_title: 'Cookie Settings',
        modal_customize_text: 'Customize which cookies you want to accept. Essential cookies are always enabled.',
        modal_save: 'Save Settings',
        modal_accept_all: 'Accept All',
        modal_reject_all: 'Reject All',
        modal_view_policy: 'Read Cookie Policy',
        modal_view_privacy: 'Read Privacy Policy',
        language: 'Language'
      }
    };

    return translations[this.language]?.[key] || fallback || key;
  },

  // Setup banner HTML
  setupBannerHTML() {
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    // Hide banner completely from rendering (not just CSS transform) to prevent flash
    // Use display:none because it removes from render tree completely
    banner.style.display = 'none';
    banner.innerHTML = `
      <div class="cookie-consent-container">
        <div class="cookie-consent-content">
          <h3 class="cookie-consent-title">${this.t('banner_title')}</h3>
          <p class="cookie-consent-text">${this.t('banner_text')}</p>
        </div>
        <div class="cookie-consent-buttons">
          <button id="cookie-btn-customize" class="cookie-btn cookie-btn-customize">${this.t('banner_customize')}</button>
          <button id="cookie-btn-reject" class="cookie-btn cookie-btn-secondary">${this.t('banner_reject_all')}</button>
          <button id="cookie-btn-accept-all" class="cookie-btn cookie-btn-primary">${this.t('banner_accept_all')}</button>
        </div>
      </div>
    `;
    document.body.appendChild(banner);

    // Setup modal
    const modal = document.createElement('div');
    modal.id = 'cookie-consent-modal';
    modal.className = 'cookie-consent-modal-hidden';
    modal.innerHTML = `
      <div class="cookie-consent-modal-overlay"></div>
      <div class="cookie-consent-modal-content">
        <button id="cookie-modal-close" class="cookie-modal-close">&times;</button>
        <h2>${this.t('modal_title')}</h2>
        <p>${this.t('modal_customize_text')}</p>
        
        <div class="cookie-categories">
          ${this.getCategoriesHTML()}
        </div>

        <div class="cookie-modal-links">
          <a href="${this.getPolicyUrl('cookie-policy.html')}" target="_blank">${this.t('modal_view_policy')}</a>
          <a href="${this.getPolicyUrl('privacy-policy.html')}" target="_blank">${this.t('modal_view_privacy')}</a>
        </div>

        <div class="cookie-modal-language">
          <label>${this.t('language')}:</label>
          <select id="cookie-language-select">
            <option value="it">Italiano</option>
            <option value="en">English</option>
          </select>
        </div>

        <div class="cookie-modal-buttons">
          <button id="cookie-modal-btn-reject" class="cookie-btn cookie-btn-secondary">${this.t('modal_reject_all')}</button>
          <button id="cookie-modal-btn-save" class="cookie-btn cookie-btn-primary">${this.t('modal_save')}</button>
          <button id="cookie-modal-btn-accept" class="cookie-btn cookie-btn-success">${this.t('modal_accept_all')}</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  },

  // Generate categories HTML
  getCategoriesHTML() {
    let html = '';
    for (const [key, category] of Object.entries(this.categories)) {
      const label = this.language === 'it' ? category.label_it : category.label_en;
      const description = this.language === 'it' ? category.description_it : category.description_en;
      const disabled = category.required ? 'disabled' : '';
      const checked = category.required ? 'checked' : '';

      html += `
        <div class="cookie-category">
          <div class="cookie-category-header">
            <input 
              type="checkbox" 
              id="cookie-toggle-${key}" 
              class="cookie-checkbox" 
              data-category="${key}"
              ${checked}
              ${disabled}
            />
            <label for="cookie-toggle-${key}" class="cookie-category-label">
              <strong>${label}</strong>
              ${category.required ? '<span class="cookie-required">(required)</span>' : ''}
            </label>
          </div>
          <p class="cookie-category-description">${description}</p>
        </div>
      `;
    }
    return html;
  },

  // Attach event listeners
  attachEventListeners() {
    // Banner buttons
    document.getElementById('cookie-btn-accept-all')?.addEventListener('click', () => this.acceptAll());
    document.getElementById('cookie-btn-reject')?.addEventListener('click', () => this.rejectAll());
    document.getElementById('cookie-btn-customize')?.addEventListener('click', () => this.showModal());

    // Modal buttons
    document.getElementById('cookie-modal-close')?.addEventListener('click', () => this.hideModal());
    document.getElementById('cookie-modal-btn-accept')?.addEventListener('click', () => this.acceptAll());
    document.getElementById('cookie-modal-btn-reject')?.addEventListener('click', () => this.rejectAll());
    document.getElementById('cookie-modal-btn-save')?.addEventListener('click', () => this.savePreferences());
    document.querySelector('.cookie-consent-modal-overlay')?.addEventListener('click', () => this.hideModal());

    // Language select
    document.getElementById('cookie-language-select')?.addEventListener('change', (e) => {
      this.language = e.target.value;
      localStorage.setItem(this.LANGUAGE_KEY, this.language);
      location.reload();
    });

    // Checkbox changes
    document.querySelectorAll('.cookie-checkbox:not(:disabled)').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const category = checkbox.getAttribute('data-category');
        // Update checkbox in banner if exists
        const bannerCheckbox = document.querySelector(`#cookie-toggle-${category}`);
        if (bannerCheckbox) {
          bannerCheckbox.checked = checkbox.checked;
        }
      });
    });
  },

  // Show modal
  showModal() {
    const modal = document.getElementById('cookie-consent-modal');
    if (modal) {
      modal.classList.remove('cookie-consent-modal-hidden');
      // Update language select to current
      const select = document.getElementById('cookie-language-select');
      if (select) select.value = this.language;
      // Update checkboxes to current preferences
      this.updateModalCheckboxes();
    }
  },

  // Hide modal
  hideModal() {
    const modal = document.getElementById('cookie-consent-modal');
    if (modal) {
      modal.classList.add('cookie-consent-modal-hidden');
    }
  },

  // Update modal checkboxes to reflect current preferences
  updateModalCheckboxes() {
    const prefs = this.getPreferences();
    document.querySelectorAll('.cookie-checkbox').forEach(checkbox => {
      const category = checkbox.getAttribute('data-category');
      checkbox.checked = prefs[category] || false;
    });
  },

  // Save preferences from modal
  savePreferences() {
    const prefs = { ...this.defaultPreferences };
    document.querySelectorAll('.cookie-checkbox').forEach(checkbox => {
      const category = checkbox.getAttribute('data-category');
      prefs[category] = checkbox.checked;
    });
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(prefs));
    localStorage.setItem(this.BANNER_SHOWN_KEY, 'true');
    this.hideBanner();
    this.hideModal();
    this.handleGoogleAnalytics();
    this.reloadAnalyticsScripts();
  },

  // Accept all cookies
  acceptAll() {
    const prefs = {
      essential: true,
      analytics: true,
      marketing: true
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(prefs));
    localStorage.setItem(this.BANNER_SHOWN_KEY, 'true');
    this.hideBanner();
    this.hideModal();
    this.handleGoogleAnalytics();
    this.reloadAnalyticsScripts();
  },

  // Reject all non-essential cookies
  rejectAll() {
    const prefs = { ...this.defaultPreferences };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(prefs));
    localStorage.setItem(this.BANNER_SHOWN_KEY, 'true');
    this.hideBanner();
    this.hideModal();
    this.handleGoogleAnalytics();
  },

  // Get user preferences
  getPreferences() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : { ...this.defaultPreferences };
  },

  // Check if user has given consent for a category
  hasConsent(category) {
    const prefs = this.getPreferences();
    return prefs[category] || false;
  },

  // Hide banner
  hideBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.classList.add('cookie-consent-hidden');
    }
  },

  // Show banner
  showBannerIfNeeded() {
    const banner = document.getElementById('cookie-consent-banner');
    const shown = localStorage.getItem(this.BANNER_SHOWN_KEY);
    
    if (!shown && banner) {
      // User hasn't seen banner yet - show it
      // Remove display:none to allow rendering, then trigger animation
      banner.style.display = '';
      // Force reflow to ensure display property is applied before animation
      void banner.offsetHeight;
      // Now remove the hidden class to trigger slide-up animation
      banner.classList.remove('cookie-consent-hidden');
    }
    // If banner already shown, keep display:none
  },

  // Load preferences
  loadPreferences() {
    const prefs = this.getPreferences();
    // Could update UI based on preferences here if needed
  },

  // Handle Google Analytics conditionally
  handleGoogleAnalytics() {
    const hasAnalyticsConsent = this.hasConsent('analytics');
    window['ga-disable-G-DTL9TKB503'] = !hasAnalyticsConsent;

    if (hasAnalyticsConsent) {
      // Enable Google Analytics if it exists
      if (typeof gtag === 'function') {
        gtag('consent', 'update', {
          'analytics_storage': 'granted'
        });
      }
    }
  },

  // Reload analytics scripts if user grants consent
  reloadAnalyticsScripts() {
    // Reload the page to trigger GA script loading if consent was just granted
    if (this.hasConsent('analytics') && !window.gtag) {
      location.reload();
    }
  }
};

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    CookieConsent.init();
  });
} else {
  CookieConsent.init();
}
