from ultralytics import YOLO
import cv2
import cvzone
import math
import numpy as np
import requests
import time

model = YOLO('./trained/yolo11n.pt')
UPDATETIME = 5
mfs = True
while mfs:
    response = requests.get("http://10.10.1.52:5000/")
    animalCount = 0
    if response.status_code == 200:
        img_array = np.asarray(bytearray(response.content), dtype=np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
        results = model(img)
        for r in results:
            boxes = r.boxes
            for box in boxes:
                cls = box.cls[0]
                if int(cls) != 0:
                    continue
                x1, y1, x2, y2 = box.xyxy[0]
                x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                w, h = x2 - x1, y2 - y1
                
                conf = math.ceil((box.conf[0] * 100)) / 100
                if conf >= 0.7:
                    cvzone.cornerRect(img, (x1, y1, w, h))
                    cv2.putText(img, f'{conf}', (max(0, x1), max(35, y1)),
                                cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)
                    animalCount += 1
        
        cv2.imshow("skafsl", img)
        requests.post("https://hackathon-uygp.onrender.com/ohrady/1/zvirata", json={'pocet':f'{animalCount}'})
        if cv2.waitKey(1) == 27:
            mfs = False

    else:
        print("Failed to retrieve image from the Flask server.")
    time.sleep(UPDATETIME)
