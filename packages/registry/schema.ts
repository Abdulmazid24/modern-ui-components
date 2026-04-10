/**
 * Registry Schema for Modern UI Vault (2026 Standard)
 * Designed for multi-framework, multi-dialect source distribution.
 */

export interface RegistryDialect {
  /** The specific language/extension (e.g., 'tsx', 'jsx', 'js', 'vue', 'svelte') */
  language: string;
  /** List of files included in this dialect */
  files: {
    name: string;
    content: string; // The raw source code
  }[];
  /** NPM dependencies required for this dialect */
  dependencies: string[];
  /** Post-install instructions or registry-specific notes */
  notes?: string;
}

export interface RegistryComponent {
  /** Unique ID (e.g., 'nebula-nav') */
  name: string;
  /** Human-readable title */
  title: string;
  /** Category (e.g., 'navbar', 'cards') */
  category: string;
  /** All available dialects for this component */
  dialects: Record<string, RegistryDialect>;
  /** Preview data for the storefront */
  preview: {
    image?: string;
    video?: string;
  };
}

export interface Registry {
  /** Version of the registry schema */
  version: string;
  /** List of all components */
  components: RegistryComponent[];
}
