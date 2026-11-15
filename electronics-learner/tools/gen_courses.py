#!/usr/bin/env python3
"""Generate Electronics Learner course packs (data/*.js). Run from repo root or here."""
from __future__ import annotations

import json
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "data"


def Q(q, options, answer, why):
    assert answer in options, (q, answer)
    assert len(options) == 4, q
    return {"q": q, "options": options, "answer": answer, "why": why}


def S(*, p=None, h=None, code=None):
    d = {}
    if h is not None:
        d["h"] = h
    if p is not None:
        d["p"] = p
    if code is not None:
        d["code"] = code
    return d


def L(id, title, summary, sections, practice):
    assert 5 <= len(practice) <= 8, (id, len(practice))
    return {
        "id": id,
        "title": title,
        "summary": summary,
        "sections": sections,
        "practice": practice,
    }


def write_course(course):
    cid = course["id"]
    prop = f"window.ELECTRONICS[{json.dumps(cid)}]" if "-" in cid else f"window.ELECTRONICS.{cid}"
    obj = {
        "id": course["id"],
        "name": course["name"],
        "title": course["title"],
        "intro": course["intro"],
        "lessons": course["lessons"],
    }
    body = json.dumps(obj, ensure_ascii=False, indent=2)
    text = (
        f"// {course['title']} — Electronics Learner. Written for this project.\n"
        "window.ELECTRONICS = window.ELECTRONICS || {};\n"
        f"{prop} = {body};\n"
    )
    path = OUT / f"{cid}.js"
    path.write_text(text, encoding="utf-8")
    n_prac = sum(len(l["practice"]) for l in course["lessons"])
    return len(course["lessons"]), n_prac


def foundations():
    return {
        "id": "foundations",
        "name": "Foundations",
        "title": "Charge, current, voltage and Ohm's law",
        "intro": (
            "Electronics starts with a few measurable quantities: charge, current, voltage, "
            "resistance and power. These lessons build those ideas with concrete numbers, then "
            "contrast AC and DC and cover the safety habits that keep beginners alive. You do not "
            "need calculus — arithmetic and careful units are enough."
        ),
        "lessons": [
            L(
                "charge",
                "Electric charge",
                "Electrons, coulombs, and why charge is conserved.",
                [
                    S(
                        p="Electric <b>charge</b> is a property of matter. Electrons carry a negative charge; "
                        "protons carry a positive charge of equal size. The SI unit is the <b>coulomb</b> (C). "
                        "One electron has about −1.6 × 10<sup>−19</sup> C, so one coulomb is roughly "
                        "6.25 × 10<sup>18</sup> electrons."
                    ),
                    S(
                        h="Conservation",
                        p="Charge is conserved: it can move from place to place, but it is not created or "
                        "destroyed in ordinary circuits. When a capacitor \"charges\", charge separates onto "
                        "its plates; the total charge of the closed system stays the same.",
                    ),
                    S(
                        h="Static vs circuit",
                        p="Static cling is charge sitting on an insulator. In a wire, charge is free to move. "
                        "Electronics mostly cares about <b>moving</b> charge — that motion is current — but "
                        "static charge still matters for ESD damage to chips.",
                    ),
                    S(
                        h="Order of magnitude",
                        p="One ampere-hour is 3600 C. A phone battery around 3000 mAh stores about 10 800 C of "
                        "separable charge at its terminals — a tiny mass of electrons, but a useful electrical packet.",
                    ),
                ],
                [
                    Q("What is the SI unit of electric charge?", ["coulomb (C)", "ampere (A)", "volt (V)", "ohm (Ω)"], "coulomb (C)", "Charge is measured in coulombs. Amperes are charge per second."),
                    Q("About how many electrons make one coulomb?", ["6.25 × 10¹⁸", "6.25 × 10³", "1.6 × 10⁻¹⁹", "Exactly one million"], "6.25 × 10¹⁸", "Each electron is about 1.6×10⁻¹⁹ C."),
                    Q("In ordinary circuits, total charge…", ["is conserved; it can only move", "is destroyed when a light turns off", "is created by resistors", "becomes heat and vanishes as charge"], "is conserved; it can only move", "Heating converts energy, not charge itself."),
                    Q("Why does a charged capacitor not violate charge conservation?", ["Equal and opposite charge separates on the plates", "Charge is created on both plates", "The dielectric makes new electrons", "Coulombs turn into volts"], "Equal and opposite charge separates on the plates", "Net charge of the pair is unchanged."),
                    Q("One ampere-hour equals how many coulombs?", ["3600 C", "1 C", "60 C", "1000 C"], "3600 C", "1 A × 3600 s = 3600 C."),
                    Q("Static cling is mainly charge that is…", ["sitting on an insulator", "flowing steadily through copper", "the same as a 5 V USB supply", "measured only in amperes"], "sitting on an insulator", "Static charge stays put until it discharges."),
                ],
            ),
            L(
                "current",
                "Electric current",
                "Amperes, direction of flow, and typical sizes.",
                [
                    S(
                        p="<b>Current</b> is the rate of charge flow. One <b>ampere</b> (A) means one coulomb "
                        "passes a point each second: I = Q / t. A milliampere (mA) is 0.001 A; a microampere "
                        "(µA) is 0.000001 A."
                    ),
                    S(
                        h="Conventional current",
                        p="Schematics draw current from the positive terminal through the load back to the "
                        "negative terminal. Electrons in metal drift the other way. Datasheets and Ohm's law "
                        "use conventional current — stay consistent.",
                    ),
                    S(
                        h="Typical sizes",
                        p="An LED indicator might draw 5–20 mA. USB charging at 1 A is a thousand milliamps. "
                        "A car starter can pull hundreds of amps briefly. A microcontroller GPIO often sources "
                        "or sinks only a few milliamps.",
                    ),
                    S(
                        h="Series fact",
                        p="In a single loop with no branches, the same current flows through every series "
                        "element. Current is not \"used up\" by a resistor; the resistor drops voltage while "
                        "the same amperes continue around the loop.",
                    ),
                    S(code="I = Q / t\n1 A = 1 C / s\n20 mA = 0.020 A"),
                ],
                [
                    Q("What does 1 ampere mean?", ["1 coulomb of charge per second", "1 volt per ohm only", "1 joule of charge", "1 electron per hour"], "1 coulomb of charge per second", "By definition I = Q/t."),
                    Q("20 mA equals…", ["0.020 A", "20 A", "0.20 A", "2000 A"], "0.020 A", "Milli means 1/1000."),
                    Q("In a simple series loop, current through each part is…", ["the same", "largest at the battery and zero at the load", "half after each resistor", "only present in wires, not resistors"], "the same", "With one path, series current is identical everywhere."),
                    Q("Conventional current is drawn…", ["from + toward − through the load", "only as electron drift direction", "from ground into the sky", "clockwise regardless of polarity"], "from + toward − through the load", "Schematics use the + to − convention."),
                    Q("Which is a plausible LED indicator current?", ["10 mA", "10 A", "10 kA", "10 µA as the only forever answer"], "10 mA", "Many indicators run around 5–20 mA."),
                    Q("If 2 C pass a point in 4 s, the current is…", ["0.5 A", "8 A", "2 A", "4 A"], "0.5 A", "I = 2/4 = 0.5 A."),
                ],
            ),
            L(
                "voltage",
                "Voltage (potential difference)",
                "Volts as energy per charge, and common supply levels.",
                [
                    S(
                        p="<b>Voltage</b> is electric potential difference: energy available per unit charge. "
                        "One <b>volt</b> (V) means one joule per coulomb: V = W / Q. A voltage at a point "
                        "always implies a reference — often circuit ground."
                    ),
                    S(
                        h="Analogy",
                        p="Think of voltage as pressure difference and current as flow rate. High pressure with "
                        "a closed valve means high voltage and nearly zero current.",
                    ),
                    S(
                        h="Common levels",
                        p="Logic boards often use 3.3 V or 5 V. AA alkaline cells start near 1.5 V. A car "
                        "battery is nominally 12 V. Mains is about 120 V or 230 V AC — treat mains as lethal.",
                    ),
                    S(
                        h="Polarity",
                        p="DC has a defined + and −. Reverse a polarized capacitor or many ICs and you can "
                        "destroy them. On a meter, red on the more positive node gives a positive reading.",
                    ),
                    S(code="V = W / Q\n1 V = 1 J / C\nUSB rail ≈ 5 V DC"),
                ],
                [
                    Q("One volt equals…", ["one joule per coulomb", "one coulomb per second", "one watt per ohm", "one ampere per metre"], "one joule per coulomb", "1 V = 1 J/C."),
                    Q("Voltage is always measured…", ["between two points (a difference)", "as an absolute property of one atom", "only across resistors, never batteries", "in coulombs"], "between two points (a difference)", "Potential difference needs a reference."),
                    Q("A fresh AA alkaline cell is about…", ["1.5 V", "12 V", "120 V", "5 V exactly always"], "1.5 V", "Single alkaline cells are nominally 1.5 V."),
                    Q("Why can \"5 V on this pin\" be incomplete?", ["You need the reference node (often ground)", "Volts are not used on pins", "Pins only carry current", "5 V means 5 A"], "You need the reference node (often ground)", "Voltage is a difference."),
                    Q("Which supply is treated as lethally dangerous here?", ["mains AC (e.g. 120 V or 230 V)", "a single AA cell", "a 3.3 V regulator output", "USB 5 V from a limited port"], "mains AC (e.g. 120 V or 230 V)", "Mains can kill."),
                    Q("If 2 C gains 10 J, the voltage rise is…", ["5 V", "20 V", "10 V", "2 V"], "5 V", "V = 10/2 = 5 V."),
                ],
            ),
            L(
                "resistance",
                "Resistance",
                "Ohms, conductors, insulators, and what resistors do.",
                [
                    S(
                        p="<b>Resistance</b> opposes current. The unit is the <b>ohm</b> (Ω). A <b>resistor</b> "
                        "is built to a chosen resistance. For many materials at fixed temperature, voltage and "
                        "current stay proportional."
                    ),
                    S(
                        h="Conductors and insulators",
                        p="Copper has very low resistance for short wires. Glass and most plastics are "
                        "insulators. A short is an unintended low-resistance path; an open is a broken path.",
                    ),
                    S(
                        h="Wire still matters",
                        p="Thin long wire has more resistance than thick short wire. At high current, even a "
                        "fraction of an ohm drops voltage and heats up.",
                    ),
                    S(
                        h="Prefixes",
                        p="1 kΩ = 1000 Ω. 1 MΩ = 1 000 000 Ω. A pull-up might be 10 kΩ; an LED series "
                        "resistor on 5 V might be a few hundred ohms.",
                    ),
                    S(code="R in ohms (Ω)\n1 kΩ = 1000 Ω\n1 MΩ = 1e6 Ω"),
                ],
                [
                    Q("The unit of resistance is the…", ["ohm (Ω)", "volt", "ampere", "farad"], "ohm (Ω)", "Resistance is measured in ohms."),
                    Q("1 kΩ equals…", ["1000 Ω", "0.001 Ω", "1 000 000 Ω", "10 Ω"], "1000 Ω", "Kilo means one thousand."),
                    Q("Copper wire is used because it has…", ["low resistance for practical lengths", "infinite resistance", "no electrons", "only capacitance"], "low resistance for practical lengths", "Copper lets charge move with little drop when sized correctly."),
                    Q("An open circuit behaves like…", ["very high (ideally infinite) resistance", "0 Ω", "a perfect short", "exactly 1 Ω"], "very high (ideally infinite) resistance", "A break stops current."),
                    Q("Why might a long thin jumper heat at high current?", ["Its resistance dissipates power (I²R)", "Resistance always falls as current rises", "Jumpers store coulombs until they melt", "Insulation color creates ohms"], "Its resistance dissipates power (I²R)", "Small R at large I still means heat."),
                    Q("A short circuit is an unintended path with…", ["very low resistance", "infinite resistance", "exactly the design load", "only inductance"], "very low resistance", "A short bypasses the intended load."),
                ],
            ),
            L(
                "ohms-law",
                "Ohm's law",
                "V = I R with worked numbers.",
                [
                    S(
                        p="<b>Ohm's law</b> for a resistor is V = I R, also I = V / R and R = V / I. "
                        "V is the voltage across the resistor, I the current through it, R its resistance."
                    ),
                    S(
                        h="LED example",
                        p="A red LED drops about 2.0 V when lit, from a 5.0 V supply. The series resistor "
                        "must drop 3.0 V. For 10 mA: R = 3.0 / 0.010 = 300 Ω. A standard 330 Ω part is common.",
                    ),
                    S(
                        h="What Ohm's law is not",
                        p="Ideal diodes, LEDs and transistors are not linear resistors. Size the resistor "
                        "around them with Ohm's law; do not treat the LED itself as a fixed R for all voltages.",
                    ),
                    S(
                        h="Check both ways",
                        p="12 V across 2.2 kΩ gives I = 12 / 2200 ≈ 5.45 mA. A wildly different meter reading "
                        "suggests a parallel path or wrong part.",
                    ),
                    S(code="V = I * R\nI = V / R\nR = V / I\n\nExample: 3 V / 0.010 A = 300 Ω"),
                ],
                [
                    Q("Ohm's law is…", ["V = I R", "P = I R only", "Q = C V only", "V = I / R"], "V = I R", "Voltage equals current times resistance."),
                    Q("5 V across 1 kΩ gives…", ["5 mA", "5 A", "0.5 mA", "500 A"], "5 mA", "I = 5/1000 = 5 mA."),
                    Q("For 3 V drop at 10 mA, R should be…", ["300 Ω", "30 Ω", "3 Ω", "3 kΩ"], "300 Ω", "R = 3/0.01 = 300 Ω."),
                    Q("Why not treat an LED as a fixed ohm value for all voltages?", ["LEDs are nonlinear after forward voltage", "LEDs never drop voltage", "Ohm's law is false for copper", "LEDs only work on AC"], "LEDs are nonlinear after forward voltage", "Use forward drop plus a series resistor."),
                    Q("12 V across 2.2 kΩ is about…", ["5.5 mA", "55 mA", "2.2 A", "12 A"], "5.5 mA", "12/2200 ≈ 5.5 mA."),
                    Q("If voltage doubles across a fixed resistor, current…", ["doubles", "halves", "stays the same", "becomes zero"], "doubles", "I = V/R scales with V."),
                ],
            ),
            L(
                "power",
                "Power and energy",
                "Watts, P = V I, and heating.",
                [
                    S(
                        p="<b>Power</b> is the rate of energy use. One <b>watt</b> (W) is one joule per second. "
                        "In DC circuits, P = V I. For a resistor: P = I² R or P = V² / R. Energy E = P × t."
                    ),
                    S(
                        h="Resistor ratings",
                        p="A common through-hole resistor is rated 1/4 W (0.25 W). At 5 V across 100 Ω, "
                        "I = 50 mA and P = 0.25 W — at the limit, so pick higher wattage or larger R for comfort.",
                    ),
                    S(
                        h="Where power goes",
                        p="In a resistor, electrical energy becomes heat. In a motor, much becomes mechanical "
                        "work plus heat. In an LED, some becomes light; most still becomes heat.",
                    ),
                    S(
                        h="Battery energy",
                        p="A 3.7 V, 2000 mAh lithium cell stores roughly 3.7 × 2.0 = 7.4 Wh (order of magnitude; "
                        "usable energy depends on discharge limits).",
                    ),
                    S(code="P = V * I\nP = I^2 * R\nP = V^2 / R\nE = P * t"),
                ],
                [
                    Q("DC electrical power is…", ["P = V I", "P = V / I", "P = V + I", "P = Q / t"], "P = V I", "Power equals voltage times current."),
                    Q("A 1/4 W resistor may dissipate up to about…", ["0.25 W", "4 W", "25 W", "0.025 W"], "0.25 W", "Quarter-watt is 0.25 W."),
                    Q("2 A through 0.5 Ω dissipates…", ["2 W", "1 W", "0.5 W", "4 W"], "2 W", "P = I²R = 4 × 0.5 = 2 W."),
                    Q("Energy equals…", ["power × time", "power / time", "voltage × charge only as current", "ohms × amperes"], "power × time", "E = P t."),
                    Q("Why does a small resistor get hot at high current?", ["I²R heating", "Ohms create photons only", "Current destroys charge inside R", "Voltage cannot exist across R"], "I²R heating", "Power in a resistor becomes heat."),
                    Q("5 V at 100 mA is…", ["0.5 W", "5 W", "50 W", "0.05 W"], "0.5 W", "P = 5 × 0.1 = 0.5 W."),
                ],
            ),
            L(
                "ac-dc",
                "AC versus DC",
                "Steady polarity vs alternating, and why both exist.",
                [
                    S(
                        p="<b>DC</b> keeps the same polarity: batteries, USB rails, most logic supplies. "
                        "<b>AC</b> reverses polarity over time. Mains is AC at 50 Hz or 60 Hz depending on region."
                    ),
                    S(
                        h="Why AC for mains",
                        p="Transformers need changing magnetic fields, so AC made long-distance voltage "
                        "conversion practical. Household outlets remain AC even though modern DC links exist.",
                    ),
                    S(
                        h="RMS",
                        p="AC voltage is often quoted as RMS. About 120 V RMS has peak near 170 V. Do not "
                        "treat RMS as the peak when rating capacitors on the AC side.",
                    ),
                    S(
                        h="Rectification",
                        p="Power supplies turn AC into DC with diodes, capacitors and regulators. A phone "
                        "brick's USB cable carries DC even though the wall side is AC.",
                    ),
                    S(
                        h="Safety",
                        p="Never probe mains casually. Capacitors on the AC side can stay charged after "
                        "unplugging. Prefer batteries, USB power banks, or current-limited lab supplies.",
                    ),
                    S(code="DC: polarity fixed (e.g. +5 V to GND)\nAC: polarity alternates (mains 50/60 Hz)\nVpeak ≈ Vrms * √2  (sine)"),
                ],
                [
                    Q("A battery provides…", ["DC", "50 Hz AC only", "RMS without polarity", "only magnetic fields"], "DC", "Cells have fixed polarity."),
                    Q("Household mains is typically…", ["AC at 50 or 60 Hz", "pure DC at 5 V", "DC at 120 V with no ripple", "only static charge"], "AC at 50 or 60 Hz", "Line frequency is 50 or 60 Hz."),
                    Q("For a sine wave, peak relates to RMS by…", ["Vpeak ≈ Vrms × √2", "Vpeak = Vrms / 2", "Vpeak = Vrms", "Vpeak = 2π Vrms as a definition"], "Vpeak ≈ Vrms × √2", "Peak is √2 times RMS for a sine."),
                    Q("A phone charger's USB output is…", ["DC (regulated)", "raw 230 V AC", "only RF", "a 60 Hz square wave on VBUS normally"], "DC (regulated)", "The brick rectifies and regulates."),
                    Q("Why prefer lab supplies and batteries for practice?", ["mains can kill; limited low voltage is safer", "AC cannot light an LED", "batteries have no voltage", "Ohm's law fails on DC"], "mains can kill; limited low voltage is safer", "Learn on low voltage first."),
                    Q("Transformers historically favored AC because…", ["changing current enables transformer action", "AC has no frequency", "DC cannot exist in wires", "ohms only apply to AC"], "changing current enables transformer action", "Transformers need time-varying flux."),
                ],
            ),
            L(
                "meters",
                "Measuring with a multimeter",
                "Voltage, current and resistance the safe way.",
                [
                    S(
                        p="A <b>digital multimeter</b> (DMM) measures voltage, current and resistance. Wrong "
                        "jack or mode can blow a fuse — or worse on mains. Start on a battery-powered circuit."
                    ),
                    S(
                        h="Voltage mode",
                        p="Select V DC. Put probes in parallel with the part. You do not open the circuit to "
                        "measure voltage.",
                    ),
                    S(
                        h="Current mode",
                        p="Put the meter in series. Move the red lead to the current jack if required. Start "
                        "on a high range. Never put current-mode probes across a supply like a voltmeter.",
                    ),
                    S(
                        h="Resistance and continuity",
                        p="Measure resistance with power off. Continuity beep finds low-resistance paths — "
                        "also power off. Charged capacitors confuse ohm readings.",
                    ),
                ],
                [
                    Q("Measure voltage across a resistor by connecting…", ["in parallel with the resistor", "in series after breaking one lead for volts", "only AC mode for DC batteries", "between earth and the moon"], "in parallel with the resistor", "Voltmeters share the part's two nodes."),
                    Q("Measure LED current with the meter…", ["in series with the LED", "in parallel with the supply rails", "on ohms mode while powered", "disconnected from both jacks"], "in series with the LED", "Ammeters become part of the loop."),
                    Q("Current-mode across a battery is dangerous because…", ["it shorts the battery through the meter", "batteries have no current", "voltage mode is a short", "probes cancel coulombs"], "it shorts the battery through the meter", "An ammeter is nearly a short."),
                    Q("Resistance should be measured with the circuit…", ["unpowered", "at full load current", "connected to mains", "only while soldering"], "unpowered", "Live voltages wreck ohm readings."),
                    Q("Continuity beep helps find…", ["shorts or unbroken connections (power off)", "exact watt-hours", "AC frequency only", "magnetic north"], "shorts or unbroken connections (power off)", "Low resistance makes the beeper sound."),
                    Q("Black probe is conventionally on…", ["the reference / COM / ground side", "only the + of a battery", "the soldering iron tip", "antenna connectors only"], "the reference / COM / ground side", "COM is the meter's common jack."),
                ],
            ),
            L(
                "safety",
                "Safety basics",
                "Mains, heat, batteries, and eye protection.",
                [
                    S(
                        p="<b>Safety first.</b> Low-voltage battery and USB projects are the right place to "
                        "learn. Mains can kill. Even low voltage can start fires with a shorted lithium pack."
                    ),
                    S(
                        h="Mains and wall warts",
                        p="Do not open mains-powered equipment unless trained. Capacitors can hold charge after "
                        "unplugging. Prefer isolated lab supplies and sealed commercial USB adapters.",
                    ),
                    S(
                        h="Heat and soldering",
                        p="Soldering irons are typically 300–400 °C. Use a stand, never catch a falling iron, "
                        "and work with ventilation. See the soldering course for joint and fume detail.",
                    ),
                    S(
                        h="Eyes, skin, lithium",
                        p="Wear eye protection when clipping leads or desoldering. Do not puncture or short "
                        "Li-ion cells; charge only with proper chargers. A puffed pack is scrap.",
                    ),
                    S(
                        h="Current-limited supplies",
                        p="A bench supply limited to 100–200 mA turns many wiring mistakes into teachable "
                        "moments instead of smoked traces.",
                    ),
                ],
                [
                    Q("For first circuits, prefer…", ["battery, USB, or current-limited lab supplies", "bare mains from a wall outlet", "microwave oven transformers", "unprotected jump-start packs on a breadboard"], "battery, USB, or current-limited lab supplies", "Keep energy and voltage forgiving."),
                    Q("An unplugged supply can still shock you because…", ["filter capacitors may remain charged", "AC becomes safe the instant the plug moves", "copper forgets voltage after 1 s", "ohms disappear when unplugged"], "filter capacitors may remain charged", "Stored charge is a classic hazard."),
                    Q("A soldering iron tip is typically…", ["hundreds of °C — use a stand", "warm like tea", "safe to test with fingers", "only dangerous on AC mode"], "hundreds of °C — use a stand", "Treat the iron as a burn hazard."),
                    Q("A puffed lithium pack should be…", ["taken out of service and recycled properly", "punctured to relieve pressure", "charged faster to reshape it", "shorted to reset it"], "taken out of service and recycled properly", "Swelling means the cell is unsafe."),
                    Q("Eye protection matters especially when…", ["clipping leads or desoldering", "only reading datasheets", "measuring 1.5 V", "drawing schematics"], "clipping leads or desoldering", "Leads and solder blobs can fly."),
                    Q("A current-limited bench supply helps because…", ["faults hit the limit instead of dumping huge current", "it removes the need for resistors", "it makes mains abstractly safe", "it disables Ohm's law"], "faults hit the limit instead of dumping huge current", "Limits turn shorts into recoverable mistakes."),
                ],
            ),
        ],
    }


