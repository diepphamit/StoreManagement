import { AbstractControl } from '@angular/forms';

export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      'required': 'Chưa nhập thông tin.',
      'invalidEmailAddress': 'Email không đúng.',
      'invalidPassword': 'Mật khẩu phải 6 kí tự và chưa số.',
      'invalidNumber': 'Bạn phải nhập số.',
      'invalidPhoneNumber': 'Bạn phải nhập số.',
      'minlength': `Minimum length ${validatorValue.requiredLength}`,
      'ConfirmPassword': 'Hai mật khẩu phải giống nhau.'
    };

    return config[validatorName];
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.pristine === true || control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }


  }

  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }

  static numberValidator(control) {
    if (control.value.toString().match(/^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/)) {
      return null;
    } else {
      return { 'invalidNumber': true };
    }
  }

  static phonenumberValidator(control) {
    if (control.value == null || control.value.toString() === '' ||  control.value.toString().match(/^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/) ) {
      return null;
    } else {
      return { 'invalidNumber': true };
    }
  }

  static passwordMatch(control: AbstractControl) {
    const parent = control.parent;
    if (parent) {
      const password = parent.get('password').value;
      const confirmPassword = control.value;

      if (password !== confirmPassword) {
        return { 'ConfirmPassword': true };
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  static requireValue(control) {
    if (control.pristine !== true && control.value.toString() === '') {
      return { 'required': true };
    } else {
      return null;
    }
  }
}
