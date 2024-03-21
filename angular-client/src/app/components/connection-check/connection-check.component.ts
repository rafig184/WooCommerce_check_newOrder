import { Component } from '@angular/core';
import { ConnectionCheckService } from 'src/app/services/connection-check.service';
import { Connection } from './model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-connection-check',
  templateUrl: './connection-check.component.html',
  styleUrls: ['./connection-check.component.css']
})
export class ConnectionCheckComponent {
  public domain: String
  public key: String
  public secret: String
  public products: any[]
  public isSearch: Boolean
  public isLoading: Boolean

  constructor(private connectionCheckService: ConnectionCheckService, private _snackBar: MatSnackBar) {
    this.domain = ""
    this.key = ""
    this.secret = ""
    this.products = []
    this.isSearch = false
    this.isLoading = false
  }

  clear() {
    this.isSearch = false
    this.domain = ""
    this.key = ""
    this.secret = ""
  }



  async checkConnection() {
    const connection: Connection = {
      domain: this.domain,
      key: this.key,
      secret: this.secret
    }
    console.log(connection);

    try {
      if (this.domain === "") {
        this.openSnackBar("Please enter a Domain", "OK")
        this.isSearch = false
        return
      }
      if (this.key === "") {
        this.openSnackBar("Please enter the Key", "OK")
        this.isSearch = false
        return
      }
      if (this.secret === "") {
        this.openSnackBar("Please enter the Secret", "OK")
        this.isSearch = false
        return
      }
      this.isLoading = true
      const result = await this.connectionCheckService.checkConnectionService(connection)
      this.products = result.data
      this.isSearch = true
      this.domain = ""
      this.key = ""
      this.secret = ""
    } catch (error) {
      console.log(error);
      alert("Connection Problem")
    } finally {
      this.isLoading = false
    }
  }

  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'top';
    config.duration = 4000;
    this._snackBar.open(message, action, config);
  }
}
