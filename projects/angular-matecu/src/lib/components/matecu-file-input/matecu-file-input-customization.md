# Matecu File Input - CSS Customization Guide

## 🎨 Overview

The Matecu File Input component uses CSS custom properties (variables) to make theming and customization easy. All variables use the `--matecu-file-input-*` namespace to prevent conflicts with other components.

## 🔧 Available CSS Variables

### Color Palette

```css
:root {
  /* Base Colors */
  --matecu-file-input-color-primary: #4f46e5;
  --matecu-file-input-color-primary-hover: #4338ca;
  --matecu-file-input-color-success: #10b981;
  --matecu-file-input-color-error: #ef4444;
  --matecu-file-input-color-error-hover: #dc2626;
  --matecu-file-input-color-loading: #8b5cf6;
  --matecu-file-input-color-disabled: #9ca3af;
}
```

### Border Colors

```css
:root {
  --matecu-file-input-border-default: #e1e5e9;
  --matecu-file-input-border-hover: var(--matecu-file-input-color-primary);
  --matecu-file-input-border-success: var(--matecu-file-input-color-success);
  --matecu-file-input-border-error: var(--matecu-file-input-color-error);
  --matecu-file-input-border-loading: var(--matecu-file-input-color-loading);
  --matecu-file-input-border-separator: #e5e7eb;
}
```

### Background Colors

```css
:root {
  --matecu-file-input-bg-default: #fafbfc;
  --matecu-file-input-bg-hover: #f8faff;
  --matecu-file-input-bg-drag-over: #eef2ff;
  --matecu-file-input-bg-disabled: #f5f5f5;
  --matecu-file-input-bg-success: #f0fdf4;
  --matecu-file-input-bg-error: #fef2f2;
  --matecu-file-input-bg-loading: #faf5ff;
  --matecu-file-input-bg-surface: #ffffff;
  --matecu-file-input-bg-surface-alt: #f3f4f6;
}
```

### Text Colors

```css
:root {
  --matecu-file-input-text-primary: #111827;
  --matecu-file-input-text-secondary: #374151;
  --matecu-file-input-text-muted: #6b7280;
  --matecu-file-input-text-disabled: #9ca3af;
  --matecu-file-input-text-on-primary: #ffffff;
  --matecu-file-input-text-error: #dc2626;
}
```

### Button Colors

```css
:root {
  --matecu-file-input-button-primary-bg: var(--matecu-file-input-color-primary);
  --matecu-file-input-button-primary-bg-hover: var(--matecu-file-input-color-primary-hover);
  --matecu-file-input-button-primary-text: var(--matecu-file-input-text-on-primary);
  --matecu-file-input-button-danger-bg: var(--matecu-file-input-color-error);
  --matecu-file-input-button-danger-bg-hover: var(--matecu-file-input-color-error-hover);
  --matecu-file-input-button-danger-text: var(--matecu-file-input-text-on-primary);
  --matecu-file-input-button-disabled-bg: var(--matecu-file-input-color-disabled);
}
```

### Design System

```css
:root {
  /* Shadows */
  --matecu-file-input-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --matecu-file-input-shadow-md: 0 1px 3px rgba(0, 0, 0, 0.1);

  /* Border Radius */
  --matecu-file-input-border-radius-sm: 4px;
  --matecu-file-input-border-radius-md: 6px;
  --matecu-file-input-border-radius-lg: 8px;
  --matecu-file-input-border-radius-xl: 12px;

  /* Border Width */
  --matecu-file-input-border-width: 2px;

  /* Spinner */
  --matecu-file-input-spinner-track: #e5e7eb;
  --matecu-file-input-spinner-fill: var(--matecu-file-input-color-loading);
}
```

## 🎯 Customization Examples

### Dark Theme

```css
.dark-theme {
  --matecu-file-input-color-primary: #818cf8;
  --matecu-file-input-color-primary-hover: #6366f1;

  --matecu-file-input-bg-default: #1f2937;
  --matecu-file-input-bg-hover: #374151;
  --matecu-file-input-bg-surface: #111827;
  --matecu-file-input-bg-surface-alt: #1f2937;

  --matecu-file-input-text-primary: #f9fafb;
  --matecu-file-input-text-secondary: #e5e7eb;
  --matecu-file-input-text-muted: #9ca3af;

  --matecu-file-input-border-default: #374151;
  --matecu-file-input-border-separator: #374151;
}
```

