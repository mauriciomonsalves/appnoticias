import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import {Share} from '@capacitor/share';
import { ActionSheetController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  @Input() article:Article;
  @Input() index:number;

  constructor(
    private iab:InAppBrowser, 
    private actionSheetCtrl:ActionSheetController,
    private storageService:StorageService
    ) {}

  ngOnInit() {}

  openArticle() {
    ///window.open(this.article.url,'_blank');
    const browser =this.iab.create(this.article.url)
    browser.show();
  }

  async openMenu(){
    const inFavorites = this.storageService.articlesInFavorites(this.article)
    const actionShet = await this.actionSheetCtrl.create(
      {
        header:'Options',
        buttons: [
          {
            text:'Share',
            icon:'share-outline',
            handler: ()=> this.shareArticle()
          },
          {
            text:inFavorites ? 'Remove favorites' : 'favorites',
            icon:inFavorites ? 'heart' : 'heart-outline',
            handler: ()=> this.onToggleFavorite()
          },
          {
            text:'Cancel',
            icon:'clse-outline',
            role:'Cancel'
          }
        ]
      });

      await actionShet.present();

  }

 async shareArticle(){
    //console.log('Share article')
    await Share.share({
    title:this.article.title,
    text: this.article.source.name,
    url: this.article.url

    });
  }

  async onToggleFavorite(){

  
    console.log('Favorite article')
    await this.storageService.saveOrRemoveArticle(this.article);


  }

}
