import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for the harmonica (csr5321).
 ** ------------------------------------------------------------------------ */

interface HarmonicaKeyProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
  draw?: boolean; // True if drawing breath in, false if blowing out 
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

// PianoKey => HarmonicaNote
export function HarmonicaNote({
  note,
  synth,
  draw,
  index,
}: HarmonicaKeyProps): JSX.Element {
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
        'bg-gold black h3': draw, // draw notes are gold
        'black bg-blue h4': !draw, // blow notes are blue
      })}
      style={{
        // CSS
        top: '2rem',
        left: `${index * 2}rem`,
        zIndex: draw ? 1 : 0,
        width: '2rem',
        height: '2rem'
        // marginLeft: draw ? '0.25rem' : 0,
      }}
    ></div>
  );
}

// eslint-disable-next-line
function HarmonicaNoteNoJSX({
  note,
  synth,
  draw,
  index,
}: HarmonicaKeyProps): JSX.Element {
  /**
   * This React component for pedagogical purposes.
   * See `HarmonicaNote` for the React component with JSX (JavaScript XML).
   */
  return React.createElement(
    'div',
    {
      onMouseDown: () => synth?.triggerAttack(`${note}`),
      onMouseUp: () => synth?.triggerRelease('+0.25'),
      className: classNames('ba pointer absolute dim', {
        'bg-black black h3': draw,
        'black bg-white h4': !draw,
      }),
      style: {
        top: 0,
        left: `${index * 2}rem`,
        zIndex: draw ? 1 : 0,
        width: '2rem'
      },
    },
    [],
  );
}

function HarmonicaType({ title, onClick, active }: any): JSX.Element {
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

// odd index are drawNotes
function Harmonica({ synth, setSynth }: InstrumentProps): JSX.Element {
  const notes = List([
    { note: 'Cb', idx: 0 }, 
    { note: 'Db', idx: 1 },
    { note: 'Eb', idx: 2 },
    { note: 'Gb', idx: 3 },   
    { note: 'Gb', idx: 4 },
    { note: 'Bb', idx: 5 },  
    { note: 'C', idx: 6 },
    { note: 'D', idx: 7 },
    { note: 'E', idx: 8 },
    { note: 'F', idx: 9 },  
    { note: 'G', idx: 10 },
    { note: 'A', idx: 11 }, 
    { note: 'C', idx: 12 },
    { note: 'B', idx: 13 },
    { note: 'E#', idx: 14 },
    { note: 'D#', idx: 15 },  
    { note: 'G#', idx: 16 },
    { note: 'F#', idx: 17 }, 
    { note: 'C#', idx: 18 },
    { note: 'A#', idx: 19 },

  ]);

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect();

      return new Tone.Synth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
      }).toDestination();
    });
  };

  const oscillators: List<OscillatorType> = List([
    // 'sine',
    'sawtooth',
    // 'square',
    // 'triangle',

    'fmsawtooth',
    // 'fmtriangle',
    // 'amsine',
    'amsawtooth',
    // 'amtriangle',
  ]) as List<OscillatorType>;

  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4">
        {Range(5, 6).map(octave =>
          notes.map(hnote => {
            const isDraw = hnote.idx %2 !== 0;
            const note = `${hnote.note}${octave}`;
            return (
              <HarmonicaNote
                key={note} //react key
                note={note}
                synth={synth}
                draw={isDraw}
                octave={octave}
                index={(octave - 2) + hnote.idx}
              />
            );
          }),
        )}
      </div>
      <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <HarmonicaType
            key={o}
            title={o}
            onClick={() => setOscillator(o)}
            active={synth?.oscillator.type === o}
          />
        ))}
      </div>
    </div>
  );
}

export const HarmonicaInstrument = new Instrument('Harmonica (csr5321)', Harmonica);
