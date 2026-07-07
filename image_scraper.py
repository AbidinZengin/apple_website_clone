"""Scrape and download all <img> assets from a target page using Playwright."""

import os
import re
import sys
from urllib.parse import urljoin, urlparse

import requests
from playwright.sync_api import sync_playwright

TARGET_URL = "https://www.apple.com/"
OUTPUT_DIR = "indirilen_gorseller"


def collect_image_urls(page_url: str) -> list[str]:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(page_url, wait_until="networkidle", timeout=60000)

        raw_srcs = page.eval_on_selector_all(
            "img",
            "els => els.map(el => el.currentSrc || el.getAttribute('src') || el.getAttribute('data-src') || '')",
        )
        browser.close()

    urls = []
    seen = set()
    for src in raw_srcs:
        src = (src or "").strip()
        if not src or src.startswith("data:"):
            continue
        full_url = urljoin(page_url, src)
        if full_url not in seen:
            seen.add(full_url)
            urls.append(full_url)
    return urls


def name_from_url(url: str, index: int) -> str:
    path = urlparse(url).path
    name = os.path.basename(path)
    name = re.sub(r"[^A-Za-z0-9._-]", "_", name)
    if not name or "." not in name:
        name = f"image_{index}.jpg"
    return name


def print_markdown_table(entries: list[tuple[str, str]]) -> None:
    print("\n| # | Dosya Adı | URL |")
    print("|---|-----------|-----|")
    for i, (name, url) in enumerate(entries, start=1):
        print(f"| {i} | {name} | {url} |")
    print()


def download_images(entries: list[tuple[str, str]], output_dir: str) -> tuple[int, int]:
    os.makedirs(output_dir, exist_ok=True)
    success, skipped = 0, 0

    for name, url in entries:
        try:
            resp = requests.get(url, timeout=15)
            if resp.status_code != 200 or not resp.content:
                print(f"[ATLANDI] {name} -> HTTP {resp.status_code} veya boş içerik")
                skipped += 1
                continue

            dest = os.path.join(output_dir, name)
            base, ext = os.path.splitext(dest)
            counter = 1
            while os.path.exists(dest):
                dest = f"{base}_{counter}{ext}"
                counter += 1

            with open(dest, "wb") as f:
                f.write(resp.content)
            print(f"[INDIRILDI] {name} ({len(resp.content)} bytes)")
            success += 1
        except requests.RequestException as exc:
            print(f"[HATA] {name} -> {exc}")
            skipped += 1

    return success, skipped


def main() -> None:
    print(f"Hedef sayfa: {TARGET_URL}")
    print("Sayfa yukleniyor (networkidle bekleniyor)...")

    try:
        urls = collect_image_urls(TARGET_URL)
    except Exception as exc:
        print(f"Sayfa yuklenirken hata olustu: {exc}")
        sys.exit(1)

    if not urls:
        print("Sayfada gorsel bulunamadi.")
        return

    entries = [(name_from_url(url, i), url) for i, url in enumerate(urls, start=1)]

    print(f"\nToplam {len(entries)} gorsel bulundu:")
    print_markdown_table(entries)

    print(f"Gorseller '{OUTPUT_DIR}' klasorune indiriliyor...")
    success, skipped = download_images(entries, OUTPUT_DIR)

    print("\n--- Ozet ---")
    print(f"Bulunan gorsel: {len(entries)}")
    print(f"Indirilen: {success}")
    print(f"Atlanan/hatali: {skipped}")


if __name__ == "__main__":
    main()
