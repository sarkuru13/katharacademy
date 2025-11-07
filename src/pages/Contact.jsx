function Contact() {
  return (
    <div className="col-md-8 mx-auto">
      <h2>Contact Us</h2>
      <p className="lead">Have questions or suggestions? Reach out to us below.</p>
      <form action="https://formspree.io/f/mrbzekpw" method="POST">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" name="name" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea className="form-control" rows="4" name="message" required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Send Message</button>
      </form>
    </div>
  );
}
export default Contact;
