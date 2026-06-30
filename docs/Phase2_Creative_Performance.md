# Phase 2 Creative Performance — Reference Data

**Source:** Manually exported performance sheet, filename-level reach/CTR
(uploaded 30 Jun 2026, screenshot of "Creative Performance (Apr26_Ma...)" workbook).
**Status:** Ground truth for Phase 2 creative library entries. Supersedes any
campaign-name-based CTR estimates used when the Phase 2 batch was first added.

This file exists so the raw numbers survive outside chat history. If anything
below needs re-verification, re-export from the source workbook — do not
re-derive from campaign-name string matching in `Final_Working_Sheet.xlsx`,
which proved unreliable (campaign names get reused across different creative
launches over time).

---

## Raw Phase 2 data (as transcribed from source)

| Filename | Reach | CTR |
|---|---|---|
| AC_Blue_Star | 2,762,122 | 1.25% |
| AC_Car_Multi_Brand | 1,015,596 | 1.67% |
| AC_Car_Voltas | 369,548 | 1.34% |
| AC_Cooler | 2,576,721 | 1.09% |
| Accessories_BT | 16,854 | 1.01% |
| Accessories_YT | 3,152 | 0.83% |
| Android_Mobile_Car | 1,143,827 | 2.18% |
| Card_Face_BT | 175,178 | 1.01% |
| Ecom_Prod | 10,766 | 1.19% |
| FK_1K_Offer | 305,216 | 1.08% |
| Flipkart_Gift_Card | 0 | DIV/0 (no data) |
| Generic_Product | 7,921,769 | 0.87% |
| Home_App_Car_Multi_Product | 607,641 | 1.34% |
| Home_App_Car_Voltas | 348,378 | 1.77% |
| iPad | 224,442 | 1.46% |
| iPhone_15_17_Car | 15,313,105 | 1.27% |
| iphone_car | 14,195,115 | 1.56% |
| iphone_car_multi_models | 50,746,757 | 1.11% |
| Iphone_Prod_Car | 25,230,200 | 1.11% |
| Laptop_Multiple_Product | 27,152 | 1.42% |
| Laptop_Single_Product | 193,696 | 1.78% |
| Mobile_UND_30K | 5,339,897 | 1.76% |
| Nothing_4A | 30,929,973 | 0.98% |
| Oppo_A6_Pro | 329,757 | 2.26% |
| Oppo_Reno_15C | 1,434,519 | 2.12% |
| Product_Gen_Card_Face | 233,327 | 0.92% |
| Product_Gif | 5,206 | 1.37% |
| Product_Girl | 243,938 | 1.07% |
| Products_Gen_YT | 3,544,501 | 0.86% |
| Realme_16_Pro | 2,355,948 | 1.80% |
| Redmi_Note_15_Pro | 4,475,660 | 1.23% |
| SmartWatch_Car | 10,053 | 1.66% |
| Video_Rohit_B | 26,881 | 1.83% (video — excluded from analysis) |
| Vivo_X300_FE | 435,411 | 1.43% |
| Vivo_X300_Ultra | 208,340 | 1.54% |
| WJ_Camp_Generic_Product | 3,507,419 | 0.63% |
| WJ_Camp_Iphone_Prod_Car | 5,429,716 | 1.06% |
| WJ_Camp_Realme_16_Pro_PF_16 | 2,681,483 | 1.64% |
| WJ_Camp_Samsung_S26 | 5,311,196 | 1.43% |
| WJ_Camp_Video_rohit | 302,273 | 6.66% (video — excluded) |
| WJ_Camp_Video_Trip_Troop | 248,780 | 3.93% (video — excluded) |
| Zero_Fee | 7,527,922 | 0.92% |

---

## Action 1 — Duplicates merged into existing main-library entries

Visually confirmed same creative as an existing Phase 1 entry. Reach-weighted
CTR recomputed by combining Phase 1 total reach/CTR (from `Final_Working_Sheet.xlsx`,
grouped by Creative Name) with the Phase 2 row above. Delete the duplicate
filename + image; update the surviving entry's `reach_weighted_ctr`.

