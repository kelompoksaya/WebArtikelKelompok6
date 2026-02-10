// main.js

document.addEventListener('DOMContentLoaded', function () {

  // === 1. Floating Contact Form ===
  const floatingContact = document.getElementById('floating-contact');
  const closeContactBtn = document.getElementById('close-contact');
  const contactForm = document.getElementById('contact-form');

  if (closeContactBtn) {
    closeContactBtn.addEventListener('click', () => {
      floatingContact.classList.add('hidden');
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const phone = document.getElementById('contact-phone').value.replace(/\D/g, '');
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !phone || !message) {
        alert('Harap isi semua field!');
        return;
      }

      const waNumber = '6281515458790';
      const encodedMsg = encodeURIComponent(
        `Halo, saya ${name}.\nNomor: +${phone}\nPesan:\n${message}`
      );
      const waUrl = `https://wa.me/${waNumber}?text=${encodedMsg}`;

      window.open(waUrl, '_blank');
      floatingContact.classList.add('hidden');
      contactForm.reset();
    });
  }

  // === 2. Expandable Card Explainer ===
  const cards = document.querySelectorAll('.card.p-4.text-center');
  const explainer = document.getElementById('card-explainer');
  const explainerTitle = document.getElementById('explainer-title');
  const explainerText = document.getElementById('explainer-text');
  const closeExplainerBtn = document.getElementById('close-explainer');

  const cardData = {
    'Pendidikan': {
      title: 'AI dalam Pendidikan',
      text: 'AI membantu siswa melalui tutor virtual yang menyesuaikan materi berdasarkan gaya belajar individu.'
    },
    'Kesehatan': {
      title: 'AI dalam Kesehatan',
      text: 'AI menganalisis data medis, gambar X-ray/MRI, dan membantu dokter mengambil keputusan.'
    },
    'Industri': {
      title: 'AI dalam Industri',
      text: 'AI digunakan untuk robot kolaboratif dan predictive maintenance pada mesin industri.'
    }
  };

  cards.forEach(card => {
    const titleEl = card.querySelector('h5');
    if (!titleEl) return;

    const titleText = titleEl.textContent.trim();

    card.addEventListener('click', () => {
      if (cardData[titleText]) {
        explainerTitle.textContent = cardData[titleText].title;
        explainerText.innerHTML = cardData[titleText].text;
        explainer.classList.remove('d-none');
        setTimeout(() => explainer.classList.add('show'), 10);
      }
    });
  });

  if (closeExplainerBtn) {
    closeExplainerBtn.addEventListener('click', () => {
      explainer.classList.remove('show');
      setTimeout(() => explainer.classList.add('d-none'), 300);
    });
  }

  // === 3. Navbar Active Highlight ===
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (
      href === currentPage ||
      (currentPage === '' && href === 'index.html')
    ) {
      link.classList.add('active');
    }
  });

  // === 4. DOWNLOAD PDF + LOADING EFFECT ===
  const downloadBtn = document.getElementById('downloadPdfBtn');

  if (downloadBtn) {
    const originalText = downloadBtn.innerHTML;

    downloadBtn.addEventListener('click', () => {
      downloadBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin me-2"></i>Mengunduh...';
      downloadBtn.classList.add('disabled');

      // Simulasi loading (browser handle download sebenarnya)
      setTimeout(() => {
        downloadBtn.innerHTML = originalText;
        downloadBtn.classList.remove('disabled');
      }, 3000);
    });
  }

  // === 5. REAL-TIME CLOCK WIB (Waktu Indonesia Barat) ===
  const currentTimeElement = document.getElementById('current-time');
  if (currentTimeElement) {
    function getWIBDateTime() {
      // Gunakan waktu lokal browser dengan offset UTC+7 (WIB)
      const now = new Date();
      const options = {
        timeZone: 'Asia/Jakarta',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      
      const formatter = new Intl.DateTimeFormat('id-ID', options);
      const parts = formatter.formatToParts(now);
      
      // Ekstrak bagian-bagian waktu
      const day = parts.find(p => p.type === 'weekday').value;
      const date = parts.find(p => p.type === 'day').value;
      const month = parts.find(p => p.type === 'month').value;
      const year = parts.find(p => p.type === 'year').value;
      const hour = parts.find(p => p.type === 'hour').value;
      const minute = parts.find(p => p.type === 'minute').value;
      const second = parts.find(p => p.type === 'second').value;
      
      // Format: "JUMAT, 06 FEBRUARI 2026 17:41:35"
      return `${day.toUpperCase()}, ${date} ${month.toUpperCase()} ${year} ${hour}:${minute}:${second}`;
    }

    function updateClock() {
      currentTimeElement.textContent = getWIBDateTime();
    }

    updateClock(); // Inisialisasi pertama
    setInterval(updateClock, 1000); // Perbarui setiap detik
  }

});