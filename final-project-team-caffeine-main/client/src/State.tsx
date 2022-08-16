// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { WaveformVisualizer } from './visualizers/Waveform';

import { TriangleInstrument } from './instruments/anniednavarro';
import { anniednavarro } from './visualizers/anniednavarro';
import { HarpInstrument } from './instruments/dutton6424';
import { SpiralVisualizer } from './visualizers/dutton6424';
import { fjamaInstrument } from './instruments/fjama';
import { fjamaVisualizer } from './visualizers/fjama';
import { HarmonicaInstrument, HarmonicaNote } from './instruments/csr5321';
import { csr5321Visualizer } from './visualizers/csr5321';

/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>;           // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */

const instruments = List([PianoInstrument, fjamaInstrument, HarmonicaInstrument, HarpInstrument, TriangleInstrument]);       // similar to Instrument[]


/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */

const visualizers = List([WaveformVisualizer, fjamaVisualizer, csr5321Visualizer, SpiralVisualizer, anniednavarro]);    // similar to Visualizer[]

/**
 * The default application state contains a list of instruments and a list of visualizers.
 *
 * 'instrument': List<Instrument>
 * 'visualizer': List<Visualizer>
 */
export const defaultState: AppState = Map<string, any>({
  'instruments': instruments,
  'visualizers': visualizers,
  // 'songs':songs
});