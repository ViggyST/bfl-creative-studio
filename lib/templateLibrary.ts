import type { CreativeCard, CreativeIntent, ProductCategory } from '../types/index';
import { creativeLibrary, classifyProduct } from './creativeLibrary';

export interface ScenarioRoute {
  scenario_id: string;
  scenario_label: string;
  intent: CreativeIntent;
  product_category: ProductCategory;
  reference_filenames: string[]; // exactly 5 — validated at runtime in getScenarioCreatives
}

export const scenarioRoutes: ScenarioRoute[] = [
  {
    scenario_id: 'S1',
    scenario_label: 'Card-Led / Generic',
    intent: 'Card-Led',
    product_category: 'Card',
    reference_filenames: [
      'Card_on_Center_Stage_with_Card_Benifits_1.png',
      'Card_Specific_with_Card_Benifits.png',
      'Card_In_Center_with_Card_Benifits.png',
      'Card_In_Center_stage_with_Card_Benifits.png',
      'Electronic_Cluster_with_Card_Benifits.png',
    ],
  },
  {
    scenario_id: 'S2',
    scenario_label: 'Offer-Led / Cashback',
    intent: 'Offer-Led',
    product_category: 'Card',
    reference_filenames: [
      'Amazon_500_Gift_Card.png',
      '11k_Offer_brands_Card_image.png',
      'Card_on_Center_Stage_with_Card_Benifits_1.png',
      'Card_Specific_with_Card_Benifits.png',
      'AC_with_Card_Benifits.png',
    ],
  },
  {
    scenario_id: 'S3',
    scenario_label: 'Festive / Event',
    intent: 'Festive/Event',
    product_category: 'Card',
    reference_filenames: [
      'Festive_Card_Benefits.png',
      'Washing_Machine_with_Festive_Card_Benifits.png',
      'TV_and_Card_with_Festive_Card_Benefits.png',
      'Refrigerator_with_Festive_Card_Benfits.png',
      'Card_in_Center_with_Flipkart_Specific_Card_Benefits.png',
    ],
  },
  {
    scenario_id: 'S4',
    scenario_label: 'Product-Led / Smartphone (Android)',
    intent: 'Product-Led',
    product_category: 'Smartphone',
    reference_filenames: [
      'Oppo_A6_pro_Product_with_Card_and_Benifits.png',
      'Samsung_Phone_with_Card.png',
      'Redmi_Note_15_Pro_Phone_with_Product_Specific_Card_Benefits.png',
      'Realme_16_Pro_Phone_with_Product_Specific_Card_Benefits.png',
      'Google_Pixel_with_Card_and_Card_Benifits.png',
    ],
  },
  {
    scenario_id: 'S5',
    scenario_label: 'Product-Led / Smartphone (Apple)',
    intent: 'Product-Led',
    product_category: 'Smartphone',
    reference_filenames: [
      'Apple_IPhone_with_Card_in_Center_and_Card_Benifits.png',
      'Iphone_16E_with_Benefits.png',
      'Apple_Iphone_Carousel_with_EMI_options.png',
      'Apple_IPhone_Specific_Carousel.png',
      'Apple_IPhone_Carousel.png',
    ],
  },
  {
    scenario_id: 'S6',
    scenario_label: 'Product-Led / Laptop',
    intent: 'Product-Led',
    product_category: 'Laptop',
    reference_filenames: [
      'Multiple_Laptop_Specific_with_Card.png',
      'Laptop_Specific_with_Card.png',
      'Electronic_Cluster_with_Card_Benifits.png',
      'Electronics_Cluster_with_Card_on_Stage.png',
      'Electronic_Products_with_Card_in_Center.png',
    ],
  },
  {
    scenario_id: 'S7',
    scenario_label: 'Product-Led / Tablet (iPad)',
    intent: 'Product-Led',
    product_category: 'Tablet',
    reference_filenames: [
      'Ipad_Colours_with_Cards.png',
      'Apple_IPad_Products_with_Card.png',
      'Apple_IPad_Products_with_Card_with_Brands.png',
      'Apple_IPhone_Carousel.png',
      'Multiple_Laptop_Specific_with_Card.png',
    ],
  },
  {
    scenario_id: 'S8',
    scenario_label: 'Product-Led / AC & Appliances',
    intent: 'Product-Led',
    product_category: 'AC',
    reference_filenames: [
      'Volatas_AC_Benefits_Card_Image.png',
      'AC_with_Card_Benifits.png',
      'LG_AC_Benefits_10k_Cashback.png',
      'LG_Voltas_AC_carousel.png',
      'Washing_Machine_with_Festive_Card_Benifits.png',
    ],
  },
  {
    scenario_id: 'S9',
    scenario_label: 'Product-Led / TV & Home',
    intent: 'Product-Led',
    product_category: 'TV',
    reference_filenames: [
      'TV_in_Home_with_Card_Benefits.png',
      'TV_and_Card_with_Festive_Card_Benefits.png',
      'TV_with_Festive_Card_Benefits.png',
      'Electronic_Cluster_with_Card_Benifits.png',
      'Electronics_Cluster_with_Card_on_Stage.png',
    ],
  },
];

function isApple(input: string): boolean {
  return /\b(apple|iphone)\b/i.test(input);
}

function resolveRoute(intent: CreativeIntent, productInput: string): ScenarioRoute {
  if (intent === 'Festive/Event') return scenarioRoutes.find(r => r.scenario_id === 'S3')!;
  if (intent === 'Offer-Led')    return scenarioRoutes.find(r => r.scenario_id === 'S2')!;
  if (intent === 'Card-Led')     return scenarioRoutes.find(r => r.scenario_id === 'S1')!;

  // Product-Led — classify category then sub-split Apple vs Android for Smartphone
  const category = classifyProduct(productInput);
  const categoryToScenario: Partial<Record<ProductCategory, string>> = {
    Smartphone: isApple(productInput) ? 'S5' : 'S4',
    Laptop:     'S6',
    Tablet:     'S7',
    AC:         'S8',
    TV:         'S9',
  };
  const id = categoryToScenario[category] ?? 'S1';
  return scenarioRoutes.find(r => r.scenario_id === id)!;
}

export function getScenarioCreatives(intent: CreativeIntent, productInput: string): CreativeCard[] {
  const route = resolveRoute(intent, productInput);

  return route.reference_filenames.map(filename => {
    const card = creativeLibrary.find(c => c.filename === filename);
    if (!card) {
      throw new Error(
        `templateLibrary [${route.scenario_id}]: filename "${filename}" not found in creativeLibrary. ` +
        `Verify case-sensitive match against public/creatives/.`
      );
    }
    return card;
  });
}
