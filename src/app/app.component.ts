import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'jsr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    readonly iconRegistry: MatIconRegistry,
    readonly sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'arrow_forward',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/arrow_forward.svg')
    );
    iconRegistry.addSvgIcon(
      'more_vert',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/more_vert.svg')
    );
    iconRegistry.addSvgIcon(
      'radio_button_checked',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/svg/radio_button_checked.svg'
      )
    );
    iconRegistry.addSvgIcon(
      'radio_button_unchecked',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/svg/radio_button_unchecked.svg'
      )
    );
    iconRegistry.addSvgIcon(
      'list',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/list.svg')
    );
    iconRegistry.addSvgIcon(
      'add',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/add.svg')
    );
    iconRegistry.addSvgIcon(
      'delete',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/delete.svg')
    );
    iconRegistry.addSvgIcon(
      'save',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/save.svg')
    );
    iconRegistry.addSvgIcon(
      'blank',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/blank.svg')
    );
    iconRegistry.addSvgIcon(
      'settings_input_svideo',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/svg/settings_input_svideo.svg'
      )
    );
  }
}
