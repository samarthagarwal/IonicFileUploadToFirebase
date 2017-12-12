import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file'
import firebase from 'firebase'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private fileChooser: FileChooser, private file: File) {

  }

  choose(){
    this.fileChooser.open().then((uri)=>{
      alert(uri);

      this.file.resolveLocalFilesystemUrl(uri).then((newUrl)=>{
        alert(JSON.stringify(newUrl));

        let dirPath = newUrl.nativeURL;
        let dirPathSegments = dirPath.split('/')            //break the string into an array
        dirPathSegments.pop()                     //remove its last element
        dirPath = dirPathSegments.join('/')

        this.file.readAsArrayBuffer(dirPath, newUrl.name).then(async (buffer)=>{
          await this.upload(buffer, newUrl.name);
        })

      })

    })
  }

  async upload(buffer, name){
    let blob = new Blob([buffer], { type: "image/jpeg"});

    let storage = firebase.storage();

    storage.ref('images/' + name).put(blob).then((d)=>{
      alert("Done");
    }).catch((error)=>{
      alert(JSON.stringify(error))
    })

  }

}