def components():
    return {
        "id": "components",
        "name": "Components",
        "title": "Resistors, capacitors, semiconductors and sensors",
        "intro": (
            "Parts are how you build circuits. These lessons cover the everyday passives, then diodes, "
            "LEDs, a first look at BJT and MOSFET transistors, and a tour of common sensors. Values, "
            "symbols and one concrete use case matter more than memorising every variant."
        ),
        "lessons": [
            L(
                "resistors",
                "Resistors",
                "Fixed resistors, ratings, and reading values.",
                [
                    S(
                        p="A <b>resistor</b> sets a known opposition to current. Carbon-film and metal-film "
                        "through-hole parts are common on breadboards; chip resistors (0402, 0603, 0805…) "
                        "dominate PCBs."
                    ),
                    S(
                        h="Value and tolerance",
                        p="A 10 kΩ ±5% resistor can be about 9.5–10.5 kΩ. Metal-film 1% parts are cheap and "
                        "preferred for dividers that need accuracy. Power rating (1/8 W, 1/4 W, 1 W…) limits heat.",
                    ),
                    S(
                        h="Colour bands (through-hole)",
                        p="Four-band code: digit, digit, multiplier, tolerance. Example: brown-black-orange-gold "
                        "is 10 × 10³ Ω = 10 kΩ ±5%. When unsure, measure with a meter (power off).",
                    ),
                    S(
                        h="Special kinds",
                        p="Potentiometers are adjustable resistors. Thermistors change with temperature. LDRs "
                        "change with light. Fusible resistors are meant to open safely under fault — not a toy.",
                    ),
                    S(
                        code="Symbol: zigzag or rectangle\n\n   Vin ----[ R ]---- Vout\n              |\n             GND  (divider lower R)",
                    ),
                ],
                [
                    Q("A resistor's main job is to…", ["oppose current by a designed amount", "store charge like a battery", "amplify signals", "generate AC from DC"], "oppose current by a designed amount", "That is what resistance is for."),
                    Q("Brown-black-orange-gold through-hole coding is commonly…", ["10 kΩ ±5%", "10 Ω ±5%", "1 MΩ ±5%", "100 Ω ±1%"], "10 kΩ ±5%", "10 with multiplier 10³ and gold ±5%."),
                    Q("If a divider needs better accuracy, prefer…", ["1% metal-film (or better)", "any 20% carbon composition", "a random wirewound of unknown value", "an open circuit"], "1% metal-film (or better)", "Tighter tolerance reduces divider error."),
                    Q("Power rating tells you…", ["how much heat the part can shed continuously", "the exact resistance", "the maximum voltage of the galaxy", "the colour of the band"], "how much heat the part can shed continuously", "Exceeding wattage cooks the resistor."),
                    Q("A potentiometer is…", ["an adjustable resistor", "a type of diode", "always 1 Ω", "a crystal oscillator"], "an adjustable resistor", "A pot lets you vary R with a shaft or slider."),
                    Q("Before trusting colour bands, a good check is…", ["measure with a meter, power off", "lick the leads", "apply 230 V AC", "paint over the bands"], "measure with a meter, power off", "Meters beat guessing."),
                ],
            ),
            L(
                "capacitors",
                "Capacitors",
                "Storing charge, farads, and common types.",
                [
                    S(
                        p="A <b>capacitor</b> stores energy in an electric field between conductors separated "
                        "by an insulator (dielectric). Capacitance C is in <b>farads</b> (F). Practical parts "
                        "are µF, nF or pF. Q = C V for the charge on the plates."
                    ),
                    S(
                        h="Behaviour",
                        p="Capacitors block steady DC once charged and pass changing signals. That is why they "
                        "appear as coupling and decoupling parts. Bigger C stores more charge at the same voltage.",
                    ),
                    S(
                        h="Types",
                        p="Ceramic (often MLCC) are small and non-polar. Electrolytic and tantalum are polar — "
                        "reverse voltage can destroy them, sometimes violently. Film capacitors are common in "
                        "analog audio and snubbers.",
                    ),
                    S(
                        h="Voltage rating",
                        p="A 16 V electrolytic on a 12 V rail is common. Derate: do not run polar caps at the "
                        "ragged edge of their voltage rating, especially with ripple and heat.",
                    ),
                    S(
                        code="i = C * dV/dt   (ideal)\nQ = C * V\n\n  ---||---   non-polar ceramic\n  ---| )---  polar electrolytic (curved = minus)",
                    ),
                ],
                [
                    Q("The unit of capacitance is the…", ["farad (F)", "henry", "ohm", "watt"], "farad (F)", "C is measured in farads."),
                    Q("Q = C V means…", ["charge equals capacitance times voltage", "current equals capacitance times voltage", "power equals C times V", "resistance equals C times V"], "charge equals capacitance times voltage", "That is the defining relation for Q, C, V."),
                    Q("After charging from DC, an ideal capacitor…", ["blocks further steady DC current", "looks like a short forever", "becomes a battery with unlimited amp-hours", "turns into an inductor"], "blocks further steady DC current", "Once voltage is steady, current into C is zero."),
                    Q("Electrolytic capacitors are usually…", ["polarized — watch the minus stripe", "happy with reverse voltage", "only made in 0.1 pF", "identical to wire links"], "polarized — watch the minus stripe", "Reverse polarity can destroy electrolytics."),
                    Q("Decoupling capacitors near ICs mainly…", ["supply brief current and quiet the supply", "set the CPU clock frequency alone", "replace the need for ground", "convert 5 V to 230 V"], "supply brief current and quiet the supply", "Local charge reservoir against switching spikes."),
                    Q("A 100 nF part is…", ["0.1 µF", "100 µF", "0.001 µF", "100 F"], "0.1 µF", "100 nF = 0.1 µF."),
                ],
            ),
            L(
                "inductors",
                "Inductors",
                "Magnetic storage, henries, and where you meet them.",
                [
                    S(
                        p="An <b>inductor</b> stores energy in a magnetic field when current flows. Inductance "
                        "L is in <b>henries</b> (H). Hobby parts are often µH or mH. Ideal relation: "
                        "v = L di/dt — voltage appears when current tries to change."
                    ),
                    S(
                        h="Behaviour",
                        p="Inductors resist sudden current change. They pass steady DC (apart from winding "
                        "resistance) and impede high-frequency AC. That makes them useful in filters and switch-mode supplies.",
                    ),
                    S(
                        h="Kickback",
                        p="Interrupt current in a coil (relay, motor) and the inductor makes a voltage spike. "
                        "A <b>flyback diode</b> across a DC relay coil gives that current a safe path.",
                    ),
                    S(
                        h="Transformers",
                        p="Coupled inductors make transformers: AC on a primary induces voltage on a secondary. "
                        "DC alone on a quiet primary does not transfer power through an ideal transformer.",
                    ),
                    S(code="v = L * di/dt\n\n  relay coil\n  +----) )----+----+\n  |    ) )    |    |\n  |    ) )   diode |\n  |           |    |\n  +-----------+   GND\n   (diode oriented to catch kickback)"),
                ],
                [
                    Q("The unit of inductance is the…", ["henry (H)", "farad", "coulomb", "pascal"], "henry (H)", "L is measured in henries."),
                    Q("v = L di/dt says voltage appears when…", ["current changes with time", "current is perfectly constant forever", "only voltage is zero", "charge is measured in watts"], "current changes with time", "Inductors react to changing current."),
                    Q("At steady DC, an ideal inductor looks like…", ["a short (0 Ω) aside from wire resistance", "an open circuit", "a perfect capacitor", "a 1 MΩ resistor always"], "a short (0 Ω) aside from wire resistance", "No di/dt means no inductive voltage."),
                    Q("A flyback diode on a relay coil…", ["gives kickback current a safe path", "increases coil voltage unboundedly", "turns the relay into an LED", "removes the need for a transistor"], "gives kickback current a safe path", "It clamps the inductive spike."),
                    Q("Switch-mode power supplies use inductors to…", ["store and transfer energy each switching cycle", "create permanent magnets only", "measure temperature", "replace batteries chemically"], "store and transfer energy each switching cycle", "Buck/boost topologies centre on L."),
                    Q("Transformers need…", ["changing current / AC (or pulsed drive)", "pure quiet DC forever on both sides", "only resistance, never magnetism", "a farad rating"], "changing current / AC (or pulsed drive)", "Time-varying flux links the windings."),
                ],
            ),
            L(
                "diodes",
                "Diodes",
                "One-way current and forward voltage.",
                [
                    S(
                        p="A <b>diode</b> allows current easily in one direction (forward) and blocks the other "
                        "(reverse), within ratings. Silicon signal diodes often drop about 0.6–0.7 V when forward "
                        "conducting; Schottky diodes drop less (often ~0.2–0.4 V)."
                    ),
                    S(
                        h="Rectifiers",
                        p="Power diodes turn AC into pulsing DC. A bridge rectifier uses four diodes. After "
                        "rectification, capacitors smooth the result.",
                    ),
                    S(
                        h="Ratings",
                        p="Watch forward current (e.g. 1 A) and reverse voltage (PIV / V_RRM). Exceed reverse "
                        "voltage and the diode can avalanche or fail.",
                    ),
                    S(
                        h="Zener diodes",
                        p="Zeners are used in reverse to hold an approximate voltage when current is limited "
                        "by a resistor. They are for references and clamps, not heavy power regulation alone.",
                    ),
                    S(
                        code="   anode >|— cathode\n\nForward: current anode → cathode, ~0.7 V (Si)\nReverse: blocks (until rating exceeded)",
                    ),
                ],
                [
                    Q("A diode's everyday job is to…", ["conduct one way and block the other", "store magnetic energy", "amplify voltage without power", "measure humidity"], "conduct one way and block the other", "That is diode behaviour."),
                    Q("A silicon diode forward drop is typically about…", ["0.6–0.7 V", "0 V exactly", "5 V always", "12 V"], "0.6–0.7 V", "Silicon PN junctions sit near 0.7 V when conducting."),
                    Q("Schottky diodes are chosen when you want…", ["lower forward drop than silicon PN", "higher drop for more heat", "no polarity at all", "only RF antennas"], "lower forward drop than silicon PN", "Schottky ≈ 0.2–0.4 V often."),
                    Q("PIV / reverse rating matters because…", ["too much reverse voltage can destroy the diode", "forward current ignores all limits", "ohms become farads", "colour bands encode reverse volts"], "too much reverse voltage can destroy the diode", "Stay within V_RRM."),
                    Q("A bridge rectifier's job is to…", ["turn AC into pulsing DC", "store 1 farad exactly", "create Wi-Fi", "remove the need for capacitors always"], "turn AC into pulsing DC", "Four diodes steer both half-cycles."),
                    Q("A Zener in reverse with a series resistor is often used as…", ["a simple voltage reference / clamp", "a loudspeaker", "a fuse only", "a crystal"], "a simple voltage reference / clamp", "Zeners hold an approximate reverse voltage."),
                ],
            ),
            L(
                "leds",
                "LEDs",
                "Light-emitting diodes and current limiting.",
                [
                    S(
                        p="An <b>LED</b> is a diode that emits light when forward current flows. Forward voltage "
                        "depends on colour and chemistry: often ~1.8–2.2 V for red, ~3.0–3.3 V for blue/white. "
                        "Always use a series resistor or a constant-current driver."
                    ),
                    S(
                        h="Sizing the resistor",
                        p="From 5 V to a 2 V red LED at 10 mA: R = (5 − 2) / 0.010 = 300 Ω → use 330 Ω. "
                        "Too little resistance and the LED (or GPIO) dies; too much and it is simply dim.",
                    ),
                    S(
                        h="Polarity",
                        p="Long lead / anode to the more positive side through the resistor; flat edge / cathode "
                        "toward ground in many packages. If it does not light, check orientation before raising current.",
                    ),
                    S(
                        h="Power LEDs",
                        p="Watt-class LEDs need heatsinks and proper drivers. Parallel LEDs without per-string "
                        "control share current poorly. Series strings need enough voltage headroom.",
                    ),
                    S(
                        code="5V ---[ 330Ω ]---|>|--- GND   (red LED ~2 V, ~9 mA)\n\nI ≈ (Vsup - Vf) / R",
                    ),
                ],
                [
                    Q("LEDs need a series resistor or current driver because…", ["current rises steeply after Vf", "LEDs are perfect 1 kΩ resistors", "light requires AC only", "GPIO pins supply unlimited amps safely"], "current rises steeply after Vf", "Without limiting, current runs away."),
                    Q("(5 V − 2 V) / 0.01 A equals…", ["300 Ω", "50 Ω", "5 Ω", "5000 Ω"], "300 Ω", "Ohm's law on the resistor drop."),
                    Q("Blue/white LEDs often have Vf near…", ["3.0–3.3 V", "0.1 V", "12 V", "0 V"], "3.0–3.3 V", "Wide-bandgap LEDs sit higher than red."),
                    Q("If an LED does not light, first checks include…", ["polarity and the series resistor", "removing the resistor for more current", "applying mains", "shorting anode to cathode"], "polarity and the series resistor", "Orientation and limiting come first."),
                    Q("Putting many LEDs in parallel off one resistor is risky because…", ["they share current poorly", "parallel always halves light evenly forever", "Vf becomes negative", "Ohm's law stops"], "they share current poorly", "Mismatched Vf steals current."),
                    Q("An LED is still a diode, so reverse voltage…", ["should stay within its reverse rating (often low)", "is unlimited and safe", "makes it brighter", "charges a battery inside"], "should stay within its reverse rating (often low)", "Many indicator LEDs tolerate only a few reverse volts."),
                ],
            ),
            L(
                "bjt",
                "BJT transistors (intro)",
                "Current-controlled switches and amplifiers.",
                [
                    S(
                        p="A <b>BJT</b> (bipolar junction transistor) has three terminals: collector, base, "
                        "emitter (NPN) or emitter, base, collector (PNP). A small base current controls a larger "
                        "collector current. Rough rule in active mode: I_C ≈ β I_B, with β often 50–300."
                    ),
                    S(
                        h="NPN switch",
                        p="Emitter to ground, collector to the load then to +V, base driven through a resistor "
                        "from a GPIO. When the base is driven, collector current lights a lamp or relay coil "
                        "(add a flyback diode on coils).",
                    ),
                    S(
                        h="Saturation",
                        p="As a switch, design for saturation: enough base current so V_CE is small (often "
                        "<0.2 V). Rule of thumb: I_B ≈ I_C / 10 for switching, more conservative than β alone.",
                    ),
                    S(
                        h="Limits",
                        p="Watch V_CEO, I_C max, and power. BJTs drop more voltage than a good MOSFET switch "
                        "at high current, so MOSFETs dominate many power switches — next lesson.",
                    ),
                    S(
                        code="5V ---[load]---+---c NPN\n               b---[Rb]--- GPIO\n               e--- GND\n\nI_C ≈ β * I_B  (active)\nSwitch: aim I_B ≈ I_C / 10",
                    ),
                ],
                [
                    Q("In an NPN, the three terminals are…", ["collector, base, emitter", "gate, drain, source only", "anode and cathode only", "VCC, VBB, VEE as physical pins always named that"], "collector, base, emitter", "Those are the BJT terminals."),
                    Q("β (beta) roughly means…", ["I_C / I_B in the active region", "V_CE / I_C always", "resistance of the collector", "LED forward voltage"], "I_C / I_B in the active region", "Current gain relates collector to base."),
                    Q("For switching, a common base-current rule of thumb is…", ["I_B ≈ I_C / 10", "I_B = 0 always", "I_B = 10 × I_C", "I_B = I_C × β²"], "I_B ≈ I_C / 10", "Force saturation harder than β alone suggests."),
                    Q("A relay coil on a BJT collector needs…", ["a flyback diode", "no diode ever", "AC mains on the base", "zero collector resistor and infinite current"], "a flyback diode", "Inductive kickback must be clamped."),
                    Q("GPIO → base needs a resistor mainly to…", ["limit base current", "increase β magically", "store henries", "convert the BJT into a capacitor"], "limit base current", "Rb sets I_B ≈ (Vgpio − Vbe)/Rb."),
                    Q("Compared with power MOSFETs at high current, BJT switches often…", ["drop more voltage and waste more heat", "have zero V_CE always", "need no base current ever", "cannot switch relays"], "drop more voltage and waste more heat", "R_DS(on) of FETs often wins at low voltage high current."),
                ],
            ),
            L(
                "mosfet",
                "MOSFET transistors (intro)",
                "Voltage-controlled switches for loads and logic.",
                [
                    S(
                        p="A <b>MOSFET</b> uses a gate voltage to control current between drain and source. "
                        "Gate current is tiny at DC (mostly charging capacitance). N-channel low-side switches "
                        "are common: load from +V to drain, source to ground, gate driven from a GPIO or driver."
                    ),
                    S(
                        h="Threshold and logic-level",
                        p="V_GS(th) is when the FET just begins to conduct — not when it is a good switch. "
                        "For 3.3 V GPIO, pick a <b>logic-level</b> FET with low R_DS(on) at 3.3 V or 4.5 V on the datasheet graph.",
                    ),
                    S(
                        h="R_DS(on) and heat",
                        p="When on, the FET looks like a small resistor. P ≈ I² R_DS(on). A 10 mΩ FET at 5 A "
                        "dissipates about 0.25 W — still needs copper and sometimes a heatsink at higher current.",
                    ),
                    S(
                        h="Gate care",
                        p="Gates are ESD-sensitive. A gate-source resistor (e.g. 100 kΩ) keeps the FET off if "
                        "the driver floats. Gate resistors (10–100 Ω) can tame ringing with long wires.",
                    ),
                    S(
                        code="5V ---[load]---+---d  N-MOSFET\n               g---[Rg]--- GPIO\n               |\n              [100k]\n               |\n               s--- GND",
                    ),
                ],
                [
                    Q("A MOSFET is primarily controlled by…", ["gate-to-source voltage", "large continuous gate current like a BJT base", "collector beta only", "LED colour"], "gate-to-source voltage", "FETs are voltage-driven at DC."),
                    Q("V_GS(th) is…", ["where conduction just begins — not full enhancement", "the guaranteed R_DS(on) point", "always 12 V", "the drain fuse rating"], "where conduction just begins — not full enhancement", "Use R_DS(on) graphs at your gate voltage."),
                    Q("Logic-level MOSFETs are important for…", ["switching well from 3.3 V / 5 V GPIO", "mains soft-start only", "replacing resistors in dividers", "FM radio tuning exclusively"], "switching well from 3.3 V / 5 V GPIO", "Many FETs need 10 V gate for full on."),
                    Q("At 5 A through 10 mΩ R_DS(on), heat is about…", ["0.25 W", "50 W", "0.01 W", "5 W"], "0.25 W", "P = 25 × 0.01 = 0.25 W."),
                    Q("A gate-source pull-down helps…", ["keep the FET off if the drive floats", "increase R_DS(on) unboundedly", "charge the battery", "remove ESD forever without handling care"], "keep the FET off if the drive floats", "Floating gates are unpredictable."),
                    Q("N-channel low-side switch puts the load…", ["between +V and the drain", "between source and +V with source at +V only", "only on the gate pin", "in series with the gate resistor alone"], "between +V and the drain", "Classic low-side topology."),
                ],
            ),
            L(
                "sensors",
                "Sensors overview",
                "Turning physical quantities into voltages, currents or bits.",
                [
                    S(
                        p="<b>Sensors</b> convert temperature, light, motion, distance, chemistry and more into "
                        "electrical signals. Some are analog (a voltage you measure with an ADC); some are "
                        "digital (I²C/SPI words or a simple high/low pin)."
                    ),
                    S(
                        h="Analog examples",
                        p="A potentiometer is a position sensor. A photoresistor divider senses light. Many "
                        "thermistor circuits are dividers into an ADC. Scale and noise matter: add filtering and calibration.",
                    ),
                    S(
                        h="Digital examples",
                        p="DHT-style humidity modules spit serial bits. IMUs report acceleration over SPI/I²C. "
                        "A PIR motion module often gives a simple digital alarm pin.",
                    ),
                    S(
                        h="Interfacing tips",
                        p="Match voltages (3.3 V sensor on a 5 V ADC needs care). Provide clean decoupling. "
                        "Do not share noisy motor grounds carelessly with microvolt sensor returns. Read the "
                        "absolute maximum ratings before wiring.",
                    ),
                    S(
                        h="From signal to meaning",
                        p="A raw ADC count is not \"°C\" until you apply a transfer function and calibration. "
                        "Datasheets give typical curves; real parts need checking.",
                    ),
                ],
                [
                    Q("A sensor's job is to…", ["convert a physical quantity into an electrical signal", "only store charge", "replace the power supply", "solder joints automatically"], "convert a physical quantity into an electrical signal", "That is the definition used here."),
                    Q("An analog sensor typically gives…", ["a voltage or current to measure", "only Wi-Fi packets", "magnetic henries as text", "AC mains directly"], "a voltage or current to measure", "ADCs read those levels."),
                    Q("I²C temperature chips are examples of…", ["digital-output sensors", "purely mechanical sensors with no pins", "mains transformers", "flyback diodes"], "digital-output sensors", "They speak a bus protocol."),
                    Q("Why does voltage matching matter?", ["a 5 V signal can damage a 3.3 V input", "all MCUs accept 24 V I/O", "sensors ignore Vcc", "ADC means automatic damage control"], "a 5 V signal can damage a 3.3 V input", "Respect I/O absolute maxima."),
                    Q("A thermistor is often read as…", ["part of a resistor divider into an ADC", "a UART ASCII thermometer with no wiring", "a MOSFET gate driver", "an SMA antenna"], "part of a resistor divider into an ADC", "Resistance changes with temperature."),
                    Q("Raw ADC counts become useful units after…", ["calibration / transfer function", "removing the sensor", "shorting Vref to ground", "doubling without reason"], "calibration / transfer function", "Counts need scaling and often calibration."),
                ],
            ),
            L(
                "passives-more",
                "Switches, buzzers and connectors",
                "The mechanical and interconnect parts every bench needs.",
                [
                    S(
                        p="Not every part is a semiconductor. <b>Switches</b>, <b>buttons</b>, <b>connectors</b>, "
                        "<b>speakers/buzzers</b> and <b>relays</b> show up in almost every project."
                    ),
                    S(
                        h="Switches and bounce",
                        p="A push-button with a pull-up reads low when pressed. Mechanical contacts bounce: "
                        "the signal chatters for milliseconds. Debounce in software or with a small RC / logic.",
                    ),
                    S(
                        h="Relays",
                        p="A relay is an electrically controlled switch. Coil side is low voltage; contact side "
                        "might be a different circuit — still respect isolation and ratings. Use a flyback diode "
                        "on DC coils.",
                    ),
                    S(
                        h="Connectors",
                        p="USB, barrel jacks, pin headers, screw terminals: each has current and mating-cycle "
                        "limits. Strain-relief wires so the solder joint is not the hinge.",
                    ),
                    S(
                        h="Buzzers",
                        p="Magnetic buzzers may need a driver transistor. Piezo elements are mostly capacitive "
                        "loads — drive them with care and do not expect huge bass from a tiny disc.",
                    ),
                ],
                [
                    Q("Button bounce means…", ["contacts chatter briefly when opening/closing", "the MCU runs faster", "pull-ups stop working forever", "LEDs change colour"], "contacts chatter briefly when opening/closing", "Debounce filters that chatter."),
                    Q("A pull-up on a button to ground makes an unpressed read…", ["high", "low", "AC", "high-Z watts"], "high", "Pull-up defines the idle level."),
                    Q("DC relay coils need a flyback diode because…", ["inductive kickback can spike the driver", "relays run only on light", "diodes increase coil resistance unboundedly", "GPIO can absorb infinite energy"], "inductive kickback can spike the driver", "Clamp the coil."),
                    Q("Strain relief on a cable protects…", ["the solder joints and connector shell", "only the silk-screen text", "the colour of the enclosure", "ADC reference forever"], "the solder joints and connector shell", "Wires should not hinge on copper alone."),
                    Q("A relay is best described as…", ["an electrically controlled switch", "a type of ADC", "a crystal oscillator", "a non-polar electrolytic"], "an electrically controlled switch", "Coil controls contacts."),
                    Q("Piezo buzzers behave electrically a bit like…", ["capacitive loads", "ideal 0 Ω shorts", "lithium cells", "50 Ω antennas always"], "capacitive loads", "Piezo discs look capacitive."),
                ],
            ),
        ],
    }


