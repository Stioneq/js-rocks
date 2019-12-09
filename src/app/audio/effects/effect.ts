import { AudioContext, GainNode, IAudioNode } from 'standardized-audio-context';
import { BehaviorSubject } from 'rxjs';

import { Active } from '@audio/interfaces/active.interface';
import { EffectNode } from '@audio/interfaces/node.interface';
import { Disposable } from '@audio/interfaces/disposable.interface';

export interface EffectInfo {
  model: string;
  params: {
    active: boolean;
  };
}

export abstract class Effect<D extends Active> implements Disposable {
  private activeSub$ = new BehaviorSubject(false);
  private context: AudioContext;
  protected defaults: D;
  protected isBypassEnabled: boolean;
  protected processor: IAudioNode<AudioContext>[] = [];
  input: GainNode<AudioContext>;
  output: GainNode<AudioContext>;
  active$ = this.activeSub$.asObservable();

  static connectInOrder(effects: Required<EffectNode>[]) {
    for (let i = effects.length - 1; i > 0; --i) {
      effects[i - 1].connect(effects[i]);
    }
  }

  static disconnectInOrder(effects: Required<EffectNode>[]) {
    for (const effect of effects) {
      effect.disconnect();
    }
  }

  set active(value: boolean) {
    if (value && typeof this.isBypassEnabled === 'undefined') {
      this.toggleBypass();
      this.toggleBypass();
    }

    if (this.isBypassEnabled !== !value) {
      this.toggleBypass();
    }
  }

  get currentTime() {
    return this.context.currentTime;
  }

  get sampleRate() {
    return this.context.sampleRate;
  }

  constructor(context: AudioContext, public model: string) {
    this.context = context;
    this.input = context.createGain();
    this.output = context.createGain();
    this.activeSub$.next(false);
  }

  applyDefaults() {
    Object.keys(this.defaults).forEach(option => {
      this[option] = this.defaults[option];
    });
  }

  toggleBypass() {
    this.isBypassEnabled = !this.isBypassEnabled;

    if (this.isBypassEnabled) {
      if (this.processor.length) {
        this.processor[this.processor.length - 1].disconnect();
      }

      this.input.disconnect();
      this.input.connect(this.output);
    } else {
      this.input.disconnect();
      this.input.connect(this.processor[0]);
      this.processor[this.processor.length - 1].connect(this.output);
    }

    this.activeSub$.next(!this.isBypassEnabled);
  }

  connect(effect: Effect<any>) {
    this.output.connect(effect.input);
  }

  disconnect() {
    this.output.disconnect();
  }

  dispose() {
    this.disconnect();

    for (const node of this.processor) {
      node.disconnect();
    }

    this.input.disconnect();

    this.processor = [];
    this.input = null;
    this.output = null;
    this.context = null;
    this.activeSub$.complete();
    this.isBypassEnabled = true;
  }

  takeSnapshot(): EffectInfo {
    return {
      model: this.model,
      params: {
        active: this.activeSub$.value
      }
    };
  }
}
