export class ContactComponent {
    constructor(name = null) {
        if(name !== null) {
            const oldText = document.querySelector('.text-header-modal').textContent;
            const newText = `${oldText} \n${name}`;
            document.querySelector('.text-header-modal').innerText = '';
            document.querySelector('.text-header-modal').innerText = newText;
        }
    }

    listenModal() {
        document.getElementById('openModal').addEventListener('click', this._displayModal);
        document.getElementById('closeModal').addEventListener('click', this._closeModal);
        document.getElementById('form').addEventListener('submit', event => {
            event.preventDefault();
            this._closeModal();
        });
        document.querySelector('.modal').addEventListener('keydown', event => {
            console.log(event.key);
            if (event.key === 'Escape') this._closeModal();
        });
    }

    /**
     * Ouvre la modal
     * @private
     */
    _displayModal () {
        document.getElementById('contactModal').style.display = 'block';
        document.getElementById('firstname').focus();
    }

    /**
     * Ferme la modal
     * @private
     */
    _closeModal(){
        document.getElementById('contactModal').style.display = 'none';
    }

    /**
     * <button id="openModal" class="contact-button">Contactez-moi</button>
     * @return {HTMLButtonElement}
     */
    getContactBtn() {
        const btnContact = document.createElement('button');
        btnContact.id = 'openModal';
        btnContact.classList.add('contact-button');
        btnContact.textContent = 'Contactez-moi';

        return btnContact;
    }
}