def circuits():
    return {
        "id": "circuits",
        "name": "Circuits",
        "title": "Series, parallel, Kirchhoff and building blocks",
        "intro": (
            "Once you know parts, you wire them. These lessons cover series and parallel networks, "
            "Kirchhoff's laws, dividers, RC timing, filter intuition, a first look at amplifiers, and "
            "how to read a schematic without getting lost."
        ),
        "lessons": [
            L(
                "series",
                "Series circuits",
                "One path: shared current, voltages add.",
                [
                    S(
                        p="In a <b>series</b> circuit, components share one current path. The same current "
                        "flows through each part. Voltages across the parts add up to the source voltage "
                        "(Kirchhoff's voltage law in a single loop)."
                    ),
                    S(
                        h="Resistors in series",
                        p="R_total = R1 + R2 + … Two 1 kΩ in series make 2 kΩ. Stringing resistors raises "
                        "resistance and shares voltage.",
                    ),
                    S(
                        h="Failure mode",
                        p="If any series element goes open, the whole loop stops. Christmas lights of old "
                        "failed this way when one bulb opened.",
                    ),
                    S(
                        code="  +V ---[R1]---[R2]---[R3]--- GND\n\nI same through R1,R2,R3\nV1+V2+V3 = Vsource\nRtot = R1+R2+R3",
                    ),
                ],
                [
                    Q("Series elements share…", ["the same current", "the same voltage always", "no relationship", "only magnetic fields"], "the same current", "One path means one current."),
                    Q("Two 2 kΩ resistors in series equal…", ["4 kΩ", "1 kΩ", "2 kΩ", "0 Ω"], "4 kΩ", "Series resistances add."),
                    Q("Voltages across series resistors…", ["add to the source voltage", "are each equal to the source", "must each be zero", "subtract electrons"], "add to the source voltage", "KVL around the loop."),
                    Q("An open in a series loop…", ["stops current in the whole loop", "doubles current", "affects only the next part downstream magically", "shorts the source safely"], "stops current in the whole loop", "The path is broken."),
                    Q("Three equal resistors in series across 12 V each drop…", ["4 V", "12 V", "36 V", "0 V"], "4 V", "Equal R share voltage equally."),
                    Q("LED + series resistor is a series circuit because…", ["the same current flows through both", "they share voltage equally always", "LEDs cancel ohms", "order does not exist"], "the same current flows through both", "One loop through both parts."),
                ],
            ),
            L(
                "parallel",
                "Parallel circuits",
                "Shared voltage, currents add.",
                [
                    S(
                        p="In a <b>parallel</b> circuit, components share the same two nodes — the same "
                        "voltage appears across each branch. Branch currents add to the total supply current."
                    ),
                    S(
                        h="Resistors in parallel",
                        p="1/R_total = 1/R1 + 1/R2 + … Two equal resistors in parallel make half the resistance. "
                        "Two 1 kΩ in parallel → 500 Ω.",
                    ),
                    S(
                        h="Loads on a supply rail",
                        p="Every module on a 5 V rail is roughly in parallel on that rail. Total current is "
                        "the sum of module currents. Undersized supplies brown out when the sum exceeds rating.",
                    ),
                    S(
                        code="  +V ---+---[R1]---+\n       |          |\n       +---[R2]---+\n       |          |\n      GND        GND\n\nV same on both; I_total = I1+I2",
                    ),
                ],
                [
                    Q("Parallel branches share…", ["the same voltage", "the same current always", "no common nodes", "only temperature"], "the same voltage", "Same two nodes means same V."),
                    Q("Two 1 kΩ in parallel equal…", ["500 Ω", "2 kΩ", "1 kΩ", "0 Ω"], "500 Ω", "Equal parallels halve R."),
                    Q("Branch currents in a parallel network…", ["add to the total current", "must each equal the total", "cancel to zero always", "are measured in farads"], "add to the total current", "KCL at the supply node."),
                    Q("Adding more parallel loads on a rail usually…", ["increases total current draw", "decreases total current", "raises rail voltage unboundedly", "removes the need for ground"], "increases total current draw", "Each branch draws its own I."),
                    Q("1/R = 1/2k + 1/2k gives R…", ["1 kΩ", "4 kΩ", "2 kΩ", "500 Ω"], "1 kΩ", "1/R = 1/1000 → R = 1 kΩ."),
                    Q("If one parallel bulb burns open…", ["other branches can still run", "all branches must go dark", "voltage becomes infinite", "series law takes over automatically"], "other branches can still run", "Other paths remain."),
                ],
            ),
            L(
                "kirchhoff",
                "Kirchhoff's laws",
                "KCL and KVL as bookkeeping for circuits.",
                [
                    S(
                        p="<b>Kirchhoff's Current Law (KCL):</b> the sum of currents into a node equals the "
                        "sum leaving it (charge does not pile up at an ideal node). <b>Kirchhoff's Voltage Law "
                        "(KVL):</b> the signed sum of voltages around a closed loop is zero."
                    ),
                    S(
                        h="Using KCL",
                        p="If 20 mA enters a node and 5 mA leaves on one wire, 15 mA must leave on the others "
                        "combined. Power-rail planning is KCL with bigger numbers.",
                    ),
                    S(
                        h="Using KVL",
                        p="From battery + through drops and back: all drops account for the battery rise. "
                        "If your calculated drops do not close the loop, a sign or a missing element is wrong.",
                    ),
                    S(
                        h="Signs",
                        p="Pick a loop direction and stick to it. Crossing a resistor with current gives a "
                        "voltage drop that way; a source rise depends on whether you go − to + or the reverse.",
                    ),
                    S(
                        code="KCL: Σ I_in = Σ I_out\nKVL: Σ V_loop = 0\n\n  I1 →  node  → I2\n         ↓\n         I3\n  I1 = I2 + I3",
                    ),
                ],
                [
                    Q("KCL says at a node…", ["currents in equal currents out", "voltages must all be zero", "power is conserved as charge", "resistance disappears"], "currents in equal currents out", "Charge conservation at the node."),
                    Q("KVL says around a loop…", ["signed voltages sum to zero", "currents sum to zero always", "only resistors can exist", "AC is forbidden"], "signed voltages sum to zero", "Potential returns to its start."),
                    Q("20 mA in, 5 mA out one way ⇒ other out paths total…", ["15 mA", "25 mA", "5 mA", "0 mA"], "15 mA", "20 − 5 = 15 mA."),
                    Q("If KVL does not close in your calculation…", ["check signs and missing drops", "delete Ohm's law", "add random current", "ignore the battery"], "check signs and missing drops", "Bookkeeping errors are common."),
                    Q("KCL is really about…", ["charge conservation", "magnetic monopoles", "LED colour", "solder brand"], "charge conservation", "Charge does not accumulate at an ideal node."),
                    Q("A single series loop with one battery and resistors is solved with…", ["KVL plus Ohm's law", "only antenna theory", "Maxwell's equations numerically always", "no voltage concepts"], "KVL plus Ohm's law", "Classic loop analysis."),
                ],
            ),
            L(
                "dividers",
                "Voltage and current dividers",
                "Tapping a fraction of a voltage or steering current.",
                [
                    S(
                        p="A resistive <b>voltage divider</b> makes a lower voltage from a higher one: "
                        "Vout = Vin × R2 / (R1 + R2) when R2 is the grounded leg and almost no current is drawn "
                        "from the tap."
                    ),
                    S(
                        h="Loading",
                        p="If something draws current from the tap, the divider equation changes. Keep the "
                        "load resistance much larger than the divider resistors, or buffer with an op-amp / "
                        "use a regulator.",
                    ),
                    S(
                        h="Example",
                        p="Vin = 5 V, R1 = 10 kΩ (top), R2 = 20 kΩ (bottom) → Vout = 5 × 20/30 ≈ 3.33 V. "
                        "Handy for level hints — still check ADC loading.",
                    ),
                    S(
                        h="Current dividers",
                        p="Parallel resistors split current inversely to resistance: the smaller resistor takes "
                        "more current. Two equal branches split current equally.",
                    ),
                    S(
                        code="Vin ---[R1]---+--- Vout\n             |\n            [R2]\n             |\n            GND\n\nVout = Vin * R2 / (R1+R2)  (unloaded)",
                    ),
                ],
                [
                    Q("Unloaded voltage divider: Vout = …", ["Vin × R2/(R1+R2)", "Vin × R1/R2", "Vin × (R1+R2)", "Vin / R2 only"], "Vin × R2/(R1+R2)", "Grounded R2 sets the fraction."),
                    Q("5 V with 10k top and 20k bottom gives about…", ["3.33 V", "1.67 V", "5 V", "0 V"], "3.33 V", "20/30 of 5 V."),
                    Q("Heavy load on the tap…", ["pulls Vout down from the unloaded prediction", "raises Vout above Vin", "removes R1 from the circuit magically", "converts DC to RF"], "pulls Vout down from the unloaded prediction", "Loading adds a parallel path on R2."),
                    Q("In a current divider, the smaller resistor…", ["takes more of the current", "takes less of the current", "takes zero always", "becomes an open"], "takes more of the current", "Current prefers the easier path."),
                    Q("A divider is a poor precision rail for motors because…", ["load current varies and sags the tap", "resistors cannot drop voltage", "KVL forbids dividers", "motors need open circuits"], "load current varies and sags the tap", "Use a regulator for power rails."),
                    Q("Equal parallel resistors split current…", ["equally", "all into one branch", "by voltage squared only", "into AC and DC halves"], "equally", "Same R → same I."),
                ],
            ),
            L(
                "rc-time",
                "RC timing",
                "Charging curves and the time constant τ = R C.",
                [
                    S(
                        p="A resistor feeding a capacitor creates an <b>RC</b> circuit. The time constant "
                        "τ = R C (ohms × farads = seconds). After about one τ, a charging capacitor toward a "
                        "fixed voltage reaches ~63% of the final value; after ~5τ it is essentially settled."
                    ),
                    S(
                        h="Example",
                        p="R = 10 kΩ, C = 100 nF → τ = 10e3 × 100e-9 = 1 ms. Useful for debounce, reset "
                        "timing, and simple delays (crystal clocks are better when you need accuracy).",
                    ),
                    S(
                        h="Discharge",
                        p="The same τ governs discharge toward 0 V through R. Scope the curve: it is "
                        "exponential, not a straight ramp (unless current is forced constant).",
                    ),
                    S(
                        h="Series vs parallel intuition",
                        p="Larger R or larger C slows the transient. That is how you soften edges or hold a "
                        "supply up briefly — within limits of leakage and load.",
                    ),
                    S(
                        code="τ = R * C\n\n~63% at 1τ, ~95% at 3τ, ~99% at 5τ\n\n5V ---[10k]---+--- Vcap\n             |\n           [100n]\n             |\n            GND",
                    ),
                ],
                [
                    Q("The RC time constant τ equals…", ["R × C", "R / C", "R + C", "C / R²"], "R × C", "τ = RC in seconds."),
                    Q("10 kΩ and 100 nF give τ…", ["1 ms", "1 s", "10 µs", "100 s"], "1 ms", "1e4 × 1e-7 = 1e-3 s."),
                    Q("After about one τ of charging toward a DC level, Vcap is about…", ["63% of final", "10% of final", "100% of final", "0% always"], "63% of final", "Classic exponential step response."),
                    Q("About how many τ to be essentially settled?", ["~5τ", "0.1τ", "50τ for every circuit", "exactly 2τ always"], "~5τ", "e^(−5) is tiny."),
                    Q("To slow an RC rise, you can…", ["increase R or C", "only decrease both", "remove the capacitor and keep R", "short C with a wire for more delay"], "increase R or C", "τ grows with R and C."),
                    Q("RC charging from a voltage through R is…", ["exponential, not a perfect linear ramp", "a perfect triangle forever", "independent of R", "only defined for AC mains"], "exponential, not a perfect linear ramp", "Constant-R charging is exponential."),
                ],
            ),
            L(
                "filters",
                "Filters intuition",
                "Letting some frequencies through, attenuating others.",
                [
                    S(
                        p="A <b>filter</b> favours some frequencies over others. A series resistor and "
                        "shunt capacitor to ground is a simple <b>low-pass</b>: slow changes appear at the "
                        "output; fast spikes are shorted by the capacitor."
                    ),
                    S(
                        h="High-pass",
                        p="Swap the roles: series capacitor and shunt resistor passes fast edges / AC and "
                        "blocks steady DC — useful for coupling audio while rejecting DC bias.",
                    ),
                    S(
                        h="Cutoff (ballpark)",
                        p="For a first-order RC low-pass, f_c ≈ 1 / (2π R C). R = 1 kΩ, C = 1 µF → "
                        "f_c ≈ 160 Hz. Order-of-magnitude thinking beats false precision on a breadboard.",
                    ),
                    S(
                        h="Where you meet filters",
                        p="ADC anti-alias RC, EMI ferrites, speaker crossovers, radio IF chains. Start by "
                        "asking: do I want to keep slow, keep fast, or keep a band?",
                    ),
                    S(
                        code="Low-pass RC:\n  Vin ---[R]---+--- Vout\n              |\n             [C]\n              |\n             GND\n\nfc ≈ 1 / (2π R C)",
                    ),
                ],
                [
                    Q("A series R and shunt C to ground is a…", ["low-pass filter", "high-pass filter", "short circuit for DC forever only", "transformer"], "low-pass filter", "C bypasses high frequencies."),
                    Q("A series C and shunt R is a…", ["high-pass filter", "low-pass filter", "battery", "pure inductor"], "high-pass filter", "C blocks DC, passes changing signals."),
                    Q("f_c ≈ 1/(2πRC) for…", ["a first-order RC low-pass (ballpark)", "every crystal oscillator exactly", "only antennas", "Ohm's law replacement"], "a first-order RC low-pass (ballpark)", "Standard −3 dB frequency."),
                    Q("1 kΩ and 1 µF low-pass f_c is about…", ["160 Hz", "160 kHz", "1 Hz", "16 MHz"], "160 Hz", "1/(2π·1e3·1e-6) ≈ 159 Hz."),
                    Q("Coupling audio while blocking DC bias uses…", ["high-pass (series capacitor)", "only a shunt short", "a bare wire link", "a fuse"], "high-pass (series capacitor)", "Series C is classic AC coupling."),
                    Q("Filters are about…", ["frequency-dependent behaviour", "removing Kirchhoff's laws", "increasing charge without limit", "renaming resistors"], "frequency-dependent behaviour", "That is the point of filtering."),
                ],
            ),
            L(
                "amplifiers",
                "Amplifiers intro",
                "Making a small signal larger — with power from a supply.",
                [
                    S(
                        p="An <b>amplifier</b> takes a small input and produces a larger output, using energy "
                        "from a power supply. Gain might be voltage gain Vout/Vin. A transistor stage or an "
                        "op-amp IC are common building blocks."
                    ),
                    S(
                        h="Op-amp first look",
                        p="An ideal op-amp has huge gain, tiny input current, and is used with feedback. "
                        "In negative feedback, the output moves so the inputs stay nearly equal — that is how "
                        "we set precise gains with resistors.",
                    ),
                    S(
                        h="Non-inverting gain",
                        p="With R1 from − input to ground and Rf from output to − input, gain ≈ 1 + Rf/R1 "
                        "(ideal). Example: Rf = 9 kΩ, R1 = 1 kΩ → gain ≈ 10.",
                    ),
                    S(
                        h="Limits",
                        p="Outputs cannot exceed the supply rails (and often cannot reach them fully). "
                        "Slew rate and bandwidth limit fast signals. Clipping sounds harsh in audio and ruins measurement peaks.",
                    ),
                    S(
                        code="Non-inverting (ideal):\n  Vin --> +\\\n           >---- Vout\n      +--> -/   |\n      |        [Rf]\n     [R1]       |\n      |---------+\n     GND\n\nG ≈ 1 + Rf/R1",
                    ),
                ],
                [
                    Q("Amplifiers get the extra output energy from…", ["the power supply", "creating charge from nothing", "the colour of the PCB", "Kirchhoff violating nodes"], "the power supply", "Gain uses supply power."),
                    Q("Voltage gain is…", ["Vout / Vin", "Vin / Vout always as definition of power", "Iout only", "R × C"], "Vout / Vin", "That ratio is voltage gain."),
                    Q("Negative feedback around an op-amp is used to…", ["set a stable, predictable gain", "maximize uncontrolled oscillation always", "remove the need for supplies", "turn Rf into 0 Ω magically"], "set a stable, predictable gain", "Feedback tames huge open-loop gain."),
                    Q("Rf = 9k, R1 = 1k non-inverting gain ≈…", ["10", "9", "1", "90"], "10", "1 + 9/1 = 10."),
                    Q("Clipping happens when…", ["the output hits supply limits", "gain is exactly 1", "only DC is present", "feedback resistors are equal in every circuit"], "the output hits supply limits", "Rails bound the swing."),
                    Q("Ideal op-amp input current is modeled as…", ["nearly zero", "infinite", "exactly 1 A", "equal to supply current always"], "nearly zero", "High input impedance idealization."),
                ],
            ),
            L(
                "schematics",
                "Reading schematics",
                "Symbols, nets, and finding your way on a diagram.",
                [
                    S(
                        p="A <b>schematic</b> shows electrical connections with symbols, not physical layout. "
                        "Wires that meet at a dot are connected; crossing wires without a dot are not "
                        "(styles vary — check the drawing rules)."
                    ),
                    S(
                        h="Reference designators",
                        p="R12 is a resistor, C3 a capacitor, U1 an IC, Q1 a transistor, J1 a connector, "
                        "D4 a diode. Values sit beside the symbol: 10k, 100n, 0.1µF.",
                    ),
                    S(
                        h="Nets and labels",
                        p="Named nets like +3V3, GND, SDA connect across pages without drawing spaghetti. "
                        "Same name means same node. Ground symbols usually tie together unless multiple grounds "
                        "are explicitly separated.",
                    ),
                    S(
                        h="Reading order",
                        p="Find the power rails first, then the MCU or central IC, then peripherals. Trace "
                        "one signal: where it starts, what series parts it hits, where it ends.",
                    ),
                    S(
                        code="  +5V\n   |\n  [R1]\n   |\n   +----|>|---- GND     LED + resistor\n\n  U1 pin12  labeled  SDA  → same net elsewhere",
                    ),
                ],
                [
                    Q("A schematic emphasizes…", ["electrical connections via symbols", "exact millimetre part placement only", "solder mask colour", "enclosure paint"], "electrical connections via symbols", "Schematics are about connectivity."),
                    Q("Reference designator C7 is almost certainly a…", ["capacitor", "connector", "crystal speaker", "chassis screw"], "capacitor", "C-prefix is capacitor."),
                    Q("Two wires labeled +3V3 on different pages…", ["are the same electrical net", "must be different voltages", "cannot connect without a transformer", "are only mechanical"], "are the same electrical net", "Net names join nodes."),
                    Q("A good first read of a complex schematic is to find…", ["power rails and the main IC", "only the title block font", "the fabrication house phone number", "silk-screen art"], "power rails and the main IC", "Orient yourself before details."),
                    Q("Crossing lines without a junction dot usually mean…", ["not connected (in common modern style)", "always connected", "a short intentional", "AC only"], "not connected (in common modern style)", "Confirm the drawing convention."),
                    Q("D3 typically denotes a…", ["diode (or LED)", "resistor", "only a push-button", "mounting hole"], "diode (or LED)", "D-prefix is diode family."),
                ],
            ),
            L(
                "thevenin",
                "Thévenin intuition",
                "Replacing a network with Vth and Rth.",
                [
                    S(
                        p="<b>Thévenin's theorem</b> says that from the point of view of one load, a linear "
                        "network of sources and resistors can be replaced by one voltage Vth in series with "
                        "one resistance Rth. That is why \"looking into\" a divider matters."
                    ),
                    S(
                        h="Divider example",
                        p="Unloaded divider Vout is Vth. Rth is what you measure at the tap with sources "
                        "zeroed (voltage sources shorted, current sources opened): for two resistors, "
                        "Rth = R1 ∥ R2.",
                    ),
                    S(
                        h="Why care",
                        p="If Rload ≫ Rth, the tap barely sags. If Rload ≈ Rth, you lose half the voltage "
                        "to Rth. ADC pins, comparator inputs and scopes all load the node a little.",
                    ),
                    S(
                        h="Mental model",
                        p="Every real signal source has some Rth (output impedance). Cables and op-amp "
                        "outputs are not perfect stiff voltage sources.",
                    ),
                    S(
                        code="Network  ≡  Vth ---[Rth]--- tap ---- Rload ---- GND\n\nDivider: Vth = Vin*R2/(R1+R2),  Rth = R1||R2",
                    ),
                ],
                [
                    Q("Thévenin replaces a linear network with…", ["one Vth and one Rth", "only a current source forever", "two capacitors", "a diode bridge only"], "one Vth and one Rth", "Classic equivalent."),
                    Q("For a simple divider, Rth at the tap is…", ["R1 in parallel with R2", "R1 + R2 always", "0 Ω", "infinite always"], "R1 in parallel with R2", "With Vin shorted for the Rth step."),
                    Q("If Rload ≫ Rth, the loaded voltage…", ["stays close to Vth", "falls to zero", "becomes 2 Vth", "ignores Ohm's law"], "stays close to Vth", "Light loading."),
                    Q("Output impedance of a source is another name for ideas like…", ["Rth looking back into the source", "only the LED Vf", "mains frequency", "solder melting point"], "Rth looking back into the source", "Output impedance ≈ Thévenin R."),
                    Q("ADC pin current means the divider is…", ["slightly loaded — Vout may shift", "immune to all loading", "converted to magnetic only", "shorted to mains"], "slightly loaded — Vout may shift", "Finite input impedance loads the tap."),
                    Q("Thévenin helps because…", ["it simplifies what the load \"sees\"", "it deletes KCL", "it invents charge", "it replaces safety rules"], "it simplifies what the load \"sees\"", "One equivalent is easier to reason about."),
                ],
            ),
        ],
    }


