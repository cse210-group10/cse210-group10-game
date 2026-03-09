export interface PopupProps {
  title: string;
  content: string;
  onClose?: () => void;
}

export interface PopupPropsLesson {
  title: string;
  contentID: number;
  onClickNext: () => void;
}

export interface lessonData {
    id: number;
    lessonContent: string;
}