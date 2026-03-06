export interface PopupProps {
  title: string;
  content: string;
  onClose: () => void;
  buttonText?: string;
}

export interface lessonData {
    id: number;
    lessonContent: string;
}