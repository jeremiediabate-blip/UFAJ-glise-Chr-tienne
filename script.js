
// =====================================================
// UFAJ ÉGLISE CHRÉTIENNE
// SCRIPT JAVASCRIPT PRINCIPAL
// =====================================================

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // -------------------------------------------------
    // 1. ÉLÉMENTS PRINCIPAUX
    // -------------------------------------------------

    const boutonMenu = document.getElementById("menu-toggle");
    const menuPrincipal = document.getElementById("menu-principal");
    const sections = document.querySelectorAll("main section[id]");
    const liensNavigation = document.querySelectorAll(
        '#menu-principal a[href^="#"]'
    );

    // -------------------------------------------------
    // 2. STYLES DES FONCTIONNALITÉS JAVASCRIPT
    // -------------------------------------------------

    const stylesDynamiques = document.createElement("style");

    stylesDynamiques.textContent = `
        .section-visible {
            animation: ufaj-apparition 0.65s ease both;
        }

        @keyframes ufaj-apparition {
            from {
                opacity: 0;
                transform: translateY(18px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        #menu-principal a.active {
            color: #B5121B;
        }

        #menu-principal a.active::after {
            width: 100%;
        }

        .image-modal {
            position: fixed;
            inset: 0;
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: rgba(0, 0, 0, 0.92);
        }

        .modal-content {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            width: min(100%, 1000px);
            max-height: 95vh;
        }

        .modal-content img {
            display: block;
            max-width: 100%;
            max-height: 80vh;
            width: auto;
            height: auto;
            object-fit: contain;
            border-radius: 8px;
        }

        .modal-content p {
            color: #FFFFFF;
            text-align: center;
        }

        .close-modal {
            align-self: flex-end;
            width: 44px;
            height: 44px;
            border: 0;
            border-radius: 50%;
            background: #B5121B;
            color: #FFFFFF;
            font-size: 30px;
            cursor: pointer;
        }

        .notification-ufaj {
            position: fixed;
            right: 20px;
            bottom: 20px;
            z-index: 1500;
            width: min(360px, calc(100% - 40px));
            padding: 16px 20px;
            border-left: 5px solid #D4A84F;
            border-radius: 10px;
            background: #FFFFFF;
            color: #111111;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            opacity: 0;
            transform: translateY(15px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .notification-ufaj.show {
            opacity: 1;
            transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
            .section-visible {
                animation: none;
            }

            .notification-ufaj {
                transition: none;
            }
        }
    `;

    document.head.appendChild(stylesDynamiques);

    // -------------------------------------------------
    // 3. MENU MOBILE
    // -------------------------------------------------

    function fermerMenu() {
        if (!boutonMenu || !menuPrincipal) return;

        menuPrincipal.classList.remove("menu-ouvert");

        boutonMenu.setAttribute("aria-expanded", "false");
        boutonMenu.setAttribute("aria-label", "Ouvrir le menu");
        boutonMenu.textContent = "☰";
    }

    function ouvrirMenu() {
        if (!boutonMenu || !menuPrincipal) return;

        menuPrincipal.classList.add("menu-ouvert");

        boutonMenu.setAttribute("aria-expanded", "true");
        boutonMenu.setAttribute("aria-label", "Fermer le menu");
        boutonMenu.textContent = "✕";
    }

    if (boutonMenu && menuPrincipal) {
        boutonMenu.addEventListener("click", function () {
            const estOuvert =
                menuPrincipal.classList.contains("menu-ouvert");

            if (estOuvert) {
                fermerMenu();
            } else {
                ouvrirMenu();
            }
        });

        // Fermer le menu après la sélection d'une rubrique.
        menuPrincipal.querySelectorAll("a").forEach(function (lien) {
            lien.addEventListener("click", fermerMenu);
        });

        // Fermer le menu avec Échap.
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                fermerMenu();
            }
        });

        // Réinitialiser le menu lors du passage à l'écran large.
        window.addEventListener("resize", function () {
            if (window.innerWidth > 768) {
                fermerMenu();
            }
        });

        fermerMenu();
    }

    // -------------------------------------------------
    // 4. NAVIGATION ET SECTIONS
    // -------------------------------------------------

    // Le défilement fluide est géré par le CSS :
    // html { scroll-behavior: smooth; }
    // On évite donc d'ajouter plusieurs gestionnaires
    // de défilement sur les mêmes liens.

    if ("IntersectionObserver" in window) {
        const observateurSections = new IntersectionObserver(
            function (entrees) {
                entrees.forEach(function (entree) {
                    if (entree.isIntersecting) {
                        entree.target.classList.add("section-visible");
                        observateurSections.unobserve(entree.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        sections.forEach(function (section) {
            observateurSections.observe(section);
        });
    } else {
        sections.forEach(function (section) {
            section.classList.add("section-visible");
        });
    }

    // -------------------------------------------------
    // 5. MISE EN ÉVIDENCE DE LA RUBRIQUE ACTIVE
    // -------------------------------------------------

    function mettreAJourMenuActif() {
        let sectionActuelle = "";
        const hauteurEntete = 110;

        sections.forEach(function (section) {
            const position = section.getBoundingClientRect();

            if (
                position.top <= hauteurEntete &&
                position.bottom > hauteurEntete
            ) {
                sectionActuelle = section.id;
            }
        });

        // Si la page est arrivée tout en haut.
        if (window.scrollY < 10 && sections.length > 0) {
            sectionActuelle = sections[0].id;
        }

        // Si la page est arrivée tout en bas.
        if (
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 5
        ) {
            const derniereSection = sections[sections.length - 1];

            if (derniereSection) {
                sectionActuelle = derniereSection.id;
            }
        }

        liensNavigation.forEach(function (lien) {
            const actif =
                lien.getAttribute("href") === "#" + sectionActuelle;

            lien.classList.toggle("active", actif);

            if (actif) {
                lien.setAttribute("aria-current", "location");
            } else {
                lien.removeAttribute("aria-current");
            }
        });
    }

    let demandeAnimation = false;

    window.addEventListener(
        "scroll",
        function () {
            if (!demandeAnimation) {
                window.requestAnimationFrame(function () {
                    mettreAJourMenuActif();
                    demandeAnimation = false;
                });

                demandeAnimation = true;
            }
        },
        { passive: true }
    );

    window.addEventListener("resize", mettreAJourMenuActif);
    mettreAJourMenuActif();

    // -------------------------------------------------
    // 6. GALERIE : AGRANDISSEMENT DES IMAGES
    // -------------------------------------------------

    const imagesGalerie = document.querySelectorAll(
        "#galerie .galerie-images img"
    );

    let modalOuverte = null;
    let elementAvantModal = null;
    let debordementAvantModal = "";

    function fermerImage() {
        if (!modalOuverte) return;

        modalOuverte.remove();
        modalOuverte = null;

        document.body.style.overflow = debordementAvantModal;

        document.removeEventListener("keydown", gererClavierModal);

        if (elementAvantModal && elementAvantModal.isConnected) {
            elementAvantModal.focus();
        }

        elementAvantModal = null;
    }

    function gererClavierModal(event) {
        if (event.key === "Escape") {
            fermerImage();
        }
    }

    function ouvrirImage(image) {
        if (modalOuverte) return;

        elementAvantModal = document.activeElement;
        debordementAvantModal = document.body.style.overflow;

        const modal = document.createElement("div");
        modal.className = "image-modal";
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute("aria-label", image.alt || "Image de la galerie");

        const contenu = document.createElement("div");
        contenu.className = "modal-content";

        const boutonFermer = document.createElement("button");
        boutonFermer.type = "button";
        boutonFermer.className = "close-modal";
        boutonFermer.setAttribute("aria-label", "Fermer l'image");
        boutonFermer.textContent = "×";

        const grandeImage = document.createElement("img");
        grandeImage.src = image.currentSrc || image.src;
        grandeImage.alt = image.alt;

        const description = document.createElement("p");
        description.textContent = image.alt;

        contenu.appendChild(boutonFermer);
        contenu.appendChild(grandeImage);

        if (image.alt) {
            contenu.appendChild(description);
        }

        modal.appendChild(contenu);
        document.body.appendChild(modal);

        modalOuverte = modal;
        document.body.style.overflow = "hidden";

        boutonFermer.addEventListener("click", fermerImage);

        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                fermerImage();
            }
        });

        document.addEventListener("keydown", gererClavierModal);

        boutonFermer.focus();
    }

    imagesGalerie.forEach(function (image) {
        image.addEventListener("click", function () {
            ouvrirImage(image);
        });

        // Permet également l'ouverture au clavier.
        if (!image.hasAttribute("tabindex")) {
            image.setAttribute("tabindex", "0");
        }

        image.addEventListener("keydown", function (event) {
            if (
                event.key === "Enter" ||
                event.key === " "
            ) {
                event.preventDefault();
                ouvrirImage(image);
            }
        });
    });

    // -------------------------------------------------
    // 7. WHATSAPP
    // -------------------------------------------------

    const boutonWhatsApp = document.querySelector(
        '#contact a[href*="wa.me"]'
    );

    if (boutonWhatsApp) {
        boutonWhatsApp.addEventListener("click", function () {
            console.log("Ouverture de WhatsApp pour contacter UFAJ.");
        });
    }

    // -------------------------------------------------
    // 8. NOTIFICATION DE BIENVENUE
    // -------------------------------------------------

    let minuterieNotification = null;
    let minuterieSuppression = null;
    let notificationActuelle = null;

    function afficherNotification(message) {
        if (notificationActuelle) {
            notificationActuelle.remove();
        }

        window.clearTimeout(minuterieNotification);
        window.clearTimeout(minuterieSuppression);

        const notification = document.createElement("div");
        notification.className = "notification-ufaj";
        notification.setAttribute("role", "status");
        notification.setAttribute("aria-live", "polite");
        notification.textContent = message;

        document.body.appendChild(notification);
        notificationActuelle = notification;

        window.requestAnimationFrame(function () {
            notification.classList.add("show");
        });

        minuterieNotification = window.setTimeout(function () {
            notification.classList.remove("show");

            minuterieSuppression = window.setTimeout(function () {
                if (notification.parentNode) {
                    notification.remove();
                }

                if (notificationActuelle === notification) {
                    notificationActuelle = null;
                }
            }, 350);
        }, 4500);
    }

    window.setTimeout(function () {
        afficherNotification(
            "Bienvenue sur le site de UFAJ Église Chrétienne 🙏"
        );
    }, 1500);

    // -------------------------------------------------
    // 9. ANNÉE AUTOMATIQUE
    // -------------------------------------------------

    const paragraphesFooter = document.querySelectorAll("footer p");

    paragraphesFooter.forEach(function (paragraphe) {
        paragraphe.innerHTML = paragraphe.innerHTML.replace(
            /\b2026\b/g,
            String(new Date().getFullYear())
        );
    });

    // -------------------------------------------------
    // 10. MESSAGE DE CONFIRMATION DANS LA CONSOLE
    // -------------------------------------------------

    console.log(
        "UFAJ Église Chrétienne : le site est prêt 🙏"
    );
});
