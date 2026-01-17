# Vite + React Project with Docker

Modern frontend development setup with hot module replacement (HMR) working inside Docker.

## Quick Start (Development)

```bash
# 1. Clone & enter project
git clone <your-repo-url>
cd your-project-name

# 2. Start development environment
docker compose down -v          # optional: remove volumes if needed
docker compose up --build

# Wait until you see:
#   VITE vX.X.X  ready in XXX ms
#   ➜  Local:   http://localhost:5173/
#   ➜  Network: http://0.0.0.0:5173/

# 3. Open in browser
http://localhost:5173/