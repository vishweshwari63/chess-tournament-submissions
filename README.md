# Chess Tournament Management System ♟️

A high-end, gamified E-Sports application designed for managing chess tournaments. Built to meet professional production standards, this platform offers tournament organizers and players a fully featured system with automated match simulation, data persistence, and a highly responsive, cyberpunk-inspired vibrant interface.

## 🌟 Key Features

- **Player Roster Management**: Complete CRUD operations for athletes, including seed ranking and real-time statistic tracking.
- **Tournament Orchestration**: Create tournaments, manage phases (Draft, Registration, Active, Complete), and register players via intuitive UI streams.
- **Automated Matchmaking**: Uses cryptographic-quality Fisher-Yates shuffle algorithms for unbiased pair generation and bracket progression.
- **Live Match Control**: High-fidelity views of active brackets. Quickly advance rounds by marking winners, resolving matches automatically or by manual director override.
- **Ranking & Leaderboards**: Points-based evaluation standing (Win = 3pts, Draw/Bye = 1pt). Tie-breakers calculated via the Buchholz (Strength of Schedule) system, featuring visually striking Podium displays.
- **Analytics Dashboard**: Snapshot of system metrics, completed matches, and an automated timeline activity feed.
- **Premium SaaS Aesthetic**: Deep glassmorphism, glowing accents, heavily interactive cards, and responsive state tracking powered by Tailwind and custom Svelte animations.

## 🖼️ Structure & Navigation

- `/` - **Dashboard**: Real-time overview of current events and live timeline.
- `/players` - **Athlete Management**: Searchable, filterable roster grid.
- `/tournaments` - **Tournament Hub**: Event creation, registration pools, and active match views.
- `/rankings` - **Leaderboards**: Professional tier standings and statistics.
- `/settings` - **System Configuration**: Danger zone controls and theme settings.

## 🛠️ Technology Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) (Svelte 5 Runes)
- **Styling**: Tailwind CSS v4 & custom Glassmorphism CSS layers
- **Icons**: Lucide Svelte
- **State Management**: Built-in Svelte Reactive Stores
- **Tooling**: Vite, Svelte-Check
- **Deployment**: Vercel ready via `@sveltejs/adapter-auto`

## 🚀 Getting Started Locally

Once you have cloned the project, install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
# or
npm run dev -- --open
```

## 📦 Building & Deploying

To create a production build of the application:

```bash
npm run build
```

The system is configured natively for seamless Vercel deployments. Ensure your Vercel deployment points to the correct branch containing this source code, and set the framework preset to `SvelteKit`.
