# Educational Game - Architecture & Code Structure Plan

Design a modular React-based architecture for an educational financial literacy game with map navigation and multiple independent minigames, optimized for parallel team development.

---

## TL;DR (Quick Summary)

**Architecture**: Modular plugin pattern - each minigame is a self-contained module that plugs into the main game

**Key principle**: **No direct dependencies between modules** - everyone works independently, communicates through shared interfaces

**Tech stack** (pending confirmation): React + TypeScript + Vite + Zustand

**Priority**: Get basic navigation working ASAP (simple clickable map → minigame pages)

**Team structure**:

- Michelle & Faith: Design + Usability Testing
- Max, Madhav, Stephenie, Duke: Programming + Testing

**Git workflow**: Everyone works on separate branches, creates PRs, gets code reviewed before merging

---

## Architecture Overview

### Design Pattern: **Modular Plugin Architecture**

The project follows a **Modular Monolith** pattern with **Plugin-based** minigames, enabling parallel development without conflicts.

#### Core Principles

1. **Clear Module Boundaries** - Each module (Map, Minigame 1-4, Shared Components) operates independently
2. **Interface Contracts** - All modules communicate through well-defined TypeScript interfaces
3. **Loose Coupling** - Modules depend on interfaces, not implementations
4. **Plugin Registry** - Minigames register themselves, Map consumes them via registry

#### Architectural Layers

```
┌──────────────────────────────────────────┐
│  Routing Layer         (pages/)          │  ← Navigation between Map/Minigames
├──────────────────────────────────────────┤
│  Presentation Layer    (components/)     │  ← Reusable UI components
├──────────────────────────────────────────┤
│  Business Logic Layer  (hooks/, utils/)  │  ← Game logic, calculations
├──────────────────────────────────────────┤
│  State Management      (store/)          │  ← Global game progress (Zustand)
├──────────────────────────────────────────┤
│  Type Contracts        (types/)          │  ← Interface definitions
└──────────────────────────────────────────┘
```

#### Modular Design Benefits

- ✅ **Parallel Development** - Team members work on separate modules simultaneously
- ✅ **Independent Testing** - Each minigame can be tested in isolation
- ✅ **Easy Integration** - New minigames plug in via interface contract
- ✅ **Minimal Conflicts** - Clear boundaries prevent merge conflicts
- ✅ **Scalable** - Add new levels without modifying existing code

---

## Technology Stack

| Technology                    | Purpose                                               |
| ----------------------------- | ----------------------------------------------------- |
| **React 18** + **TypeScript** | UI framework + type safety for team collaboration     |
| **Vite**                      | Fast dev environment with HMR                         |
| **React Router**              | Page navigation (Start → Map → Minigames)             |
| **Zustand**                   | Lightweight state management (progress, stars, coins) |
| **Framer Motion**             | Animations (optional, for polish)                     |

---

## Team Structure & Responsibilities

### Design & Testing Team

- **Michelle, Faith**
  - Figma design and prototyping
  - Usability testing
  - UI/UX feedback to programmers

### Development Team (Programmers)

- **Max, Madhav, Stephenie, Duke**
  - Convert Figma designs to React components
  - Implement business logic (game rules, calculations, etc.)
  - Write unit tests (automated testing to catch bugs)
  - Integrate modules (connect different parts together)

---

## Directory Structure

### TL;DR Structure Overview

```
edu-game/
├── src/
│   ├── types/           # Interface contracts (DEFINE FIRST)
│   ├── store/           # Global state (stars, coins, progress)
│   ├── components/      # Shared UI components
│   ├── pages/           # StartPage, MapPage, MinigamePage
│   ├── minigames/       # Independent minigame modules
│   │   ├── minigame1-scholarship/
│   │   ├── minigame2-budgeting/
│   │   ├── minigame3-saving/
│   │   ├── minigame4-investing/
│   │   └── index.ts     # Plugin registry
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Helper functions
│   └── assets/          # Images, fonts
└── config files (package.json, tsconfig.json, etc.)
```

### Detailed Structure

