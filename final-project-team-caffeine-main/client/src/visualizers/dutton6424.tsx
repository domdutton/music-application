// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';
export const SpiralVisualizer = new Visualizer(
  'dutton6424',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    //const dim = Math.min(width, height);

    p5.background('#637373');
    let spectrum = analyzer.getValue();

    p5.fill(50,255,50);
    p5.beginShape();
    let space = 5;
    for (let k = 0; k < spectrum.length; k ++) {
      p5.stroke(255,205,0);
      p5.strokeWeight(5);
      let amp = spectrum[k] as number * 300;
      let y = p5.map(amp, 0, 256, height, 0);
      p5.line(k * space, height, k * space, y);
    }
    p5.endShape();
  },
);
