import { useEffect, useState } from "react";
import ContactRow from "./ContactRow";

export default function ContactList({ setSelectedContactId }) {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const data = await fetch(
          "https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users"
        ).then((result) => result.json());
        setContacts(data);
      } catch (error) {
        setError(error);
      }
    }
    fetchContacts();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th colSpan="3">Contact List</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Name</td>
          <td>Email</td>
          <td>Phone</td>
        </tr>
        {error ? (
          <tr>{error}</tr>
        ) : (
          contacts.map((contact) => {
            return (
              <ContactRow
                key={contact.id}
                contact={contact}
                setSelectedContactId={setSelectedContactId}
              />
            );
          })
        )}
      </tbody>
    </table>
  );
}
