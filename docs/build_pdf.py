"""
Convert docs/USER_MANUAL.md to docs/USER_MANUAL.pdf using ReportLab Platypus.

Output is A4, ~1in margins, system fonts (Helvetica + Courier), teal accent
(#0E7C7B), title page, auto-generated table of contents, page numbers,
table borders that print well on white. Emojis are stripped because the
built-in fonts don't include them — accent is provided by color + layout.
"""

import re
import sys
from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, white
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
)
from reportlab.lib.enums import TA_CENTER

ROOT = Path(__file__).resolve().parent
MD_PATH = ROOT / "USER_MANUAL.md"
PDF_PATH = ROOT / "USER_MANUAL.pdf"

# Palette
TEAL = HexColor("#0E7C7B")
LIGHT_TEAL = HexColor("#E4F2F1")
DARK_GREY = HexColor("#222222")
MEDIUM_GREY = HexColor("#666666")
LIGHT_GREY = HexColor("#F4F4F4")
BORDER_GREY = HexColor("#CCCCCC")

PAGE_W, PAGE_H = A4
SIDE = 1 * inch
USABLE_W = PAGE_W - 2 * SIDE


def strip_visual_clutter(s: str) -> str:
    """Drop characters Helvetica can't render (emojis, regional flags, etc.).
    Keeps basic Latin, common punctuation, em/en dashes, smart quotes,
    bullets, and standard arrows.
    """
    out = []
    for ch in s:
        cp = ord(ch)
        if cp < 0x2200:  # safe range incl. punctuation, currency, arrows, math
            out.append(ch)
        elif 0x2200 <= cp <= 0x22FF:  # math operators
            out.append(ch)
        # else skip emoji / regional flags / supplementary chars
    return re.sub(r"  +", " ", "".join(out)).strip()


def md_inline(text: str) -> str:
    """Convert inline markdown to ReportLab's mini-HTML."""
    text = strip_visual_clutter(text)
    # Escape ampersands and angle brackets first (avoid breaking our tags)
    text = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    # Code spans `...`
    text = re.sub(
        r"`([^`]+)`",
        r'<font name="Courier" color="#0E7C7B">\1</font>',
        text,
    )
    # Bold **...**
    text = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", text)
    # Italic *...*
    text = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<i>\1</i>", text)
    # Links [label](url)
    text = re.sub(
        r"\[([^\]]+)\]\(([^)]+)\)",
        r'<a href="\2" color="#0E7C7B"><u>\1</u></a>',
        text,
    )
    return text


