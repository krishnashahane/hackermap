// ============================================================
// CYBER THREAT MAP — Real-Time Global Hacker Map
// ============================================================

// --- CONFIG ---
const CONFIG = {
    ATTACK_INTERVAL_MS: 900,
    BURST_CHANCE: 0.15,
    BURST_COUNT: 4,
    MAX_ARCS: 70,
    MAX_FEED_ITEMS: 50,
    ARC_FLIGHT_TIME: 2200,
    ARC_DASH_LENGTH: 0.5,
    ARC_DASH_GAP: 0.25,
    ARC_STROKE: 0.4,
    STATS_INTERVAL_MS: 2000,
    MAX_HISTORY: 600,
    GLOBE_ROTATE_SPEED: 0.3,
};

// --- ATTACK TYPES ---
const ATTACK_TYPES = [
    { name: 'DDoS',        weight: 25, color: '#ff0040', badge: 'ddos',       ports: [80, 443, 53, 8080] },
    { name: 'Port Scan',   weight: 20, color: '#00ff41', badge: 'portscan',   ports: [0] },
    { name: 'Brute Force', weight: 20, color: '#ff6600', badge: 'bruteforce', ports: [22, 3389, 21, 23] },
    { name: 'Malware',     weight: 15, color: '#bf00ff', badge: 'malware',    ports: [445, 8080, 4444, 6667] },
    { name: 'SQLi',        weight: 12, color: '#00ccff', badge: 'sqli',       ports: [3306, 5432, 1433, 80] },
    { name: 'XSS',         weight: 8,  color: '#e6e600', badge: 'xss',        ports: [80, 443, 8080, 8443] },
];

