<div align="center">

<!--  HERO BANNER SVG -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 280" width="900">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#050d0a"/>
      <stop offset="100%" style="stop-color:#081a10"/>
    </linearGradient>
    <linearGradient id="glow1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#00ff88;stop-opacity:0"/>
      <stop offset="50%" style="stop-color:#00ff88;stop-opacity:0.6"/>
      <stop offset="100%" style="stop-color:#00ff88;stop-opacity:0"/>
    </linearGradient>
    <linearGradient id="glow2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#00d4ff;stop-opacity:0"/>
      <stop offset="50%" style="stop-color:#00d4ff;stop-opacity:0.4"/>
      <stop offset="100%" style="stop-color:#00d4ff;stop-opacity:0"/>
    </linearGradient>
    <filter id="blur2">
      <feGaussianBlur stdDeviation="8"/>
    </filter>
    <filter id="textGlow">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00ff8808" stroke-width="0.5"/>
    </pattern>
  </defs>

  <rect width="900" height="280" fill="url(#bg)" rx="16"/>
  <rect width="900" height="280" fill="url(#grid)" rx="16"/>

  <!-- Glow orbs -->
  <ellipse cx="180" cy="140" rx="120" ry="80" fill="#00ff88" opacity="0.04" filter="url(#blur2)"/>
  <ellipse cx="720" cy="140" rx="100" ry="70" fill="#00d4ff" opacity="0.05" filter="url(#blur2)"/>
  <ellipse cx="450" cy="200" rx="200" ry="60" fill="#00ff88" opacity="0.03" filter="url(#blur2)"/>

  <!-- Scan lines -->
  <rect x="0" y="48" width="900" height="1" fill="url(#glow1)" opacity="0.5"/>
  <rect x="0" y="230" width="900" height="1" fill="url(#glow2)" opacity="0.4"/>

  <!-- Corner brackets -->
  <path d="M20,20 L20,8 L8,8" fill="none" stroke="#00ff88" stroke-width="1.5" opacity="0.7"/>
  <path d="M880,8 L892,8 L892,20" fill="none" stroke="#00ff88" stroke-width="1.5" opacity="0.7"/>
  <path d="M8,260 L8,272 L20,272" fill="none" stroke="#00ff88" stroke-width="1.5" opacity="0.7"/>
  <path d="M892,260 L892,272 L880,272" fill="none" stroke="#00ff88" stroke-width="1.5" opacity="0.7"/>

  <!-- Side lines -->
  <line x1="2" y1="40" x2="2" y2="240" stroke="#00ff88" stroke-width="1" opacity="0.2"/>
  <line x1="898" y1="40" x2="898" y2="240" stroke="#00ff88" stroke-width="1" opacity="0.2"/>

  <!-- Prompt symbol -->
  <text x="60" y="108" font-family="'Courier New', monospace" font-size="28" fill="#00ff88" opacity="0.9" filter="url(#textGlow)">&#62;_</text>

  <!-- Main title -->
  <text x="450" y="118" font-family="'Courier New', monospace" font-size="64" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="-2" opacity="0.97">CodeScale</text>

  <!-- Underline glow -->
  <rect x="200" y="128" width="500" height="2" fill="url(#glow1)" rx="1"/>
  <rect x="280" y="128" width="340" height="1" fill="#00ff88" opacity="0.7" rx="1"/>

  <!-- Tagline -->
  <text x="450" y="163" font-family="'Courier New', monospace" font-size="16" fill="#00ff88" text-anchor="middle" letter-spacing="6" opacity="0.85">CODE  ·  EXECUTE  ·  IMPROVE</text>

  <!-- Description -->
  <text x="450" y="196" font-family="'Courier New', monospace" font-size="12" fill="#7dffbb" text-anchor="middle" opacity="0.6">A focused coding judge platform — solve real algorithmic problems, get instant verdicts</text>

  <!-- Badge pills -->
  <rect x="220" y="218" width="90" height="22" rx="11" fill="#f7df1e" opacity="0.15"/>
  <rect x="220" y="218" width="90" height="22" rx="11" fill="none" stroke="#f7df1e" stroke-width="0.5" opacity="0.5"/>
  <text x="265" y="233" font-family="'Courier New', monospace" font-size="10" fill="#f7df1e" text-anchor="middle" opacity="0.9">JavaScript</text>

  <rect x="320" y="218" width="70" height="22" rx="11" fill="#3776ab" opacity="0.15"/>
  <rect x="320" y="218" width="70" height="22" rx="11" fill="none" stroke="#3776ab" stroke-width="0.5" opacity="0.5"/>
  <text x="355" y="233" font-family="'Courier New', monospace" font-size="10" fill="#60a0d0" text-anchor="middle" opacity="0.9">Python</text>

  <rect x="400" y="218" width="60" height="22" rx="11" fill="#61dafb" opacity="0.1"/>
  <rect x="400" y="218" width="60" height="22" rx="11" fill="none" stroke="#61dafb" stroke-width="0.5" opacity="0.5"/>
  <text x="430" y="233" font-family="'Courier New', monospace" font-size="10" fill="#61dafb" text-anchor="middle" opacity="0.9">React 19</text>

  <rect x="470" y="218" width="80" height="22" rx="11" fill="#47a248" opacity="0.1"/>
  <rect x="470" y="218" width="80" height="22" rx="11" fill="none" stroke="#47a248" stroke-width="0.5" opacity="0.5"/>
  <text x="510" y="233" font-family="'Courier New', monospace" font-size="10" fill="#47a248" text-anchor="middle" opacity="0.9">MongoDB</text>

  <rect x="560" y="218" width="80" height="22" rx="11" fill="#00ff88" opacity="0.12"/>
  <rect x="560" y="218" width="80" height="22" rx="11" fill="none" stroke="#00ff88" stroke-width="0.5" opacity="0.6"/>
  <text x="600" y="233" font-family="'Courier New', monospace" font-size="10" fill="#00ff88" text-anchor="middle" opacity="0.9">Open Beta</text>

  <rect x="650" y="218" width="55" height="22" rx="11" fill="#ffffff" opacity="0.05"/>
  <rect x="650" y="218" width="55" height="22" rx="11" fill="none" stroke="#ffffff" stroke-width="0.5" opacity="0.3"/>
  <text x="677" y="233" font-family="'Courier New', monospace" font-size="10" fill="#cccccc" text-anchor="middle" opacity="0.8">Vercel</text>
</svg>

<br/>