def digital():
    return {
        "id": "digital",
        "name": "Digital",
        "title": "Logic, flip-flops and talking to microcontrollers",
        "intro": (
            "Digital electronics deals in discrete levels and timing. These lessons cover logic levels, "
            "gates, Boolean basics, flip-flops and clocks, then MCU pins and a first look at UART, SPI "
            "and I²C — enough to read a breakout-board hookup guide with confidence."
        ),
        "lessons": [
            L(
                "logic-levels",
                "Logic levels",
                "HIGH, LOW, thresholds and voltage families.",
                [
                    S(
                        p="Digital pins speak in <b>levels</b>: a voltage band meaning 0 (LOW) and a band "
                        "meaning 1 (HIGH). Between them sits an illegal/undefined region where behaviour is "
                        "unreliable. Never leave a CMOS input floating — it can chatter and waste power."
                    ),
                    S(
                        h="Families",
                        p="5 V TTL and 3.3 V CMOS are common. A 5 V output can damage a 3.3 V-only input. "
                        "A 3.3 V HIGH may be too low for an old 5 V TTL input's VIH minimum — check datasheets "
                        "or use level shifters.",
                    ),
                    S(
                        h="Noise margins",
                        p="VOL max and VIL max, VOH min and VIH min define noise margins. Strong drivers and "
                        "short wires improve margins; long lines may need termination or slower edges.",
                    ),
                    S(
                        h="Pull-ups and pull-downs",
                        p="A resistor to VCC or GND defines the level when a switch opens or an open-drain "
                        "device floats. I²C relies on pull-ups; typical values are 2.2–10 kΩ depending on speed and capacitance.",
                    ),
                    S(code="Example 3.3 V CMOS (typical idea):\n  LOW  < ~0.8 V\n  HIGH > ~2.0 V\n  (check YOUR datasheet)\n\nFloating input = trouble"),
                ],
                [
                    Q("A floating CMOS input is risky because…", ["it can chatter and draw current unpredictably", "it always reads solid LOW forever", "it charges batteries", "it equals a perfect 0 Ω short"], "it can chatter and draw current unpredictably", "Define unused inputs."),
                    Q("5 V logic into a 3.3 V-only pin can…", ["damage the pin", "always be safe", "convert automatically to I²C", "raise VIH magically"], "damage the pin", "Respect absolute maximum ratings."),
                    Q("Pull-ups on I²C exist to…", ["define HIGH when drivers release the bus", "power the MCU from SDA", "remove the need for ground", "generate clocks from resistors alone"], "define HIGH when drivers release the bus", "Open-drain needs pull-ups."),
                    Q("The region between valid LOW and HIGH is…", ["undefined / unreliable", "the best place to bias forever", "called VCC", "used for analog audio only"], "undefined / unreliable", "Stay out of the middle."),
                    Q("Noise margin is about…", ["how much noise you can tolerate and still read correctly", "only solder temperature", "LED brightness", "battery mAh"], "how much noise you can tolerate and still read correctly", "Margins come from VOL/VIL and VOH/VIH gaps."),
                    Q("A 3.3 V HIGH into some 5 V TTL inputs may…", ["be too low to meet VIH", "always exceed 5 V", "erase flash", "replace the crystal"], "be too low to meet VIH", "Level shifting may be required."),
                ],
            ),
            L(
                "gates",
                "Logic gates",
                "AND, OR, NOT, NAND, NOR, XOR.",
                [
                    S(
                        p="<b>Gates</b> compute Boolean functions on HIGH/LOW inputs. NOT inverts. AND is HIGH "
                        "only if all inputs are HIGH. OR is HIGH if any input is HIGH. NAND and NOR are "
                        "AND/OR with an inversion — they are universal building blocks."
                    ),
                    S(
                        h="XOR",
                        p="XOR is HIGH when inputs differ. Useful for comparison, parity and adders. XNOR is "
                        "HIGH when inputs match.",
                    ),
                    S(
                        h="CMOS packaging",
                        p="Chips like 74HC00 (quad NAND) still teach fundamentals. Inside MCUs, the same "
                        "ideas appear as GPIO configurations and programmable logic.",
                    ),
                    S(
                        h="Propagation delay",
                        p="Outputs do not change instantly. Gate delays stack in deep combinational chains "
                        "and limit clock speed — flip-flops come next for sequential logic.",
                    ),
                    S(
                        code="AND:  Y = A · B\nOR:   Y = A + B\nNOT:  Y = ¬A\nNAND: Y = ¬(A · B)\nXOR:  Y = A ⊕ B\n\nA B | AND OR XOR\n0 0 |  0   0  0\n0 1 |  0   1  1\n1 0 |  0   1  1\n1 1 |  1   1  0",
                    ),
                ],
                [
                    Q("AND output is HIGH when…", ["all inputs are HIGH", "any input is HIGH", "all inputs are LOW", "inputs differ"], "all inputs are HIGH", "AND requires every input true."),
                    Q("NOT does what?", ["inverts the level", "ANDs two signals", "stores a bit", "makes AC"], "inverts the level", "NOT is inversion."),
                    Q("NAND is…", ["AND followed by NOT", "OR followed by AND", "only XOR", "a capacitor"], "AND followed by NOT", "NAND = inverted AND."),
                    Q("XOR is HIGH when…", ["inputs differ", "inputs are both HIGH only", "inputs are both LOW only", "never"], "inputs differ", "XOR detects difference."),
                    Q("74HC00 is classically…", ["quad NAND gates", "a voltage regulator", "an OLED panel", "a lithium charger"], "quad NAND gates", "Famous NAND package."),
                    Q("Propagation delay matters because…", ["slow chains limit timing", "gates have zero delay always", "Boolean ignores time", "power supplies remove delay"], "slow chains limit timing", "Delays accumulate."),
                ],
            ),
            L(
                "boolean",
                "Boolean basics",
                "Truth, simplification, and De Morgan.",
                [
                    S(
                        p="<b>Boolean algebra</b> manipulates true/false values. Write expressions with AND, "
                        "OR, NOT. Simplifying logic can mean fewer gates, less delay and less power — or "
                        "clearer firmware if statements."
                    ),
                    S(
                        h="Identities",
                        p="A + 0 = A, A · 1 = A, A + 1 = 1, A · 0 = 0, A + A = A, A · A = A, A + ¬A = 1, "
                        "A · ¬A = 0. These are the reflexes you use constantly.",
                    ),
                    S(
                        h="De Morgan",
                        p="¬(A · B) = ¬A + ¬B and ¬(A + B) = ¬A · ¬B. Bubble pushing on schematics is De "
                        "Morgan in pictures: NANDs can implement other functions.",
                    ),
                    S(
                        h="From words to gates",
                        p="\"Alarm if door open AND armed\" is AND. \"Fault if sensor A OR sensor B\" is OR. "
                        "Translate requirements before wiring or coding.",
                    ),
                    S(code="De Morgan:\n  NOT(A AND B) = (NOT A) OR (NOT B)\n  NOT(A OR B)  = (NOT A) AND (NOT B)\n\nA OR 0 = A\nA AND 1 = A"),
                ],
                [
                    Q("A AND 0 equals…", ["0", "1", "A", "NOT A"], "0", "AND with 0 forces 0."),
                    Q("A OR 1 equals…", ["1", "0", "A", "NOT A"], "1", "OR with 1 forces 1."),
                    Q("De Morgan: NOT(A AND B) equals…", ["(NOT A) OR (NOT B)", "(NOT A) AND (NOT B)", "A OR B", "A AND B"], "(NOT A) OR (NOT B)", "Break the bar and change AND to OR."),
                    Q("A AND NOT A equals…", ["0", "1", "A", "A OR 1"], "0", "A value and its complement cannot both be true."),
                    Q("Simplifying Boolean expressions can…", ["reduce gates / clarify firmware", "increase undefined voltages on purpose", "remove the clock forever", "replace power rails"], "reduce gates / clarify firmware", "Less logic, clearer intent."),
                    Q("\"Fault if A OR B\" maps to…", ["an OR gate (or || in firmware)", "only an AND gate", "a capacitor", "UART baud"], "an OR gate (or || in firmware)", "OR matches that requirement."),
                ],
            ),
            L(
                "flip-flops",
                "Flip-flops",
                "One-bit memory and edge-triggered state.",
                [
                    S(
                        p="Combinational logic forgets when inputs change. A <b>flip-flop</b> stores a bit. "
                        "A common D flip-flop copies D to Q on a clock edge and holds it until the next edge."
                    ),
                    S(
                        h="SR latch (idea)",
                        p="Set/Reset latches are level-sensitive memory cells. They teach feedback, but "
                        "edge-triggered flip-flops are what most clocked designs use to avoid transparent races.",
                    ),
                    S(
                        h="Registers",
                        p="N flip-flops side by side make an N-bit register. MCUs are packed with registers: "
                        "configuration bits and data you read/write in software are flip-flops underneath.",
                    ),
                    S(
                        h="Setup and hold",
                        p="D must be stable a little before (setup) and after (hold) the clock edge. Violate "
                        "timing and you get metastability — rare but real on async inputs; synchronize external async signals.",
                    ),
                    S(
                        code="D flip-flop (rising edge):\n  D ----|>D  Q----\n  CLK ---|>\n\nQ becomes D when CLK rises; then holds.",
                    ),
                ],
                [
                    Q("A D flip-flop stores…", ["one bit, updated on a clock edge", "unlimited analog voltage", "only AC waveforms", "solder temperature"], "one bit, updated on a clock edge", "Edge-triggered 1-bit memory."),
                    Q("A register is basically…", ["several flip-flops in parallel", "a single resistor", "an LED", "a fuse"], "several flip-flops in parallel", "One flop per bit."),
                    Q("Setup time means D must be stable…", ["before the clock edge", "a minute after power fails", "only during reset", "never"], "before the clock edge", "Meet setup or risk bad capture."),
                    Q("Async inputs into clocked logic should be…", ["synchronized (e.g. two flip-flops)", "tied to mid-supply", "driven at 230 V", "left floating"], "synchronized (e.g. two flip-flops)", "Reduce metastability risk."),
                    Q("Unlike combinational logic, flip-flops…", ["remember state", "cannot hold bits", "ignore clocks always", "replace power supplies"], "remember state", "That is sequential logic."),
                    Q("Q following D only while CLK is high describes…", ["a latch (level-sensitive), not an edge flop", "a perfect crystal", "NAND only", "UART"], "a latch (level-sensitive), not an edge flop", "Transparent latches differ from edge flops."),
                ],
            ),
            L(
                "clocks",
                "Clocks and timing",
                "Edges that step digital systems forward.",
                [
                    S(
                        p="A <b>clock</b> is a periodic signal whose edges advance synchronous logic. Frequency "
                        "is in hertz: a 16 MHz crystal means 16 million cycles per second. Period T = 1/f."
                    ),
                    S(
                        h="Sources",
                        p="Crystals / oscillators are accurate. RC oscillators are cheaper and less accurate. "
                        "MCUs often boot on an internal oscillator then switch to a crystal when configured.",
                    ),
                    S(
                        h="Clock domains",
                        p="Signals crossing between differently clocked regions need careful synchronisation. "
                        "Hobby boards hide this; FPGA and SoC work confront it daily.",
                    ),
                    S(
                        h="Jitter and edges",
                        p="Clean, monotonic edges matter. Ringing from long wires can double-clock a pin. "
                        "Series damping resistors and short traces help.",
                    ),
                    S(code="f = 16 MHz  →  T = 62.5 ns\n\nMCU: crystal + load caps → OSC pins\nInternal osc: easier, less accurate"),
                ],
                [
                    Q("Period T equals…", ["1 / f", "f × 2", "f / 2π always as definition", "RC only"], "1 / f", "T = 1/f."),
                    Q("A 16 MHz clock has period…", ["62.5 ns", "16 s", "16 µs", "1 ms"], "62.5 ns", "1/16e6 = 62.5e-9 s."),
                    Q("Crystals are used because they are…", ["frequency-accurate references", "perfect current sources", "LED drivers", "pull-up resistors"], "frequency-accurate references", "Stable frequency."),
                    Q("Double-clocking from ringing is a risk when…", ["edges bounce around the threshold", "VCC is exact", "only DC is present", "software prints Hello"], "edges bounce around the threshold", "Clean up edges / shorten wires."),
                    Q("Synchronous logic advances mainly on…", ["clock edges", "random solder blobs", "LED colour changes", "battery chemistry alone"], "clock edges", "That is the sync discipline."),
                    Q("Internal MCU oscillators are typically…", ["convenient but less accurate than crystals", "always better than ovenized references", "illegal to use", "exactly 0 ppm"], "convenient but less accurate than crystals", "Trade convenience for accuracy."),
                ],
            ),
            L(
                "mcu-pins",
                "MCU pins (GPIO)",
                "Inputs, outputs, and not frying the chip.",
                [
                    S(
                        p="<b>GPIO</b> (general-purpose input/output) pins are software-configurable digital "
                        "pins on a microcontroller. As outputs they drive HIGH/LOW (within current limits). "
                        "As inputs they read levels — often with optional pull-ups."
                    ),
                    S(
                        h="Current limits",
                        p="A pin might source/sink 5–20 mA absolute max; budgets per port and per chip apply. "
                        "Drive LEDs with resistors; drive motors and relays with transistors/MOSFETs/drivers.",
                    ),
                    S(
                        h="Alternate functions",
                        p="The same ball/pad may be UART TX, PWM, ADC input or GPIO. Pinmux tables in the "
                        "datasheet tell you what each pin can do. Conflict = frustration.",
                    ),
                    S(
                        h="Analog and open-drain",
                        p="ADC pins want clean analog references and often quiet layout. Open-drain outputs "
                        "can share lines with pull-ups (I²C-style).",
                    ),
                    S(
                        h="Absolute maximums",
                        p="Voltage above VDD or below ground (beyond clamp ratings) kills pins. Level-shift "
                        "external 5 V devices when using a 3.3 V MCU.",
                    ),
                    S(code="LED: GPIO ---[R]---|>|--- GND   (check sink/source rating)\nButton: VCC ---[sw]--- GPIO ---[pull-down]--- GND\n     or: GPIO with internal pull-up, sw to GND"),
                ],
                [
                    Q("GPIO stands for…", ["general-purpose input/output", "ground-power inverted output", "gate-pass inductive oscillator", "gold-plated iron oxide"], "general-purpose input/output", "Configurable digital pins."),
                    Q("Motors on a GPIO directly are a bad idea because…", ["current and inductive spikes exceed pin ratings", "motors need floating gates", "GPIO cannot switch LOW", "Ohm's law fails"], "current and inductive spikes exceed pin ratings", "Use a driver stage."),
                    Q("Pinmux matters because…", ["pins share multiple possible functions", "all pins are only ADC", "silk-screen sets baud rate", "soldering defines SPI"], "pins share multiple possible functions", "Choose functions carefully."),
                    Q("Internal pull-ups help with…", ["buttons to ground and idle HIGH levels", "generating 12 V from 3.3 V", "heatsinking CPUs", "replacing crystals"], "buttons to ground and idle HIGH levels", "Common button wiring."),
                    Q("Driving 5 V into a 3.3 V MCU pin risks…", ["permanent damage", "faster code", "more flash", "automatic level shifting always"], "permanent damage", "Use shifters / 5 V-tolerant pins only if rated."),
                    Q("An LED on GPIO still needs…", ["a series resistor (or constant current)", "no resistor ever", "AC coupling only", "a transformer"], "a series resistor (or constant current)", "Limit current."),
                ],
            ),
            L(
                "serial-buses",
                "UART, SPI and I²C at a glance",
                "Three ways chips talk on a board.",
                [
                    S(
                        p="Board-level serial links move bytes without a parallel cable of address lines. "
                        "Three workhorses: <b>UART</b>, <b>SPI</b> and <b>I²C</b>."
                    ),
                    S(
                        h="UART",
                        p="Two signal wires: TX and RX (plus ground). Asynchronous: both sides agree baud "
                        "(e.g. 115200). No clock wire. Great for debug consoles and GPS modules. Point-to-point "
                        "unless you add extra hardware.",
                    ),
                    S(
                        h="SPI",
                        p="Clock (SCK), controller-out (MOSI), controller-in (MISO), and a chip-select per "
                        "device. Fast and simple electrically; wire count grows with device count. Mode "
                        "(CPOL/CPHA) must match the peripheral.",
                    ),
                    S(
                        h="I²C",
                        p="Two wires: SDA and SCL, both open-drain with pull-ups. Addresses select devices. "
                        "Fewer pins, shared bus, but capacitance and pull-ups limit speed; acknowledge bits "
                        "matter when debugging.",
                    ),
                    S(
                        code="UART:  MCU TX -> Dev RX ; MCU RX <- Dev TX ; GND\nSPI:   SCK, MOSI, MISO, CSn\nI2C:   SDA, SCL (+ pull-ups to VCC), 7-bit addr",
                    ),
                ],
                [
                    Q("UART needs agreement on…", ["baud rate (and frame format)", "only chip-select lines", "I²C addresses", "solder alloy"], "baud rate (and frame format)", "Async links share timing by convention."),
                    Q("SPI commonly uses…", ["SCK, MOSI, MISO, and CS", "only SDA/SCL", "TX/RX without clocks always", "one wire total"], "SCK, MOSI, MISO, and CS", "Classic four-wire SPI."),
                    Q("I²C lines are typically…", ["open-drain with pull-ups", "push-pull without pull-ups always", "coax 75 Ω", "mains referenced"], "open-drain with pull-ups", "Devices release the line to go HIGH."),
                    Q("Multiple I²C devices share a bus using…", ["unique addresses", "unique baud crystals only", "separate TX pins for each bit", "different ground voltages intentionally"], "unique addresses", "Address selects the target."),
                    Q("SPI tends to be chosen when you want…", ["higher speed / simple shifting", "fewest possible pins always", "long multi-drop cables like RS-485 automatically", "wireless only"], "higher speed / simple shifting", "SPI is fast and straightforward."),
                    Q("A shared ground is required because…", ["signal voltages need a common reference", "UART invents its own ground in the air", "SPI runs on light alone", "I²C uses only magnetic coupling"], "signal voltages need a common reference", "Return path matters."),
                ],
            ),
            L(
                "pull-open-drain",
                "Open-drain and wired logic",
                "Shared lines, pull-ups, and why release ≠ drive HIGH.",
                [
                    S(
                        p="<b>Open-drain</b> (or open-collector) outputs can pull a wire LOW actively but do "
                        "not drive HIGH; a pull-up resistor does that. Several devices can share one wire: "
                        "any device may pull LOW; the line goes HIGH only when all release."
                    ),
                    S(
                        h="Wired-AND",
                        p="That shared behaviour is wired-AND for active-high logic: the bus is HIGH only if "
                        "everyone agrees. I²C ACK and clock stretching build on this physical layer."
                    ),
                    S(
                        h="Choosing pull-up value",
                        p="Too weak (large R) and rise times get slow on capacitive buses. Too strong (small R) "
                        "and devices struggle to pull LOW, wasting current. Start near 4.7 kΩ for short 100 kHz "
                        "I²C; adjust with a scope if you have one.",
                    ),
                    S(
                        h="Level shifting",
                        p="Open-drain buses level-shift with MOSFET discrete shifters or dedicated chips — "
                        "a common 3.3 V ↔ 5 V trick on SDA/SCL.",
                    ),
                    S(code="VCC ---[4.7k]---+---- bus wire ----+\n               |                  |\n            [od drv]           [od drv]\n               |                  |\n              GND                GND"),
                ],
                [
                    Q("Open-drain outputs drive…", ["LOW actively; HIGH via pull-up", "HIGH actively only", "both rails strongly always", "AC mains"], "LOW actively; HIGH via pull-up", "That is open-drain."),
                    Q("Several open-drain devices on one wire…", ["may safely share if only pulling LOW", "will short VCC if any pulls LOW", "need unique TX resistors to ground only", "cannot coexist"], "may safely share if only pulling LOW", "Wired-AND style sharing."),
                    Q("A too-large I²C pull-up tends to…", ["slow the rising edge", "speed edges unboundedly", "remove ACKs magically", "raise VCC"], "slow the rising edge", "RC rise time grows with R."),
                    Q("A too-small pull-up tends to…", ["make LOW harder / waste current", "always improve signal integrity with no downside", "delete capacitance", "stop needing ground"], "make LOW harder / waste current", "Drivers must overcome the pull-up."),
                    Q("I²C ACK pulses work because…", ["a device can pull SDA LOW on the ACK bit", "UART baud creates ACKs", "SPI CS invents I²C", "pull-ups store henries"], "a device can pull SDA LOW on the ACK bit", "Open-drain ACK."),
                    Q("MOSFET level shifters on SDA/SCL exploit…", ["open-drain behaviour with pull-ups on each side", "push-pull fighting 5 V and 3.3 V hard", "transformer isolation only", "LED optical links only"], "open-drain behaviour with pull-ups on each side", "Classic bidirectional shifter."),
                ],
            ),
        ],
    }


