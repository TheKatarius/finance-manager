import { Component, Input } from '@angular/core';

@Component({
  selector: 'fin-man-basic-info-panel',
  templateUrl: './fin-man-basic-info-panel.component.html',
  styleUrls: ['./fin-man-basic-info-panel.scss'],
})
export class FinManBasicInfoPanelComponent {
  @Input() iconName: string = '';

  @Input() panelName: string = '';

  @Input() panelValue: string = '';
}
