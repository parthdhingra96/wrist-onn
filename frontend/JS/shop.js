// shop.js
// Shop page logic: category switching, dynamic product rendering, and cart wiring

import { initCart, addToCart } from "./cart.js";

const categories = {
  men: {
    trending: [
      {
        id: "men-trend-1",
        name: "Midnight Chronograph",
        price: 1090,
        madeIn: "Switzerland",
        movement: "Automatic",
        water: "10 ATM",
        material: "316L Stainless Steel, Sapphire Crystal",
        rating: "★★★★★",
        image: "assets/images/men/midnight-chrono.jpg",
      },
      {
        id: "men-trend-2",
        name: "Carbon Noir GMT",
        price: 1280,
        madeIn: "Germany",
        movement: "Automatic GMT",
        water: "20 ATM",
        material: "Forged Carbon, Sapphire Crystal",
        rating: "★★★★☆",
        image: "assets/images/men/carbon-noir.jpg",
      },
      {
        id: "men-trend-3",
        name: "Apex Steel Diver",
        price: 940,
        madeIn: "Japan",
        movement: "Automatic",
        water: "30 ATM",
        material: "Brushed Steel, Ceramic Bezel",
        rating: "★★★★★",
        image: "assets/images/men/apex-diver.jpg",
      },
      {
        id: "men-trend-4",
        name: "Lunar Reserve",
        price: 1150,
        madeIn: "Switzerland",
        movement: "Automatic Moonphase",
        water: "5 ATM",
        material: "Polished Steel, Sapphire",
        rating: "★★★★★",
        image: "assets/images/men/lunar-reserve.jpg",
      },
      {
        id: "men-trend-5",
        name: "Shadow Skeleton",
        price: 1490,
        madeIn: "France",
        movement: "Hand-Wound Skeleton",
        water: "3 ATM",
        material: "PVD Black Steel, Sapphire",
        rating: "★★★★☆",
        image: "assets/images/men/shadow-skeleton.jpg",
      },
      {
        id: "men-trend-6",
        name: "Royal Chrono Gold",
        price: 1890,
        madeIn: "Switzerland",
        movement: "Chronograph",
        water: "10 ATM",
        material: "Gold-Plated Steel, Sapphire",
        rating: "★★★★★",
        image: "assets/images/men/royal-chrono.jpg",
      },
      {
        id: "men-trend-7",
        name: "Atlas Dual Time",
        price: 1020,
        madeIn: "Germany",
        movement: "Dual Time Quartz",
        water: "5 ATM",
        material: "Steel & Leather",
        rating: "★★★★☆",
        image: "assets/images/men/atlas-dual.jpg",
      },
      {
        id: "men-trend-8",
        name: "Stealth Ceramic",
        price: 1390,
        madeIn: "Japan",
        movement: "Automatic",
        water: "10 ATM",
        material: "Matte Black Ceramic",
        rating: "★★★★★",
        image: "assets/images/men/stealth-ceramic.jpg",
      },
    ],
    newArrivals: [
      {
        id: "men-new-1",
        name: "Obsidian Racer",
        price: 1210,
        madeIn: "Italy",
        movement: "Automatic",
        water: "10 ATM",
        material: "Brushed Steel & Rubber",
        rating: "★★★★★",
        image: "assets/images/men/obsidian-racer.jpg",
      },
      {
        id: "men-new-2",
        name: "Glacier Chrono",
        price: 980,
        madeIn: "Switzerland",
        movement: "Chronograph",
        water: "10 ATM",
        material: "Silver Steel, Sapphire",
        rating: "★★★★☆",
        image: "assets/images/men/glacier-chrono.jpg",
      },
      {
        id: "men-new-3",
        name: "Desert Sand Classic",
        price: 860,
        madeIn: "USA",
        movement: "Quartz",
        water: "5 ATM",
        material: "Sand-Tone Steel",
        rating: "★★★★☆",
        image: "assets/images/men/desert-classic.jpg",
      },
      {
        id: "men-new-4",
        name: "Aurora Nightline",
        price: 1320,
        madeIn: "Sweden",
        movement: "Automatic",
        water: "10 ATM",
        material: "Black Steel, Lume Dial",
        rating: "★★★★★",
        image: "assets/images/men/aurora-nightline.jpg",
      },
      {
        id: "men-new-5",
        name: "Vintage Heritage",
        price: 910,
        madeIn: "Germany",
        movement: "Hand-Wound",
        water: "3 ATM",
        material: "Polished Steel, Domed Crystal",
        rating: "★★★★☆",
        image: "assets/images/men/vintage-heritage.jpg",
      },
      {
        id: "men-new-6",
        name: "Titan Edge",
        price: 1250,
        madeIn: "Japan",
        movement: "Automatic",
        water: "10 ATM",
        material: "Titanium, Sapphire",
        rating: "★★★★★",
        image: "assets/images/men/titan-edge.jpg",
      },
      {
        id: "men-new-7",
        name: "Metro Minimal",
        price: 720,
        madeIn: "Denmark",
        movement: "Quartz",
        water: "5 ATM",
        material: "Slim Steel Case",
        rating: "★★★★☆",
        image: "assets/images/men/metro-minimal.jpg",
      },
      {
        id: "men-new-8",
        name: "Summit Field",
        price: 840,
        madeIn: "USA",
        movement: "Automatic",
        water: "10 ATM",
        material: "Bead-Blasted Steel",
        rating: "★★★★☆",
        image: "assets/images/men/summit-field.jpg",
      },
    ],
    featured: [
      {
        id: "men-feat-1",
        name: "Imperial Gold Skeleton",
        price: 2390,
        madeIn: "Switzerland",
        movement: "Skeleton Automatic",
        water: "5 ATM",
        material: "Gold-Plated Steel, Sapphire",
        rating: "★★★★★",
        image: "assets/images/men/imperial-gold.jpg",
      },
      {
        id: "men-feat-2",
        name: "Celestial Tourbillon",
        price: 4890,
        madeIn: "Switzerland",
        movement: "Tourbillon",
        water: "3 ATM",
        material: "18K Gold, Sapphire",
        rating: "★★★★★",
        image: "assets/images/men/celestial-tourbillon.jpg",
      },
      {
        id: "men-feat-3",
        name: "Noir Signature",
        price: 1690,
        madeIn: "France",
        movement: "Automatic",
        water: "10 ATM",
        material: "Black Steel, Sapphire",
        rating: "★★★★★",
        image: "assets/images/men/noir-signature.jpg",
      },
      {
        id: "men-feat-4",
        name: "Regal Chronometer",
        price: 2120,
        madeIn: "Germany",
        movement: "Chronometer Certified",
        water: "10 ATM",
        material: "Two-Tone Steel",
        rating: "★★★★★",
        image: "assets/images/men/regal-chronometer.jpg",
      },
      {
        id: "men-feat-5",
        name: "Obsidian Master",
        price: 1990,
        madeIn: "Japan",
        movement: "Automatic",
        water: "15 ATM",
        material: "Black DLC Steel",
        rating: "★★★★★",
        image: "assets/images/men/obsidian-master.jpg",
      },
      {
        id: "men-feat-6",
        name: "Heritage 1963",
        price: 1540,
        madeIn: "Italy",
        movement: "Hand-Wound",
        water: "3 ATM",
        material: "Polished Steel, Leather",
        rating: "★★★★☆",
        image: "assets/images/men/heritage-1963.jpg",
      },
      {
        id: "men-feat-7",
        name: "Navigator GMT Pro",
        price: 1780,
        madeIn: "Germany",
        movement: "GMT Automatic",
        water: "20 ATM",
        material: "Brushed Steel",
        rating: "★★★★★",
        image: "assets/images/men/navigator-gmt.jpg",
      },
      {
        id: "men-feat-8",
        name: "Sapphire Edge",
        price: 1630,
        madeIn: "Switzerland",
        movement: "Automatic",
        water: "10 ATM",
        material: "Clear Sapphire Caseback",
        rating: "★★★★★",
        image: "assets/images/men/sapphire-edge.jpg",
      },
    ],
  },
  women: {
    trending: [
      {
        id: "women-trend-1",
        name: "Rose Eclipse",
        price: 920,
        madeIn: "Switzerland",
        movement: "Quartz",
        water: "5 ATM",
        material: "Rose Gold Steel, Mother-of-Pearl",
        rating: "★★★★★",
        image: "assets/images/women/rose-eclipse.jpg",
      },
      {
        id: "women-trend-2",
        name: "Ivory Halo",
        price: 780,
        madeIn: "Italy",
        movement: "Quartz",
        water: "3 ATM",
        material: "Polished Steel, Ceramic",
        rating: "★★★★☆",
        image: "assets/images/women/ivory-halo.jpg",
      },
      {
        id: "women-trend-3",
        name: "Stellar Pearl",
        price: 1050,
        madeIn: "Japan",
        movement: "Automatic",
        water: "5 ATM",
        material: "Steel, Pearl Dial",
        rating: "★★★★★",
        image: "assets/images/women/stellar-pearl.jpg",
      },
      {
        id: "women-trend-4",
        name: "Luna Bracelet",
        price: 890,
        madeIn: "France",
        movement: "Quartz",
        water: "3 ATM",
        material: "Bracelet-Style Steel",
        rating: "★★★★☆",
        image: "assets/images/women/luna-bracelet.jpg",
      },
      {
        id: "women-trend-5",
        name: "Opal Curve",
        price: 960,
        madeIn: "Switzerland",
        movement: "Quartz",
        water: "5 ATM",
        material: "Curved Crystal, Opal Dial",
        rating: "★★★★★",
        image: "assets/images/women/opal-curve.jpg",
      },
      {
        id: "women-trend-6",
        name: "Celeste Classic",
        price: 830,
        madeIn: "Germany",
        movement: "Quartz",
        water: "5 ATM",
        material: "Slim Steel, Sapphire",
        rating: "★★★★☆",
        image: "assets/images/women/celeste-classic.jpg",
      },
      {
        id: "women-trend-7",
        name: "Noir Petite",
        price: 740,
        madeIn: "Denmark",
        movement: "Quartz",
        water: "3 ATM",
        material: "Black Steel, Mesh Strap",
        rating: "★★★★☆",
        image: "assets/images/women/noir-petite.jpg",
      },
      {
        id: "women-trend-8",
        name: "Aurora Diamond",
        price: 1320,
        madeIn: "Switzerland",
        movement: "Automatic",
        water: "5 ATM",
        material: "Diamond Indices, Sapphire",
        rating: "★★★★★",
        image: "assets/images/women/aurora-diamond.jpg",
      },
    ],
    newArrivals: [
      {
        id: "women-new-1",
        name: "Blush Skyline",
        price: 860,
        madeIn: "Japan",
        movement: "Quartz",
        water: "5 ATM",
        material: "Rose Steel, Sunburst Dial",
        rating: "★★★★☆",
        image: "assets/images/women/blush-skyline.jpg",
      },
      {
        id: "women-new-2",
        name: "Velvet Night",
        price: 990,
        madeIn: "Switzerland",
        movement: "Automatic",
        water: "5 ATM",
        material: "Black Steel, Diamond Markers",
        rating: "★★★★★",
        image: "assets/images/women/velvet-night.jpg",
      },
      {
        id: "women-new-3",
        name: "Pearl Cascade",
        price: 910,
        madeIn: "France",
        movement: "Quartz",
        water: "3 ATM",
        material: "Steel, Pearl Detailing",
        rating: "★★★★☆",
        image: "assets/images/women/pearl-cascade.jpg",
      },
      {
        id: "women-new-4",
        name: "Silk Line",
        price: 780,
        madeIn: "Italy",
        movement: "Quartz",
        water: "3 ATM",
        material: "Slim Steel Case",
        rating: "★★★★☆",
        image: "assets/images/women/silk-line.jpg",
      },
      {
        id: "women-new-5",
        name: "Crimson Glow",
        price: 970,
        madeIn: "Germany",
        movement: "Automatic",
        water: "5 ATM",
        material: "Red Dial, Steel Case",
        rating: "★★★★★",
        image: "assets/images/women/crimson-glow.jpg",
      },
      {
        id: "women-new-6",
        name: "Frosted Halo",
        price: 890,
        madeIn: "Switzerland",
        movement: "Quartz",
        water: "5 ATM",
        material: "Frosted Bezel, Sapphire",
        rating: "★★★★☆",
        image: "assets/images/women/frosted-halo.jpg",
      },
      {
        id: "women-new-7",
        name: "Serene Ocean",
        price: 930,
        madeIn: "Japan",
        movement: "Quartz",
        water: "10 ATM",
        material: "Blue Dial, Steel Bracelet",
        rating: "★★★★☆",
        image: "assets/images/women/serene-ocean.jpg",
      },
      {
        id: "women-new-8",
        name: "Golden Muse",
        price: 1080,
        madeIn: "Switzerland",
        movement: "Automatic",
        water: "5 ATM",
        material: "Gold-Tone Steel, Sapphire",
        rating: "★★★★★",
        image: "assets/images/women/golden-muse.jpg",
      },
    ],
    featured: [
      {
        id: "women-feat-1",
        name: "Crown Jewel",
        price: 2480,
        madeIn: "Switzerland",
        movement: "Automatic",
        water: "5 ATM",
        material: "Diamond Bezel, Sapphire",
        rating: "★★★★★",
        image: "assets/images/women/crown-jewel.jpg",
      },
      {
        id: "women-feat-2",
        name: "Opulent Pearl",
        price: 2190,
        madeIn: "France",
        movement: "Automatic",
        water: "3 ATM",
        material: "Mother-of-Pearl Dial",
        rating: "★★★★★",
        image: "assets/images/women/opulent-pearl.jpg",
      },
      {
        id: "women-feat-3",
        name: "Nocturne Rose",
        price: 1980,
        madeIn: "Switzerland",
        movement: "Automatic",
        water: "5 ATM",
        material: "Rose Gold Steel",
        rating: "★★★★★",
        image: "assets/images/women/nocturne-rose.jpg",
      },
      {
        id: "women-feat-4",
        name: "Lustre Classic",
        price: 1760,
        madeIn: "Germany",
        movement: "Quartz",
        water: "5 ATM",
        material: "Steel & Diamond Markers",
        rating: "★★★★☆",
        image: "assets/images/women/lustre-classic.jpg",
      },
      {
        id: "women-feat-5",
        name: "Aurora Crown",
        price: 2320,
        madeIn: "Switzerland",
        movement: "Automatic",
        water: "5 ATM",
        material: "Halo Diamond Bezel",
        rating: "★★★★★",
        image: "assets/images/women/aurora-crown.jpg",
      },
      {
        id: "women-feat-6",
        name: "Prima Donna",
        price: 2110,
        madeIn: "Italy",
        movement: "Automatic",
        water: "3 ATM",
        material: "Gold-Tone Case, Leather",
        rating: "★★★★★",
        image: "assets/images/women/prima-donna.jpg",
      },
      {
        id: "women-feat-7",
        name: "Seraphine",
        price: 2260,
        madeIn: "Switzerland",
        movement: "Automatic",
        water: "5 ATM",
        material: "Diamond Markers, Sapphire",
        rating: "★★★★★",
        image: "assets/images/women/seraphine.jpg",
      },
      {
        id: "women-feat-8",
        name: "Midnight Rose",
        price: 2050,
        madeIn: "France",
        movement: "Automatic",
        water: "5 ATM",
        material: "Black & Rose Gold",
        rating: "★★★★★",
        image: "assets/images/women/midnight-rose.jpg",
      },
    ],
  },
  kids: {
    trending: [
      {
        id: "kids-trend-1",
        name: "Stellar Junior",
        price: 260,
        madeIn: "Japan",
        movement: "Quartz",
        water: "5 ATM",
        material: "Lightweight Polycarbonate",
        rating: "★★★★★",
        image: "assets/images/kids/stellar-junior.jpg",
      },
      {
        id: "kids-trend-2",
        name: "Galaxy Explorer",
        price: 280,
        madeIn: "USA",
        movement: "Quartz",
        water: "5 ATM",
        material: "Durable Resin",
        rating: "★★★★☆",
        image: "assets/images/kids/galaxy-explorer.jpg",
      },
      {
        id: "kids-trend-3",
        name: "Aqua Ranger",
        price: 240,
        madeIn: "Japan",
        movement: "Quartz",
        water: "10 ATM",
        material: "Rubber Strap, Resin Case",
        rating: "★★★★☆",
        image: "assets/images/kids/aqua-ranger.jpg",
      },
      {
        id: "kids-trend-4",
        name: "Neon Sprint",
        price: 230,
        madeIn: "China",
        movement: "Quartz",
        water: "5 ATM",
        material: "Bright Resin Case",
        rating: "★★★★☆",
        image: "assets/images/kids/neon-sprint.jpg",
      },
      {
        id: "kids-trend-5",
        name: "Cosmic Glow",
        price: 250,
        madeIn: "Japan",
        movement: "Quartz",
        water: "5 ATM",
        material: "Glow-in-the-Dark Dial",
        rating: "★★★★★",
        image: "assets/images/kids/cosmic-glow.jpg",
      },
      {
        id: "kids-trend-6",
        name: "Rally Racer",
        price: 245,
        madeIn: "USA",
        movement: "Quartz",
        water: "5 ATM",
        material: "Resin, Rubber Strap",
        rating: "★★★★☆",
        image: "assets/images/kids/rally-racer.jpg",
      },
      {
        id: "kids-trend-7",
        name: "Marine Scout",
        price: 255,
        madeIn: "Japan",
        movement: "Quartz",
        water: "10 ATM",
        material: "Resin Case, Nylon Strap",
        rating: "★★★★☆",
        image: "assets/images/kids/marine-scout.jpg",
      },
      {
        id: "kids-trend-8",
        name: "Skyline Junior",
        price: 270,
        madeIn: "China",
        movement: "Quartz",
        water: "5 ATM",
        material: "Resin, Steel Back",
        rating: "★★★★☆",
        image: "assets/images/kids/skyline-junior.jpg",
      },
    ],
    newArrivals: [
      {
        id: "kids-new-1",
        name: "Pixel Time",
        price: 230,
        madeIn: "China",
        movement: "Digital Quartz",
        water: "5 ATM",
        material: "Resin Case",
        rating: "★★★★☆",
        image: "assets/images/kids/pixel-time.jpg",
      },
      {
        id: "kids-new-2",
        name: "Rocket Runner",
        price: 240,
        madeIn: "Japan",
        movement: "Quartz",
        water: "5 ATM",
        material: "Rubber Strap, Resin Case",
        rating: "★★★★☆",
        image: "assets/images/kids/rocket-runner.jpg",
      },
      {
        id: "kids-new-3",
        name: "Starline Duo",
        price: 260,
        madeIn: "USA",
        movement: "Quartz",
        water: "5 ATM",
        material: "Two-Tone Resin",
        rating: "★★★★☆",
        image: "assets/images/kids/starline-duo.jpg",
      },
      {
        id: "kids-new-4",
        name: "Aurora Spark",
        price: 250,
        madeIn: "Japan",
        movement: "Quartz",
        water: "5 ATM",
        material: "Color-Fade Strap",
        rating: "★★★★☆",
        image: "assets/images/kids/aurora-spark.jpg",
      },
      {
        id: "kids-new-5",
        name: "Trail Scout",
        price: 255,
        madeIn: "USA",
        movement: "Quartz",
        water: "10 ATM",
        material: "Nylon Strap, Resin Case",
        rating: "★★★★☆",
        image: "assets/images/kids/trail-scout.jpg",
      },
      {
        id: "kids-new-6",
        name: "Night Racer",
        price: 245,
        madeIn: "China",
        movement: "Quartz",
        water: "5 ATM",
        material: "Resin Case, Rubber Strap",
        rating: "★★★★☆",
        image: "assets/images/kids/night-racer.jpg",
      },
      {
        id: "kids-new-7",
        name: "Ocean Splash",
        price: 265,
        madeIn: "Japan",
        movement: "Quartz",
        water: "10 ATM",
        material: "Resin, Nylon Strap",
        rating: "★★★★☆",
        image: "assets/images/kids/ocean-splash.jpg",
      },
      {
        id: "kids-new-8",
        name: "Comet Flyer",
        price: 270,
        madeIn: "China",
        movement: "Quartz",
        water: "5 ATM",
        material: "Resin, Rubber Strap",
        rating: "★★★★☆",
        image: "assets/images/kids/comet-flyer.jpg",
      },
    ],
    featured: [
      {
        id: "kids-feat-1",
        name: "Heritage Junior",
        price: 310,
        madeIn: "Japan",
        movement: "Quartz",
        water: "5 ATM",
        material: "Steel Case, Leather Strap",
        rating: "★★★★★",
        image: "assets/images/kids/heritage-junior.jpg",
      },
      {
        id: "kids-feat-2",
        name: "Pro Diver Mini",
        price: 330,
        madeIn: "USA",
        movement: "Quartz",
        water: "20 ATM",
        material: "Resin Case, Rubber Strap",
        rating: "★★★★★",
        image: "assets/images/kids/pro-diver-mini.jpg",
      },
      {
        id: "kids-feat-3",
        name: "Sky Captain",
        price: 295,
        madeIn: "Japan",
        movement: "Quartz",
        water: "10 ATM",
        material: "Resin, Nylon Strap",
        rating: "★★★★☆",
        image: "assets/images/kids/sky-captain.jpg",
      },
      {
        id: "kids-feat-4",
        name: "Summit Explorer",
        price: 305,
        madeIn: "China",
        movement: "Quartz",
        water: "10 ATM",
        material: "Resin Case, Rubber Strap",
        rating: "★★★★☆",
        image: "assets/images/kids/summit-explorer.jpg",
      },
      {
        id: "kids-feat-5",
        name: "Galaxy Signature",
        price: 320,
        madeIn: "Japan",
        movement: "Quartz",
        water: "5 ATM",
        material: "Glow Dial, Resin Case",
        rating: "★★★★★",
        image: "assets/images/kids/galaxy-signature.jpg",
      },
      {
        id: "kids-feat-6",
        name: "Navigator Junior",
        price: 315,
        madeIn: "USA",
        movement: "Quartz",
        water: "10 ATM",
        material: "Resin, Nylon Strap",
        rating: "★★★★☆",
        image: "assets/images/kids/navigator-junior.jpg",
      },
      {
        id: "kids-feat-7",
        name: "Polar Scout",
        price: 300,
        madeIn: "China",
        movement: "Quartz",
        water: "5 ATM",
        material: "Resin Case, Rubber Strap",
        rating: "★★★★☆",
        image: "assets/images/kids/polar-scout.jpg",
      },
      {
        id: "kids-feat-8",
        name: "Aurora Junior",
        price: 325,
        madeIn: "Japan",
        movement: "Quartz",
        water: "5 ATM",
        material: "Color-Fade Dial",
        rating: "★★★★★",
        image: "assets/images/kids/aurora-junior.jpg",
      },
    ],
  },
};