def soldering():
    return {
        "id": "soldering",
        "name": "Soldering",
        "title": "Tools, joints, flux and rework",
        "intro": (
            "Soldering joins metal parts with a fusible alloy. These lessons cover tools, through-hole "
            "technique, flux, how to recognise good and bad joints, ESD care, desoldering and practical "
            "rework tips. Irons are hot; fumes need ventilation; eye protection is not optional."
        ),
        "lessons": [
            L(
                "tools",
                "Soldering tools",
                "Iron, tip, stand, sponge/brass and solder.",
                [
                    S(
                        p="A temperature-controlled <b>soldering iron</b> (often 300–370 °C for electronics "
                        "solder) with interchangeable tips is the core tool. Use a stand; never leave a hot "
                        "iron loose on the bench. <b>Warning:</b> tips cause instant burns."
                    ),
                    S(
                        h="Tips and cleaning",
                        p="Chisel and conical tips cover most through-hole work. Keep the tip tinned (shiny "
                        "with solder). Clean on brass wool or a damp sponge — brass wool is gentler on plating."
                    ),
                    S(
                        h="Solder",
                        p="Electronics solder is usually a tin-based alloy, sometimes with lead (Pb) in older/"
                        "some hobby stock, often lead-free (e.g. SAC305) in modern work. Use resin/"
                        "flux-cored solder for electronics — never acid plumbing flux on circuits.",
                    ),
                    S(
                        h="Extras",
                        p="Helping hands, tweezers, flush cutters, fume extraction or a fan out a window, "
                        "and safety glasses round out a starter kit.",
                    ),
                    S(
                        h="Safety",
                        p="Work ventilated. Wash hands after handling leaded solder. Unplug irons when finished. "
                        "Keep cords from snagging the iron off the stand.",
                    ),
                ],
                [
                    Q("A soldering iron should rest…", ["in a stand", "on paper", "in your pocket", "on the PCB silk"], "in a stand", "Prevent burns and fires."),
                    Q("Electronics work uses…", ["flux-cored electronics solder", "acid plumbing flux paste", "hot glue as solder", "only pure water"], "flux-cored electronics solder", "Acid flux attacks electronics."),
                    Q("Keep the tip…", ["tinned and clean", "bare steel always dry of solder", "painted", "above 600 °C always"], "tinned and clean", "Tinning protects the tip."),
                    Q("Brass wool is used to…", ["clean the tip", "replace solder alloy", "etch PCBs", "measure ohms"], "clean the tip", "Wipes oxides/old solder."),
                    Q("Lead-free solder typically needs…", ["somewhat higher temperature than tin-lead", "cryogenic cooling", "no flux ever", "mains voltage on the tip"], "somewhat higher temperature than tin-lead", "SAC alloys melt higher."),
                    Q("Eye protection matters because…", ["clipped leads and solder can fly", "irons emit UV only", "solder is explosive TNT", "flux is magnetic"], "clipped leads and solder can fly", "Protect your eyes."),
                ],
            ),
            L(
                "through-hole",
                "Through-hole soldering",
                "Heat the joint, feed solder, inspect.",
                [
                    S(
                        p="<b>Through-hole</b> parts have leads that pass through PCB pads. The reliable method: "
                        "heat the pad <i>and</i> the lead together with the iron tip, then feed solder into the "
                        "hot joint — not onto the iron alone."
                    ),
                    S(
                        h="Steps",
                        p="1) Insert and secure the part. 2) Touch tip to pad+lead. 3) Feed solder opposite "
                        "the tip so it flows onto both metals. 4) Remove solder, then iron. 5) Let it cool "
                        "without moving. 6) Trim leads with cutters — eye protection on."
                    ),
                    S(
                        h="Time and heat",
                        p="A few seconds of good contact beats ten seconds of a dirty cold tip. Too much heat "
                        "lifts pads; too little makes cold joints. Practice on scrap boards.",
                    ),
                    S(
                        h="Board holding",
                        p="A stable board (vice or helping hands) frees both hands for iron and solder. "
                        "Wobbly joints become bad joints.",
                    ),
                    S(
                        code="   iron tip\n      |\n   pad + lead  <--- heat both\n      ^\n   feed solder into the joint",
                    ),
                ],
                [
                    Q("You should heat…", ["the pad and the lead together", "only the solder blob in mid-air", "only the plastic body", "the room thermostat"], "the pad and the lead together", "Both metals must get hot."),
                    Q("Feed solder…", ["into the hot joint", "only onto the iron tip forever", "onto cold pads as solid wire left there", "into the USB port"], "into the hot joint", "Solder flows onto heated metal."),
                    Q("After applying solder…", ["remove solder, then iron, then hold still", "shake the board immediately", "blow hard and flex the lead", "add water"], "remove solder, then iron, then hold still", "Motion while freezing = cold joint."),
                    Q("Trim leads…", ["with cutters while wearing eye protection", "with your teeth", "while power is applied at 12 V", "using the iron tip as scissors"], "with cutters while wearing eye protection", "Leads become projectiles."),
                    Q("A dirty cold tip causes…", ["poor heat transfer and bad joints", "perfect joints every time", "lower melting points of copper", "automatic flux generation"], "poor heat transfer and bad joints", "Clean and tin the tip."),
                    Q("Pad lifting is often from…", ["excessive heat/time or force", "correct few-second joints", "using flux", "tinning the tip"], "excessive heat/time or force", "Respect the laminate."),
                ],
            ),
            L(
                "flux",
                "Flux and wetting",
                "Cleaning oxides so solder can flow.",
                [
                    S(
                        p="<b>Flux</b> chemically cleans oxides so molten solder can <b>wet</b> the metal — "
                        "spread and bond instead of beading up. Cored solder already contains flux; extra "
                        "liquid or paste flux helps rework and stubborn joints."
                    ),
                    S(
                        h="Wetting",
                        p="Good wetting looks like solder feathering out onto pad and lead with a shiny "
                        "(tin-lead) or satin (many lead-free) fillet. Balling up on dirty metal means more "
                        "heat/flux/cleaning — not more brute force.",
                    ),
                    S(
                        h="Residues",
                        p="Rosin fluxes may leave amber residue; some \"no-clean\" fluxes are meant to stay. "
                        "Water-soluble fluxes must be cleaned — conductive residue causes leakage and corrosion.",
                    ),
                    S(
                        h="Never",
                        p="Never use plumber's acid flux on electronics. It is corrosive and will ruin boards "
                        "over time even if the joint looks pretty today.",
                    ),
                ],
                [
                    Q("Flux's job is to…", ["clean oxides so solder wets", "raise melting point unboundedly", "replace copper", "insulate the iron"], "clean oxides so solder wets", "Wetting needs clean metal."),
                    Q("Solder beading up usually means…", ["poor wetting / dirty surfaces", "perfect technique", "too much flux always good forever", "Ohm's law failure"], "poor wetting / dirty surfaces", "Fix cleanliness and heat."),
                    Q("Water-soluble flux residue should be…", ["cleaned off", "ignored forever always", "painted with latex", "eaten"], "cleaned off", "It can stay conductive/corrosive."),
                    Q("Plumber's acid flux on PCBs is…", ["not acceptable", "required by IPC for all SMT", "the same as rosin", "a type of solder alloy"], "not acceptable", "Corrosive acid flux ruins electronics."),
                    Q("Cored electronics solder already…", ["contains flux in the core", "contains acid for pipes", "contains no flux ever", "contains sand"], "contains flux in the core", "That is why it works on clean parts."),
                    Q("A good fillet…", ["wets both pad and lead", "sits as a ball on dirty copper", "covers the entire PCB in solder", "fills vias from a meter away without heat"], "wets both pad and lead", "Look for a bonded fillet."),
                ],
            ),
            L(
                "joints",
                "Good and bad joints",
                "What to look for under a bright light.",
                [
                    S(
                        p="Inspect every joint. A <b>good through-hole joint</b> shows a concave or smooth "
                        "fillet wetting the pad and lead, no cracks, and lead not moving when cooled. "
                        "Lead-free may look less mirror-like than tin-lead — satin can still be good."
                    ),
                    S(
                        h="Cold joint",
                        p="Dull, lumpy, poor wetting — the metals never got properly hot together, or the "
                        "joint moved while solidifying. Reflow with flux and proper heat.",
                    ),
                    S(
                        h="Insufficient solder / dry joint",
                        p="Pad not covered, or lead barely tacked. Add heat and a little solder — do not "
                        "blob from afar.",
                    ),
                    S(
                        h="Bridges and blobs",
                        p="Solder shorting adjacent pads is a bridge — remove with braid or a pump. Huge "
                        "blobs hide bad wetting underneath; aesthetic excess is not strength.",
                    ),
                    S(
                        h="Overheat damage",
                        p="Charred flux, lifted pads, melted plastic connectors: too much heat. Let the "
                        "board cool; repair lifted pads with care or scrap the board if traces tear.",
                    ),
                ],
                [
                    Q("A cold joint often looks…", ["dull/lumpy with poor wetting", "perfectly feathered and shiny/satin", "like bare copper only", "like conformal coat"], "dull/lumpy with poor wetting", "Classic cold-joint look."),
                    Q("A solder bridge is…", ["unwanted short between pads", "required for every IC", "flux residue only", "a type of via"], "unwanted short between pads", "Remove extras."),
                    Q("If a joint moved while solidifying…", ["it may be unreliable — reflow it", "it becomes stronger than copper", "it turns into a diode", "ignore it"], "it may be unreliable — reflow it", "Disturbance causes fractures."),
                    Q("Lead-free joints…", ["may look satin and still be good", "must mirror like chrome always", "never wet copper", "require acid flux"], "may look satin and still be good", "Do not judge only by old tin-lead shine."),
                    Q("A huge solder blob…", ["can hide a bad bond underneath", "guarantees aerospace reliability", "reduces need for flux forever", "increases resistance to zero always"], "can hide a bad bond underneath", "Quality over quantity."),
                    Q("Lifted pads indicate…", ["heat or mechanical abuse", "perfect process control", "insufficient solder alloy tinning only as success", "correct IPC always"], "heat or mechanical abuse", "Pads tear when overstressed."),
                ],
            ),
            L(
                "esd",
                "ESD awareness",
                "Static can kill chips before you smell smoke.",
                [
                    S(
                        p="<b>ESD</b> (electrostatic discharge) is a tiny spark from static charge. You may "
                        "not feel it, yet MOSFET gates and IC inputs can be damaged. Humidity, flooring and "
                        "clothing all change risk."
                    ),
                    S(
                        h="Basic precautions",
                        p="Work on a grounded ESD mat when possible. Wear a wrist strap clipped to ground "
                        "(through a safety resistor). Handle boards by edges. Store parts in ESD bags/foam — "
                        "not loose in plastic junk drawers."
                    ),
                    S(
                        h="Iron and tools",
                        p="Use an ESD-safe iron and grounded workstation. Don't shuffle across carpet then "
                        "touch bare CMOS pins on a dry winter day.",
                    ),
                    S(
                        h="Perspective",
                        p="Through-hole discretes are tougher than fine CMOS. Still, good habits cost little. "
                        "Assume modern ICs deserve respect.",
                    ),
                ],
                [
                    Q("ESD damage…", ["can happen without a shock you feel", "always knocks you across the room", "only affects resistors", "requires mains voltage"], "can happen without a shock you feel", "Chips are more sensitive than skin."),
                    Q("A wrist strap should connect to…", ["ground through a safety resistor", "live mains neutral", "the soldering tip directly at full mains", "an antenna"], "ground through a safety resistor", "Bleed charge safely."),
                    Q("ICs should be stored in…", ["ESD-safe packaging", "loose polystyrene peanuts as ideal", "pockets with keys", "wet sponges"], "ESD-safe packaging", "Bags/foam designed for ESD."),
                    Q("Handle boards by…", ["the edges when practical", "scraping all pins on carpet", "licking connectors", "swinging by USB leads"], "the edges when practical", "Reduce contact with pins."),
                    Q("MOSFET gates are…", ["ESD sensitive", "immune to all static", "only damaged by magnets", "protected by silk-screen"], "ESD sensitive", "Gate oxide is delicate."),
                    Q("An ESD mat works best when…", ["properly grounded", "floating fully isolated always", "covered in vinyl tape insulating it totally", "powered from USB data lines"], "properly grounded", "Mats need a ground path."),
                ],
            ),
            L(
                "desoldering",
                "Desoldering",
                "Braid, pumps and removing parts whole.",
                [
                    S(
                        p="Removing solder is part of the craft. Two basic tools: <b>desoldering braid</b> "
                        "(wick) and a <b>solder sucker</b> (pump). Flux helps both. <b>Warning:</b> boards "
                        "and pads are easy to wreck with patience-loss and excess heat."
                    ),
                    S(
                        h="Braid",
                        p="Place fluxed braid on the joint, heat on top of the braid, watch solder wick up, "
                        "then remove iron and braid together. Do not drag hot braid sideways across pads.",
                    ),
                    S(
                        h="Pump",
                        p="Heat until solder melts, then trigger the pump with the tip at the joint. Cleared "
                        "holes let through-hole leads exit. Multiple heat cycles need cooling pauses.",
                    ),
                    S(
                        h="Multi-lead parts",
                        p="For DIP ICs, alternate pins or use clips/hot-air with care. Chip-quic / low-melt "
                        "alloys can help advanced rework. If a pad lifts, stop and reassess — forcing makes tears worse.",
                    ),
                ],
                [
                    Q("Desoldering braid works by…", ["wicking molten solder into copper braid", "magnetically pulling lead", "dissolving FR4", "cooling solder into dust"], "wicking molten solder into copper braid", "Capillary action in the braid."),
                    Q("Add flux when desoldering because…", ["it improves heat transfer and wetting into the braid/pump", "it raises pad adhesion unboundedly without heat", "it replaces the need for an iron", "it is decorative"], "it improves heat transfer and wetting into the braid/pump", "Flux helps clearing."),
                    Q("Remove iron and braid…", ["together to avoid redepositing solder", "separately with a wipe across all pins", "after the board freezes with braid stuck", "never"], "together to avoid redepositing solder", "Standard wick technique."),
                    Q("If a pad starts to lift…", ["stop forcing the part", "pull harder", "raise temperature to 500 °C", "twist the lead as a hinge"], "stop forcing the part", "Save the pad."),
                    Q("A solder sucker removes solder by…", ["vacuum/sudden suction when molten", "sanding the PCB", "ultraviolet light", "increasing resistance"], "vacuum/sudden suction when molten", "Mechanical pump."),
                    Q("Many heat cycles without pause can…", ["damage pads and parts", "improve FR4 strength", "charge capacitors safely from heat", "tin the tip automatically"], "damage pads and parts", "Let things cool."),
                ],
            ),
            L(
                "rework",
                "Rework tips",
                "Fixing mistakes without making new ones.",
                [
                    S(
                        p="<b>Rework</b> is deliberate repair: remove bridges, replace a wrong resistor, "
                        "swap a damaged connector. Plan the heat path. Use fresh flux. Support connectors so "
                        "you do not tear pads when pulling."
                    ),
                    S(
                        h="Bridges on fine pitch",
                        p="Add flux, touch with a clean tip, and draw excess along the row — or use braid. "
                        "A little solder plus flux often clears bridges better than a dry tip.",
                    ),
                    S(
                        h="Replacing a through-hole part",
                        p="Clear each hole, pull the part, clean pads, insert the new part, solder. Verify "
                        "orientation (diodes, electrolytics, ICs) before soldering all pins.",
                    ),
                    S(
                        h="Hot air (preview)",
                        p="SMD rework often uses hot air at controlled temperature/flow. Aim evenly, use "
                        "nozzles that fit, and mind nearby plastic connectors. Practice on scrap first — "
                        "this is a skill of its own.",
                    ),
                    S(
                        h="Know when to stop",
                        p="A board with shredded pads and lifted vias may cost more in time than a new board. "
                        "Good judgement is part of rework.",
                    ),
                ],
                [
                    Q("Before soldering a replacement IC…", ["confirm orientation", "bend all pins randomly", "skip pin 1 checks", "power the board at 24 V"], "confirm orientation", "Pin 1 mistakes are painful."),
                    Q("Clearing a fine-pitch bridge often needs…", ["flux plus heat / braid", "more solder only without flux", "water immersion while powered", "a hammer"], "flux plus heat / braid", "Flux is your friend."),
                    Q("Support connectors during removal to…", ["avoid lifting pads", "increase ESD", "melt plastic faster on purpose", "short power rails"], "avoid lifting pads", "Mechanical stress kills pads."),
                    Q("Practice hot air on…", ["scrap boards first", "your only production board", "mains PSUs live", "lithium packs"], "scrap boards first", "Build skill safely."),
                    Q("Fresh flux during rework…", ["helps wetting and heat transfer", "is never used", "replaces solder alloy entirely", "must be acid plumbing flux"], "helps wetting and heat transfer", "Rework loves flux."),
                    Q("Sometimes the best rework decision is…", ["replace the board / stop digging", "heat until the FR4 carbonises", "add jumpers on every pin blindly", "ignore bridges"], "replace the board / stop digging", "Time vs value."),
                ],
            ),
        ],
    }


