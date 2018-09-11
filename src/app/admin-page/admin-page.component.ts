import {Component, OnInit} from '@angular/core';
import {HttpService} from '../common/http.service';
import {Events} from '../common/Events';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {Categories} from '../common/Categories';
import {SelectItem} from '../common/selectitem';

declare var google: any;

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})

export class AdminPageComponent implements OnInit {
  rows: Events[];
  categories: SelectItem[] = [];
  selectedCategories: string[] = [];
  cols: any[];
  displayDialog: boolean;
  displayDialogAdd: boolean;
  options: any;
  overlays: any[];
  selectedRows: any[];
  infoWindow: any;
  loading: boolean;
  displayErr: boolean;

  id;
  label: string;
  creationDate: string;
  startEvent: string;
  endEvent: string;
  lat: string;
  lng: string;
  location: string;
  description: string;
  name: string = this.cookieService.get('name');
  surname: string = this.cookieService.get('surname');

  constructor(private httpService: HttpService, private messageService: MessageService,
              private router: Router, private cookieService: CookieService) {
  }

  ngOnInit() {
    this.httpService.testOnAdmin().subscribe(res => {
    }, err => this.displayErr = true);

    this.httpService.getCategories().then(categories => {
      categories.map(category => {
        this.categories.push({label: category.categoryName, value: category.categoryName});
      });
    });

    this.httpService.getEvents().then(rows => {
      this.rows = rows;

      this.rows.sort((a, b) => {
        if (a.creation > b.creation) {
          return 1;
        } else if (a.creation < b.creation) {
          return -1;
        } else {
          if (a.id > b.id) {
            return 1;
          } else if (a.id < b.id) {
            return -1;
          } else {
            return 0;
          }
        }
      });
      this.rows.map(date => {
        let dateStart = new Date(date.start);
        let dateEnd = new Date(date.end);
        let dateCreation = new Date(date.creation);

        date.start = (dateStart.getDate() < 10 ? '0'.concat(dateStart.getDate().toString()) : dateStart.getDate()) + '.' + (dateStart.getMonth() + 1 < 10 ? '0'.concat((dateStart.getMonth() + 1).toString()) : dateStart.getMonth() + 1) + '.' + dateStart.getFullYear();
        date.end = (dateEnd.getDate() < 10 ? '0'.concat(dateEnd.getDate().toString()) : dateEnd.getDate()) + '.' + (dateEnd.getMonth() + 1 < 10 ? '0'.concat((dateEnd.getMonth() + 1).toString()) : dateEnd.getMonth() + 1) + '.' + dateEnd.getFullYear();
        date.creation = (dateCreation.getDate() < 10 ? '0'.concat(dateCreation.getDate().toString()) : dateCreation.getDate()) + '.' + (dateCreation.getMonth() + 1 < 10 ? '0'.concat((dateCreation.getMonth() + 1).toString()) : dateCreation.getMonth()) + '.' + dateCreation.getFullYear();
      });
    }).catch(err => this.displayErr = true);

    this.infoWindow = new google.maps.InfoWindow();

    this.cols = [
      {field: 'id', header: 'Id'},
      {field: 'label', header: 'Label'},
      {field: 'creation', header: 'Creation Date'},
      {field: 'start', header: 'Start Event'},
      {field: 'end', header: 'Event End'},
      {field: 'categories', header: 'Categories'},
      {field: 'location', header: 'Location'},
      {field: 'description', header: 'Description'}
    ];
  }

  onRowSelect(event, map) {
    this.httpService.getCategories().then(categories => {
      categories.map(category => {
        if (!this.categories.some(categ => categ.label === category.categoryName)) {
          this.categories.push({label: category.categoryName, value: category.categoryName});
        }
      });
    });

    this.options = {
      center: {lat: event.data.lat, lng: event.data.lng},
      zoom: 16
    };

    this.overlays = [
      new google.maps.Marker({position: {lat: event.data.lat, lng: event.data.lng}, title: event.data.label})
    ];

    if (map != undefined) {
      map.setCenter({lat: event.data.lat, lng: event.data.lng});
      map.setZoom(16);
    }

    this.id = event.data.id;
    this.label = event.data.label;
    this.creationDate = event.data.creation;
    this.startEvent = event.data.start;
    this.endEvent = event.data.end;
    this.lat = event.data.lat;
    this.lng = event.data.lng;
    this.location = event.data.location;
    this.description = event.data.description;
    this.selectedCategories = event.data.categories;

    this.displayDialog = true;
  }

  logout() {
    localStorage.removeItem('token');
    this.cookieService.deleteAll();
    this.router.navigateByUrl('/home');
  }

  handleOverlayClick(event) {
    let isMarker = event.overlay.getTitle != undefined;

    if (isMarker) {
      let title = event.overlay.getTitle();
      this.infoWindow.setContent('' + title + '');
      this.infoWindow.open(event.map, event.overlay);
      event.map.setCenter(event.overlay.getPosition());
    }
  }

  cancel() {
    this.selectedCategories = [];
    this.overlays = [];
    this.selectedRows = [];
  }

