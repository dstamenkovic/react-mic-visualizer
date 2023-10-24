import * as react_jsx_runtime from 'react/jsx-runtime';

type Props = {
    stream: MediaStream;
    size?: number;
    circle?: boolean;
    addTransparency?: boolean;
    bgColor?: string;
    barColor?: string;
    barBgColor?: string;
    padding?: string;
    borderRadius?: string;
};
declare const Bars: ({ stream, size, circle, addTransparency, bgColor, barColor, barBgColor, padding, borderRadius, }: Props) => react_jsx_runtime.JSX.Element;

export { Bars as BarVisualizer };
