from flask import Flask, send_file
from picamera2 import Picamera2
import cv2
import io

app = Flask(__name__)

# Initialize the camera
camera = Picamera2()
camera.configure(camera.create_preview_configuration(main={"format": 'XRGB8888', "size": (640, 480)}))
camera.start()

# Function to capture and save a single image
def capture_image():
    # Capture an image from the camera
    frame = camera.capture_array()

    # Convert the frame to JPEG format
    ret, buffer = cv2.imencode('.jpg', frame)
    if not ret:
        raise Exception("Failed to encode image.")

    # Convert buffer to bytes
    img_bytes = buffer.tobytes()

    # Save the image to a file (optional, can also send directly to response)
    with open("captured_image.jpg", "wb") as f:
        f.write(img_bytes)

    return img_bytes

# Route to send captured image as a downloadable file
@app.route('/')
def capture_and_send_image():
    try:
        # Capture image from the camera
        img_bytes = capture_image()

        # Return the image as a downloadable file
        return send_file(io.BytesIO(img_bytes), mimetype='image/jpeg', as_attachment=True, download_name="captured_image.jpg")
    except Exception as e:
        return f"Error: {str(e)}", 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