def pcb_design():
    return {
        "id": "pcb-design",
        "name": "PCB design",
        "title": "From schematic to fab files",
        "intro": (
            "Printed circuit boards turn schematics into copper. These lessons walk through schematic "
            "capture, footprints, layout rules, copper pours, design-rule checks, fabrication outputs "
            "and a look at assembly — enough to order a first prototype without guessing every acronym."
        ),
        "lessons": [
            L(
                "schematic-capture",
                "Schematic capture",
                "Drawing the circuit cleanly before layout.",
                [
                    S(
                        p="<b>Schematic capture</b> is drawing the circuit in EDA software (KiCad, Eagle, "
                        "Altium…). Hierarchy, named nets and readable symbols prevent layout disasters. "
                        "The schematic is the electrical contract; the PCB is the physical one."
                    ),
                    S(
                        h="Habits",
                        p="Left-to-right signal flow, top power rails, bottom grounds when practical. "
                        "Label important nets. Put decoupling capacitors next to their IC on the schematic "
                        "so you remember them in layout.",
                    ),
                    S(
                        h="ERC",
                        p="Electrical rule checks catch undriven inputs, two outputs fighting, and missing "
                        "power flags. Fix ERC before layout — copper will not heal a shorted net name.",
                    ),
                    S(
                        h="Annotations",
                        p="Reference designators must be unique. Values must match what you will buy. A "
                        "schematic that says 0.1 µF but a BOM that says 100 pF wastes a spin.",
                    ),
                ],
                [
                    Q("Schematic capture defines…", ["electrical connectivity and intent", "exact copper millimetres only", "solder paste chemistry", "box colour"], "electrical connectivity and intent", "Schematic first."),
                    Q("ERC helps catch…", ["undriven pins and power conflicts", "silk font beauty only", "shipping prices", "flux brand"], "undriven pins and power conflicts", "Electrical rules."),
                    Q("Decoupling caps should appear…", ["on the schematic near their IC", "only in a text email", "never", "as mechanical holes only"], "on the schematic near their IC", "If it is not drawn, it is forgotten."),
                    Q("Named nets are useful because…", ["they connect across the sheet without spaghetti", "they replace footprints", "they set reflow profiles", "they measure ESR"], "they connect across the sheet without spaghetti", "Net names join nodes."),
                    Q("Unique reference designators prevent…", ["BOM and layout confusion", "Ohm's law", "soldering", "gerber generation entirely"], "BOM and layout confusion", "Each R/C/U needs a unique id."),
                    Q("Fix schematic errors…", ["before spending hours on layout", "only after the fab ships", "by mirroring copper oddly", "with more vias randomly"], "before spending hours on layout", "Garbage in, garbage out."),
                ],
            ),
            L(
                "footprints",
                "Footprints and land patterns",
                "The copper the part actually sits on.",
                [
                    S(
                        p="A <b>footprint</b> (land pattern) is the pads, courtyard and silk that match a "
                        "physical part. The schematic symbol is logical; the footprint is geometric. "
                        "Mismatches are a top cause of unusable boards."
                    ),
                    S(
                        h="Datasheet land patterns",
                        p="Component datasheets recommend pad sizes. IPC guidelines refine them for "
                        "density vs manufacturability. Measure a sample part if the library looks suspicious.",
                    ),
                    S(
                        h="Courtyard and 3D",
                        p="Courtyards keep parts from colliding. 3D models catch connector overhangs into "
                        "enclosures before you order aluminium milled boxes.",
                    ),
                    S(
                        h="Pin 1",
                        p="Mark pin 1 in silk consistently. Polarised parts (diodes, electrolytics, "
                        "connectors) need clear markings on both schematic and board.",
                    ),
                    S(
                        code="Symbol (logic)  →  Footprint (geometry)\n  U1 74HC00     →  SOIC-14 pads + silk + courtyard",
                    ),
                ],
                [
                    Q("A footprint is…", ["the copper/silk geometry for a part", "the Boolean equation", "the baud rate", "the enclosure colour"], "the copper/silk geometry for a part", "Land pattern."),
                    Q("Trust but verify footprints using…", ["datasheets and measurement", "only part name vibes", "random pad sizes", "LED brightness"], "datasheets and measurement", "Libraries can be wrong."),
                    Q("Courtyards help…", ["prevent physical collisions", "set logic levels", "choose solder alloy", "define UART parity"], "prevent physical collisions", "Keep bodies apart."),
                    Q("Pin 1 marking matters so…", ["assemblers orient the part correctly", "copper pours look nicer only", "DRC ignores spacing", "flux becomes optional"], "assemblers orient the part correctly", "Orientation errors are costly."),
                    Q("Schematic symbol vs footprint…", ["logic vs geometry", "identical always", "both are only BOM text", "neither is needed"], "logic vs geometry", "Two linked views."),
                    Q("Polarised footprints must show…", ["which way the part goes", "only the value text upside down randomly", "no silk ever", "mains rating on every resistor"], "which way the part goes", "Prevent reverse insertion."),
                ],
            ),
            L(
                "layout-rules",
                "Layout rules",
                "Clearance, width, and where parts sit.",
                [
                    S(
                        p="<b>Layout</b> places footprints and routes copper. Respect clearance (space between "
                        "copper) and track width (current + fab limits). A 0.3 mm trace may be fine for "
                        "signals; power paths need wider copper or pours."
                    ),
                    S(
                        h="Current and width",
                        p="Rough ballpark: a 1 mm trace on outer 1 oz copper carries on the order of a couple "
                        "of amps with modest temperature rise — use a trace-width calculator for real designs. "
                        "Vias add resistance; parallel vias help."
                    ),
                    S(
                        h="Return paths",
                        p="Every signal has a return. A solid ground plane under signal traces keeps loops "
                        "small. Slots that force returns to detour create noise and EMI headaches.",
                    ),
                    S(
                        h="Placement",
                        p="Place connectors on edges, crystals close to MCU with short traces, decoupling "
                        "caps tight to power pins. Think assembly and probing — can a human debug this?",
                    ),
                    S(
                        code="Clearance: copper-to-copper gap (fab min + your margin)\nWidth: set by current + impedance needs\n\nDecoupling: VCC pin ---[via]--- cap --- GND plane",
                    ),
                ],
                [
                    Q("Clearance means…", ["minimum space between copper features", "solder melting point", "LED viewing angle", "baud spacing"], "minimum space between copper features", "Keep copper from shorting."),
                    Q("Higher current generally needs…", ["wider traces or pours", "thinner traces always", "only silk text", "floating returns"], "wider traces or pours", "Lower resistance, less heat."),
                    Q("Decoupling capacitors should be…", ["close to IC power pins", "at the far corner always", "optional art", "only on the schematic never laid out"], "close to IC power pins", "Short loops."),
                    Q("A ground plane helps…", ["provide short return paths", "increase loop area on purpose", "replace all capacitors", "remove the need for VCC"], "provide short return paths", "Small loops, quieter circuits."),
                    Q("Crystals should sit…", ["near the MCU with short traces", "across the board on long antennas", "on a separate unconnected PCB", "only as silk drawings"], "near the MCU with short traces", "Keep sensitive clocks tight."),
                    Q("Vias on power paths…", ["add resistance — use enough of them", "have zero resistance always", "block DC", "set logic HIGH"], "add resistance — use enough of them", "Parallel vias share current."),
                ],
            ),
            L(
                "copper-pour",
                "Copper pour and planes",
                "Fills, zones and stitching.",
                [
                    S(
                        p="A <b>copper pour</b> (zone) fills an area with copper tied to a net — often GND "
                        "or a power rail. Pours lower impedance, help heat spreading and simplify routing "
                        "of returns."
                    ),
                    S(
                        h="Thermal reliefs",
                        p="Pads in a pour may use thermal relief spokes so hand soldering is possible. Solid "
                        "connections sink heat into the plane and can make soldering harder.",
                    ),
                    S(
                        h="Stitching vias",
                        p="Multi-layer boards stitch ground pours with vias so return currents can change "
                        "layers. Around board edges, via fences sometimes help EMC — with thought, not superstition.",
                    ),
                    S(
                        h="Islands",
                        p="Unconnected copper islands can float and cause surprises — remove orphans or "
                        "connect them deliberately. DRC/zone refill after edits.",
                    ),
                ],
                [
                    Q("A copper pour is often tied to…", ["GND or a power net", "a random unnamed net always", "silk only", "the logo bitmap"], "GND or a power net", "Planes/pours need a net."),
                    Q("Thermal reliefs exist mainly to…", ["make pads solderable despite plane heat sinking", "increase inductance unboundedly for fun", "remove ground", "etch the board number"], "make pads solderable despite plane heat sinking", "Spokes limit heat flow while soldering."),
                    Q("Stitching vias help…", ["connect pours across layers", "cut all grounds", "replace solder mask", "set baud rate"], "connect pours across layers", "Layer transitions for returns."),
                    Q("Floating copper islands should be…", ["removed or deliberately tied down", "maximised always", "powered from mains", "used as antennas only by accident without thought"], "removed or deliberately tied down", "Avoid accidental radiators/antennas."),
                    Q("Pours help power delivery by…", ["lowering impedance vs skinny traces", "raising resistance on purpose", "blocking DC", "deleting decoupling needs entirely always"], "lowering impedance vs skinny traces", "Wide copper carries current better."),
                    Q("After moving pours/tracks…", ["refill zones and re-run DRC", "ship immediately without checks", "delete the ground net", "ignore clearance"], "refill zones and re-run DRC", "Keep copper in sync."),
                ],
            ),
            L(
                "drc",
                "Design rule checks",
                "Letting the computer find spacing mistakes.",
                [
                    S(
                        p="<b>DRC</b> (design rule check) compares your layout to constraints: clearance, "
                        "track width, annular ring, hole size, courtyard overlap. Set rules to your fab's "
                        "capabilities plus margin."
                    ),
                    S(
                        h="Fab capabilities",
                        p="A cheap proto house might allow 0.15 mm clearance and 0.15 mm tracks. Tighter "
                        "needs cost more. Do not design to the absolute minimum on a first board without reason.",
                    ),
                    S(
                        h="Unconnected copper / shorting",
                        p="DRC and connectivity checks find shorts between nets and unrouted ratsnest airwires. "
                        "Clear every airwire before celebrating.",
                    ),
                    S(
                        h="Silk and mask",
                        p="Silk on pads is a classic nuisance. Solder-mask expansion rules keep mask from "
                        "covering pads. Run the checks your EDA offers for manufacturing layers too.",
                    ),
                ],
                [
                    Q("DRC stands for…", ["design rule check", "direct resistance coupling", "diode reverse clamp", "drill radius constant"], "design rule check", "Automated geometry/electrical rules."),
                    Q("Rules should match…", ["your fab's process + margin", "wishful thinking only", "mains wiring code exclusively", "LED Vf"], "your fab's process + margin", "Design for manufacturability."),
                    Q("An airwire in the ratsnest means…", ["an unfinished connection", "a completed pour", "a silk line", "a mounting hole"], "an unfinished connection", "Still to route (or to connect via pour)."),
                    Q("Silk on pads is bad because…", ["it interferes with soldering", "it improves wetting always", "fabs require it on every pad", "it replaces mask"], "it interferes with soldering", "Keep silk off pads."),
                    Q("Annular ring refers to…", ["copper around a drilled hole", "flux chemistry", "clock jitter", "battery chemistry"], "copper around a drilled hole", "Pad copper surrounding the hole."),
                    Q("Before ordering boards, clear…", ["DRC errors and unrouted connections", "only the schematic title", "nothing at all", "just the README"], "DRC errors and unrouted connections", "Fix first."),
                ],
            ),
            L(
                "fab-files",
                "Fab files and BOM",
                "Gerbers, drill files and what to send.",
                [
                    S(
                        p="Fabricators need <b>Gerber</b> (or equivalent) layer plots, <b>drill</b> files, "
                        "and usually a README noting layer stack, thickness and colour. Many shops also "
                        "accept native KiCad/Eagle with caveats — Gerbers remain the lingua franca."
                    ),
                    S(
                        h="Layers",
                        p="Typical two-layer set: top copper, bottom copper, top/bottom silk, top/bottom "
                        "mask, board outline, drills. Four-layer adds inner planes. Name files clearly.",
                    ),
                    S(
                        h="BOM and CPL",
                        p="A <b>BOM</b> (bill of materials) lists every part to buy. For assembly services, "
                        "a <b>CPL/centroid</b> file gives pick-and-place coordinates and rotations.",
                    ),
                    S(
                        h="Check plots",
                        p="View Gerbers in a Gerber viewer before upload. Confirm outline, holes land on "
                        "pads, and layers are not mirrored by mistake.",
                    ),
                    S(
                        code="Send typically:\n  Gerbers + drill + stackup notes\n  BOM (for assembly)\n  Centroid/CPL (for SMT assembly)",
                    ),
                ],
                [
                    Q("Gerber files describe…", ["each manufacturing layer's artwork", "C source code", "only the schematic PDF", "flux type"], "each manufacturing layer's artwork", "Plots for fab cameras/plotters."),
                    Q("Drill files define…", ["hole locations and sizes", "silk fonts only", "LED colours", "baud rates"], "hole locations and sizes", "CNC drilling data."),
                    Q("A BOM is…", ["the list of parts to purchase/assemble", "a copper pour", "a DRC error", "a crystal package only"], "the list of parts to purchase/assemble", "Bill of materials."),
                    Q("View Gerbers before ordering to…", ["catch mirrored/missing layers", "increase board cost always", "remove the need for drills", "program the MCU"], "catch mirrored/missing layers", "Viewer QA."),
                    Q("Pick-and-place needs…", ["centroid positions and rotations", "only the box art", "mains frequency", "solder brand lore"], "centroid positions and rotations", "CPL/centroid file."),
                    Q("Board outline must be…", ["clear in the mechanical/outline layer", "guessed by the fab from silk", "optional always", "drawn only in copper as shorts"], "clear in the mechanical/outline layer", "Fabs cut to outline."),
                ],
            ),
            L(
                "assembly",
                "Assembly basics",
                "Hand stuff, stencil paste and order of operations.",
                [
                    S(
                        p="<b>Assembly</b> puts parts on the fabricated board. Hobbyists hand-solder; "
                        "services use solder paste stencils, pick-and-place, and reflow ovens. Design "
                        "choices (fiducials, spacing) affect how easy assembly is."
                    ),
                    S(
                        h="Hand assembly order",
                        p="Often: low parts first, then taller. Or all SMD reflow first, then through-hole. "
                        "Polarised parts get double-checked before heat.",
                    ),
                    S(
                        h="Stencils",
                        p="A stainless stencil aligns to pads; paste is squeegeed through apertures. Paste "
                        "volume depends on aperture design — another reason footprints matter.",
                    ),
                    S(
                        h="Inspection",
                        p="Check bridges, tombstoned passives, polarity marks and missing parts. Power up "
                        "with current limit on a first article. Smoke is a teacher; prefer not to summon it.",
                    ),
                    S(
                        h="Panelisation",
                        p="Small boards may be panelised with mouse bites or V-grooves. Add fiducials for "
                        "machines. Ask the assembler what they need.",
                    ),
                ],
                [
                    Q("Solder paste is commonly applied…", ["through a stencil onto pads", "with a paint roller on silk", "only after full reflow", "into mounting holes only"], "through a stencil onto pads", "Stencil printing."),
                    Q("Fiducials help…", ["machines align the board", "humans read Boolean", "increase inductance", "set USB-C pinouts"], "machines align the board", "Optical alignment marks."),
                    Q("First power-up should use…", ["current-limited supply when possible", "unlimited car battery always", "mains directly on 3.3 V rails", "no ground"], "current-limited supply when possible", "Survive first mistakes."),
                    Q("Tombstoning refers to…", ["a passive standing up on one pad", "extra vias", "silk text", "a type of connector"], "a passive standing up on one pad", "Uneven paste/heat."),
                    Q("Polarised parts need…", ["orientation checks before soldering", "random placement", "no markings", "AC only"], "orientation checks before soldering", "Prevent reverse install."),
                    Q("Good spacing between parts helps…", ["hand soldering and inspection", "only the marketing photos", "DRC fail on purpose", "remove ground planes"], "hand soldering and inspection", "Design for humans too."),
                ],
            ),
            L(
                "stackup",
                "Layers and stackup",
                "Two-layer vs four-layer and what changes.",
                [
                    S(
                        p="<b>Stackup</b> is how copper and insulating layers are ordered. A two-layer board "
                        "has top and bottom copper. A four-layer board often puts signals on outside layers "
                        "and continuous ground/power planes inside — quieter and easier for dense designs."
                    ),
                    S(
                        h="When to go four-layer",
                        p="Tight routing, fast edges, or picky analog sections benefit from planes. Cost is "
                        "higher than two-layer but prototypes are still affordable. Controlled impedance needs "
                        "specified stackup dielectric thickness.",
                    ),
                    S(
                        h="Impedance (preview)",
                        p="USB, HDMI and RF traces may need 50 Ω or 90 Ω differential controlled impedance. "
                        "That is a conversation with the fab's stackup chart — not a guess at track width alone.",
                    ),
                    S(
                        h="Start simple",
                        p="Many first projects succeed on two-layer with a poured ground bottom and careful "
                        "routing on top. Master that before chasing exotic RF stackups.",
                    ),
                ],
                [
                    Q("A common four-layer idea is…", ["signal / plane / plane / signal", "silk / silk / silk / silk", "only solder mask layers", "four disconnected antennas"], "signal / plane / plane / signal", "Classic friendly stackup."),
                    Q("Inner ground planes help…", ["return paths and shielding", "increase every loop to board size", "replace all parts", "remove DRC"], "return paths and shielding", "Planes quiet a board."),
                    Q("Controlled impedance requires…", ["known stackup geometry + dielectric", "only silk colour", "random width", "no fab involvement"], "known stackup geometry + dielectric", "Width alone is not enough."),
                    Q("Two-layer boards can still work well if you…", ["pour ground and route carefully", "ignore returns entirely", "skip decoupling", "cross every trace over slots"], "pour ground and route carefully", "Many hobby boards succeed thus."),
                    Q("Stackup means…", ["the ordered copper/dielectric sandwich", "the BOM sorted by price only", "flux activation temp only", "UART pin swap"], "the ordered copper/dielectric sandwich", "Layer cake of the PCB."),
                    Q("Move to more layers when…", ["density/noise/impedance needs justify cost", "you want slower shipping only", "LEDs are red", "the schematic has a title"], "density/noise/impedance needs justify cost", "Use complexity when needed."),
                ],
            ),
        ],
    }