document.addEventListener("DOMContentLoaded", async () => {
  await injectNavbar();
  await injectCartDrawer();
  initCart();
  initTabs();
  renderCategory("men", true);
  bindProductGrid();
  bindCategoryCards();
});

async function injectNavbar() {
  const container = document.getElementById("navbar-container");
  if (!container) return;

  try {
    const res = await fetch("components/navbar.html");
    container.innerHTML = await res.text();
  } catch (err) {
    console.error("Failed to load navbar:", err);
  }
}

async function injectCartDrawer() {
  const root = document.getElementById("cart-drawer-root");
  if (!root) return;

  try {
    const res = await fetch("components/cart-drawer.html");
    root.innerHTML = await res.text();
  } catch (err) {
    console.error("Failed to load cart drawer:", err);
  }
}

function initTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  const pill = document.getElementById("tab-pill");

  function updatePill(activeBtn) {
    if (!pill || !activeBtn || !activeBtn.parentElement) return;
    const rect = activeBtn.getBoundingClientRect();
    const parentRect = activeBtn.parentElement.getBoundingClientRect();
    pill.style.width = `${rect.width}px`;
    pill.style.transform = `translateX(${rect.left - parentRect.left}px)`;
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const category = tab.getAttribute("data-category");
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      updatePill(tab);
      renderCategory(category);
      syncActiveCategoryCard(category);
      scrollToProducts();
    });
  });

  // Initial pill position
  const activeTab = document.querySelector(".tab-btn.active");
  if (activeTab) {
    requestAnimationFrame(() => updatePill(activeTab));
    window.addEventListener("resize", () => updatePill(activeTab));
  }
}

