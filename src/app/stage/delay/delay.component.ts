import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  NgModule,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';

import { Delay, DelaySettings } from '@audio/effects/delay';
import { AudioContextManager } from '@audio/audio-context-manager.service';
import { PedalComponent } from '../pedal.interface';
import { KnobModule } from '../knob/knob.component';
import { LargeSwitchModule } from '../large-switch/large-switch.component';
import { LedModule } from '../led/led.component';
import { StompboxModule } from '../stompbox/stompbox.component';
import { ThreeKnobLayoutModule } from '../three-knob-layout/three-knob-layout.component';

@Component({
  selector: 'jsr-delay',
  templateUrl: './delay.component.html',
  styleUrls: ['./delay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DelayComponent
  implements OnInit, OnDestroy, PedalComponent<DelaySettings> {
  @HostBinding('class.pedal')
  pedalClassName = true;

  @Output()
  remove = new EventEmitter<void>();

  @ViewChild(CdkDrag, { static: true })
  drag: CdkDrag;

  effect: Delay;

  params: DelaySettings = {
    level: 0.5,
    time: 160,
    feedback: 45,
    feedbackCutoff: 2200,
    active: false
  };

  constructor(private manager: AudioContextManager) {}

  ngOnInit() {
    this.effect = new Delay(this.manager.context, 'jdm-2', this.params);
    this.manager.addEffect(this.effect);
  }

  ngOnDestroy() {
    this.manager.removeEffect(this.effect);
    this.effect.dispose();
  }
}

@NgModule({
  declarations: [DelayComponent],
  bootstrap: [DelayComponent],
  imports: [
    CommonModule,
    DragDropModule,
    KnobModule,
    LargeSwitchModule,
    LedModule,
    StompboxModule,
    ThreeKnobLayoutModule
  ]
})
export class DelayModule {}
