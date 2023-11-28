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
    }

    /**
     * Ouvre la modal
     * @private
     */
    _displayModal () {
        document.getElementById('contactModal').style.display = 'block';
    }

    /**
     * Ferme la modal
     * @private
     */
    _closeModal(){
        document.getElementById('contactModal').style.display = 'none';
    }

    /**
     * <button id="openModal" class="contact_button">Contactez-moi</button>
     * @return {HTMLButtonElement}
     */
    getContactBtn() {
        const btnContact = document.createElement('button');
        btnContact.id = 'openModal';
        btnContact.classList.add('contact_button');
        btnContact.textContent = 'Contactez-moi';

        return btnContact;
    }
}
