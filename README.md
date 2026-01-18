# Vite + React Project with Docker

**Important Disclaimer**  
This application is for **Prototyping purposes only**.  

**For this prototype/demo, the diagnosis endpoint currently returns mocked / static sample data to ensure reliable local testing and presentation without external dependencies.The system is fully architected to integrate with the real ApiMedic Symptom Checker API (via configurable credentials), and switching to live data requires only providing valid APP_ID and SECRET.**


## Backend Dependency (Required)

This frontend application **depends entirely** on a separate backend API to function properly.  
The backend handles all data persistence, patient management, and diagnosis logic (including integration with the ApiMedic Symptom Checker API).

**Backend Repository**  
🔗 https://github.com/makombe/med-diagnosis-backend

**Important – The frontend cannot run standalone**  
Without the backend running, you will see:
- No patient search results
- No way to create patients
- No diagnosis suggestions (symptom checker will be broken)
- Validation/save features unavailable

### Required Setup Steps

1. **Start the Backend First**  
   Clone and run the backend repository:

   ```bash
   git clone https://github.com/makombe/med-diagnosis-backend.git
   cd med-diagnosis-backend

## Quick Start (Development)

```bash
# 1. Clone & enter project
git clone <your-repo-url>
cd your-project-name

# 2. Start development environment
docker compose down -v          # optional: remove volumes if needed
docker compose up --build

#Backend
#This app requires
https://github.com/makombe/med-diagnosis-backend

# Wait until you see:
#   VITE vX.X.X  ready in XXX ms
#   ➜  Local:   http://localhost:5173/
#   ➜  Network: http://0.0.0.0:5173/

# 3. Open in browser
http://localhost:5173/