const hamburger = document.querySelector(".hamburger");
const bar1 = document.querySelector(".bar1");
const bar2 = document.querySelector(".bar2");
const bar3 = document.querySelector(".bar3");
const mobileNav = document.querySelector(".mobileNav")

hamburger.addEventListener("click", () => {
    bar1.classList.toggle("animateBar1");
    bar2.classList.toggle("animateBar2"); 
    bar3.classList.toggle("animateBar3");
    mobileNav.classList.toggle("openDrawer")     
});

function calculateWorkPeriod() {
    var startDate = new Date('2023-08-01');
    var endDate = new Date(); 
    
    var diff = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
    var years = Math.floor(diff / 365);
    var months = Math.floor((diff % 365) / 30);
    
    var durationElement = document.getElementById('duration');
    if (endDate.getFullYear() === startDate.getFullYear() && endDate.getMonth() === startDate.getMonth()) {
        durationElement.textContent = "Less than a month";
    } else if (months === 0) {
        durationElement.textContent = years + " yr";
    } else if (years === 0) {
        durationElement.textContent = months + " mos";
    } else {
        var yearsText = (years === 1) ? "yr" : "yrs";
        durationElement.textContent = years + " " + yearsText + " " + months + " mos";
    }
}


window.onload = function() {
    calculateWorkPeriod();
};


// Nastavení jazyka
  function switchLanguage(lang) {
    const elements = document.querySelectorAll('[data-en][data-cz]');
    
    elements.forEach(element => {
      const text = element.getAttribute(`data-${lang}`);
      if (text) {
        element.innerHTML = text;
      }
    });
  
    // Uložení preference do localStorage
    localStorage.setItem('preferredLanguage', lang);
  
    // Označení vybraného tlačítka
    const buttons = document.querySelectorAll('.language-switch button');
    buttons.forEach(button => {
      if (button.getAttribute('onclick').includes(lang)) {
        button.classList.add('selected'); 
      } else {
        button.classList.remove('selected');
      }
    });
  }

  
  function loadLanguagePreference() {
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en'; 
    switchLanguage(preferredLanguage);
  }
  
  document.addEventListener('DOMContentLoaded', loadLanguagePreference);
  

  document.addEventListener('DOMContentLoaded', () => {
    const platformFilter = document.getElementById('platformFilter');
    const dateFilter = document.getElementById('dateFilter');
    const certificates = document.querySelectorAll('.certificate');

    function filterCertificates() {
        const platformValue = platformFilter.value;
        const dateValue = dateFilter.value;

        certificates.forEach(certificate => {
            certificate.style.display = 'block';
            if (platformValue !== 'all' && certificate.dataset.platform !== platformValue) {
                certificate.style.display = 'none';
            }
        });

        const sortedCertificates = Array.from(certificates).sort((a, b) => {
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            return dateValue === 'newest' ? dateB - dateA : dateA - dateB;
        });

        sortedCertificates.forEach(cert => cert.parentNode.appendChild(cert));
    }

    platformFilter.addEventListener('change', filterCertificates);
    dateFilter.addEventListener('change', filterCertificates);

    filterCertificates();
});
