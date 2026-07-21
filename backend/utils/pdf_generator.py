from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
)
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.colors import red, green, orange
from datetime import datetime


styles = getSampleStyleSheet()

title_style = styles["Heading1"]
title_style.alignment = TA_CENTER

heading_style = styles["Heading2"]

normal_style = styles["BodyText"]


def generate_pdf(report, filename):

    doc = SimpleDocTemplate(filename)

    elements = []

    elements.append(
        Paragraph("SURAKSHANET AI", title_style)
    )

    elements.append(
        Paragraph("Cyber Crime Investigation Report", heading_style)
    )

    elements.append(Spacer(1, 20))

    elements.append(
        Paragraph(
            f"<b>Generated:</b> {datetime.now().strftime('%d-%m-%Y %H:%M:%S')}",
            normal_style,
        )
    )

    elements.append(
        Paragraph(
            f"<b>Case ID:</b> SRK-{datetime.now().strftime('%H%M%S')}",
            normal_style,
        )
    )

    elements.append(Spacer(1, 15))

    elements.append(
        Paragraph(
            f"<b>Scam Type:</b> {report.get('type','N/A')}",
            normal_style,
        )
    )

    risk = report.get("risk", "Low")

    color = green

    if risk == "Medium":
        color = orange

    elif risk == "High":
        color = red

    elements.append(
        Paragraph(
            f'<font color="{color}"><b>Risk Level:</b> {risk}</font>',
            normal_style,
        )
    )

    elements.append(
        Paragraph(
            f"<b>Risk Score:</b> {report.get('score',0)}%",
            normal_style,
        )
    )

    elements.append(
        Paragraph(
            f"<b>Confidence:</b> {report.get('confidence',0)}%",
            normal_style,
        )
    )

    elements.append(Spacer(1, 15))

    elements.append(
        Paragraph("<b>Detected Evidence</b>", heading_style)
    )

    elements.append(
        Paragraph(
            f"Phone : {', '.join(report.get('phone', [])) or 'Not Found'}",
            normal_style,
        )
    )

    elements.append(
        Paragraph(
            f"Email : {', '.join(report.get('email', [])) or 'Not Found'}",
            normal_style,
        )
    )

    elements.append(
        Paragraph(
            f"UPI : {', '.join(report.get('upi', [])) or 'Not Found'}",
            normal_style,
        )
    )

    elements.append(
        Paragraph(
            f"Website : {', '.join(report.get('website', [])) or 'Not Found'}",
            normal_style,
        )
    )

    elements.append(
        Paragraph(
            f"Bank : {', '.join(report.get('bank', [])) or 'Not Found'}",
            normal_style,
        )
    )

    elements.append(Spacer(1, 15))

    elements.append(
        Paragraph("<b>Suspicious Findings</b>", heading_style)
    )

    for item in report.get("findings", []):

        elements.append(
            Paragraph(f"• {item}", normal_style)
        )

    elements.append(Spacer(1, 15))

    elements.append(
        Paragraph("<b>AI Recommendations</b>", heading_style)
    )

    for item in report.get("recommendation", []):

        elements.append(
            Paragraph(f"• {item}", normal_style)
        )

    elements.append(Spacer(1, 25))

    elements.append(
        Paragraph(
            "Generated automatically by SurakshaNet AI",
            normal_style,
        )
    )

    doc.build(elements)