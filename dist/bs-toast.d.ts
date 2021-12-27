declare class BsToast {
    private body;
    private animation;
    private autohide;
    private btnClose;
    private btnCloseWhite;
    private className;
    private delay;
    private gap;
    private header;
    private margin;
    private placement;
    private classBtnClose;
    private classToastHeader;
    private attributeHidden;
    private pos;
    toast: HTMLDivElement;
    bootstrapToast: {
        show(): void;
        hide(): void;
    };
    constructor(options: Options);
    private create;
    private events;
    private stack;
    private setOption;
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
