import { Component } from '@angular/core';
import { OptionsService } from 'src/app/services/options.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

	constructor(private optionsService: OptionsService) {}

	getOptions() {
		this.optionsService.getOptions().subscribe(res => console.log(res));
    }

}
