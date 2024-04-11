import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WeatherService } from './services/weather.service';
import { WeatherData } from './interface/weather.interface';
import { error } from './interface/error.interface';
import { Subscription, takeUntil } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  @ViewChild("weatherForm") weatherForm !: NgForm
  @ViewChild("input") input !: ElementRef

  weather: WeatherData = {
    coord: {
      lon: 0,
      lat: 0
    },
    weather: [],
    base: '',
    main: {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
      sea_level: 0,
      grnd_level: 0
    },
    visibility: 0,
    wind: {
      speed: 0,
      deg: 0,
      gust: 0
    },
    clouds: {
      all: 0
    },
    dt: 0,
    sys: {
      type: 0,
      id: 0,
      country: '',
      sunrise: 0,
      sunset: 0
    },
    timezone: 0,
    id: 0,
    name: '',
    cod: 0
  }
  weatherSubscription!: Subscription


  constructor(
    private weatherService: WeatherService
  ) { }


  ngOnInit(): void {
    this.weatherSubscription = this.weatherService.getWeather('kochi')
      .subscribe({
        next: (res) => {
          this.weather = res
        },
        error: (err) => {
          alert(err.error.message)
        }
      })
  }



  submit() {

    const place = this.weatherForm.value?.place

    if (this.weatherForm.invalid || !place.trim()) {
      this.weatherForm.setValue({
        place: ""
      })
      this.input.nativeElement.focus()
      return
    }

    if (this.weatherForm.valid) {
      this.weatherSubscription = this.weatherService.getWeather(place)
        .subscribe({
          next: (res) => {
            this.weather = res
          },
          error: (err) => {
            alert(err.error.message)
          }
        })
    }
  }

  ngOnDestroy() {
    this.weatherSubscription.unsubscribe()
  }

}
