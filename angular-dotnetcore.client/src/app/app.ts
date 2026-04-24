import { ChangeDetectorRef, Component, OnInit, signal } from "@angular/core";
import { AppService } from "./services/app-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  public forecasts: WeatherForecast[] = [];

  constructor(private appService: AppService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.appService.getForecasts().subscribe({
      next: (data) => {
        this.forecasts = data;
        this.cdr.markForCheck(); // Tells Angular to check this component
        console.log(this.forecasts);
      },
      error: (error) => {
        console.error('Error fetching weather forecasts:', error);
      }
    });
  }

  protected readonly title = signal('angular-dotnetcore.client');
}
