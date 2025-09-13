import curl_cffi as curl
import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import random
import time

url = "https://www.istockphoto.com/photos/dirty-car"

ips = [
    '8.8.8.8',
    '1.1.1.1',
    '208.67.222.222',
    '9.9.9.9',
    '76.76.19.61',
    '76.223.126.88',
    '185.199.108.153',
    '140.82.112.3',
    '192.30.255.112',
    '151.101.1.140',
    '151.101.65.140',
    '151.101.129.140',
    '151.101.193.140',
    '199.232.69.194',
    '199.232.69.195',
    '199.232.69.196',
    '199.232.69.197',
    '199.232.69.198',
    '199.232.69.199',
    '199.232.69.200'
]

user_agents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/121.0',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/121.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/120.0.0.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Edge/120.0.0.0',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPad; CPU OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Linux; Android 14; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106.0.0.0',
    'Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Whale/3.21.192.22',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Vivaldi/6.5.3206.57',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Vivaldi/6.5.3206.57'
]

def get_random_headers():
    """Generate random headers with user agent and other common headers"""
    return {
        'User-Agent': random.choice(user_agents),
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Cache-Control': 'max-age=0'
    }

def make_request_with_retry(url, max_retries=3):
    for attempt in range(max_retries):
        try:
            headers = get_random_headers()
            response = requests.get(url, headers=headers, timeout=30)
            response.raise_for_status()
            return response
        except requests.exceptions.RequestException as e:
            print(f"Attempt {attempt + 1} failed: {e}")
            if attempt < max_retries - 1:
                delay = random.uniform(2, 5)
                print(f"Waiting {delay:.2f} seconds before retry...")
                time.sleep(delay)
            else:
                raise

output_dir = "./images-1"
os.makedirs(output_dir, exist_ok=True)

print("Fetching main page...")
response = make_request_with_retry(url)
soup = BeautifulSoup(response.text, "html.parser")

img_tags = soup.find_all("img")
print(f"Found {len(img_tags)} images to download")

jpg_count = 0
for idx, img in enumerate(img_tags):
    img_url = img.get("src")
    if img_url:
        img_url = urljoin(url, img_url)
        
        file_ext = os.path.splitext(img_url)[1].lower()
        if file_ext not in ['.jpg', '.jpeg']:
            print(f"Skipping non-JPG image: {img_url} (extension: {file_ext})")
            continue
        
        try:
            jpg_count += 1
            print(f"Downloading JPG image {jpg_count}: {img_url}")
            img_response = make_request_with_retry(img_url)
            
            file_path = os.path.join(output_dir, f"image_{jpg_count}.jpg")
            
            with open(file_path, "wb") as f:
                f.write(img_response.content)
            
            print(f"✓ Downloaded: {file_path}")
            
            delay = random.uniform(1, 3)
            print(f"Waiting {delay:.2f} seconds before next download...")
            time.sleep(delay)
            
        except Exception as e:
            print(f"✗ Failed to download {img_url}: {e}")
            continue

print(f"All JPG images downloaded successfully. Total JPG images: {jpg_count}")