### Brand Colors (Blue Theme)

```css
.blue-theme {
  --matecu-file-input-color-primary: #3b82f6;
  --matecu-file-input-color-primary-hover: #2563eb;
  --matecu-file-input-color-success: #059669;
  --matecu-file-input-color-error: #dc2626;

  --matecu-file-input-bg-hover: #dbeafe;
  --matecu-file-input-bg-drag-over: #bfdbfe;
}
```

### Green Theme

```css
.green-theme {
  --matecu-file-input-color-primary: #059669;
  --matecu-file-input-color-primary-hover: #047857;

  --matecu-file-input-bg-hover: #d1fae5;
  --matecu-file-input-bg-drag-over: #a7f3d0;
}
```

### Minimal Theme

```css
.minimal-theme {
  --matecu-file-input-border-radius-sm: 2px;
  --matecu-file-input-border-radius-md: 4px;
  --matecu-file-input-border-radius-lg: 6px;
  --matecu-file-input-border-width: 1px;

  --matecu-file-input-shadow-sm: none;
  --matecu-file-input-shadow-md: none;
}
```

### High Contrast Theme

```css
.high-contrast-theme {
  --matecu-file-input-color-primary: #0066cc;
  --matecu-file-input-color-error: #d93025;
  --matecu-file-input-color-success: #137333;

  --matecu-file-input-border-width: 3px;
  --matecu-file-input-text-primary: #000000;
  --matecu-file-input-bg-surface: #ffffff;
}
```

## 📱 Implementation

### Global Customization

```css
/* In your global styles.css */
:root {
  --matecu-file-input-color-primary: #your-brand-color;
  --matecu-file-input-border-radius-md: 12px;
  /* ... other customizations */
}
```

### Component-Specific Customization

```css
/* Target specific component instance */
.my-custom-file-input {
  --matecu-file-input-color-primary: #ff6b35;
  --matecu-file-input-bg-hover: #ffebe6;
}
```

```html
<!-- HTML -->
<matecu-file-input class="my-custom-file-input"> </matecu-file-input>
```

### Angular Component Customization

```typescript
// In your component
@Component({
  selector: 'app-upload',
  template: ` <matecu-file-input class="branded-upload" [multiple]="true"> </matecu-file-input> `,
  styles: [
    `
      .branded-upload {
        --matecu-file-input-color-primary: #your-primary-color;
        --matecu-file-input-color-success: #your-success-color;
        --matecu-file-input-border-radius-lg: 16px;
      }
    `,
  ],
})
export class UploadComponent {}
```

### SCSS/Sass Variables

```scss
// Define your theme variables
$primary-color: #6366f1;
$success-color: #10b981;
$border-radius: 8px;

// Apply to the component
.my-file-input {
  --matecu-file-input-color-primary: #{$primary-color};
  --matecu-file-input-color-success: #{$success-color};
  --matecu-file-input-border-radius-lg: #{$border-radius};
}
```

## 🔍 Best Practices

1. **Always use the full variable name** to avoid conflicts
2. **Test in different states** (hover, error, success, loading)
3. **Ensure sufficient contrast** for accessibility
4. **Consider responsive behavior** when customizing sizes
5. **Use semantic color names** in your design system
6. **Document your customizations** for team consistency

## 🎨 Design System Integration

The component variables are designed to integrate seamlessly with popular design systems:

- **Tailwind CSS**: Map to your Tailwind config colors
- **Material Design**: Use Material color palette
- **Bootstrap**: Integrate with Bootstrap theme colors
- **Custom Design System**: Map to your brand colors and spacing

## 🚀 Advanced Customization

For more complex customizations, you can also override specific component styles while respecting the CSS variable system:

```css
.advanced-file-input {
  /* Use variables for consistency */
  --matecu-file-input-color-primary: #your-color;

  /* Additional custom styles */
  .file-input-container {
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .select-button {
    font-size: 18px;
    padding: 16px 32px;
  }
}
```

This approach ensures your customizations work with future component updates while maintaining design consistency.
