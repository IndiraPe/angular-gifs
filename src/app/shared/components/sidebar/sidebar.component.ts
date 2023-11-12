import { Component } from '@angular/core';
import { GifsService } from '../../../service/gifs.service';
import { TrendingDatetime } from '../../../gifs/interfaces/gifs.interfaces';

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

  onSearchTag(tag:string) {
    return this.gifsService.searhTag(tag);
  }
}
