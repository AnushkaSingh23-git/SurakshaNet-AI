import re

def analyze_text(text: str):

    original_text = text
    text = text.lower()

    phone_match = re.findall(
        r"\b(?:\+91[-\s]?)?[6-9]\d{9}\b",
        original_text
    )

    email_match = re.findall(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        original_text
    )

    website_match = re.findall(
        r"(https?://\S+|www\.\S+)",
        original_text
    )

    upi_match = re.findall(
        r"\b[\w.\-]{2,}@[a-zA-Z]{2,}\b",
        original_text
    )

    banks = [
        "sbi",
        "hdfc",
        "icici",
        "axis",
        "kotak",
        "pnb",
        "canara",
        "union bank",
        "bank of baroda",
        "indusind",
    ]

    bank_found = []

    for bank in banks:
        if bank in text:
            bank_found.append(bank.upper())

    keywords = {
        "cbi": 20,
        "ed": 20,
        "customs": 20,
        "police": 15,
        "cyber cell": 15,
        "arrest": 25,
        "warrant": 20,
        "crime": 5,
        "criminal": 10,
        "illegal": 10,
        "otp": 15,
        "kyc": 10,
        "aadhaar": 10,
        "pan": 10,
        "bank account": 15,
        "account blocked": 20,
        "transfer": 20,
        "transfer money": 25,
        "payment": 15,
        "upi": 15,
        "immediately": 10,
        "urgent": 10,
        "video call": 15,
        "fine": 15,
        "court": 15,
        "jail": 20,
        "verify": 10,
        "freeze": 20
    }

    score = 0
    findings = []

    for keyword, weight in keywords.items():
        if keyword in text:
            score += weight
            findings.append(keyword)

    score = min(score, 100)

    if score >= 70:
        risk = "High"
    elif score >= 35:
        risk = "Medium"
    else:
        risk = "Low"

    if any(word in text for word in ["cbi", "ed", "customs", "arrest", "police", "court"]):
        scam_type = "Digital Arrest Scam"

    elif any(word in text for word in ["otp", "bank account", "upi", "payment", "transfer"]):
        scam_type = "Financial Fraud"

    elif any(word in text for word in ["kyc", "aadhaar", "pan"]):
        scam_type = "KYC Verification Scam"

    else:
        scam_type = "No Major Scam Detected"

    if risk == "High":
        recommendation = [
            "Do NOT transfer money.",
            "End the call immediately.",
            "Call Cyber Helpline 1930.",
            "Report at cybercrime.gov.in"
        ]

    elif risk == "Medium":
        recommendation = [
            "Verify the caller's identity.",
            "Never share OTP or banking details.",
            "Avoid clicking suspicious links."
        ]

    else:
        recommendation = [
            "No major threat detected.",
            "Stay alert while sharing personal information."
        ]

    explanation = []

    if findings:
        for item in findings:
            explanation.append(f"Detected suspicious keyword: '{item}'")
    else:
        explanation.append("No suspicious keywords detected.")

    confidence = min(85 + len(findings), 99)

    return {
        "risk": risk,
        "score": score,
        "confidence": confidence,
        "type": scam_type,
        "findings": findings,
        "recommendation": recommendation,
        "explanation": explanation,
        "phone": phone_match,
        "email": email_match,
        "website": website_match,
        "upi": upi_match,
        "bank": bank_found,
    }