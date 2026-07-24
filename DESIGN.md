# Chess Tournament Management System - Product & Technical Design Specification

## 1. Feature Breakdown & User Stories

### Feature Breakdown
1. **Player Management**: CRUD operations for players (View, Add, Edit, Delete).
2. **Tournament Management**: Create new tournaments, track status, add players.
3. **Registration Flow**: Smooth UI to move players from an available pool to the active tournament pool.
4. **Matchmaking (Random Pairings)**: Algorithmic generation of matches to randomize pairings.
5. **Match Control & Bracket tracking**: High-fidelity views of active brackets/matches. Quickly advance rounds by marking winners.
6. **Leaderboards & Statistics**: Standings based on match performance, showcasing Top 3 (Gold/Silver/Bronze) visually.
7. **Dashboard Analytics**: Top-level snapshot showing system metrics and a timeline activity feed.
8. **System Settings**: Application configuration (Database resets, Theme toggling).

### User Stories
- As a **Tournament Director**, I want to see a high-level dashboard so I can assess current tournament progress at a glance.
- As a **Tournament Director**, I want to easily add and search for players so that I can quickly register them for an upcoming event.
- As a **Tournament Director**, I want to start a tournament and have the system automatically pair players so I don't have to manually figure out brackets.
- As a **Tournament Director**, I want to easily mark match winners and have the bracket advance automatically to save time.
- As a **Player**, I want to view the professional rankings page so I can see my current standing, tier, and statistics.

---

## 2. Navigation Flow & Routing Structure

### Routing Structure (SvelteKit / Svelte Router)
```text
/                   (Dashboard - Overview of everything)
/players            (Players Page - Roster management)
/players/[id]       (Player Profile - Stats for an individual)
/tournaments        (Tournament Hub)
/tournaments/new    (Tournament Creation Wizard)
/tournaments/[id]   (Active Tournament & Match Page)
/rankings           (Rankings & Leaderboards)
/settings           (System Settings)
```

### Navigation Flow
- **Sidebar Navigation**: Fixed left-side navigation containing links to Dashboard, Players, Tournaments, Rankings, and Settings. Minimalist geometric icons (e.g., Lucide).
- **Global Header**: Contains breadcrumbs representing the current view, an active tournament quick-status pill, and a User/Admin profile avatar.

*Why?* A persistent sidebar with clear, flat routing structure reduces mental fatigue, allowing operators to rapidly context-switch—this layout is an established hallmark of premium SaaS applications.

---

## 3. Screen-by-Screen UI Description

### 1. Dashboard
- **Top Row**: 4 glassmorphic metric cards (Total Players, Active Tournaments, Completed Matches, System Uptime/Events).
- **Middle Left**: "Recent Activity" feed—a vertical timeline (e.g., "Alice defeated Bob", "Winter Open has concluded").
- **Middle Right**: "Champion Card"—featuring the highest-ranked player with an avatar, a glowing gold gradient ring, and key lifetime stats (Wins, Win Rate).
- **Bottom**: Quick action buttons ("Quick Start Tournament", "Add Player") with smooth hover expansion effects.
*Why?* Dashboards must immediately answer "What is the current state?" and "What should I do next?" without overwhelming the user with deep data tables.

### 2. Players Page
- **Header**: Search bar with real-time keystroke filtering, "Filter" dropdown (by rank, status), and a primary CTA "Add Player" button.
- **Content**: A responsive CSS Grid of **Player Profile Cards**.
  - *Cards*: Deep rounded borders (12px), subtle hover lift (`translate-y-1`, shadow expand), circular avatar, bold name, Elo/Rating badge, and an options menu (`...`) for Edit/Delete.
*Why?* Utilizing cards for the roster feels incredibly tactile, shifting the vibe from "database management" to "athlete management".

### 3. Tournament Page
- **Empty State**: Beautiful illustration (maybe abstract chess pieces) with a primary "Create First Tournament" CTA.
- **Active State**: Step-progress bar (Configuring -> Registration -> In Progress -> Completed).
- **Registration Phase**: Interactive drag-and-drop or a Dual-listbox to shuttle players from "Available Roster" to "Tournament Entries".
*Why?* Clearly visualizing tournament phases ensures operators don't make sequential errors, such as generating matches for a tournament with no players.

