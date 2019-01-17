import { Component, OnInit, Input, Inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BuyService } from "../_services/buy.service";


@Component({
  selector: 'app-modalpage',
  templateUrl: './modalpage.page.html',
  styleUrls: ['./modalpage.page.scss'],
//   providers: [NavParams]
 })
export class ModalpagePage implements OnInit {
  //navParams: NavParams
  @Input() public value: any;
  @Input() public flag: string;
  public desc;
  
  
  
  constructor(
    @Inject(BuyService) private buy: BuyService,
    private modalCtrl: ModalController
    ){}
  
  async ngOnInit() {
    console.log(this.value)
    if(this.value){
      if(this.flag === "mapPage"){
        let mFound = Object.getOwnPropertySymbols(this.value).find(e => e.toString() === "Symbol(vars)");
        let description = this.value[mFound].prop;
        return this.desc = description;
        console.log(this.desc)
      }
      else if(this.flag === "listPage"){
        console.log(this.value)
        return this.desc = this.value
      }
      else{
        console.log("Условия не выполнены")
      }
      
    }
    
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }
  
  buyItem(id){
    this.buy.buyItem(id).subscribe((data:any)=>{
      console.log(data.url)
      window.open(data.url, '_system')
    })
  }
}
