from PIL import Image
import os

def resize_image(image_path, output_path, max_width, max_height):
    try:
        img = Image.open(image_path)
        img.thumbnail((max_width, max_height))
        img.save(output_path, optimize=True, quality=85)
        print(f"Successfully resized {image_path} to {output_path}")
    except Exception as e:
        print(f"Error resizing image: {e}")

input_path = "c:/Users/aleja/OneDrive/Escritorio/wdd231/chamber/chamber/images/logo.png"
# Overwrite the original file
resize_image(input_path, input_path, 150, 150)
