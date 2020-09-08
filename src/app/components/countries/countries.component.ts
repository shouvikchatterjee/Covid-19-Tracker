import { FormGroup, FormBuilder } from '@angular/forms';
import { DataResolverService } from './../../services/data-resolver.service';
import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  countries = [];
  countryData = {
    newConfirmed: 0,
    newDeaths: 0,
    newRecovered: 0,
    totalConfirmed: 0,
    totalDeaths: 0,
    totalRecovered: 0
  }
  country;
  form: FormGroup;
  canvas3: any; ctx3: any; canvas4: any; ctx4: any;

  constructor(
    private formBuilder: FormBuilder,
    private dataResolverService: DataResolverService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      country: [null]
    });
    this.dataResolverService.getGlobalDatas();
    this.dataResolverService.getDatas().subscribe(datas => {
      datas.Countries.forEach(country => {
        // console.log('country:', country);
        this.countries.push(country);
      });
    });
    this.showChart();
  }

  onChange() {
    console.log('country:', this.form.controls.country.value);
    this.countries.forEach(country => {
      if (country.CountryCode === this.form.controls.country.value) {
        this.countryData.newConfirmed = country.NewConfirmed;
        this.countryData.newDeaths = country.NewDeaths;
        this.countryData.newRecovered = country.NewRecovered;
        this.countryData.totalConfirmed = country.TotalConfirmed;
        this.countryData.totalDeaths = country.TotalDeaths;
        this.countryData.totalRecovered = country.TotalRecovered;
        this.showChart();
      }
    });
  }

  showChart() {
    this.canvas3 = document.getElementById('myChart3');
    this.canvas4 = document.getElementById('myChart4');
    this.ctx3 = this.canvas3.getContext('2d');
    this.ctx4 = this.canvas4.getContext('2d');
    const myChart = new Chart(this.ctx3, {
      type: 'bar',
      data: {
        labels: ['New Confirmed', 'New Deaths', 'New Recovered', 'Total Confirmed', 'Total Deaths', 'Total Recovered'],
        datasets: [{
          label: 'Covid-19 Tracker',
          data: [
            this.countryData.newConfirmed,
            this.countryData.newDeaths,
            this.countryData.newRecovered,
            this.countryData.totalConfirmed,
            this.countryData.totalDeaths,
            this.countryData.totalRecovered
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

    const myChart2 = new Chart(this.ctx4, {
      type: 'pie',
      data: {
        labels: ['New Confirmed', 'New Deaths', 'New Recovered', 'Total Confirmed', 'Total Deaths', 'Total Recovered'],
        datasets: [{
          label: 'Covid-19 Tracker',
          data: [
            this.countryData.newConfirmed,
            this.countryData.newDeaths,
            this.countryData.newRecovered,
            this.countryData.totalConfirmed,
            this.countryData.totalDeaths,
            this.countryData.totalRecovered
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
