document.addEventListener("DOMContentLoaded", () => {
    // Update copyright year automatically
    const yearEl = document.getElementById("current-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // -------------------------------------------------------------
    // HELPER: Convert GitHub Permalinks to Streamable Video Links
    // -------------------------------------------------------------
    function resolveVideoUrl(url) {
        if (!url) return "";
        if (url.includes("github.com") && url.includes("/blob/")) {
            return url
                .replace("github.com", "raw.githubusercontent.com")
                .replace("/blob/", "/");
        }
        return url;
    }

    // -------------------------------------------------------------
    // WEB AUDIO API SYNTHESIZER (Click Sound)
    // -------------------------------------------------------------
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx = null;

    function playClickSound() {
        if (!audioCtx) audioCtx = new AudioContext();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
    }

    document.addEventListener("click", (e) => {
        if (e.target.closest(".sound-click")) playClickSound();
    });

    // -------------------------------------------------------------
    // MOBILE DRAWER MENU
    // -------------------------------------------------------------
    const menuBtn = document.getElementById("mobile-menu-btn");
    const drawer = document.getElementById("mobile-drawer");

    if (menuBtn && drawer) {
        menuBtn.addEventListener("click", () => drawer.classList.toggle("hidden"));
        document.querySelectorAll(".mobile-link").forEach(link => {
            link.addEventListener("click", () => drawer.classList.add("hidden"));
        });
    }

    // -------------------------------------------------------------
    // HERO FEATURED PLAYER CONTROLS
    // -------------------------------------------------------------
    const heroVid = document.getElementById("hero-featured-video");
    const heroPlayBtn = document.getElementById("hero-play-btn");
    const heroPlayIcon = document.getElementById("hero-play-icon");
    const heroMuteBtn = document.getElementById("hero-mute-btn");
    const heroMuteIcon = document.getElementById("hero-mute-icon");

    if (heroVid) {
        const heroSource = heroVid.querySelector("source");
        if (heroSource) {
            heroSource.src = resolveVideoUrl(heroSource.src);
            heroVid.load();
        }

        if (heroPlayBtn && heroPlayIcon) {
            heroPlayBtn.addEventListener("click", () => {
                if (heroVid.paused) {
                    heroVid.play();
                    heroPlayIcon.className = "fa-solid fa-pause ml-0";
                } else {
                    heroVid.pause();
                    heroPlayIcon.className = "fa-solid fa-play ml-1";
                }
            });
        }

        if (heroMuteBtn && heroMuteIcon) {
            heroMuteBtn.addEventListener("click", () => {
                heroVid.muted = !heroVid.muted;
                heroMuteIcon.className = heroVid.muted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high";
            });
        }
    }

    // -------------------------------------------------------------
    // RENDER REELS & FILTER LOGIC WITH WORKING SOUND CONTROLS
    // -------------------------------------------------------------
    const reelsViewport = document.getElementById("reels-feed-viewport");
    const reelsFilterContainer = document.getElementById("reels-filter-container");
    let activeReelFilter = "All";

    function renderReelsFilters() {
        if (!reelsFilterContainer) return;
        reelsFilterContainer.innerHTML = PORTFOLIO_DATA.reelsCategories.map(cat => `
            <button class="sound-click reel-filter-btn px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                cat === activeReelFilter 
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" 
                    : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
            }" data-cat="${cat}">
                ${cat}
            </button>
        `).join("");

        document.querySelectorAll(".reel-filter-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                activeReelFilter = e.target.dataset.cat;
                renderReelsFilters();
                renderReelsFeed();
            });
        });
    }

    function renderReelsFeed() {
        if (!reelsViewport) return;

        const filtered = activeReelFilter === "All" 
            ? PORTFOLIO_DATA.reels 
            : PORTFOLIO_DATA.reels.filter(r => r.category === activeReelFilter);

        reelsViewport.innerHTML = filtered.map((reel, index) => {
            const directVideoUrl = resolveVideoUrl(reel.videoUrl);

            return `
                <div class="reel-item relative w-full h-full snap-start flex-shrink-0 bg-slate-950 flex items-center justify-center overflow-hidden group" data-index="${index}">
                    <!-- Video automatically extracts first frame as thumbnail -->
                    <video class="reel-video w-full h-full object-cover" loop muted playsinline preload="metadata">
                        <source src="${directVideoUrl}#t=0.1" type="video/mp4">
                    </video>
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 pointer-events-none"></div>
                    
                    <!-- Sound Toggle Button (Top-Right) -->
                    <button class="reel-sound-toggle sound-click absolute top-6 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-200 hover:text-white border border-slate-700/60 flex items-center justify-center transition-transform hover:scale-110">
                        <i class="fa-solid fa-volume-xmark reel-sound-icon"></i>
                    </button>

                    <!-- Tap to Play/Pause -->
                    <button class="reel-play-overlay absolute inset-0 flex items-center justify-center sound-click z-10">
                        <div class="w-12 h-12 rounded-full bg-slate-900/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <i class="fa-solid fa-play reel-play-icon"></i>
                        </div>
                    </button>
                </div>
            `;
        }).join("");

        // Attach event handlers for each reel
        document.querySelectorAll(".reel-item").forEach(item => {
            const video = item.querySelector("video");
            const soundBtn = item.querySelector(".reel-sound-toggle");
            const soundIcon = item.querySelector(".reel-sound-icon");
            const playOverlay = item.querySelector(".reel-play-overlay");
            const playIcon = item.querySelector(".reel-play-icon");

            if (soundBtn && video) {
                soundBtn.addEventListener("click", (e) => {
                    e.stopPropagation(); // Prevents triggering play/pause
                    video.muted = !video.muted;
                    
                    if (video.muted) {
                        soundIcon.className = "fa-solid fa-volume-xmark reel-sound-icon";
                    } else {
                        soundIcon.className = "fa-solid fa-volume-high reel-sound-icon text-indigo-400";
                    }
                });
            }

            if (playOverlay && video) {
                playOverlay.addEventListener("click", () => {
                    if (video.paused) {
                        video.play();
                        if (playIcon) playIcon.className = "fa-solid fa-pause";
                    } else {
                        video.pause();
                        if (playIcon) playIcon.className = "fa-solid fa-play";
                    }
                });
            }
        });

        setupReelsObserver(filtered);
    }

    function updateReelDetailCard(reel, index, total) {
        const counter = document.getElementById("reel-counter");
        if (counter) counter.textContent = `${index + 1}/${total}`;

        const title = document.getElementById("reel-title");
        if (title) title.textContent = reel.title;

        const catTag = document.getElementById("reel-category-tag");
        if (catTag) catTag.textContent = reel.category;

        const desc = document.getElementById("reel-description");
        if (desc) desc.textContent = reel.description;

        const goal = document.getElementById("reel-goal");
        if (goal) goal.textContent = reel.retentionGoal;

        const aspect = document.getElementById("reel-aspect");
        if (aspect) aspect.textContent = reel.aspectRatio;

        const tagsContainer = document.getElementById("reel-tags");
        if (tagsContainer) {
            tagsContainer.innerHTML = reel.tags.map(t => `
                <span class="text-[10px] px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 font-semibold border border-slate-700/60">${t}</span>
            `).join("");
        }
    }

    function setupReelsObserver(currentList) {
        const items = reelsViewport.querySelectorAll(".reel-item");
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const vid = entry.target.querySelector("video");
                const idx = parseInt(entry.target.dataset.index);

                if (entry.isIntersecting) {
                    vid.play().catch(() => {});
                    updateReelDetailCard(currentList[idx], idx, currentList.length);
                } else {
                    vid.pause();
                }
            });
        }, { root: reelsViewport, threshold: 0.6 });

        items.forEach(item => observer.observe(item));
    }

    // Up/Down Arrow Buttons for Reels
    const prevBtn = document.getElementById("reel-prev-btn");
    const nextBtn = document.getElementById("reel-next-btn");

    if (prevBtn && reelsViewport) {
        prevBtn.addEventListener("click", () => {
            reelsViewport.scrollBy({ top: -reelsViewport.clientHeight, behavior: 'smooth' });
        });
    }

    if (nextBtn && reelsViewport) {
        nextBtn.addEventListener("click", () => {
            reelsViewport.scrollBy({ top: reelsViewport.clientHeight, behavior: 'smooth' });
        });
    }

    // -------------------------------------------------------------
    // RENDER GRAPHICS & LIGHTBOX
    // -------------------------------------------------------------
    const graphicsGrid = document.getElementById("graphics-grid");
    const graphicsFilterContainer = document.getElementById("graphics-filter-container");
    let activeGfxFilter = "All Graphics";

    function renderGraphicsFilters() {
        if (!graphicsFilterContainer) return;

        graphicsFilterContainer.innerHTML = PORTFOLIO_DATA.graphicsCategories.map(cat => `
            <button class="sound-click gfx-filter-btn px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                cat === activeGfxFilter 
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" 
                    : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
            }" data-cat="${cat}">
                ${cat}
            </button>
        `).join("");

        document.querySelectorAll(".gfx-filter-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                activeGfxFilter = e.target.dataset.cat;
                renderGraphicsFilters();
                renderGraphicsGrid();
            });
        });
    }

    function renderGraphicsGrid() {
        if (!graphicsGrid) return;

        const filtered = activeGfxFilter === "All Graphics"
            ? PORTFOLIO_DATA.graphics
            : PORTFOLIO_DATA.graphics.filter(g => g.category === activeGfxFilter);

        graphicsGrid.innerHTML = filtered.map(gfx => `
            <div class="glass-card rounded-2xl p-3 border border-slate-700/50 group cursor-pointer sound-click gfx-card" data-img="${gfx.imageUrl}" data-title="${gfx.title}">
                <div class="relative rounded-xl overflow-hidden aspect-video bg-slate-950">
                    <img src="${gfx.imageUrl}" alt="${gfx.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                    <div class="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-indigo-400 border border-indigo-500/30">
                        ${gfx.ctrStat}
                    </div>
                </div>
                <div class="p-3">
                    <p class="text-[10px] text-slate-400 font-semibold uppercase">${gfx.category}</p>
                    <h3 class="font-heading font-bold text-white text-sm group-hover:text-indigo-400 transition-colors mt-0.5">${gfx.title}</h3>
                </div>
            </div>
        `).join("");

        document.querySelectorAll(".gfx-card").forEach(card => {
            card.addEventListener("click", () => {
                document.getElementById("lightbox-img").src = card.dataset.img;
                document.getElementById("lightbox-caption").textContent = card.dataset.title;
                document.getElementById("lightbox-modal").classList.remove("hidden");
            });
        });
    }

    const lightboxClose = document.getElementById("lightbox-close");
    if (lightboxClose) {
        lightboxClose.addEventListener("click", () => {
            document.getElementById("lightbox-modal").classList.add("hidden");
        });
    }

    // -------------------------------------------------------------
    // RENDER SERVICES & REVIEWS
    // -------------------------------------------------------------
    function renderServices() {
        const container = document.getElementById("services-grid");
        if (!container) return;

        container.innerHTML = PORTFOLIO_DATA.services.map(s => `
            <div class="glass-card rounded-3xl p-6 border border-slate-700/50 hover:border-indigo-500/50 transition-all group">
                <div class="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-xl mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <i class="fa-solid ${s.icon}"></i>
                </div>
                <h3 class="font-heading font-bold text-lg text-white mb-2">${s.title}</h3>
                <p class="text-slate-400 text-xs leading-relaxed mb-4">${s.description}</p>
                <ul class="space-y-2 border-t border-slate-800/80 pt-4">
                    ${s.features.map(f => `
                        <li class="text-xs text-slate-300 flex items-center gap-2">
                            <i class="fa-solid fa-check text-emerald-400 text-[10px]"></i> ${f}
                        </li>
                    `).join("")}
                </ul>
            </div>
        `).join("");
    }

    function renderReviews() {
        const container = document.getElementById("reviews-grid");
        if (!container) return;

        container.innerHTML = PORTFOLIO_DATA.reviews.map(r => `
            <div class="glass-card rounded-3xl p-6 border border-slate-700/50 flex flex-col justify-between">
                <div class="space-y-4">
                    <div class="flex text-amber-400 text-xs gap-1">
                        ${Array(r.rating).fill('<i class="fa-solid fa-star"></i>').join("")}
                    </div>
                    <p class="text-slate-300 text-sm leading-relaxed italic">"${r.comment}"</p>
                </div>
                <div class="flex items-center gap-3 pt-6 mt-6 border-t border-slate-800/80">
                    <img src="${r.avatar}" alt="${r.name}" class="w-10 h-10 rounded-full object-cover">
                    <div>
                        <h4 class="font-heading font-bold text-white text-sm">${r.name}</h4>
                        <p class="text-xs text-slate-400">${r.role}</p>
                    </div>
                </div>
            </div>
        `).join("");
    }

    // Form submission
    const form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const toastContainer = document.getElementById("toast-container");
            if (toastContainer) {
                const toast = document.createElement("div");
                toast.className = "bg-indigo-600 text-white px-5 py-3 rounded-2xl shadow-xl font-semibold text-sm flex items-center gap-3 border border-indigo-400/30";
                toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> Inquiry submitted! I'll reply soon.`;
                toastContainer.appendChild(toast);
                setTimeout(() => toast.remove(), 4000);
            }
            form.reset();
        });
    }

    // INITIALIZATION
    renderReelsFilters();
    renderReelsFeed();
    renderGraphicsFilters();
    renderGraphicsGrid();
    renderServices();
    renderReviews();
});
