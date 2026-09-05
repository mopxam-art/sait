import re
import sys

filename = r"c:\____2024____\00_Семья\Папа\sait\ФИНАЛ_v2\Виктор Морхат - Поэтический архив.html"

with open(filename, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace mobile-header CSS with top-header CSS
mobile_header_css_pattern = r"/\* Mobile Specific Elements \*/.*?\.mobile-overlay\.active {\s*opacity: 1;\s*visibility: visible;\s*}"
top_header_css = """/* Top Header Elements */
.top-header {
    display: flex;
    padding: 1rem 2rem;
    background: var(--glass-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--glass-border);
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 50;
    gap: 1rem;
}

.header-left, .header-right {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.header-brand {
    display: flex;
    flex-direction: column;
}

.mobile-title {
    font-family: 'Lora', serif;
    font-size: 1.5rem;
    color: var(--accent);
    font-weight: 500;
    margin: 0;
    line-height: 1.2;
}

.header-subtitle {
    font-size: 0.85rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 0;
}

.mobile-font-control {
    margin: 0;
}

.mobile-font-control input[type="range"] {
    width: 100px;
}

.menu-toggle {
    background: transparent;
    border: none;
    color: var(--text-primary);
    cursor: pointer;
    padding: 0.5rem;
    display: none;
    align-items: center;
    justify-content: center;
}

.mobile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 90;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

.mobile-overlay.active {
    opacity: 1;
    visibility: visible;
}"""
content = re.sub(mobile_header_css_pattern, top_header_css, content, flags=re.DOTALL)

# 2. Update .sidebar and remove .sidebar-header CSS
sidebar_css_pattern = r"/\* Sidebar \*/.*?\.sidebar-settings {\s*display: flex;\s*flex-direction: column;\s*align-items: center;\s*gap: 1\.5rem;\s*margin-bottom: 2rem;\s*}"
sidebar_new_css = """/* Sidebar */
.sidebar {
    flex: 0 0 350px;
    background: var(--glass-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border);
    border-radius: 24px;
    padding: 1.5rem 1rem 1.5rem 1.5rem;
    box-shadow: var(--glass-shadow);
    display: flex;
    flex-direction: column;
    height: calc(100vh - 8rem);
    position: sticky;
    top: 6rem;
    transition: all 1s ease;
}"""
content = re.sub(sidebar_css_pattern, sidebar_new_css, content, flags=re.DOTALL)

# 3. Media query update
media_query_pattern = r"@media \(max-width: 900px\) {\s*\.mobile-header {\s*display: flex;\s*}"
media_query_new = """@media (max-width: 900px) {
    .menu-toggle {
        display: flex;
    }
    .header-subtitle {
        display: none;
    }
    .top-header {
        padding: 1rem 1.5rem;
    }"""
content = re.sub(media_query_pattern, media_query_new, content)

# 4. HTML structure update
html_pattern = r"<!-- Mobile Header -->.*?</header>\s*<!-- Mobile Overlay -->\s*<div id=\"mobile-overlay\" class=\"mobile-overlay\"></div>\s*<div class=\"layout\">\s*<!-- Sidebar Navigation -->\s*<aside class=\"sidebar\" id=\"sidebar\">\s*<header class=\"sidebar-header\">.*?</header>"
html_new = """<!-- Global Header -->
    <header class="top-header">
        <div class="header-left">
            <button id="menu-toggle" class="menu-toggle" aria-label="Адкрыць меню">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <div class="header-brand">
                <h1 class="mobile-title">Віктар Морхат</h1>
                <p class="header-subtitle">Паэтычны архіў</p>
            </div>
        </div>
        <div class="header-right">
            <button id="theme-toggle" class="theme-toggle" aria-label="Пераключыць тэму">
                <div class="toggle-slider"></div>
                <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </button>
            <div class="font-control mobile-font-control" aria-label="Памер шрыфта">
                <span class="font-decrease" style="font-size: 0.9rem">A</span>
                <input type="range" class="font-slider" min="0.8" max="2.4" step="0.1" value="1.8" aria-label="Рэгуляваць памер шрыфта">
                <span class="font-increase" style="font-size: 1.4rem">A</span>
            </div>
        </div>
    </header>

    <!-- Mobile Overlay -->
    <div id="mobile-overlay" class="mobile-overlay"></div>

    <div class="layout">
        <!-- Sidebar Navigation -->
        <aside class="sidebar" id="sidebar">"""
content = re.sub(html_pattern, html_new, content, flags=re.DOTALL)

with open(filename, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated successfully!")
