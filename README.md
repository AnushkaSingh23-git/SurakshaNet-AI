# SurakshaNet AI — Public Safety Analysis Platform

SurakshaNet AI is a web-based public safety prototype designed to analyze potentially suspicious text and images and present the analysis results through an interactive interface.

## Features

- **Text Analysis:** Submit text for analysis through the backend API.
- **Image Analysis:** Upload an image for analysis using the image-analysis endpoint.
- **Result Dashboard:** View analysis results through a structured frontend interface.
- **Police Dashboard:** Provides a dedicated interface for viewing safety-related information.
- **Interactive Visualizations:** Includes heatmap and network-graph components to present information visually.

## Tech Stack

**Frontend:** React, JavaScript, CSS  
**Backend:** Python, FastAPI  
**Data Visualization:** React Simple Maps, React Flow  
**Tools:** Git, GitHub, VS Code

## Project Structure

```text
SurakshaNet-AI/
├── frontend/
│   └── src/
│       ├── components/
│       └── ...
├── backend/
│   └── ...
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AnushkaSingh23-git/SurakshaNet-AI.git
cd SurakshaNet-AI
```

### 2. Set up the backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
python3 -m pip install -r requirements.txt
```

Start the FastAPI server using the command configured for your backend entry point. For example, if the file is `main.py`:

```bash
uvicorn main:app --reload
```

Open `http://127.0.0.1:8000/docs` to explore the API documentation.

### 3. Set up the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in your terminal.

## API Endpoints

| Endpoint | Purpose |
|---|---|
| `/analyze` | Text or data analysis |
| `/analyze-image` | Image analysis |

Refer to the backend implementation and `/docs` for the exact request formats and response fields.

## Future Improvements

- Integrate and evaluate reliable detection models.
- Improve analysis explanations and result visualization.
- Add authentication, logging and deployment support.
- Evaluate the system using a labeled test dataset.

## Project Status

Prototype under development.

## Contributors

Developed as a software project focused on public safety analysis and interactive data visualization.
