# Discord Plugin MVP

> A simplified MVP version of [Vencord](https://github.com/Vendicated/Vencord) - A Discord browser extension with a basic plugin system

## Overview

This is a minimal viable product (MVP) demonstrating the core concept of Vencord: a plugin-based Discord client modification system. This MVP includes:

- ✅ **Plugin System**: Simple plugin architecture for extending Discord
- ✅ **Quick Reply Plugin**: Example plugin that adds quick reply buttons to messages
- ✅ **Browser Extension**: Works as a Chrome/Edge browser extension
- ✅ **TypeScript**: Type-safe plugin development
- ✅ **Hot Reload**: Development mode with auto-rebuild

## What is Vencord?

Vencord is a Discord client modification that adds 100+ plugins to enhance your Discord experience. This MVP demonstrates the fundamental plugin system architecture in a simplified form.

## Features

### Plugin System

- Simple plugin registration and management
- Start/stop individual plugins
- Plugin lifecycle management
- Easy to extend with new plugins

### Quick Reply Plugin (Demo)

- Adds a "💬 Quick Reply" button to Discord messages
- Automatically mentions the message author
- Demonstrates DOM manipulation and Discord UI integration

## Installation

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/gitmvp-com/discord-plugin-mvp.git
cd discord-plugin-mvp
```

2. **Install dependencies**

```bash
pnpm install
# or
npm install
```

3. **Build the extension**

```bash
pnpm build
# or
npm run build
```

### Load in Browser

1. Open Chrome/Edge and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the repository folder
5. Navigate to Discord (discord.com) and you should see the plugin working!

### Development Mode

For active development with auto-rebuild:

```bash
pnpm dev
# or
npm run dev
```

This will watch for file changes and automatically rebuild the extension.

## Project Structure

```
discord-plugin-mvp/
├── src/
│   ├── core/
│   │   ├── Plugin.ts          # Plugin interface
│   │   └── PluginManager.ts   # Plugin management system
│   ├── plugins/
│   │   └── QuickReplyPlugin.ts # Example plugin
│   └── index.ts               # Main entry point
├── dist/                      # Build output (generated)
├── manifest.json              # Browser extension manifest
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── build.mjs                  # Build script
```

## Creating Your Own Plugin

1. **Create a new plugin file** in `src/plugins/`:

```typescript
import { Plugin } from '../core/Plugin';

export class MyPlugin implements Plugin {
    name = 'MyPlugin';
    description = 'My custom Discord plugin';
    version = '1.0.0';

    start(): void {
        console.log('MyPlugin started!');
        // Your plugin logic here
    }

    stop(): void {
        console.log('MyPlugin stopped!');
        // Cleanup logic here
    }
}
```

2. **Register your plugin** in `src/index.ts`:

```typescript
import { MyPlugin } from './plugins/MyPlugin';

pluginManager.register(new MyPlugin());
```

3. **Rebuild and reload** the extension!

## How It Works

### Plugin Manager

The `PluginManager` class handles:
- Plugin registration
- Starting/stopping plugins
- Plugin lifecycle management

### Plugin Interface

All plugins implement the `Plugin` interface:
```typescript
interface Plugin {
    name: string;
    description: string;
    version: string;
    start(): void;
    stop(): void;
}
```

### DOM Injection

Plugins can:
- Inject custom CSS styles
- Observe DOM mutations for new messages
- Add custom buttons and UI elements
- Interact with Discord's message input

## Comparison with Vencord

| Feature | Vencord | This MVP |
|---------|---------|----------|
| Plugins | 100+ | 1 (demo) |
| Plugin API | Advanced | Basic |
| Settings UI | ✅ | ❌ |
| Theme Support | ✅ | ❌ |
| Desktop Client | ✅ | ❌ |
| Browser Extension | ✅ | ✅ |
| Settings Sync | ✅ | ❌ |
| Hot Reload | ✅ | ✅ |

## Development

### Build Commands

- `pnpm build` - Build for production
- `pnpm dev` - Build and watch for changes

### Tech Stack

- **TypeScript** - Type-safe development
- **esbuild** - Fast bundling (same as Vencord)
- **Browser Extension API** - Chrome/Edge extension

## Important Notes

⚠️ **Discord ToS**: This is an educational project. Using client modifications may violate Discord's Terms of Service. Use at your own risk.

⚠️ **MVP Limitations**: This is a simplified demonstration. The real Vencord has:
- Advanced plugin API with webpack module access
- Settings UI and persistence
- 100+ production-ready plugins
- Desktop client support
- Theme system
- Much more!

## Contributing

This is an MVP demonstration project. For the full Vencord experience, check out the [official Vencord repository](https://github.com/Vendicated/Vencord).

## License

This project is for educational purposes. See the original [Vencord](https://github.com/Vendicated/Vencord) for its GPL-3.0 license.

## Acknowledgments

- [Vencord](https://github.com/Vendicated/Vencord) - The original project this MVP is based on
- [Vendicated](https://github.com/Vendicated) - Creator of Vencord

## Learn More

- [Vencord Official Site](https://vencord.dev/)
- [Vencord GitHub](https://github.com/Vendicated/Vencord)
- [Discord Developer Portal](https://discord.com/developers/docs)

---

**Note**: This is a minimal viable product for educational purposes. For production use, please use the official [Vencord](https://github.com/Vendicated/Vencord).
