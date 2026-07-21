from fastapi import APIRouter
from pydantic import BaseModel
from database.db import reports_collection

router = APIRouter()

from typing import Optional, List
from pydantic import BaseModel

class Report(BaseModel):
    type: str
    risk: str
    city: str
    status: str

    image: Optional[str] = None
    extracted_text: Optional[str] = None

    score: Optional[int] = None
    confidence: Optional[int] = None

    findings: Optional[List[str]] = []
    recommendation: Optional[List[str]] = []
    explanation: Optional[List[str]] = []

@router.post("/report")
def create_report(report: Report):

    print(report.dict())

    reports_collection.insert_one(report.model_dump())

    return {
        "message": "Report submitted successfully"
    }

@router.get("/reports")
def get_reports():

    reports = []

    for report in reports_collection.find():

        report["_id"] = str(report["_id"])

        reports.append(report)

    return reports