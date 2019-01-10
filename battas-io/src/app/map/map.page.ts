import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  MarkerCluster,
  Environment
} from '@ionic-native/google-maps/ngx';
import { Platform } from '@ionic/angular';
import { Component, OnInit, Inject } from '@angular/core';
import { PubService } from "../_services/pub.service"



@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: GoogleMap;
  public _mapMarkers: any;
  private _allMapMarkers: any = [];

  constructor(private platform:Platform,
    @Inject(PubService) private pub: PubService
    ){}

  async ngOnInit() {
    await this.platform.ready();
    await this.pub.getAllPubs().subscribe((data)=>{
      if (data) {
        this._mapMarkers = data;
        this.loadMap();
      } else {
        console.log("empty")
      }
    })
    
  }

  loadMap() {
   
    // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDdSDwzRvF4wNgX6qN2KA3DOqbielw5kyM',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDdSDwzRvF4wNgX6qN2KA3DOqbielw5kyM'
    });
    console.log(this._mapMarkers.rows)
    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 2.056562,
           lng: 45.304799
         },
         zoom: 10,
         tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);
    this._mapMarkers.rows.forEach(element => {
      let coords = element.value.geometry.coordinates;
      let desc = element.value.properties
      let marker = this.map.addMarkerSync({
        title: `<h3>${desc.product}</h3>`,
        icon: {
          url: './assets/icon/batt.png',
          size: {
            width: 40,
            height: 40
          }
        },
        animation: 'DROP',
        position: {
          lat: coords[0],
          lng: coords[1]
        }
      })
      this._allMapMarkers.push(marker)
    });
    console.log(this._allMapMarkers);
    console.log(this._allMapMarkers[0])
    // let markerCluster: MarkerCluster = this.map.addMarkerClusterSync({
    //   markers: this._allMapMarkers,
    //   icons: [{
    //     min: 2, max: 9,
    //     url: "./assets/icon/battery.svg",
    //     label: {color: "white"}
    //   }]
    // })
    // markerCluster.on(GoogleMapsEvent.MARKER_CLICK).subscribe((params)=>{
    //    let marker: Marker = params[1];
    //    marker.setTitle(marker.get("name"));;
    //    marker.setSnippet(marker.get("address"));
    //    marker.showInfoWindow();
    //  })
    
  
  }

}
