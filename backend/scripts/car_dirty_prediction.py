#!/usr/bin/env python3
"""
Car Dirty/Clean Prediction Script
This script loads a trained model and predicts if a car in an image is dirty or clean.
"""

import sys
import os
import json
import tempfile
import base64
from pathlib import Path

model_dir = Path(__file__).parent.parent.parent / 'model'
sys.path.append(str(model_dir))

try:
    import tensorflow as tf
    from tensorflow.keras.models import load_model
    from tensorflow.keras.preprocessing import image
    import numpy as np
    from PIL import Image
    import io
except ImportError as e:
    print(json.dumps({"error": f"Required libraries not installed: {str(e)}"}))
    sys.exit(1)

class CarDirtyPredictor:
    def __init__(self, model_path: str):
        """Initialize the predictor with the trained model."""
        self.model_path = model_path
        self.model = None
        self.img_size = (224, 224)
        self.load_model()
    
    def load_model(self):
        """Load the trained model."""
        try:
            if not os.path.exists(self.model_path):
                raise FileNotFoundError(f"Model file not found: {self.model_path}")
            
            self.model = load_model(self.model_path)
            print("Model loaded successfully", file=sys.stderr)
        except Exception as e:
            error_msg = f"Failed to load model: {str(e)}"
            print(json.dumps({"error": error_msg}))
            sys.exit(1)
    
    def predict_from_base64(self, base64_image: str) -> dict:
        """Predict if car is dirty or clean from base64 encoded image."""
        try:
            image_data = base64.b64decode(base64_image)
            
            pil_image = Image.open(io.BytesIO(image_data))
            
            if pil_image.mode != 'RGB':
                pil_image = pil_image.convert('RGB')
            
            pil_image = pil_image.resize(self.img_size)
            
            img_array = np.array(pil_image) / 255.0
            img_array = np.expand_dims(img_array, axis=0)
            
            prediction = self.model.predict(img_array, verbose=0)[0][0]
            
            is_dirty = prediction > 0.5
            label = 'dirty' if is_dirty else 'clean'
            confidence = float(prediction if is_dirty else (1 - prediction))
            
            return {
                "success": True,
                "prediction": {
                    "label": label,
                    "confidence": confidence,
                    "raw_score": float(prediction)
                }
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": f"Prediction failed: {str(e)}"
            }
    
    def predict_from_file(self, image_path: str) -> dict:
        """Predict if car is dirty or clean from image file path."""
        try:
            if not os.path.exists(image_path):
                return {
                    "success": False,
                    "error": f"Image file not found: {image_path}"
                }
            
            img = image.load_img(image_path, target_size=self.img_size)
            img_array = image.img_to_array(img) / 255.0
            img_array = np.expand_dims(img_array, axis=0)
            
            prediction = self.model.predict(img_array, verbose=0)[0][0]
            
            is_dirty = prediction > 0.5
            label = 'dirty' if is_dirty else 'clean'
            confidence = float(prediction if is_dirty else (1 - prediction))
            
            return {
                "success": True,
                "prediction": {
                    "label": label,
                    "confidence": confidence,
                    "raw_score": float(prediction)
                }
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": f"Prediction failed: {str(e)}"
            }

def main():
    """Main function to handle command line arguments."""
    if len(sys.argv) < 3:
        print(json.dumps({
            "error": "Usage: python car_dirty_prediction.py <model_path> <base64_image_or_file_path>"
        }))
        sys.exit(1)
    
    model_path = sys.argv[1]
    input_data = sys.argv[2]
    
    predictor = CarDirtyPredictor(model_path)
    
    if os.path.exists(input_data):
        result = predictor.predict_from_file(input_data)
    else:
        result = predictor.predict_from_base64(input_data)
    
    print(json.dumps(result))

if __name__ == "__main__":
    main()
