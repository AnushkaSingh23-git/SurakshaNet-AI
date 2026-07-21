from fastapi import APIRouter
from pydantic import BaseModel
from utils.url_checker import analyze_url

router = APIRouter()

class URLData(BaseModel):
    url: str

@router.post("/analyze-url")
def check_url(data: URLData):
    return analyze_url(data.url)