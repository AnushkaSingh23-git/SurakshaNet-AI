import pytesseract
from PIL import Image


def extract_text(image_path):
    img = Image.open(image_path)

    img.thumbnail((1200,1200))

    text = pytesseract.image_to_string(img)

    return text.strip()