// --- GEO LOCATIONS ---
const LOCATIONS = [
    { lat: 39.9, lng: 116.4, country: 'China', city: 'Beijing', flag: '🇨🇳', sw: 9, tw: 2, ips: [36,58,106,223] },
    { lat: 31.2, lng: 121.5, country: 'China', city: 'Shanghai', flag: '🇨🇳', sw: 7, tw: 3, ips: [36,58,106] },
    { lat: 23.1, lng: 113.3, country: 'China', city: 'Guangzhou', flag: '🇨🇳', sw: 6, tw: 2, ips: [14,58,113] },
    { lat: 55.8, lng: 37.6, country: 'Russia', city: 'Moscow', flag: '🇷🇺', sw: 8, tw: 2, ips: [5,46,77,95] },
    { lat: 59.9, lng: 30.3, country: 'Russia', city: 'St Petersburg', flag: '🇷🇺', sw: 5, tw: 1, ips: [5,46,77] },
    { lat: 37.5, lng: -122.0, country: 'USA', city: 'San Jose', flag: '🇺🇸', sw: 3, tw: 9, ips: [17,23,64,104] },
    { lat: 40.7, lng: -74.0, country: 'USA', city: 'New York', flag: '🇺🇸', sw: 3, tw: 8, ips: [24,45,66,173] },
    { lat: 39.0, lng: -77.5, country: 'USA', city: 'Ashburn', flag: '🇺🇸', sw: 2, tw: 10, ips: [3,52,54] },
    { lat: 47.6, lng: -122.3, country: 'USA', city: 'Seattle', flag: '🇺🇸', sw: 2, tw: 7, ips: [34,44,52] },
    { lat: 33.7, lng: -84.4, country: 'USA', city: 'Atlanta', flag: '🇺🇸', sw: 2, tw: 6, ips: [12,50,64] },
    { lat: 51.5, lng: -0.1, country: 'UK', city: 'London', flag: '🇬🇧', sw: 3, tw: 7, ips: [2,5,31,81] },
    { lat: 50.1, lng: 8.7, country: 'Germany', city: 'Frankfurt', flag: '🇩🇪', sw: 3, tw: 8, ips: [3,46,78,85] },
    { lat: 52.5, lng: 13.4, country: 'Germany', city: 'Berlin', flag: '🇩🇪', sw: 2, tw: 5, ips: [46,78,85] },
    { lat: 48.9, lng: 2.3, country: 'France', city: 'Paris', flag: '🇫🇷', sw: 3, tw: 6, ips: [5,51,62,80] },
    { lat: 35.7, lng: 139.7, country: 'Japan', city: 'Tokyo', flag: '🇯🇵', sw: 2, tw: 7, ips: [27,49,126,133] },
    { lat: 37.6, lng: 127.0, country: 'S. Korea', city: 'Seoul', flag: '🇰🇷', sw: 3, tw: 6, ips: [1,14,39,61] },
    { lat: 39.0, lng: 125.8, country: 'N. Korea', city: 'Pyongyang', flag: '🇰🇵', sw: 6, tw: 0, ips: [175] },
    { lat: 35.7, lng: 51.4, country: 'Iran', city: 'Tehran', flag: '🇮🇷', sw: 6, tw: 1, ips: [2,5,37,78] },
    { lat: 25.0, lng: 55.3, country: 'UAE', city: 'Dubai', flag: '🇦🇪', sw: 2, tw: 4, ips: [5,82,94] },
    { lat: 1.3, lng: 103.8, country: 'Singapore', city: 'Singapore', flag: '🇸🇬', sw: 2, tw: 6, ips: [8,13,27,52] },
    { lat: 19.1, lng: 72.9, country: 'India', city: 'Mumbai', flag: '🇮🇳', sw: 5, tw: 4, ips: [14,27,49,103] },
    { lat: 28.6, lng: 77.2, country: 'India', city: 'Delhi', flag: '🇮🇳', sw: 4, tw: 3, ips: [14,27,49] },
    { lat: -23.5, lng: -46.6, country: 'Brazil', city: 'São Paulo', flag: '🇧🇷', sw: 5, tw: 3, ips: [45,131,143,177] },
    { lat: 52.2, lng: 21.0, country: 'Poland', city: 'Warsaw', flag: '🇵🇱', sw: 3, tw: 3, ips: [5,31,37,46] },
    { lat: 50.4, lng: 30.5, country: 'Ukraine', city: 'Kyiv', flag: '🇺🇦', sw: 4, tw: 3, ips: [5,37,46,91] },
    { lat: 41.0, lng: 29.0, country: 'Turkey', city: 'Istanbul', flag: '🇹🇷', sw: 4, tw: 2, ips: [5,31,46,78] },
    { lat: -33.9, lng: 18.4, country: 'S. Africa', city: 'Cape Town', flag: '🇿🇦', sw: 2, tw: 3, ips: [41,105,154,196] },
    { lat: 60.2, lng: 24.9, country: 'Finland', city: 'Helsinki', flag: '🇫🇮', sw: 1, tw: 4, ips: [37,62,80,91] },
    { lat: 45.5, lng: -73.6, country: 'Canada', city: 'Montreal', flag: '🇨🇦', sw: 2, tw: 5, ips: [24,47,99,142] },
    { lat: -33.8, lng: 151.2, country: 'Australia', city: 'Sydney', flag: '🇦🇺', sw: 2, tw: 5, ips: [1,13,27,49] },
    { lat: 22.3, lng: 114.2, country: 'Hong Kong', city: 'Hong Kong', flag: '🇭🇰', sw: 4, tw: 5, ips: [14,27,43,103] },
    { lat: 25.0, lng: 121.5, country: 'Taiwan', city: 'Taipei', flag: '🇹🇼', sw: 3, tw: 5, ips: [1,36,59,114] },
    { lat: 59.3, lng: 18.1, country: 'Sweden', city: 'Stockholm', flag: '🇸🇪', sw: 2, tw: 4, ips: [2,31,46,80] },
    { lat: 55.7, lng: 12.6, country: 'Denmark', city: 'Copenhagen', flag: '🇩🇰', sw: 1, tw: 3, ips: [2,5,31,80] },
    { lat: 48.2, lng: 16.4, country: 'Austria', city: 'Vienna', flag: '🇦🇹', sw: 1, tw: 3, ips: [5,46,77,78] },
    { lat: 4.6, lng: -74.1, country: 'Colombia', city: 'Bogotá', flag: '🇨🇴', sw: 3, tw: 2, ips: [181,186,190,200] },
    { lat: 14.6, lng: 121.0, country: 'Philippines', city: 'Manila', flag: '🇵🇭', sw: 3, tw: 2, ips: [49,112,120,124] },
    { lat: 3.1, lng: 101.7, country: 'Malaysia', city: 'Kuala Lumpur', flag: '🇲🇾', sw: 2, tw: 2, ips: [1,27,49,60] },
    { lat: 13.8, lng: 100.5, country: 'Thailand', city: 'Bangkok', flag: '🇹🇭', sw: 3, tw: 2, ips: [1,14,27,49] },
    { lat: 21.0, lng: 105.9, country: 'Vietnam', city: 'Hanoi', flag: '🇻🇳', sw: 5, tw: 1, ips: [1,14,27,42] },
];

