/*!
* @erwinstone/bs-toast v1.0.1 (https://bs-toast.vercel.app/)
* Copyright 2021 erwinstone
* Licensed under MIT (https://github.com/erwinstone/bs-toast/blob/master/LICENSE)
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.BsToast = factory());
})(this, (function () { 'use strict';

	class BsToast {
	  #body;
	  #animation;
	  #autohide;
	  #btnClose;
	  #btnCloseWhite;
	  #className;
	  #delay;
	  #gap;
	  #header;
	  #margin;
	  #placement;
	  #classBtnClose = "btn-close";
	  #classToastHeader = "toast-header";
	  #attributeHidden = "hidden";
	  #pos;
	  toast;
	  bootstrapToast;
	  constructor(options) {
	    this.#body = this.#setOption(options.body, "");
	    this.#animation = this.#setOption(options.animation, true);
	    this.#autohide = this.#setOption(options.autohide, true);
	    this.#btnClose = this.#setOption(options.btnClose, true);
	    this.#btnCloseWhite = this.#setOption(options.btnCloseWhite, false);
	    this.#className = this.#setOption(options.className, "");
	    this.#delay = this.#setOption(options.delay, 5e3);
	    this.#gap = this.#setOption(options.gap, 16);
	    this.#header = this.#setOption(options.header, "");
	    this.#margin = this.#setOption(options.margin, "1rem");
	    this.#placement = this.#setOption(options.placement, "top-right");
	    this.#pos = this.#placement.split("-");
	    this.#create();
	    this.#events();
	  }
	  #create() {
	    const closeBtn = `<button type="button" class="${this.#classBtnClose} flex-shrink-0" data-bs-dismiss="toast" aria-label="Close" ${this.#attributeHidden}></button>`;
	    const style = `style="margin:${this.#margin};${this.#pos[0]}:0;${this.#pos[1]}:${this.#animation ? "-50%" : 0};z-index:1081"`;
	    const template = document.createElement("template");
	    template.innerHTML = `<div class="toast position-fixed toast-${this.#placement} ${this.#className}" ${style} role="alert" aria-live="assertive" aria-atomic="true">
				<div class="${this.#classToastHeader}" ${this.#attributeHidden}><div class="d-flex align-items-center flex-grow-1">${this.#header}</div>${closeBtn}</div>
				<div class="toast-body"><div class="d-flex w-100"><div class="flex-grow-1">${this.#body}</div>${closeBtn}</div></div>
			</div>`;
	    const toast = template.content.firstChild;
	    if (toast instanceof HTMLDivElement) {
	      const closeButtons = toast.querySelectorAll(`.${this.#classBtnClose}`);
	      closeButtons.forEach((btn) => {
	        this.#btnClose && btn.removeAttribute(this.#attributeHidden);
	        this.#btnCloseWhite && btn.classList.add("btn-close-white");
	      });
	      if (this.#header !== "") {
	        toast.querySelector(`.${this.#classToastHeader}`).removeAttribute(this.#attributeHidden);
	        closeButtons[1].remove();
	      }
	      this.toast = toast;
	    }
	    document.body.insertAdjacentElement("afterbegin", this.toast);
	    this.bootstrapToast = new bootstrap.Toast(this.toast, {
	      animation: this.#animation,
	      autohide: this.#autohide,
	      delay: this.#delay
	    });
	  }
	  #events() {
	    this.toast.addEventListener("hidden.bs.toast", () => {
	      this.toast.remove();
	      this.#stack();
	    });
	    this.toast.addEventListener("show.bs.toast", () => {
	      let that = this;
	      let timer = setInterval(myFunction, 0);
	      function myFunction() {
	        if (that.toast.offsetHeight > 0) {
	          clearInterval(timer);
	          if (that.#animation) {
	            const transition = parseFloat(getComputedStyle(that.toast).transitionDuration) * 1e3;
	            that.toast.style.transition = `all ${transition * 4}ms cubic-bezier(0.16, 1, 0.3, 1), opacity ${transition}ms linear`;
	            that.toast.style[that.#pos[1]] = 0;
	          }
	          that.#stack();
	        }
	      }
	    });
	  }
	  #stack() {
	    const toasts = document.body.querySelectorAll(`.toast-${this.#placement}`);
	    let yAxis = [];
	    toasts.forEach((el, index) => {
	      if (el instanceof HTMLElement) {
	        index === 0 && yAxis.push(0);
	        if (toasts[index + 1] instanceof HTMLElement) {
	          yAxis.push(yAxis[index] + el.offsetHeight);
	        }
	        el.style[this.#pos[0]] = yAxis[index] + this.#gap * index + "px";
	      }
	    });
	  }
	  #setOption(param, defaultValue) {
	    return param !== void 0 ? param : defaultValue;
	  }
	  show() {
	    this.bootstrapToast.show();
	  }
	  hide() {
	    this.bootstrapToast.hide();
	  }
	}

	return BsToast;

}));
