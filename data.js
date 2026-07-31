/**
 * PORTFOLIO DATA CONFIGURATION
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
            // You can now paste raw URLs OR GitHub permalinks!
            videoUrl: "https://github.com/sassyratul64-lgtm/Projects/blob/a458d88b630cd1511f80ac1cb9e650d9afc9a9eb/243e5ebede5c65bb7887d93e3c55bcd7_720w.mp4",
            tags: ["Premiere Pro", "After Effects", "Sound Design"],
            retentionGoal: "82% @ 30s",
            aspectRatio: "9:16 Vertical"
        },
        {
            id: "reel-2",
            category: "SaaS Demos",
            title: "AI App Showcase Reel",
            description: "Smooth UI kinetic typography, isometric screen renders, and sleek transitions for SaaS launch.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            tags: ["After Effects", "Figma", "Sound Effects"],
            retentionGoal: "78% @ 45s",
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
            // Direct image URL or GitHub raw image link
            imageUrl: "https://raw.githubusercontent.com/your-username/your-repo/main/images/thumb1.jpg",
            ctrStat: "14.2% CTR"
        },
        {
            id: "gfx-2",
            category: "Banners & Posters",
            title: "Cyberpunk Event Poster Design",
            imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
            ctrStat: "Poster Print"
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
            comment: "Tafhimul increased our average view duration by 35% on YouTube Shorts!"
        }
    ]
};
