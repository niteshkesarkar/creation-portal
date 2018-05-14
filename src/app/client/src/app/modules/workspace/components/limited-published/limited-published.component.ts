import { FormsModule } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkSpace } from '../../classes/workspace';
import { SearchService, UserService } from '@sunbird/core';
import {
  ServerResponse, PaginationService, ConfigService, ToasterService,
  ResourceService, IContents, ILoaderMessage, INoResultMessage,
  ContentUtilsServiceService
} from '@sunbird/shared';
import { WorkSpaceService } from '../../services';
import { IPagination } from '@sunbird/announcement';
import * as _ from 'lodash';
import {
  SuiModalService, TemplateModalConfig, ModalTemplate
} from 'ng2-semantic-ui';

/**
 * The limited publish component to search limited published content
*/
@Component({
  selector: 'app-limited-published',
  templateUrl: './limited-published.component.html',
  styleUrls: ['./limited-published.component.css']
})
export class LimitedPublishedComponent extends WorkSpace implements OnInit {

  @ViewChild('modalTemplate')
  public modalTemplate: ModalTemplate<{ data: string }, string, string>;
  /**
   * To navigate to other pages
   */
  route: Router;

  /**
   * To send activatedRoute.snapshot to router navigation
   * service for redirection to unpublished  component
  */
  private activatedRoute: ActivatedRoute;

  /**
   * Contains unique contentIds id
  */
  contentIds: string;
  /**
   * Contains list of published course(s) of logged-in user
  */
  limitedPublishList: Array<IContents> = [];

  /**
   * To show / hide loader
  */
  showLoader = true;

  /**
   * loader message
  */
  loaderMessage: ILoaderMessage;

  /**
   * To show / hide no result message when no result found
  */
  noResult = false;

  /**
   * To show / hide error
  */
  showError = false;

  /**
   * no result  message
  */
  noResultMessage: INoResultMessage;

  /**
    * For showing pagination on unpublished list
  */
  private paginationService: PaginationService;

  /**
    * Refrence of UserService
  */
  private userService: UserService;

  /**
  * To get url, app configs
  */
  public config: ConfigService;
  /**
  * contentShareLink
  */
  contentShareLink: string;
  /**
  * Contains page limit of inbox list
  */
  pageLimit: number;

  /**
  * Current page number of inbox list
  */
  pageNumber = 1;

  /**
    * totalCount of the list
  */
  totalCount: Number;

  /**
  * Contains returned object of the pagination service
  * which is needed to show the pagination on inbox view
  */
  pager: IPagination;

  /**
  * To show toaster(error, success etc) after any API calls
  */
  private toasterService: ToasterService;

  /**
  * Reference of ContentUtilsServiceService
  */
  private contentUtilsServiceService: ContentUtilsServiceService;

  /**
  * To call resource service which helps to use language constant
 */
  public resourceService: ResourceService;

