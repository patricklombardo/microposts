class UI {
  constructor() {
    this.post = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.postSubmit = document.querySelector(".post-submit");
    this.forState = "add";
  }

  // Show all posts
  // Gets posts from server and displays them
  showPosts(posts) {
    let output = "";
    posts.forEach((post) => {
      output += /*html*/ `
      <div class="card mb-3">
        <div class="card-body">
          <h4 class="card-title"/>${post.title}</h4>
          <p class="card-text">${post.body}</p>
          <a href="#" class="edit card-link" data-id="${post.id}">
            <i class="fa fa-pencil"></i>
          </a>
          <a href="#" class="delete card-link" data-id="${post.id}">
            <i class="fa fa-remove"></i>
          </a>
          
        </div>
      </div>
      `;
    });

    this.post.innerHTML = output;
  }

  // Show alert
  showAlert(message, className) {
    this.clearAlert();

    // Create div
    const div = document.createElement("div");

    // Add Classes
    div.className = className;

    // Add text
    div.appendChild(document.createTextNode(message));

    // Get Parent
    const container = document.querySelector(".postsContainer");

    // Get Posts
    const posts = document.querySelector("#posts");

    // Insert Alert div before posts
    container.insertBefore(div, posts);

    // Timeout - remove after 3 seconds
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  // Clear alert
  clearAlert() {
    const currentAlert = document.querySelector(".alert");
    if (currentAlert) {
      currentAlert.remove();
    }
  }

  // Clear form fields
  clearFields() {
    this.titleInput.value = "";
    this.bodyInput.value = "";
  }

  clearIdInput() {
    this.idInput.value = "";
  }

  // Fill Form for Edit State
  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFormState("edit");
  }

  // Change Form State
  changeFormState(type) {
    if (type === "edit") {
      // Change submit button to update
      this.postSubmit.textContent = "Update Post";
      this.postSubmit.className = "post-submit btn btn-warning btn-block";

      // Add cancel button
      const button = document.createElement("button");
      button.className = "post-cancel btn btn-light btn-block";
      button.appendChild(document.createTextNode("Cancel Edit"));

      // Get Parent
      const cardForm = document.querySelector(".card-form");

      // Get element to insert before
      const formEnd = document.querySelector(".form-end");

      // Insert cancel button
      cardForm.insertBefore(button, formEnd);
    } else {
      this.postSubmit.textContent = "Post";
      this.postSubmit.className = "post-submit btn btn-primary btn-block";

      // Remove Cancel btn if it is there
      if (document.querySelector(".post-cancel")) {
        document.querySelector(".post-cancel").remove();
      }

      // Clear ID from Hidden Field
      this.clearIdInput();

      // Clear Text Fields
      this.clearFields();
    }
  }
}

export const ui = new UI();
