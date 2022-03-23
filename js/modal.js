class Modal {
    constructor(props) {
        this.props = props;
        this.modal = document.createElement("div");
        this.content = document.createElement("div");
        this.onSubmit = this.onSubmit.bind(this);
        this.modal.classList.add("modal");
        this.modal.innerHTML = `
        <form class="modal-content">
            <span class="modal-close"></span>
            <div class="modal-body">
                ${props.title}
                ${props.content}
            </div>
        </form>
      `;
        this.modal.addEventListener("click", (e) => {
            if (e.target.classList.contains("modal-close")) {
                this.modal.remove();
            }
        });
        this.modal.addEventListener("submit", this.onSubmit);
        document.body.appendChild(this.modal);
    }

    show() {
        this.modal.style.display = "block";
    }

    close() {
        this.modal.style.display = "none";
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(e.target.querySelector("#input-modal").value);
        this.close();
    }

}

export default Modal;