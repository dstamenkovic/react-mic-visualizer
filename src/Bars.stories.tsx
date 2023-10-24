import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import BarVisualizer from './Bars';

const meta: Meta<typeof BarVisualizer> = {
  title: 'BarVisualizer',
  component: BarVisualizer,
  tags: ['autodocs'],
  args: {
    size: 25,
    circle: true,
    addTransparency: false,
    padding: '',
    borderRadius: '',
    barColor: '#16a34a',
    bgColor: '#f3f4f6',
    barBgColor: '#D1D5DB',
  },
  argTypes: {
    size: {
      defaultValue: 25,
      description: 'Default is `25`',
      control: {
        type: 'number',
        min: 25,
        max: 150,
      },
    },
    circle: {
      defaultValue: true,
      description: 'Default is `true`',
      control: {
        type: 'boolean',
      },
    },
    addTransparency: {
      defaultValue: false,
      description: 'Adds `0.75` opacity',
      control: {
        type: 'boolean',
      },
    },
    padding: {
      defaultValue: '0.6rem',
      description:
        'If provided it will be used instead of the default value, which gets calculated like this `${(32 / 100) * WIDTH}px`',
      control: {
        type: 'text',
      },
    },
    borderRadius: {
      defaultValue: '1rem',
      description: 'Only works if `circle` is `false`',
      control: {
        type: 'text',
      },
    },
    barColor: {
      defaultValue: '#16a34a',
      description: 'Default is `#16a34a`',
      control: {
        type: 'color',
      },
    },
    bgColor: {
      defaultValue: '#f3f4f6',
      description: 'Default is `#f3f4f6`',
      control: {
        type: 'color',
      },
    },
    barBgColor: {
      defaultValue: '#D1D5DB',
      description: 'Default is `#D1D5DB`',
      control: {
        type: 'color',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BarVisualizer>;

export const Default: Story = {
  render: function Render() {
    const [
      {
        stream,
        size,
        circle,
        addTransparency,
        padding,
        borderRadius,
        barBgColor,
        bgColor,
        barColor,
      },
      updateArgs,
    ] = useArgs();

    useEffect(() => {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((mediaStream) => {
          updateArgs({ stream: mediaStream });
        });
    }, []);

    return (
      <>
        {stream && (
          <BarVisualizer
            stream={stream}
            size={size}
            circle={circle}
            addTransparency={addTransparency}
            padding={padding}
            borderRadius={borderRadius}
            barBgColor={barBgColor}
            bgColor={bgColor}
            barColor={barColor}
          />
        )}
      </>
    );
  },
  parameters: {
    layout: 'centered',
  },
};
