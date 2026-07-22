
# source venv/bin/activate
# uvicorn app:app --reload


import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.report import router as report_router
from routes.url import router as url_router
from fastapi.staticfiles import StaticFiles


from routes.analyze import router

app = FastAPI(
    title="SurakshaNet AI",
    version="1.0"
)

os.makedirs("uploads", exist_ok=True)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://surakshanet-ai-bice.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(report_router)
app.include_router(url_router)



@app.get("/")
def home():
    return {
        "message": "SurakshaNet AI Backend Running"
    }