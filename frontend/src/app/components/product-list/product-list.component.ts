import { Component, Input, OnInit } from '@angular/core';
import { Solucao } from 'src/app/model/types';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

	@Input() dataList: Solucao[];

	constructor() { }

	ngOnInit(): void {
	}

}
