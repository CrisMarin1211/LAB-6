import styles from './Song.css';

export enum MusicAttribute {
	'image' = 'image',
	'ttitle' = 'ttitle',
	'autor' = 'autor',
	'album' = 'album',
	'date_added' = 'date_added',
	'duration' = 'duration',
}

export default class Music extends HTMLElement {
	image?: string;
	ttitle?: string;
	autor?: string;
	album?: string;
	date_added?: string;
	duration?: string;

	static get observedAttributes() {
		const attrs: Record<MusicAttribute, null> = {
			image: null,
			ttitle: null,
			autor: null,
			album: null,
			date_added: null,
			duration: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propname: MusicAttribute, oldValue: string | undefined, newValue: string | undefined) {
		switch (propname) {
			default:
				this[propname] = newValue;
				break;
		}
	}
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		const currentDate = new Date();
		const day = currentDate.getDate();
		const month = currentDate.toLocaleString('default', { month: 'long' });
		const year = currentDate.getFullYear();
		const formattedDate = `${day} / ${month} / ${year}`;
		this.date_added = formattedDate;

		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `<section>
			<div>
			<img src="${this.image}">
			<b>${this.ttitle}</b>
			<p>${this.autor}</p>
			<p>Album: ${this.album}</p>
			<p>Date added: ${this.date_added}</p>
			<p>Duration: ${this.duration}</p>
	</div>
	</section>
`;
		}
		const cssSongs = this.ownerDocument.createElement('style');
		cssSongs.innerHTML = styles;
		this.shadowRoot?.appendChild(cssSongs);
	}
}

customElements.define('my-music', Music);
