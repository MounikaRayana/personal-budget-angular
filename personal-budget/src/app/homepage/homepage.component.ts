import { AfterViewInit, Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Chart } from 'chart.js';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {
  public dataSource = {
    datasets: [
        {
            data: [],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#878BB6',
                '#4ACAB4',
                '#FF8153'
            ],
        }
    ],
    labels: []
};

  constructor(private http: HttpClient , private dataService: DataService) { }

  ngAfterViewInit(): void {
    this.dataService.dataImport().subscribe((value: any) =>{
    // this.http.get('http://localhost:3000/budget')
    // .subscribe((res: any) => {
      for (var i = 0; i < value.length; i++) {
        this.dataSource.datasets[0].data[i] = value[i].budget;
        this.dataSource.labels[i] = value[i].title;
        this.createChart();
      }
    });
  }

createChart() {
  // var ctx = document.getElementById('myChart').getContext('2d');
  const ctx = document.getElementById('myChart') as HTMLCanvasElement;

  const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource
  });
}
}


