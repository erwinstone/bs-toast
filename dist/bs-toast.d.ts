declare class BsToast {
    #private;
    toast: HTMLDivElement;
    bootstrapToast: {
        show(): void;
        hide(): void;
    };
    constructor(options: Options);
    show(): void;
    hide(): void;
}
export default BsToast;
interface Options {
    body: string;
    animation?: boolean;
    autohide?: boolean;
    btnClose?: boolean;
    btnCloseWhite?: boolean;
    className?: string;
    delay?: number;
    gap?: number;
    header?: string;
    margin?: string;
    placement?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}
