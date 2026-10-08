// BWESOSA WEBSITE JAVASCRIPT
// Simple JavaScript for the BWESOSA alumni website.

document.addEventListener("DOMContentLoaded", function () {

    // 1. MOBILE MENU
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", function () {
            navbar.classList.toggle("show");

            const icon = menuToggle.querySelector("i");

            if (navbar.classList.contains("show")) {
                menuToggle.setAttribute("aria-label", "Close menu");

                if (icon) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                }
            } else {
                menuToggle.setAttribute("aria-label", "Open menu");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });

        const navLinks = document.querySelectorAll(".navbar a");

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                navbar.classList.remove("show");

                const icon = menuToggle.querySelector("i");

                menuToggle.setAttribute("aria-label", "Open menu");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });
        });
    }


    // 2. CURRENT YEAR
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    // 3. SIMPLE MESSAGE BOX
    function showMessage(message) {
        let messageBox = document.getElementById("bwesosaMessage");

        if (!messageBox) {
            messageBox = document.createElement("div");
            messageBox.id = "bwesosaMessage";

            messageBox.style.position = "fixed";
            messageBox.style.bottom = "25px";
            messageBox.style.right = "25px";
            messageBox.style.maxWidth = "350px";
            messageBox.style.padding = "15px 20px";
            messageBox.style.background = "#0a1f44";
            messageBox.style.color = "white";
            messageBox.style.borderRadius = "8px";
            messageBox.style.boxShadow = "0 5px 20px rgba(0,0,0,0.2)";
            messageBox.style.zIndex = "9999";
            messageBox.style.fontSize = "15px";
            messageBox.style.lineHeight = "1.5";

            document.body.appendChild(messageBox);
        }

        messageBox.textContent = message;
        messageBox.style.display = "block";

        clearTimeout(window.bwesosaMessageTimer);

        window.bwesosaMessageTimer = setTimeout(function () {
            messageBox.style.display = "none";
        }, 3500);
    }


    // 4. SMOOTH SCROLLING
    const pageLinks = document.querySelectorAll('a[href^="#"]');

    pageLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (targetId === "#") {
                event.preventDefault();
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // 5. HIGHLIGHT THE CURRENT NAVIGATION LINK
    const sections = document.querySelectorAll("section[id]");
    const mainNavLinks = document.querySelectorAll(".navbar a");

    function updateActiveLink() {
        let currentSection = "";

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });

        mainNavLinks.forEach(function (link) {
            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();


    // 6. LOGIN FORM
    const loginForm = document.getElementById("loginForm");
    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (
                loginEmail.value.trim() === "" ||
                loginPassword.value.trim() === ""
            ) {
                showMessage("Please enter your email and password.");
                return;
            }

            showMessage(
                "Login details received. A real member login will need a backend and database."
            );
        });
    }


    // 7. REMEMBER ME
    const rememberBox = document.querySelector(
        '#loginForm input[type="checkbox"]'
    );

    if (rememberBox && loginEmail) {

        const savedEmail = localStorage.getItem("bwesosaEmail");

        if (savedEmail) {
            loginEmail.value = savedEmail;
            rememberBox.checked = true;
        }

        rememberBox.addEventListener("change", function () {

            if (rememberBox.checked) {
                localStorage.setItem(
                    "bwesosaEmail",
                    loginEmail.value
                );
            } else {
                localStorage.removeItem("bwesosaEmail");
            }
        });

        loginEmail.addEventListener("input", function () {

            if (rememberBox.checked) {
                localStorage.setItem(
                    "bwesosaEmail",
                    loginEmail.value
                );
            }
        });
    }


    // 8. NEWSLETTER FORM
    const newsletterForm = document.getElementById("newsletterForm");
    const newsletterEmail = document.getElementById("newsletterEmail");

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (newsletterEmail.value.trim() === "") {
                showMessage("Please enter your email address.");
                return;
            }

            showMessage(
                "Thank you! " +
                newsletterEmail.value +
                " has subscribed to BWESOSA updates."
            );

            newsletterForm.reset();
        });
    }


    // 9. CONTACT FORM
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("contactName").value;
            const email = document.getElementById("contactEmail").value;
            const subject = document.getElementById("contactSubject").value;
            const message = document.getElementById("contactMessage").value;

            if (
                name.trim() === "" ||
                email.trim() === "" ||
                subject.trim() === "" ||
                message.trim() === ""
            ) {
                showMessage("Please fill in all contact form fields.");
                return;
            }

            showMessage(
                "Thank you, " +
                name +
                ". Your message has been received."
            );

            contactForm.reset();
        });
    }


    // 10. EVENT BUTTONS
    const eventButtons = document.querySelectorAll(".event-button");

    eventButtons.forEach(function (button) {
        button.addEventListener("click", function () {

            const eventCard = button.closest(".event-card");

            if (eventCard) {
                const title = eventCard.querySelector("h3").textContent;
                const date = eventCard.querySelector(".date").textContent;

                showMessage(
                    title +
                    " — " +
                    date +
                    ". Full event registration will be available soon."
                );
            }
        });
    });


    // 11. NEWS BUTTONS
    const newsButtons = document.querySelectorAll(".news-button");

    newsButtons.forEach(function (button) {
        button.addEventListener("click", function () {

            const newsCard = button.closest(".news-card");

            if (newsCard) {
                const title = newsCard.querySelector("h3").textContent;

                showMessage(
                    "BWESOSA News: " +
                    title +
                    ". The full article will be added soon."
                );
            }
        });
    });


    // 12. PROJECT SUPPORT BUTTONS
    const supportButtons = document.querySelectorAll(".support-button");

    supportButtons.forEach(function (button) {
        button.addEventListener("click", function () {

            const projectCard = button.closest(".project-card");

            if (projectCard) {
                const projectName =
                    projectCard.querySelector("h3").textContent;

                showMessage(
                    "You selected " +
                    projectName +
                    ". A project support page will be available soon."
                );
            }
        });
    });


    // 13. MENTORSHIP BUTTONS
    const mentorButtons = document.querySelectorAll(".mentor-button");

    mentorButtons.forEach(function (button) {
        button.addEventListener("click", function () {

            const buttonText = button.textContent.trim();

            if (buttonText === "Become a Mentor") {
                showMessage(
                    "Thank you for volunteering as a mentor. The mentor registration form will be added soon."
                );
            } else {
                showMessage(
                    "The BWESOSA mentor directory will be available soon."
                );
            }
        });
    });


    // 14. JOBS AND OPPORTUNITIES
    const opportunityButtons =
        document.querySelectorAll(".opportunity-button");

    opportunityButtons.forEach(function (button) {
        button.addEventListener("click", function () {

            const card = button.closest(".card");

            if (card) {
                const title = card.querySelector("h3").textContent;

                showMessage(
                    "Opportunity: " +
                    title +
                    ". Full details will be available soon."
                );
            }
        });
    });


    // 15. ALUMNI BUSINESSES
    const businessButtons =
        document.querySelectorAll(".business-button");

    businessButtons.forEach(function (button) {
        button.addEventListener("click", function () {

            const card = button.closest(".card");

            if (card) {
                const businessName =
                    card.querySelector("h3").textContent;

                showMessage(
                    businessName +
                    " — the business profile will be available soon."
                );
            }
        });
    });


    // 16. CHAPTERS
    const chapterButtons =
        document.querySelectorAll(".chapter-button");

    chapterButtons.forEach(function (button) {
        button.addEventListener("click", function () {

            const card = button.closest(".card");

            if (card) {
                const chapterName =
                    card.querySelector("h3").textContent;

                showMessage(
                    chapterName +
                    " information and members will be available soon."
                );
            }
        });
    });


    // 17. MEMORIAL WALL
    const memorialButton =
        document.querySelector(".memorial-button");

    if (memorialButton) {
        memorialButton.addEventListener("click", function () {

            showMessage(
                "The BWESOSA Memorial Wall will be available soon."
            );
        });
    }


    // 18. GALLERY ITEMS
    const galleryItems = document.querySelectorAll(".gallery > div");

    galleryItems.forEach(function (item) {

        item.style.cursor = "pointer";

        item.addEventListener("click", function () {

            showMessage(
                "Gallery: " +
                item.textContent +
                ". More photos will be added soon."
            );
        });
    });


    // 19. SIMPLE EMAIL CHECK
    const emailInputs = document.querySelectorAll('input[type="email"]');

    emailInputs.forEach(function (input) {

        input.addEventListener("blur", function () {

            if (
                input.value !== "" &&
                !input.value.includes("@")
            ) {
                showMessage("Please enter a valid email address.");
                input.focus();
            }
        });
    });


    // 20. BACK TO TOP BUTTON
    const backToTop = document.createElement("button");

    backToTop.textContent = "↑";
    backToTop.title = "Back to top";
    backToTop.setAttribute("aria-label", "Back to top");

    backToTop.style.position = "fixed";
    backToTop.style.bottom = "25px";
    backToTop.style.left = "25px";
    backToTop.style.width = "45px";
    backToTop.style.height = "45px";
    backToTop.style.border = "none";
    backToTop.style.borderRadius = "50%";
    backToTop.style.background = "#0a1f44";
    backToTop.style.color = "white";
    backToTop.style.fontSize = "22px";
    backToTop.style.cursor = "pointer";
    backToTop.style.display = "none";
    backToTop.style.zIndex = "9998";

    document.body.appendChild(backToTop);

    window.addEventListener("scroll", function () {

        if (window.scrollY > 500) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    });

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    // 21. CONFIRM THAT JAVASCRIPT IS WORKING
    console.log("BWESOSA JavaScript loaded successfully.");

});