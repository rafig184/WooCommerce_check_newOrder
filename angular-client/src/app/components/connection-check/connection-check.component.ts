import { Component } from '@angular/core';
import { ConnectionCheckService } from 'src/app/services/connection-check.service';
import { Connection } from './model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import axios, { AxiosError } from 'axios';

@Component({
  selector: 'app-connection-check',
  templateUrl: './connection-check.component.html',
  styleUrls: ['./connection-check.component.css']
})
export class ConnectionCheckComponent {
  public domain: string
  public key: string
  public secret: string
  public products: any[]
  public isConnectionGood: Boolean
  public isLoading: Boolean
  public statusCode : string
  public isError: Boolean
  public errorStatus :any
  public url: string
  

  constructor(private connectionCheckService: ConnectionCheckService, private _snackBar: MatSnackBar) {
    this.domain = ""
    this.key = ""
    this.secret = ""
    this.products = []
    this.isConnectionGood = false
    this.isLoading = false
    this.statusCode = ""
    this.isError = false
    this.errorStatus = ""
    this.url = ""
  }

  clear() {
    this.isConnectionGood = false
    this.isError = false
    this.domain = ""
    this.key = ""
    this.secret = ""
  }


  async checkConnection() {
    this.isConnectionGood = false
    this.isError = false
    
    try {
      if (this.domain === "") {
        this.openSnackBar("Please enter a Domain", "OK")
        this.isConnectionGood = false
        return
      }
      if (this.key === "") {
        this.openSnackBar("Please enter the Key", "OK")
        this.isConnectionGood = false
        return
      }
      if (this.secret === "") {
        this.openSnackBar("Please enter the Secret", "OK")
        this.isConnectionGood = false
        return
      }
      this.isLoading = true
      this.url = `${this.domain}/wp-json/wc/v3/data?consumer_key=${this.key}&consumer_secret=${this.secret}`
      const result = await axios.get(this.url)

      // this.url
      console.log(this.url);
      
      
      if(result.status!= 200){
        console.log(result.status);
        throw new Error

      } else {
        this.statusCode = `חיבור תקין!! קוד סטטוס : ${result.status}`
        this.isConnectionGood = true
      // this.domain = ""
      // this.key = ""
      // this.secret = ""
      console.log(result.status)
      }
    } catch (error) {
      console.log(axios.isAxiosError(error));
      const axiosError = error as AxiosError;
      if (axiosError.message === "Network Error") {
      this.isConnectionGood = true
      this.statusCode = "!חיבור תקין אך מוגבל"
      this.url
      }else {
        this.isConnectionGood = true
        this.isError = true
        console.log(error);
        this.statusCode = `${error}`
        this.url
      }
    } finally {
      this.isLoading = false
    }
  }

  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'top';
    config.duration = 6000;
    this._snackBar.open(message, action, config);
  }

  selectInput(input: any) {
    input.select()
  }
}
