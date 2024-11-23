// JavaScript to Extract all Color-related CSS Properties
// Add Custom HTML IDs to easier mapping
// Add Custom HTML Nested Layers for LLM Model to understand the HTML heirarchy
function extractEssentialCSSWithColor() {
  const colorProperties = new Set([
    // common ones
    "color",
    "background-color",
    "border-color",
    "outline-color",
    "box-shadow",
    "text-shadow",
    
    // gradients
    "linear-gradient",
    "radial-gradient",
    "conic-gradient",
    "repeating-linear-gradient",
    "repeating-radial-gradient",
    "repeating-conic-gradient",
    "mix-blend-mode",
    
    // SVG
    "fill",
    "stroke",
    "stop-color",
    "flood-color",
    "lighting-color",
    "color-interpolation",
    "color-interpolation-filters",
    
    // less common
    "column-rule-color",
    "caret-color",
    "text-emphasis-color",
    "scrollbar-color",
    "border-image",

    // more specific
    "opacity",
    "filter",
    "background-image",
    "color-profile",
    "-webkit-text-fill-color",
    "-webkit-text-stroke-color",
    "forced-colors"
  ]);

  // take only certain HTML tags
  const elements = document.querySelectorAll('main, nav, article, footer, header, div, p, span, a, img');

  let cssRules = [];
  let elementIndex = 0;

  function generateHierarchicalCSS(element, level = 0) {
    const styles = window.getComputedStyle(element);
    let hasColor = false;

    // traverse through the CSS and check if they have the mentioned color prooperties
    for (let i = 0; i < styles.length; i++) {
      const property = styles[i];
      if (colorProperties.has(property) && styles.getPropertyValue(property) !== 'rgba(0, 0, 0, 0)') {
        hasColor = true;
        break;
      }
    }

    // add if it has color properties
    if (hasColor) {
      const uniqueId = `ai-color-change-${elementIndex}`;
      element.id = uniqueId;
      elementIndex++;

      let rule = `/* level:${level}, tag:${element.tagName} */ #${uniqueId} {`;
      for (let i = 0; i < styles.length; i++) {
        const property = styles[i];
        if (colorProperties.has(property)) {
          const value = styles.getPropertyValue(property);
          rule += `${property}: ${value}; `;
        }
      }
      rule += '}';

      cssRules.push(rule);
    }

    for (const child of element.children) {
      generateHierarchicalCSS(child, level + 1);
    }
  }

  generateHierarchicalCSS(document.body);

  const cssText = cssRules.join('\n');

  return cssText;
}

// 1. Using the function
const cssText = extractEssentialCSSWithColor();

// 2. SEND DATA TO AI API 

// 3. After receiving `transformedCSS` from the AI:
const styleTag = document.createElement('style');
styleTag.textContent = transformedCSS;
document.head.appendChild(styleTag);
