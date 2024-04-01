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
  public isStatus: Boolean
  public isLoading: Boolean
  public statusCode : string
  public isConnectionError: Boolean
  public isConnectionGood: Boolean
  public isConnectionLimited: Boolean
  public url: string
  

  constructor(private connectionCheckService: ConnectionCheckService, private _snackBar: MatSnackBar) {
    this.domain = ""
    this.key = ""
    this.secret = ""
    this.products = []
    this.isStatus = false
    this.isLoading = false
    this.statusCode = ""
    this.isConnectionError = false
    this.isConnectionGood = false
    this.isConnectionLimited = false
    this.url = ""
  }

  clear() {
    this.isStatus = false
    this.isConnectionGood = false
    this.isConnectionError = false
    this.isConnectionLimited = false
    this.domain = ""
    this.key = ""
    this.secret = ""
  }


  async checkConnection() {
    this.isStatus = false
    this.isConnectionError = false
    this.isConnectionLimited = false
    this.isConnectionGood = false
    
    try {
      if (this.domain === "") {
        this.openSnackBar("אנא הכנס דומיין", "OK")
        this.isStatus = false
        return
      }
      if (this.key === "") {
        this.openSnackBar("אנא הכנס מפתח", "OK")
        this.isStatus = false
        return
      }
      if (this.secret === "") {
        this.openSnackBar("אנא הכנס סיסמה", "OK")
        this.isStatus = false
        return
      }
      this.isLoading = true
      this.url = `${this.domain}/wp-json/wc/v3/data?consumer_key=${this.key}&consumer_secret=${this.secret}`
      const result = await axios.get(this.url)


      if(result.status!= 200){
        console.log(result.status);
        throw new Error

      } else {
        this.statusCode = `חיבור תקין!! קוד סטטוס : ${result.status}`
        this.isStatus = true
        this.isConnectionGood = true
        console.log(result.status)
      }
    } catch (error) {
      console.log(axios.isAxiosError(error));
      const axiosError = error as AxiosError<any>;
      if (axiosError.message === "Network Error") {
        this.isStatus = true
        this.isConnectionLimited = true
        this.statusCode = `בדוק תקינות בקישור ,${axiosError.message} : !חיבור מוגבל`
      } else {
        this.isStatus = true
        this.isConnectionError = true
        console.log(error);
        this.statusCode = `${error}`
      }
    } finally {
      this.isLoading = false
    }
  }

  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'top';
    config.duration = 6000;
    config.direction = 'rtl';
    this._snackBar.open(message, action, config);
  }

  selectInput(input: any) {
    input.select()
  }
}
