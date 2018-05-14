import { Injectable, Input } from '@angular/core';
import { PapaParseService } from 'ngx-papaparse';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';

import { HttpClient } from '@angular/common/http'; 

@Injectable()
export class DataService {

  public AllData: Observable<Array<string>>
  public Columns: string[]

  constructor(
    private papa: PapaParseService,
    private route: ActivatedRoute,
    private http: HttpClient

  ) { }
  ngOnInit() {
    
    // this.getJSON().subscribe(data => {
    //   console.log(data)
    // });
  }

// https://stackoverflow.com/questions/47206924/angular-5-service-to-read-local-json-file



    public getJSON(): Observable<any> {
        return this.http.get("./assets/CoinData.json")
    }

  public getData(location): Observable<any> {
    
     return new Observable((observer) => {



      let tempData =  JSON.parse( `[{ "id": 1, "name": "John", "description": "John has been in the Audio/Video industry since 1990. He has led DevAv as its CEO since 2003. When not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.", "childCount": 5, "isUsed": true }, 
      { "id": 2, "name": "Olivia", "description": "Olivia loves to sell. She has been selling DevAV products since 2012. Olivia was homecoming queen in high school. She is expecting her first child in 6 months. Good Luck Olivia.", "childCount": 5 }, 
      { "id": 3, "name": "Robert", "description": "Robert was recently voted the CMO of the year by CMO Magazine. He is a proud member of the DevAV Management Team. Robert is a championship BBQ chef, so when you get the chance ask him for his secret recipe.", "childCount": 4 }, 
      { "id": 4, "name": "Greta", "description": "Greta has been DevAV's HR Manager since 2003. She joined DevAV from Sonee Corp.  Greta is currently training for the NYC marathon. Her best marathon time is 4 hours. Go Greta.", "childCount": 11 }, 
      { "id": 5, "name": "Brett", "description": "Brett came to DevAv from Microsoft and has led our IT department since 2012.  When he is not working hard for DevAV, he coaches Little League (he was a high school pitcher).", "childCount": 13 }, 
      { "id": 6, "name": "Sandra", "description": "Sandra is a CPA and has been our controller since 2008. She loves to interact with staff so if you've not met her, be certain to say hi.  Sandra has 2 daughters both of whom are accomplished gymnasts.", "childCount": 44 }, 
      { "id": 7, "name": "Kevin", "description": "Kevin is our hard-working shipping manager and has been helping that department work like clockwork for 18 months.  When not in the office, he is usually on the basketball court playing pick-up games.", "childCount": 5 }, 
      { "id": 8, "name": "Cynthia", "description": "Cindy joined us in 2008 and has been in the HR department for 2 years.   She was recently awarded employee of the month. Way to go Cindy!", "childCount": 4 }, 
      { "id": 9, "name": "Kent", "description": "As our ombudsman, Kent is on the front-lines solving customer problems and helping our partners address issues out in the field.    He is a classically trained musician and is a member of the Chamber Orchestra.", "childCount": 26 }, 
      { "id": 10, "name": "Taylor", "description": "If you are like the rest of us at DevAV, then you've probably reached out for help from Taylor. He does a great job as a member of our IT department.", "childCount": 5 }, 
      { "id": 11, "name": "Sam", "description": "Sammy is proud to be a member of the DevAV team. He joined the team in 2012 and has been in the sales department from the beginning.  He has just picked up golf so you can find him on the links every weekend.", "childCount": 11 }, 
      { "id": 12, "name": "Kelly", "description": "Kelly loves people and that's why she joined DevAV's support department. One of the funniest people in the company, she does stand-up on the weekends at the Laugh Factory.", "childCount": 5 }, 
      { "id": 13, "name": "Natalie", "description": "Natalie travels the US and teaches our partners how to explain the benefits of our products to customers.  She is a proud wife and mom and volunteers her time at the elementary school.", "childCount": 29 }, 
      { "id": 14, "name": "Walter", "description": "Walter has been developing apps and websites for DevAV since 2011. His passion is software and if you ever walk by his desk, you'll know why.  Wally once worked 72 hours straight - writing code and fixing bugs.", "childCount": 13 }]`);
      observer.next(tempData)
      observer.complete()
      
    }



    )}
  }

    
  //   console.log("get data ran")
  //   try {
  //     if (!location.length && location.length > 20) {
  //       Observable.throw("Invalid parameter specified")
  //     }
  //     this.AllData = new Observable 
  
  //       this.papa.parse("http://localhost:4200/assets/" + location + ".csv", {
  //         download: true,
  //         delimiter: ';',
  //         header: true,
  //         complete: (results, file) => {
  //           console.log("papaparse done")
  //           Observable.create((res) => res )
  //           //this.Columns = results.meta.fields
  //         },
  //         error: (err, file) => {

  //           if (err === "Not Found") {
  //             return Error("Unable to find file")
  //           }
  //           else {
  //             return Error("Unknown error")
  //           }

  //         }
        
  //     })
    


  //   }
  //   catch (e) { 
  //     (err) => console.log(e) 
  //   }
  //   finally {

  //   }

  // }
//}
