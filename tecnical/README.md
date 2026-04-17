# 📈 Dividend Capital Simulator PRO

> Professional Monte Carlo simulator — calculate how much capital you need to live off dividends.

![License](https://img.shields.io/badge/license-MIT-gold) ![HTML](https://img.shields.io/badge/built%20with-HTML%20%2F%20JS-blue)

---

## 🎯 What it does

Enter the **monthly net income** you want from dividends, configure your portfolio parameters (yield, growth, taxes, inflation, fees), and the simulator calculates — via **Monte Carlo** — how much capital you need across different confidence levels.

---

## ✨ Features

### Core Simulation
- **Monte Carlo engine** with 1,000–25,000 iterations
- **5 confidence levels**: P10 (optimistic), P25, P50 (median), P75, P90 (safe planning)
- **Inflation-adjusted** income targets over time
- **Expense ratio / fees** deducted from gross yield
- **Monthly savings projection** — see how accumulated savings reduce your capital gap

### Visualization
- **Capital trajectory chart** with confidence bands (P10–P90 fan)
- **Distribution histogram** of the simulated capital outcomes
- **Sensitivity analysis table** — yield × growth matrix showing how assumptions impact capital

### Usability
- **Multi-currency support**: EUR, USD, GBP, CHF, CAD
- **Interactive tooltips** on every parameter
- **Animated results** with counting-up numbers
- **Share via URL** — all parameters encoded in the link
- **PDF export** via print-optimized layout
- **Fully responsive** — works on mobile, tablet, and desktop

### SEO & Marketing
- Lead capture email form
- Affiliate partner zone
- Google Analytics integration
- Structured data (JSON-LD WebApplication schema)
- Open Graph tags for social sharing

---

## 🚀 How to use it

### Option 1 — directly in the browser
Download `index.html` and open it in any modern browser. No setup needed.

### Option 2 — GitHub Pages (online)
Publish it for free on GitHub Pages by following the instructions in the repository setup guide.

---

## 📁 Project structure

```
dcsimulator.me/
├── index.html                    # Full simulator app (HTML + CSS + JS)
├── about.html                    # About page
├── blog.html                     # Blog index
├── blog/                         # Blog articles and guides
├── sitemap.xml                   # Sitemap for search engines
├── robots.txt                    # Crawling rules
├── tecnical/                     # Legal / technical pages (privacy, cookies)
└── LICENSE                       # MIT License
```

---

## ⚙️ Parameters

| Parameter | Description | Default | Range |
|---|---|---|---|
| Monthly income | Target monthly net income | €2,000 | 100+ |
| Time horizon | Simulation period in years | 10 | 1–50 |
| Currency | Output currency | EUR | EUR/USD/GBP/CHF/CAD |
| Monthly savings | Optional monthly contributions | €0 | 0+ |
| Dividend Yield | Portfolio gross annual yield | 4.0% | 1–25% |
| Annual growth | Expected dividend growth rate | 5.0% | 0–20% |
| Tax rate | Tax rate applied to dividends | 26% | 0–45% |
| Volatility | Standard deviation of growth shocks | 3.0% | 0–30% |
| Inflation | Annual inflation rate | 2.0% | 0–10% |
| Expense ratio | Annual fund/ETF management fees | 0.20% | 0–2% |
| Simulations | Number of Monte Carlo iterations | 10,000 | 1K–25K |

---

## 🧮 Methodology

For each simulation:
1. The **yield** evolves over time by applying the expected growth rate plus a **random shock** (normally distributed with the configured volatility)
2. The **income target** is adjusted for inflation each year: `target × (1 + inflation)^t`
3. The **net yield** accounts for taxes and expense ratio: `gross_yield × (1 − tax) − fees`
4. The **required capital** is calculated as: `inflated_annual_income / net_yield`
5. After N simulations, the P10, P25, P50, P75, and P90 percentiles are extracted
6. Year-by-year paths are sampled (up to 5,000) for the trajectory confidence band chart

### Sensitivity analysis
A deterministic grid of yield × growth combinations is computed to show how assumptions affect required capital, with the user's current selection highlighted.

### Monthly savings projection
If monthly savings are provided, the future value is computed using an annuity formula with the portfolio's expected total return as the compounding rate.

---

## ⚠️ Disclaimer

This tool is for **illustrative and educational purposes only**. It does not constitute financial advice. Past performance does not guarantee future results.

---

## 📄 License

Distributed under the [MIT License](LICENSE).
