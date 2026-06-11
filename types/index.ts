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
  intent?: CreativeIntent; // optional — auto-detected from inputs if not provided
  product: string;         // free text e.g. "Voltas AC summer theme"
  offer: string;           // free text e.g. "₹2,000 cashback + Zero Down Payment"
  context?: string;        // optional — audience notes, event, competitor, tone
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
  detected_intent: CreativeIntent;
  intent_signal: string;          // one sentence explaining auto-detection
  creative_type: string;
  creative_type_reason: string;
  ctr_score_estimate: {
    baseline: number;
    elements: CTRElement[];
    estimated_ctr: number;
  };
  layout_brief: LayoutBrief;
  include: string[];
  avoid: string[];
  copy_formula: CopyFormula;
  image_prompts: ImagePrompts;
  reference_creatives: ReferenceCreative[];
}