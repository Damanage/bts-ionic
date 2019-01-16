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
import { Platform, ModalController, NavController, PopoverController } from '@ionic/angular';
import { Component, OnInit, Inject} from '@angular/core';
import { PubService } from "../_services/pub.service";
import { ModalpagePage } from "../modalpage/modalpage.page";
import { HtmlInfoWindow } from '@ionic-native/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  //entryComponents:[ ModalpagePage ]
})
export class MapPage implements OnInit {
  map: GoogleMap;
  private _pubMapMarkers: any;
  private _markersOptions: any = [];
  
  constructor(
    private nav: NavController,
    public modalController: ModalController,
    public popoverCtrl: PopoverController,
    private platform:Platform,
    @Inject(PubService) private pub: PubService
    ){}

  async ngOnInit() {
    await this.platform.ready();
    await this.pub.getAllPubs().subscribe((data)=>{
      if (data) {
        this._pubMapMarkers = data;
        this.loadMap();
      } else {
        console.log("empty")
      }
    })
    
  }

  // async presentModal() {
  //   const modal = await this.modalController.create({
  //     component: ModalpagePage,
  //     componentProps: { value: 123 }
  //   });
  //   return await modal.present();
  // }
  async openModal(ev:Event, props){
    
    const popover = await this.modalController.create({
      component: ModalpagePage,
      componentProps: { 
        value: props
      },
      //event: ev
    });
    popover.present();
  }
  loadMap() {
    // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDdSDwzRvF4wNgX6qN2KA3DOqbielw5kyM',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDdSDwzRvF4wNgX6qN2KA3DOqbielw5kyM'
    });
    
    // let htmlInfoWindow = new HtmlInfoWindow();
    // let frame: HTMLElement = document.createElement('div');
    // frame.innerHTML = [
    //    `<h3>You rockin dude!</h3>`,
    //    `<button>I'm a button, bitch!</button>`
    // ].join("")
    // frame.getElementsByTagName("button")[0].addEventListener("click", ($event)=>{
    //   this.openModal($event);
    // })
    // htmlInfoWindow.setContent(frame, {
    //   width: "200px",
    //   height: "200px"
    // });


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
    let markersList = this._pubMapMarkers.rows.forEach(element => {
      let coords = element.value.geometry.coordinates;
      let desc = element.value.properties
      this._markersOptions.push({
        title: desc.product,
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
        },
        prop: {
          title: desc.product,
          price: desc.price,
          comment: desc.comments,
          date: desc.fromdate,
          currency: desc.currency
        }
      })
    });
    
    let markerCluster: MarkerCluster = this.map.addMarkerClusterSync({
      markers: this._markersOptions,
      icons: [
        {
        min: 3, max: 9,
        url: "./assets/icon/low-battery.svg",
        size: {width:45,height:45},
        label: {color: "black", fontSize: 20}
      },
      {
        min: 10,
        url: "./assets/icon/battery.svg",
        size: {width:45,height:45},
        label: {color: "black", fontSize: 20}
      }
    ]
    })
    
    


    markerCluster.on(GoogleMapsEvent.MARKER_CLICK).subscribe((params)=>{
      let marker: Marker = params[1];
      
      let name = marker.getTitle();
      let htmlInfoWindow = new HtmlInfoWindow();
      let frame: HTMLElement = document.createElement('div');
      frame.innerHTML = [
        `<h3>Тип батарейки - ${name}</h3>`,
        `<ion-button  shape="round" color="secondary" fill="outline">Детальная информация</ion-button>`
      ].join("")
      frame.className += "info-wrapper";
      frame.getElementsByTagName("ion-button")[0].addEventListener("click", ($event)=>{
        this.openModal($event, marker);
      })
      htmlInfoWindow.setContent(frame, {
        width: "280px",
        height: "110px"
      });
      

      htmlInfoWindow.open(marker);
    })
    
  
  }

  
}