  /**
    * Constructor to create injected service(s) object
    Default method of unpublished Component class
    * @param {SearchService} SearchService Reference of SearchService
    * @param {UserService} UserService Reference of UserService
    * @param {Router} route Reference of Router
    * @param {PaginationService} paginationService Reference of PaginationService
    * @param {ActivatedRoute} activatedRoute Reference of ActivatedRoute
    * @param {ConfigService} config Reference of ConfigService
  */
  constructor(public modalService: SuiModalService, public searchService: SearchService,
    public workSpaceService: WorkSpaceService,
    paginationService: PaginationService,
    activatedRoute: ActivatedRoute,
    route: Router, userService: UserService,
    toasterService: ToasterService, resourceService: ResourceService,
    config: ConfigService, contentUtilsServiceService: ContentUtilsServiceService) {
    super(searchService, workSpaceService);
    this.paginationService = paginationService;
    this.route = route;
    this.activatedRoute = activatedRoute;
    this.userService = userService;
    this.toasterService = toasterService;
    this.resourceService = resourceService;
    this.config = config;
    this.contentUtilsServiceService = contentUtilsServiceService;
    this.loaderMessage = {
      'loaderMessage': this.resourceService.messages.stmsg.m0082,
    };
    this.noResultMessage = {
      'message': this.resourceService.messages.stmsg.m0008,
      'messageText': this.resourceService.messages.stmsg.m0083
    };
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.pageNumber = Number(params.pageNumber);
      this.fetchLimitedPublished(this.config.appConfig.WORKSPACE.PAGE_LIMIT, this.pageNumber);
    });
  }
  /**
   * This method sets the make an api call to get all Unlisted with page No and offset
   */
  fetchLimitedPublished(limit: number, pageNumber: number) {
    this.showLoader = true;
    this.pageNumber = pageNumber;
    this.pageLimit = limit;
    const searchParams = {
      filters: {
        status: ['Unlisted'],
        createdBy: this.userService.userid,
        contentType: this.config.appConfig.WORKSPACE.contentType,
        objectType: 'Content'
      },
      limit: this.pageLimit,
      pageNumber: this.pageNumber,
      params: { lastUpdatedOn: this.config.appConfig.WORKSPACE.lastUpdatedOn }
    };
    this.search(searchParams).subscribe(
      (data: ServerResponse) => {
        if (data.result.count && data.result.content.length > 0) {
          this.limitedPublishList = data.result.content;
          this.totalCount = data.result.count;
          this.pager = this.paginationService.getPager(data.result.count, this.pageNumber, this.pageLimit);
          _.forEach(this.limitedPublishList, (item, key) => {
            const action = {
              right: {
                displayType: 'icon',
                classes: 'trash large icon',
                actionType: 'delete',
                clickable: true
              },
              left: {
                displayType: 'icon',
                actionType: 'shareComponent',
                icon: 'linkify',
                mimeType: item.mimeType,
                identifier: item.identifier,
                contentType: item.contentType,
                clickable: true
              }
            };
            this.limitedPublishList[key].action = action;
          });
          this.showLoader = false;
          const shareLink = this.contentUtilsServiceService.getUnlistedShareUrl();
        } else {
          this.showError = false;
          this.noResult = true;
          this.showLoader = false;
        }
      },
      (err: ServerResponse) => {
        this.showLoader = false;
        this.noResult = false;
        this.showError = true;
        this.toasterService.error(this.resourceService.messages.fmsg.m0064);
      }
    );
  }
  contentClick(param) {
    if (param.type === 'delete') {
      this.deleteConfirmModal(param.content.identifier);
    }
  }
  public deleteConfirmModal(contentIds) {
    const config = new TemplateModalConfig<{ data: string }, string, string>(this.modalTemplate);
    config.isClosable = true;
    config.size = 'mini';
    this.modalService
      .open(config)
      .onApprove(result => {
        this.showLoader = true;
        this.loaderMessage = {
          'loaderMessage': this.resourceService.messages.stmsg.m0034,
        };
        this.delete(contentIds).subscribe(
          (data: ServerResponse) => {
            this.showLoader = false;
            this.limitedPublishList = this.removeContent(this.limitedPublishList, contentIds);
            this.toasterService.success(this.resourceService.messages.smsg.m0006);
          },
          (err: ServerResponse) => {
            this.showLoader = false;
            this.toasterService.error(this.resourceService.messages.fmsg.m0022);
          }
        );
      })
      .onDeny(result => {
      });
  }

  /**
   * This method helps to navigate to different pages.
   * If page number is less than 1 or page number is greater than total number
   * of pages is less which is not possible, then it returns.
   *
   * @param {number} page Variable to know which page has been clicked
   *
   * @example navigateToPage(1)
   */
  navigateToPage(page: number): undefined | void {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pageNumber = page;
    this.route.navigate(['workspace/content/limited/publish', this.pageNumber]);
  }

}
