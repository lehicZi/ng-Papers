import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-video',
  templateUrl: './delete-video.component.html',
  styleUrls: ['./delete-video.component.scss']
})
export class DeleteVideoComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any){}

}
