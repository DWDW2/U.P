# Car Dirty/Clean Prediction Script

This directory contains the Python script for car dirty/clean prediction using a trained TensorFlow model.

## Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Ensure the trained model file exists at `../model/car_dirty_clean_model.h5`

## Usage

The script can be used in two ways:

### From Base64 encoded image:
```bash
python3 car_dirty_prediction.py /path/to/model.h5 "base64_encoded_image_string"
```

### From image file:
```bash
python3 car_dirty_prediction.py /path/to/model.h5 /path/to/image.jpg
```

## Output

The script outputs JSON with the following structure:

```json
{
  "success": true,
  "prediction": {
    "label": "dirty" | "clean",
    "confidence": 0.95,
    "raw_score": 0.95
  }
}
```

## Error Handling

If an error occurs, the script outputs:

```json
{
  "success": false,
  "error": "Error message"
}
```

## Model Requirements

- The model expects images of size 224x224 pixels
- Images are automatically resized and normalized
- The model outputs a binary classification (dirty/clean)
