/**
 * PORTFOLIO DATA CONFIGURATION
 * Simply edit this file to add new reels, thumbnails, or reviews!
 */

const PORTFOLIO_DATA = {
    // -------------------------------------------------------------
    // 1. VERTICAL REELS DATA
    // -------------------------------------------------------------
    reelsCategories: ["All", "Short Reels", "SaaS Demos", "Motion Graphics"],
    
    reels: [
        {
            id: "reel-1",
            category: "Short Reels",
            title: "Retention Hook Masterclass",
            description: "High-energy fast cuts, dynamic auto-captions, and sound design created for a tech creator short.",
            videoUrl: "https://github.com/sassyratul64-lgtm/Projects/blob/a458d88b630cd1511f80ac1cb9e650d9afc9a9eb/1a16cdfcf9c89c98ca1825260a7b8760_720w.mp4",
            poster: "https://github.com/sassyratul64-lgtm/Projects/blob/a458d88b630cd1511f80ac1cb9e650d9afc9a9eb/1a16cdfcf9c89c98ca1825260a7b8760_720w.mp4",
            tags: ["Premiere Pro", "After Effects", "Sound Design"],
            retentionGoal: "82% @ 30s",
            aspectRatio: "9:16 Vertical"
        },
        {
            id: "reel-2",
            category: "SaaS Demos",
            title: "AI App Showcase Reel",
            description: "Smooth UI kinetic typography, isometric screen renders, and sleek transitions for SaaS launch.",
            videoUrl: "https://github.com/sassyratul64-lgtm/Projects/blob/a458d88b630cd1511f80ac1cb9e650d9afc9a9eb/243e5ebede5c65bb7887d93e3c55bcd7_720w.mp4",
            poster: "https://github.com/sassyratul64-lgtm/Projects/blob/a458d88b630cd1511f80ac1cb9e650d9afc9a9eb/243e5ebede5c65bb7887d93e3c55bcd7_720w.mp4",
            tags: ["After Effects", "Figma", "Sound Effects"],
            retentionGoal: "78% @ 45s",
            aspectRatio: "9:16 Vertical"
        },
        {
            id: "reel-3",
            category: "Motion Graphics",
            title: "3D HUD Interface Edit",
            description: "Futuristic particle overlays, glowing HUD elements, and seamless camera match-moving.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            poster: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
            tags: ["Blender", "After Effects", "VFX"],
            retentionGoal: "85% @ 20s",
            aspectRatio: "9:16 Vertical"
        }
    ],

    // -------------------------------------------------------------
    // 2. GRAPHICS & YOUTUBE THUMBNAILS DATA
    // -------------------------------------------------------------
    graphicsCategories: ["All Graphics", "YouTube Thumbnails", "Banners & Posters", "Branding Kits"],

    graphics: [
        {
            id: "gfx-1",
            category: "YouTube Thumbnails",
            title: "MrBeast Style High-CTR Thumbnail",
            imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80",
            ctrStat: "14.2% CTR"
        },
        {
            id: "gfx-2",
            category: "Banners & Posters",
            title: "Cyberpunk Event Poster Design",
            imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
            ctrStat: "Poster Print"
        },
        {
            id: "gfx-3",
            category: "YouTube Thumbnails",
            title: "SaaS Product Comparison",
            imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
            ctrStat: "11.8% CTR"
        },
        {
            id: "gfx-4",
            category: "Branding Kits",
            title: "Minimalist Creator Brand Kit",
            imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80",
            ctrStat: "Brand Identity"
        }
    ],

    // -------------------------------------------------------------
    // 3. SERVICES LIST
    // -------------------------------------------------------------
    services: [
        {
            icon: "fa-bolt",
            title: "Short Reels & Clips",
            description: "High-retention editing for TikTok, YouTube Shorts, and Reels with custom motion titles.",
            features: ["Dynamic Captions", "Sound Design", "Pacing & Jumpcuts"]
        },
        {
            icon: "fa-display",
            title: "SaaS & Product Demos",
            description: "Crisp UI walkthroughs and promotional video ads that convert viewers into users.",
            features: ["Cursor Tracking", "Smooth Zooms", "3D Screen Mockups"]
        },
        {
            icon: "fa-wand-magic-sparkles",
            title: "Motion Graphics (AE)",
            description: "Custom lower thirds, logo intros, and complex visual effects tailored to your brand.",
            features: ["Kinetic Typography", "2D/3D Animation", "Color Grading"]
        },
        {
            icon: "fa-fire",
            title: "High-CTR Thumbnails",
            description: "Photorealistic lighting, expressive face cutouts, and clear typography for high clickability.",
            features: ["Expressive Cutouts", "Color Grading", "A/B Testing Ready"]
        }
    ],

    // -------------------------------------------------------------
    // 4. CLIENT REVIEWS
    // -------------------------------------------------------------
    reviews: [
        {
            name: "David K.",
            role: "Tech YouTuber (500K Subs)",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
            rating: 5,
            comment: "Tafhimul increased our average view duration by 35% on YouTube Shorts. His sense of timing and sound design is top-notch!"
        },
        {
            name: "Elena Rostova",
            role: "SaaS Founder @ FlowSync",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
            rating: 5,
            comment: "The SaaS demo video delivered was so polished that it became our highest performing ad creative this quarter."
        },
        {
            name: "Marcus Vance",
            role: "Content Agency Owner",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
            rating: 5,
            comment: "Always delivers ahead of deadline. Very easy to communicate with and understands retention editing completely."
        }
    ]
};
