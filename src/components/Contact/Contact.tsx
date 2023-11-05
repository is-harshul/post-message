import { Container, Heading } from "@chakra-ui/react";

type Contact = {
  first: string;
  last: string;
  avatar: string;
  twitter: string;
  notes: string;
  favorite: boolean;
};

export default function Contact() {
  const contact: Contact = {
    first: "Tom",
    last: "Cat",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "@tomnjerry",
    notes: "Eat Jerry",
    favorite: true,
  };

  return (
    <Container display={'flex'} flexDirection={'column'} alignItems={'center'} border={'1px'} borderRadius={'8'} padding={4}>
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar}
        />
      </div>

      <div>
        <Heading>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </Heading>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}
      </div>
    </Container>
  );
}

function Favorite(props: { contact: Contact }) {
  const favorite = props.contact.favorite;
  return (
    <Container>
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </Container>
  );
}