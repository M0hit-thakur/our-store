import contactPhoto from '../assets/hero.png';

function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-card contact-page-card">
        <h1>Contact Us</h1>
        <p>Need help with your order or want to ask something? Our support team is here for you.</p>

        <div className="developer-card">
          <img
            src={contactPhoto}
            alt="Mohit Thakur"
          />
          <div className="developer-info">
            <span>Lead Developer</span>
            <h2>Mohit Thakur</h2>
            <p>For product support, feature requests, or professional inquiries, contact the main developer directly.</p>
            <div className="developer-contacts">
              <a href="mailto:mohit11aathakur@gmail.com">mohit11aathakur@gmail.com</a>
              <a href="tel:+918103281565">+91 81032 81565</a>
            </div>
          </div>
        </div>

        <div className="contact-row">
          <div className="contact-item">
            <span>Email</span>
            <a href="mailto:mohit11aathakur@gmail.com">mohit11aathakur@gmail.com</a>
          </div>
          <div className="contact-item">
            <span>Phone</span>
            <a href="tel:+918103281565">+91 81032 81565</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;