```
edu-game/
├── src/
│   ├── main.tsx                      # App entry point
│   ├── App.tsx                       # Root component + routing
│   │
│   ├── types/                        # 🔑 TYPE CONTRACTS (Define First!)
│   │   ├── game.types.ts             # GameState, LevelData, PlayerProgress
│   │   ├── minigame.types.ts         # MinigameProps, MinigameResult, MinigameConfig
│   │   └── index.ts                  # Re-export all types
│   │
│   ├── store/                        # 🌐 GLOBAL STATE
│   │   ├── gameStore.ts              # Zustand store: stars, coins, level progress
│   │   └── index.ts
│   │
│   ├── components/                   # 🧩 SHARED UI COMPONENTS
│   │   ├── common/                   # Generic reusable components
│   │   │   ├── Button/
│   │   │   ├── Modal/
│   │   │   └── ProgressBar/
│   │   │
│   │   ├── game-ui/                  # Game-specific shared components
│   │   │   ├── QuestionProgressBar/  # Question tracking (used by all minigames)
│   │   │   ├── LessonPreScreen/      # Pre-game instruction screen
│   │   │   ├── LessonPostScreen/     # Post-game summary (stars, coins)
│   │   │   ├── StarRating/           # Star display component
│   │   │   └── BackButton/           # Return to map button
│   │   │
│   │   └── layout/
│   │       └── GameLayout/           # Common layout wrapper
│   │
│   ├── pages/                        # 📄 PAGE ROUTES
│   │   ├── StartPage/                # Welcome screen
│   │   ├── MapPage/                  # 🗺️ Game map (YOU develop this)
│   │   │   ├── index.tsx
│   │   │   ├── components/           # Map-specific components
│   │   │   │   ├── LevelNode/        # Level icon on map
│   │   │   │   ├── PlayerMarker/     # Player position indicator
│   │   │   │   ├── LevelModal/       # Level detail popup
│   │   │   │   └── MapPath/          # Visual trail between levels
│   │   │   └── styles.css
│   │   │
│   │   └── MinigamePage/             # Minigame wrapper/loader page
│   │       └── index.tsx             # Loads appropriate minigame plugin
│   │
│   ├── minigames/                    # 🎮 MINIGAME PLUGINS (Independent Modules)
│   │   │
│   │   ├── README.md                 # Developer guide for creating minigames
│   │   │
│   │   ├── template/                 # Template for new minigames
│   │   │   ├── index.tsx
│   │   │   ├── components/
│   │   │   ├── data.ts
│   │   │   └── __tests__/
│   │   │
│   │   ├── minigame1-scholarship/    # Level 1: Scholarship Matching
│   │   │   ├── index.tsx             # Main entry point for this minigame
│   │   │   ├── components/           # UI pieces specific to this minigame
│   │   │   ├── data/                 # Game data (questions, characters, etc.)
│   │   │   ├── logic/                # Game rules and calculations
│   │   │   └── __tests__/            # Automated tests to verify correctness
│   │   │
│   │   ├── minigame2-budgeting/      # Level 2: Budget Planning
│   │   │   ├── index.tsx
│   │   │   ├── components/
│   │   │   ├── data/
│   │   │   ├── logic/
│   │   │   └── __tests__/
│   │   │
│   │   ├── minigame3-saving/         # Level 3: Saving Goals
│   │   │   ├── index.tsx
│   │   │   ├── components/
│   │   │   ├── data/
│   │   │   ├── logic/
│   │   │   └── __tests__/
│   │   │
│   │   ├── minigame4-investing/      # Level 4: Investment Strategy
│   │   │   ├── index.tsx
│   │   │   ├── components/
│   │   │   ├── data/
│   │   │   ├── logic/
│   │   │   └── __tests__/
│   │   │
│   │   └── index.ts                  # 🔌 PLUGIN REGISTRY
│   │                                 # Exports MINIGAMES object mapping level IDs to configs
│   │
│   ├── hooks/                        # Custom React hooks (reusable logic)
│   │   ├── useGameProgress.ts        # Access/update game progress
│   │   └── useMinigame.ts            # Minigame lifecycle hooks
│   │
│   ├── utils/                        # Utility functions
│   │   ├── gameLogic.ts              # Star calculation, level unlocking
│   │   └── navigation.ts             # Routing helpers
│   │
│   ├── assets/                       # Static assets
│   │   ├── images/
│   │   │   ├── map-background.svg
│   │   │   └── icons/
│   │   └── fonts/
│   │
│   └── styles/
│       └── globals.css               # Global styles
│
├── public/                           # Public static files
│
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
├── vite.config.ts                    # Vite config
├── .gitignore
└── README.md                         # Project documentation

```

---

## Module Interface Contracts

### Core Types (types/minigame.types.ts)

All minigames **must** implement these interfaces:

**MinigameProps** - Props passed to every minigame component

- `levelId`: string
- `onComplete`: callback with MinigameResult
- `onQuit`: callback to return to map

**MinigameResult** - Data returned when minigame finishes

- `score`: number (0-100)
- `stars`: 1 | 2 | 3
- `coins`: number
- `correctAnswers`: number
- `totalQuestions`: number

**MinigameConfig** - Registration object for plugin registry

- `id`: string
- `name`: string
- `description`: string
- `icon`: string (path)
- `component`: React.FC<MinigameProps>
- `lessonContent`: string

### Plugin Registry Pattern

**How it works:**

1. Each minigame developer creates their module in `minigames/minigameX-name/`
2. Implement the `MinigameProps` interface
3. Register in `minigames/index.ts` by exporting MinigameConfig
4. Map developer accesses all minigames via `MINIGAMES` object
5. MinigamePage dynamically loads the correct component based on route

