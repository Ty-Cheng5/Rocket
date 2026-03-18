"use client";

import { useState, useMemo } from "react";

// ─── Types & Data ────────────────────────────────────────────────────────────
const TYPE_ACCENT: Record<string, string> = {
  fire: "#FF6B35",
  water: "#4FC3F7",
  grass: "#66BB6A",
  electric: "#FFD54F",
  psychic: "#EC407A",
  ghost: "#9575CD",
  ice: "#80DEEA",
  normal: "#888",
  poison: "#AB47BC",
  ground: "#D4A25A",
  rock: "#8D6E63",
  fighting: "#EF5350",
  bug: "#8BC34A",
  flying: "#90CAF9",
  dragon: "#7986CB",
};

type Pokemon = {
  id: number;
  name: string;
  types: string[];
  price: number;
  seller: string;
  rating: string;
  trades: number;
  badge: string | null;
  hp: number;
  atk: number;
  def: number;
  spd: number;
  tradeFor?: string;
};

const DATA: Pokemon[] = [
  { id: 1, name: "Bulbasaur", types: ["grass", "poison"], price: 1200, seller: "LeafAgent_7", rating: "★★★★☆", trades: 47, badge: "new", hp: 45, atk: 49, def: 49, spd: 45 },
  { id: 4, name: "Charmander", types: ["fire"], price: 1500, seller: "AshKetchum_99", rating: "★★★★★", trades: 203, badge: "hot", hp: 39, atk: 52, def: 43, spd: 65 },
  { id: 7, name: "Squirtle", types: ["water"], price: 1300, seller: "MistyFan", rating: "★★★★☆", trades: 89, badge: null, hp: 44, atk: 48, def: 65, spd: 43 },
  { id: 25, name: "Pikachu", types: ["electric"], price: 5000, seller: "Pallet_01", rating: "★★★★★", trades: 512, badge: "hot", hp: 35, atk: 55, def: 30, spd: 90 },
  { id: 39, name: "Jigglypuff", types: ["normal"], price: 800, seller: "Ballad_Babe", rating: "★★★☆☆", trades: 23, badge: "new", hp: 115, atk: 45, def: 20, spd: 20 },
  { id: 52, name: "Meowth", types: ["normal"], price: 900, seller: "RocketJames", rating: "★★★★☆", trades: 67, badge: null, hp: 40, atk: 45, def: 35, spd: 90 },
  { id: 54, name: "Psyduck", types: ["water"], price: 1100, seller: "MistyFan", rating: "★★★★☆", trades: 44, badge: null, hp: 50, atk: 52, def: 48, spd: 55 },
  { id: 58, name: "Growlithe", types: ["fire"], price: 2200, seller: "FireBreeder_X", rating: "★★★★★", trades: 138, badge: null, hp: 55, atk: 70, def: 45, spd: 60 },
  { id: 63, name: "Abra", types: ["psychic"], price: 1800, seller: "Saffron_Guru", rating: "★★★★☆", trades: 92, badge: null, hp: 25, atk: 20, def: 15, spd: 90 },
  { id: 66, name: "Machop", types: ["fighting"], price: 950, seller: "FightingDojo", rating: "★★★☆☆", trades: 31, badge: "new", hp: 70, atk: 80, def: 50, spd: 35 },
  { id: 74, name: "Geodude", types: ["rock", "ground"], price: 600, seller: "Boulder_Badge", rating: "★★★☆☆", trades: 19, badge: null, hp: 40, atk: 80, def: 100, spd: 20 },
  { id: 79, name: "Slowpoke", types: ["water", "psychic"], price: 1400, seller: "Psychic_Paula", rating: "★★★★☆", trades: 55, badge: null, hp: 90, atk: 65, def: 65, spd: 15 },
  { id: 88, name: "Grimer", types: ["poison"], price: 700, seller: "Cinnabar_Lab", rating: "★★★☆☆", trades: 12, badge: "new", hp: 80, atk: 80, def: 50, spd: 25 },
  { id: 92, name: "Gastly", types: ["ghost", "poison"], price: 3500, seller: "Lavender_Town", rating: "★★★★★", trades: 178, badge: "rare", hp: 30, atk: 35, def: 30, spd: 80 },
  { id: 94, name: "Gengar", types: ["ghost", "poison"], price: 12000, seller: "Ghost_Master", rating: "★★★★★", trades: 341, badge: "rare", hp: 60, atk: 65, def: 60, spd: 110 },
  { id: 104, name: "Cubone", types: ["ground"], price: 2800, seller: "Lavender_Town", rating: "★★★★☆", trades: 63, badge: null, hp: 50, atk: 50, def: 95, spd: 35 },
  { id: 113, name: "Chansey", types: ["normal"], price: 8000, seller: "NurseJoy_Fan", rating: "★★★★★", trades: 209, badge: "rare", hp: 250, atk: 5, def: 5, spd: 50 },
  { id: 116, name: "Horsea", types: ["water"], price: 1600, seller: "Cerulean_City", rating: "★★★☆☆", trades: 28, badge: null, hp: 30, atk: 40, def: 70, spd: 60 },
  { id: 124, name: "Jynx", types: ["ice", "psychic"], price: 4200, seller: "Ice_Cave_99", rating: "★★★★☆", trades: 87, badge: null, hp: 65, atk: 50, def: 35, spd: 95 },
  { id: 129, name: "Magikarp", types: ["water"], price: 200, seller: "Old_Rod_4Life", rating: "★★★☆☆", trades: 99, badge: "new", hp: 20, atk: 10, def: 55, spd: 80 },
  { id: 131, name: "Lapras", types: ["water", "ice"], price: 15000, seller: "SilphCo_Trade", rating: "★★★★★", trades: 412, badge: "rare", hp: 130, atk: 85, def: 80, spd: 60 },
  { id: 133, name: "Eevee", types: ["normal"], price: 7500, seller: "Celadon_Hope", rating: "★★★★★", trades: 287, badge: "hot", hp: 55, atk: 55, def: 50, spd: 55 },
  { id: 137, name: "Porygon", types: ["normal"], price: 9999, seller: "SilphCo_Trade", rating: "★★★★☆", trades: 145, badge: "rare", hp: 65, atk: 60, def: 70, spd: 40 },
  { id: 143, name: "Snorlax", types: ["normal"], price: 0, seller: "Snor_Trader", rating: "★★★★★", trades: 198, badge: "hot", hp: 160, atk: 110, def: 65, spd: 30, tradeFor: "LAPRAS" },
  { id: 144, name: "Articuno", types: ["ice", "flying"], price: 0, seller: "Ice_Master_151", rating: "★★★★★", trades: 89, badge: "rare", hp: 90, atk: 85, def: 100, spd: 85, tradeFor: "ZAPDOS" },
  { id: 145, name: "Zapdos", types: ["electric", "flying"], price: 0, seller: "Thunder_Bird", rating: "★★★★★", trades: 76, badge: "rare", hp: 90, atk: 90, def: 85, spd: 100, tradeFor: "MOLTRES" },
  { id: 147, name: "Dratini", types: ["dragon"], price: 18000, seller: "Dragon_Den", rating: "★★★★★", trades: 234, badge: "rare", hp: 41, atk: 64, def: 45, spd: 50 },
  { id: 149, name: "Dragonite", types: ["dragon", "flying"], price: 50000, seller: "Dragon_Den", rating: "★★★★★", trades: 501, badge: "hot", hp: 91, atk: 134, def: 95, spd: 80 },
  { id: 150, name: "Mewtwo", types: ["psychic"], price: 0, seller: "Cerulean_Cave", rating: "★★★★★", trades: 999, badge: "rare", hp: 106, atk: 110, def: 90, spd: 130, tradeFor: "MEW" },
  { id: 151, name: "Mew", types: ["psychic"], price: 0, seller: "Glitch_Hunter", rating: "★★★★★", trades: 7, badge: "rare", hp: 100, atk: 100, def: 100, spd: 100, tradeFor: "ANY LEGENDARY" },
];

