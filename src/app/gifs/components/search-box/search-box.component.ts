import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from 'src/app/service/gifs.service';

@Component({
  selector: 'app-gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsService:GifsService){}

  searchTag(){
    const newTag = this.tagInput.nativeElement.value;

    this.gifsService.searhTag(newTag);

    this.tagInput.nativeElement.value = '';

  }

}