function renderCategory(key, instant = false) {
  const data = categories[key];
  const container = document.getElementById("category-content");
  if (!data || !container) return;

  const sections = [
    { id: "trending", title: "Trending Watches 🔥", products: data.trending },
    { id: "new", title: "New Arrivals ✨", products: data.newArrivals },
    { id: "featured", title: "Featured Watches ⭐", products: data.featured },
  ];

  const html = sections
    .map(
      (section) => `
      <section class="product-section" data-section="${section.id}">
        <header class="product-section-header">
          <h3>${section.title}</h3>
          <p class="product-section-subtitle">
            Finely tuned pieces selected from our ${key} collection.
          </p>
        </header>
        <div class="product-grid">
          ${section.products.map(renderProductCard).join("")}
        </div>
      </section>
    `
    )
    .join("");

  if (!instant) {
    container.classList.add("fade-out");
    setTimeout(() => {
      container.innerHTML = html;
      container.classList.remove("fade-out");
      container.classList.add("fade-in");
      setTimeout(() => container.classList.remove("fade-in"), 300);
    }, 200);
  } else {
    container.innerHTML = html;
  }
}

function bindProductGrid() {
  const container = document.getElementById("category-content");
  if (!container) return;

  container.addEventListener("click", (e) => {
    const cardBtn = e.target.closest(".product-card-button");
    if (!cardBtn) return;

    const id = cardBtn.getAttribute("data-product-id");
    const cat = cardBtn.getAttribute("data-product-category");
    const sectionId = cardBtn.getAttribute("data-product-section");
    if (!id || !cat || !sectionId || !categories[cat]) return;

    const sectionData =
      sectionId === "trending"
        ? categories[cat].trending
        : sectionId === "new"
        ? categories[cat].newArrivals
        : categories[cat].featured;

    const product = sectionData.find((p) => p.id === id);
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
  });
}

