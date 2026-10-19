"""Functional browser checks. Requires Python Playwright and Chromium.

Run against a server using a temporary ALTHEA_DATA_DIR, since forms are submitted.
BASE_URL and CHROMIUM_PATH can select an existing server and browser binary.
"""
import os
import time
from pathlib import Path

from playwright.sync_api import expect, sync_playwright


base_url = os.environ.get("BASE_URL", "http://127.0.0.1:3000")
output = Path("test-results")
output.mkdir(exist_ok=True)

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(
        executable_path=os.environ.get("CHROMIUM_PATH", "/usr/bin/chromium"),
        args=["--no-sandbox"],
    )
    page = browser.new_page(viewport={"width": 1358, "height": 610})
    page.set_default_timeout(10000)
    errors = []
    missing = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.on("response", lambda response: missing.append(response.url) if response.status >= 400 else None)
    try:
        page.goto(base_url, wait_until="networkidle")
        page.get_by_role("button", name="Agende uma consulta", exact=True).first.click()
        expect(page.get_by_role("dialog")).to_be_visible()
        page.get_by_label("Seu nome", exact=True).fill("Teste de Navegação")
        page.get_by_role("dialog").get_by_label("Seu e-mail", exact=True).fill(
            f"consulta-{time.time_ns()}@example.com"
        )
        page.get_by_role("dialog").get_by_role("checkbox").check()
        page.get_by_role("button", name="Solicitar minha consulta", exact=True).click()
        expect(page.get_by_text("Seu pedido de consulta foi registrado.", exact=True)).to_be_visible()
        page.get_by_role("button", name="Até breve", exact=True).click()
        expect(page.get_by_role("dialog")).not_to_be_visible()
        expect(page.locator(".header-cta")).to_be_focused()
        print("PASS: consulta registrada e foco restaurado", flush=True)

        page.locator(".testimonials").scroll_into_view_if_needed()
        first = page.locator(".deck-position-0").inner_text()
        page.get_by_role("button", name="Próximo depoimento").click()
        assert page.locator(".deck-position-0").inner_text() != first
        page.get_by_role("button", name="Depoimento anterior").click()
        assert page.locator(".deck-position-0").inner_text() == first
        print("PASS: navegação nos depoimentos", flush=True)

        page.locator(".faq").scroll_into_view_if_needed()
        assert page.locator(".faq button[aria-expanded=true]").count() == 2
        page.locator(".faq h3 button").nth(1).click()
        assert page.locator(".faq button[aria-expanded=true]").count() == 3
        print("PASS: perguntas abertas de forma independente", flush=True)

        page.locator(".newsletter").scroll_into_view_if_needed()
        page.locator(".newsletter").get_by_role("textbox").fill(
            f"newsletter-{time.time_ns()}@example.com"
        )
        page.get_by_role("button", name="Assine", exact=True).click()
        expect(page.get_by_text("Sua inscrição foi registrada. Obrigada por se aproximar.", exact=True)).to_be_visible()
        page.locator(".legal-panel").get_by_role("button", name="Política de Privacidade", exact=True).click()
        expect(page.get_by_role("dialog")).to_be_visible()
        page.keyboard.press("Escape")
        expect(page.get_by_role("dialog")).not_to_be_visible()
        print("PASS: newsletter e janela de privacidade", flush=True)

        page.locator(".article-card").first.click()
        expect(page.get_by_role("dialog")).to_be_visible()
        page.keyboard.press("Escape")
        expect(page.locator(".article-card").first).to_be_focused()
        print("PASS: leitura de artigos e fechamento por Escape", flush=True)

        for width, height in [(320, 740), (390, 844), (810, 1080), (1358, 610), (1440, 900), (1920, 1080)]:
            page.set_viewport_size({"width": width, "height": height})
            page.evaluate("scrollTo({top:0,behavior:'instant'})")
            page.wait_for_timeout(150)
            assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), f"Overflow: {width}"
            if width < 1200:
                page.get_by_role("button", name="Menu", exact=True).click()
                expect(page.get_by_role("dialog", name="Navegação")).to_be_visible()
                page.keyboard.press("Escape")
                expect(page.get_by_role("button", name="Menu", exact=True)).to_be_focused()
            page.screenshot(path=str(output / f"inicio-{width}.png"))
        print("PASS: seis larguras sem rolagem horizontal; menu e Escape", flush=True)

        page.set_viewport_size({"width": 390, "height": 844})
        page.get_by_role("button", name="Menu", exact=True).click()
        page.get_by_role("navigation", name="Navegação móvel").get_by_role("link", name="Serviços", exact=True).click()
        expect(page.locator("#mobile-menu")).not_to_be_visible()
        dots = page.locator(".carousel-dots button")
        dots.nth(4).click()
        expect(dots.nth(4)).to_have_attribute("aria-current", "true")
        page.locator(".services-touch .service-card").nth(4).click()
        expect(page.get_by_role("dialog")).to_be_visible()
        expect(page.get_by_role("dialog").get_by_role("heading", name="Plano de cuidado pessoal")).to_be_visible()
        page.keyboard.press("Escape")
        print("PASS: carrossel móvel e detalhes do cuidado", flush=True)

        page.emulate_media(reduced_motion="reduce")
        page.set_viewport_size({"width": 1358, "height": 610})
        expect(page.locator(".services-touch")).to_be_visible()
        expect(page.locator(".services-scene")).not_to_be_visible()
        print("PASS: preferência por movimento reduzido", flush=True)

        page.goto(base_url + "/404", wait_until="networkidle")
        expect(page.get_by_role("heading", name="Uma pausa no caminho.")).to_be_visible()
        assert not errors, errors
        assert not missing, missing
        print("PASS: página 404, sem erros JavaScript ou recursos ausentes", flush=True)
    except Exception:
        page.screenshot(path=str(output / "failure.png"), full_page=True)
        raise
    finally:
        browser.close()
