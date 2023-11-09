import { Component } from '@angular/core';
import { GifsService } from '../../../service/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) {}

  get arrSearchGifs(){
    return [...this.gifsService.tagsHistory]
  }

}