def systems():
    return {
        "id": "systems",
        "name": "Systems",
        "title": "Power, noise, batteries and embedded overview",
        "intro": (
            "Parts and boards become systems when power, grounding and noise enter the story. These "
            "lessons introduce supplies, grounding, noise coupling, EMC intuition, batteries and a map "
            "of embedded systems — how hardware and firmware share responsibility."
        ),
        "lessons": [
            L(
                "power-supplies",
                "Power supplies",
                "Linear vs switching, and clean rails.",
                [
                    S(
                        p="Circuits need energy at the right voltage. A <b>linear regulator</b> drops excess "
                        "voltage as heat (simple, quiet). A <b>switching regulator</b> chops and filters to "
                        "waste less heat (efficient, noisier if poorly laid out)."
                    ),
                    S(
                        h="Dropout",
                        p="Linear regulators need Vin above Vout by a dropout margin. An LDO (low dropout) "
                        "might hold 3.3 V from 3.6 V; an old 7805 needs more headroom above 5 V.",
                    ),
                    S(
                        h="Heat",
                        p="Linear: P ≈ (Vin − Vout) × I. 12 V in to 5 V at 0.5 A wastes ~3.5 W — that needs "
                        "a heatsink or a rethink toward a buck switcher.",
                    ),
                    S(
                        h="Switchers",
                        p="Buck (step-down), boost (step-up), buck-boost… Follow the datasheet layout: short "
                        "hot loops, recommended inductors/caps. A bad switcher layout radiates noise into everything.",
                    ),
                    S(code="Linear:  Vin --> LDO --> Vout   heat ≈ (Vin-Vout)*I\nBuck:    Vin --> switcher+L+C --> Vout  (efficient)"),
                ],
                [
                    Q("Linear regulators dissipate…", ["(Vin−Vout)×I as heat", "zero heat always", "only magnetic energy", "light exclusively"], "(Vin−Vout)×I as heat", "Dropout voltage times current."),
                    Q("Switching regulators are chosen mainly for…", ["efficiency", "maximum heat", "removing inductors", "eliminating capacitors"], "efficiency", "Less waste heat."),
                    Q("LDO means…", ["low-dropout linear regulator", "large discrete oscillator", "logic diode output", "lithium discharge only"], "low-dropout linear regulator", "Works with small Vin−Vout."),
                    Q("12 V → 5 V at 0.5 A linearly wastes about…", ["3.5 W", "0 W", "60 W", "0.5 W"], "3.5 W", "7 V × 0.5 A = 3.5 W."),
                    Q("Buck converters…", ["step voltage down efficiently", "only step up", "are always linear", "forbid inductors"], "step voltage down efficiently", "Buck = step-down switcher."),
                    Q("Switcher layout matters because…", ["poor layout radiates noise / hurts regulation", "inductors ignore geometry", "copper cannot carry switching current", "DRC disables switchers"], "poor layout radiates noise / hurts regulation", "Hot loops must be tight."),
                ],
            ),
            L(
                "grounding",
                "Grounding",
                "Reference nodes, star points and ground loops.",
                [
                    S(
                        p="<b>Ground</b> is the reference node your voltages are measured against — not mystical "
                        "earth magic on a battery gadget. On a PCB it is usually a pour or plane. Poor "
                        "grounding shows up as noise, resets and \"impossible\" analog readings."
                    ),
                    S(
                        h="Star vs plane",
                        p="A star ground joins noisy and sensitive returns at one point. A solid plane is "
                        "often better for high-speed digital if not shredded by slots. Mixed designs may "
                        "split analog/digital regions that meet at a single bridge."
                    ),
                    S(
                        h="Ground loops",
                        p="Multiple paths between grounded points can pick up interference. Audio systems "
                        "hum; sensor systems drift. Isolation, careful cabling and single-point bonds are tools.",
                    ),
                    S(
                        h="Earth vs circuit ground",
                        p="Mains earth is a safety conductor. Circuit GND may connect to earth through a "
                        "PSU — or float on a battery. Know which you have before probing with earthed scopes "
                        "(scope-grounding mistakes are a classic smoke source on mains-referenced gear).",
                    ),
                    S(
                        h="Safety note",
                        p="Do not defeat safety earth on mains equipment. Battery-powered learning kits avoid "
                        "most of these hazards — stay there until you train for mains work.",
                    ),
                ],
                [
                    Q("Circuit ground is primarily…", ["the voltage reference node", "always identical to soil earth", "a type of fuse", "an LED colour"], "the voltage reference node", "Measurements need a reference."),
                    Q("A ground plane helps by…", ["giving low-impedance returns", "maximising loop area", "removing the need for VCC", "storing water"], "giving low-impedance returns", "Planes keep returns short."),
                    Q("Ground loops can cause…", ["hum and interference", "perfect ADC readings always", "higher solder melting points", "faster crystals"], "hum and interference", "Loop area picks up noise."),
                    Q("Probing mains-referenced circuits with an earthed scope can…", ["create dangerous shorts via the probe ground", "always be perfectly safe", "charge Li-ion safely", "replace isolation transformers"], "create dangerous shorts via the probe ground", "Know your references."),
                    Q("Splitting analog/digital grounds is done…", ["carefully, often meeting at one point", "by never connecting them ever in any design", "with antenna coils only", "using solder mask as a conductor"], "carefully, often meeting at one point", "Controlled joining beats accidental loops."),
                    Q("Battery gadgets often have…", ["floating circuit ground relative to earth", "mandatory earth stakes", "no reference node at all", "only AC grounds"], "floating circuit ground relative to earth", "No earth wire on many portables."),
                ],
            ),
            L(
                "noise",
                "Noise coupling",
                "How unwanted signals sneak in.",
                [
                    S(
                        p="<b>Noise</b> is any unwanted electrical disturbance. It couples by conduction along "
                        "wires, by electric fields (capacitive coupling), by magnetic fields (inductive "
                        "coupling), or as radio waves. Debugging starts by asking which path is plausible."
                    ),
                    S(
                        h="Conducted",
                        p="Motors and relays put spikes on shared supplies. Decoupling, separate supplies "
                        "and snubbers help. Measure at the victim with a scope relative to a sensible ground.",
                    ),
                    S(
                        h="Radiated / coupled",
                        p="Long parallel wires form accidental transformers and capacitors. Twist pairs, "
                        "shorten loops, separate sensitive analog from noisy digitals/PWM cables.",
                    ),
                    S(
                        h="Bypass and filtering",
                        p="0.1 µF near IC power pins handles fast edges; bulk electrolytics/ceramics handle "
                        "slower demand. Ferrite beads and RC snubbers tame specific bands — measure, don't only sprinkle.",
                    ),
                    S(
                        code="Victim ADC <--coupled--> motor PWM cable\nFix ideas: separate returns, twist, filter, distance,\n           snubber on motor, star power feeds",
                    ),
                ],
                [
                    Q("Capacitive coupling involves…", ["electric fields between conductors", "only solder chemistry", "nuclear decay", "baud rate tables"], "electric fields between conductors", "dV/dt through stray C."),
                    Q("Inductive coupling involves…", ["magnetic fields / loop area", "only silk-screen ink", "LED colour", "file names"], "magnetic fields / loop area", "di/dt through mutual inductance."),
                    Q("Decoupling caps near ICs fight…", ["supply bounce from fast current demand", "crystal packaging", "solder alloy choice", "enclosure paint"], "supply bounce from fast current demand", "Local charge reservoir."),
                    Q("Twisting a signal with its return…", ["reduces loop area / pickup", "increases antenna gain always", "removes the need for ground", "doubles voltage"], "reduces loop area / pickup", "Classic cable hygiene."),
                    Q("Shared supply spikes from motors are…", ["conducted noise", "always radiated light only", "boolean errors", "DRC failures"], "conducted noise", "Noise on the wires."),
                    Q("A first debug question for noise is…", ["how is it coupling into the victim?", "which font is on the silk?", "is Ohm's law false?", "did copper change element?"], "how is it coupling into the victim?", "Path matters."),
                ],
            ),
            L(
                "emc",
                "EMC intuition",
                "Not failing emissions or immunity tests — in spirit.",
                [
                    S(
                        p="<b>EMC</b> (electromagnetic compatibility) means your device neither emits too much "
                        "interference nor misbehaves in the presence of interference. Formal testing uses "
                        "standards; intuition still helps hobby and product design."
                    ),
                    S(
                        h="Emissions",
                        p="Fast edges and large loop areas radiate. Slow edges when you can, small loops, "
                        "filters on cables, and solid return planes cut emissions. Cables are antennas.",
                    ),
                    S(
                        h="Immunity",
                        p="ESD into a connector, radiated RF from a phone, conducted surges on power — "
                        "design margins, TVS diodes, filtering and watchdog timers improve survival.",
                    ),
                    S(
                        h="Practical mindset",
                        p="You may not own a TEM cell, but you can keep loops small, terminate cables "
                        "sensibly, and avoid spraying 50 MHz harmonics from a sloppy switcher layout.",
                    ),
                    S(
                        h="Safety vs EMC",
                        p="Safety isolation and creepage are separate from EMC filters. Mains designs need "
                        "both — and trained practice. Stay on SELV/low-voltage projects while learning.",
                    ),
                ],
                [
                    Q("EMC is about…", ["emissions and immunity", "only solder temperature", "only LED efficiency", "only BOM cost"], "emissions and immunity", "Don't emit too much; don't wilt from others."),
                    Q("Cables often act as…", ["antennas", "perfect Faraday bricks", "crystal ovens", "power meters"], "antennas", "Long wires radiate/receive."),
                    Q("Smaller loop area generally…", ["reduces radiation and pickup", "increases emissions always", "removes the need for ground", "slows light"], "reduces radiation and pickup", "Loop area is a lever."),
                    Q("TVS diodes are often used for…", ["clamping ESD/transients on I/O", "generating clocks", "raising baud", "etching PCBs"], "clamping ESD/transients on I/O", "Transient protection."),
                    Q("Fast edges tend to…", ["create more high-frequency content", "always reduce EMI", "eliminate harmonics", "remove the need for returns"], "create more high-frequency content", "Slower edges can be kinder."),
                    Q("While learning, prefer…", ["low-voltage projects before mains EMC/safety designs", "open mains PSUs on the carpet", "defeating earth \"for measurements\"", "unfiltered motor leads around ADCs for fun"], "low-voltage projects before mains EMC/safety designs", "Skills before hazards."),
                ],
            ),
            L(
                "batteries",
                "Batteries",
                "Cells, packs, charging and safe handling.",
                [
                    S(
                        p="<b>Batteries</b> store chemical energy. Alkaline AA cells are simple for learning. "
                        "<b>Li-ion/LiPo</b> packs offer high energy density but need proper charge circuits "
                        "and gentle handling. <b>Warning:</b> shorted or punctured lithium cells can catch fire."
                    ),
                    S(
                        h="Voltage and capacity",
                        p="Nominal voltage × amp-hours ≈ watt-hours (rough). A 3.7 V 2 Ah cell is about "
                        "7.4 Wh. Capacity depends on discharge rate and temperature.",
                    ),
                    S(
                        h="Charging",
                        p="Lithium cells need CC/CV chargers and usually protection circuits (PCM/BMS). "
                        "Do not trickle-charge Li-ion like NiMH. Never charge unattended on a flammable surface.",
                    ),
                    S(
                        h="Series and parallel",
                        p="Series adds voltage; parallel adds capacity — but cells must be matched and "
                        "properly managed. Random parallel of unknown scrap cells is a bad idea.",
                    ),
                    S(
                        h="Storage",
                        p="Store LiPo partly charged in a safe bag/container. Recycle damaged packs at proper "
                        "facilities — do not bin them in household trash.",
                    ),
                ],
                [
                    Q("Li-ion charging should use…", ["a proper CC/CV charger / BMS", "a bare 12 V car battery across one cell", "unlimited current forever", "AC mains on the cell tabs"], "a proper CC/CV charger / BMS", "Chemistry demands control."),
                    Q("Series cells increase…", ["pack voltage", "only capacity, never voltage", "solder melting point", "baud rate"], "pack voltage", "Voltages add in series."),
                    Q("A puffed LiPo should be…", ["retired and recycled properly", "punctured outdoors for fun", "charged hotter", "used as a heatsink"], "retired and recycled properly", "Swelling = end of life."),
                    Q("Alkaline AA cells are handy for learning because…", ["they are simple and relatively forgiving", "they need BMS balancing always", "they are 48 V nominal", "they are rechargeable like Li-ion without caveats"], "they are simple and relatively forgiving", "Good beginner energy source."),
                    Q("Shorting a lithium pack is dangerous because…", ["huge current / fire risk", "voltage becomes safer", "capacity increases", "ESD disappears"], "huge current / fire risk", "Energy dumps fast."),
                    Q("Rough energy in Wh is…", ["V × Ah", "V / Ah", "A × Ω only", "C × R"], "V × Ah", "Order-of-magnitude pack energy."),
                ],
            ),
            L(
                "embedded",
                "Embedded systems overview",
                "Hardware + firmware as one product.",
                [
                    S(
                        p="An <b>embedded system</b> is a computer inside a product: MCU/SoC, sensors, "
                        "actuators, power and firmware that may run for years. Electronics Learner courses "
                        "give the hardware vocabulary; firmware makes pins do useful work."
                    ),
                    S(
                        h="Layers",
                        p="Hardware abstraction → drivers → application logic. Watchdogs reset hung software. "
                        "Brown-out detectors stop code running at illegal voltages. These features are part of system design.",
                    ),
                    S(
                        h="Interfaces revisited",
                        p="GPIO, ADC, PWM, UART, SPI, I²C connect the chip to the world. Timing deadlines "
                        "(motor control, communications) dictate architecture choices — polling vs interrupts vs RTOS.",
                    ),
                    S(
                        h="Bring-up",
                        p="Power rails correct → clock running → debug probe connects → blink an LED → "
                        "then talk on a bus. Incremental bring-up beats flashing a full app onto untested hardware.",
                    ),
                    S(
                        h="Documentation",
                        p="Schematics, pin tables, power budgets and a README save future-you. Version the "
                        "firmware with the board revision it expects.",
                    ),
                    S(
                        code="Bring-up ladder:\n  1) rails & current limit\n  2) reset/clock\n  3) SWD/JTAG or UART boot\n  4) blink\n  5) buses/sensors\n  6) application",
                    ),
                ],
                [
                    Q("Embedded systems combine…", ["hardware and dedicated firmware", "only cloud spreadsheets", "mains wiring without software ever", "solder flux chemistry alone"], "hardware and dedicated firmware", "Computer inside a product."),
                    Q("A watchdog timer helps by…", ["resetting runaway software", "raising battery voltage", "etching PCBs", "setting silk colour"], "resetting runaway software", "Recovery from hangs."),
                    Q("Good bring-up order starts with…", ["power rails, then simple proofs like blink", "full GUI apps first", "motor full-power tests first", "radiated EMC chamber booking only"], "power rails, then simple proofs like blink", "Incremental trust."),
                    Q("Brown-out detection protects against…", ["running at illegal low voltage", "too much flash storage", "bright LEDs", "cold solder alone"], "running at illegal low voltage", "MCUs misbehave when VCC sags."),
                    Q("PWM is often used to…", ["drive motors/LEDs with duty cycle control", "measure resistance directly", "replace crystals", "create USB data automatically"], "drive motors/LEDs with duty cycle control", "Pulse-width modulation."),
                    Q("Matching firmware to board revision matters because…", ["pins and parts change between spins", "C always ignores hardware", "Git replaces schematics", "baud is independent of wiring always"], "pins and parts change between spins", "Hardware/software contracts."),
                ],
            ),
            L(
                "decoupling",
                "Decoupling and power integrity",
                "Keeping rails quiet when chips switch.",
                [
                    S(
                        p="<b>Power integrity</b> is keeping supply voltage within bounds when currents jump. "
                        "<b>Decoupling capacitors</b> right at IC power pins supply brief bursts so the rail "
                        "does not dip each clock edge."
                    ),
                    S(
                        h="Multiple values",
                        p="A bulk capacitor (e.g. 10 µF) plus local 100 nF ceramics is a common pattern. "
                        "The small ceramics handle fast edges; bulk handles longer dips. Follow IC datasheets "
                        "for recommended counts.",
                    ),
                    S(
                        h="Loop inductance",
                        p="Long thin paths between cap and pins add inductance — the cap \"arrives late\". "
                        "Place caps close, use short vias to planes, avoid skinny necks.",
                    ),
                    S(
                        h="Symptoms",
                        p="Random resets, flaky ADCs, eye diagrams falling apart: sometimes it is software, "
                        "sometimes the rail is bouncing. Scope VCC at the pins with a short ground spring if you can.",
                    ),
                    S(
                        code="Plane --- via --- VCC pin\n              |\n            [100n]\n              |\nPlane --- via --- GND pin   (keep this loop tiny)",
                    ),
                ],
                [
                    Q("Decoupling capacitors should sit…", ["close to IC power/ground pins", "only at the far connector", "off-board in another room", "in series with every data line always"], "close to IC power/ground pins", "Minimise loop inductance."),
                    Q("100 nF ceramics near pins mainly help with…", ["fast transient current demand", "setting UART baud", "mechanical stiffness only", "silk adhesion"], "fast transient current demand", "High-frequency bypass."),
                    Q("Bulk capacitors help with…", ["slower / larger energy dips", "replacing all ceramics always", "generating clocks", "ESD bags"], "slower / larger energy dips", "Energy reservoir."),
                    Q("Long cap leads/traces hurt because…", ["inductance delays the capacitor's help", "resistance becomes zero", "flux vanishes", "DRC passes automatically"], "inductance delays the capacitor's help", "Loop L matters."),
                    Q("Rail bounce can look like…", ["random resets / flaky analog", "perfectly stable logic always", "increased solder strength", "higher crystal purity"], "random resets / flaky analog", "Power integrity symptoms."),
                    Q("Power integrity focuses on…", ["keeping VCC within limits under transient loads", "only the colour of LEDs", "silkscreen fonts", "enclosure branding"], "keeping VCC within limits under transient loads", "That is the goal."),
                ],
            ),
        ],
    }


