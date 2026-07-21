from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel
import shutil
from models.url_detector import analyze_url

from fastapi.responses import FileResponse
from utils.pdf_generator import generate_pdf
import uuid
import os

from utils.ocr import extract_text
from models.scam_detector import analyze_text
router = APIRouter()


class Message(BaseModel):
    message: str

class URLRequest(BaseModel):
    url: str

@router.post("/analyze")
def analyze(data: Message):

    result = analyze_text(data.message)

    return result

@router.post("/analyze-url")
def analyze_website(data: URLRequest):

    result = analyze_url(data.url)

    return result


@router.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    extracted_text = extract_text(file_path)

    result = analyze_text(extracted_text)

    result["extracted_text"] = extracted_text
    result["image"] = f"http://127.0.0.1:8000/uploads/{file.filename}"
    return result


@router.post("/generate-pdf")
async def generate_pdf_report(report: dict):

    os.makedirs("reports", exist_ok=True)

    filename = f"reports/{uuid.uuid4()}.pdf"

    generate_pdf(report, filename)

    return FileResponse(
        path=filename,
        media_type="application/pdf",
        filename="SurakshaNet_Report.pdf",
    )