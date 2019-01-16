import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modalpage',
  templateUrl: './modalpage.page.html',
  styleUrls: ['./modalpage.page.scss'],
//   providers: [NavParams]
 })
export class ModalpagePage implements OnInit {
  //navParams: NavParams
  @Input() public value: number;
  public desc;
  
  
  
  constructor(private modalCtrl: ModalController) { }
  
  ngOnInit() {
    if(this.value){
      let mFound = Object.getOwnPropertySymbols(this.value).find(e => e.toString() === "Symbol(vars)");
      let description = this.value[mFound].prop;
      return this.desc = description;
      console.log(this.desc)
    }
    
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }
}
