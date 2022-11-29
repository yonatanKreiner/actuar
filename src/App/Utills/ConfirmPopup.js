import Swal from 'sweetalert2';
import { GET_SERVER_URL } from '../config';

const apiUrl = `${GET_SERVER_URL()}/calcUseRegestration`;

export const openConfimPopup = (title, submitCallback) => {
    const customSwal = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-info',
          denyButton: 'btn btn-secondary'
        },
        buttonsStyling: false
      })

    customSwal.fire({
        title: title, // 'שירות חישוב פסיקת ריבית',
        text: 'הכנס אימייל להמשך התקשרות',
        input: 'email',
        footer: `<div style='text-align: center;'>
        מחשבון זה ניתן כשירות בלבד,
        וכל העושה שימוש בו הינו על פי דעתו בלבד ובאחריותו בלבד.
       אין לבצע שימוש משפטי במחשבון זה
       </div>`,
        icon: 'info',
        confirmButtonText: 'מסכים',
        showDenyButton: true,
        denyButtonText: 'לא הפעם',
        showCloseButton: true,
        preConfirm: (email) => {
            return fetch(apiUrl, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                credentials: 'include',
                body: JSON.stringify({calcType: title, email: email})
            }).then(response => {
                return true;
              })
          },
      }).then((result) => {
        if (result.isConfirmed || result.isDenied) {
            submitCallback();
        }
      });
}