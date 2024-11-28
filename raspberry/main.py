from ultralytics import YOLO
import cv2
import cvzone
import math

cap = cv2.VideoCapture(0)


cap.set(3, 1280)
cap.set(4, 720)

model = YOLO('./trained/yolo11n.pt')

mfs = True
while mfs:
    success, img = cap.read()
    results = model(img, stream=True)
    print(results)
    for r in results:
        boxes = r.boxes
        for box in boxes:
            cls = box.cls[0]
            if int(cls) != 0: 
                continue
            name = "person"
            x1, y1, x2, y2 = box.xyxy[0]
            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
            w, h = x2-x1, y2-y1
            conf = math.ceil((box.conf[0]*100))/100
            cvzone.cornerRect(img, (x1, y1, w, h))
            cvzone.putTextRect(img, f'{name} 'f'{conf}', (max(0,x1), max(35,y1)), scale = 0.5)
            cv2.imshow("skibidi", img)
            if cv2.waitKey(1) == 27:
                mfs = False