import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from '../_services/content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  
  /**
   * Properties Start
   */
  userArr: GitData.IUser[] = [];//array to hold all users
  isLoading = false; //to show loader
  pageSize = 10; //to get per page size of the record
  isSingleUserSearch = false; // setting true when user is searching by the username

  
  /**
   * End of Props
   */
  constructor(private _toastr: ToastrService, private _userService: ContentService) { }

  ngOnInit() {
    this.getAllData(0);
  }

  //get all the users
  getAllData = (since: number) => {
    this.isSingleUserSearch = false;

    this.isLoading = true;

    this._userService.get(`users?since=${since}&per_page=${this.pageSize}`).subscribe((users) => {

      if (users && users.length > 0) {
        for (let user of users) {
          this.userArr.push(user);
        }
      } else {
        this._toastr.info('No more users found')
      }
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
      this._toastr.error(err.message || err);
    })
  }

  //on click of load more button
  nextPage = () => {
    this.getAllData(this.userArr[this.userArr.length - 1].id);
  }

  //on search 
  search = (event: KeyboardEvent, searchText: string) => {
    console.log(searchText);

    if (event.keyCode === 13 && searchText) {

      this.isSingleUserSearch = true;
      this.isLoading = true;
      this.userArr = [];
      this._userService.get(`users/${searchText}`).subscribe((user: GitData.IUser) => {
        console.log({ user });

        this.userArr.push(user);
        this.isLoading = false;
      }, (err) => {
        this._toastr.error(err.message || err);
        this.isLoading = false;
      })
    } else if (event.keyCode === 13) {
      this.userArr = [];
      this.getAllData(0);
    }
  }
}
