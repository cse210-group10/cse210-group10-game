export interface PopupProps {
  title: string;
  content: string;
  onClose: () => void;
}

export interface PopupPropsLesson {
  title: string;
  content: string;
  onClickNext: () => void;
}