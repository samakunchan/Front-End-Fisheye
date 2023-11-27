const displayModal = () => {
    const modal = document.getElementById('contact_modal');
	modal.style.display = 'block';
}

const closeModal = () => {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'none';
}

document.getElementById('openModal').addEventListener('click', displayModal);
document.getElementById('closeModal').addEventListener('click', closeModal);
