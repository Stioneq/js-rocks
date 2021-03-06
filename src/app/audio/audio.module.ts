import { NgModule } from '@angular/core';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS
} from '@angular/material/snack-bar';

import { PresetManagerService } from './preset-manager.service';
import { ConvolverService } from './convolver.service';
import { AudioContextManager } from './audio-context-manager.service';

@NgModule({
  imports: [MatSnackBarModule],
  providers: [
    AudioContextManager,
    ConvolverService,
    PresetManagerService,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }
  ]
})
export class AudioModule {}