function renderProductCard(product) {
  return `
    <article class="product-card glass hover-lift">
      <div class="product-media">
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="product-body">
        <div class="product-header-row">
          <h4 class="product-name">${product.name}</h4>
          <p class="product-price">$${product.price.toLocaleString()}</p>
        </div>
        <ul class="product-features">
          <li><span>Made In</span><span>${product.madeIn}</span></li>
          <li><span>Movement</span><span>${product.movement}</span></li>
          <li><span>Water Resistance</span><span>${product.water}</span></li>
          <li><span>Material</span><span>${product.material}</span></li>
        </ul>
        <div class="product-meta-row">
          <span class="product-rating">${product.rating}</span>
          <button
            class="btn btn-gold product-card-button"
            type="button"
            data-product-id="${product.id}"
            data-product-name="${product.name}"
            data-product-price="${product.price}"
            data-product-image="${product.image}"
            data-product-category="${detectCategory(product.id)}"
            data-product-section="${detectSection(product.id)}"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  `;
}

function detectCategory(id) {
  if (id.startsWith("men-")) return "men";
  if (id.startsWith("women-")) return "women";
  return "kids";
}

function detectSection(id) {
  if (id.includes("trend")) return "trending";
  if (id.includes("new")) return "new";
  return "featured";
}

function bindCategoryCards() {
  const cards = document.querySelectorAll(".category-card");
  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const category = card.getAttribute("data-category");
      if (!category) return;

      const tab = document.querySelector(
        `.tab-btn[data-category="${category}"]`
      );
      if (tab) {
        tab.click();
      }

      cards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
    });
  });
}

function syncActiveCategoryCard(category) {
  const cards = document.querySelectorAll(".category-card");
  if (!cards.length || !category) return;

  cards.forEach((card) => {
    const cat = card.getAttribute("data-category");
    card.classList.toggle("active", cat === category);
  });
}

function scrollToProducts() {
  const anchor =
    document.getElementById("shop-products-anchor") ||
    document.getElementById("category-content");
  if (!anchor) return;
  anchor.scrollIntoView({ behavior: "smooth", block: "start" });
}

