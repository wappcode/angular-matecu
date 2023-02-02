import { MatecuAlertBoxType } from './matecu-altert-box-type';

export interface MatecuAlertDialogData {
  message: string;
  title?: string | null | undefined;
  action?: string | null | undefined;
  icon?: boolean | null | undefined;
  type?: MatecuAlertBoxType | string | null | undefined;
  dismissText?: string | null | undefined;
}
