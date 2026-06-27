// BFL Creative Studio — TypeScript Interfaces
// S3: Types locked per PRD + updated intent system from Block 04

export type CreativeType =
  | 'Card Spotlight'
  | 'Product Moment'
  | 'Lifestyle'
  | 'Festive'
  | 'Offer Highlight'
  | 'Partner Co-branded';

export type ProductCategory =
  | 'Smartphone'
  | 'Laptop'
  | 'Tablet'
  | 'TV'
  | 'AC'
  | 'Washing Machine'
  | 'Refrigerator'
  | 'Camera'
  | 'Wearable'
  | 'Gaming'
  | 'Air Purifier'
  | 'Electronics Cluster'
  | 'Card';

// Updated from PRD CampaignGoal → CreativeIntent (Block 04 decision)
export type CreativeIntent =
  | 'Card-Led'
  | 'Product-Led'
  | 'Offer-Led'
  | 'Festive/Event';

export interface CreativeCard {
  filename: string;         // e.g. "Volatas_AC_Benefits_Card_Image.png"
  display_name: string;     // e.g. "Voltas AC — Lifestyle with Card Benefits"
  creative_type: CreativeType;
  product_category: ProductCategory;
  goal_fit: CreativeIntent[]; // which intents this creative suits
  reach_weighted_ctr: number; // e.g. 4.56
  key_features: string[];     // e.g. ["lifestyle_person", "card_visible", "emi_per_month"]
  url: string;                // "/creatives/Volatas_AC_Benefits_Card_Image.png"
}

export interface BriefRequest {
  freeText: string;        // free-form campaign description
  intent?: CreativeIntent; // optional — auto-detected from freeText if not provided
}

export interface CTRElement {
  feature: string;
  lift: number;
  note: string;
}

export interface LayoutBrief {
  hero_element: string;
  card_placement: string;
  background: string;
  benefit_chips: string[];
  text_density: string;
  brand_logo_placement: string;
  additional_elements: string[];
}

export interface CopyFormula {
  headline: string;
  body: string;
  cta: string;
}

export interface ImagePrompts {
  gpt4o: string;
  gemini: string;
  midjourney: string;
}

export interface ReferenceCreative {
  filename: string;
  display_name: string;
  ctr: number;
  match_reason: string;
  url: string;
}

export interface BriefResponse {
  // Scenario selection
  scenario_id: string;                    // "S5"
  scenario_name: string;                  // "Product Spec Sheet — Smartphone"
  base_creative: {
    filename: string;
    display_name: string;
    ctr: number;
    url: string;
  };
  confidence: 'HIGH' | 'MED' | 'LOW';
  evidence_note: string;                  // "n=20, mean 2.78%, top 4.88%"
  needs_pretest: boolean;

  // Synthesis output
  structural_keep: string[];             // ["Card bottom-left corner", ...]
  story_change: string[];                // ["Product → Realme 16 Pro", ...]

  // Component spec
  component_spec: {
    hero: string;
    card: string;
    background: string;
    chips: string[];
    logo: string;
    cta: string;
  };

  // Copy
  copy_pack: {
    headline: string;
    body: string;
    cta: string;
  };

  // Experiment
  ab_experiment: string;                 // ONE suggestion, text only

  // Image prompts
  image_prompts: {
    gpt4o: string;
    gemini: string;
    midjourney: string;
  };

  // CTR signal analysis (for collapsed section)
  ctr_signal_analysis: {
    baseline: number;                    // always 2.12
    signals: Array<{
      feature: string;
      lift: number;
      note: string;
    }>;
    estimated_range: string;             // "3.0–4.5%" — range not precise number
    confidence: string;
  };

  // Reference creatives pool (the 5 images shown to Claude)
  reference_creatives: Array<{
    filename: string;
    display_name: string;
    ctr: number;
    url: string;
    is_base: boolean;                    // true for the one Claude chose
  }>;
}