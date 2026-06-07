// Memastikan script berjalan setelah HTML sepenuhnya dimuat
document.addEventListener("DOMContentLoaded", function() {
    
    // Menghubungkan elemen HTML ke dalam variabel JS menggunakan ID
    const searchButton = document.getElementById("searchBtn");
    const searchBox = document.getElementById("searchBox");
    const searchInput = document.getElementById("searchInput");
    const searchSubmit = document.getElementById("searchSubmit");
    const menuButton = document.getElementById("menuBtn");
    const dropdownMenu = document.getElementById("dropdownMenu");

    // Fungsi interaktif untuk tombol pencarian - Tampilkan/Sembunyikan search box
    if (searchButton) {
        searchButton.addEventListener("click", function(e) {
            e.preventDefault();
            searchBox.classList.toggle("active");
            if (searchBox.classList.contains("active")) {
                searchInput.focus();
            }
        });
    }

    // Fungsi untuk scroll ke section di halaman beranda
    function scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
            searchBox.classList.remove("active");
            return true;
        }
        return false;
    }

    // Fungsi pencarian untuk arahkan ke bagian yang sesuai
    function handleSearchQuery(query) {
        const normalized = query.toLowerCase();
        const homeSections = [
            { id: "judul-utama", terms: ["about", "beranda", "sorot", "medianet", "lotim", "informasi terbaru"] },
            { id: "mission", terms: ["mission", "misi", "tentang kami", "tentang", "visi"] },
            { id: "model", terms: ["model", "our model", "model kami"] },
            { id: "belief", terms: ["believe", "percaya", "keyakinan", "apa yang kami percayai", "what we believe"] },
            { id: "commitment", terms: ["commitment", "komitmen", "baltimore", "lokal"] }
        ];

        for (const section of homeSections) {
            if (section.terms.some(term => normalized.includes(term))) {
                if (window.location.pathname.split("/").pop() === "index.html" || window.location.pathname.split("/").pop() === "") {
                    if (scrollToSection(section.id)) {
                        return;
                    }
                }
                window.location.href = `index.html#${section.id}`;
                return;
            }
        }

        if (normalized.includes("lombok") || normalized.includes("timur")) {
            window.location.href = "lombok-timur.html";
            return;
        }
        if (normalized.includes("hubungi") || normalized.includes("kontak") || normalized.includes("email") || normalized.includes("telepon")) {
            window.location.href = "hubungi-kami.html";
            return;
        }
        if (normalized.includes("teknologi") || normalized.includes("tech") || normalized.includes("digital") || normalized.includes("inovasi")) {
            window.location.href = "teknologi.html";
            return;
        }
        if (normalized.includes("note") || normalized.includes("catatan") || normalized.includes("pengumuman")) {
            window.location.href = "note.html";
            return;
        }
        if (normalized.includes("informasi") || normalized.includes("berita") || normalized.includes("update")) {
            window.location.href = "informasi-terbaru.html";
            return;
        }
        if (normalized.includes("tentang") || normalized.includes("kami") || normalized.includes("visi") || normalized.includes("misi")) {
            window.location.href = "tentang-kami.html";
            return;
        }

        // Default ke halaman informasi terbaru bila tidak ada kecocokan
        window.location.href = "informasi-terbaru.html";
    }

    // Fungsi submit pencarian
    if (searchSubmit) {
        searchSubmit.addEventListener("click", function(e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                handleSearchQuery(query);
            }
        });
    }

    // Enter key di search input
    if (searchInput) {
        searchInput.addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                const query = searchInput.value.trim();
                if (query) {
                    handleSearchQuery(query);
                }
            }
        });
    }

    // Fungsi interaktif untuk tombol menu hamburger - Tampilkan/Sembunyikan dropdown
    if (menuButton) {
        menuButton.addEventListener("click", function(e) {
            e.preventDefault();
            dropdownMenu.classList.toggle("active");
        });
    }

    // Hover dan active state untuk menu header
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("mouseenter", function() {
            this.classList.add("hovered");
        });
        link.addEventListener("mouseleave", function() {
            this.classList.remove("hovered");
        });

        const href = link.getAttribute("href");
        const currentPage = window.location.pathname.split("/").pop();
        if (href === currentPage || (href === "index.html" && currentPage === "")) {
            link.classList.add("active");
        }
    });

    // Close dropdown ketika item diklik
    const dropdownItems = document.querySelectorAll(".dropdown-item");
    dropdownItems.forEach(item => {
        item.addEventListener("click", function(e) {
            dropdownMenu.classList.remove("active");
        });
    });

    // Close dropdown/search ketika klik di luar
    document.addEventListener("click", function(e) {
        if (
            !e.target.closest(".header-nav") &&
            !e.target.closest("#searchBox") &&
            !e.target.closest("#dropdownMenu")
        ) {
            dropdownMenu.classList.remove("active");
            searchBox.classList.remove("active");
        }
    });
});