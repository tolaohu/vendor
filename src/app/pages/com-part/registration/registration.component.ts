import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbSelectComponent, NbStepperComponent, NbToastrService } from '@nebular/theme';
import { RegistrationService } from './registration.service'

@Component({
  selector: 'ngx-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers:[RegistrationService]
})
export class RegistrationComponent implements OnInit, AfterViewInit{
  @ViewChild('sele') sele: NbSelectComponent;
  @ViewChild('stepper1') stepper1: NbStepperComponent;
  
 part = 1;
 bt1 = true;
 bt2 = false;
 bt3 = false;
 v2 = false;
 v3 = false;
 v4 = false;
 cart : any = '';
 processing = false;

 //drop down variables
 allContactPersons:any[];
 thirdPartyReference:any[];
 productServiceCategory:any[];
 categorySpecialization:any[];
 DPRCategory:any[];
 productCategory:any[];
 serviceCategory:any[];
 subCategory:any[];
 suppliers:any[];
 services:any[];
 products:any[];
 departments:any[];
 productEquipmentServices:any[];
 nationalities:any[];
 states:any[];
 cities:any[];
 positions:any[];
 venPositions:any[];
 certificateOrganizations:any[];


  vendorForm: FormGroup;
  supplierForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private service: RegistrationService,
    private toastrService: NbToastrService,) {
      this.vendorForm = this.buildForm();
      this.supplierForm = this.buildSupplierCategoryForm();
     }


     ngAfterViewInit(){
       console.log(this.stepper1)
     }

     onNext1(){
       if(this.vendorForm.get('formIdentification').invalid){
         const formIdName = this.vendorForm.get('formIdentification.name');
         const formIdphoneNumber = this.vendorForm.get('formIdentification.phoneNumber');
         const formIdemailAddress = this.vendorForm.get('formIdentification.emailAddress');
         const formIdvenPosID = this.vendorForm.get('formIdentification.venPosID');
         const formIdworkPhoneNumber = this.vendorForm.get('formIdentification.workPhoneNumber');
         const formIddate = this.vendorForm.get('formIdentification.date');
         if(formIdName.hasError('required')){
          this.toastrService.info(`Name is a required field`, ``)
         }
         else if(formIdvenPosID.hasError('required')){
          this.toastrService.info(`Position is a required field`, ``)
         }
         else if(formIddate.hasError('required')){
          this.toastrService.info(`Date is a required field`, ``)
         }
         else if(formIdphoneNumber.invalid){
         if(formIdphoneNumber.hasError('required')){
          this.toastrService.info(`Phone number is a required field`, ``)
         }
         else if(formIdphoneNumber.hasError('pattern')){
          this.toastrService.info(`Please enter a valid Phone number`, ``)
         }
        }
        else if(formIdworkPhoneNumber.invalid){
        if(formIdworkPhoneNumber.hasError('required')){
         this.toastrService.info(`Work Phone number is a required field`, ``)
        }
        else if(formIdworkPhoneNumber.hasError('pattern')){
         this.toastrService.info(`Please enter a valid Work Phone number`, ``)
        }
       }
       else if(formIdemailAddress.invalid){
       if(formIdemailAddress.hasError('required')){
        this.toastrService.info(`Email is a required field`, ``)
       }
       else if(formIdemailAddress.hasError('pattern')){
        this.toastrService.info(`Please enter a valid Email`, ``)
       }
      }
        // this.toastrService.info(`Please ensure you fill all the fields Before continuing`, ``)
       }
       else{
        this.stepper1.next();
       }
     }
     onNext2(){
      if((this.vendorForm.get('supplierIdentification').invalid) || (this.subsidiaryCompanies.invalid)
       || (this.contactPersons.invalid) || (this.thirdPartyReferences.invalid)){
       this.toastrService.info(`Please ensure you fill all the fields Before continuing`, ``)
      }
      else{
       this.stepper1.next();
      }
    }
    onNext3(){
      if((this.vendorForm.get('supplierProfile').invalid) || (this.supplierOwnerships.invalid)
      || (this.directServiceScopes.invalid) || (this.typicalSubcontractedScopes.invalid)
      || (this.constructionYardMfgs.invalid) || (this.spDirectServiceScopes.invalid)
      || (this.officeServiceCLs.invalid) || (this.subcontractedServices.invalid)
      || (this.subcontractorDetails.invalid) || (this.foriengnCompanies.invalid)){
       this.toastrService.info(`Please ensure you fill all the fields Before continuing`, ``)
      }
      else{
        this.part = 2
      }
    }

     op(val){
       if(val == 1){
         this.bt1 = false;
         this.v2 = true;
         this.bt2 = true;
       }
       else if(val == 2){
         this.bt2=false;
         this.v3=true;
         this.bt3 = true;
       }
       else if(val == 3){
         this.bt3 =false;
         this.v4 = true;
       }

     }

     getAllList(){
       this.service.getContactPersons().subscribe(res=>{
        //  console.log('cp',res);
         this.allContactPersons = res.data
       });
       this.service.getThirdPartyReference().subscribe(res=>{
        //  console.log('tpr',res);
         this.thirdPartyReference = res.data
       });
       this.service.getProductServiceCategory().subscribe(res=>{
        //  console.log('psc',res);
         this.productServiceCategory = res.data;
       });
       this.service.getCategorySpecialization().subscribe(res=>{
        //  console.log('cs',res);
         this.categorySpecialization = res.data;
       });
       this.service.getDPRCategory().subscribe(res=>{
         console.log('dpr',res);
         this.DPRCategory = res.data;
       });
       this.service.getProductCategory().subscribe(res=>{
        //  console.log('pc',res);
         this.productCategory = res.data;
       });
       this.service.getServiceCategory().subscribe(res=>{
        //  console.log('sc',res);
         this.serviceCategory = res.data;
       });
       this.service.getSubCategory().subscribe(res=>{
         console.log('sb',res);
         this.subCategory = res.data;
       });
       this.service.getSuppliers().subscribe(res=>{
         console.log('sus',res);
         this.suppliers = res.data;
       });
       this.service.getServices().subscribe(res=>{
        //  console.log('ses',res);
         this.services = res.data
       });
       this.service.getProducts().subscribe(res=>{
        //  console.log('pts',res);
         this.products = res.data;
       });
       this.service.getDepartments().subscribe(res=>{
        //  console.log('dts',res);
         this.departments = res.data;
       });
       this.service.getProductEquipmentServices().subscribe(res=>{
        //  console.log('pes',res);
         this.productEquipmentServices = res.data;
       });
       this.service.getNationalities().subscribe(res=>{
        //  console.log('nt',res);
         this.nationalities = res.data;
       });
       this.service.getStates().subscribe(res=>{
         console.log('sts',res);
         this.states = res.data;
       });
       this.service.getCities().subscribe(res=>{
         console.log('cty',res);
         this.cities = res.data;
       });
       this.service.getPositions().subscribe(res=>{
         console.log('pos',res);
         this.positions = res.data;
       });
       this.service.getVenPositions().subscribe(res=>{
         console.log('venpos',res);
         this.venPositions = res.data;
       });
       this.service.getCertOrg().subscribe(res=>{
         console.log('all org',res);
         this.certificateOrganizations = res.data;
       });
     }

    buildForm() :FormGroup {
      return this.fb.group({
        formIdentification:this.fb.group({
          name:[null, Validators.required],
          position:['N/A'],
          phoneNumber:[null, [Validators.required, Validators.pattern('[0-9]{11}')]],
          workPhoneNumber:[null, [Validators.required, Validators.pattern('[0-9]{11}')]],
          emailAddress:[null, [Validators.required, Validators.email]],
          date:[null, Validators.required],
          venPosID:[null, Validators.required],
        }),
        thirdPartyReferences:this.fb.array([this.buildThirdPartyRefForm()]),
        contactPersons:this.fb.array([this.buildContactPersonsForm()]),
        supplierIdentification:this.fb.group({ 
          companyName:[null, Validators.required],
          headOfficeAddress:[null, Validators.required],
          companyRegNumber:[null, Validators.required],
          taxClearanceCertificate:[null],
          bankReference:[null],
          thirdPartyReference:[null],
          companyProfile:[null, Validators.required],
          companyWebsiteUrl:[null,[Validators.required, Validators.pattern('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$')]],
          corporateAffairsCommisionNo:[null, Validators.required],
          supplierIsForeign:[false],
          createdDate:[null, Validators.required],
        }),
        subsidiaryCompanies:this.fb.array([this.buildSubsidaryCompanyForm()]),
        supplierProfile:this.fb.group({
          natureOfBusiness:[null, Validators.required],
          organizationCharts:[null, Validators.required],
          missionVisionStatement:[null,Validators.required],
          codeofConduct:[null],
        }),
        businessExperiences:this.fb.array([this.buildBusinessExpForm()]),
        financialAudit:this.fb.group({
          annualReport:[null],
          taxIdentificationNo:[null],
          auditorName:[null],
          auditorAddress:[null],
          contactNumber:[null, Validators.pattern('[0-9]{11}')],
          isListed:[false],
          stockMarketInfo:[null],
        }),
        qualityManagement:this.fb.group({
          qualityPolicy:[null],
          productQualMgt:[null],
          qualityMgt:[null],
          qualManagerName:[null],
          qualManagerEmail:[null,Validators.email],
          phoneNumber:[null, Validators.pattern('[0-9]{11}')],
          workPhoneNumber:[null, Validators.pattern('[0-9]{11}')],
          fax:[null],
        }),
        healthSafetyEnvironment:this.fb.group({
          hsepolicy:[null],
          thirdPartyAudit:[null],
          hseManagerName:[null],
          hseManagerEmail:[null, Validators.email],
          phoneNumber:[null, Validators.pattern('[0-9]{11}')],
          workPhoneNumber:[null, Validators.pattern('[0-9]{11}')],
          fax:[null],
          hseCompanyKpi:[null],
          hseYearN1results:[null],
          staffTraining:[null],
        }),
        corpSocialResponsibility:this.fb.group({
          srethHumanLaborLaws:[null],
          thirdPartySocAudit:[null],
          fraudMalpracticePolicy:[null]
        }),
        staffStrengthCom:this.fb.group({
          staffPolicy:[null],
          audit3rdParty:[null]
        }),
        financialStatement:this.fb.array([this.buildFinStatementForm()]),
        directServiceScopes:this.fb.array([this.buildDirectServiceScope()]),
        supplierOwnerships:this.fb.array([this.buildsupplierOwnershipsForm()]), // for part1 step 3
        typicalSubcontractedScopes:this.fb.array([this.buildtypicalSubcontractedScopesForm()]), // for part1 step 3
        constructionYardMfgs:this.fb.array([this.buildconstructionYardMfgsForm()]), // for part1 step 3
        spDirectServiceScopes:this.fb.array([this.buildspDirectServiceScopesForm()]), // for part1 step 3
        officeServiceCLs:this.fb.array([this.buildofficeServiceCLsForm()]),
        subcontractedServices:this.fb.array([this.buildsubContractedServiceForm()]),
        subcontractorDetails:this.fb.array([this.buildsubcontractorDetailsForm()]),
        foriengnCompanies:this.fb.array([this.buildForiegnForm()]),
        mainCustomers:this.fb.array([this.buildmainCustomersForm()]),
        noOfEmployees:this.fb.array([this.buildnoOfEmployeesForm()]),
        qualityCertifications:this.fb.array([this.buildqualityCertificationsForm()]),
        hseCertifications:this.fb.array([this.buildhseCertificationsForm()]),
        corporativeDistinctives:this.fb.array([this.buildcorporativeDistinctivesorm()]),
        supplierCategorizations:this.fb.array([])
        // knowledgeDgsSystems:this.fb.array([this.buildknowledgeDgsSystemsForm()]),
      })
    }

    buildSupplierCategoryForm():FormGroup{
      return this.fb.group({
      // supplierId:[null, Validators.required],
      productServiceCategoryId:[null, Validators.required],
      catSpecId:[null, Validators.required],
      dprcatId:[null, Validators.required],
      productCategoryId:[0],
      serviceCategoryId:[0],
      productId:[0],
      serviceId:[0],
      })
    }

    buildFinStatementForm():FormGroup{
      return this.fb.group({
        finStatement:[null],
        financialStatementYear:[null],
      })
    }

    buildBusinessExpForm():FormGroup{
      return this.fb.group({
        financialTurnover:[0, [Validators.min(10000000), Validators.required]],
        registrationDate:[null],
        companyWorkedWith:[null],
        mobilizationDate:[null],
        demobilizationDate:[null],
        transactionReference:[null],
        scopeCovered:[null],
        hasContinuityPolicy:[false],
        continuityPolicy:[null],
      })
    }

    buildSubsidaryCompanyForm():FormGroup{
      return this.fb.group({
        subsidiaryCompanyName:[null]
      })
    }

    buildContactPersonsForm():FormGroup{
      return this.fb.group({ 
        contactPersonName:[null],
        position:['N/A'],
        phoneNumber:[null,Validators.pattern('[0-9]{11}')],
        workPhoneNumber:[null,Validators.pattern('[0-9]{11}')],
        emailAddress:[null, Validators.email],
        venPosID:[null],
      })
    }
    buildThirdPartyRefForm():FormGroup{
      return this.fb.group({
        tprName:[null],
        tprOrganization:[null],
        tprAddress:[null],
        tprPhoneNumber:[null, Validators.pattern('[0-9]{11}')],
        tprWorkPhoneNumber:[null, Validators.pattern('[0-9]{11}')],
        tprEmailAddress:[null, Validators.email],
      })
    }

    buildDirectServiceScope(): FormGroup{
      return this.fb.group({
        materialsName:[null],
        subCategoryId:[null]
      })
    }

    buildForiegnForm():FormGroup{
    return  this.fb.group({
        companyName:[null],
        productSupplied:[null],
        status:[null],
        others:[null],
      })
    }

    buildsupplierOwnershipsForm(): FormGroup{
      return this.fb.group({
        mainShareholder:[null, Validators.required],
        shareholding:[null, Validators.required],
        countryId:[null,Validators.required],
      })
    }

    buildtypicalSubcontractedScopesForm(): FormGroup{
      return this.fb.group({
        subConName:[null,],
        subConAddress:[null],
        countryId:[null],
        productId:[null],
        isLocal:[false]
      })
    }
    buildconstructionYardMfgsForm(): FormGroup{
      return this.fb.group({
        location:[null],
        cityId:[null],
        plantsEquipmentType:[null],
        plantsEquipmentNumber:[null],
        utilization:[null],
        factoryArea:[null],
      })
    }
    buildspDirectServiceScopesForm(): FormGroup{
      return this.fb.group({
        spServices:[null,],
        description:[null],
      })
    }
    buildofficeServiceCLsForm(): FormGroup{
      return this.fb.group({
        spServices:[null],
        location:[null],
        countryId:[null],
        cityId:[null]
      })
    }
    buildsubContractedServiceForm(): FormGroup{
      return this.fb.group({
        percentageOutsourced:[null],
        serviceId:[null],
      })
    }
    buildsubcontractorDetailsForm(): FormGroup{
      return this.fb.group({
        subConName:[null],
        subConAddress:[null],
        isLocal:[false],
        countryId:[null],
      })
    }
    buildknowledgeDgsSystemsForm(): FormGroup{
      return this.fb.group({
        contractNo:[null],
        startDate:[null],
        dgsref:[null],
        productId:[null],
        serviceId:[null],
        equipmentId:[null],
        provisionType:[null]
      })
    }
    buildmainCustomersForm(): FormGroup{
      return this.fb.group({
        customerName:[null],
        countryId:[null],
        productId:[0],
        serviceId:[0],
        value:[0],
        valueYear:[null],
        provisionType:[0, [Validators.max(2)]],
      })
    }
    buildnoOfEmployeesForm(): FormGroup{
      return this.fb.group({
        departmentId:[null],
        noOfEmployees:[null],
        noOfContractEmp:[null],
        noOfExpatriates:[null],
        // staffStrCompId:[null],
      })
    }
    buildqualityCertificationsForm(): FormGroup{
      return this.fb.group({
        details:[null],
        nameofCertificate:[null],
        certOrgId:[null],
        validityDate:[null],
        certificateCopy:[null],
      })
    }
    buildhseCertificationsForm(): FormGroup{
      return this.fb.group({
        nameofCertificate:[null],
        certOrgId:[null],
        validityDate:[null],
        certificateCopy:[null]
      })
    }
    buildcorporativeDistinctivesorm(): FormGroup{
      return this.fb.group({
        details:[null]
      })
    }



    // get for the arrays

    get supplierOwnerships(){
      return this.vendorForm.get('supplierOwnerships') as FormArray;
    }

    get typicalSubcontractedScopes(){
      return this.vendorForm.get('typicalSubcontractedScopes') as FormArray;
    }

    get constructionYardMfgs(){
      return this.vendorForm.get('constructionYardMfgs') as FormArray;
    }

    get spDirectServiceScopes(){
      return this.vendorForm.get('spDirectServiceScopes') as FormArray;
    }

    get officeServiceCLs(){
      return this.vendorForm.get('officeServiceCLs') as FormArray;
    }

    get subcontractedServices(){
      return this.vendorForm.get('subcontractedServices') as FormArray;
    }

    get subcontractorDetails(){
      return this.vendorForm.get('subcontractorDetails') as FormArray;
    }

    get foriengnCompanies(){
      return this.vendorForm.get('foriengnCompanies') as FormArray;
    }

    get directServiceScopes(){
      return this.vendorForm.get('directServiceScopes') as FormArray;
    }

    get thirdPartyReferences(){
      return this.vendorForm.get('thirdPartyReferences') as FormArray;
    }

    get contactPersons(){
      return this.vendorForm.get('contactPersons') as FormArray;
    }

    get subsidiaryCompanies(){
      return this.vendorForm.get('subsidiaryCompanies') as FormArray;
    }

    get businessExperiences(){
      return this.vendorForm.get('businessExperiences') as FormArray;
    }

    get noOfEmployees(){
      return this.vendorForm.get('noOfEmployees') as FormArray;
    }

    get financialStatement(){
      return this.vendorForm.get('financialStatement') as FormArray;
    }

    get qualityCertifications(){
      return this.vendorForm.get('qualityCertifications') as FormArray;
    }

    get hseCertifications(){
      return this.vendorForm.get('hseCertifications') as FormArray;
    }
    get corporativeDistinctives(){
      return this.vendorForm.get('corporativeDistinctives') as FormArray;
    }
    
    get supplierCategorizations(){
      return this.vendorForm.get('supplierCategorizations') as FormArray;
    }

    get mainCustomers(){
      return this.vendorForm.get('mainCustomers') as FormArray;
    }



    // Add method  

    addOwnership(){
    this.supplierOwnerships.push(this.buildsupplierOwnershipsForm())
    }

    addTypicalSubContracted(){
    this.typicalSubcontractedScopes.push(this.buildtypicalSubcontractedScopesForm())
    }
    
    addConstructionYard(){
      this.constructionYardMfgs.push(this.buildconstructionYardMfgsForm())
      }
      
    addspDirectService(){
      this.spDirectServiceScopes.push(this.buildspDirectServiceScopesForm())
      }
    
    addofficeLocation(){
      this.officeServiceCLs.push(this.buildofficeServiceCLsForm())
      }

    addsubContratedService(){
      this.subcontractedServices.push(this.buildsubContractedServiceForm())
    }
    
    addsubContratedDetails(){
      this.subcontractorDetails.push(this.buildsubcontractorDetailsForm())
    }

    addForiegnCompany(){
      this.foriengnCompanies.push(this.buildForiegnForm())
    }

    addDirectServiceScope(){
      this.directServiceScopes.push(this.buildDirectServiceScope())
    }
    addThirdPartyRef(){
      this.thirdPartyReferences.push(this.buildThirdPartyRefForm())
    }
    addContactPersons(){
      this.contactPersons.push(this.buildContactPersonsForm())
    }
    addSubsidiaryCompany(){
      this.subsidiaryCompanies.push(this.buildSubsidaryCompanyForm())
    }
    addBusinessExp(){
      this.businessExperiences.push(this.buildBusinessExpForm())
    }
    addNoEmployee(){
      this.noOfEmployees.push(this.buildnoOfEmployeesForm())
    }
    
    addFinStatement(){
      this.financialStatement.push(this.buildFinStatementForm())
    }
    addQualityCert(){
      this.qualityCertifications.push(this.buildqualityCertificationsForm())
    }
    
    addHseCert(){
      this.hseCertifications.push(this.buildhseCertificationsForm())
    }
    addCorpDistintives(){
      this.corporativeDistinctives.push(this.buildcorporativeDistinctivesorm())
    }
    addMainCustomer(){
      this.mainCustomers.push(this.buildmainCustomersForm())
    }

    addsupplierCategorizations(value){
      console.log('va', value);
      console.log('su', this.supplierForm.controls);
      this.supplierCategorizations.push(this.fb.group(value));
      this.supplierForm = this.buildSupplierCategoryForm();
      this.cart = '';
      console.log('sp va2',this.supplierCategorizations.value)

    }

    


    ///remove methods
    removeOwnership(index){
      this.supplierOwnerships.removeAt(index)
      }
  
      removeTypicalSubContracted(index){
      this.typicalSubcontractedScopes.removeAt(index)
      }
      
      removeConstructionYard(index){
        this.constructionYardMfgs.removeAt(index)
        }
        
      removespDirectService(index){
        this.spDirectServiceScopes.removeAt(index)
        }
      
      removeofficeLocation(index){
        this.officeServiceCLs.removeAt(index)   
          }
  
      removesubContratedService(index){
        this.subcontractedServices.removeAt(index)
      }
      
      removesubContratedDetails(index){
        this.subcontractorDetails.removeAt(index)
      }
  
      removeForiegnCompany(index){
        this.foriengnCompanies.removeAt(index)
      }
      removeDirectServiceScope(index){
        this.directServiceScopes.removeAt(index)   
      }
      removeThirdPartyRef(index){
        this.thirdPartyReferences.removeAt(index) 
       }
      removeContactPersons(index){
        this.contactPersons.removeAt(index)  
       }
      removeSubsidiaryCompany(index){
        this.subsidiaryCompanies.removeAt(index)  
         }
      removeBusinessExp(index){
        this.businessExperiences.removeAt(index)
      }
      removeNoEmployee(index){
        this.noOfEmployees.removeAt(index) 
       }
      
      removeFinStatement(index){
        this.financialStatement.removeAt(index)
       }
      removeQualityCert(index){
        this.qualityCertifications.removeAt(index)
      }
      
      removeHseCert(index){
        this.hseCertifications.removeAt(index)    
        }
      removeCorpDistintives(index){
        this.corporativeDistinctives.removeAt(index)
      }
      removeMainCustomer(index){
        this.mainCustomers.removeAt(index) 
       }

       removeSupplierCategorizations(index){
        console.log('va', index, this.supplierCategorizations);
        this.supplierCategorizations.removeAt(index);
        console.log('sp va2',this.supplierCategorizations.value)
  
      }
  

    //get text from

    getSupplierText(supplierId): string{
      if(supplierId){
      const supplierText = this.suppliers.find(element => element.supplierId == supplierId);
      return supplierText.companyName
    }
    }
    getProductText(productId): string{
      if(productId){
      const productText = this.products.find(element => element.productId == productId);
      return productText.productName
      }
    }
    getDprCatText(dprcatId): string{
     if(dprcatId){
      const DPrText = this.DPRCategory.find(element => element.dprcatId == dprcatId);
      return DPrText.dprcatName
     }
    }
    getServiceText(serviceId): string{
      if(serviceId){
        const serviceText = this.services.find(element => element.serviceId == serviceId);
        return serviceText.serviceName}
    }

  ngOnInit(): void {
    this.getAllList();
  }

 onSubmit(){
  // console.log('val',JSON.stringify(this.vendorForm.value))
  console.log(this.vendorForm)
  if(this.vendorForm.valid){
    this.processing = true;
  this.service.save(this.vendorForm.value).subscribe(res=>{
  if(res.success){
    this.toastrService.show(`Saved successfuly`, `Success`);
    this.processing = false;
    // this.vendorForm = this.buildForm();
    this.vendorForm.reset();
    this.router.navigate([`/pages/dashboard`])
    this.part = 1;
  }
  else if(res.success == false){
    console.log(res)
    this.toastrService.danger(res.message , `Error Submission Failed`);
    this.processing = false;
  }
})
}
 }

 onCompanyProfile(val: any[]){
   console.log('cm p', val);
   this.service.comprName = val[1];
   this.vendorForm.controls['supplierIdentification'].patchValue({
    companyProfile:val[0]
   })
 }

 onTaxClearCert(val){
   console.log('tx ct', val);
   this.service.taxclrName = val[1];
   this.vendorForm.controls['supplierIdentification'].patchValue({
    taxClearanceCertificate:val[0]
   })
 }

 onBankRefLetter(val){
   console.log('bk ref', val);
   this.service.banRefName = val[1];
   this.vendorForm.controls['supplierIdentification'].patchValue({
    bankReference:val[0]
   })
 }

 onThirdPartyRef(val){
   console.log('thd pt', val) ;
   this.service.thrdRefName = val[1];
   this.vendorForm.controls['supplierIdentification'].patchValue({
    thirdPartyReference:val[0]
   });
  //  console.log('sup va',this.vendorForm.controls['supplierIdentification'].value)
 }

 onCodeConduct(val){
   console.log('cod', val)
   this.service.codConName = val[1];
   this.vendorForm.controls['supplierProfile'].patchValue({
    codeofConduct:val[0]
   });
 }

 onOrganChart(val){
   console.log('org ch',val)
   this.service.orgChtName = val[1];
   this.vendorForm.controls['supplierProfile'].patchValue({
    organizationCharts:val[0]
   });
 }

 onMissionVision(val){
   console.log('ms vs', val);
   this.service.misVisStaName = val[1];
   this.vendorForm.controls['supplierProfile'].patchValue({
    missionVisionStatement:val[0]
   });
   
   console.log('su va', this.vendorForm.controls['supplierProfile'].value);
 }

 onBusinessPolicy(val:any[]){
   console.log('poli', val)
   console.log('a1', this.businessExperiences.value[0])
   console.log('ct', this.businessExperiences.value[0].continuityPolicy)
   let ptv = this.businessExperiences.value;
   this.service.busConPol.push(val[1])
    ptv[this.businessExperiences.length - 1].continuityPolicy = val[0]
    this.businessExperiences.patchValue(ptv);
   console.log('wa2', this.businessExperiences.value)
  
 }

 onTransactionRef(val){
   console.log('trs ref', val)
   let ptv = this.businessExperiences.value;
   this.service.transRef.push(val[1]);
    ptv[this.businessExperiences.length - 1].transactionReference = val[0]
    this.businessExperiences.patchValue(ptv);
   console.log('wa2', this.businessExperiences.value)
 }

 onQualityPolicy(val){
   console.log('qp', val)
   this.service.quaPolName = val[1];
   this.vendorForm.controls['qualityManagement'].patchValue({
    qualityPolicy:val[0]
   });
 }

 onQualityManage(val){
   console.log('qm', val)
   this.service.quaManName = val[1];
   this.vendorForm.controls['qualityManagement'].patchValue({
    qualityMgt:val[0]
   });
 }
 onProductQualityManage(val){
   console.log('pqm', val);
   this.service.prodQuaManName = val[1];
   this.vendorForm.controls['qualityManagement'].patchValue({
    productQualMgt:val[0]
   });
  //  console.log('qm va', this.vendorForm.controls['qualityManagement'].value);
 }
 onCertificateCopy(val){
   console.log('cer cp', val)
   let ptv = this.qualityCertifications.value;
   this.service.quaCertCopy.push(val[1])
    ptv[this.qualityCertifications.length - 1].certificateCopy = val[0]
    this.qualityCertifications.patchValue(ptv);
   console.log('wa2', this.qualityCertifications.value)
 }

 onHsePolicy(val){
   console.log('hse py', val);
   this.service.hsePolName = val[1];
   this.vendorForm.controls['healthSafetyEnvironment'].patchValue({
    hsepolicy:val[0]
   });
 }

 onHseComRes(val){
   console.log('hse cm re', val);
   this.service.hseComResName = val[1];
   this.vendorForm.controls['healthSafetyEnvironment'].patchValue({
    hseYearN1results:val[0]
   });
 }

 onHseThirdPartyAudit(val){
   console.log('hse td pt ad', val)
   this.service.hseTrdPtyName = val[1];
   this.vendorForm.controls['healthSafetyEnvironment'].patchValue({
    thirdPartyAudit:val[0]
   });
 }

 onHseComKpi(val){
   console.log('hse com kpi', val);
   this.service.hseComKpiName = val[1];
   this.vendorForm.controls['healthSafetyEnvironment'].patchValue({
    hseCompanyKpi:val[0]
   });
 }
 onHseStaffTraining(val){
  console.log('hse st tr', val);
  this.service.hseStfTrName = val[1];
  this.vendorForm.controls['healthSafetyEnvironment'].patchValue({
    staffTraining:val[0]
  });
  console.log('hse va', this.vendorForm.controls['healthSafetyEnvironment'].value);
 }
 onHseCertCopy(val){
   console.log('hse cet cp', val)
   let ptv = this.hseCertifications.value;
   this.service.hseCertCopy.push(val[1])
    ptv[this.hseCertifications.length - 1].certificateCopy = val[0]
    this.hseCertifications.patchValue(ptv);
   console.log('wa2', this.hseCertifications.value)
 }

 onMalPractice(val){
   console.log('ma py', val)
   this.service.frdMalPyName = val[1];
   this.vendorForm.controls['corpSocialResponsibility'].patchValue({
    fraudMalpracticePolicy:val[0]
   });
 }

 onThirdPartySocAud(val){
   console.log('td pt ad', val);
   this.service.trdPtySocAudName = val[1];
   this.vendorForm.controls['corpSocialResponsibility'].patchValue({
    thirdPartySocAudit:val[0]
   });
 }

 onSocResEthHumLabLaw(val){
   console.log('res law', val)
   this.service.socResHumEthLawName = val[1];
   this.vendorForm.controls['corpSocialResponsibility'].patchValue({
    srethHumanLaborLaws:val[0]
   });
   console.log('res law', this.vendorForm.controls['corpSocialResponsibility'].value)
 }

 onStaffTrainPolicy(val){
   console.log('stff tra py', val);
   this.service.stfTrPyName = val[1];
   this.vendorForm.controls['staffStrengthCom'].patchValue({
    staffPolicy:val[0]
   });
 }
 onAuditThirdParty(val){
   console.log('ad thd pt', val)
   this.service.audTrdPtName = val[1];
   this.vendorForm.controls['staffStrengthCom'].patchValue({
    audit3rdParty:val[0]
   });
  //  console.log('asp va', this.vendorForm.controls['staffStrengthCom'].value)
 }

 onFiniancialStatement(val){
   console.log('fin st ', val);
   let ptv = this.financialStatement.value;
   this.service.finStaYr.push(val[1])
    ptv[this.financialStatement.length - 1].finStatement = val[0]
    this.financialStatement.patchValue(ptv);
   console.log('fin', this.financialStatement.value)
 }

 onStockInfo(val){
   console.log('st in', val)
   this.service.stkMkInfoName = val[1];
   this.vendorForm.controls['financialAudit'].patchValue({
    stockMarketInfo:val[0]
   });
   console.log('fi ad va', this.vendorForm.controls['financialAudit'].value);
 }
 onAnnualReport(val){
  console.log('An re in', val);
  this.service.annRepName = val[1];
  this.vendorForm.controls['financialAudit'].patchValue({
    annualReport:val[0]
  });
}
}