### 4. Match Page (Active Tournament)
- **Top**: Round tabs/selector and a timeline of tournament advancement.
- **Center Board**: A horizontally panning tournament bracket (if elimination style), or a round-by-round vertical card list (if Swiss or purely random rounds).
- **Match Cards**: "VS cards" representing Player A vs Player B. Matches currently awaiting a result have a pulsing colored border. Clicking the card opens a quick-action modal or inline buttons to declare the winner.
*Why?* The bracket/match-board is the core workflow interface. Smooth interactions ensure the director can easily navigate complex matches in heated environments.

### 5. Ranking Page
- **Podium Banner**: The top 3 players represented visually as Gold, Silver, and Bronze pedestals/avatars.
- **List/Table**: A beautifully spaced, minimalist table format mapping out players 4 through N. Columns include Rank, Player Info, Points, Win Rate, and a tiny 'Last 5 matches' visual (sparkline or color dots: W/W/L/W).
*Why?* Gamification. Visual tiering adds excitement. Providing trend contexts (W/L dots) makes data instantly readable.

### 6. Settings Page
- **Sections**: Tabbed side-interface (Appearance, Data Management, About).
- **Toggles**: Smooth iOS-style toggle switches for "Dark Mode" override.
- **Danger Zone**: "Reset Database" inside a red-tinted, heavily blurred glass card requiring a typing confirmation (e.g., "type RESET to wipe data").
*Why?* Destructive actions must be clearly segregated and protected to avoid accidental catastrophic data loss.

---

## 4. UI/UX Design System (The Premium SaaS Look)

### Typography
- **Primary Font**: *Inter* or *Geist* for micro-copy and data (hyper-legible, modern sans-serif).
- **Heading Font**: *Cal Sans* or *Outfit* for Headings (provides a punchy, modern startup aesthetic).
- **Hierarchy**: Strict use of size and weight (e.g., Page Title: 24px SemiBold, Body: 14px Regular, Subtext: 12px Medium).

### Color Palette (Vibrant Dark Theme)
- **Background**: `#09090B` (Zinc-950) - Deep, rich black for the app canvas.
- **Surface**: `#18181B` (Zinc-900) - Slightly elevated tone for cards and sidebars.
- **Primary Accent**: `#6366F1` (Indigo-500) - A vibrant, professional blurple for primary buttons and active states.
- **Success**: `#22C55E` (Green-500) - For winners, positive stats, completed indicators.
- **Danger**: `#EF4444` (Red-500) - Destructive actions and losses.
- **Text Layers**: `#FAFAFA` (Zinc-50, High contrast for primary text), `#A1A1AA` (Zinc-400, Muted text).

### Aesthetic Details & Textures
- **Glassmorphism**: Modals, dropdowns, and sticky headers use `backdrop-filter: blur(16px)` layered with a semi-transparent surface `rgba(24, 24, 27, 0.6)` and a delicate `1px` top border `rgba(255, 255, 255, 0.08)` to simulate glass edge reflections.
- **Borders & Radii**: All cards feature substantial corner rounding (`12px` or `16px`) avoiding harsh boxy interfaces. 
- **Shadows**: Accent elements use colored ambient drop shadows instead of plain black (e.g., the primary button drops an indigo shadow `box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4)`).
- **Animations (Svelte Transitions)**: Extensive use of Svelte's native transitons. Lists use `fade` and `flip`. Modals use `fly` (with `y: 15`). Transitions are snappy but smooth (`cubicOut` easing, ~250ms).

---

## 5. Technical Architecture (Svelte)

