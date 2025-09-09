import React, { ReactNode } from 'react';

interface StrokeWrapperProps {
    children: ReactNode;
    strokeWidth?: number;
    strokeColor?: string;
    className?: string;
    style?: React.CSSProperties;
}

const TextStrokeWrapper = ({ 
    children,
    strokeWidth = 4, 
    strokeColor = "#131313", 
    className = "",
    style = {}
}: StrokeWrapperProps) => {
    return (
        <div 
            className={`relative ${className}`}
            style={{
                // Mengatur urutan paint untuk mencegah tumpang tindih
                paintOrder: 'stroke fill markers',
                // Menggunakan webkit-text-stroke yang lebih presisi
                WebkitTextStroke: `${strokeWidth}px ${strokeColor}`,
                // Mengatur fill color
                WebkitTextFillColor: 'currentColor',
                // Optimasi rendering teks
                textRendering: 'geometricPrecision',
                // Anti-aliasing untuk hasil yang lebih halus
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                // Mengatur line height untuk mencegah tumpang tindih vertikal
                // lineHeight: '4rem',
                // Mengatur letter spacing untuk mencegah tumpang tindih horizontal
                // letterSpacing: '0.01em',
                // Mengatur word spacing
                // wordSpacing: '0.05em',
                // Memastikan teks tidak wrap di tengah kata
                whiteSpace: 'pre-wrap',
                // Mengoptimalkan rendering
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
                // Mendukung multi-line text
                display: 'inline-block',
                position: 'relative',
                zIndex: 1,
                ...style
            } as React.CSSProperties}
        >
            {children}
        </div>
    );
};

export default TextStrokeWrapper;