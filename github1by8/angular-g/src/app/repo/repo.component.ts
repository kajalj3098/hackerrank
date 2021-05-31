import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../_services/content.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css']
})
export class RepoComponent implements OnInit {

  /**
   * Properties Start
   */
  userName: string; //hold username coming as param

  userRepos: GitData.IUserRepo[] = [];// to hold repos array of the user;
  isLoading = false; //when hitting api to show loader
  readonly pageSize = 10; //per page no of records
  pageNo = 1; //page no increment on load more click


  /**
   * End of Properties
   */
  constructor(private _activatedRoute: ActivatedRoute, private _userService: ContentService, private _toastr: ToastrService) { }

  ngOnInit() {
    this.userName = this._activatedRoute.snapshot.params.userName;
    this.getUserRepo();
  }

  //to get all the user repo
  getUserRepo = () => {
    this.isLoading = true;
    this._userService.get(`users/${this.userName}/repos?page=${this.pageNo}&per_page=${this.pageSize}`).subscribe((repos) => {
      console.log({ repos });

      for (let repo of repos) {
        this.userRepos.push(repo);
      }
      if(repos.length < this.pageSize){
        this._toastr.info("No more data available");
      }
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
      this._toastr.error(err.message || err);
    })
  }

  //next {{pageSize}} of records

  nextPage = () => {
    this.pageNo++;
    this.getUserRepo();
  }
}
