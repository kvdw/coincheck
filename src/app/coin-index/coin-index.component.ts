

import { DataService } from './../shared/services/data.service';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { GroupByPipe } from 'ngx-pipes';


@Component({
  selector: 'app-coin-index',
  templateUrl: './coin-index.component.html',
  styleUrls: ['./coin-index.component.css']
})
export class CoinIndexComponent implements OnInit {


  constructor(
    private dataservice: DataService
  ) { }


  public CoinData = new Array

  ngOnInit() {

    this.dataservice.getJSON().subscribe(data => {
      this.CoinData = data

    });
  }

  


  public ColorBasedInput (entry) {
    if(entry == 0) { return "white"}
    else if(entry < 0) { return "red"}
    else if(entry > 0) { return "green"}

  }

}
