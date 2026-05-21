import { useTranslation } from 'react-i18next';
import {
  FormLabels,
  FormPlaceholders,
  Buttons,
  Common,
  DeleteDialog,
  Profile,
  Password,
  Settings,
  ErrorMessages,
  NotFound,
  TodoApp,
} from '@/lib/i18n/localization-enum';

type Translated<T> = { readonly [K in keyof T]: string };

interface MultiLanguage {
  readonly FORM_LABELS: Translated<typeof FormLabels>;
  readonly FORM_PLACEHOLDERS: Translated<typeof FormPlaceholders>;
  readonly BUTTONS: Translated<typeof Buttons>;
  readonly DELETE_DIALOG: Translated<typeof DeleteDialog>;
  readonly COMMON: Translated<typeof Common>;
  readonly PROFILE: Translated<typeof Profile>;
  readonly PASSWORD: Translated<typeof Password>;
  readonly SETTINGS: Translated<typeof Settings>;
  readonly ERROR_MESSAGES: Translated<typeof ErrorMessages>;
  readonly NOT_FOUND: Translated<typeof NotFound>;
  readonly TODO_APP: Translated<typeof TodoApp>;
}

const useMultiLanguage = (): MultiLanguage => {
  const { t } = useTranslation();

  return {
    FORM_LABELS: {
      EMAIL: t(FormLabels.EMAIL),
    },
    FORM_PLACEHOLDERS: {
      EMAIL_EXAMPLE: t(FormPlaceholders.EMAIL_EXAMPLE),
      PASSWORD_DOTS: t(FormPlaceholders.PASSWORD_DOTS),
    },
    BUTTONS: {
      SUBMIT: t(Buttons.SUBMIT),
      CANCEL: t(Buttons.CANCEL),
      SAVE: t(Buttons.SAVE),
      DELETE: t(Buttons.DELETE),
    },
    DELETE_DIALOG: {
      TITLE: t(DeleteDialog.TITLE),
      DESCRIPTION: t(DeleteDialog.DESCRIPTION),
      DELETING: t(DeleteDialog.DELETING),
    },
    COMMON: {
      LOADING: t(Common.LOADING),
      SUCCESS: t(Common.SUCCESS),
      ERROR: t(Common.ERROR),
    },
    PROFILE: {
      UPDATE_SUCCESS: t(Profile.UPDATE_SUCCESS),
      UPDATE_SUCCESS_DESCRIPTION: t(Profile.UPDATE_SUCCESS_DESCRIPTION),
    },
    PASSWORD: {
      CHANGE_SUCCESS: t(Password.CHANGE_SUCCESS),
      CHANGE_SUCCESS_DESCRIPTION: t(Password.CHANGE_SUCCESS_DESCRIPTION),
    },
    SETTINGS: {
      FILE_TOO_LARGE: t(Settings.FILE_TOO_LARGE),
      FILE_TOO_LARGE_DESCRIPTION: t(Settings.FILE_TOO_LARGE_DESCRIPTION),
      FILE_READ_ERROR: t(Settings.FILE_READ_ERROR),
      FILE_READ_ERROR_TITLE: t(Settings.FILE_READ_ERROR_TITLE),
    },
    ERROR_MESSAGES: {
      PLEASE_TRY_AGAIN: t(ErrorMessages.PLEASE_TRY_AGAIN),
      GENERIC_ERROR: t(ErrorMessages.GENERIC_ERROR),
    },
    NOT_FOUND: {
      CODE: t(NotFound.CODE),
      MESSAGE: t(NotFound.MESSAGE),
      RETURN_HOME: t(NotFound.RETURN_HOME),
    },
    TODO_APP: {
      TITLE: t(TodoApp.TITLE),
      SUBTITLE: t(TodoApp.SUBTITLE),
      PLACEHOLDER: t(TodoApp.PLACEHOLDER),
      ADD: t(TodoApp.ADD),
      ALL: t(TodoApp.ALL),
      ACTIVE: t(TodoApp.ACTIVE),
      COMPLETED: t(TodoApp.COMPLETED),
      ITEMS_LEFT: t(TodoApp.ITEMS_LEFT),
      CLEAR_COMPLETED: t(TodoApp.CLEAR_COMPLETED),
      EMPTY_STATE: t(TodoApp.EMPTY_STATE),
      EMPTY_STATE_ACTIVE: t(TodoApp.EMPTY_STATE_ACTIVE),
      EMPTY_STATE_COMPLETED: t(TodoApp.EMPTY_STATE_COMPLETED),
    },
  };
};

export default useMultiLanguage;
