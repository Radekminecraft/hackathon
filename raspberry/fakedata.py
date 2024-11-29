import requests
import random

for i in range(24):
    minute = str(i).zfill(2)
    
    requests.post(
        "http://localhost:3000/api/updateAnimal",
        json={
            'time': f'2024-11-28T{minute}:00:00.000Z',
            'animal': 'tiger',
            'inside': random.randint(0, 20)
        }
    )