  saveTable(id, label, location, description) {
    if (this.selectedCategories.length == 0) {
      this.messageService.add({severity: 'error', summary: 'Categories', detail: 'Add an event to the categories'});
    } else {
      this.rows.filter(rows => {
        if (rows.id === id) {
          rows.label = label;
          rows.location = location;
          rows.categories = this.selectedCategories;
          rows.description = description;
        }
      });
      this.displayDialog = false;
    }
  }

  updateStatus(rowData) {
    if (this.selectedCategories.length == 0) {
      this.messageService.add({severity: 'error', summary: 'Categories', detail: 'Add an event to the categories'});
    } else {
      this.loading = true;
      console.log(rowData);
      const request = {
        id: rowData.id,
        label: rowData.label,
        location: rowData.location,
        description: rowData.description,
        categories: rowData.categories
      };

      this.httpService.putStatusEvent(request).subscribe(res => {
        this.messageService.add({severity: 'success', summary: 'Add', detail: 'Event successfully added'});
        let index = this.rows.indexOf(rowData, 0);
        if (index > -1) {
          this.rows.splice(index, 1);
        }
        this.loading = false;
      }, () => this.displayErr = true);
    }
  }

  delete(rowData) {
    this.loading = true;
    const request = {
      id: rowData.id,
      location: rowData.location
    };

    this.httpService.deleteEvent(request).subscribe(res => {
      this.messageService.add({severity: 'success', summary: 'Delete', detail: 'Event successfully deleted'});
      let index = this.rows.indexOf(rowData, 0);
      if (index > -1) {
        this.rows.splice(index, 1);
      }
      this.loading = false;
    }, () => this.displayErr = true);
  }

  refresh() {
    this.loading = true;
    this.httpService.getCategories().then(categories => {
      categories.map(category => {
        if (!this.categories.some(categ => categ.label === category.categoryName)) {
          this.categories.push({label: category.categoryName, value: category.categoryName});
        }
      });
    });
    this.httpService.getEvents().then(rows => {
      this.rows = rows;

      this.rows.sort((a, b) => {
        if (a.creation > b.creation) {
          return 1;
        } else if (a.creation < b.creation) {
          return -1;
        } else {
          if (a.id > b.id) {
            return 1;
          } else if (a.id < b.id) {
            return -1;
          } else {
            return 0;
          }
        }
      });

      this.rows.map(date => {
        const dateStart = new Date(date.start);
        const dateEnd = new Date(date.end);
        const dateCreation = new Date(date.creation);

        date.start = (dateStart.getDate() < 10 ? '0'.concat(dateStart.getDate().toString()) : dateStart.getDate()) + '.' + (dateStart.getMonth() + 1 < 10 ? '0'.concat((dateStart.getMonth() + 1).toString()) : dateStart.getMonth() + 1) + '.' + dateStart.getFullYear();
        date.end = (dateEnd.getDate() < 10 ? '0'.concat(dateEnd.getDate().toString()) : dateEnd.getDate()) + '.' + (dateEnd.getMonth() + 1 < 10 ? '0'.concat((dateEnd.getMonth() + 1).toString()) : dateEnd.getMonth() + 1) + '.' + dateEnd.getFullYear();
        date.creation = (dateCreation.getDate() < 10 ? '0'.concat(dateCreation.getDate().toString()) : dateCreation.getDate()) + '.' + (dateCreation.getMonth() + 1 < 10 ? '0'.concat((dateCreation.getMonth() + 1).toString()) : dateCreation.getMonth()) + '.' + dateCreation.getFullYear();
      });

      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }).catch(() => this.displayErr = true);
  }

  addEvent() {
    this.httpService.getCategories().then(categories => {
      categories.map(category => {
        if (!this.categories.some(categ => categ.label === category.categoryName)) {
          this.categories.push({label: category.categoryName, value: category.categoryName});
        }
      });
    });

    this.id = '';
    this.label = '';
    this.creationDate = '';
    this.startEvent = '';
    this.endEvent = '';
    this.lat = '';
    this.lng = '';
    this.location = '';
    this.description = '';
    this.selectedCategories = [];

    this.options = {
      center: {lat: 55.72950690736556, lng: 37.64687731410959},
      zoom: 6
    };
    this.displayDialogAdd = true;
  }

  handleMapClick(event) {
    this.overlays = [];
    this.lat = event.latLng.lat();
    this.lng = event.latLng.lng();
    this.overlays = [
      (new google.maps.Marker({position: {lat: event.latLng.lat(), lng: event.latLng.lng()}}))
    ];
  }

  sendEvent(label, startEvent, endEvent, lat, lng, location, description) {
    if (this.selectedCategories.length == 0) {
      this.messageService.add({severity: 'error', summary: 'Categories', detail: 'Add an event to the categories'});
    } else {
      console.log(startEvent);
      console.log(endEvent);
      const request = {
        label: label,
        startStr: startEvent,
        endStr: endEvent,
        lat: lat,
        lng: lng,
        categories: this.selectedCategories,
        location: location,
        description: description
      };

      this.httpService.addEvent(request).subscribe(res => {
        this.messageService.add({severity: 'success', summary: 'Add', detail: 'Event to add'});
      }, err => {
        if (err.status == 400) {
          this.messageService.add({severity: 'error', summary: 'Format date', detail: 'Expected format dd.MM.yyyy'});
        } else {
          this.displayErr = true;
        }
      });
    }
  }

  route() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/home');
  }
}
