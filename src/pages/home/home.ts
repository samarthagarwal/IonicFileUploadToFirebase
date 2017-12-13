import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file'
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private fileChooser: FileChooser, private file: File, private loadingCtrl: LoadingController) {

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
          alert("File ready to be uploaded!");
          await this.upload(buffer, newUrl.name);
        })

      })

    })
  }

  async upload(buffer, name){
    let blob;
    
    if(name.split('.')[1] == "jpg")
      blob = new Blob([buffer], { type: "image/jpeg"});
    if(name.split('.')[1] == "png")
      blob = new Blob([buffer], { type: "image/png"});
    if(name.split('.')[1] == "mp4")
      blob = new Blob([buffer], { type: "video/mp4"});

    let storage = firebase.storage();
    let loading = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loading.present();
    
    let ref = storage.ref(name.split('.')[1] + '/' + name).put(blob)
    
    ref.on("state_changed", (taskSnapshot: any)=>{
      if(taskSnapshot.state == firebase.storage.TaskState.RUNNING)
        loading.setContent((taskSnapshot.bytesTransferred * 100/taskSnapshot.totalBytes).toFixed(0) + "% Completed");
    },(error)=>{
      alert(JSON.stringify(error))
    }, () => {
      loading.dismiss();
      alert("Done" + ref.snapshot.downloadURL);
    })
  }

}
