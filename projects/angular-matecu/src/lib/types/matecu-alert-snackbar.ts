import { MatecuAlertBoxType } from './matecu-altert-box-type';

export interface MatecuAlertSnackBarData {
  message: string;
  title: string;
  action?: string;
  type: MatecuAlertBoxType
}
