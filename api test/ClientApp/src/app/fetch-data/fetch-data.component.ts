import { Component, Inject, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DirectoryService } from '../services/directoryService';
import { Directory } from '../interfaces/directoryInterface';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styles: [`
    .box-container{
      display:flex;
      flex-wrap: wrap;
      height: 700px;
      width: 1000px;
      overflow: scroll;
      justify-content: space-evenly ;
      padding-top: 50px;
    }
    .box-item {
      height: 200px;
      width: 200px;
      font-size: 24px;
      display: flex;
      align-items: center;
    }
  `],
})
export class FetchDataComponent {
  public directory: Directory[];
  public directoryViewList: Directory[];
  public isLandScape: boolean;
  public conatinerWidth: number;
  public containerHeight: number;
  private maxImageDisplay = 30;


  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private directoryService: DirectoryService) {
    this.isLandScape = false;
    this.conatinerWidth = 700;
    this.containerHeight = 1000;

    this.directoryService.getDirectories().toPromise().then((result: Directory[]) => {
      this.directory = result;
      this.directoryViewList = result.slice(0, this.maxImageDisplay);
    });
  }
  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      let diff = this.directory.length - this.directoryViewList.length
      let imagesToLoad = (diff <= this.maxImageDisplay) ? diff : this.maxImageDisplay + this.directoryViewList.length;
      this.directoryViewList = this.directoryViewList.concat(this.directory.slice(this.directoryViewList.length, imagesToLoad));
    }
  }
  changeToLandscape(): void {
    console.log('entro alv');
    this.conatinerWidth = 1000;
    this.containerHeight = 700;
  }
}
