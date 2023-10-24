import { useEffect, useRef, useState } from 'react';

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

const defaultBarColor = '#16a34a';
const defaultBarBgColor = '#D1D5DB';
const defaultBgColor = '#f3f4f6';

const Bars = ({
  stream,
  size = 25,
  circle = true,
  addTransparency,
  bgColor,
  barColor,
  barBgColor,
  padding,
  borderRadius,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [defaultPadding, setDefaultPadding] = useState<string>('');

  useEffect(() => {
    if (stream && canvasRef.current) {
      const audioContext = new AudioContext();
      const audioSource = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      audioSource.connect(analyser);

      analyser.fftSize = 2048;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;

        setDefaultPadding(`${(32 / 100) * WIDTH}px`);

        requestAnimationFrame(draw);

        analyser.getByteFrequencyData(dataArray);

        // Calculate average volume
        const avgVolume =
          dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;
        // Clear the canvas
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        // Draw 3 bars
        const baseBarHeight = HEIGHT / 3;
        const barWidth = Math.round((28 / 100) * WIDTH);
        const barGap = Math.round((8 / 100) * WIDTH);

        ctx.fillStyle = barBgColor || defaultBarBgColor;
        ctx.fillRect(0, HEIGHT / 2, barWidth, baseBarHeight);
        ctx.fillRect(
          barWidth + barGap,
          HEIGHT / 2 - baseBarHeight / 2,
          barWidth,
          baseBarHeight + baseBarHeight / 2
        );
        ctx.fillRect(
          (barWidth + barGap) * 2,
          HEIGHT / 2 - baseBarHeight,
          barWidth,
          baseBarHeight * 2
        );

        if (avgVolume > 7) {
          ctx.fillStyle = barColor || defaultBarColor;
          ctx.fillRect(0, HEIGHT / 2, barWidth, baseBarHeight);
        }

        if (avgVolume > 30) {
          ctx.fillStyle = barColor || defaultBarColor;
          ctx.fillRect(
            barWidth + barGap,
            HEIGHT / 2 - baseBarHeight / 2,
            barWidth,
            baseBarHeight + baseBarHeight / 2
          );
        }

        if (avgVolume > 70) {
          ctx.fillStyle = barColor || defaultBarColor;
          ctx.fillRect(
            (barWidth + barGap) * 2,
            HEIGHT / 2 - baseBarHeight,
            barWidth,
            baseBarHeight * 2
          );
        }
      };

      draw();
    }
  }, [stream, barBgColor, barColor]);

  return (
    <div
      style={{
        backgroundColor: bgColor || defaultBgColor,
        borderRadius: circle ? '9999px' : borderRadius || 0,
        padding: padding || defaultPadding,
        opacity: addTransparency ? 0.75 : 1,
        width: 'fit-content',
      }}
    >
      <canvas ref={canvasRef} width={size} height={size} />
    </div>
  );
};

export default Bars;
