import easyocr


reader = easyocr.Reader(['en'])

def extract_text(image_path):
    result = reader.readtext(image_path)

    extracted_text = ""

    for item in result:
        extracted_text += item[1] + " "

    return extracted_text.strip()