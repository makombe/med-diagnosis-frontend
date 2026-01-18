# Vite + React Project with Docker

**Important Disclaimer**  
This application is for **Prototyping purposes only**.  

**For this prototype/demo, the diagnosis endpoint currently returns mocked / static sample data to ensure reliable local testing and presentation without external dependencies.The system is fully architected to integrate with the real ApiMedic Symptom Checker API (via configurable credentials), and switching to live data requires only providing valid APP_ID and SECRET.**


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