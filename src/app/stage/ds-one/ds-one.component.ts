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

import { Distortion, DistortionSettings } from '@audio/effects/distortion';
import { AudioContextManager } from '@audio/audio-context-manager.service';
import { PedalComponent } from '../pedal.interface';
import { KnobModule } from '../knob/knob.component';
import { LargeSwitchModule } from '../large-switch/large-switch.component';
import { LedModule } from '../led/led.component';
import { StompboxModule } from '../stompbox/stompbox.component';
import { ThreeKnobLayoutModule } from '../three-knob-layout/three-knob-layout.component';

@Component({
  selector: 'jsr-ds-one',
  templateUrl: './ds-one.component.html',
  styleUrls: ['./ds-one.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DsOneComponent
  implements OnInit, OnDestroy, PedalComponent<DistortionSettings> {
  @HostBinding('class.pedal')
  pedalClassName = true;

  @Output()
  remove = new EventEmitter<void>();

  @ViewChild(CdkDrag, { static: true })
  drag: CdkDrag;

  effect: Distortion;

  params: DistortionSettings = {
    level: 0.5,
    distortion: 0.5,
    tone: 0.5,
    active: false
  };

  constructor(private manager: AudioContextManager) {}

  ngOnInit() {
    // Config based on Boss DS-1 analysis https://www.electrosmash.com/boss-ds1-analysis.
    this.effect = new Distortion(this.manager.context, 'jds-1', this.params, {
      curveType: 'sunshine',
      preFilterRange: [33, 5000],
      toneControlType: 'mixed',
      toneRange: [234, 1063],
      postFilter: 8000
    });
    this.manager.addEffect(this.effect);
  }

  ngOnDestroy() {
    this.manager.removeEffect(this.effect);
    this.effect.dispose();
  }
}

@NgModule({
  declarations: [DsOneComponent],
  bootstrap: [DsOneComponent],
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
export class DsOneModule {}