def build():
    md = MD_PATH.read_text(encoding="utf-8")

    doc = SimpleDocTemplate(
        str(PDF_PATH),
        pagesize=A4,
        leftMargin=SIDE,
        rightMargin=SIDE,
        topMargin=SIDE,
        bottomMargin=SIDE,
        title="BCRedupath - User Manual (v1 Beta)",
        author="Bibin CutRiver",
    )

    base = getSampleStyleSheet()
    title_s = ParagraphStyle(
        "TitleHero", parent=base["Title"],
        fontSize=34, leading=40, textColor=TEAL,
        alignment=TA_CENTER, spaceAfter=10,
    )
    subtitle_s = ParagraphStyle(
        "Subtitle", parent=base["Normal"],
        fontSize=13, leading=18, textColor=MEDIUM_GREY,
        alignment=TA_CENTER, spaceAfter=6,
    )
    h1_s = ParagraphStyle(
        "H1", parent=base["Heading1"],
        fontSize=17, leading=22, textColor=TEAL,
        spaceBefore=18, spaceAfter=10, keepWithNext=1,
    )
    h2_s = ParagraphStyle(
        "H2", parent=base["Heading2"],
        fontSize=13, leading=17, textColor=TEAL,
        spaceBefore=10, spaceAfter=6, keepWithNext=1,
    )
    body_s = ParagraphStyle(
        "Body", parent=base["Normal"],
        fontSize=10.5, leading=15, textColor=DARK_GREY,
        spaceAfter=4,
    )
    bullet_s = ParagraphStyle(
        "Bullet", parent=body_s,
        leftIndent=18, bulletIndent=6, spaceAfter=2,
    )
    toc_title_s = ParagraphStyle(
        "TOCTitle", parent=h1_s, spaceBefore=0,
    )
    toc_item_s = ParagraphStyle(
        "TOCItem", parent=body_s,
        leftIndent=14, spaceAfter=3,
    )
    note_s = ParagraphStyle(
        "Note", parent=body_s,
        leftIndent=14, rightIndent=14,
        backColor=LIGHT_TEAL, borderColor=TEAL, borderWidth=0,
        borderPadding=8, spaceBefore=6, spaceAfter=8,
    )

    story = []

    # ───── Title page
    story.append(Spacer(1, 2.2 * inch))
    story.append(Paragraph("BCRedupath", title_s))
    story.append(Paragraph("User Manual", subtitle_s))
    story.append(Paragraph(
        '<font color="#666666">v1 Beta</font>', subtitle_s))
    story.append(Spacer(1, 0.6 * inch))
    story.append(Paragraph(
        '<i>Crack board &amp; pick your career.</i>', subtitle_s))
    story.append(Spacer(1, 0.25 * inch))
    story.append(Paragraph(
        "For CBSE Class 10 &amp; 12 students (India + NRI)", subtitle_s))
    story.append(Spacer(1, 1.5 * inch))
    story.append(Paragraph("By Bibin CutRiver", subtitle_s))
    story.append(Paragraph(
        '<a href="https://bcredupath.vercel.app" color="#0E7C7B"><u>bcredupath.vercel.app</u></a>',
        subtitle_s,
    ))
    story.append(PageBreak())

    # ───── Build TOC from h2 (## ...)
    toc_entries = [
        m.group(1).strip()
        for m in re.finditer(r"^## (.+)$", md, flags=re.M)
    ]
    story.append(Paragraph("Contents", toc_title_s))
    for entry in toc_entries:
        clean = strip_visual_clutter(entry)
        story.append(Paragraph(clean, toc_item_s))
    story.append(PageBreak())

    # ───── Body
    table_rows: list[list[str]] = []
    in_table = False
    in_list = False
    pending_bullets: list[str] = []

    def flush_bullets():
        nonlocal pending_bullets, in_list
        if pending_bullets:
            for item in pending_bullets:
                story.append(Paragraph("&bull;  " + item, bullet_s))
            pending_bullets = []
        in_list = False

    def flush_table():
        nonlocal table_rows, in_table
        if not table_rows:
            in_table = False
            return
        # Render
        rendered = []
        for row in table_rows:
            rendered.append([
                Paragraph(md_inline(cell), body_s) for cell in row
            ])
        n = len(rendered[0])
        col_w = [USABLE_W / n] * n
        t = Table(rendered, colWidths=col_w, repeatRows=1)
        t.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), TEAL),
            ("TEXTCOLOR", (0, 0), (-1, 0), white),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, 0), 10),
            ("FONTSIZE", (0, 1), (-1, -1), 9.5),
            ("LEFTPADDING", (0, 0), (-1, -1), 6),
            ("RIGHTPADDING", (0, 0), (-1, -1), 6),
            ("TOPPADDING", (0, 0), (-1, -1), 5),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ("GRID", (0, 0), (-1, -1), 0.5, BORDER_GREY),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [white, LIGHT_GREY]),
        ]))
        story.append(t)
        story.append(Spacer(1, 10))
        table_rows = []
        in_table = False

    for raw in md.split("\n"):
        line = raw.rstrip()

        # Skip metadata block + the top H1 (handled by title page)
        if line.startswith("# "):
            continue
        if line.startswith("**Tagline:") or line.startswith("**For:") or line.startswith("**Live at:"):
            continue

        if line.startswith("## "):
            flush_bullets(); flush_table()
            story.append(Paragraph(md_inline(line[3:].strip()), h1_s))
            continue

        if line.startswith("### "):
            flush_bullets(); flush_table()
            story.append(Paragraph(md_inline(line[4:].strip()), h2_s))
            continue

        # Table row
        if line.startswith("|") and line.endswith("|"):
            # Separator row (| --- | --- |)
            if re.match(r"^\|[\s\-:|]+\|$", line):
                continue
            cells = [c.strip() for c in line.strip("|").split("|")]
            table_rows.append(cells)
            in_table = True
            continue

        # End of table
        if in_table:
            flush_table()

        # Blockquote
        if line.startswith(">"):
            flush_bullets()
            story.append(Paragraph(md_inline(line[1:].strip()), note_s))
            continue

        # Bullet
        if line.startswith("- "):
            pending_bullets.append(md_inline(line[2:].strip()))
            in_list = True
            continue

        # Numbered list
        m = re.match(r"^(\d+)\. (.+)$", line)
        if m:
            flush_bullets()
            story.append(Paragraph(
                f"<b>{m.group(1)}.</b>  {md_inline(m.group(2).strip())}",
                bullet_s,
            ))
            continue

        if in_list:
            flush_bullets()

        # Horizontal rule -> thin grey separator
        if line.strip() == "---":
            story.append(Spacer(1, 4))
            sep = Table([[""]], colWidths=[USABLE_W])
            sep.setStyle(TableStyle([
                ("LINEABOVE", (0, 0), (-1, 0), 0.4, BORDER_GREY),
            ]))
            story.append(sep)
            story.append(Spacer(1, 4))
            continue

        # Blank line
        if not line.strip():
            continue

        story.append(Paragraph(md_inline(line), body_s))

    flush_bullets()
    flush_table()

    # Page numbers
    def page_footer(canvas, _doc):
        canvas.saveState()
        canvas.setFont("Helvetica", 8.5)
        canvas.setFillColor(MEDIUM_GREY)
        canvas.drawCentredString(
            PAGE_W / 2, 0.55 * inch,
            f"BCRedupath  User Manual  -  Page {canvas.getPageNumber()}",
        )
        canvas.restoreState()

    doc.build(story, onFirstPage=page_footer, onLaterPages=page_footer)
    print(f"PDF written: {PDF_PATH}")


if __name__ == "__main__":
    try:
        build()
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        raise
