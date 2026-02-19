// Simple slide deck loader + scaler
(function () {
    const FRAME = document.getElementById("slideFrame");
    const WRAPPER = document.getElementById("slideWrapper");
    const BTN_PREV = document.getElementById("btnPrev");
    const BTN_NEXT = document.getElementById("btnNext");
    const EL_CURR = document.getElementById("slideCurrent");
    const EL_TOTAL = document.getElementById("slideTotal");
    const BAR = document.getElementById("progressBar");

    // List your slides here (ordered)
    const slides = [
        "slide1.html",
        "slide3.html",
        "slide2.html",
        "slide4.html",
        "slide5.html",
        "slide6.html",
        "slide7.html",
        "slide9.html",
        "slide8.html",
    ];

    let index = 0;
    EL_TOTAL.textContent = String(slides.length);

    function load(i) {
        index = Math.max(0, Math.min(slides.length - 1, i));
        FRAME.src = slides[index];
        EL_CURR.textContent = String(index + 1);
        BAR.style.width = `${((index + 1) / slides.length) * 100}%`;
        // Update button states
        BTN_PREV.disabled = index === 0;
        BTN_NEXT.disabled = index === slides.length - 1;
    }

    function next() {
        load(index + 1);
    }
    function prev() {
        load(index - 1);
    }

    BTN_PREV.addEventListener("click", prev);
    BTN_NEXT.addEventListener("click", next);

    // Keyboard navigation: Left/Right arrows, Space/Enter for next
    window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") next();
        else if (e.key === "ArrowLeft") prev();
        else if (e.key === " " || e.key === "Enter") next();
    });

    // Click anywhere on stage advances to next
    document.querySelector(".stage").addEventListener("click", (e) => {
        // Avoid clicks on buttons
        if (e.target.closest(".btn")) return;
        next();
    });

    // Responsive scaling to fit viewport while preserving 1280x720
    function scaleToFit() {
        const baseW = 1280,
            baseH = 720;
        const vw = window.innerWidth - 24; // account for stage padding
        const vh = window.innerHeight - 120; // account for header/footer approx
        const scale = Math.min(vw / baseW, vh / baseH);
        WRAPPER.style.transform = `scale(${Math.max(0.4, Math.min(scale, 2))})`;
    }

    window.addEventListener("resize", scaleToFit);
    window.addEventListener("orientationchange", scaleToFit);

    // Initialize
    scaleToFit();
    load(0);
})();
