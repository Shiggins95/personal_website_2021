import React, { useRef, useState } from 'react';
import { gsap } from 'gsap/all';

const startingValues = {
  name: '',
  email: '',
  subject: '',
  content: '',
};

const ContactForm = () => {
  const [values, setValues] = useState(startingValues);
  const labelRefs = {
    name: useRef(),
    email: useRef(),
    subject: useRef(),
    content: useRef(),
  };
  const [clickedLabels, setClickedLabels] = useState({
    name: false,
    email: false,
    subject: false,
    content: false,
  });
  const [missingValues, setMissingValues] = useState({
    name: false,
    email: false,
    subject: false,
    content: false,
  });

  const showLabel = (id) => {
    if (clickedLabels[id]) {
      return;
    }
    setClickedLabels({ ...clickedLabels, [id]: true });
    gsap.from(labelRefs[id].current, {
      y: 25,
      opacity: 0,
      duration: 0.25,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('VALUES: ', values);
    const validation = {};
    let missingValue = false;
    Object.keys(values).forEach((key) => {
      const currentValue = values[key];
      if (!currentValue) {
        validation[key] = true;
        missingValue = true;
      } else {
        validation[key] = false;
      }
    });
    console.log('NEW MISSING', validation);
    setMissingValues({ ...missingValues, ...validation });
    if (missingValue) {
      return;
    }

    setValues({ ...startingValues });
  };

  return (
    <div className="contact-form">
      <div className="name input">
        <label htmlFor="name" ref={labelRefs.name} className={clickedLabels.name ? 'display-label' : 'hide-label'}>Name</label>
        <input
          value={values.name}
          className={missingValues.name ? 'error' : ''}
          type="text"
          id="name"
          name="name"
          onClick={() => showLabel('name')}
          placeholder={clickedLabels.name ? '' : 'Name'}
          onChange={(event) => setValues({ ...values, name: event.target.value })}
        />
      </div>
      <div className="email input">
        <label
          htmlFor="name"
          ref={labelRefs.email}
          className={clickedLabels.email ? 'display-label' : 'hide-label'}
        >
          Email
        </label>
        <input
          value={values.email}
          className={missingValues.email ? 'error' : ''}
          type="text"
          id="email"
          name="email"
          onClick={() => showLabel('email')}
          placeholder={clickedLabels.email ? '' : 'Email'}
          onChange={(event) => setValues({ ...values, email: event.target.value })}
        />
      </div>
      <div className="subject input">
        <label
          htmlFor="subject"
          ref={labelRefs.subject}
          className={clickedLabels.subject ? 'display-label' : 'hide-label'}
        >
          Subject
        </label>
        <input
          value={values.subject}
          className={missingValues.subject ? 'error' : ''}
          type="text"
          id="subject"
          name="subject"
          onClick={() => showLabel('subject')}
          placeholder={clickedLabels.subject ? '' : 'Subject'}
          onChange={(event) => setValues({ ...values, subject: event.target.value })}
        />
      </div>
      <br />
      <div className="content input">
        <label
          htmlFor="content"
          ref={labelRefs.content}
          className={clickedLabels.content ? 'display-label' : 'hide-label'}
        >
          Content
        </label>
        <textarea
          value={values.content}
          className={missingValues.content ? 'error' : ''}
          rows={10}
          id="content"
          name="content"
          onClick={() => showLabel('content')}
          placeholder={clickedLabels.content ? '' : 'Content'}
          onChange={(event) => setValues({ ...values, content: event.target.value })}
        />
      </div>
      <div className="submit-button">
        <button type="button" onClick={handleSubmit}>Email Me</button>
      </div>
    </div>
  );
};

ContactForm.propTypes = {};

export default ContactForm;
