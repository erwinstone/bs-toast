class BsToast {
	private body: Options['body']
	private animation: Options['animation']
	private autohide: Options['autohide']
	private btnClose: Options['btnClose']
	private btnCloseWhite: Options['btnCloseWhite']
	private className: Options['className']
	private delay: Options['delay']
	private gap: Options['gap']
	private header: Options['header']
	private margin: Options['margin']
	private placement: Options['placement']

	private classBtnClose = 'btn-close'
	private classToastHeader = 'toast-header'
	private attributeHidden = 'hidden'

	private pos: string[]
	toast: HTMLDivElement
	bootstrapToast: {
		show(): void
		hide(): void
	}

	constructor(options: Options) {
		this.body = this.setOption(options.body, '')
		this.animation = this.setOption(options.animation, true)
		this.autohide = this.setOption(options.autohide, true)
		this.btnClose = this.setOption(options.btnClose, true)
		this.btnCloseWhite = this.setOption(options.btnCloseWhite, false)
		this.className = this.setOption(options.className, '')
		this.delay = this.setOption(options.delay, 5000)
		this.gap = this.setOption(options.gap, 16)
		this.header = this.setOption(options.header, '')
		this.margin = this.setOption(options.margin, '1rem')
		this.placement = this.setOption(options.placement, 'top-right')
		this.pos = this.placement.split('-')

		this.create()
		this.events()
	}

	private create() {
		const closeBtn = `<button type="button" class="${this.classBtnClose} flex-shrink-0" data-bs-dismiss="toast" aria-label="Close" ${this.attributeHidden}></button>`
		const style = `style="margin:${this.margin};${this.pos[0]}:0;${this.pos[1]}:${this.animation ? '-50%' : 0};z-index:1081"`
		const template = document.createElement('template')
		template.innerHTML = `<div class="toast position-fixed toast-${this.placement} ${this.className}" ${style} role="alert" aria-live="assertive" aria-atomic="true">
				<div class="${this.classToastHeader}" ${this.attributeHidden}><div class="d-flex align-items-center flex-grow-1">${this.header}</div>${closeBtn}</div>
				<div class="toast-body"><div class="d-flex w-100"><div class="flex-grow-1">${this.body}</div>${closeBtn}</div></div>
			</div>`
		const toast = template.content.firstChild

		if (toast instanceof HTMLDivElement) {
			const closeButtons = toast.querySelectorAll(`.${this.classBtnClose}`)
			closeButtons.forEach((btn) => {
				this.btnClose && btn.removeAttribute(this.attributeHidden) // show btn-close
				this.btnCloseWhite && btn.classList.add('btn-close-white') // add btn-close-white
			})
			if (this.header !== '') {
				toast.querySelector(`.${this.classToastHeader}`).removeAttribute(this.attributeHidden) // show header
				closeButtons[1].remove() // remove btn-close from toast-body
			}
			this.toast = toast
		}

		// Insert dom
		document.body.insertAdjacentElement('afterbegin', this.toast)

		// @ts-ignore
		this.bootstrapToast = new bootstrap.Toast(this.toast, {
			animation : this.animation,
			autohide : this.autohide,
			delay : this.delay,
		})
	}

	private events() {
		this.toast.addEventListener('hidden.bs.toast', () => {
			this.toast.remove()
			this.stack()
		})

		this.toast.addEventListener('show.bs.toast', () => {
			let that  = this
			let timer = setInterval(myFunction, 0)
			function myFunction() {
				if (that.toast.offsetHeight > 0) { // make sure dom appear
					clearInterval(timer)

					if (that.animation) {
						const transition = parseFloat(getComputedStyle(that.toast).transitionDuration) * 1000
						that.toast.style.transition = `all ${transition * 4}ms cubic-bezier(0.16, 1, 0.3, 1), opacity ${transition}ms linear`
						that.toast.style[that.pos[1]] = 0 // slide in
					}
					that.stack()
				}
			}
		})
	}

	private stack() {
		const toasts = document.body.querySelectorAll(`.toast-${this.placement}`)

		let yAxis = []
		toasts.forEach((el, index) => {
			if (el instanceof HTMLElement) {
				index === 0 && yAxis.push(0)
				if (toasts[index + 1] instanceof HTMLElement) {
					yAxis.push(yAxis[index] + el.offsetHeight) // next toast position = current element position + current element height
				}
				el.style[this.pos[0]] = yAxis[index] + (this.gap * index) + 'px'
			}
		})
	}

	private setOption(param: any, defaultValue: any) {
		return param !== undefined ? param : defaultValue
	}

	show() {
		this.bootstrapToast.show()
	}
	hide() {
		this.bootstrapToast.hide()
	}
}

export default BsToast

interface Options {
	body: string
	animation?: boolean
	autohide?: boolean
	btnClose?: boolean
	btnCloseWhite?: boolean
	className?: string
	delay?: number
	gap?: number
	header?: string
	margin?: string
	placement?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}