### Component Hierarchy
```text
App
 ├── AppLayout (Sidebar, Topbar)
 │    ├── NavigationMenu
 │    └── ActiveStatusBadge
 ├── Routes
 │    ├── DashboardRoute
 │    │    ├── DashboardMetricGrid
 │    │    ├── ActivityTimeline
 │    │    └── ChampionHighlightWidget
 │    ├── PlayersRoute
 │    │    ├── SearchFilterBar
 │    │    ├── PlayerGrid
 │    │    │    └── PlayerCard
 │    │    └── UpsertPlayerModal
 │    ├── TournamentsRoute
 │    │    ├── TournamentConfigurationForm
 │    │    ├── PoolSelector (Drag/Drop)
 │    │    └── MatchInterface
 │    │         ├── BracketView / RoundView
 │    │         └── MatchNode
 └── UI Core (Design System Base)
      ├── BaseButton
      ├── GlassCard
      ├── InputField
      ├── SvgIcon
      └── ToastProvider
```

### Folder Structure
```text
/src
  /assets         # Static images, SVG iconography, fonts
  /components     # Reusable logic-less components
    /ui           # Buttons, Cards, Badges, Inputs
    /patterns     # Complex reusable structures (Forms, Grid Layouts)
  /features       # Domain-specific implementation
    /players      # Player store, Player API, Player specific components
    /tournaments  # Matchmaking logic, Tournament stores
  /lib
    /utils        # Pure functions (date formatters, ID generators)
    /algorithms   # Bracket, Math, and Ranking functions isolated for testing
  /pages          # Svelte pages / SvelteKit routes
  /store          # Global Svelte stores holding state
  app.css         # Global tailwind/CSS, variable injections
```

---

## 6. Algorithms

### Random Pairing Algorithm
1. Retrieve an array of all registered players for the active tournament.
2. Ensure no players who have already played each other are matched consecutively (if tracking history), or strictly random if not.
3. Shuffle the array using the **Fisher-Yates (Knuth) shuffle algorithm** for cryptographic-quality randomness.
4. Iterate through the shuffled array, pairing players off by twos: `(Array[0], Array[1]), (Array[2], Array[3])`.
5. *Edge Case*: If the array length is odd, the final player (the remainder) receives a "Bye" (an automatic advancement) for that round.
*Why?* Fisher-Yates guarantees unbiased randomization in `O(N)` timeframe. Custom random functions are biased and unprofessional.

### Ranking Algorithm
- Implement a **Points-based evaluation metric**:
  - `Win` = 3 Points
  - `Draw`/`Bye` = 1 Point
  - `Loss` = 0 Points
- *Tie-breakers*: Calculate the "Strength of Schedule" (Buchholz system) by summing the final points of all opponents a tied player has faced. The player who faced harder opponents wins the tie.
*Why?* Elo can be overly complex for a generic dashboard or require high sample sizes. A Point + Buchholz system offers immediate intuitive clarity and fairness for self-contained tournaments.

---

## 7. Data Flow, State Management, and Database Schema

### Database Schema (Designed for JSON File / IndexedDB / LocalStorage or NoSQL)
- **Collection: `players`**
  - `id`: string (UUID4)
  - `name`: string
  - `seedRank`: number
  - `stats`: `{ wins: number, losses: number, totalPoints: number }`
  - `createdAt`: Date string
- **Collection: `tournaments`**
  - `id`: string
  - `name`: string
  - `status`: enum `(DRAFT | REGISTRATION | ACTIVE | COMPLETE)`
  - `participants`: Array<string> (Player IDs)
  - `structure`: enum `(ELIMINATION | SWISS)`
  - `rounds`: Array<Round>
- **Collection: `activity_logs`**
  - `id`: string
  - `message`: string (e.g. "Tournament X finalized")
  - `timestamp`: Date

### State Management Strategy
- Leverage Svelte's deeply integrated **Stores**.
- `playerStore` (writable): Central source of truth for the roster.
- `derivedRankings` (derived): Reactively listens to `playerStore`, applies the Ranking algorithm logic, and spits out a sorted Gold/Silver/Bronze ready array. No manual recalculation necessary.
- `tournamentStore` (writable): Holds the in-progress bracket.
- **Flow**: User clicks "Set Winner" `->` Component dispatches event `->` Function updates `tournamentStore` Match state `->` Function increments winner stats in `playerStore` `->` Svelte reactively updates the UI and `derivedRankings`.

