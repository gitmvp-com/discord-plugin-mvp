/**
 * Plugin Manager - Core system for managing plugins
 * Simplified version of Vencord's plugin architecture
 */

import { Plugin } from './Plugin';

export class PluginManager {
    private plugins: Map<string, Plugin> = new Map();

    /**
     * Register a new plugin
     */
    register(plugin: Plugin): void {
        if (this.plugins.has(plugin.name)) {
            console.warn(`[PluginManager] Plugin ${plugin.name} is already registered`);
            return;
        }

        this.plugins.set(plugin.name, plugin);
        console.log(`[PluginManager] Registered plugin: ${plugin.name}`);
    }

    /**
     * Start a specific plugin
     */
    start(name: string): boolean {
        const plugin = this.plugins.get(name);
        if (!plugin) {
            console.error(`[PluginManager] Plugin ${name} not found`);
            return false;
        }

        try {
            plugin.start();
            console.log(`[PluginManager] Started plugin: ${name}`);
            return true;
        } catch (error) {
            console.error(`[PluginManager] Failed to start plugin ${name}:`, error);
            return false;
        }
    }

    /**
     * Stop a specific plugin
     */
    stop(name: string): boolean {
        const plugin = this.plugins.get(name);
        if (!plugin) {
            console.error(`[PluginManager] Plugin ${name} not found`);
            return false;
        }

        try {
            plugin.stop();
            console.log(`[PluginManager] Stopped plugin: ${name}`);
            return true;
        } catch (error) {
            console.error(`[PluginManager] Failed to stop plugin ${name}:`, error);
            return false;
        }
    }

    /**
     * Start all registered plugins
     */
    startAll(): void {
        console.log(`[PluginManager] Starting ${this.plugins.size} plugins...`);
        for (const [name] of this.plugins) {
            this.start(name);
        }
    }

    /**
     * Stop all running plugins
     */
    stopAll(): void {
        console.log(`[PluginManager] Stopping all plugins...`);
        for (const [name] of this.plugins) {
            this.stop(name);
        }
    }

    /**
     * Get list of all registered plugins
     */
    getPlugins(): Plugin[] {
        return Array.from(this.plugins.values());
    }
}
