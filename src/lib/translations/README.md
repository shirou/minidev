# Translation Files Structure

This directory contains all translation files organized by language for better collaboration.

## Directory Structure

```
translations/
├── README.md (this file)
├── index.ts                    # Main export file
├── en/                         # English translations
│   ├── index.ts               # English translation aggregator
│   ├── common.ts              # Common UI translations
│   └── tools/
│       └── randomString.ts    # Tool-specific translations
├── ja/                         # Japanese translations
│   ├── index.ts               # Japanese translation aggregator
│   ├── common.ts              # Common UI translations
│   └── tools/
│       └── randomString.ts    # Tool-specific translations
└── tools/ (legacy)            # Old structure - can be removed
```

## Adding a New Tool Translation

### 1. Create English translation file
Create `en/tools/{toolName}.ts`:

```typescript
export const {toolName}En = {
  tools: {
    {toolName}: {
      title: "Tool Title",
      description: "Tool description",
      // ... other translations
    }
  }
}
```

### 2. Create Japanese translation file
Create `ja/tools/{toolName}.ts`:

```typescript
export const {toolName}Ja = {
  tools: {
    {toolName}: {
      title: "ツールタイトル",
      description: "ツールの説明",
      // ... other translations
    }
  }
}
```

### 3. Update language aggregators

Add to `en/index.ts`:
```typescript
import { {toolName}En } from './tools/{toolName}'

export const enTranslations = mergeEn(
  commonEn,
  randomStringEn,
  {toolName}En  // Add here
)
```

Add to `ja/index.ts`:
```typescript
import { {toolName}Ja } from './tools/{toolName}'

export const jaTranslations = mergeJa(
  commonJa,
  randomStringJa,
  {toolName}Ja  // Add here
)
```

## Benefits of This Structure

### 🌐 Language-Based Organization
- **Clear separation**: English and Japanese translations in separate directories
- **Easy collaboration**: Translators can work on their specific language without conflicts
- **Consistent structure**: Same file organization across languages

### 🤝 Collaboration Friendly
- **Parallel work**: Multiple people can work on different languages simultaneously
- **Easy review**: Language-specific pull requests
- **Clear ownership**: Language maintainers can focus on their expertise

### 📁 File Organization
- **Modular**: Each tool has its own translation file per language
- **Scalable**: Easy to add new languages (ko/, zh/, etc.)
- **Maintainable**: Changes to one tool don't affect others

## Translation Guidelines

### Key Naming Convention
- Use camelCase: `generateButton`, `exportTxt`
- Be descriptive: `lengthLabel` instead of `length`
- Group related keys: `export*` for export-related functions

### Quality Assurance
1. **Consistency**: Use consistent terminology across tools
2. **Context**: Consider UI context when translating
3. **Length**: Keep translations appropriate for UI space
4. **Testing**: Test translations in actual UI

## Language Codes
- `en`: English (US)
- `ja`: Japanese
- Future: `ko` (Korean), `zh` (Chinese), etc.

## Common Translation Patterns

### Buttons
```typescript
// English
generateButton: "Generate"
copyButton: "Copy"
downloadButton: "Download"

// Japanese
generateButton: "生成"
copyButton: "コピー"
downloadButton: "ダウンロード"
```

### Labels
```typescript
// English
lengthLabel: "String length"
quantityLabel: "Number of strings"

// Japanese
lengthLabel: "文字列の長さ"
quantityLabel: "文字列の個数"
```