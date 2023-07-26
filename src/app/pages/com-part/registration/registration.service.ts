import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
import {environment}  from '../../../../environments/environment';
import * as constant from '../constants/api-constants';
import {HttpErrorResponse
  } from '@angular/common/http';
  import { Observable, throwError } from 'rxjs';
  import { catchError } from 'rxjs/operators';

@Injectable()
export class RegistrationService {
  apiBaseUrl = environment.apiUrl;
comprName:string;
banRefName:string;
taxclrName:string;
thrdRefName:string;
codConName:string;
orgChtName:string;
misVisStaName:string;
stfTrPyName:string;
audTrdPtName:string;
annRepName:string;
stkMkInfoName:string;
quaPolName:string;
quaManName:string;
prodQuaManName:string;
hsePolName:string;
hseComResName:string;
hseTrdPtyName:string;
hseComKpiName:string;
hseStfTrName:string;
frdMalPyName:string;
trdPtySocAudName:string;
socResHumEthLawName:string;
//Array upload
busConPol = [];
transRef = [];
finStaYr = [];
quaCertCopy = [];
hseCertCopy = [];

    constructor(private http: HttpClient) {}
  
    getContactPersons(): Observable<any> {
      return this.http.get(`${environment.apiUrl}${constant.Registration.allContactPersons}`);
    }
    getThirdPartyReference(): Observable<any> {
      return this.http.get(`${environment.apiUrl}${constant.Registration.allThirdPartyReference}`);
    }
    getProductServiceCategory(): Observable<any> {
      return this.http.get(`${environment.apiUrl}${constant.Registration.allProductsServiceCategory}`);
    }
    getCategorySpecialization(): Observable<any> {
      return this.http.get(`${environment.apiUrl}${constant.Registration.allCategorySpecalization}`);
    }
    getDPRCategory(): Observable<any> {
      return this.http.get(`${environment.apiUrl}${constant.Registration.allDPRCategory}`);
    }
    getProductCategory(): Observable<any> {
      return this.http.get(`${environment.apiUrl}${constant.Registration.allProductCategory}`);
    }
    getServiceCategory(): Observable<any> {
      return this.http.get(`${environment.apiUrl}${constant.Registration.allSeviceCategory}`);
    }
    getSubCategory(): Observable<any> {
      return this.http.get(`${environment.apiUrl}${constant.Registration.allSubCategory}`);
    }
    getSuppliers(): Observable<any> {
      return this.http.get(`${environment.apiUrl}${constant.Registration.allSuppliers}`);
    }
    getServices(): Observable<any> {
      return this.http.get(`${environment.apiUrl}${constant.Registration.allServices}`);
    }
    getProducts(): Observable<any> {
      return this.http.get(`${environment.apiUrl}${constant.Registration.allProducts}`);
    }
    getDepartments(): Observable<any> {
      return this.http.get(`${environment.apiUrl}${constant.Registration.allDepartment}`);
    }
    getProductEquipmentServices(): Observable<any> {
      return this.http.get(`${environment.apiUrl}${constant.Registration.allProductEquipmentServices}`);
    }
    getNationalities(): Observable<any> {
      return this.http.get(`${environment.apiUrl}${constant.generalResource.nationalities}`);
    }
    getStates(): Observable<any> {
      return this.http.get(`${environment.apiUrl}${constant.generalResource.states}`);
    }
    getCities(): Observable<any> {
      return this.http.get(`${environment.apiUrl}${constant.generalResource.cities}`);
    }
    getPositions(): Observable<any> {
      return this.http.get(`${environment.apiUrl}${constant.generalResource.positions}`);
    }
    getVenPositions(): Observable<any> {
      const headers = new HttpHeaders({
        "Content-type": "Application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":"*",
        "Accept": "application/json"
        })
      return this.http.get(`${environment.apiUrl}${constant.generalResource.venPosition}`);
    }
    getCertOrg(): Observable<any> {
      return this.http.get(`${environment.apiUrl}${constant.generalResource.certificationOrg}`);
    }

    save( body:any ) : Observable<any>{
    return  this.http.post(`${this.apiBaseUrl}${constant.Registration.save}`, body).pipe(catchError(this.handleError))
    }
  
   
 handleError(error: HttpErrorResponse){
  console.log("lalalalalalalala", error.error);
  return throwError(error);
 }
  }
