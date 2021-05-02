import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AppService {

	constructor(public httpCliente: HttpClient) { }

	public api = 'http://localhost:3000';

}
