const images = [
    {
        src: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1200&q=85",
        category: "Nature",
        title: "Golden Sunrise"
    },
    {
        src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",
        category: "Nature",
        title: "Mountain Escape"
    },
    {
        src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=85",
        category: "Nature",
        title: "Ocean Waves"
    },
    {
        src: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=85",
        category: "Nature",
        title: "Into the Forest"
    },
    {
        src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=85",
        category: "Nature",
        title: "Lake Serenity"
    },
    {
        src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=85",
        category: "Architecture",
        title: "Modern Architecture"
    },
    {
        src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=85",
        category: "Architecture",
        title: "Minimal Design"
    },
    {
        src: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=85",
        category: "Architecture",
        title: "Geometric Forms"
    },
    {
        src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=85",
        category: "City",
        title: "City Lights"
    },
    {
        src: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=85",
        category: "City",
        title: "Night Skyline"
    },
    {
        src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=85",
        category: "City",
        title: "Urban Streets"
    },
    {
        src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=85",
        category: "Travel",
        title: "Scenic Escape"
    },
    {
        src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=85",
        category: "Travel",
        title: "Into the Wild"
    },
    {
        src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
        category: "Travel",
        title: "Open Horizons"
    },
    {
        src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=85",
        category: "Nature",
        title: "Wildlife Moments"
    }
];
const gallery = document.getElementById("gallery");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightbox-image");

const imageTitle = document.getElementById("image-title");

const imageCategory = document.getElementById("image-category");

const imageCounter = document.getElementById("image-counter");

const closeButton = document.getElementById("close-btn");

const previousButton = document.getElementById("prev-btn");

const nextButton = document.getElementById("next-btn");

let filteredImages = images;

let currentIndex = 0;


// Create gallery

function displayGallery(data) {

    gallery.innerHTML = "";

    data.forEach((image, index) => {

        const item = document.createElement("div");

        item.className = "gallery-item";

        item.innerHTML = `
            <img
                src="${image.src}"
                alt="${image.title}"
                loading="lazy"
            >

            <div class="gallery-overlay">

                <p>${image.category}</p>

                <h3>${image.title}</h3>

            </div>
        `;

        item.addEventListener("click", () => {

            currentIndex = index;

            openLightbox();

        });

        gallery.appendChild(item);

    });

}


// Open lightbox

function openLightbox() {

    const image = filteredImages[currentIndex];

    lightboxImage.src = image.src;

    imageTitle.textContent = image.title;

    imageCategory.textContent = image.category.toUpperCase();

    imageCounter.textContent =
        `${String(currentIndex + 1).padStart(2, "0")} / ${String(filteredImages.length).padStart(2, "0")}`;

    lightbox.classList.add("show");

    document.body.style.overflow = "hidden";
}


// Close lightbox

function closeLightbox() {

    lightbox.classList.remove("show");

    document.body.style.overflow = "";

}


// Next image

function showNext() {

    currentIndex++;

    if (currentIndex >= filteredImages.length) {
        currentIndex = 0;
    }

    openLightbox();

}


// Previous image

function showPrevious() {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = filteredImages.length - 1;
    }

    openLightbox();

}


// Filters

document.querySelectorAll(".filter").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".filter").forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const selectedFilter = button.dataset.filter;

        if (selectedFilter === "All") {

            filteredImages = images;

        } else {

            filteredImages = images.filter(
                image => image.category === selectedFilter
            );

        }

        displayGallery(filteredImages);

    });

});


// Events

closeButton.addEventListener("click", closeLightbox);

nextButton.addEventListener("click", showNext);

previousButton.addEventListener("click", showPrevious);


// Click outside image

lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


// Keyboard controls

document.addEventListener("keydown", event => {

    if (!lightbox.classList.contains("show")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        showNext();
    }

    if (event.key === "ArrowLeft") {
        showPrevious();
    }

});


// Initial gallery

displayGallery(images);