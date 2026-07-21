from urllib.parse import urlparse

def analyze_url(url):

    domain = urlparse(url).netloc.lower()

    suspicious_words = [
        "cbi",
        "police",
        "gov",
        "bank",
        "rbi",
        "otp",
        "kyc",
        "verify",
        "secure",
        "update"
    ]

    score = 0
    reasons = []

    for word in suspicious_words:
        if word in domain:
            score += 15
            reasons.append(f"Contains suspicious keyword: {word}")

    if ".xyz" in domain:
        score += 20
        reasons.append("Uses .xyz domain")

    if ".top" in domain:
        score += 20
        reasons.append("Uses .top domain")

    if ".click" in domain:
        score += 20
        reasons.append("Uses .click domain")

    if score > 100:
        score = 100

    if score >= 60:
        risk = "High"
    elif score >= 30:
        risk = "Medium"
    else:
        risk = "Low"

    return {
        "risk": risk,
        "score": score,
        "reasons": reasons
    }