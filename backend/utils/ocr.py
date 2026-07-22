import easyocr

reader = None

def get_reader():
    global reader

    if reader is None:
        reader = easyocr.Reader(['en'])

    return reader


def extract_text(image_path):
    reader = get_reader()

    result = reader.readtext(image_path)

    extracted_text = ""

    for item in result:
        extracted_text += item[1] + " "

    return extracted_text.strip()