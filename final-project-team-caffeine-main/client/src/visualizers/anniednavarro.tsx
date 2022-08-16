// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


  export const anniednavarro = new Visualizer(
    'anniednavarro', 
    (p5: P5, analyzer: Tone.Analyser) => {
      // const width = window.innerWidth;
      // const height = window.innerHeight / 2;

      // p5.background(0, 0, 0, 255);
      
      // p5.noFill();
      // p5.translate(width / 2.5, height / 2.5);
  
      // const values = analyzer.getValue();
      // p5.beginShape();
      // for (let i = 0; i <= values.length; i++) {  
      //   p5.push();
      //   p5.rotate(Math.sin(p5.frameCount + i) * 100);

      //   const r = p5.map(Math.sin(p5.frameCount), -1, 1, 50, 255);
      //   const g = p5.map(Math.cos(p5.frameCount/2), -1, 1, 50, 255);
      //   const b = p5.map(Math.sin(p5.frameCount/4), -1, 1, 50, 255);

      //   p5.stroke(r, g, b);
      //   p5.rect(0, 0, 300 - i * 3, 300 - i * 3, 200);
        

      //   p5.pop();
      // }

      // p5.endShape();



    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);
    p5.strokeWeight(dim * 0.001);
    p5.stroke('#C587D3');
    p5.noFill();

    const values = analyzer.getValue();
    p5.beginShape();
    for (let i = 0; i < values.length; i++) {
        let amplitude = values[i] as number;
        let r = p5.map(amplitude * 100, -50, 100, 120, width);
        let x = r * Math.sin(i);
        let y = r * Math.cos(i);
      
        p5.circle(x, y, i * 2);

    }
    p5.endShape();










    }
  );

