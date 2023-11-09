import { Component } from '@angular/core';
import { GifsService } from 'src/app/service/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'app-gifs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private gifsService: GifsService) {}

  get gifs():Gif[]{
    return this.gifsService.gifList;
  }
}
