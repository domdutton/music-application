// 3rd party library imports
import * as Tone from 'tone';
import { useState } from 'react'; // for Tone.Sample
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';
import trumpet from '../img/trumpet.png';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Flute.
 ** ------------------------------------------------------------------------ */

interface TrumpetKeyProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  index: number; // octave + index together give a location for the flute key
}

export function TrumpetKey({
  note,
  synth,
  minor,
  index,
}: TrumpetKeyProps): JSX.Element {

  const [sample] = useState(
    new Tone.Sampler({
      urls:{
        A3: "trumpet.mp3",
      },
    }).toDestination()
  );
    
  const trumpet_sample = (note: string) => {
    sample.triggerAttackRelease([`${note}`], 1);
  };

  const trumpetImage = {
    width: "70px",
    margin:'10px',
    display: "flex",
  };

  return (
    <div
      onMouseDown={()=> trumpet_sample(`${note}`)}
      onMouseUp={() => synth?.triggerRelease('+0.25')}
      className={classNames('pointer absolute dim', {
      })}
      style={{
        top: minor ? 0 : '100px',
        left: `${index * 5}rem`,
        padding: '10px',
        display:'flex',
      }}
    >
      <img src={trumpet} style={trumpetImage} />
    </div>
  );
}

function Trumpet({ synth, setSynth }: InstrumentProps): JSX.Element {
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

  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4">
        {Range(3, 5).map(octave =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}${octave}`;
            return (
              <TrumpetKey
                key={note}
                note={note}
                synth={synth}
                minor={isMinor}
                octave={octave}
                index={(octave - 3) * 7 + key.idx}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}

export const fjamaInstrument = new Instrument('Trumpet (fjama)', Trumpet);