export class ColorUtil {
    // Base colors that look good together
    private static baseColors = [
        '#2196F3', // Blue
        '#4CAF50', // Green
        '#FF9800', // Orange
        '#E91E63', // Pink
        '#9C27B0', // Purple
        '#00BCD4', // Cyan
        '#FFEB3B', // Yellow
        '#795548', // Brown
        '#607D8B'  // Blue Grey
    ];

    /**
     * Generate an array of colors based on the number of items needed
     * @param count Number of colors to generate
     * @returns Array of color strings
     */
    static generateColors(count: number): string[] {
        // If we have fewer items than base colors, just return the needed colors
        if (count <= this.baseColors.length) {
            return this.baseColors.slice(0, count);
        }
        
        // If we need more colors than our base set, generate them
        const colors: string[] = [...this.baseColors];
        
        // Generate additional colors by adjusting hue
        for (let i = this.baseColors.length; i < count; i++) {
            // Create variations by shifting hue
            const hue = (i * 137) % 360; // Golden angle approximation for good distribution
            colors.push(`hsl(${hue}, 70%, 50%)`);
        }
        
        return colors;
    }
    
    /**
     * Adjust color brightness for hover effects
     * @param color Color string (hex or hsl)
     * @param amount Amount to adjust brightness (-100 to 100)
     * @returns Adjusted color string
     */
    static adjustBrightness(color: string, amount: number): string {
        // For HSL colors
        if (color.startsWith('hsl')) {
            const hslMatch = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
            if (hslMatch) {
                const h = parseInt(hslMatch[1]);
                const s = parseInt(hslMatch[2]);
                const l = Math.max(0, Math.min(100, parseInt(hslMatch[3]) + amount));
                return `hsl(${h}, ${s}%, ${l}%)`;
            }
        }
        
        // For hex colors (simplified approach)
        if (color.startsWith('#')) {
            // Convert hex to RGB, adjust brightness, convert back to hex
            // This is a simplified implementation - for now just return the same color
            return color;
        }
        
        return color;
    }
}