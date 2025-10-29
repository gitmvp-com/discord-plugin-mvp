/**
 * Quick Reply Plugin
 * Adds a quick reply button to Discord messages
 */

import { Plugin } from '../core/Plugin';

export class QuickReplyPlugin implements Plugin {
    name = 'QuickReply';
    description = 'Adds a quick reply button to messages';
    version = '1.0.0';

    private observer: MutationObserver | null = null;

    start(): void {
        console.log('[QuickReply] Starting plugin...');
        this.injectStyles();
        this.observeMessages();
    }

    stop(): void {
        console.log('[QuickReply] Stopping plugin...');
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        this.removeStyles();
    }

    /**
     * Inject CSS styles for the quick reply button
     */
    private injectStyles(): void {
        const style = document.createElement('style');
        style.id = 'quick-reply-styles';
        style.textContent = `
            .quick-reply-btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 4px 8px;
                margin-left: 8px;
                background-color: #5865f2;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
                font-weight: 500;
                transition: background-color 0.2s;
            }

            .quick-reply-btn:hover {
                background-color: #4752c4;
            }

            .quick-reply-btn:active {
                background-color: #3c45a5;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Remove injected styles
     */
    private removeStyles(): void {
        const style = document.getElementById('quick-reply-styles');
        if (style) {
            style.remove();
        }
    }

    /**
     * Observe DOM for new messages and add quick reply buttons
     */
    private observeMessages(): void {
        this.observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node instanceof HTMLElement) {
                            this.processMessageElement(node);
                        }
                    });
                }
            }
        });

        // Start observing
        this.observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Process existing messages
        this.processExistingMessages();
    }

    /**
     * Process existing messages on page
     */
    private processExistingMessages(): void {
        // Discord messages are typically in elements with data-list-item-id
        const messages = document.querySelectorAll('[class*="message-"]');
        messages.forEach((msg) => {
            if (msg instanceof HTMLElement) {
                this.processMessageElement(msg);
            }
        });
    }

    /**
     * Process a single message element
     */
    private processMessageElement(element: HTMLElement): void {
        // Check if this looks like a Discord message container
        if (element.className && element.className.includes('message')) {
            // Check if button already exists
            if (element.querySelector('.quick-reply-btn')) {
                return;
            }

            // Find message content area
            const contentArea = element.querySelector('[class*="messageContent-"]');
            if (contentArea && contentArea.parentElement) {
                this.addQuickReplyButton(contentArea.parentElement as HTMLElement, element);
            }
        }
    }

    /**
     * Add quick reply button to a message
     */
    private addQuickReplyButton(container: HTMLElement, messageElement: HTMLElement): void {
        const button = document.createElement('button');
        button.className = 'quick-reply-btn';
        button.textContent = '💬 Quick Reply';
        button.title = 'Click to reply to this message';

        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.handleQuickReply(messageElement);
        });

        // Try to find the toolbar area, or append to container
        const toolbar = container.querySelector('[class*="buttonContainer-"]');
        if (toolbar) {
            toolbar.appendChild(button);
        } else {
            container.appendChild(button);
        }
    }

    /**
     * Handle quick reply action
     */
    private handleQuickReply(messageElement: HTMLElement): void {
        // Get message author if available
        const authorElement = messageElement.querySelector('[class*="username-"]');
        const author = authorElement ? authorElement.textContent : 'User';

        // Find the message input box
        const messageInput = document.querySelector('[class*="textArea-"]') as HTMLElement;
        
        if (messageInput) {
            // Focus the input
            messageInput.focus();

            // Try to set the value (Discord uses contenteditable)
            const replyText = `@${author} `;
            
            if (messageInput.isContentEditable) {
                // Insert text at cursor position
                const selection = window.getSelection();
                if (selection) {
                    const range = document.createRange();
                    range.selectNodeContents(messageInput);
                    range.collapse(false);
                    selection.removeAllRanges();
                    selection.addRange(range);
                    document.execCommand('insertText', false, replyText);
                }
            } else if (messageInput instanceof HTMLInputElement || messageInput instanceof HTMLTextAreaElement) {
                messageInput.value = replyText;
            }

            console.log(`[QuickReply] Replying to ${author}`);
        } else {
            console.warn('[QuickReply] Could not find message input');
        }
    }
}