// --- SEVERITY LEVELS ---
const SEVERITIES = [
    { name: 'low', weight: 30 },
    { name: 'medium', weight: 35 },
    { name: 'high', weight: 25 },
    { name: 'critical', weight: 10 },
];

// --- UTILS ---
function weightedRandom(items, key = 'weight') {
    const total = items.reduce((s, i) => s + i[key], 0);
    let r = Math.random() * total;
    for (const item of items) {
        r -= item[key];
        if (r <= 0) return item;
    }
    return items[items.length - 1];
}

function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateIP(prefixes) {
    const p = randomFrom(prefixes);
    return `${p}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*254)+1}`;
}

function formatTime(d) {
    return d.toTimeString().slice(0, 8);
}

function padZero(n) {
    return String(n).padStart(2, '0');
}

// --- ATTACK SIMULATOR ---
class AttackSimulator {
    generateAttack() {
        const src = weightedRandom(LOCATIONS, 'sw');
        let tgt = weightedRandom(LOCATIONS, 'tw');
        // Avoid same city
        let tries = 0;
        while (tgt === src && tries < 5) { tgt = weightedRandom(LOCATIONS, 'tw'); tries++; }

        const type = weightedRandom(ATTACK_TYPES);
        const severity = weightedRandom(SEVERITIES);
        const port = type.name === 'Port Scan'
            ? Math.floor(Math.random() * 65535) + 1
            : randomFrom(type.ports);

        return {
            id: Math.random().toString(36).slice(2, 10),
            timestamp: new Date(),
            type: type.name,
            color: type.color,
            badge: type.badge,
            severity: severity.name,
            srcLat: src.lat + (Math.random() - 0.5) * 2,
            srcLng: src.lng + (Math.random() - 0.5) * 2,
            srcCountry: src.country,
            srcCity: src.city,
            srcFlag: src.flag,
            srcIP: generateIP(src.ips),
            tgtLat: tgt.lat + (Math.random() - 0.5) * 2,
            tgtLng: tgt.lng + (Math.random() - 0.5) * 2,
            tgtCountry: tgt.country,
            tgtCity: tgt.city,
            tgtFlag: tgt.flag,
            tgtIP: generateIP(tgt.ips),
            port,
        };
    }
}

// --- APP STATE ---
const simulator = new AttackSimulator();
let activeArcs = [];
let attackHistory = [];
let totalCount = 0;
let startTime = Date.now();
let globe;

// --- GLOBE INIT ---
function initGlobe() {
    const container = document.getElementById('globe-container');

    globe = Globe()(container)
        .globeImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg')
        .bumpImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png')
        .backgroundColor('rgba(0,0,0,0)')
        .atmosphereColor('#00ff41')
        .atmosphereAltitude(0.2)
        .arcStartLat(d => d.srcLat)
        .arcStartLng(d => d.srcLng)
        .arcEndLat(d => d.tgtLat)
        .arcEndLng(d => d.tgtLng)
        .arcColor(d => d.color)
        .arcDashLength(CONFIG.ARC_DASH_LENGTH)
        .arcDashGap(CONFIG.ARC_DASH_GAP)
        .arcDashAnimateTime(CONFIG.ARC_FLIGHT_TIME)
        .arcStroke(CONFIG.ARC_STROKE)
        .arcsTransitionDuration(0)
        .arcLabel(d => `
            <div style="font-family:Share Tech Mono,monospace;font-size:12px;background:rgba(0,0,0,0.85);padding:8px 12px;border:1px solid ${d.color};border-radius:4px;">
                <div style="color:${d.color};font-weight:bold;margin-bottom:4px;">${d.type}</div>
                <div>${d.srcFlag} ${d.srcIP} → ${d.tgtFlag} ${d.tgtIP}</div>
                <div style="color:#666;font-size:10px;">Port ${d.port} · ${d.severity.toUpperCase()}</div>
            </div>
        `)
        .pointOfView({ lat: 20, lng: 10, altitude: 2.2 });

    // Auto-rotate
    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = CONFIG.GLOBE_ROTATE_SPEED;
    controls.enableDamping = true;

    handleResize();
    window.addEventListener('resize', handleResize);
}

function handleResize() {
    const container = document.getElementById('globe-container');
    globe.width(container.clientWidth);
    globe.height(container.clientHeight);
}

