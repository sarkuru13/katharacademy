import React from 'react';

/**
 * Contact Page
 * A simple contact form.
 */
function Contact() {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <h1 className="h2 fw-bold">Contact Us</h1>
                <p className="text-muted">
                  Have questions or suggestions? Reach out to us below.
                </p>
              </div>
              <form action="https://formspree.io/f/mrbzekpw" method="POST">
                <div className="mb-3">
                  <label htmlFor="nameInput" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameInput"
                    name="name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="emailInput" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    name="email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="messageInput" className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    id="messageInput"
                    rows="5"
                    name="message"
                    required
                  ></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;