import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../gifs/interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory:string[] = [];
  private apiKey:string = 'cd516dHqh7dbPOeU39zZqX9JZ7peHbzr'
  private serviceURL:string ='https://api.giphy.com/v1/gifs'

  constructor(private http: HttpClient) { }

  get tagsHistory() {
    return [...this._tagsHistory]
  }

  private organizeHistory(tag:string){
    tag = tag.toLowerCase();
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag )
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0, 10);
  }

  searhTag(tag:string):void{
    if(tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '20')
      .set('q', tag)

    this.http.get<SearchResponse>(`${ this.serviceURL }/search`, { params })
    .subscribe((resp)=> {
      this.gifList = resp.data;

      console.log(this.gifList);

    })

  }



}
