# Car Scratch and Dent Detection API

This NestJS API provides endpoints for detecting car scratches and dents using the Roboflow machine learning model.

## Endpoints

### 1. Upload Image for Detection
**POST** `/car-detection/upload`

Upload an image file to detect car scratches and dents.

**Request:**
- Content-Type: `multipart/form-data`
- Body: Form data with `image` field containing the image file

**Supported formats:** JPEG, PNG, WebP

**Response:**
```json
{
  "predictions": [
    {
      "x": 100,
      "y": 150,
      "width": 200,
      "height": 100,
      "confidence": 0.85,
      "class": "scratch"
    }
  ],
  "image": {
    "width": 800,
    "height": 600
  },
  "time": 0.5
}
```

### 2. Detect from Image URL
**POST** `/car-detection/url`

Detect car scratches and dents from an image URL.

**Request:**
```json
{
  "imageUrl": "https://example.com/car-image.jpg"
}
```

**Response:** Same as upload endpoint

### 3. Health Check
**POST** `/car-detection/health`

Check if the car detection service is running.

**Response:**
```json
{
  "status": "ok",
  "message": "Car detection service is running"
}
```

## Usage Examples

### Using cURL

#### Upload Image
```bash
curl -X POST http://localhost:3000/car-detection/upload \
  -F "image=@/path/to/your/car-image.jpg"
```

#### Detect from URL
```bash
curl -X POST http://localhost:3000/car-detection/url \
  -H "Content-Type: application/json" \
  -d '{"imageUrl": "https://example.com/car-image.jpg"}'
```

### Using JavaScript/TypeScript

```typescript
// Upload image
const formData = new FormData();
formData.append('image', fileInput.files[0]);

const response = await fetch('http://localhost:3000/car-detection/upload', {
  method: 'POST',
  body: formData,
});

const result = await response.json();

// Detect from URL
const response = await fetch('http://localhost:3000/car-detection/url', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    imageUrl: 'https://example.com/car-image.jpg'
  }),
});

const result = await response.json();
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400 Bad Request`: Invalid file type, missing image, or invalid URL
- `500 Internal Server Error`: Roboflow API errors or server issues

## Running the Application

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`