> [!IMPORTANT]
> **No direct dependencies between modules!**
>
> This is the core principle that enables parallel development. Each module (Map, Minigame 1-4) should only communicate through the shared interfaces defined in `types/`. Developers should never import code directly from another developer's module.

---

## Development Workflow

### Phase 1: PRIORITY - Quick Navigation Scaffold (ASAP)

> [!TIP]
> **Goal**: Get a minimal working skeleton ASAP so everyone can develop and test in parallel
>
> **What to build**: An extremely simple map - just a horizontal line with 4 clickable buttons representing levels. Clicking a button navigates to that minigame page.

**Deliverables:**

- [ ] Initialize Vite + React + TypeScript project
- [ ] Define basic type contracts in `types/` (MinigameProps, MinigameResult)
- [ ] Create **extremely simple map** - just a horizontal line with 4 clickable buttons (Level 1, 2, 3, 4)
- [ ] Set up routing: clicking button navigates to `/minigame/level-X`
- [ ] Create placeholder minigame pages (just show "Minigame 1 Coming Soon...")
- [ ] **NO level blocking, NO stars/coins tracking yet** - just navigation working

**Why this is priority**: Once navigation works, developers can immediately start building their minigames and test them without waiting for the full map implementation.

**Who can do this**: Anyone comfortable with React + TypeScript. Can be done collaboratively.

### Phase 2: Parallel Development

Each developer works independently on their assigned module:

- **Map Developer**: Build MapPage using `gameStore` and `MINIGAMES` registry
- **Minigame Developers**: Implement their assigned minigame following template
- **Shared Components**: Collaboratively develop as needs arise

### Phase 3: Integration & Testing

- [ ] Register all minigames in plugin registry
- [ ] Integration testing (map → minigames flow)
- [ ] Usability testing with Michelle/Faith
- [ ] Bug fixes and polish

> [!WARNING]
>
> ### Git Branching Strategy (REQUIRED)
>
> To avoid conflicts, each developer must work on their own branch:
>
> ```
> main
> ├─ map-feature           (Map development)
> ├─ minigame-1            (Scholarship game)
> ├─ minigame-2            (Budgeting game)
> ├─ minigame-3            (Saving game)
> ├─ minigame-4            (Investing game)
> └─ shared-components     (Shared UI components)
> ```
>
> **Rules:**
>
> - Create your branch from `main`
> - Only merge to `main` when your module is complete and tested
> - Communicate before merging to avoid conflicts
> - Pull from `main` regularly to stay updated

---

## Shared Components Library

These components are used by **all** minigames:

### QuestionProgressBar

- Shows question number (e.g., "3/5")
- Color-coded status (grey/green/red) for each question
- Used at top of every minigame

### LessonPreScreen

- Displays before minigame starts
- Shows lesson content + gameplay instructions
- "Start Game" button
- Passed via MinigameConfig.lessonContent

### LessonPostScreen

- Displays after minigame completion
- Shows stars earned (with animation)
- Shows coins earned
- "Return to Map" and "Try Again" buttons

### BackButton

- Fixed position (top-left)
- Confirmation modal before quitting
- Calls `onQuit()` callback

### StarRating

- Visual star display (1-3 stars)
- Used in PostScreen and Map modals

---

## State Management (Zustand)

### Global State Schema

**gameStore** manages:

- `totalStars`: number
- `totalCoins`: number
- `levelProgress`: Record<levelId, LevelProgress>
  - `LevelProgress`: { status, stars, coins, bestScore, attempts }

**Actions:**

- `updateLevelProgress(levelId, result)`
- `unlockLevel(levelId)`
- `resetProgress()`

**Who accesses what:**

- **Map**: Reads all state
- **Minigames**: Only read their own level progress (optional)
- **MinigamePage**: Writes results via `updateLevelProgress`

---

## Testing Strategy

### Unit Tests (per developer)

Each minigame developer writes tests for:

- Business logic functions (e.g., `savingsAlgorithm.ts`)
- Component rendering
- User interactions

Test files in `__tests__/` folder within each minigame.

### Integration Tests (collaborative)

- Map navigation flow
- Level unlocking logic
- State persistence
- Routing between pages

### Usability Testing (Michelle/Faith)

- Test with real users
- Provide feedback on UI/UX
- Validate learning objectives

---

## Next Steps

1. **Review & Approve** this architecture plan
2. **Initialize project** (Vite + React + TypeScript setup)
3. **Define types first** (`types/game.types.ts`, `types/minigame.types.ts`)
4. **Create template** for minigame developers
5. **Assign modules** to team members
6. **Start parallel development**

---

## Questions to Address

> [!IMPORTANT]
> **Before proceeding, please confirm:**
>
> 1. Does this modular architecture meet team needs?
> 2. Are module assignments (Map, Minigame 1-4) clear?
> 3. Should we add any additional shared components?
> 4. Technology stack approved? (React, TypeScript, Vite, Zustand)
