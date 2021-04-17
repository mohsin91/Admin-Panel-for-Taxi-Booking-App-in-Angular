import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

export const environment = {
  spinner: NgxSpinnerService,
  production: true,
  Url: 'http://217.182.192.140/api/admin',
  IconUrl: 'http://217.182.192.140/api/img',
  mapApiKey: '',

  swalalert(type, msg) {
    if (type === 'success') {
      return new Promise(resolve => {
        Swal.fire({
          type: 'success',
          title: 'Success',
          text: msg,
          showConfirmButton: false,
          timer: 1500
        }).then(async (result) => {
          resolve(true);
        });
      });
    } else if (type === 'delete') {
      return new Promise(resolve => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, ' + msg + ' it!'
        }).then(async (result) => {
          if (result.value) {
            Swal.fire({
              title: msg + '!',
              text: 'Your file has been ' + msg + '.',
              type: 'success',
              showConfirmButton: false,
              timer: 1000
            }).then(async (result) => {
              resolve(true);
            })
          }
        })
      });
    } else if (type === 'nodata' || type === 'underconst') {
      Swal.fire({
        title: '<strong>' + msg + ' <u>!!!</u></strong>',
        type: 'info',
        html: 'You can use <b>' + msg + '</b>',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: 'Thumbs down',
      })
    }
    else {
      Swal.fire({
        type: type,
        title: 'OOPS!',
        text: msg,
        showConfirmButton: true,
      });
    }
  }
};