const TICKER_ITEMS = [
  "OPERATION POKÉAZON ACTIVE",
  "PIKACHU #025 — ₽5,000",
  "MEW #151 — TRADE ONLY",
  "GENGAR #094 — ₽12,000 OBO",
  "LAPRAS #131 — ₽15,000",
  "MEWTWO #150 — OFFER MEW",
  "DRAGONITE #149 — ₽50,000",
  "ARTICUNO #144 — LEGENDARY",
];

const TYPES = ["all", "fire", "water", "grass", "electric", "psychic", "ghost", "poison", "normal", "ice", "dragon"];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function spriteUrl(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/yellow/transparent/${id}.png`;
}
function spriteFallback(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}
function fmtPrice(
  price: number,
  tradeFor?: string
): { label: string; val: string; isTrade: boolean } {
  if (tradeFor) return { label: "TRADE OFFER", val: tradeFor, isTrade: true };
  if (price === 0) return { label: "PRICE", val: "OFFER", isTrade: false };
  return { label: "ASKING PRICE", val: `₽${price.toLocaleString()}`, isTrade: false };
}
function badgeStyle(badge: string): { bg: string; color: string; border?: string } | null {
  if (badge === "new") return { bg: "#E8001C", color: "#fff" };
  if (badge === "hot") return { bg: "transparent", color: "#E8001C", border: "1px solid #E8001C" };
  if (badge === "rare") return { bg: "#1C1C1C", color: "#888", border: "1px solid rgba(255,255,255,0.15)" };
  return null;
}

// ─── Ticker ───────────────────────────────────────────────────────────────────
function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div
      style={{
        background: "#E8001C",
        overflow: "hidden",
        height: 28,
        display: "flex",
        alignItems: "center",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0.4)",
          padding: "0 12px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
          fontFamily: "var(--mono)",
          fontSize: 9,
          color: "#fff",
          letterSpacing: 2,
        }}
      >
        ▶ LIVE
      </div>
      <div style={{ overflow: "hidden", flex: 1 }}>
        <div className="tk-track">
          {items.map((t, i) => (
            <span key={i} className="tk-item">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header({ search, onSearch }: { search: string; onSearch: (v: string) => void }) {
  const [activeNav, setActiveNav] = useState("EXCHANGE");
  const navItems = ["EXCHANGE", "WISHLIST", "MY TRADES", "POKÉDEX", "VERSION EXCLUSIVES", "TMs / HMs", "ITEMS"];
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(5,5,5,0.97)",
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 42,
              height: 42,
              background: "#E8001C",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--display)",
              fontSize: 28,
              color: "#fff",
              clipPath: "polygon(0 0,100% 0,100% 70%,80% 100%,0 100%)",
            }}
          >
            R
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <span style={{ fontFamily: "var(--display)", fontSize: 22, color: "#F0F0F0", letterSpacing: 4, lineHeight: 1 }}>
              POKÉAZON
            </span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 8, color: "#E8001C", letterSpacing: 3 }}>
              Team Rocket Exchange
            </span>
          </div>
        </div>
        <div style={{ flex: 1, maxWidth: 480, margin: "0 24px", position: "relative" }}>
          <span
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#E8001C",
              fontFamily: "var(--mono)",
              fontSize: 14,
              pointerEvents: "none",
            }}
          >
            ⌕
          </span>
          <input
            className="search-inp"
            type="text"
            placeholder="SEARCH POKÉMON DATABASE..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button type="button" className="btn-ghost">
            LOG IN
          </button>
          <button type="button" className="btn-primary">
            + LIST
          </button>
        </div>
      </div>
      <nav
        style={{
          borderTop: "1px solid var(--border)",
          background: "#0F0F0F",
          display: "flex",
          overflowX: "auto",
          scrollbarWidth: "none",
          padding: "0 24px",
        }}
      >
        {navItems.map((item) => (
          <span
            key={item}
            className={`nav-link${activeNav === item ? " active" : ""}`}
            onClick={() => setActiveNav(item)}
            onKeyDown={(e) => e.key === "Enter" && setActiveNav(item)}
            role="button"
            tabIndex={0}
          >
            {item}
          </span>
        ))}
      </nav>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      style={{
        position: "relative",
        padding: "40px 24px",
        overflow: "hidden",
        borderBottom: "1px solid var(--border)",
        background: "#050505",
      }}
    >
      <div className="r-bg-text">R</div>
      <div style={{ position: "relative", zIndex: 1, maxWidth: 640 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--mono)",
            fontSize: 9,
            color: "#E8001C",
            letterSpacing: 3,
            border: "1px solid #9A0012",
            padding: "5px 12px",
            marginBottom: 16,
          }}
        >
          <div className="pulse-anim" style={{ width: 6, height: 6, background: "#E8001C", borderRadius: "50%" }} />
          OPERATION POKÉAZON — ACTIVE
        </div>
        <h1
          style={{
            fontFamily: "var(--display)",
            fontSize: 60,
            lineHeight: 0.95,
            letterSpacing: 2,
            color: "#F0F0F0",
            marginBottom: 14,
          }}
        >
          TRADE.
          <br />
          ACQUIRE.
          <br />
          <span style={{ color: "#E8001C" }}>DOMINATE.</span>
        </h1>
        <p
          style={{
            fontFamily: "var(--body)",
            fontSize: 16,
            color: "#606060",
            lineHeight: 1.6,
            marginBottom: 24,
            fontWeight: 300,
          }}
        >
          The underground Pokémon Yellow exchange. Find rare Pokémon, complete your Pokédex, and build the team that Giovanni couldn&apos;t.
        </p>
        <div style={{ display: "flex", gap: 36 }}>
          {[
            ["2,847", "LISTINGS"],
            ["1,203", "AGENTS"],
            ["151", "TARGETS"],
          ].map(([n, l]) => (
            <div key={l} style={{ borderLeft: "2px solid #E8001C", paddingLeft: 14 }}>
              <div style={{ fontFamily: "var(--display)", fontSize: 28, color: "#F0F0F0", lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--text-muted)", letterSpacing: 2, marginTop: 2 }}>
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", right: 80, top: "50%", transform: "translateY(-50%)", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 8, color: "#E8001C", letterSpacing: 3, marginBottom: 8, opacity: 0.7 }}>
          TARGET: #025
        </div>
        <div style={{ position: "relative", display: "inline-block" }}>
          <div
            style={{
              position: "absolute",
              inset: -20,
              background: "radial-gradient(circle,rgba(232,0,28,0.15) 0%,transparent 70%)",
              borderRadius: "50%",
            }}
          />
          <img
            className="float-anim"
            src={spriteUrl(25)}
            alt="Pikachu"
            style={{
              width: 110,
              height: 110,
              imageRendering: "pixelated",
              filter: "saturate(0) brightness(0.8) contrast(1.2)",
              position: "relative",
              zIndex: 1,
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = spriteFallback(25);
            }}
          />
        </div>
      </div>
    </section>
  );
}

// ─── Controls ─────────────────────────────────────────────────────────────────
function Controls({
  activeType,
  onType,
  sort,
  onSort,
  count,
}: {
  activeType: string;
  onType: (t: string) => void;
  sort: string;
  onSort: (s: string) => void;
  count: number;
}) {
  return (
    <div
      style={{
        background: "#0F0F0F",
        borderBottom: "1px solid var(--border)",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--text-muted)", letterSpacing: 2, marginRight: 4 }}>
          TYPE //
        </span>
        {TYPES.map((t) => (
          <button
            key={t}
            type="button"
            className={`type-pill${activeType === t ? " active" : ""}`}
            onClick={() => onType(t)}
          >
            {t === "all" ? "ALL" : t.toUpperCase()}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-muted)", letterSpacing: 1 }}>
          {count} LISTINGS
        </span>
        <select className="sort-sel" value={sort} onChange={(e) => onSort(e.target.value)}>
          <option value="newest">NEWEST</option>
          <option value="price-asc">PRICE ↑</option>
          <option value="price-desc">PRICE ↓</option>
          <option value="number">DEX #</option>
        </select>
      </div>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function Card({
  p,
  wished,
  onWish,
  onOpen,
}: {
  p: Pokemon;
  wished: boolean;
  onWish: (id: number) => void;
  onOpen: (id: number) => void;
}) {
  const accent = TYPE_ACCENT[p.types[0]] || "#888";
  const price = fmtPrice(p.price, p.tradeFor);
  const bs = p.badge ? badgeStyle(p.badge) : null;
  return (
    <div
      className="card-hover"
      style={{
        background: "#0F0F0F",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "background 0.15s",
      }}
      onClick={() => onOpen(p.id)}
    >
      <div
        className="card-border"
        style={{
          position: "absolute",
          inset: 0,
          border: "1px solid transparent",
          transition: "border-color 0.15s,box-shadow 0.15s",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />
      {bs && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 0,
            fontFamily: "var(--mono)",
            fontSize: 7,
            letterSpacing: 2,
            padding: "3px 8px",
            zIndex: 2,
            textTransform: "uppercase",
            background: bs.bg,
            color: bs.color,
            border: bs.border || "none",
          }}
        >
          {p.badge!.toUpperCase()}
        </div>
      )}
      <button
        type="button"
        className={`wish-btn${wished ? " on" : ""}`}
        style={{ position: "absolute", top: 10, right: 10, zIndex: 4 }}
        onClick={(e) => {
          e.stopPropagation();
          onWish(p.id);
        }}
      >
        ♥
      </button>
      <div
        style={{
          height: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          borderBottom: "1px solid var(--border)",
          overflow: "hidden",
        }}
      >
        <div className="crosshair" />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: accent }} />
        <img
          className="sprite-img"
          src={spriteUrl(p.id)}
          alt={p.name}
          style={{ width: 150, height: 150, imageRendering: "pixelated", position: "relative", zIndex: 1 }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = spriteFallback(p.id);
          }}
        />
      </div>
      <div style={{ padding: 14, flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "#404040", letterSpacing: 1 }}>
          #{String(p.id).padStart(3, "0")}
        </span>
        <div style={{ fontFamily: "var(--display)", fontSize: 20, color: "#F0F0F0", letterSpacing: 2, lineHeight: 1 }}>
          {p.name.toUpperCase()}
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {p.types.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "var(--mono)",
                fontSize: 8,
                letterSpacing: 1,
                padding: "2px 7px",
                background: "#1C1C1C",
                color: TYPE_ACCENT[t] || "#888",
                border: `1px solid ${(TYPE_ACCENT[t] || "#888")}33`,
                textTransform: "uppercase",
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid var(--border)",
            paddingTop: 10,
            marginTop: "auto",
          }}
        >
          <div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 8, color: "var(--text-muted)", letterSpacing: 2, textTransform: "uppercase" }}>
              {price.label}
            </div>
            <div
              style={{
                fontFamily: price.isTrade ? "var(--mono)" : "var(--display)",
                fontSize: price.isTrade ? 12 : 20,
                color: price.isTrade ? "#E8001C" : "#F0F0F0",
                letterSpacing: price.isTrade ? 1 : 1,
                lineHeight: 1.2,
              }}
            >
              {price.val}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--text-muted)", letterSpacing: 1 }}>
              {p.seller}
            </div>
            <div style={{ color: "#E8001C", fontSize: 9, fontFamily: "var(--mono)" }}>{p.rating.slice(0, 1)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({ p, onClose }: { p: Pokemon; onClose: () => void }) {
  if (!p) return null;
  const accent = TYPE_ACCENT[p.types[0]] || "#888";
  const price = fmtPrice(p.price, p.tradeFor);
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.92)",
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal-anim"
        style={{
          background: "#0F0F0F",
          border: "1px solid var(--border)",
          borderTop: "2px solid #E8001C",
          maxWidth: 580,
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 20px",
            borderBottom: "1px solid var(--border)",
            position: "sticky",
            top: 0,
            background: "#0F0F0F",
            zIndex: 10,
          }}
        >
          <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "#E8001C", letterSpacing: 3, textTransform: "uppercase" }}>
            // TARGET ACQUISITION FILE
          </span>
          <button
            type="button"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--mono)",
              fontSize: 14,
              color: "var(--text-muted)",
              transition: "color 0.15s",
            }}
            onClick={onClose}
          >
            ✕ CLOSE
          </button>
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 24, marginBottom: 20 }}>
            <div
              style={{
                background: "#161616",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                aspectRatio: "1",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: accent }} />
              <img
                className="modal-sprite float-anim"
                src={spriteUrl(p.id)}
                alt={p.name}
                style={{ width: 150, height: 150, imageRendering: "pixelated", position: "relative", zIndex: 1 }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = spriteFallback(p.id);
                }}
              />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  color: "var(--text-muted)",
                  letterSpacing: 2,
                  marginBottom: 4,
                }}
              >
                TARGET // #{String(p.id).padStart(3, "0")}
              </div>
              <div
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 36,
                  color: "#F0F0F0",
                  letterSpacing: 3,
                  lineHeight: 1,
                  marginBottom: 10,
                }}
              >
                {p.name.toUpperCase()}
              </div>
              <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                {p.types.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 9,
                      letterSpacing: 1,
                      padding: "3px 10px",
                      border: `1px solid ${(TYPE_ACCENT[t] || "#888")}55`,
                      color: TYPE_ACCENT[t] || "#888",
                      textTransform: "uppercase",
                    }}
                  >
                    {t.toUpperCase()}
                  </span>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  ["HP", p.hp],
                  ["ATK", p.atk],
                  ["DEF", p.def],
                  ["SPD", p.spd],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      background: "#161616",
                      border: "1px solid var(--border)",
                      padding: "8px 12px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontFamily: "var(--mono)", fontSize: 8, color: "var(--text-muted)", letterSpacing: 2 }}>
                      {k}
                    </span>
                    <span style={{ fontFamily: "var(--display)", fontSize: 18, color: "#F0F0F0", lineHeight: 1 }}>{String(v)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            style={{
              background: "#161616",
              border: "1px solid var(--border)",
              borderLeft: "3px solid #E8001C",
              padding: "16px 20px",
              marginBottom: 20,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 9,
                  color: "var(--text-muted)",
                  letterSpacing: 2,
                  marginBottom: 4,
                }}
              >
                {price.label}
              </div>
              <div
                style={{
                  fontFamily: price.isTrade ? "var(--mono)" : "var(--display)",
                  fontSize: price.isTrade ? 16 : 32,
                  color: price.isTrade ? "#E8001C" : "#F0F0F0",
                  letterSpacing: 2,
                }}
              >
                {price.val}
              </div>
            </div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--text-muted)", letterSpacing: 1, textAlign: "right" }}>
              COMPLETED <br />
              <span style={{ color: "#E8E8E8" }}>{p.trades}</span> TRADES
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
            <button
              type="button"
              className="modal-btn-acquire"
              onClick={() => alert("LINK CABLE REQUIRED — Contact agent to arrange transfer.")}
            >
              {p.tradeFor ? "// OFFER TRADE" : "// ACQUIRE NOW"}
            </button>
            <button
              type="button"
              className="modal-btn-contact"
              onClick={() => alert(`Message sent to agent: ${p.seller}`)}
            >
              // MESSAGE AGENT
            </button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: 14,
              border: "1px solid var(--border)",
              background: "#161616",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                background: "#1C1C1C",
                border: "1px solid #9A0012",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--mono)",
                fontSize: 10,
                color: "#E8001C",
                flexShrink: 0,
                letterSpacing: 1,
              }}
            >
              {p.seller.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#E8E8E8", letterSpacing: 1 }}>{p.seller}</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--text-muted)", marginTop: 3, letterSpacing: 1 }}>
                <span style={{ color: "#E8001C" }}>{p.rating}</span> · {p.trades} TRADES COMPLETED
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("all");
  const [sort, setSort] = useState("newest");
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [modalId, setModalId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    let d = DATA.filter((p) => {
      const mt = activeType === "all" || p.types.includes(activeType);
      const ms =
        !search || p.name.toLowerCase().includes(search.toLowerCase()) || String(p.id).includes(search);
      return mt && ms;
    });
    if (sort === "price-asc") d.sort((a, b) => (a.price || 999999) - (b.price || 999999));
    else if (sort === "price-desc") d.sort((a, b) => (b.price || 999999) - (a.price || 999999));
    else if (sort === "number") d.sort((a, b) => a.id - b.id);
    return d;
  }, [search, activeType, sort]);

  function toggleWish(id: number) {
    setWishlist((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }

  const modalPokemon = modalId ? DATA.find((p) => p.id === modalId) ?? null : null;

  return (
    <div id="pkazon-root">
      <Ticker />
      <Header search={search} onSearch={setSearch} />
      <Hero />
      <Controls activeType={activeType} onType={setActiveType} sort={sort} onSort={setSort} count={filtered.length} />
      <main style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
            gap: 1,
            background: "var(--border)",
            border: "1px solid var(--border)",
            margin: 0,
          }}
        >
          {filtered.map((p) => (
            <Card
              key={p.id}
              p={p}
              wished={wishlist.has(p.id)}
              onWish={toggleWish}
              onOpen={setModalId}
            />
          ))}
        </div>
      </main>
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#050505",
        }}
      >
        <div style={{ fontFamily: "var(--display)", fontSize: 48, color: "rgba(232,0,28,0.08)", lineHeight: 1 }}>
          R
        </div>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 9,
            color: "#404040",
            letterSpacing: 2,
            textAlign: "center",
            lineHeight: 2,
          }}
        >
          OPERATION POKÉAZON // TEAM ROCKET INTERNAL EXCHANGE
          <br />
          UNAUTHORIZED ACCESS WILL BE PROSECUTED // FAN PROJECT
        </div>
        <div style={{ fontFamily: "var(--display)", fontSize: 48, color: "rgba(232,0,28,0.08)", lineHeight: 1 }}>
          R
        </div>
      </footer>
      {modalPokemon && <Modal p={modalPokemon} onClose={() => setModalId(null)} />}
    </div>
  );
}
