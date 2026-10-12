```javascript
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
            const id = this.getAttribute("href");
            const section = document.querySelector(id);

            if (section) {
                event.preventDefault();

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
    // 3. ANIMATION DES SECTIONS
    // ==========================================

    const sections = document.querySelectorAll("main section");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("section-visible");
                        observer.unobserve(entry.target);
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
    } else {
        sections.forEach(function (section) {
            section.classList.add("section-visible");
        });
    }


    // ==========================================
    // 4. MENU DÉROULANT POUR MOBILE
    // ==========================================

    const boutonMenu = document.getElementById("menu-toggle");
    const menuPrincipal = document.getElementById("menu-principal");

    function fermerMenu() {
        if (!boutonMenu || !menuPrincipal) return;

        menuPrincipal.classList.remove("menu-ouvert");
        boutonMenu.setAttribute("aria-expanded", "false");
        boutonMenu.setAttribute("aria-label", "Ouvrir le menu");
        boutonMenu.textContent = "☰";
    }

    if (boutonMenu && menuPrincipal) {

        boutonMenu.addEventListener("click", function () {
            const estOuvert =
                menuPrincipal.classList.toggle("menu-ouvert");

            boutonMenu.setAttribute(
                "aria-expanded",
                String(estOuvert)
            );

            boutonMenu.setAttribute(
                "aria-label",
                estOuvert ? "Fermer le menu" : "Ouvrir le menu"
            );

            boutonMenu.textContent = estOuvert ? "✕" : "☰";
        });

        // Fermer le menu après avoir choisi une rubrique
        menuPrincipal.querySelectorAll("a").forEach(function (lien) {
            lien.addEventListener("click", function () {
                fermerMenu();
            });
        });

        // Fermer le menu avec la touche Échap
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                fermerMenu();
            }
        });

        // Si on revient à un écran large, réinitialiser le menu mobile
        window.addEventListener("resize", function () {
            if (window.innerWidth > 768) {
                fermerMenu();
            }
        });
    }


    // ==========================================
    // 5. AGRANDISSEMENT DES IMAGES DE LA GALERIE
    // ==========================================

    const imagesGalerie = document.querySelectorAll("#galerie img");

    imagesGalerie.forEach(function (image) {
        image.addEventListener("click", function () {

            // Éviter d'ouvrir plusieurs fenêtres pour une image
            if (document.querySelector(".image-modal")) return;

            const modal = document.createElement("div");
            modal.className = "image-modal";

            const contenu = document.createElement("div");
            contenu.className = "modal-content";

            const boutonFermer = document.createElement("button");
            boutonFermer.className = "close-modal";
            boutonFermer.type = "button";
            boutonFermer.setAttribute("aria-label", "Fermer l'image");
            boutonFermer.textContent = "×";

            const grandeImage = document.createElement("img");
            grandeImage.src = image.src;
            grandeImage.alt = image.alt;

            const description = document.createElement("p");
            description.textContent = image.alt;

            contenu.appendChild(boutonFermer);
            contenu.appendChild(grandeImage);
            contenu.appendChild(description);
            modal.appendChild(contenu);
            document.body.appendChild(modal);

            // Empêcher le défilement de la page en arrière-plan
            document.body.style.overflow = "hidden";

            function fermerImage() {
                modal.remove();
                document.body.style.overflow = "";
                document.removeEventListener("keydown", fermerAvecEchap);
            }

            function fermerAvecEchap(event) {
                if (event.key === "Escape") {
                    fermerImage();
                }
            }

            boutonFermer.addEventListener("click", fermerImage);

            modal.addEventListener("click", function (event) {
                if (event.target === modal) {
                    fermerImage();
                }
            });

            document.addEventListener("keydown", fermerAvecEchap);
        });
    });


    // ==========================================
    // 6. BOUTON WHATSAPP
    // ==========================================

    const boutonWhatsApp = document.querySelector('a[href*="wa.me"]');

    if (boutonWhatsApp) {
        boutonWhatsApp.addEventListener("click", function () {
            console.log(
                "Ouverture de WhatsApp pour contacter UFAJ."
            );
        });
    }


    // ==========================================
    // 7. MISE EN ÉVIDENCE DU MENU ACTIF
    // ==========================================

    const sectionsMenu = document.querySelectorAll("main section[id]");
    const liensNavigation = document.querySelectorAll('nav a[href^="#"]');

    function mettreAJourMenuActif() {
        let sectionActuelle = "";

        sectionsMenu.forEach(function (section) {
            const position = section.getBoundingClientRect();

            if (position.top <= 150 && position.bottom >= 150) {
                sectionActuelle = section.id;
            }
        });

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

    window.addEventListener("scroll", mettreAJourMenuActif, {
        passive: true
    });

    mettreAJourMenuActif();


    // ==========================================
    // 8. MESSAGE POUR LE VERSET DU JOUR
    // ==========================================

    const sectionVerset = document.querySelector("#versets");

    if (sectionVerset) {
        sectionVerset.addEventListener("click", function () {
            console.log(
                "Que cette parole vous accompagne aujourd'hui 🙏"
            );
        });
    }


    // ==========================================
    // 9. ANNÉE AUTOMATIQUE DANS LE PIED DE PAGE
    // ==========================================

    const footer = document.querySelector("footer");

    if (footer) {
        footer.querySelectorAll("p").forEach(function (paragraphe) {
            paragraphe.textContent =
                paragraphe.textContent.replace(
                    /\b2026\b/g,
                    String(new Date().getFullYear())
                );
        });
    }


    // ==========================================
    // 10. BOUTON « DÉCOUVRIR NOTRE ÉGLISE »
    // ==========================================

    const boutonDecouvrir =
        document.querySelector('a[href="#apropos"]');

    if (boutonDecouvrir) {
        boutonDecouvrir.addEventListener("click", function () {
            const apropos = document.querySelector("#apropos");

            if (apropos) {
                apropos.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    }


    // ==========================================
    // 11. NOTIFICATION DE BIENVENUE
    // ==========================================

    function afficherNotification(message) {
        // Ne pas afficher plusieurs notifications simultanément
        const ancienneNotification =
            document.querySelector(".notification-ufaj");

        if (ancienneNotification) {
            ancienneNotification.remove();
        }

        const notification = document.createElement("div");
        notification.className = "notification-ufaj";
        notification.textContent = message;

        document.body.appendChild(notification);

        // Afficher la notification après son insertion
        requestAnimationFrame(function () {
            notification.classList.add("show");
        });

        // Masquer puis supprimer la notification
        window.setTimeout(function () {
            notification.classList.remove("show");

            window.setTimeout(function () {
                notification.remove();
            }, 500);

        }, 4000);
    }

    window.setTimeout(function () {
        afficherNotification(
            "Bienvenue sur le site de UFAJ Église Chrétienne 🙏"
        );
    }, 1500);

});
```
