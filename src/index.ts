/**
 * Discord Plugin MVP - Main Entry Point
 * Simplified version of Vencord's plugin system
 */

import { PluginManager } from './core/PluginManager';
import { QuickReplyPlugin } from './plugins/QuickReplyPlugin';

// Initialize the plugin manager
const pluginManager = new PluginManager();

// Register available plugins
pluginManager.register(new QuickReplyPlugin());

// Start all plugins when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        pluginManager.startAll();
    });
} else {
    pluginManager.startAll();
}

console.log('[Discord Plugin MVP] Loaded successfully!');
