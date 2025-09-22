import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { AppMessages } from '../../constants/messages';

@Injectable({
    providedIn: 'root'
})
export class SweetAlertService {

    showMessage(message: string = AppMessages.SUCCESS, icon: Icon = Icon.SUCCESS) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });

        return Toast.fire({
            icon: icon,
            title: message
        });
    }

    async confirmation(): Promise<any> {
        const result = await Swal.fire({
            title: "Emin misin?",
            text: "Bu işlem geri alınamaz!",
            icon: Icon.WARNING,
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            showCancelButton: true,
            confirmButtonText: "Evet, sil!",
            cancelButtonText: "İptal!",
        });
        return result;
    }
}

export enum Icon {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
    QUESTION = 'question'
}