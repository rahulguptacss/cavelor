import data from '../data/data.json';

export interface NavItem {
  name: string;
  href: string;
  children?: NavItem[];
}

export type LinkType = NavItem;

export interface HeaderData {
  logo: string;
  logo_text: string;
  logo_subtext?: string;
  links: LinkType[];
  button_text?: string;
  button_link?: string;
  menu_aria_label?: string;
  close_aria_label?: string;
}

export interface HeroSectionData {
  left_image: string;
  left_image_alt?: string;
  right_tagline?: string;
  right_heading: string;
  right_heading_highlight?: string;
  right_description: string;
  right_button_text: string;
  right_button_link: string;
  right_bg_image?: string;
  right_portrait_image?: string;
  right_portrait_alt?: string;
}

export interface VisionMissionItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface VisionMissionData {
  items: VisionMissionItem[];
}

export interface WhyChooseFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface WhyChooseData {
  eyebrow: string;
  heading_main: string;
  heading_highlight: string;
  subtitle: string;
  features: WhyChooseFeature[];
}

export interface AboutSectionData {
  eyebrow: string;
  heading_main: string;
  heading_highlight: string;
  description: string;
  button_text?: string;
  button_link?: string;
}

export interface CollectionProductDetails {
  Fabric?: string;
  Work?: string;
  Occasion?: string;
  Fit?: string;
  Style?: string;
  [key: string]: string | undefined;
}

export interface CollectionItem {
  id: string;
  slug?: string;
  title: string;
  category?: string;
  title_line1?: string;
  title_line2?: string;
  image: string;
  image_alt?: string;
  button_text?: string;
  button_link?: string;
  detail_tag?: string;
  detail_title_main?: string;
  detail_title_highlight?: string;
  short_description?: string;
  features?: string[];
  product_details?: CollectionProductDetails;
  description?: string;
  related_slugs?: string[];
}