---

## 8. UX States (Loading, Empty, Success, Validation, Errors)

### Loading States
- **Display**: Use **Skeleton Pages/Cards**. Shimmering gradient boxes resembling the layout of the eventual data (e.g., a circle skeleton for an avatar, bar skeletons for text). 
*Why?* Skeletons drastically reduce perceived wait time over a spinning wheel and prevent horrific UI jumps when data arrives.

### Empty States
- **Display**: Centered, muted, high-quality vector illustrations with deeply faded opacities. Contains a witty but polite subtext (e.g. "Silence in the hall. No tournaments have been created yet.") followed instantly by a glowing primary Call To Action.
*Why?* Never show an empty table. An empty state is the best place to educate the user on what to do next.

### Input Validation
- **Display**: Reactive inline validation. If a Tournament Name is required, the Submit button is visually dimmed and `disabled` until keystrokes satisfy the requirement.
*Why?* Submitting to find an error is frustrating. Validating reactively prevents mistakes from occurring at all.

### Form Errors / System Errors
- **Display**: Non-blocking **Toast Notifications** originating from the bottom center or bottom right. The design uses a blurred red glass background, entering smoothly via a slide-up animation, disappearing after 4s.

### Success & Feedback
- **Display**: Similar Toast Notifications, but styled with the `#22C55E` success color.
- *Micro-interactions*: When a winner is selected in a match, the winning player's half of the card pulses green for 300ms before solidifying, cementing the action visually.

---

## 9. Non-Functional Requirements & Checklists

### Accessibility (a11y) Improvements
- All icon-only buttons maintain strict `aria-label` tags.
- Tab navigation displays a clear, highly visible offset outline for power users.
- The color palette strictly adheres to WCAG AA contrast standard (e.g., high luminance Zinc-50 text on the Zinc-950 backgrounds).

### Mobile Responsiveness
- **Navigation**: Sidebar collapses into a mobile "Sheet" / Hamburger menu on viewports `< 768px`.
- **Match Views**: Traditional brackets fail on mobile. On smaller screens, the bracket cleanly collapses into an accordion-style vertical list of matches segmented by Round.
- **Grids**: Player grids flawlessly transition from 3/4 column setups down to a full-width 1 column setup on mobile.

### Performance Optimization Ideas
- **Store Splitting**: Keep stores modular rather than one monolithic state tree to prevent the entire app from re-rendering when one match changes.
- **Icon Treeshaking**: Only import the exact SVG icons needed (or use an optimized library) to keep bundle sizes negligible.
- **Virtual Scrolling**: If scaling to thousands of registered players, wrap the player list in a Svelte Virtual List component.

### Security Considerations (Frontend Context)
- **Sanitization**: Escape all player inputs before rendering to prevent client-side Cross-Site Scripting (XSS).
- **Data Integrity**: Assuming LocalStorage/IndexedDB data persistence, enforce a Zod/Yup schema validation on application boot. If the local storage is corrupted or manually manipulated, gracefully reset or handle it rather than letting the app crash.

### Testing Checklist
- [ ] **Logic Tests**: Ensure `fisherYatesRandomizer()` and `calculateTieBreakers()` possess 100% test coverage using Vitest, completely isolated from Svelte UI logic.
- [ ] **Component Tests**: Check that `PlayerCard.svelte` fires the correct edit/delete Svelte events without triggering the underlying routing link.
- [ ] **Integration/UI Tests**: Mock an entire tournament lifecycle from 4 players -> random pairing -> mock winners -> verify champion appears in ranking structure correctly.

### Deployment Checklist
- [ ] Compile production Svelte application (`npm run build`).
- [ ] Purge and minify CSS (automatically handled by toolchain like Vite).
- [ ] Validate that SPA fallback redirects are functional on the hosting provider (e.g. Netlify/Vercel handles `/players` routing cleanly to `index.html`).
- [ ] Run Lighthouse Audit against production URL; Address any Best Practice/A11Y scores below 95.
