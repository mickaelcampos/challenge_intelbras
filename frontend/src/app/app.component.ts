import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OptionsService } from 'src/app/services/options.service';
import { Solucao } from './model/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

	data$: Observable<Solucao[]>;

	constructor(private optionsService: OptionsService) {}

	getOptions() {
		this.optionsService.getOptions()
			.subscribe(data => this.data$ = data.solucao);
  	}

}
