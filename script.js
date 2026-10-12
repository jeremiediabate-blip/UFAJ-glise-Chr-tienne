// ==========================================
// UFAJ ÉGLISE CHRÉTIENNE
// SCRIPT JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. NAVIGATION FLUIDE
    // ==========================================

    const liensMenu = document.querySelectorAll('nav a[href^="#"]');

    liensMenu.forEach(function (lien) {

        lien.addEventListener("click", function (event) {

            event.preventDefault();

            const id = this.getAttribute("href");

            const section = document.querySelector(id);

            if (section) {
                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });


    // ==========================================
    // 2. MESSAGE DE BIENVENUE
    // ==========================================

    console.log(
        "Bienvenue sur le site de UFAJ Église Chrétienne 🙏"
    );


    // ==========================================
    // 3. ANIMATION DES SECTIONS AU DÉFILEMENT
    // ==========================================

    const sections = document.querySelectorAll("main section");

    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("section-visible");

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    sections.forEach(function (section) {

        observer.observe(section);

    });


    // ==========================================
    // 4. ANIMATION DES IMAGES DE LA GALERIE
    // ==========================================

    const images = document.querySelectorAll("#galerie img");

    images.forEach(function (image) {

        image.addEventListener("click", function () {

            // Création de la fenêtre d'agrandissement
            const modal = document.createElement("div");

            modal.classList.add("image-modal");

            modal.innerHTML = `
                <div class="modal-content">

                    <button class="close-modal">
                        &times;
                    </button>

                    <img src="${this.src}" alt="${this.alt}">

                    <p>${this.alt}</p>

                </div>
            `;

            document.body.appendChild(modal);


            // Fermer la fenêtre
            const boutonFermer =
                modal.querySelector(".close-modal");

            boutonFermer.addEventListener("click", function () {

                modal.remove();

            });


            // Fermer en cliquant à côté de l'image
            modal.addEventListener("click", function (event) {

                if (event.target === modal) {

                    modal.remove();

                }

            });

        });

    });


    // ==========================================
    // 5. BOUTON WHATSAPP
    // ==========================================

    const boutonWhatsApp =
        document.querySelector('a[href*="wa.me"]');

    if (boutonWhatsApp) {

        boutonWhatsApp.addEventListener("click", function () {

            console.log(
                "Ouverture de WhatsApp pour contacter UFAJ."
            );

        });

    }


    // ==========================================
    // 6. MISE EN ÉVIDENCE DU MENU ACTIF
    // ==========================================

    const sectionsMenu =
        document.querySelectorAll("main section[id]");

    const menuLinks =
        document.querySelectorAll("nav a[href^='#']");


    window.addEventListener("scroll", function () {

        let sectionActuelle = "";

        sectionsMenu.forEach(function (section) {

            const position =
                section.getBoundingClientRect();

            if (position.top <= 150 &&
                position.bottom >= 150) {

                sectionActuelle = section.id;

            }

        });


        menuLinks.forEach(function (link) {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                "#" + sectionActuelle
            ) {

                link.classList.add("active");

            }

        });

    });


    // ==========================================
    // 7. MESSAGE POUR LE VERSET DU JOUR
    // ==========================================

    const sectionVerset =
        document.querySelector("#versets");

    if (sectionVerset) {

        sectionVerset.addEventListener("click", function () {

            console.log(
                "Que cette parole vous accompagne aujourd'hui 🙏"
            );

        });

    }


    // ==========================================
    // 8. ANNÉE AUTOMATIQUE DANS LE FOOTER
    // ==========================================

    const footer = document.querySelector("footer");

    if (footer) {

        const paragraphes =
            footer.querySelectorAll("p");

        paragraphes.forEach(function (p) {

            if (p.textContent.includes("2026")) {

                p.textContent =
                    p.textContent.replace(
                        "2026",
                        new Date().getFullYear()
                    );

            }

        });

    }


    // ==========================================
    // 9. BOUTON "DÉCOUVRIR NOTRE ÉGLISE"
    // ==========================================

    const boutonDecouvrir =
        document.querySelector('a[href="#apropos"]');

    if (boutonDecouvrir) {

        boutonDecouvrir.addEventListener("click", function () {

            const apropos =
                document.querySelector("#apropos");

            if (apropos) {

                apropos.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    }


    // ==========================================
    // 10. PETITE NOTIFICATION
    // ==========================================

    function afficherNotification(message) {

        const notification =
            document.createElement("div");

        notification.className =
            "notification-ufaj";

        notification.textContent = message;

        document.body.appendChild(notification);


        setTimeout(function () {

            notification.classList.add("show");

        }, 100);


        setTimeout(function () {

            notification.classList.remove("show");

            setTimeout(function () {

                notification.remove();

            }, 500);

        }, 4000);

    }


    // Message après quelques secondes
    setTimeout(function () {

        afficherNotification(
            "Bienvenue sur le site de UFAJ Église Chrétienne 🙏"
        );

    }, 1500);


});
```javascript
// Menu déroulant pour Android, iPhone et petites tablettes

const boutonMenu = document.getElementById("menu-toggle");
const menuPrincipal = document.getElementById("menu-principal");

if (boutonMenu && menuPrincipal) {
    boutonMenu.addEventListener("click", function () {
        const estOuvert = menuPrincipal.classList.toggle("menu-ouvert");

        boutonMenu.setAttribute("aria-expanded", String(estOuvert));
        boutonMenu.setAttribute(
            "aria-label",
            estOuvert ? "Fermer le menu" : "Ouvrir le menu"
        );

        boutonMenu.textContent = estOuvert ? "✕" : "☰";
    });

    menuPrincipal.querySelectorAll("a").forEach(function (lien) {
        lien.addEventListener("click", function () {
            menuPrincipal.classList.remove("menu-ouvert");
            boutonMenu.setAttribute("aria-expanded", "false");
            boutonMenu.setAttribute("aria-label", "Ouvrir le menu");
            boutonMenu.textContent = "☰";
        });
    });
}