// --- ARC MANAGEMENT ---
function addArc(attack) {
    activeArcs.push(attack);
    if (activeArcs.length > CONFIG.MAX_ARCS) {
        activeArcs = activeArcs.slice(-CONFIG.MAX_ARCS);
    }
    globe.arcsData(activeArcs);
}

// --- FEED PANEL ---
const feedList = document.getElementById('feed-list');

function addFeedItem(attack) {
    const el = document.createElement('div');
    el.className = 'feed-item feed-new';
    el.innerHTML = `
        <div class="feed-time">${formatTime(attack.timestamp)}</div>
        <div class="feed-route">
            ${attack.srcFlag} <span class="feed-ip">${attack.srcIP}</span>
            <span class="arrow">→</span>
            ${attack.tgtFlag} <span class="feed-ip">${attack.tgtIP}</span>
            <span class="feed-badge badge-${attack.badge}">${attack.type}</span>
            <span class="feed-port">:${attack.port}</span>
        </div>
    `;

    el.addEventListener('click', () => {
        globe.pointOfView({ lat: attack.tgtLat, lng: attack.tgtLng, altitude: 1.5 }, 1000);
    });

    feedList.prepend(el);

    // Remove glow after animation
    setTimeout(() => el.classList.remove('feed-new'), 1500);

    // Cap feed items
    while (feedList.children.length > CONFIG.MAX_FEED_ITEMS) {
        feedList.removeChild(feedList.lastChild);
    }
}

// --- STATS ---
function recordAttack(attack) {
    attackHistory.push(attack);
    if (attackHistory.length > CONFIG.MAX_HISTORY) {
        attackHistory = attackHistory.slice(-CONFIG.MAX_HISTORY);
    }
    totalCount++;
}

function updateStats() {
    // Attacks per minute
    const now = Date.now();
    const oneMinAgo = now - 60000;
    const recentCount = attackHistory.filter(a => a.timestamp.getTime() > oneMinAgo).length;
    document.getElementById('attacks-per-min').textContent = recentCount;
    document.getElementById('total-attacks').textContent = totalCount.toLocaleString();

    // Uptime
    const elapsed = Math.floor((now - startTime) / 1000);
    const h = padZero(Math.floor(elapsed / 3600));
    const m = padZero(Math.floor((elapsed % 3600) / 60));
    const s = padZero(elapsed % 60);
    document.getElementById('uptime').textContent = `${h}:${m}:${s}`;

    // Top countries
    updateBarChart('top-countries', countBy(attackHistory, 'srcCountry'), 5, '#00ff41');

    // Top attack types
    const typeCounts = countBy(attackHistory, 'type');
    const typeColors = {};
    ATTACK_TYPES.forEach(t => typeColors[t.name] = t.color);
    updateBarChart('top-types', typeCounts, 5, typeColors);

    // Top ports
    updateBarChart('top-ports', countBy(attackHistory, 'port'), 5, '#00ccff');
}

function countBy(arr, key) {
    const map = {};
    arr.forEach(a => {
        const k = a[key];
        map[k] = (map[k] || 0) + 1;
    });
    return map;
}

function updateBarChart(containerId, data, limit, colors) {
    const container = document.getElementById(containerId);
    const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]).slice(0, limit);
    const max = sorted.length ? sorted[0][1] : 1;

    container.innerHTML = sorted.map(([label, count]) => {
        const pct = Math.round((count / max) * 100);
        const color = typeof colors === 'string' ? colors : (colors[label] || '#00ff41');
        return `
            <div class="stat-row">
                <span class="stat-row-label">${label}</span>
                <div class="stat-bar-bg">
                    <div class="stat-bar-fill" style="width:${pct}%;background:${color};color:${color};"></div>
                </div>
                <span class="stat-row-count">${count}</span>
            </div>
        `;
    }).join('');
}

// --- MAIN LOOP ---
function processAttack() {
    const attack = simulator.generateAttack();
    addArc(attack);
    addFeedItem(attack);
    recordAttack(attack);
}

function startSimulation() {
    // Regular attacks
    setInterval(() => {
        processAttack();

        // Occasional burst
        if (Math.random() < CONFIG.BURST_CHANCE) {
            for (let i = 0; i < CONFIG.BURST_COUNT; i++) {
                setTimeout(() => processAttack(), (i + 1) * 150);
            }
        }
    }, CONFIG.ATTACK_INTERVAL_MS);
}

// --- INIT ---
function init() {
    initGlobe();
    startSimulation();
    setInterval(updateStats, CONFIG.STATS_INTERVAL_MS);
    updateStats();
}

init();