[![Live Demo](https://img.shields.io/badge/⚡_LIVE_DEMO-code--scale.vercel.app-00ff88?style=for-the-badge&labelColor=0a0a0a)](https://code-scale.vercel.app)
&nbsp;
[![Backend](https://img.shields.io/badge/BACKEND-Render-46E3B7?style=for-the-badge&labelColor=0a0a0a&logo=render)](https://render.com)
&nbsp;
[![Stars](https://img.shields.io/github/stars/your-username/CodeScale?style=for-the-badge&labelColor=0a0a0a&color=00ff88)](https://github.com/your-username/CodeScale)

</div>

---

<!-- FEATURES VISUAL -->
<div align="center">

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 430" width="900">
  <defs>
    <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#050d0a"/>
      <stop offset="100%" style="stop-color:#060f0b"/>
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0d2018"/>
      <stop offset="100%" style="stop-color:#091a10"/>
    </linearGradient>
    <pattern id="grid2" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#00ff8806" stroke-width="0.5"/>
    </pattern>
  </defs>

  <rect width="900" height="430" fill="url(#bg2)" rx="16"/>
  <rect width="900" height="430" fill="url(#grid2)" rx="16"/>

  <text x="450" y="36" font-family="'Courier New', monospace" font-size="11" fill="#00ff88" text-anchor="middle" letter-spacing="5" opacity="0.7">PLATFORM FEATURES</text>
  <line x1="100" y1="44" x2="360" y2="44" stroke="#00ff8830" stroke-width="0.5"/>
  <line x1="540" y1="44" x2="800" y2="44" stroke="#00ff8830" stroke-width="0.5"/>

  <!-- Card 1: Monaco Editor -->
  <rect x="30" y="62" width="190" height="158" rx="10" fill="url(#cardGrad)" stroke="#00ff8830" stroke-width="1"/>
  <rect x="30" y="62" width="190" height="3" rx="2" fill="#00ff88" opacity="0.7"/>
  <text x="125" y="100" font-family="'Courier New', monospace" font-size="22" fill="#00ff88" text-anchor="middle" opacity="0.9">{ }</text>
  <text x="125" y="122" font-family="'Courier New', monospace" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">Monaco Editor</text>
  <text x="125" y="140" font-family="'Courier New', monospace" font-size="9" fill="#7dffbb" text-anchor="middle" opacity="0.7">VS Code in your browser</text>
  <line x1="55" y1="150" x2="195" y2="150" stroke="#00ff8820" stroke-width="0.5"/>
  <text x="125" y="166" font-family="'Courier New', monospace" font-size="9" fill="#5dcc88" text-anchor="middle" opacity="0.6">JS &amp; Python support</text>
  <text x="125" y="180" font-family="'Courier New', monospace" font-size="9" fill="#5dcc88" text-anchor="middle" opacity="0.6">Syntax highlighting</text>
  <text x="125" y="194" font-family="'Courier New', monospace" font-size="9" fill="#5dcc88" text-anchor="middle" opacity="0.6">Run + Submit verdict</text>
  <text x="125" y="208" font-family="'Courier New', monospace" font-size="9" fill="#5dcc88" text-anchor="middle" opacity="0.6">Auto-complete support</text>

  <!-- Card 2: Execution Engine -->
  <rect x="240" y="62" width="190" height="158" rx="10" fill="url(#cardGrad)" stroke="#00d4ff30" stroke-width="1"/>
  <rect x="240" y="62" width="190" height="3" rx="2" fill="#00d4ff" opacity="0.7"/>
  <text x="335" y="100" font-family="'Courier New', monospace" font-size="22" fill="#00d4ff" text-anchor="middle" opacity="0.9">&#9881;</text>
  <text x="335" y="122" font-family="'Courier New', monospace" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">Execution Engine</text>
  <text x="335" y="140" font-family="'Courier New', monospace" font-size="9" fill="#7dd4ff" text-anchor="middle" opacity="0.7">Custom sandboxed runner</text>
  <line x1="265" y1="150" x2="405" y2="150" stroke="#00d4ff20" stroke-width="0.5"/>
  <text x="335" y="166" font-family="'Courier New', monospace" font-size="9" fill="#5daacc" text-anchor="middle" opacity="0.6">9s timeout guard</text>
  <text x="335" y="180" font-family="'Courier New', monospace" font-size="9" fill="#5daacc" text-anchor="middle" opacity="0.6">Isolated child process</text>
  <text x="335" y="194" font-family="'Courier New', monospace" font-size="9" fill="#5daacc" text-anchor="middle" opacity="0.6">Hidden test cases</text>
  <text x="335" y="208" font-family="'Courier New', monospace" font-size="9" fill="#5daacc" text-anchor="middle" opacity="0.6">Concurrent-safe temp files</text>

  <!-- Card 3: AI Assistant -->
  <rect x="450" y="62" width="190" height="158" rx="10" fill="url(#cardGrad)" stroke="#a855f730" stroke-width="1"/>
  <rect x="450" y="62" width="190" height="3" rx="2" fill="#a855f7" opacity="0.7"/>
  <text x="545" y="100" font-family="'Courier New', monospace" font-size="22" fill="#a855f7" text-anchor="middle" opacity="0.9">&#9670;</text>
  <text x="545" y="122" font-family="'Courier New', monospace" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">AI DSA Assistant</text>
  <text x="545" y="140" font-family="'Courier New', monospace" font-size="9" fill="#c084fc" text-anchor="middle" opacity="0.7">Groq · LLaMA 3.1 · 8B Instant</text>
  <line x1="475" y1="150" x2="615" y2="150" stroke="#a855f720" stroke-width="0.5"/>
  <text x="545" y="166" font-family="'Courier New', monospace" font-size="9" fill="#9966cc" text-anchor="middle" opacity="0.6">DSA-scoped only</text>
  <text x="545" y="180" font-family="'Courier New', monospace" font-size="9" fill="#9966cc" text-anchor="middle" opacity="0.6">Guides — never spoils</text>
  <text x="545" y="194" font-family="'Courier New', monospace" font-size="9" fill="#9966cc" text-anchor="middle" opacity="0.6">Multi-turn conversation</text>
  <text x="545" y="208" font-family="'Courier New', monospace" font-size="9" fill="#9966cc" text-anchor="middle" opacity="0.6">Complexity analysis help</text>

  <!-- Card 4: Dry Run Board -->
  <rect x="660" y="62" width="210" height="158" rx="10" fill="url(#cardGrad)" stroke="#f59e0b30" stroke-width="1"/>
  <rect x="660" y="62" width="210" height="3" rx="2" fill="#f59e0b" opacity="0.7"/>
  <text x="765" y="100" font-family="'Courier New', monospace" font-size="22" fill="#f59e0b" text-anchor="middle" opacity="0.9">&#9999;</text>
  <text x="765" y="122" font-family="'Courier New', monospace" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">Dry Run Board</text>
  <text x="765" y="140" font-family="'Courier New', monospace" font-size="9" fill="#fcd34d" text-anchor="middle" opacity="0.7">Freehand drawing canvas</text>
  <line x1="685" y1="150" x2="845" y2="150" stroke="#f59e0b20" stroke-width="0.5"/>
  <text x="765" y="166" font-family="'Courier New', monospace" font-size="9" fill="#cc9933" text-anchor="middle" opacity="0.6">Sketch arrays &amp; trees</text>
  <text x="765" y="180" font-family="'Courier New', monospace" font-size="9" fill="#cc9933" text-anchor="middle" opacity="0.6">Color + pen size controls</text>
  <text x="765" y="194" font-family="'Courier New', monospace" font-size="9" fill="#cc9933" text-anchor="middle" opacity="0.6">Think before you code</text>
  <text x="765" y="208" font-family="'Courier New', monospace" font-size="9" fill="#cc9933" text-anchor="middle" opacity="0.6">Undo / clear tools</text>

  <!-- Card 5: Dashboard -->
  <rect x="30" y="242" width="255" height="158" rx="10" fill="url(#cardGrad)" stroke="#00ff8830" stroke-width="1"/>
  <rect x="30" y="242" width="255" height="3" rx="2" fill="#00ff88" opacity="0.5"/>
  <text x="157" y="280" font-family="'Courier New', monospace" font-size="22" fill="#00ff88" text-anchor="middle" opacity="0.9">&#9685;</text>
  <text x="157" y="300" font-family="'Courier New', monospace" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">Personal Dashboard</text>
  <line x1="55" y1="310" x2="260" y2="310" stroke="#00ff8820" stroke-width="0.5"/>
  <text x="55" y="326" font-family="'Courier New', monospace" font-size="8" fill="#00ff88" opacity="0.7">Easy   </text>
  <rect x="90" y="319" width="120" height="6" rx="3" fill="#00ff8810"/>
  <rect x="90" y="319" width="110" height="6" rx="3" fill="#00ff88" opacity="0.7"/>
  <text x="55" y="342" font-family="'Courier New', monospace" font-size="8" fill="#f59e0b" opacity="0.7">Medium </text>
  <rect x="90" y="335" width="120" height="6" rx="3" fill="#f59e0b10"/>
  <rect x="90" y="335" width="65" height="6" rx="3" fill="#f59e0b" opacity="0.5"/>
  <text x="55" y="358" font-family="'Courier New', monospace" font-size="8" fill="#ef4444" opacity="0.7">Hard   </text>
  <rect x="90" y="351" width="120" height="6" rx="3" fill="#ef444410"/>
  <rect x="90" y="351" width="30" height="6" rx="3" fill="#ef4444" opacity="0.4"/>
  <text x="157" y="378" font-family="'Courier New', monospace" font-size="8" fill="#7dffbb" text-anchor="middle" opacity="0.6">Streak &#x1F525; · Heatmap · Leaderboard · Points</text>

  <!-- Card 6: Auth -->
  <rect x="305" y="242" width="200" height="158" rx="10" fill="url(#cardGrad)" stroke="#00d4ff30" stroke-width="1"/>
  <rect x="305" y="242" width="200" height="3" rx="2" fill="#00d4ff" opacity="0.5"/>
  <text x="405" y="280" font-family="'Courier New', monospace" font-size="22" fill="#00d4ff" text-anchor="middle" opacity="0.9">&#128274;</text>
  <text x="405" y="300" font-family="'Courier New', monospace" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">Auth System</text>
  <line x1="330" y1="310" x2="480" y2="310" stroke="#00d4ff20" stroke-width="0.5"/>
  <text x="405" y="328" font-family="'Courier New', monospace" font-size="9" fill="#5daacc" text-anchor="middle" opacity="0.7">JWT + HTTP-only Cookies</text>
  <text x="405" y="344" font-family="'Courier New', monospace" font-size="9" fill="#5daacc" text-anchor="middle" opacity="0.6">bcrypt password hashing</text>
  <text x="405" y="360" font-family="'Courier New', monospace" font-size="9" fill="#5daacc" text-anchor="middle" opacity="0.6">Zod schema validation</text>
  <text x="405" y="376" font-family="'Courier New', monospace" font-size="9" fill="#5daacc" text-anchor="middle" opacity="0.6">Admin panel included</text>

  <!-- Card 7: Problems -->
  <rect x="525" y="242" width="345" height="158" rx="10" fill="url(#cardGrad)" stroke="#a855f730" stroke-width="1"/>
  <rect x="525" y="242" width="345" height="3" rx="2" fill="#a855f7" opacity="0.5"/>
  <text x="697" y="280" font-family="'Courier New', monospace" font-size="22" fill="#a855f7" text-anchor="middle" opacity="0.9">&#9899;</text>
  <text x="697" y="298" font-family="'Courier New', monospace" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">30 DSA Problems</text>
  <line x1="548" y1="308" x2="847" y2="308" stroke="#a855f720" stroke-width="0.5"/>
  <circle cx="555" cy="326" r="5" fill="#00ff88" opacity="0.8"/>
  <text x="565" y="330" font-family="'Courier New', monospace" font-size="9" fill="#00ff88" opacity="0.8">10 Easy   — 10 pts each</text>
  <circle cx="555" cy="346" r="5" fill="#f59e0b" opacity="0.8"/>
  <text x="565" y="350" font-family="'Courier New', monospace" font-size="9" fill="#f59e0b" opacity="0.8">10 Medium — 20 pts each</text>
  <circle cx="555" cy="366" r="5" fill="#ef4444" opacity="0.8"/>
  <text x="565" y="370" font-family="'Courier New', monospace" font-size="9" fill="#ef4444" opacity="0.8">10 Hard   — 30 pts each</text>
  <rect x="700" y="316" width="52" height="16" rx="8" fill="#a855f720" stroke="#a855f740" stroke-width="0.5"/>
  <text x="726" y="327" font-family="'Courier New', monospace" font-size="7" fill="#c084fc" text-anchor="middle">Array</text>
  <rect x="760" y="316" width="60" height="16" rx="8" fill="#a855f720" stroke="#a855f740" stroke-width="0.5"/>
  <text x="790" y="327" font-family="'Courier New', monospace" font-size="7" fill="#c084fc" text-anchor="middle">Two Ptrs</text>
  <rect x="700" y="338" width="66" height="16" rx="8" fill="#a855f720" stroke="#a855f740" stroke-width="0.5"/>
  <text x="733" y="349" font-family="'Courier New', monospace" font-size="7" fill="#c084fc" text-anchor="middle">Hash Map</text>
  <rect x="774" y="338" width="48" height="16" rx="8" fill="#a855f720" stroke="#a855f740" stroke-width="0.5"/>
  <text x="798" y="349" font-family="'Courier New', monospace" font-size="7" fill="#c084fc" text-anchor="middle">Stack</text>
  <rect x="700" y="360" width="56" height="16" rx="8" fill="#a855f720" stroke="#a855f740" stroke-width="0.5"/>
  <text x="728" y="371" font-family="'Courier New', monospace" font-size="7" fill="#c084fc" text-anchor="middle">Graphs</text>
  <rect x="764" y="360" width="60" height="16" rx="8" fill="#a855f720" stroke="#a855f740" stroke-width="0.5"/>
  <text x="794" y="371" font-family="'Courier New', monospace" font-size="7" fill="#c084fc" text-anchor="middle">Dyn Prog</text>
  <text x="697" y="392" font-family="'Courier New', monospace" font-size="8" fill="#7755aa" text-anchor="middle" opacity="0.5">+ BFS · DFS · Trees · Sliding Window · Binary Search</text>
</svg>

</div>

---

## 🏗️ System Architecture

<div align="center">

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 360" width="900">
  <defs>
    <linearGradient id="abg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#050d0a"/>
      <stop offset="100%" style="stop-color:#060f0b"/>
    </linearGradient>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#00ff8860"/>
    </marker>
    <marker id="arrow2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#00d4ff60"/>
    </marker>
    <marker id="arrow3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#a855f760"/>
    </marker>
    <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="0.5" fill="#00ff8815"/>
    </pattern>
  </defs>

  <rect width="900" height="360" fill="url(#abg)" rx="16"/>
  <rect width="900" height="360" fill="url(#dots)" rx="16"/>

  <text x="450" y="30" font-family="'Courier New', monospace" font-size="11" fill="#00ff88" text-anchor="middle" letter-spacing="5" opacity="0.7">SYSTEM ARCHITECTURE</text>

  <!-- User -->
  <rect x="30" y="130" width="110" height="60" rx="8" fill="#0d2018" stroke="#00ff8840" stroke-width="1"/>
  <text x="85" y="155" font-family="'Courier New', monospace" font-size="20" fill="#00ff88" text-anchor="middle">&#9685;</text>
  <text x="85" y="175" font-family="'Courier New', monospace" font-size="10" fill="#7dffbb" text-anchor="middle">User Browser</text>

  <!-- Vercel dashed box -->
  <rect x="210" y="55" width="165" height="210" rx="8" fill="#0a1a14" stroke="#00ff8840" stroke-width="1" stroke-dasharray="4,2"/>
  <text x="292" y="76" font-family="'Courier New', monospace" font-size="9" fill="#00ff88" text-anchor="middle" letter-spacing="2" opacity="0.7">VERCEL</text>
  <rect x="225" y="84" width="135" height="50" rx="6" fill="#0d2018" stroke="#00ff8830" stroke-width="1"/>
  <text x="292" y="105" font-family="'Courier New', monospace" font-size="10" fill="#7dffbb" text-anchor="middle">React 19 + Vite</text>
  <text x="292" y="121" font-family="'Courier New', monospace" font-size="8" fill="#5dcc88" text-anchor="middle" opacity="0.7">TailwindCSS · Framer Motion</text>
  <rect x="225" y="146" width="135" height="36" rx="6" fill="#0d2018" stroke="#00ff8830" stroke-width="1"/>
  <text x="292" y="163" font-family="'Courier New', monospace" font-size="9" fill="#7dffbb" text-anchor="middle">Monaco Editor</text>
  <text x="292" y="177" font-family="'Courier New', monospace" font-size="8" fill="#5dcc88" text-anchor="middle" opacity="0.6">In-browser code editor</text>
  <rect x="225" y="194" width="135" height="36" rx="6" fill="#0d2018" stroke="#00ff8830" stroke-width="1"/>
  <text x="292" y="211" font-family="'Courier New', monospace" font-size="9" fill="#7dffbb" text-anchor="middle">Dry Run Canvas</text>
  <text x="292" y="225" font-family="'Courier New', monospace" font-size="8" fill="#5dcc88" text-anchor="middle" opacity="0.6">react-sketch-canvas</text>

  <!-- Arrow: User -> Vercel -->
  <line x1="140" y1="160" x2="206" y2="160" stroke="#00ff8860" stroke-width="1.5" marker-end="url(#arrow)" stroke-dasharray="3,2"/>
  <text x="173" y="154" font-family="'Courier New', monospace" font-size="7" fill="#00ff88" text-anchor="middle" opacity="0.6">HTTPS</text>

  <!-- Render dashed box -->
  <rect x="465" y="55" width="180" height="210" rx="8" fill="#0a1520" stroke="#00d4ff40" stroke-width="1" stroke-dasharray="4,2"/>
  <text x="555" y="76" font-family="'Courier New', monospace" font-size="9" fill="#00d4ff" text-anchor="middle" letter-spacing="2" opacity="0.7">RENDER</text>
  <rect x="480" y="84" width="150" height="50" rx="6" fill="#0a1a25" stroke="#00d4ff30" stroke-width="1"/>
  <text x="555" y="105" font-family="'Courier New', monospace" font-size="10" fill="#7dd4ff" text-anchor="middle">Express 5 API</text>
  <text x="555" y="121" font-family="'Courier New', monospace" font-size="8" fill="#5daacc" text-anchor="middle" opacity="0.7">JWT · CORS · Cookie-parser</text>
  <rect x="480" y="146" width="150" height="36" rx="6" fill="#0a1a25" stroke="#00d4ff30" stroke-width="1"/>
  <text x="555" y="163" font-family="'Courier New', monospace" font-size="9" fill="#7dd4ff" text-anchor="middle">Execution Engine</text>
  <text x="555" y="177" font-family="'Courier New', monospace" font-size="8" fill="#5daacc" text-anchor="middle" opacity="0.6">child_process sandbox</text>
  <rect x="480" y="194" width="150" height="36" rx="6" fill="#0a1a25" stroke="#00d4ff30" stroke-width="1"/>
  <text x="555" y="211" font-family="'Courier New', monospace" font-size="9" fill="#7dd4ff" text-anchor="middle">Groq AI Chatbot</text>
  <text x="555" y="225" font-family="'Courier New', monospace" font-size="8" fill="#5daacc" text-anchor="middle" opacity="0.6">LLaMA 3.1 8B Instant</text>

  <!-- Arrows: Vercel -> Render -->
  <line x1="377" y1="155" x2="461" y2="155" stroke="#00d4ff60" stroke-width="1.5" marker-end="url(#arrow2)"/>
  <text x="419" y="147" font-family="'Courier New', monospace" font-size="7" fill="#00d4ff" text-anchor="middle" opacity="0.7">REST API</text>
  <line x1="461" y1="172" x2="377" y2="172" stroke="#00d4ff40" stroke-width="1" marker-end="url(#arrow2)" stroke-dasharray="3,2"/>
  <text x="419" y="188" font-family="'Courier New', monospace" font-size="7" fill="#00d4ff" text-anchor="middle" opacity="0.5">JSON response</text>

  <!-- MongoDB -->
  <rect x="735" y="90" width="140" height="70" rx="8" fill="#0a2010" stroke="#47a24840" stroke-width="1"/>
  <text x="805" y="118" font-family="'Courier New', monospace" font-size="20" fill="#47a248" text-anchor="middle">&#11041;</text>
  <text x="805" y="140" font-family="'Courier New', monospace" font-size="10" fill="#7dcc7d" text-anchor="middle">MongoDB Atlas</text>
  <text x="805" y="154" font-family="'Courier New', monospace" font-size="8" fill="#5daa5d" text-anchor="middle" opacity="0.7">AWS Cloud · Mongoose</text>

  <!-- Groq -->
  <rect x="735" y="195" width="140" height="60" rx="8" fill="#1a0a25" stroke="#a855f740" stroke-width="1"/>
  <text x="805" y="222" font-family="'Courier New', monospace" font-size="20" fill="#a855f7" text-anchor="middle">&#9672;</text>
  <text x="805" y="244" font-family="'Courier New', monospace" font-size="10" fill="#c084fc" text-anchor="middle">Groq API</text>

  <!-- Render -> external services -->
  <line x1="645" y1="125" x2="731" y2="125" stroke="#47a24860" stroke-width="1.5" marker-end="url(#arrow3)" stroke-dasharray="3,2"/>
  <line x1="645" y1="220" x2="731" y2="225" stroke="#a855f760" stroke-width="1.5" marker-end="url(#arrow3)" stroke-dasharray="3,2"/>

  <!-- Legend -->
  <line x1="50" y1="315" x2="80" y2="315" stroke="#00ff8860" stroke-width="1.5"/>
  <text x="86" y="319" font-family="'Courier New', monospace" font-size="8" fill="#00ff88" opacity="0.7">Frontend</text>
  <line x1="170" y1="315" x2="200" y2="315" stroke="#00d4ff60" stroke-width="1.5"/>
  <text x="206" y="319" font-family="'Courier New', monospace" font-size="8" fill="#00d4ff" opacity="0.7">API calls</text>
  <line x1="280" y1="315" x2="310" y2="315" stroke="#a855f760" stroke-width="1.5" stroke-dasharray="3,2"/>
  <text x="316" y="319" font-family="'Courier New', monospace" font-size="8" fill="#a855f7" opacity="0.7">External services</text>
</svg>

</div>

---

## ⚙️ Code Execution Flow

<div align="center">

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 130" width="900">
  <defs>
    <linearGradient id="flowbg" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#050d0a"/>
      <stop offset="100%" style="stop-color:#060f0b"/>
    </linearGradient>
    <marker id="farrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#00ff8890"/>
    </marker>
  </defs>
  <rect width="900" height="130" fill="url(#flowbg)" rx="12"/>

  <rect x="20" y="35" width="115" height="56" rx="7" fill="#0d2018" stroke="#00ff8840" stroke-width="1"/>
  <text x="77" y="58" font-family="'Courier New', monospace" font-size="9" fill="#00ff88" text-anchor="middle" opacity="0.5">01</text>
  <text x="77" y="72" font-family="'Courier New', monospace" font-size="9" fill="#7dffbb" text-anchor="middle">User writes</text>
  <text x="77" y="84" font-family="'Courier New', monospace" font-size="9" fill="#7dffbb" text-anchor="middle">code → Submit</text>

  <line x1="137" y1="63" x2="157" y2="63" stroke="#00ff8880" stroke-width="1.5" marker-end="url(#farrow)"/>

  <rect x="159" y="35" width="125" height="56" rx="7" fill="#0d2018" stroke="#00ff8840" stroke-width="1"/>
  <text x="221" y="58" font-family="'Courier New', monospace" font-size="9" fill="#00ff88" text-anchor="middle" opacity="0.5">02</text>
  <text x="221" y="72" font-family="'Courier New', monospace" font-size="9" fill="#7dffbb" text-anchor="middle">Wrap in template</text>
  <text x="221" y="84" font-family="'Courier New', monospace" font-size="9" fill="#7dffbb" text-anchor="middle">Write unique temp</text>

  <line x1="286" y1="63" x2="306" y2="63" stroke="#00ff8880" stroke-width="1.5" marker-end="url(#farrow)"/>

  <rect x="308" y="35" width="135" height="56" rx="7" fill="#0d2018" stroke="#00d4ff40" stroke-width="1"/>
  <text x="375" y="58" font-family="'Courier New', monospace" font-size="9" fill="#00d4ff" text-anchor="middle" opacity="0.5">03</text>
  <text x="375" y="72" font-family="'Courier New', monospace" font-size="9" fill="#7dd4ff" text-anchor="middle">execSync isolated</text>
  <text x="375" y="84" font-family="'Courier New', monospace" font-size="9" fill="#7dd4ff" text-anchor="middle">9s timeout guard</text>

  <line x1="445" y1="63" x2="465" y2="63" stroke="#00ff8880" stroke-width="1.5" marker-end="url(#farrow)"/>

  <rect x="467" y="35" width="135" height="56" rx="7" fill="#0d2018" stroke="#00d4ff40" stroke-width="1"/>
  <text x="534" y="58" font-family="'Courier New', monospace" font-size="9" fill="#00d4ff" text-anchor="middle" opacity="0.5">04</text>
  <text x="534" y="72" font-family="'Courier New', monospace" font-size="9" fill="#7dd4ff" text-anchor="middle">Compare output</text>
  <text x="534" y="84" font-family="'Courier New', monospace" font-size="9" fill="#7dd4ff" text-anchor="middle">vs all test cases</text>

  <line x1="604" y1="63" x2="624" y2="63" stroke="#00ff8880" stroke-width="1.5" marker-end="url(#farrow)"/>

  <rect x="626" y="35" width="120" height="56" rx="7" fill="#0d2018" stroke="#a855f740" stroke-width="1"/>
  <text x="686" y="58" font-family="'Courier New', monospace" font-size="9" fill="#a855f7" text-anchor="middle" opacity="0.5">05</text>
  <text x="686" y="72" font-family="'Courier New', monospace" font-size="9" fill="#c084fc" text-anchor="middle">Verdict + stats</text>
  <text x="686" y="84" font-family="'Courier New', monospace" font-size="9" fill="#c084fc" text-anchor="middle">saved to DB</text>

  <line x1="748" y1="63" x2="768" y2="63" stroke="#00ff8880" stroke-width="1.5" marker-end="url(#farrow)"/>

  <rect x="770" y="35" width="110" height="56" rx="7" fill="#0a2010" stroke="#00ff8870" stroke-width="1.5"/>
  <text x="825" y="58" font-family="'Courier New', monospace" font-size="9" fill="#00ff88" text-anchor="middle" opacity="0.5">06</text>
  <text x="825" y="72" font-family="'Courier New', monospace" font-size="11" fill="#00ff88" text-anchor="middle" font-weight="bold">&#10003; Accepted</text>
  <text x="825" y="84" font-family="'Courier New', monospace" font-size="8" fill="#7dffbb" text-anchor="middle" opacity="0.7">or &#10007; Wrong Ans</text>

  <text x="450" y="115" font-family="'Courier New', monospace" font-size="8" fill="#5dcc88" text-anchor="middle" opacity="0.5">Temp file deleted after each run · No server env exposed · Concurrent-safe unique filenames</text>
</svg>

</div>

---

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/your-username/CodeScale.git
cd CodeScale

# Setup backend
cd backend
npm install
cp config/.env.example config/.env   # then fill in your values
npm run dev                           # → http://localhost:3000

# Setup frontend (new terminal)
cd ../frontend
npm install
npm run dev                           # → http://localhost:5173
```

**Backend `.env` keys:**

```env
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>
JWT_SECRET_USER=your_long_random_secret
JWT_SECRET_ADMIN=your_admin_secret
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_CODE=your_admin_code
GROQ_API_KEY=gsk_xxxxxxxxxxxx
FRONTEND_URL=http://localhost:5173
```

---

## 🗂️ Project Structure

```
CodeScale/
├── backend/
│   ├── config/            # DB connection + env setup
│   ├── controllers/       # auth · problems · submission · chatbot · analytics
│   ├── middleware/         # JWT auth guard · admin guard
│   ├── models/            # User · Problem · Submission schemas
│   ├── routes/            # Express route definitions
│   ├── services/
│   │   └── executionEngine.js   ← ✨ The sandboxed code runner
│   ├── utils/             # Code templates · stats helpers
│   └── server.js
└── frontend/
    └── src/
        ├── pages/         # Home · Problems · Editor · Dashboard · Auth
        ├── components/
        │   ├── codeEditor/      # Monaco + Run + Submit + DryRun
        │   ├── chatbot/         # AI assistant UI
        │   └── charts/          # Dashboard visualizations
        ├── hooks/               # Custom React hooks
        ├── services/            # API call functions
        └── context/             # Global state (ProblemContext)
```

---

## 🔌 API Reference

<div align="center">

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 296" width="900">
  <defs>
    <linearGradient id="apibg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#050d0a"/>
      <stop offset="100%" style="stop-color:#060f0b"/>
    </linearGradient>
  </defs>
  <rect width="900" height="296" fill="url(#apibg)" rx="12"/>

  <text x="450" y="26" font-family="'Courier New', monospace" font-size="11" fill="#00ff88" text-anchor="middle" letter-spacing="4" opacity="0.7">API ENDPOINTS  ·  /api/v1/</text>

  <!-- Table header -->
  <rect x="20" y="35" width="860" height="22" rx="4" fill="#0d2018"/>
  <text x="60" y="50" font-family="'Courier New', monospace" font-size="9" fill="#00ff88" opacity="0.6">METHOD</text>
  <text x="165" y="50" font-family="'Courier New', monospace" font-size="9" fill="#00ff88" opacity="0.6">ENDPOINT</text>
  <text x="435" y="50" font-family="'Courier New', monospace" font-size="9" fill="#00ff88" opacity="0.6">DESCRIPTION</text>
  <text x="755" y="50" font-family="'Courier New', monospace" font-size="9" fill="#00ff88" opacity="0.6">AUTH</text>

  <!-- Auth section -->
  <text x="30" y="72" font-family="'Courier New', monospace" font-size="8" fill="#00ff88" opacity="0.35">── AUTH ─────────────────────────────────────────────────────────────────────────────────────────────</text>
  <rect x="35" y="78" width="55" height="14" rx="3" fill="#22c55e20"/>
  <text x="62" y="89" font-family="'Courier New', monospace" font-size="8" fill="#22c55e" text-anchor="middle">POST</text>
  <text x="165" y="89" font-family="'Courier New', monospace" font-size="8" fill="#7dd4ff">/auth/signup</text>
  <text x="435" y="89" font-family="'Courier New', monospace" font-size="8" fill="#aaaaaa">Register new user</text>
  <text x="755" y="89" font-family="'Courier New', monospace" font-size="8" fill="#555555">Public</text>

  <rect x="35" y="95" width="55" height="14" rx="3" fill="#22c55e20"/>
  <text x="62" y="106" font-family="'Courier New', monospace" font-size="8" fill="#22c55e" text-anchor="middle">POST</text>
  <text x="165" y="106" font-family="'Courier New', monospace" font-size="8" fill="#7dd4ff">/auth/signin</text>
  <text x="435" y="106" font-family="'Courier New', monospace" font-size="8" fill="#aaaaaa">Login and receive JWT cookie</text>
  <text x="755" y="106" font-family="'Courier New', monospace" font-size="8" fill="#555555">Public</text>

  <!-- Problems section -->
  <text x="30" y="124" font-family="'Courier New', monospace" font-size="8" fill="#00d4ff" opacity="0.35">── PROBLEMS ──────────────────────────────────────────────────────────────────────────────────────────</text>
  <rect x="35" y="130" width="42" height="14" rx="3" fill="#3b82f620"/>
  <text x="56" y="141" font-family="'Courier New', monospace" font-size="8" fill="#3b82f6" text-anchor="middle">GET</text>
  <text x="165" y="141" font-family="'Courier New', monospace" font-size="8" fill="#7dd4ff">/problems/</text>
  <text x="435" y="141" font-family="'Courier New', monospace" font-size="8" fill="#aaaaaa">Fetch all problems</text>
  <text x="755" y="141" font-family="'Courier New', monospace" font-size="8" fill="#00ff8870">&#x1F512; Required</text>

  <rect x="35" y="147" width="42" height="14" rx="3" fill="#3b82f620"/>
  <text x="56" y="158" font-family="'Courier New', monospace" font-size="8" fill="#3b82f6" text-anchor="middle">GET</text>
  <text x="165" y="158" font-family="'Courier New', monospace" font-size="8" fill="#7dd4ff">/problems/:id</text>
  <text x="435" y="158" font-family="'Courier New', monospace" font-size="8" fill="#aaaaaa">Single problem + test cases</text>
  <text x="755" y="158" font-family="'Courier New', monospace" font-size="8" fill="#00ff8870">&#x1F512; Required</text>

  <!-- Submission section -->
  <text x="30" y="176" font-family="'Courier New', monospace" font-size="8" fill="#a855f7" opacity="0.35">── SUBMISSION ────────────────────────────────────────────────────────────────────────────────────────</text>
  <rect x="35" y="182" width="55" height="14" rx="3" fill="#22c55e20"/>
  <text x="62" y="193" font-family="'Courier New', monospace" font-size="8" fill="#22c55e" text-anchor="middle">POST</text>
  <text x="165" y="193" font-family="'Courier New', monospace" font-size="8" fill="#7dd4ff">/submission/run</text>
  <text x="435" y="193" font-family="'Courier New', monospace" font-size="8" fill="#aaaaaa">Run against sample cases only</text>
  <text x="755" y="193" font-family="'Courier New', monospace" font-size="8" fill="#00ff8870">&#x1F512; Required</text>

  <rect x="35" y="198" width="55" height="14" rx="3" fill="#22c55e20"/>
  <text x="62" y="209" font-family="'Courier New', monospace" font-size="8" fill="#22c55e" text-anchor="middle">POST</text>
  <text x="165" y="209" font-family="'Courier New', monospace" font-size="8" fill="#7dd4ff">/submission/submit</text>
  <text x="435" y="209" font-family="'Courier New', monospace" font-size="8" fill="#aaaaaa">Judge against all hidden test cases</text>
  <text x="755" y="209" font-family="'Courier New', monospace" font-size="8" fill="#00ff8870">&#x1F512; Required</text>

  <!-- Other section -->
  <text x="30" y="227" font-family="'Courier New', monospace" font-size="8" fill="#f59e0b" opacity="0.35">── ANALYTICS · USER · CHATBOT · ADMIN ───────────────────────────────────────────────────────────────</text>
  <rect x="35" y="233" width="42" height="14" rx="3" fill="#3b82f620"/>
  <text x="56" y="244" font-family="'Courier New', monospace" font-size="8" fill="#3b82f6" text-anchor="middle">GET</text>
  <text x="165" y="244" font-family="'Courier New', monospace" font-size="8" fill="#7dd4ff">/analytics/dashboard</text>
  <text x="435" y="244" font-family="'Courier New', monospace" font-size="8" fill="#aaaaaa">Points, streak, heatmap data</text>
  <text x="755" y="244" font-family="'Courier New', monospace" font-size="8" fill="#00ff8870">&#x1F512; Required</text>

  <rect x="35" y="249" width="55" height="14" rx="3" fill="#22c55e20"/>
  <text x="62" y="260" font-family="'Courier New', monospace" font-size="8" fill="#22c55e" text-anchor="middle">POST</text>
  <text x="165" y="260" font-family="'Courier New', monospace" font-size="8" fill="#7dd4ff">/chatbot/ask</text>
  <text x="435" y="260" font-family="'Courier New', monospace" font-size="8" fill="#aaaaaa">AI assistant query (DSA only)</text>
  <text x="755" y="260" font-family="'Courier New', monospace" font-size="8" fill="#00ff8870">&#x1F512; Required</text>

  <rect x="35" y="265" width="55" height="14" rx="3" fill="#22c55e20"/>
  <text x="62" y="276" font-family="'Courier New', monospace" font-size="8" fill="#22c55e" text-anchor="middle">POST</text>
  <text x="165" y="276" font-family="'Courier New', monospace" font-size="8" fill="#7dd4ff">/admin/problem</text>
  <text x="435" y="276" font-family="'Courier New', monospace" font-size="8" fill="#aaaaaa">Add a new problem to platform</text>
  <text x="755" y="276" font-family="'Courier New', monospace" font-size="8" fill="#ef444470">&#x1F6E1; Admin only</text>
</svg>

</div>

---

## 🛠️ Tech Stack

<div align="center">

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 140" width="900">
  <defs>
    <linearGradient id="stackbg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#050d0a"/>
      <stop offset="100%" style="stop-color:#060f0b"/>
    </linearGradient>
  </defs>
  <rect width="900" height="140" fill="url(#stackbg)" rx="12"/>

  <!-- Frontend group -->
  <rect x="18" y="18" width="410" height="108" rx="8" fill="#0a1a12" stroke="#00ff8825" stroke-width="1"/>
  <text x="28" y="35" font-family="'Courier New', monospace" font-size="8" fill="#00ff88" letter-spacing="3" opacity="0.6">FRONTEND → VERCEL</text>

  <rect x="28" y="42" width="68" height="18" rx="9" fill="#61dafb15" stroke="#61dafb30" stroke-width="0.5"/>
  <text x="62" y="54" font-family="'Courier New', monospace" font-size="8" fill="#61dafb" text-anchor="middle">React 19</text>
  <rect x="104" y="42" width="48" height="18" rx="9" fill="#646cff15" stroke="#646cff30" stroke-width="0.5"/>
  <text x="128" y="54" font-family="'Courier New', monospace" font-size="8" fill="#8888ff" text-anchor="middle">Vite 8</text>
  <rect x="160" y="42" width="80" height="18" rx="9" fill="#38bdf815" stroke="#38bdf830" stroke-width="0.5"/>
  <text x="200" y="54" font-family="'Courier New', monospace" font-size="8" fill="#7dd3fc" text-anchor="middle">Tailwind 4</text>
  <rect x="248" y="42" width="82" height="18" rx="9" fill="#f59e0b15" stroke="#f59e0b30" stroke-width="0.5"/>
  <text x="289" y="54" font-family="'Courier New', monospace" font-size="8" fill="#fcd34d" text-anchor="middle">Framer Motion</text>
  <rect x="338" y="42" width="80" height="18" rx="9" fill="#0078d415" stroke="#0078d430" stroke-width="0.5"/>
  <text x="378" y="54" font-family="'Courier New', monospace" font-size="8" fill="#60aaee" text-anchor="middle">Monaco Editor</text>

  <rect x="28" y="68" width="95" height="18" rx="9" fill="#ffffff10" stroke="#ffffff20" stroke-width="0.5"/>
  <text x="75" y="80" font-family="'Courier New', monospace" font-size="8" fill="#cccccc" text-anchor="middle">sketch-canvas</text>
  <rect x="131" y="68" width="85" height="18" rx="9" fill="#61dafb10" stroke="#61dafb20" stroke-width="0.5"/>
  <text x="173" y="80" font-family="'Courier New', monospace" font-size="8" fill="#61dafb" text-anchor="middle">React Router 7</text>
  <rect x="224" y="68" width="50" height="18" rx="9" fill="#f7df1e15" stroke="#f7df1e30" stroke-width="0.5"/>
  <text x="249" y="80" font-family="'Courier New', monospace" font-size="8" fill="#f7df1e" text-anchor="middle">Axios</text>
  <rect x="282" y="68" width="88" height="18" rx="9" fill="#ffffff08" stroke="#ffffff15" stroke-width="0.5"/>
  <text x="326" y="80" font-family="'Courier New', monospace" font-size="8" fill="#aaaaaa" text-anchor="middle">Context API</text>

  <rect x="28" y="94" width="60" height="18" rx="9" fill="#f7df1e15" stroke="#f7df1e30" stroke-width="0.5"/>
  <text x="58" y="106" font-family="'Courier New', monospace" font-size="8" fill="#f7df1e" text-anchor="middle">JavaScript</text>
  <rect x="96" y="94" width="50" height="18" rx="9" fill="#ffffff10" stroke="#ffffff20" stroke-width="0.5"/>
  <text x="121" y="106" font-family="'Courier New', monospace" font-size="8" fill="#aaaaaa" text-anchor="middle">Recharts</text>

  <!-- Backend group -->
  <rect x="446" y="18" width="436" height="108" rx="8" fill="#0a1520" stroke="#00d4ff25" stroke-width="1"/>
  <text x="456" y="35" font-family="'Courier New', monospace" font-size="8" fill="#00d4ff" letter-spacing="3" opacity="0.6">BACKEND → RENDER</text>

  <rect x="456" y="42" width="62" height="18" rx="9" fill="#33993315" stroke="#33993330" stroke-width="0.5"/>
  <text x="487" y="54" font-family="'Courier New', monospace" font-size="8" fill="#66cc44" text-anchor="middle">Node.js</text>
  <rect x="526" y="42" width="72" height="18" rx="9" fill="#00000030" stroke="#ffffff20" stroke-width="0.5"/>
  <text x="562" y="54" font-family="'Courier New', monospace" font-size="8" fill="#cccccc" text-anchor="middle">Express 5</text>
  <rect x="606" y="42" width="78" height="18" rx="9" fill="#47a24815" stroke="#47a24830" stroke-width="0.5"/>
  <text x="645" y="54" font-family="'Courier New', monospace" font-size="8" fill="#7dcc7d" text-anchor="middle">MongoDB Atlas</text>
  <rect x="692" y="42" width="72" height="18" rx="9" fill="#47a24810" stroke="#47a24825" stroke-width="0.5"/>
  <text x="728" y="54" font-family="'Courier New', monospace" font-size="8" fill="#7dcc7d" text-anchor="middle">Mongoose</text>
  <rect x="772" y="42" width="40" height="18" rx="9" fill="#f59e0b10" stroke="#f59e0b25" stroke-width="0.5"/>
  <text x="792" y="54" font-family="'Courier New', monospace" font-size="8" fill="#fcd34d" text-anchor="middle">Zod</text>

  <rect x="456" y="68" width="50" height="18" rx="9" fill="#ffffff10" stroke="#ffffff20" stroke-width="0.5"/>
  <text x="481" y="80" font-family="'Courier New', monospace" font-size="8" fill="#cccccc" text-anchor="middle">JWT</text>
  <rect x="514" y="68" width="55" height="18" rx="9" fill="#ffffff08" stroke="#ffffff15" stroke-width="0.5"/>
  <text x="541" y="80" font-family="'Courier New', monospace" font-size="8" fill="#aaaaaa" text-anchor="middle">bcrypt</text>
  <rect x="577" y="68" width="75" height="18" rx="9" fill="#a855f715" stroke="#a855f730" stroke-width="0.5"/>
  <text x="614" y="80" font-family="'Courier New', monospace" font-size="8" fill="#c084fc" text-anchor="middle">Groq SDK</text>
  <rect x="660" y="68" width="92" height="18" rx="9" fill="#3b82f615" stroke="#3b82f630" stroke-width="0.5"/>
  <text x="706" y="80" font-family="'Courier New', monospace" font-size="8" fill="#7dd4ff" text-anchor="middle">LLaMA 3.1 8B</text>
  <rect x="760" y="68" width="55" height="18" rx="9" fill="#ef444410" stroke="#ef444425" stroke-width="0.5"/>
  <text x="787" y="80" font-family="'Courier New', monospace" font-size="8" fill="#ff8888" text-anchor="middle">nodemon</text>

  <rect x="456" y="94" width="100" height="18" rx="9" fill="#00ff8810" stroke="#00ff8825" stroke-width="0.5"/>
  <text x="506" y="106" font-family="'Courier New', monospace" font-size="8" fill="#7dffbb" text-anchor="middle">child_process</text>
  <rect x="564" y="94" width="82" height="18" rx="9" fill="#ffffff08" stroke="#ffffff15" stroke-width="0.5"/>
  <text x="605" y="106" font-family="'Courier New', monospace" font-size="8" fill="#aaaaaa" text-anchor="middle">cookie-parser</text>
  <rect x="654" y="94" width="45" height="18" rx="9" fill="#ffffff08" stroke="#ffffff15" stroke-width="0.5"/>
  <text x="676" y="106" font-family="'Courier New', monospace" font-size="8" fill="#aaaaaa" text-anchor="middle">CORS</text>
</svg>

</div>

---

## 🌐 Deployment

| | **Frontend** | **Backend** |
|---|---|---|
| **Platform** | Vercel | Render |
| **Live URL** | [code-scale.vercel.app](https://code-scale.vercel.app) | Render Web Service |
| **Branch** | `main` | `main` |
| **Build** | `vite build` | `npm install` |
| **Start** | _(static)_ | `node server.js` |

> Set all variables from `.env.example` in your Render **Environment** dashboard. Never commit your `.env` file.

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feat/your-idea`
3. Commit: `git commit -m "feat: add something cool"`
4. Push + open a Pull Request

---

<div align="center">

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 80" width="900">
  <defs>
    <linearGradient id="footerbg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#050d0a"/>
      <stop offset="100%" style="stop-color:#060f0b"/>
    </linearGradient>
    <linearGradient id="footerGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#00ff88;stop-opacity:0"/>
      <stop offset="50%" style="stop-color:#00ff88;stop-opacity:0.5"/>
      <stop offset="100%" style="stop-color:#00ff88;stop-opacity:0"/>
    </linearGradient>
  </defs>
  <rect width="900" height="80" fill="url(#footerbg)" rx="12"/>
  <rect x="0" y="0" width="900" height="1" fill="url(#footerGlow)"/>
  <text x="450" y="32" font-family="'Courier New', monospace" font-size="13" fill="#ffffff" text-anchor="middle" opacity="0.9">Built with &#10084;&#65039; by <tspan fill="#00ff88" font-weight="bold">Ritesh Rana</tspan></text>
  <text x="450" y="52" font-family="'Courier New', monospace" font-size="9" fill="#7dffbb" text-anchor="middle" opacity="0.5">If this helped you, drop a &#11088; — it means the world</text>
  <text x="450" y="68" font-family="'Courier New', monospace" font-size="8" fill="#00ff88" text-anchor="middle" opacity="0.3">&gt;_ CodeScale · Code. Execute. Improve.</text>
</svg>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ritesh_Rana-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/your-profile)
&nbsp;
[![GitHub](https://img.shields.io/badge/GitHub-your--username-181717?style=flat-square&logo=github)](https://github.com/your-username)
&nbsp;
[![Live](https://img.shields.io/badge/⚡_Try_CodeScale-00ff88?style=flat-square)](https://code-scale.vercel.app)

</div>
