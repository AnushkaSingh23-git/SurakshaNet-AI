from urllib.parse import urlparse

def analyze_url(url: str):

    score = 0
    findings = []

    suspicious_words = [
        "verify",
        "login",
        "bank",
        "update",
        "kyc",
        "otp",
        "reward",
        "gift",
        "free",
        "wallet"
    ]

    domain = urlparse(url).netloc.lower()

    if "-" in domain:
        score += 20
        findings.append("Hyphen found in domain")

    if len(domain) > 30:
        score += 20
        findings.append("Very long domain")

    for word in suspicious_words:
        if word in url.lower():
            score += 10
            findings.append(word)

    if score > 100:
        score = 100

    if score >= 60:
        risk = "High"
        scam_type = "Phishing Website"
    elif score >= 30:
        risk = "Medium"
        scam_type = "Suspicious Website"
    else:
        risk = "Low"
        scam_type = "Safe Website"

    explanation = [
        f"Detected suspicious indicator: {item}"
        for item in findings
    ]

    if risk == "High":
        recommendation = [
            "Do not open this website.",
            "Do not enter OTP or bank details.",
            "Report the website if possible."
        ]
    elif risk == "Medium":
        recommendation = [
            "Verify the website before logging in.",
            "Avoid sharing personal information."
        ]
    else:
        recommendation = [
            "No major risk detected.",
            "Still verify the website before entering sensitive data."
        ]

    return {
        "risk": risk,
        "score": score,
        "confidence": 96,
        "type": scam_type,
        "findings": findings,
        "recommendation": recommendation,
        "explanation": explanation
    }