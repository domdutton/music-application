import P5 from 'p5';
import * as Tone from 'tone';
import { Visualizer } from '../Visualizers';

export const csr5321Visualizer = new Visualizer(
  'csr5321',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);
    // const colors = ['green', 'blue', 'violet', 'maroon'];

    p5.background(0, 0, 0, 255);
    p5.strokeWeight(dim * 0.05);
    p5.stroke(250, 180, 0, 255);
    p5.noFill();

    const values = analyzer.getValue();
    console.log(' values: ' + values);
    p5.beginShape();
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      const x = p5.map(i, 0, values.length - 1, 0, width);
      const y = height / 2 + amplitude * height;
      // Place vertex
      p5.vertex(x, y);
    //   for (let j = 0; j < 4; j++){
    //     p5.fill(colors[j]);
    //   }
    }
    p5.endShape();
  },
);
