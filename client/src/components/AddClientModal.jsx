import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import styles from './AddClientModal.module.css';  // Import the CSS Module

export default function AddClientModal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: clients.concat([addClient]) },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || phone === '') {
      return alert('Please fill in all fields');
    }
    addClient(name, email, phone);
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <>
      <button
        type='button'
        className={styles.addClientButton}  // Use the custom button class
        data-bs-toggle='modal'
        data-bs-target='#addClientModal'
      >
        <div className='d-flex align-items-center'>
          <FaUser className={styles.icon} />  // Use the custom icon class
          <div>Add Client</div>
        </div>
      </button>

      <div
        className='modal fade'
        id='addClientModal'
        aria-labelledby='addClientModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className={`modal-header ${styles.modalHeader}`}>  // Use the custom modal header class
              <h5 className={styles.modalTitle} id='addClientModalLabel'>  // Use the custom title class
                Add Client
              </h5>
              <button
                type='button'
                className={`btn-close ${styles.btnClose}`}  // Use the custom close button class
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className={`modal-body ${styles.modalBody}`}>  // Use the custom modal body class
              <form onSubmit={onSubmit}>
                <div className='mb-3'>
                  <label className='form-label'>Name</label>
                  <input
                    type='text'
                    className={`form-control ${styles.formControl}`}  // Use the custom form control class
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Email</label>
                  <input
                    type='email'
                    className={`form-control ${styles.formControl}`}  // Use the custom form control class
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Phone</label>
                  <input
                    type='text'
                    className={`form-control ${styles.formControl}`}  // Use the custom form control class
                    id='phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <button
                  type='submit'
                  data-bs-dismiss='modal'
                  className={styles.submitButton}  // Use the custom submit button class
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
