/**
 * Base Plugin Interface
 * All plugins must implement this interface
 */

export interface Plugin {
    /**
     * Unique plugin name
     */
    name: string;

    /**
     * Plugin description
     */
    description: string;

    /**
     * Plugin version
     */
    version: string;

    /**
     * Start the plugin
     */
    start(): void;

    /**
     * Stop the plugin and cleanup
     */
    stop(): void;
}
