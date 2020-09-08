import { DataResolverService } from './../../services/data-resolver.service';
import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  globalDatas = {
    newConfirmed: 0,
    newDeaths: 0,
    newRecovered: 0,
    totalConfirmed: 0,
    totalDeaths: 0,
    totalRecovered: 0
  };
  canvas: any; ctx: any; canvas2: any; ctx2: any;

  constructor(private dataResolverService: DataResolverService) { }

  ngOnInit(): void {
    this.dataResolverService.getGlobalDatas();
    setInterval(time => {
      this.dataResolverService.getGlobalDatas();
    }, 1000 * 60 * 60 * 24);

    this.dataResolverService.getDatas().subscribe(datas => {
      console.log('datas:', datas);
      this.globalDatas.newConfirmed = datas.Global.NewConfirmed;
      this.globalDatas.newDeaths = datas.Global.NewDeaths;
      this.globalDatas.newRecovered = datas.Global.NewRecovered;
      this.globalDatas.totalConfirmed = datas.Global.TotalConfirmed;
      this.globalDatas.totalDeaths = datas.Global.TotalDeaths;
      this.globalDatas.totalRecovered = datas.Global.TotalRecovered;
      this.showChart();
    });
  }

  showChart() {
    this.canvas = document.getElementById('myChart');
    this.canvas2 = document.getElementById('myChart2');
    this.ctx = this.canvas.getContext('2d');
    this.ctx2 = this.canvas2.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: ['New Confirmed', 'New Deaths', 'New Recovered', 'Total Confirmed', 'Total Deaths', 'Total Recovered'],
        datasets: [{
          label: 'Covid-19 Tracker',
          data: [
            this.globalDatas.newConfirmed,
            this.globalDatas.newDeaths,
            this.globalDatas.newRecovered,
            this.globalDatas.totalConfirmed,
            this.globalDatas.totalDeaths,
            this.globalDatas.totalRecovered
          ],
          backgroundColor: ['red', 'blue', 'orange', 'green', 'pink', 'black'],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: true
        },
        responsive: true,
        display: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    let myChart2 = new Chart(this.ctx2, {
      type: 'pie',
      data: {
        labels: ['New Confirmed', 'New Deaths', 'New Recovered', 'Total Confirmed', 'Total Deaths', 'Total Recovered'],
        datasets: [{
          label: 'Covid-19 Tracker',
          data: [
            this.globalDatas.newConfirmed,
            this.globalDatas.newDeaths,
            this.globalDatas.newRecovered,
            this.globalDatas.totalConfirmed,
            this.globalDatas.totalDeaths,
            this.globalDatas.totalRecovered
          ],
          backgroundColor: ['red', 'blue', 'orange', 'green', 'pink', 'black'],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: true
        },
        responsive: true,
        display: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    /* let myChart3 = new Chart(this.ctx3, {
      type: 'line',
      data: {
        labels: ["Angular 10", "Angular 9", "Angular 8"],
        datasets: [{
          label: 'Active Angular Vesrions',
          data: [85, 100, 60],
          backgroundColor: ["red", "blue", "orange"],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: true
        },
        responsive: true,
        display: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }); */
  }

}
