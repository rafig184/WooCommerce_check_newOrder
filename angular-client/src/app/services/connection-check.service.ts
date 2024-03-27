import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ConnectionCheckService {
  constructor() {

  }

  async checkConnectionService(domain :string, key:string, secret:string): Promise<any> {
    return await axios.get(`${domain}/wp-json/wc/v3/data?consumer_key=${key}&consumer_secret=${secret}`);
  }
}
