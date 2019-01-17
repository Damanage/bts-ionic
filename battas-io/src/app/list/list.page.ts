import { Component, OnInit, Inject } from '@angular/core';
import { PubService } from "../_services/pub.service";
import { Platform, ModalController, NavController, PopoverController } from '@ionic/angular';
import { ModalpagePage } from "../modalpage/modalpage.page";

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private _items: any;
  public pubItems = [];
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(
    public modalController: ModalController,
    private platform:Platform,
    @Inject(PubService) private pub: PubService
  ){}

  async ngOnInit() {
    await this.platform.ready();
    await this.pub.getAllPubs().subscribe((data)=>{
      if (data) {
        this._items = data;
        
        this._items.rows.forEach(element => {
          let id = element.id
          let desc = element.value.properties;
          let itemObj = {
            id: id,
            title: desc.product,
            price: desc.price,
            comment: desc.comments,
            date: desc.fromdate,
            currency: desc.currency
          }
          this.pubItems.push(itemObj)
        })
        console.log(this.pubItems)
      } else {
        console.log("empty")
      }
    })
  }

  
  async openModal(props){
    
    const popover = await this.modalController.create({
      component: ModalpagePage,
      componentProps: { 
        value: props,
        flag: "listPage"
      },
      //event: ev
    });
    popover.present();
  }
  
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
