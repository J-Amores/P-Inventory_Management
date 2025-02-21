interface ToastProps {
  title?: string;
  description?: string;
}

export function useToast() {
  const toast = (props: ToastProps) => {
    // For now, just console log the toast message
    console.log('Toast:', props);
  };

  return { toast };
} 