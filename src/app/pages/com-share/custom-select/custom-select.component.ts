import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NbSelectComponent } from '@nebular/theme';
import { environment } from 'environments/environment';

@Component({
  selector: 'ngx-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent implements OnInit, AfterViewInit {
  @ViewChild('sele') sele: NbSelectComponent;
  @ViewChild('search') search : ElementRef;
  @ViewChildren('optioncon, optionlist') divRef : QueryList<ElementRef>;
  data:any[];
  refactData:any[];
  
   selected = document.querySelector(".selected");
   optionsContainer = document.querySelector(".options-container");
   searchBox = document.querySelector(".search-box input");
  
   optionsList = document.querySelectorAll(".option");

  constructor(private http : HttpClient) { 
    
  }
  getContactPersons(){
   this.http.get<any>(`${environment.apiUrl}/api/v1/miscellaneous/GetAllContactPersons`).subscribe(res=>{
    this.data = res.data;
    this.refactData = res.data;
   });
  }

  ngOnInit(): void {
    this.getContactPersons();
  }

  ngAfterViewInit(){
    console.log(this.sele.isOpen);
    console.log(this.sele)
  }
  onSelect(){
    
    console.log(this.search);
    console.log(this.divRef);
    this.divRef.first.nativeElement.classList.toggle("active");
    this.search.nativeElement.value = '';

    if (this.divRef.first.nativeElement.classList.contains("active")) {
      // this.searchBox.focus();
      this.search.nativeElement.focus();
      // console.log(this.search)
      // this.search.nativeElement.focus;
    }
  }

// selected.addEventListener("click", () => {
//   optionsContainer.classList.toggle("active");

//   searchBox.value = "";
//   filterList("");

//   if (optionsContainer.classList.contains("active")) {
//     searchBox.focus();
//   }
// });

// optionsList.forEach(o => {
//   o.addEventListener("click", () => {
//     selected.innerHTML = o.querySelector("label").innerHTML;
//     optionsContainer.classList.remove("active");
//   });
// });

// searchBox.addEventListener("keyup", function(e) {
//   filterList(e.target.value);
// });

// const filterList = searchTerm => {
//   searchTerm = searchTerm.toLowerCase();
//   optionsList.forEach(option => {
//     let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
//     if (label.indexOf(searchTerm) != -1) {
//       option.style.display = "block";
//     } else {
//       option.style.display = "none";
//     }
//   });
// };

filterList= searchTerm => {
 const optionsList = document.querySelectorAll(".option");
  searchTerm = searchTerm.toLowerCase();
  optionsList.forEach(option => {
    console.log('op', option.className)
    let label = option.firstElementChild.nextElementSibling.innerHTML.toLowerCase();
    if (label.indexOf(searchTerm) != -1) {
      // option.style.display = "block";
      this.data = this.data.filter(item => item.contactPersonName.toLowerCase().includes(searchTerm));
      console.log(this.data)
    } else {
      // option.style.display = "none";
    }
  });
};

onKeyUp(event){
  this.data = this.refactData;
  console.log(event.target.value);
  this.filterList(event.target.value);
}
}