| Phase 2 file (delete) | Merges into (update CTR) | Old CTR | New merged CTR |
|---|---|---|---|
| Card_Face_BT | Card_In_Center_with_Card_Benifits.png | 4.03% | **2.09%** |
| Product_Gen_Card_Face | Card_In_Center_stage_with_Card_Benifits.png | 3.84% | **2.29%** |
| SmartWatch_Car | Smartwatch_Carousel.png | 1.53% | **1.53%** |
| Iphone_Prod_Car + WJ_Camp_Iphone_Prod_Car (3-way) | Apple_Iphone_Carousel_with_EMI_options_light.png | 1.17% | **1.11%** |
| Mobile_UND_30K | Oppo_Samsung_Phone_Carousel.png | 1.34% | **1.43%** |
| Home_App_Car_Multi_Product | Electronic_Carousel_with_Card_Benifits.png | 1.16% | **1.19%** |
| Product_Girl | Electronic_Cluster_with_Card_in_Center_1.png | 1.45% | **1.44%** |
| Realme_16_Pro | Realme_16_Pro_Phone_with_Product_Specific_Card_Benefits.png | 2.67% | **2.54%** |
| Redmi_Note_15_Pro | Redmi_Note_15_Pro_Phone_with_Product_Specific_Card_Benefits.png | 2.86% | **2.23%** |
| Oppo_A6_Pro | Oppo_A6_pro_Product_with_Card_and_Benifits.png | 4.88% | **2.87%** |
| Oppo_Reno_15C | Oppo_Reno_15c_with_Card_and_Benifits.png | 3.35% | **2.88%** |
| Laptop_Single_Product | Laptop_Specific_with_Card.png | 2.51% | **2.48%** |
| Laptop_Multiple_Product | Multiple_Laptop_Specific_with_Card.png | 3.20% | **3.09%** |
| iphone_car | Apple_IPhone_Carousel.png | 1.38% | **1.39%** |
| iPad | Ipad_Colours_with_Cards.png | 3.95% | **3.60%** |

**Generic_Product + WJ_Camp_Generic_Product** — duplicates of each other (no clean
Phase 1 lineage, campaign name was recycled). Merge into one `Generic_Product.png`
entry at **0.80%** CTR (11.43M combined reach). Delete `WJ_Camp_Generic_Product.png`.

---

## Action 2 — Genuinely new Phase 2 SKUs (update CTR to verified value, keep entry)

| Filename | Old CTR in code | Verified CTR | Action |
|---|---|---|---|
| AC_Blue_Star | 1.24% | 1.25% | negligible, no change needed |
| AC_Car_Multi_Brand | 1.70% | 1.67% | update |
| AC_Car_Voltas | 1.30% | 1.34% | update |
| AC_Cooler | 1.10% | 1.09% | negligible |
| Android_Mobile_Car | 2.20% | 2.18% | negligible |
| FK_1K_Offer | 1.10% | 1.08% | negligible |
| Home_App_Car_Voltas | 1.77% | 1.77% | exact match |
| iPhone_15_17_Car | 1.29% | 1.27% | negligible |
| iphone_car_multi_models | 1.10% | 1.11% | negligible |
| Nothing_4A | 0.98% | 0.98% | exact match |
| Vivo_X300_FE | 1.40% | 1.43% | update |
| Vivo_X300_Ultra | 1.50% | 1.54% | update |
| WJ_Camp_Realme_16_Pro_PF_16 | 1.65% | 1.64% | negligible (confirms original was correct) |
| WJ_Camp_Samsung_S26 | 1.43% | 1.43% | exact match |
| Zero_Fee | 0.90% | 0.92% | negligible |
| Products_Gen_YT | 0.83% | 0.86% | update |

## Action 3 — Confirmed low reach, exclude from scenario routing (no change)

`Accessories_BT` (16.8K), `Accessories_YT` (3.2K), `Ecom_Prod` (10.8K),
`Product_Gif` (5.2K) — all below reach threshold for reliable signal.

## Action 4 — Excluded entirely (videos, not images)

`Video_Rohit_B`, `WJ_Camp_Video_rohit`, `WJ_Camp_Video_Trip_Troop` — video
content is out of scope per existing policy (Reels/video excluded from analysis).

---

## Net effect on library count

27 Phase 2 entries → 9 duplicates removed (merged into existing entries) →
**18 surviving Phase 2 entries**. Combined with the 8 "DUPE FILES" already
excluded at the original Phase 2 batch stage (which never created new entries
but whose CTRs are now corrected per Action 1), total unique creative count
needs recomputation post-merge — do not assume 104 until the build script
in the next Claude Code session confirms it.
