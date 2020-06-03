import { isUndefined } from 'util';
import { isEmpty } from 'rxjs/operators';
import { UserService, ProgramsService } from '@sunbird/core';
import { ResourceService, ToasterService  } from '@sunbird/shared';
import { Component, OnInit, Input, ViewChild, OnDestroy, Output, EventEmitter, } from '@angular/core';
import * as _ from 'lodash-es';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contributor-profile-popup',
  templateUrl: './contributor-profile-popup.component.html',
  styleUrls: ['./contributor-profile-popup.component.scss']
})
export class ContributorProfilePopupComponent implements OnInit, OnDestroy {

  @Output() close = new EventEmitter<any>();
  @ViewChild('modal') private modal;
  @Input() userId?: string;
  @Input() orgId?: string;
  @Input() userDetails?: any;
  @Input() showProfile: boolean;
  @Input() showOrgData?: boolean;
  contributor: any;
  fullName: string;
  isOrg: boolean;
  showLoader = true;
  isSourcing = false;

  constructor(
    public userService: UserService,
    public toasterService: ToasterService,
    public programsService: ProgramsService,
    public resourceService: ResourceService,
    private router: Router
  ) { }

  ngOnInit() {
    if (_.isUndefined(this.showOrgData)) {
      this.showOrgData = true;
    }
    this.isSourcing = this.router.url.includes('/sourcing');
    if (!this.isSourcing) {
      if (_.isEmpty(this.userDetails)) {
        this.toasterService.error('Please provide userDetails');
        return;
      }
      this.contributor = this.userDetails;
      this.setFullName();
    } else {
      if (_.isEmpty(this.orgId) && _.isEmpty(this.userId)) {
        this.toasterService.error('Please provide either of userId or orgId');
        return;
      }

      if (!_.isEmpty(this.orgId)) {
        this.getOrgProfile();
      } else if (!_.isEmpty(this.userId)) {
        this.getUserProfile();
      }
    }
  }

  getUserProfile() {
    const userSearchReq = {
      entityType: ['User'],
      filters: {
        userId: { eq : this.userId }
      }
    };
    this.programsService.searchRegistry(userSearchReq).subscribe(
      (response) => {
        if (_.isEmpty(response.result.User)) {
          this.toasterService.warning(this.resourceService.messages.emsg.profile.m0001);
          return false;
        }
        this.contributor = response.result.User[0];
        this.setFullName();
      },
      (err) => {
        this.handleError(err, this.resourceService.messages.emsg.profile.m0002);
        return false;
      }
    );
  }

  getOrgProfile() {
    const orgSearchReq = {
      entityType: ['Org'],
      filters: {
        osid: {eq : this.orgId}
      }
    };
    this.programsService.searchRegistry(orgSearchReq).subscribe(
      (response) => {
        if (_.isEmpty(response.result.Org)) {
          this.toasterService.warning(this.resourceService.messages.emsg.contributorjoin.m0001);
          return false;
        }
        this.contributor = response.result.Org[0];
        this.setFullName();
      },
      (err) => {
        this.handleError(err, this.resourceService.messages.fmsg.contributorjoin.m0001);
        return false;
      }
    );
  }

  handleError(err, customErrMsg) {
    console.log(err);
    // TODO: navigate to program list page
    const errorMes = typeof _.get(err, 'error.params.errmsg') === 'string' && _.get(err, 'error.params.errmsg');
    this.toasterService.warning(errorMes || customErrMsg);
  }

  setFullName() {
    this.isOrg = this.contributor['@type'] === 'Org';
    if (this.isOrg) {
      this.fullName = this.contributor.name;
    } else {
      this.fullName = this.contributor.firstName;
      if (!_.isEmpty(this.contributor.lastName)) {
        this.fullName  += ' ' + this.contributor.lastName;
      }
    }
    this.showLoader = false;
  }

  ngOnDestroy() {
    if (this.modal && this.modal.deny) {
      this.modal.deny();
    }
  }

  closePopup() {
    this.showProfile = false;
    this.modal.deny();
    this.close.emit();
  }
}
