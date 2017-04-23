import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'; 
import { NavController, LoadingController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  public carros;

  constructor(
    public navCtrl: NavController, 
    private _http: Http,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController) {}

  ngOnInit() {
    
    let loader = this._loadingCtrl.create({
      content: 'Buscando novos carros. Aguarde...'
    });

    loader.present();

    this._http
      .get('https://aluracar.herokuapp.com')
      .map(res => res.json())
      .toPromise()
      .then(carros => {
        this.carros = carros;
        loader.dismiss();
      })
      .catch( err => {
        console.log(err);
        loader.dismiss(); 
        this._alertCtrl.create({
          title: 'Falha na conexão!',
          buttons: [{ text: 'Estou ciente' }],
          subTitle: 'Não foi possível obter a lista de carros. Tente mais tarde.' 
        }).present();
      });
  }

  seleciona(carro){

    console.log(carro.nome);
  }

}
