const themeButton = document.getElementById("theme-btn");


// Theme toggle

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeButton.textContent = "☾";
    } else {
        themeButton.textContent = "☼";
    }

});


// Close mobile menu / smooth navigation

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        const target = document.querySelector(link.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});


// Simple reveal animation

const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    {
        threshold: 0.15
    }
);


sections.forEach(section => {

    observer.observe(section);

});