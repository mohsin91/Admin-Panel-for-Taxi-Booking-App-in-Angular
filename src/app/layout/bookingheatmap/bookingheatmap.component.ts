import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-bookingheatmap',
  templateUrl: './bookingheatmap.component.html',
  styleUrls: ['./bookingheatmap.component.css']
})
export class BookingheatmapComponent implements OnInit {

    showAbsMenu: Boolean = true;
    latLngArray: any = [
        {
          title:'0',
          latitude:26.368351,
          longitude:-80.128873,
          opacity: 1
        },
        {
          title:'1',
          latitude:26.368351,
          longitude:-80.128873,
          opacity: 1

        },
        {
          title:'2',
          latitude:26.368092,
          longitude:-80.125011,
          opacity: 1

        }
      ]
      latLngArray1: any = [
        {
          title:'0',
          latitude:21.262060,
          longitude:79.785467
        },
        {
          title:'1',
          latitude:21.262060,
          longitude:79.785467
        },
        {
          title:'2',
          latitude:21.262060,
          longitude:79.785467
        }
      ]
      latLngArray2: any = [
        {
          title:'0',
          latitude:22.718349,
          longitude:47.014041
        },
        {
          title:'1',
          latitude:22.718349,
          longitude:47.014041
        },
        {
          title:'2',
          latitude:22.718349,
          longitude:47.014041
        }
      ]
      latLngArray3: any = [
        {
          title:'0',
          latitude:63.760665,
          longitude:95.796657
        },
        {
          title:'1',
          latitude:63.760665,
          longitude:95.796657
        },
        {
          title:'2',
          latitude:63.760665,
          longitude:95.796657
        }
      ]
      latLngArray4: any = [
        {
          title:'0',
          latitude:72.966044,
          longitude:-36.575942
        },
        {
          title:'1',
          latitude:72.966044,
          longitude:-36.575942
        },
        {
          title:'2',
          latitude:72.966044,
          longitude:-36.575942
        }
      ]
      latLngArray5: any = [
        {
          title:'0',
          latitude:56.964306,
          longitude:-116.561840
        },
        {
          title:'1',
          latitude:56.964306,
          longitude:-116.561840
        },
        {
          title:'2',
          latitude:56.964306,
          longitude:-116.561840
        }
      ]                              
      
      resizesPoint = {
          title:'resizes',
          opacity:.7,
          latitude:26.360000,
          longitude:-80.110000,
          bounds:{
            x: {
              latitude:-0.003,
              longitude:-0.0052
            },
            y: {
              latitude:0.003,
              longitude:0.0052
            }
          }
        }

   constructor() { }

  ngOnInit() {


    // environment.swalalert('nodata', 'Under Construction');
  }



  view:"data"
  destroyMap:boolean
  setLatLngArrayString( string:string ){
    const json = JSON.parse(string)
    this.latLngArray = json
  }

  toNumber(value){
    return Number(value)
  }
}
