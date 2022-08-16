import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const fjamaVisualizer = new Visualizer(
  'fjama',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight * 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);

    p5.strokeWeight(dim * 0.02);
    p5.stroke(212, 175, 55, 212);
    p5.fill(212, 175, 55, 212);

    const values = analyzer.getValue();
    for (let i = 0; i < values.length; i++) {
        const amplitude = values[i] as number;
        const x = p5.map(i, 0, values.length - 1, 0, width);
        //const y = height / 2 + amplitude * height;
        const y = 0 + 4 * (amplitude * height);
        p5.ellipse(x-25, height/3-250, 1, y/1);
      }
  },
);