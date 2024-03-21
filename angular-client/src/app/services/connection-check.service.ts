import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ConnectionCheckService {
  public url: string
  constructor() {
    this.url = ""
  }

  async checkConnectionService(connection: any): Promise<any> {
    return await axios.get(this.url, connection)
  }
}
