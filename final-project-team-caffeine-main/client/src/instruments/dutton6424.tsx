// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from "../Instruments";
import harpImage from '../img/harp.png';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Harp.
 ** ------------------------------------------------------------------------ */

interface HarpKeyProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

export function PianoKey({
  note,
  synth,
  minor,
  index,
}: HarpKeyProps): JSX.Element {
  /**
   * This React component corresponds to either a major or minor key in the piano.
   * See `PianoKeyWithoutJSX` for the React component without JSX.
   */
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <div
      onMouseDown={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
      onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
      className={classNames('ba pointer absolute dim', {
        'bg-red black h4': minor, // minor keys are black
        'black bg-white h4': !minor, // major keys are white
      })}
       style={{
        // CSS
        top: 0,
        left: `${index * 2}rem`,
        zIndex: minor ? 1 : 1,
        width: minor ? '0.4rem' : '0.4rem',
        marginLeft: minor ? '0.1rem' : 1,
      }}
    ></div>
  );
}

// // eslint-disable-next-line
// function PianoKeyWithoutJSX({
//   note,
//   synth,
//   minor,
//   index,
// }: PianoKeyProps): JSX.Element {
  /**
   * This React component for pedagogical purposes.
   * See `PianoKey` for the React component with JSX (JavaScript XML).
   */
//   return React.createElement(
//     'div',
//     {
//       onMouseDown: () => synth?.triggerAttack(`${note}`),
//       onMouseUp: () => synth?.triggerRelease('+0.25'),
//       className: classNames('ba pointer absolute dim', {
//         'bg-black black h3': minor,
//         'black bg-white h4': !minor,
//       }),
//       style: {
//         top: 0,
//         left: `${index * 2}rem`,
//         zIndex: minor ? 1 : 0,
//         width: minor ? '1.5rem' : '2rem',
//         marginLeft: minor ? '0.25rem' : 0,
//       },
//     },
//     [],
//   );
// }

function HarpType({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
        'b--black black': active,
        'gray b--light-gray': !active,
      })}
    >
      {title}
    </div>
  );
}

function Harp({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'C', idx: 0 },
    { note: 'Db', idx: 0.5 },
    { note: 'D', idx: 1 },
    { note: 'Eb', idx: 1.5 },
    { note: 'E', idx: 2 },
    { note: 'F', idx: 3 },
    { note: 'Gb', idx: 3.5 },
    { note: 'G', idx: 4 },
    { note: 'Ab', idx: 4.5 },
    { note: 'A', idx: 5 },
    { note: 'Bb', idx: 5.5 },
    { note: 'B', idx: 6 },
  ]);

//   const setOscillator = (newType: Tone.ToneOscillatorType) => {
//     setSynth(oldSynth => {
//       oldSynth.disconnect();

//       return new Tone.Synth({
//         oscillator: { type: newType } as Tone.OmniOscillatorOptions,
//       }).toDestination();
//     });
//   };

//   const oscillators: List<OscillatorType> = List([
//     'sine',
//     'sawtooth',
//     'square',
//     'triangle',
//     'fmsine',
//     'fmsawtooth',
//     'fmtriangle',
//     'amsine',
//     'amsawtooth',
//     'amtriangle',
//   ]) as List<OscillatorType>;

/**
  * harp mods
  **/

  //reverb
  const reverb = new Tone.Reverb({
    decay: 1,
    wet: 0,
  }).toDestination();

  // filter
  const filter = new Tone.Filter({
    type: 'highpass',
    frequency: 200,
  }).toDestination();

  //pitch
  const pitchShift = new Tone.PitchShift({
    pitch: 3,
  }).toDestination();

  //vibrato
  const vibrato = new Tone.Vibrato({
    frequency: 5,
    depth: 0.1,
    type: 'sine',
  }).toDestination();

  //harpInstrument
  const harpInstrament = new Tone.Synth({
    oscillator: {
      type: 'fmtriangle',
      modulationType: "sine",
      volume: 0
    },
    envelope:{
      attack: 0,
      decay: 0.1,
      sustain: 0.02,
      release: 0.24,
    },}).toDestination();
    harpInstrament.connect(pitchShift).connect(reverb).connect(filter).connect(vibrato)


  return (
    <div className="pv4">
      <div className = "harpImg">
        <img src={ harpImage } alt=" "/>
      </div>

      <div className="relative dib h4 w-100 ml4">
        {Range(2, 7).map(octave =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}${octave}`;
            return (
              <PianoKey
                key={note} //react key
                note={note}
                synth={harpInstrament} //harp mods declared
                minor={isMinor}
                octave={octave}
                index={(octave - 2) * 7 + key.idx}
              />
            );
          }),
        )}
      </div>
      {/* <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <HarpType
            key={o}
            title={o}
            onClick={() => setOscillator(o)}
            active={synth?.oscillator.type === o}
          />
        ))}
      </div> */}
    </div>
  );
}

export const HarpInstrument = new Instrument('Harp (dutton6424)', Harp);
