from flask import Flask, send_file
from picamera2 import Picamera2
import cv2
import io

app = Flask(__name__)

camera = Picamera2()
camera.configure(camera.create_preview_configuration(main={"format": 'XRGB8888', "size": (640, 480)}))
camera.start()

def capture_image():
    frame = camera.capture_array()
    ret, buffer = cv2.imencode('.jpg', frame)
    if not ret:
        raise Exception("Failed to encode image.")
    img_bytes = buffer.tobytes()
    with open("captured_image.jpg", "wb") as f:
        f.write(img_bytes)

    return img_bytes

@app.route('/')
def capture_and_send_image():
    try:
        img_bytes = capture_image()
        return send_file(io.BytesIO(img_bytes), mimetype='image/jpeg', as_attachment=True, download_name="captured_image.jpg")
    except Exception as e:
        return f"Error: {str(e)}", 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
