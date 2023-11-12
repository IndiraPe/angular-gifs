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

  constructor(private http: HttpClient) {
    //Cargar el historial de las búsquedas pasadas al iniciar la aplicación
    this.loadLocalStorage();
  }

  //Crear una copia para no editar el arreglo original
  get tagsHistory() {
    return [...this._tagsHistory]
  }

  //Ordenar el historial de búsqueda por el más reciente y evitar resultados duplicados
  private organizeHistory(tag:string){
    tag = tag.toLowerCase();
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag )
    }
    this._tagsHistory.unshift(tag);
    //Limitar las apariciones de búsqueda a 10
    this._tagsHistory = this.tagsHistory.splice(0, 10);
    //Guardar en el historial
    this.saveLocalStorage();
  }

  //Para guardar en el localStorage, se debe transformar el array en string
  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  //Para extraer y usarlo, hay que transformar el string en array
  private loadLocalStorage():void {
    if(!localStorage.getItem('history'))return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    if(this._tagsHistory.length === 0) return;
    this.searhTag(this._tagsHistory[0]);
  }

  //Función para el buscador
  searhTag(tag:string):void{
    if(tag.length === 0) return;
    this.organizeHistory(tag);

    //Simplificar el url de la petición
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '20')
      .set('q', tag)

    //Petición para obtener los gifs a partir de la palabra ingresada en el buscador
    this.http.get<SearchResponse>(`${ this.serviceURL }/search`, { params })
    .subscribe((resp)=> {
      this.gifList = resp.data;
    })

  }

}