export interface CollectionsSectionData {
  eyebrow: string;
  heading_main: string;
  heading_highlight: string;
  subtitle: string;
  load_more_text?: string;
  home_items?: CollectionItem[];
  items: CollectionItem[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author_name: string;
  author_role?: string;
  location?: string;
  rating?: number;
  image?: string;
  image_alt?: string;
}

export interface TestimonialsSectionData {
  eyebrow: string;
  heading_main: string;
  heading_highlight: string;
  subtitle?: string;
  items: TestimonialItem[];
}

export interface BlogDetailSection1 {
  heading_main: string;
  heading_highlight: string;
  description: string;
  image: string;
  image_alt?: string;
  image_aspect?: string;
  image_position?: string;
}

export interface BlogDetailQuote {
  text: string;
  highlight?: string;
  suffix?: string;
}

export interface BlogDetailSection2 {
  image: string;
  image_alt?: string;
  image_aspect?: string;
  image_position?: string;
  heading: string;
  checklist: string[];
}

export interface BlogDetailSection3 {
  heading: string;
  description: string;
}

export interface BlogItem {
  id: string;
  slug?: string;
  title: string;
  title_prefix?: string;
  title_highlight?: string;
  title_suffix?: string;
  eyebrow?: string;
  date: string;
  author?: string;
  category?: string;
  read_more_text: string;
  href: string;
  image: string;
  image_alt?: string;
  image_aspect?: string;
  image_position?: string;
  intro?: string;
  section_1?: BlogDetailSection1;
  quote?: BlogDetailQuote;
  section_2?: BlogDetailSection2;
  section_3?: BlogDetailSection3;
}

export interface BlogsSectionData {
  eyebrow: string;
  heading_main: string;
  heading_highlight: string;
  subtitle: string;
  items: BlogItem[];
}

export interface FooterData {
  logo: string;
  logo_text: string;
  tagline: string;
  quick_links_title: string;
  quick_links: LinkType[];
  support_title: string;
  support_links: LinkType[];
  contact_title: string;
  contact_email: string;
  contact_email_href: string;
  contact_phone?: string;
  contact_phone_href?: string;
  contact_address?: string;
  contact_address_line1?: string;
  contact_address_line2?: string;
  copyright: string;
}

export interface BackToTopData {
  aria_label: string;
}

export interface PageComponent {
  key: string;
  component: string;
}

export interface PageMeta {
  title: string;
  pageName: string;
  metadata: {
    title: string;
    description: string;
  };
  components: PageComponent[];
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface BreadcrumbData {
  background_image?: string;
  background_alt?: string;
  title?: string;
  items?: BreadcrumbItem[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  image_alt?: string;
}

export interface GallerySectionData {
  eyebrow: string;
  heading_main: string;
  heading_highlight: string;
  subtitle: string;
  categories: string[];
  items: GalleryItem[];
}

export interface ContactInfoItem {
  id: string;
  icon: string;
  title: string;
  line1: string;
  line2?: string;
}

export interface ContactSectionData {
  eyebrow: string;
  heading_main: string;
  heading_highlight: string;
  subtitle: string;
  items?: ContactInfoItem[];
  address_title?: string;
  address_line1?: string;
  address_line2?: string;
  phone_title?: string;
  phone?: string;
  email_title?: string;
  email?: string;
  hours_title?: string;
  hours_line1?: string;
  hours_line2?: string;
  address?: string;
  hours?: string;
  form_title_prefix?: string;
  form_title_highlight?: string;
  form_name_placeholder?: string;
  form_email_placeholder?: string;
  form_phone_placeholder?: string;
  form_subject_placeholder?: string;
  form_message_placeholder?: string;
  form_button_text: string;
  map_address?: string;
  map_image?: string;
  map_alt?: string;
  map_pin_title?: string;
  map_pin_subtitle?: string;
  success_title?: string;
  success_message?: string;
  send_another_text?: string;
}

export interface EnquireFeatureItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface EnquireSectionData {
  eyebrow: string;
  heading_main: string;
  heading_highlight: string;
  subtitle: string;
  image?: string;
  image_alt?: string;
  form_title_prefix?: string;
  form_title_highlight?: string;
  form_name_placeholder?: string;
  form_email_placeholder?: string;
  form_phone_placeholder?: string;
  form_dropdown_placeholder?: string;
  dropdown_options?: string[];
  form_message_placeholder?: string;
  button_text: string;
  features?: EnquireFeatureItem[];
  services?: string[];
  success_title?: string;
  success_message?: string;
  submit_another_text?: string;
}

export interface CollectionsDetailSectionData {
  eyebrow_default: string;
  enquire_button_text: string;
  enquire_button_link: string;
  product_details_heading: string;
  description_heading: string;
  related_heading_main: string;
  related_heading_highlight: string;
  related_button_text: string;
  items?: CollectionItem[];
}

export interface BlogDetailSectionData {
  read_more_text?: string;
  back_button_text?: string;
  back_button_link?: string;
  items?: BlogItem[];
}

export interface SiteSections {
  hero: HeroSectionData;
  about: AboutSectionData;
  vision_mission?: VisionMissionData;
  why_choose?: WhyChooseData;
  collections: CollectionsSectionData;
  testimonials: TestimonialsSectionData;
  blogs: BlogsSectionData;
  breadcrumb?: BreadcrumbData;
  contact?: ContactSectionData;
  enquire?: EnquireSectionData;
  collections_detail?: CollectionsDetailSectionData;
  blog_detail?: BlogDetailSectionData;
  blogDetail?: BlogDetailSectionData;
}

export interface SitePages {
  home: PageMeta;
  [key: string]: PageMeta;
}

export interface TemplateComponents {
  pages: SitePages;
  sections: SiteSections;
}

export interface SiteData {
  common: {
    Header: HeaderData;
    Footer: FooterData;
    BackToTop: BackToTopData;
  };
  categories: {
    LuxuryFashion: {
      templateComponents: {
        'template-1': TemplateComponents;
      };
    };
  };
}

export const siteJson: SiteData = data as unknown as SiteData;
export const common = siteJson.common;
export const template = siteJson.categories.LuxuryFashion.templateComponents['template-1'];
export const pages = template.pages;
export const sections = template.sections;

export function toSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

