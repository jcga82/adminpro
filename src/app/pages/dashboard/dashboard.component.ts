import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Users } from 'src/assets/querys/querysGraphql';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  data: any[] = [];

  constructor(
    private apollo: Apollo
  ) { }

  ngOnInit() {
    this.apollo.watchQuery({ query: Users })
      .valueChanges.subscribe((result: any) => {
        console.log(result);
        this.data = result.data.profiles;
    });
  }

}
