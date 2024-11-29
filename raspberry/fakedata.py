import requests
import random

for i in range(24):
    minute = str(i).zfill(2)
    
    requests.post(
        "http://localhost:3000/api/updateAnimal",
        json={
            'time': f'2024-11-28T00:{minute}:00.000Z',
            'animal': 'elephant',
            'inside': random.randint(0, 17)
        }
    )
