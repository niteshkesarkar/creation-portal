'use strict'

angular.module('playerApp')
  .service('announcementService', ['httpServiceJava', 'config', '$http', function(httpServiceJava, config, $http) {
    /**
     * @class announcementService
     * @desc Service to manage announcement.
     * @memberOf Services
     */

            /**
             * @method httpCall
             * @desc Http call
             * @memberOf Services.httpServiceJava
             * @param {string}  url - Url
             * @param {Object}  data - Request
             * @param {string}  method - Methods (CURD)
             * @param {object}  header - Header
             * @instance
             */
            function httpCall(url, data, method, header) {
              return $http({
                method: method,
                url: url,
                headers: header,
                data: data
              });
            }

            /**
             * @method getOutBoxAnnouncementList
             * @desc Get announcement outbox list data
             * @memberOf Services.announcementService
             * @param {Object}   req - Request Object
             * @param {string}  datasetType - Data type
             * @returns {Promise} Promise object represents announcement outbox list dashboard data
             * @instance
             */
            this.getOutBoxAnnouncementList = function(userId) {
              var headers = {
                'Content-Type': 'application/json',
              };

              var URL = '/api/announcement/v1/user/outbox'
              var data = {
                "request": {
                  "userId": userId
                }
              };
              return httpCall(URL, data, 'POST', headers)
            }

            /**
             * @method getInboxAnnouncementList
             * @desc Get announcement inbox list data
             * @memberOf Services.announcementService
             * @param {Object}   req - Request Object
             * @param {string}  datasetType - Data type
             * @returns {Promise} Promise object represents announcement inbox list dashboard data
             * @instance
             */
            this.getInboxAnnouncementList = function() {
              // return httpServiceJava.get(config.URL.DASHBOARD.ORG_CREATION + '/' + req.org_id + '?period=' + req.period);

                return { "id": "api.plugin.announcement.user.outbox", "ver": "1.0", "ts": "2017-10-2417:30:23:540+0530", "params": { "resmsgid": "ea764b40-b8b2-11e7-ba5b-1991e583a6a8", "msgid": null, "status": "successful", "err": "", "errmsg": "" }, "responseCode": "OK", "result": { "announcements": [{ "announcementId": "1", "sourceId": "National Council For Teacher Education", "createdBy": "Creator1", "createdOn": "2017-10-24", "readBy": ["1234-12341-12313-132123", "1234-12341-12313-324234"], "type": "Circular", "links": ["https://www.google.co.in/?gfe_rd=cr&dcr=0&ei=D8r2WbjkOsKL8Qe4pJeACA", "https://diksha.gov.in/#documents"], "title": "Exam dates announced for CBSE and state board exams", "description": "Description goes here for the announcement exam date announced for CBSC and state board exams announcement exam date announced for CBSC and state board exams. Description goes here for the announcement exam date announced for CBSC and state board exams announcement exam date announced for CBSC and state board exams. Description goes here for the announcement exam date announced for CBSC and state board exams announcement exam date announced for CBSC and state board exams. announcement exam date announced for CBSC and state board exams announcement exam date announced for CBSC and state board exams", "target": ["teachers"], "attachments": [{ "title": "Circular A1.pdf", "downloadURL": "https://linktoattachment.com/documents/Circular A1.pdf", "mimetype": "application/pdf","filesize": "120 Kb" }] }, { "announcementId": "1", "sourceId": "National Council For Teacher Education", "createdBy": "Creator1", "createdOn": "2017-10-24", "readBy": ["1234-12341-12313-132123", "1234-12341-12313-324234"], "type": "Circular", "links": ["https://www.google.co.in/?gfe_rd=cr&dcr=0&ei=D8r2WbjkOsKL8Qe4pJeACA", "https://diksha.gov.in/#documents"], "title": "Exam dates announced for CBSE and state board exams", "description": "Description goes here for the announcement exam date announced for CBSC and state board exams announcement exam date announced for CBSC and state board exams announcement exam date announced for CBSC and state board exams announcement exam date announced for CBSC and state board exams", "target": ["teachers"], "attachments": [{ "title": "Circular A1.pdf", "downloadURL": "https://linktoattachment.com/documents/Circular A1.pdf", "mimetype": "application/pdf","filesize": "120 Kb" }] }, { "announcementId": "1", "sourceId": "National Council For Teacher Education", "createdBy": "Creator1", "createdOn": "2017-10-24", "readBy": ["1234-12341-12313-132123", "1234-12341-12313-324234"], "type": "Circular", "links": ["https://www.google.co.in/?gfe_rd=cr&dcr=0&ei=D8r2WbjkOsKL8Qe4pJeACA", "https://diksha.gov.in/#documents"], "title": "Exam dates announced for CBSE and state board exams", "description": "Description goes here for the announcement exam date announced for CBSC and state board exams announcement exam date announced for CBSC and state board exams announcement exam date announced for CBSC and state board exams announcement exam date announced for CBSC and state board exams", "target": ["teachers"], "attachments": [{ "title": "Circular A1.pdf", "downloadURL": "https://linktoattachment.com/documents/Circular A1.pdf", "mimetype": "application/pdf","filesize": "120 Kb" }] }, { "announcementId": "1", "sourceId": "National Council For Teacher Education", "createdBy": "Creator1", "createdOn": "2017-10-24", "readBy": ["1234-12341-12313-132123", "1234-12341-12313-324234"], "type": "Circular", "links": ["https://docs.google.com/spreadsheets/d/1kvDc4mq_GSjd1lo8kKn3d6FGwMlV2QENmFy3EH8kvDc4mq_GSjd1lo8kKn3d6FGwMlV2QENmFy3EH8kvDc4mq_GSjd1lo8kKn3d6FGwMlV2QENmFy3EH8PBKI/edit?ts=58ff1efc#gid=1251924770", "https://diksha.gov.in/#documents"], "title": "Exam dates announced for CBSE and state board exams", "description": "Description goes here for the announcement exam date announced for CBSC and state board exams announcement exam date announced for CBSC and state board exams announcement exam date announced for CBSC and state board exams announcement exam date announced for CBSC and state board exams. Description goes here for the announcement exam date announced for CBSC and state board exams announcement exam date announced for CBSC and state board exams. Description goes here for the announcement exam date announced for CBSC and state board exams announcement exam date announced for CBSC and state board exams. Description goes here for the announcement exam date announced for CBSC and state board exams announcement exam date announced for CBSC and state board exams. announcement exam date announced for CBSC and state board exams announcement exam date announced for CBSC and state board exams", "target": ["teachers"], "attachments": [{ "title": "Circular A1.pdf", "downloadURL": "https://linktoattachment.com/documents/Circular A1.pdf", "mimetype": "application/pdf","filesize": "120 Kb" }, { "title": "Circular A1.pdf", "downloadURL": "https://linktoattachment.com/documents/Circular A1.pdf", "mimetype": "application/pdf","filesize": "120 Kb" }, { "title": "Circular A1.pdf", "downloadURL": "https://linktoattachment.com/documents/Circular A1.pdf", "mimetype": "application/pdf","filesize": "120 Kb" }] }] } }
            }
            /**
             * @method getFileExtension
             * @desc Get file extension
             * @memberOf Services.announcementService
             * @param {string}  mimeType - Mime type
             * @returns {string} returns extension of a file
             * @instance
             */
            this.getFileExtension = function(mimeType) {
              var extension = mimeType === 'application/pdf' ? 'PDF' : (mimeType === 'application/png' ? 'PNG' : 'JPEG')
              return extension
            }

            /**
             * @method createAnnouncement
             * @desc Send announcement data to API
             * @memberOf Services.announcementService
             * @param {object}  req - Announcement form post value
             * @returns {object} returns response of API
             * @instance
             */
            this.createAnnouncement = function(req) {

            }

            /**
             * @method deleteAnnouncement
             * @desc Send announcementId to cancel annoucement API
             * @memberOf Services.announcementService
             * @param {string}  announcementId - Announcement Id
             * @returns {object} returns response of API
             * @instance
             */
            this.deleteAnnouncement = function(announcementId) {
                // dev-> /api/announcement/v1/cancel/1
                // local -> /api/v1/announcement/cancel/1
                var URL = '/api/v1/announcement/cancel/' + announcementId
                return httpCall(URL, {}, 'GET', {})
            }
  }])