def catalog_entries():
    return [
        {
            "id": "foundations",
            "name": "Foundations",
            "era": "Core · units and laws",
            "blurb": "Charge, current, voltage, resistance, Ohm's law, power, AC vs DC, meters and safety.",
            "group": "foundations",
            "tags": ["Basics", "Safety"],
        },
        {
            "id": "components",
            "name": "Components",
            "era": "Parts · passives to sensors",
            "blurb": "Resistors, capacitors, inductors, diodes, LEDs, BJT/MOSFET intro and sensors.",
            "group": "components",
            "tags": ["Passives", "Semiconductors"],
        },
        {
            "id": "circuits",
            "name": "Circuits",
            "era": "Networks · analysis building blocks",
            "blurb": "Series/parallel, Kirchhoff, dividers, RC timing, filters, amplifiers and schematics.",
            "group": "circuits",
            "tags": ["Analysis", "Schematics"],
        },
        {
            "id": "digital",
            "name": "Digital",
            "era": "Logic · MCU interfaces",
            "blurb": "Logic levels, gates, Boolean, flip-flops, clocks, GPIO and UART/SPI/I²C.",
            "group": "digital",
            "tags": ["Logic", "MCU"],
        },
        {
            "id": "soldering",
            "name": "Soldering",
            "era": "Bench · hand assembly",
            "blurb": "Tools, through-hole technique, flux, joint quality, ESD, desoldering and rework.",
            "group": "practical",
            "tags": ["Bench", "Safety"],
        },
        {
            "id": "pcb-design",
            "name": "PCB design",
            "era": "CAD · fabricate and assemble",
            "blurb": "Schematic capture, footprints, layout, pours, DRC, fab files and assembly.",
            "group": "practical",
            "tags": ["CAD", "Manufacturing"],
        },
        {
            "id": "systems",
            "name": "Systems",
            "era": "Integration · power and noise",
            "blurb": "Supplies, grounding, noise, EMC intuition, batteries and embedded bring-up.",
            "group": "advanced",
            "tags": ["Power", "EMC", "Embedded"],
        },
    ]


def write_catalog(entries):
    body = json.dumps(entries, ensure_ascii=False, indent=2)
    text = (
        "// Courses in the Electronics Learner. Order here doesn't matter: the page\n"
        "// sorts by name inside each group.\n"
        "// group: foundations, components, circuits, digital, practical, advanced.\n"
        "window.ELECTRONICS_CATALOG = "
        + body
        + ";\n"
    )
    (OUT / "catalog.js").write_text(text, encoding="utf-8")


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    courses = [
        foundations(),
        components(),
        circuits(),
        digital(),
        soldering(),
        pcb_design(),
        systems(),
    ]
    counts = {}
    for c in courses:
        n_lessons, n_prac = write_course(c)
        counts[c["id"]] = {"lessons": n_lessons, "practice": n_prac}
        # validate lesson ranges from the task
        ranges = {
            "foundations": (8, 10),
            "components": (8, 10),
            "circuits": (8, 10),
            "digital": (7, 9),
            "soldering": (6, 8),
            "pcb-design": (7, 9),
            "systems": (6, 8),
        }
        lo, hi = ranges[c["id"]]
        assert lo <= n_lessons <= hi, (c["id"], n_lessons)
        for lesson in c["lessons"]:
            assert 5 <= len(lesson["practice"]) <= 8, lesson["id"]
            for s in lesson["sections"]:
                assert "p" in s or "code" in s or "h" in s
    write_catalog(catalog_entries())
    for cid, info in counts.items():
        print(f"{cid}: {info['lessons']} lessons, {info['practice']} practice questions")


if __name__ == "__main__":
    main()
